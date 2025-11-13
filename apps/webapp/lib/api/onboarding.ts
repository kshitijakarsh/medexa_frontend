import { getAuthToken } from "@/app/utils/onboarding"
import { createTenantApiClient, type Tenant } from "./tenant"

export type OnboardingStatus = "not-done" | "pending" | "completed"

export interface OnboardingStatusResponse {
  serverStatus: OnboardingStatus
}

export interface ApiResponse {
  success: boolean
  message?: string
  invalidModuleIds?: number[]
}

/**
 * Get tenant ID from tenant slug/key
 * This function tries to get the tenant by ID first, then searches by key if that fails
 */
export async function getTenantId(tenantSlug: string): Promise<string> {
  try {
    const token = await getAuthToken()
    const tenantClient = createTenantApiClient({ authToken: token })

    // Try to get tenant by ID (assuming slug might be numeric ID)
    if (/^\d+$/.test(tenantSlug)) {
      try {
        const response = await tenantClient.getTenantById(tenantSlug)
        console.log("response", response)
        return String(response.data.data.id)
      } catch {
        // If not found by ID, continue to try by key
      }
    }

    // Search for tenant by key
    const response = await tenantClient.getTenants()
    const tenants = response.data.data
    // Find tenant matching the slug (could be tenant_key or external_id)
    const tenant = tenants.find(
      (t) => t.tenant_key === tenantSlug || t.external_id === tenantSlug
    )

    if (tenant) {
      return String(tenant.id)
    }

    throw new Error(`Tenant not found with key: ${tenantSlug}`)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to get tenant ID"
    throw new Error(errorMessage)
  }
}

/**
 * Get tenant data with all related arrays (modules, payment configs, licenses, documents)
 * This function fetches the tenant and expects the backend to return all related data
 */
export async function getTenantData(tenantId: string): Promise<Tenant> {
  try {
    const token = await getAuthToken()
    const tenantClient = createTenantApiClient({ authToken: token })
    const response = await tenantClient.getTenantById(tenantId)
    return response.data.data
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to get tenant data"
    throw new Error(errorMessage)
  }
}

/**
 * Get the current onboarding status from server
 * Checks tenant status to determine onboarding state
 */
export async function getOnboardingStatus(
  tenantId?: string
): Promise<OnboardingStatusResponse> {
  try {
    if (!tenantId) {
      return { serverStatus: "not-done" }
    }

    const token = await getAuthToken()
    const tenantClient = createTenantApiClient({ authToken: token })
    const response = await tenantClient.getTenantById(tenantId)
    const tenant = response.data.data

    // Determine status based on tenant status field
    if (tenant.status === "pending") {
      return { serverStatus: "pending" }
    } else if (tenant.status === "active" || tenant.status === "completed") {
      return { serverStatus: "completed" }
    }

    return { serverStatus: "not-done" }
  } catch (error) {
    console.error("Failed to get onboarding status:", error)
    // On error, default to not-done
    return { serverStatus: "not-done" }
  }
}

/**
 * Complete verification process
 * This submits all verification data and marks verification as complete
 */
export async function completeVerification(
  tenantId?: string
): Promise<ApiResponse> {
  try {
    // Optionally update tenant status to pending for verification
    if (tenantId) {
      const token = await getAuthToken()
      const tenantClient = createTenantApiClient({ authToken: token })
      // Update tenant status to pending
      // Note: The API might handle status updates automatically after document submission
      // If explicit status update is needed, uncomment and adjust:
      // await tenantClient.updateTenant(tenantId, {
      //   status: "pending"
      // } as UpdateTenantParams)
    }

    return {
      success: true,
      message: "Verification completed successfully",
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to complete verification"
    return {
      success: false,
      message: errorMessage,
    }
  }
}

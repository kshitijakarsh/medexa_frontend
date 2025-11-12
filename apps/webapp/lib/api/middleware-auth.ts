import { NextRequest } from "next/server"
import axios from "axios"
import { createTenantApiClient } from "./tenant"

/**
 * Get authentication token from request cookies or headers
 * Cognito stores tokens in localStorage on client, but we can check for a cookie
 * that should be set during login
 */
export function getAuthTokenFromRequest(
  request: NextRequest
): string | null {
  // Check for access token in cookie (set during login)
  const accessToken = request.cookies.get("access_token")?.value

  if (accessToken) {
    return accessToken
  }

  // Fallback: check Authorization header
  const authHeader = request.headers.get("authorization")
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }

  return null
}

/**
 * Check if user is authenticated based on request
 */
export function isAuthenticated(request: NextRequest): boolean {
  return getAuthTokenFromRequest(request) !== null
}

/**
 * Get tenant ID from tenant slug using API
 * This is a server-side version that works in middleware
 */
export async function getTenantIdFromSlug(
  tenantSlug: string,
  authToken: string
): Promise<string | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URI ?? ""
    const tenantClient = createTenantApiClient({ authToken, baseUrl })

    // Try to get tenant by ID (assuming slug might be numeric ID)
    if (/^\d+$/.test(tenantSlug)) {
      try {
        const response = await tenantClient.getTenantById(tenantSlug)
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

    return null
  } catch (error) {
    console.error("Failed to get tenant ID:", error)
    return null
  }
}

/**
 * Get tenant status by tenant ID
 */
export async function getTenantStatus(
  tenantId: string,
  authToken: string
): Promise<string | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URI ?? ""
    const tenantClient = createTenantApiClient({ authToken, baseUrl })
    const response = await tenantClient.getTenantById(tenantId)
    return response.data.data.status
  } catch (error) {
    console.error("Failed to get tenant status:", error)
    return null
  }
}


/**
 * DEPRECATED: This file contains unused API functions that were moved from lib/api/onboarding.ts
 * These functions are kept here for reference but are no longer used in the active onboarding flow.
 *
 * @deprecated Do not use these functions in new code. They are kept for historical reference only.
 */

import axios from "axios"
import { getAuthToken } from "@/app/utils/onboarding"
import { createTenantApiClient } from "@/lib/api/tenant"
import { createModulesApiClient } from "./modules-api"
import { createPaymentConfigApiClient } from "./payment-api"
import { createLicenseApiClient } from "@/lib/api/license"
import { createRegulatoryApiClient } from "@/lib/api/regulatory"
import type {
  LicenseHistoryValues,
  RegulatoryDocValues,
} from "@/lib/schemas/onboarding"
import type { HospitalInfoValues, ModulesValues, PaymentValues } from "./schema"

export interface ApiResponse {
  success: boolean
  message?: string
  invalidModuleIds?: number[]
}

/**
 * Submit welcome step data
 * @returns Promise with success/error response
 * @deprecated This function is no longer used
 */
export async function submitWelcome(): Promise<ApiResponse> {
  // Welcome step doesn't require API call
  return {
    success: true,
    message: "Welcome step completed",
  }
}

/**
 * Send verification email with OTP
 * @returns Promise with success/error response
 * @deprecated This function is no longer used
 */
export async function sendVerificationEmail(): Promise<ApiResponse> {
  // This might need a separate API endpoint for sending verification emails
  // For now, returning success
  return {
    success: true,
    message: "Verification email sent",
  }
}

/**
 * Verify OTP code entered by user
 * @param otp - The 6-digit OTP code
 * @returns Promise with success/error response
 * @deprecated This function is no longer used
 */
export async function verifyOTP(otp: string): Promise<ApiResponse> {
  // This might need a separate API endpoint for OTP verification
  // For now, basic validation
  if (otp && otp.length === 6 && /^\d{6}$/.test(otp)) {
    return {
      success: true,
      message: "Email verified successfully",
    }
  }

  return {
    success: false,
    message: "Invalid OTP code",
  }
}

/**
 * Set new password for user
 * @param password - The new password
 * @returns Promise with success/error response
 * @deprecated This function is no longer used
 */
export async function setNewPassword(password: string): Promise<ApiResponse> {
  // Password update is handled by Cognito, not by our API
  // This function is kept for consistency but password change
  // should be handled through Cognito directly
  if (password && password.length >= 8) {
    return {
      success: true,
      message: "Password updated successfully",
    }
  }

  return {
    success: false,
    message: "Password must be at least 8 characters",
  }
}

/**
 * Complete the entire onboarding process
 * This transitions user from onboarding to main application
 * @returns Promise with success/error response
 * @deprecated This function is no longer used
 */
export async function completeOnboarding(): Promise<ApiResponse> {
  return {
    success: true,
    message: "Onboarding completed successfully",
  }
}

/**
 * Submit hospital information (Step 6)
 * Updates existing tenant information
 * @deprecated This function is no longer used
 */
export async function submitHospitalInfo(
  tenantId: string,
  data: HospitalInfoValues
): Promise<ApiResponse> {
  try {
    const token = await getAuthToken()
    const tenantClient = createTenantApiClient({ authToken: token })

    // Prepare update params (only include fields that can be updated)
    const updateParams = {
      tenant_key: data.tenant_key,
      external_id: data.external_id,
      name_en: data.name_en,
      name_local: data.name_local,
      country_id: data.country_id,
      regulatory_authority_id: data.regulatory_authority_id,
      license_number: data.license_number,
      license_expiry: data.license_expiry,
      license_type: data.license_type,
      commercial_reg_no: data.commercial_reg_no,
      currency_code: data.currency_code,
      vat_registered: data.vat_registered,
      vat_number: data.vat_number,
    }

    await tenantClient.updateTenant(tenantId, updateParams)

    return {
      success: true,
      message: "Hospital information submitted successfully",
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to submit hospital information"
    return {
      success: false,
      message: errorMessage,
    }
  }
}

/**
 * Submit module assignments (Step 7)
 * @deprecated This function is no longer used
 */
export async function submitModules(
  tenantId: string,
  data: ModulesValues
): Promise<ApiResponse> {
  try {
    const token = await getAuthToken()
    const modulesClient = createModulesApiClient({ authToken: token })

    // Validate and convert string IDs to numbers
    const invalidIds: string[] = []
    const moduleIds: number[] = []

    for (const id of data.modules) {
      const numericId = parseInt(id, 10)
      if (isNaN(numericId) || !Number.isInteger(numericId) || numericId <= 0) {
        invalidIds.push(id)
      } else {
        moduleIds.push(numericId)
      }
    }

    // If any IDs failed conversion, return an error
    if (invalidIds.length > 0) {
      return {
        success: false,
        message: `Invalid module IDs detected: ${invalidIds.join(", ")}. Please refresh the page and try again.`,
      }
    }

    // Ensure we have at least one valid module
    if (moduleIds.length === 0) {
      return {
        success: false,
        message: "Please select at least one module to continue.",
      }
    }

    // Verify we didn't lose any modules during conversion
    if (moduleIds.length !== data.modules.length) {
      return {
        success: false,
        message: `Some modules could not be processed. Expected ${data.modules.length} modules but only ${moduleIds.length} were valid. Please refresh the page and try again.`,
      }
    }

    await modulesClient.updateModules(tenantId, {
      moduleIds,
    })

    return {
      success: true,
      message: "Modules submitted successfully",
    }
  } catch (error) {
    // Handle axios errors with detailed backend response
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as {
        message?: string
        invalidModuleIds?: number[]
        success?: boolean
      }

      return {
        success: false,
        message: errorData.message || "Failed to submit modules",
        invalidModuleIds: errorData.invalidModuleIds,
      }
    }

    const errorMessage =
      error instanceof Error ? error.message : "Failed to submit modules"
    return {
      success: false,
      message: errorMessage,
    }
  }
}

/**
 * Submit payment details (Step 8)
 * @deprecated This function is no longer used
 */
export async function submitPaymentDetails(
  tenantId: string,
  data: PaymentValues
): Promise<ApiResponse> {
  try {
    const token = await getAuthToken()
    const paymentClient = createPaymentConfigApiClient({ authToken: token })

    await paymentClient.createPaymentConfig(tenantId, {
      gateway_id: data.gateway_id,
      merchant_id: data.merchant_id,
      terminal_key: data.terminal_key,
      vault_path: data.vault_path,
      bank_name: data.bank_name,
      bank_account_no: data.bank_account_no,
      vat_registered: data.vat_registered,
      vat_number: data.vat_number,
      currency_code: data.currency_code,
      active: data.active,
    })

    return {
      success: true,
      message: "Payment details submitted successfully",
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to submit payment details"
    return {
      success: false,
      message: errorMessage,
    }
  }
}

/**
 * Submit license history (Step 9)
 * @deprecated This function is no longer used
 */
export async function submitLicenseHistory(
  tenantId: string,
  data: LicenseHistoryValues
): Promise<ApiResponse> {
  try {
    const token = await getAuthToken()
    const licenseClient = createLicenseApiClient({ authToken: token })

    await licenseClient.createLicense(tenantId, {
      plan_key: data.plan_key,
      seats: data.seats,
      storage_quota_mb: data.storage_quota_mb,
      start_date: data.start_date,
      end_date: data.end_date,
      auto_renew: data.auto_renew,
      status: data.status,
    })

    return {
      success: true,
      message: "License history submitted successfully",
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to submit license history"
    return {
      success: false,
      message: errorMessage,
    }
  }
}

/**
 * Submit regulatory document (Step 10)
 * @deprecated This function is no longer used
 */
export async function submitRegulatoryDoc(
  tenantId: string,
  data: RegulatoryDocValues
): Promise<ApiResponse> {
  try {
    const token = await getAuthToken()
    const regulatoryClient = createRegulatoryApiClient({ authToken: token })

    await regulatoryClient.createDocument(tenantId, {
      doc_type: data.doc_type,
      authority_id: data.authority_id,
      doc_number: data.doc_number,
      issue_date: data.issue_date,
      expiry_date: data.expiry_date,
      file_url: data.file_url,
      notes: data.notes,
    })

    return {
      success: true,
      message: "Regulatory document submitted successfully",
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to submit regulatory document"
    return {
      success: false,
      message: errorMessage,
    }
  }
}

/**
 * Upload regulatory document file
 * @deprecated This function is no longer used
 */
export async function uploadRegulatoryDocFile(
  file: File
): Promise<{ file_url: string }> {
  try {
    const token = await getAuthToken()
    const regulatoryClient = createRegulatoryApiClient({ authToken: token })

    const fileUrl = await regulatoryClient.uploadDocument(file)

    return {
      file_url: fileUrl,
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to upload file"
    throw new Error(errorMessage)
  }
}

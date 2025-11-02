/**
 * Mock API functions for onboarding flow
 * These will be replaced with actual API calls in the future
 */

export type OnboardingStatus = "not-done" | "pending" | "completed"

export interface OnboardingStatusResponse {
  serverStatus: OnboardingStatus
}

export interface ApiResponse {
  success: boolean
  message?: string
}

/**
 * Get the current onboarding status from server
 * @returns Promise with server status
 */
export async function getOnboardingStatus(): Promise<OnboardingStatusResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock: For now, always return 'not-done'
  // In production, this will call actual API endpoint
  return {
    serverStatus: "not-done" as OnboardingStatus,
  }
}

/**
 * Submit welcome step data
 * @returns Promise with success/error response
 */
export async function submitWelcome(): Promise<ApiResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return {
    success: true,
    message: "Welcome step completed",
  }
}

/**
 * Send verification email with OTP
 * @returns Promise with success/error response
 */
export async function sendVerificationEmail(): Promise<ApiResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return {
    success: true,
    message: "Verification email sent",
  }
}

/**
 * Verify OTP code entered by user
 * @param otp - The 6-digit OTP code
 * @returns Promise with success/error response
 */
export async function verifyOTP(otp: string): Promise<ApiResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock: Accept any 6-digit OTP
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
 */
export async function setNewPassword(password: string): Promise<ApiResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock: Accept any non-empty password
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
 */
export async function completeOnboarding(): Promise<ApiResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    success: true,
    message: "Onboarding completed successfully",
  }
}

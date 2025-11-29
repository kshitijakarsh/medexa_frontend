import { refreshCognitoToken } from "@/app/utils/auth"

/**
 * Get the current authentication token from Cognito session
 * @returns Promise with the access token string
 * @throws Error if no user session is found or token cannot be retrieved
 */
export async function getAuthToken(): Promise<string> {
  try {
    const session = await refreshCognitoToken()
    const accessToken = session.getAccessToken().getJwtToken()
    return accessToken
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to retrieve authentication token"
    throw new Error(errorMessage)
  }
}

/**
 * Set authentication token as HTTP-only cookie for middleware access
 * This is called after successful login to make the token available in middleware
 */
export function setAuthTokenCookie(accessToken: string): void {
  if (typeof document !== "undefined") {
    // Set cookie with 7 days expiration, HTTP-only would be ideal but requires server-side
    // For now, using a secure cookie that middleware can read
    const expires = new Date()
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days
    document.cookie = `access_token=${accessToken}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
  }
}

/**
 * Remove authentication token cookie
 */
export function removeAuthTokenCookie(): void {
  if (typeof document !== "undefined") {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }
}

/**
 * Set username cookie for session management in middleware
 * This allows middleware to create CognitoUser instance for getSession()
 */
export function setUsernameCookie(username: string): void {
  if (typeof document !== "undefined") {
    const expires = new Date()
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days
    document.cookie = `cognito_username=${encodeURIComponent(username)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
  }
}

/**
 * Remove username cookie
 */
export function removeUsernameCookie(): void {
  if (typeof document !== "undefined") {
    document.cookie =
      "cognito_username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }
}

/**
 * Set refresh token cookie for session management in middleware
 * This allows middleware to refresh tokens when needed
 */
export function setRefreshTokenCookie(refreshToken: string): void {
  if (typeof document !== "undefined") {
    const expires = new Date()
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days (refresh tokens last longer)
    document.cookie = `cognito_refresh_token=${encodeURIComponent(refreshToken)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
  }
}

/**
 * Remove refresh token cookie
 */
export function removeRefreshTokenCookie(): void {
  if (typeof document !== "undefined") {
    document.cookie =
      "cognito_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }
}

/**
 * Set all authentication cookies (access token, username, refresh token)
 * Called after successful login
 */
export function setAuthCookies(
  accessToken: string,
  username: string,
  refreshToken: string
): void {
  setAuthTokenCookie(accessToken)
  setUsernameCookie(username)
  setRefreshTokenCookie(refreshToken)
}

/**
 * Remove all authentication cookies
 * Called during logout
 */
export function removeAuthCookies(): void {
  removeAuthTokenCookie()
  removeUsernameCookie()
  removeRefreshTokenCookie()
}

/**
 * Utility functions for managing onboarding state in localStorage
 * Only stores welcome page status - all other steps are determined by server status
 * All keys are tenant-specific to support multi-tenant scenarios
 */

export type OnboardingStep =
  | "welcome"
  | "license-history"
  | "regulatory-docs"
  | "verification-pending"
  | "verification-approved"

/**
 * Check if welcome page has been shown for a tenant
 */
export function hasWelcomeBeenShown(tenantId: string): boolean {
  if (typeof window === "undefined") return false
  const key = `onboarding_welcome_shown_${tenantId}`
  return localStorage.getItem(key) === "true"
}

/**
 * Mark welcome page as shown for a tenant
 */
export function markWelcomeAsShown(tenantId: string): void {
  if (typeof window === "undefined") return
  const key = `onboarding_welcome_shown_${tenantId}`
  localStorage.setItem(key, "true")
}

/**
 * Clear onboarding storage for a tenant (useful for testing or reset)
 */
export function clearOnboardingStorage(tenantId: string): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(`onboarding_welcome_shown_${tenantId}`)
}

/**
 * Extract tenant slug from hostname (client-side)
 * Mirrors the middleware's getTenantFromHost logic
 * @returns Tenant slug or null if not found
 */
export function getTenantFromHostname(): string | null {
  if (typeof window === "undefined") return null

  const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN
  if (!BASE_DOMAIN) return null

  const hostname = window.location.hostname
  if (!hostname) return null

  // Apex domain (domain.com) - no tenant
  if (hostname === BASE_DOMAIN) return null

  // Subdomain check (tenant.domain.com)
  if (hostname.endsWith("." + BASE_DOMAIN)) {
    const sub = hostname.slice(0, -(BASE_DOMAIN.length + 1))
    if (!sub || sub === "www") return null
    return sub
  }

  return null
}

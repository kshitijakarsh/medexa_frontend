import { refreshCognitoToken } from "./auth"

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
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }
}


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


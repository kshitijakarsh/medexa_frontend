import { NextRequest } from "next/server"
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  CognitoRefreshToken,
} from "amazon-cognito-identity-js"
import { createTenantApiClient } from "./tenant"

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
}

const userPool = new CognitoUserPool(poolData)

/**
 * Get Cognito session from request using cookies
 * This uses refreshSession() to get fresh tokens, similar to how admin app handles sessions
 * In Edge Runtime, we can't use getSession() directly as it relies on localStorage,
 * so we use refreshSession() with the refresh token from cookies
 */
export async function getSessionFromRequest(
  request: NextRequest
): Promise<CognitoUserSession | null> {
  try {
    // Get username and refresh token from cookies
    const usernameCookie = request.cookies.get("cognito_username")?.value
    const refreshTokenCookie = request.cookies.get(
      "cognito_refresh_token"
    )?.value

    if (!usernameCookie || !refreshTokenCookie) {
      return null
    }

    const username = decodeURIComponent(usernameCookie)
    const refreshTokenValue = decodeURIComponent(refreshTokenCookie)

    // Create CognitoUser instance using username
    const user = new CognitoUser({ Username: username, Pool: userPool })

    // Create refresh token object
    const refreshToken = new CognitoRefreshToken({
      RefreshToken: refreshTokenValue,
    })

    // Refresh session to get latest tokens
    // This is similar to refreshCognitoToken() in auth.ts but works server-side
    return new Promise<CognitoUserSession | null>((resolve) => {
      user.refreshSession(
        refreshToken,
        (err: any, session: CognitoUserSession | null) => {
          if (err || !session) {
            console.error("Failed to refresh session:", err)
            resolve(null)
            return
          }

          // Verify session is valid
          if (session.isValid()) {
            resolve(session)
          } else {
            console.error("Refreshed session is not valid")
            resolve(null)
          }
        }
      )
    })
  } catch (error) {
    console.error("Error getting session from request:", error)
    return null
  }
}

/**
 * Get authentication token from request using Cognito session
 * This uses getSession() to get the latest token, automatically refreshing if needed
 * Falls back to reading access_token cookie if session retrieval fails
 */
export async function getAuthTokenFromRequest(
  request: NextRequest
): Promise<string | null> {
  try {
    // Try to get session first (this will refresh tokens automatically)
    const session = await getSessionFromRequest(request)
    if (session && session.isValid()) {
      const accessToken = session.getAccessToken().getJwtToken()
      return accessToken
    }
  } catch (error) {
    console.error("Failed to get session, falling back to cookie:", error)
  }

  // Fallback: Check for access token in cookie (set during login)
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
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = await getAuthTokenFromRequest(request)
  return token !== null
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
      } catch (error:any){
        console.log("Tenant api failed ",error.message)
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

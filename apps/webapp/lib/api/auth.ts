// lib/api/auth.ts
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js"
import { removeAuthTokenCookie } from "./utils"

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
}

const userPool = new CognitoUserPool(poolData)

export const loginUserCognito = (
  email: string,
  password: string,
  newPassword?: string
) => {
  return new Promise<{ success: boolean; message: string; tokens?: any }>(
    (resolve, reject) => {
      const user = new CognitoUser({ Username: email, Pool: userPool })
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      })

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          // ✅ Grab tokens here
          const tokens = {
            AccessToken: result.getAccessToken().getJwtToken(),
            IdToken: result.getIdToken().getJwtToken(),
            RefreshToken: result.getRefreshToken()?.getToken(),
          }
          resolve({
            success: true,
            message: "Login successful",
            tokens,
          })
        },
        onFailure: (err) => {
          reject(err)
        },
        newPasswordRequired: (userAttributes) => {
          if (!newPassword) {
            // tell UI to prompt for new password
            resolve({
              success: false,
              message: "NEW_PASSWORD_REQUIRED",
            })
            return
          }

          // Remove unnecessary attributes that Cognito doesn't want
          delete userAttributes.email_verified
          delete userAttributes.email // 👈 remove immutable field

          // ✅ Ensure 'name' exists
          if (!userAttributes.name || userAttributes.name.trim() === "") {
            userAttributes.name = "User" // or derive from email
          }

          user.completeNewPasswordChallenge(newPassword, userAttributes, {
            onSuccess: (result) => {
              const tokens = {
                AccessToken: result.getAccessToken().getJwtToken(),
                IdToken: result.getIdToken().getJwtToken(),
                RefreshToken: result.getRefreshToken()?.getToken(),
              }
              resolve({
                success: true,
                message: "Password updated successfully",
                tokens,
              })
            },
            onFailure: (err) => reject(err),
          })
        },
      })
    }
  )
}

// ✅ Move this outside of loginUserCognito

export function refreshCognitoToken(): Promise<CognitoUserSession> {
  return new Promise((resolve, reject) => {
    const user: CognitoUser | null = userPool.getCurrentUser()

    if (!user) return reject("No current user found")

    user.getSession((err: any, session: CognitoUserSession | null) => {
      if (err || !session) return reject("No valid session found")

      if (session.isValid()) {
        resolve(session)
        return
      }

      // ✅ Check refresh token before using
      const refreshToken = session.getRefreshToken()
      if (!refreshToken) return reject("No refresh token available")

      user.refreshSession(
        refreshToken,
        (err: any, newSession: CognitoUserSession | null) => {
          if (err || !newSession) reject(err || "Failed to refresh session")
          else resolve(newSession)
        }
      )
    })
  })
}

export function logoutCognitoUser(): void {
  const user: CognitoUser | null = userPool.getCurrentUser()
  if (!user) {
    console.warn("No user is currently logged in")
    // Still remove cookie in case it exists
    removeAuthTokenCookie()
    return
  }

  user.signOut()
  // Remove auth cookie for middleware
  removeAuthTokenCookie()
  console.log("User logged out successfully")
}

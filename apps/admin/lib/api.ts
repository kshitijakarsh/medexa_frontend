// // This is the cognito login code setup

// import {
//   CognitoUser,
//   AuthenticationDetails,
//   CognitoUserPool,
// } from "amazon-cognito-identity-js";

// const poolData = {
//   UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
//   ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
// };

// const userPool = new CognitoUserPool(poolData);

// // export const loginUserCognito = (username: string, password: string) => {
// //   return new Promise<{ success: boolean; message: string }>((resolve, reject) => {
// //     const user = new CognitoUser({ Username: username, Pool: userPool });
// //     const authDetails = new AuthenticationDetails({ Username: username, Password: password });
// export const loginUserCognito = (email: string, password: string) => {
//   return new Promise<{ success: boolean; message: string }>((resolve, reject) => {
//     const user = new CognitoUser({ Username: email, Pool: userPool });
//     const authDetails = new AuthenticationDetails({ Username: email, Password: password });

//     user.authenticateUser(authDetails, {
//       onSuccess: () => resolve({ success: true, message: "Login successful" }),
//       onFailure: (err) => resolve({ success: false, message: err.message || "Login failed" }),
//     });
//   });
// };


// lib/api.ts
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
};

const userPool = new CognitoUserPool(poolData);

export const loginUserCognito = (
  email: string,
  password: string,
  newPassword?: string
) => {
  return new Promise<{ success: boolean; message: string; tokens?: any }>((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        // ✅ Grab tokens here
        const tokens = {
          AccessToken: result.getAccessToken().getJwtToken(),
          IdToken: result.getIdToken().getJwtToken(),
          RefreshToken: result.getRefreshToken()?.getToken(),
        };
        resolve({
          success: true,
          message: "Login successful",
          tokens,
        });
      },
      onFailure: (err) => {
        reject(err);
      },
      // newPasswordRequired: (userAttributes) => {
      //   if (!newPassword) {
      //     // Signal to UI that new password is required
      //     resolve({
      //       success: false,
      //       message: "NEW_PASSWORD_REQUIRED",
      //     });
      //     return;
      //   }

      //   // Remove unnecessary attributes
      //   delete userAttributes.email_verified;

      //   user.completeNewPasswordChallenge(
      //     newPassword,
      //     userAttributes,
      //     {
      //       onSuccess: () =>
      //         resolve({
      //           success: true,
      //           message: "Password updated successfully",
      //         }),
      //       onFailure: (err) => reject(err),
      //     }
      //   );
      // },
      newPasswordRequired: (userAttributes) => {
        if (!newPassword) {
          // tell UI to prompt for new password
          resolve({
            success: false,
            message: "NEW_PASSWORD_REQUIRED",
          });
          return;
        }

        // Remove unnecessary attributes that Cognito doesn't want
        delete userAttributes.email_verified;
        delete userAttributes.email; // 👈 remove immutable field

        // ✅ Ensure 'name' exists
        if (!userAttributes.name || userAttributes.name.trim() === "") {
          userAttributes.name = "User"; // or derive from email
        }

        user.completeNewPasswordChallenge(
          newPassword,
          userAttributes,
          {
            // onSuccess: () =>
            //   resolve({
            //     success: true,
            //     message: "Password updated successfully",
            //   }),
            onSuccess: (result) => {
              const tokens = {
                AccessToken: result.getAccessToken().getJwtToken(),
                IdToken: result.getIdToken().getJwtToken(),
                RefreshToken: result.getRefreshToken()?.getToken(),
              };
              resolve({
                success: true,
                message: "Password updated successfully",
                tokens,
              });
            },
            onFailure: (err) => reject(err),
          }
        );
      },
    });
  });
  
};



// ✅ Move this outside of loginUserCognito

export function refreshCognitoToken(): Promise<CognitoUserSession> {
  return new Promise((resolve, reject) => {
    const user: CognitoUser | null = userPool.getCurrentUser();

    if (!user) return reject("No current user found");

    user.getSession((err: any, session: CognitoUserSession | null) => {
      if (err || !session) return reject("No valid session found");

      if (session.isValid()) {
        resolve(session);
        return;
      }

      // ✅ Check refresh token before using
      const refreshToken = session.getRefreshToken();
      if (!refreshToken) return reject("No refresh token available");

      user.refreshSession(refreshToken, (err: any, newSession: CognitoUserSession | null) => {
        if (err || !newSession) reject(err || "Failed to refresh session");
        else resolve(newSession);
      });
    });
  });
}


// lib/api.ts

export function logoutCognitoUser(): void {
  const user: CognitoUser | null = userPool.getCurrentUser();
  if (!user) {
    console.warn("No user is currently logged in");
    return;
  }

  user.signOut();
  console.log("User logged out successfully");
}


export function getIdToken(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const user: CognitoUser | null = userPool.getCurrentUser();

    if (!user) {
      console.warn("No user is currently logged in");
      resolve(null);
      return;
    }

    user.getSession((err:any, session:any) => {
      if (err) {
        console.error("Failed to get session", err);
        reject(err);
        return;
      }

      if (!session?.isValid()) {
        console.warn("Session is not valid");
        resolve(null);
        return;
      }

      const idToken = session.getIdToken().getJwtToken();
      resolve(idToken);
    });
  });
}




// To ge the token here 
//  useEffect(() => {
//     async function getToken() {
//       try {
//         const session = await refreshCognitoToken();
//         const accessToken = session.getAccessToken().getJwtToken();
//         console.log("Access Token:", accessToken);
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     getToken();
//   }, []);


// // apps/admin/lib/api.ts
// export const loginUserCognito = async (username: string, password: string) => {
//   // Simulate network delay
//   await new Promise((res) => setTimeout(res, 1000));

//   if (username === "admin" && password === "Admin@123") {
//     return { success: true, message: "Login successful" };
//   } else {
//     return { success: false, message: "Invalid credentials" };
//   }
// };

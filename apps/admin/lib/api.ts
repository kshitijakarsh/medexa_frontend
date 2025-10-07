// // export async function loginUser(username: string, password: string) {
// //   console.log("Simulated API call:", { username, password });

// //   return new Promise<{ success: boolean; message: string }>((resolve) => {
// //     setTimeout(() => {
// //       if (username === "admin" && password === "1234") {
// //         resolve({ success: true, message: "Login successful!" });
// //       } else {
// //         resolve({ success: false, message: "Invalid credentials" });
// //       }
// //     }, 1200); // simulate API delay
// //   });
// // }



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

// export const loginUserCognito = (username: string, password: string) => {
//   return new Promise<{ success: boolean; message: string }>((resolve, reject) => {
//     const user = new CognitoUser({ Username: username, Pool: userPool });
//     const authDetails = new AuthenticationDetails({ Username: username, Password: password });

//     user.authenticateUser(authDetails, {
//       onSuccess: () => resolve({ success: true, message: "Login successful" }),
//       onFailure: (err) => resolve({ success: false, message: err.message || "Login failed" }),
//     });
//   });
// };


// apps/admin/lib/api.ts
export const loginUserCognito = async (username: string, password: string) => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 1000));

  if (username === "admin" && password === "Admin@123") {
    return { success: true, message: "Login successful" };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
};

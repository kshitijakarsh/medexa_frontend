import { WebStorageStateStore } from "oidc-client-ts";

// export const oidcConfig = {
//     authority: process.env.NEXT_PUBLIC_COGNITO_DOMAIN!,
//     client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
//     redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
//     // redirect_uri: "https://d84l1y8p4kdic.cloudfront.net",
//     post_logout_redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
//     response_type: "code",
//     scope: "openid profile email",
//     userStore:
//         typeof window !== "undefined"
//             ? new WebStorageStateStore({ store: window.localStorage })
//             : undefined,
// };


export const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_wIuU8xtpB",
  client_id: "2egivhm9fk0sb828khieuo7ctf",
  redirect_uri: "http://localhost:3002",
  response_type: "code",
  scope: "email openid phone",
};

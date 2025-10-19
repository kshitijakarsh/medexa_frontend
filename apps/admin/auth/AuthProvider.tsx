// "use client";

// import { AuthProvider } from "react-oidc-context";
// // import { oidcConfig } from "./oidcConfig";

// export function CognitoAuthProvider({ children }: { children: React.ReactNode }) {
//     const cognitoAuthConfig = {
//         authority: "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_wIuU8xtpB",
//         client_id: "2egivhm9fk0sb828khieuo7ctf",
//         redirect_uri: "http://localhost:3002",
//         response_type: "code",
//         scope: "email openid phone",
//     };
//     return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
// }

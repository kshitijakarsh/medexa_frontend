import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserSession,
} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
    ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
};

const userPool = new CognitoUserPool(poolData);

export const loginUserCognito = (email: string, password: string) => {
    return new Promise<{ success: boolean; message: string }>((resolve) => {
        const user = new CognitoUser({ Username: email, Pool: userPool });
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        user.authenticateUser(authDetails, {
            onSuccess: (session: CognitoUserSession) => {
                // console.log("Access Token:", session.getAccessToken().getJwtToken());
                // console.log("Refresh Token:", session.getRefreshToken().getToken());
                resolve({ success: true, message: "Login successful" });
            },
            onFailure: (err) => {
                resolve({ success: false, message: err.message || "Login failed" });
            },
        });
    });
};

export const getCurrentSession = (): Promise<CognitoUserSession> => {
    const currentUser = userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
        if (!currentUser) return reject("No user found");
        currentUser.getSession((err: any, session: any) => {
            if (err) return reject(err);
            if (session.isValid()) {
                resolve(session);
            } else {
                currentUser.refreshSession(session.getRefreshToken(), (err: any, newSession: any) => {
                    if (err) return reject(err);
                    resolve(newSession);
                });
            }
        });
    });
};

export const logoutUserCognito = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) currentUser.signOut();
};

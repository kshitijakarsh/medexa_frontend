"use client";

import { useAuth } from "react-oidc-context";

export function LoginSection() {
//   const auth = useAuth();

//   if (auth.isLoading) return <p>Loading...</p>;
//   if (auth.error) return <p>Error: {auth.error.message}</p>;

//   if (!auth.isAuthenticated) {
//     return <button onClick={() => auth.signinRedirect()}>Login with Cognito</button>;
//   }

//   return (
//     <div>
//       <p>Welcome, {auth.user?.profile.email}</p>
//       <button onClick={() => auth.signoutRedirect()}>Logout</button>
//     </div>
//   );
// }

const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "2egivhm9fk0sb828khieuo7ctf";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://ap-south-1wiuu8xtpb.auth.ap-south-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}


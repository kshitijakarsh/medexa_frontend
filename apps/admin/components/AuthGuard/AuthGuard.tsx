"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { refreshCognitoToken } from "@/lib/api";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true)
      try {
        // ✅ refreshCognitoToken already returns CognitoUserSession
        const session: CognitoUserSession = await refreshCognitoToken();

        if (session.isValid()) {
          // ✅ If logged in and trying to visit login page, redirect to overview
          if (pathname.endsWith("/login")) {
            router.replace("/overview");
          }
        } else {
          // ❌ Session invalid
          router.replace("/login");
        }
      } catch (err) {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (loading) return null; // optional loader

  return <>{children}</>;
}

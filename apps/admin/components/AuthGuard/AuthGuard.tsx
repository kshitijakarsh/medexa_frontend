"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { CognitoUserSession } from "amazon-cognito-identity-js"
import { refreshCognitoToken } from "@/lib/api"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session: CognitoUserSession = await refreshCognitoToken()

        if (session?.isValid()) {
          // Already logged in → redirect away from login page
          if (pathname.endsWith("/login")) {
            router.replace(`/overview`)
          }
        } else {
          // Not logged in → redirect only if not already on login
          if (!pathname.endsWith("/login")) {
            // window.location.href = `/${langPrefix}/login`
            router.replace(`/login`)
          }
        }
      } catch (err) {
        if (!pathname.endsWith("/login")) {
          // window.location.href = `/${langPrefix}/login`
          router.replace(`/login`)
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) return null

  return <>{children}</>
}

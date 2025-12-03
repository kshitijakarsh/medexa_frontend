"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { refreshCognitoToken } from "@/app/utils/auth"
import { setAuthTokenCookie } from "@/app/utils/onboarding"
import { getTenantFromHostname } from "@/app/utils/onboarding"
import { getTenantId } from "@/lib/api/onboarding"
import { getOnboardingStatus } from "@/lib/api/onboarding"
import { useLocalePath } from "@/app/hooks/use-locale-path"
import { defaultLocale } from "@/i18n/locales"

export function TenantStatusGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocalePath()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkTenantStatus = async () => {
      // Skip check for login and onboarding pages
      if (pathname?.includes("/login") || pathname?.includes("/onboarding")) {
        setIsChecking(false)
        return
      }

      try {
        // 1. Refresh token client-side (works reliably)
        let accessToken: string
        try {
          const session = await refreshCognitoToken()
          accessToken = session.getAccessToken().getJwtToken()
          // Update cookie with fresh token
          setAuthTokenCookie(accessToken)
        } catch (error) {
          // If refresh fails, user might not be logged in
          console.error("Token refresh failed:", error)
          const loginPath =
            locale === defaultLocale ? "/login" : `/${locale}/login`
          router.push(loginPath)
          return
        }

        // 2. Get tenant from hostname
        const tenant = getTenantFromHostname()
        if (!tenant) {
          window.location.href = "/error/no-tenant"
          return
        }

        // 3. Get tenant ID
        let tenantId: string
        try {
          tenantId = await getTenantId(tenant)
        } catch (error) {
          console.error("Failed to get tenant ID:", error)
          window.location.href = "/error/no-tenant"
          return
        }

        if (!tenantId) {
          window.location.href = "/error/no-tenant"
          return
        }

        // 4. Check tenant status
        const statusResult = await getOnboardingStatus(tenantId)
        const status = statusResult.serverStatus

        // 5. Redirect to onboarding if needed
        if (status === "not-done" || status === "pending") {
          const onboardingPath = `/${locale}/onboarding`
          if (!pathname?.includes("/onboarding")) {
            router.push(onboardingPath)
            return
          }
        }

        setIsChecking(false)
      } catch (error) {
        console.error("Tenant status check failed:", error)
        setIsChecking(false)
      }
    }

    checkTenantStatus()
  }, [pathname, router, locale])

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

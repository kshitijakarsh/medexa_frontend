"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getTenantFromHostname } from "@/app/utils/onboarding"
import { useLocalePath } from "@/app/hooks/use-locale-path"
import { useUserStore } from "@/store/useUserStore"

export function TenantStatusGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocalePath()
  const user = useUserStore((s) => s.user)
  const loading = useUserStore((s) => s.loading)

  useEffect(() => {
    // If we're loading or don't have a user yet, wait.
    // Also skip check for login/onboarding pages to avoid loops
    if (loading || !user || pathname?.includes("/login") || pathname?.includes("/onboarding")) {
      return
    }

    const validateTenant = () => {
      // 1. Get tenant from hostname
      const tenantSlug = getTenantFromHostname()

      if (!tenantSlug) {
        // No subdomain - if we require tenants, redirect to error or login
        window.location.href = "/error/no-tenant"
        return
      }

      // 2. Validate Tenant vs Subdomain
      // note: user.tenant.tenant_key might be missing in the partial JSON snippet but is expected for validation
      // If it is missing, we might skip this check or rely on server-side validation/other means
      const userTenantKey = user.tenant?.tenant_key || user.tenant?.external_id

      if (userTenantKey && userTenantKey !== tenantSlug) {
        console.error(`Tenant mismatch. Host: ${tenantSlug}, User: ${userTenantKey}`)
        window.location.href = "/error/no-tenant"
        return
      }

      // 3. Check Onboarding Status
      const status = user.tenant?.status

      if (status === "not-done" || status === "pending") {
        const onboardingPath = `/${locale}/onboarding`
        if (!pathname?.includes("/onboarding")) {
          router.push(onboardingPath)
        }
      }
    }

    validateTenant()
  }, [user, loading, pathname, router, locale])

  // Show global loading UI until UserLoader finishes or user is available
  // This replaces the internal spinner and matches SidebarWrapper's style
  // Removed explicit loader as per user request to avoid duplication with UserLoader/SidebarWrapper

  return <>{children}</>
}

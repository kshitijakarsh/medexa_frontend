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
  // Matches the style previously in SidebarWrapper to avoid double loaders + usage
  if (loading || !user) {
    // Skip blocking loader for login/onboarding if desired, but typically we want to wait for user check
    // unless we know we are on a public page. 
    // For now, consistent loader.
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-background/50 backdrop-blur-sm">
        <div className="relative flex items-center justify-center">
          <div className="absolute animate-ping h-8 w-8 rounded-full bg-primary/20 opacity-75"></div>
          <div className="relative animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <p className="mt-4 text-sm font-medium text-foreground/60 animate-pulse">
          Loading workspace...
        </p>
      </div>
    )
  }

  return <>{children}</>
}

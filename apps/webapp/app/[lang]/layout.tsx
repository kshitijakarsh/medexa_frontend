import type { ReactNode } from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Providers } from "@/components/providers"
import { getDictionary } from "@/i18n/get-dictionary"
import { locales, type Locale, defaultLocale } from "@/i18n/locales"
import {
  getTenantFromHeaders,
  getAuthTokenFromCookies,
  getTenantIdFromSlug,
  getTenantStatus,
} from "@/lib/api/middleware-auth"

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  }
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  // Get headers to check pathname and get tenant
  const headersList = await headers()

  // Try to get pathname from various headers that Next.js might set
  // Note: This may not always be available in server components
  let actualPath = ""
  const pathnameHeader =
    headersList.get("x-pathname") || headersList.get("x-invoke-path")
  if (pathnameHeader) {
    actualPath = pathnameHeader
  } else {
    // Try to extract from referer header as fallback
    const referer = headersList.get("referer")
    if (referer) {
      try {
        const url = new URL(referer)
        actualPath = url.pathname
      } catch {
        // If referer parsing fails, continue without pathname
      }
    }
  }

  // Skip validation for login, onboarding, and error pages
  // Check both with and without locale prefix
  const isLoginPage =
    actualPath === `/${lang}/login` ||
    actualPath === "/login" ||
    actualPath.startsWith(`/${lang}/login/`) ||
    actualPath.startsWith("/login/")
  const isOnboardingPage =
    actualPath === `/${lang}/onboarding` ||
    actualPath === "/onboarding" ||
    actualPath.startsWith(`/${lang}/onboarding/`) ||
    actualPath.startsWith("/onboarding/")
  const isErrorPage =
    actualPath.startsWith(`/${lang}/error`) || actualPath.startsWith("/error")

  // Only perform tenant validation if not on login, onboarding, or error pages
  // Note: If pathname detection fails, we rely on authToken presence as a safeguard
  // (login/onboarding pages typically won't have authToken due to middleware)
  if (!isLoginPage && !isOnboardingPage && !isErrorPage) {
    try {
      // Get tenant from host header
      const tenant = await getTenantFromHeaders()

      // Get auth token from cookies
      const authToken = await getAuthTokenFromCookies()

      // Only proceed if we have both tenant and auth token
      // This also acts as a safeguard: if pathname detection failed but we're on
      // login/onboarding, there likely won't be an authToken anyway
      if (tenant && authToken) {
        // Get tenant ID from tenant slug
        const tenantId = await getTenantIdFromSlug(tenant, authToken)
        if (!tenantId) {
          // Tenant not found, redirect to error page
          const errorUrl = lang === defaultLocale ? "/error" : `/${lang}/error`
          redirect(`${errorUrl}?message=Tenant not found`)
        }

        const tenantStatus = await getTenantStatus(tenantId, authToken)

        if (tenantStatus === "not-done" || tenantStatus === "pending") {
          const onboardingUrl =
            lang === defaultLocale ? "/onboarding" : `/${lang}/onboarding`
          redirect(onboardingUrl)
        }
      }
    } catch (error) {
      // Log error but don't block rendering
      console.error("Tenant validation error:", error)
    }
  }

  return <Providers dict={dict}>{children}</Providers>
}

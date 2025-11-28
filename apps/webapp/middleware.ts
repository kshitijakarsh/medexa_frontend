import { NextResponse, type NextRequest } from "next/server"
import {
  isAuthenticated,
  getAuthTokenFromRequest,
  getTenantIdFromSlug,
  getTenantStatus,
} from "./lib/api/middleware-auth"
import { getLocale } from "./i18n/get-locale"
import { locales, defaultLocale } from "./i18n/locales"

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN

function getTenantFromHost(host?: string | null): string | null {
  if (!host || !BASE_DOMAIN) return null
  const hostname = host.split(":")[0]
  if (!hostname) return null

  // Apex domain (domain.com) - no tenant
  if (hostname === BASE_DOMAIN) return null

  // Subdomain check (tenant.domain.com)
  if (hostname.endsWith("." + BASE_DOMAIN)) {
    const sub = hostname.slice(0, -(BASE_DOMAIN.length + 1))
    if (!sub || sub === "www") return null
    return sub
  }

  return null
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get("host")
  const tenant = getTenantFromHost(host)

  // Allow error pages to be accessed without tenant subdomain
  if (pathname.startsWith("/error")) {
    return NextResponse.next()
  }

  // No tenant means apex domain (will redirect to admin or show error)
  if (!tenant) {
    const adminUrl = `${process.env.NEXT_PUBLIC_ADMIN_URL}${pathname}`

    return NextResponse.redirect(new URL(adminUrl))
  }

  // Check if pathname has locale in format: /{locale}/path or /{locale}
  const localeMatch = pathname.match(/^\/(en|nl)(\/.*)?$/)
  const pathnameHasLocale = !!localeMatch
  const pathnameLocale = localeMatch
    ? (localeMatch[1] as typeof defaultLocale | "nl")
    : null
  const pathAfterLocale = localeMatch ? localeMatch[2] || "/" : pathname

  // Handle old /t/[tenant]/[lang]/path format - redirect to clean URL
  if (pathname.startsWith(`/t/${tenant}/`)) {
    const parts = pathname.split("/")
    if (parts.length >= 4 && locales.includes(parts[3] as any)) {
      const locale = parts[3] as typeof defaultLocale | "nl"
      const restOfPath = "/" + parts.slice(4).join("/") || "/"
      const url = request.nextUrl.clone()
      // For default locale, don't show it in URL
      if (locale === defaultLocale) {
        url.pathname = restOfPath === "/" ? "/" : restOfPath
      } else {
        url.pathname = `/${locale}${restOfPath}`
      }
      return NextResponse.redirect(url)
    }
  }

  // If pathname doesn't have locale, detect locale
  // For non-default locales, redirect to include locale in URL
  // For default locale, we'll rewrite internally (no redirect to avoid loop)
  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    // Only redirect non-default locales to show locale in URL
    if (locale !== defaultLocale) {
      const url = request.nextUrl.clone()
      url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`
      return NextResponse.redirect(url)
    }
    // For default locale, continue to rewrite logic below (no redirect)
  }

  // Extract actual path for checking login/onboarding
  const actualPath = pathAfterLocale

  const isLoginPage =
    actualPath === "/login" || actualPath.startsWith("/login/")
  const isOnboardingPage =
    actualPath === "/onboarding" || actualPath.startsWith("/onboarding/")

  // Check authentication
  const authenticated = isAuthenticated(request)

  if (!authenticated && !isLoginPage) {
    const locale = pathnameLocale || getLocale(request)
    const loginUrl = request.nextUrl.clone()
    // For default locale, don't show it in URL
    if (locale === defaultLocale) {
      loginUrl.pathname = "/login"
    } else {
      loginUrl.pathname = `/${locale}/login`
    }
    return NextResponse.redirect(loginUrl)
  }

  // If authenticated, check tenant status
  if (authenticated && !isLoginPage && !isOnboardingPage) {
    try {
      const authToken = getAuthTokenFromRequest(request)
      if (!authToken) {
        const locale = pathnameLocale || getLocale(request)
        const loginUrl = request.nextUrl.clone()
        if (locale === defaultLocale) {
          loginUrl.pathname = "/login"
        } else {
          loginUrl.pathname = `/${locale}/login`
        }
        return NextResponse.redirect(loginUrl)
      }

      // Get tenant ID from tenant slug
      const tenantId = await getTenantIdFromSlug(tenant, authToken)
      // if (!tenantId) {
      //   // Tenant not found, redirect to error page
      //   const locale = pathnameLocale || getLocale(request)
      //   const errorUrl = request.nextUrl.clone()
      //   if (locale === defaultLocale) {
      //     errorUrl.pathname = "/error"
      //   } else {
      //     errorUrl.pathname = `/${locale}/error`
      //   }
      //   errorUrl.searchParams.set("message", "Tenant not found")
      //   return NextResponse.redirect(errorUrl)
      // }

      const tenantStatus = await getTenantStatus(tenantId, authToken)

      if (tenantStatus === "not-done" || tenantStatus === "pending") {
        const locale = pathnameLocale || getLocale(request)
        const onboardingUrl = request.nextUrl.clone()
        if (locale === defaultLocale) {
          onboardingUrl.pathname = "/onboarding"
        } else {
          onboardingUrl.pathname = `/${locale}/onboarding`
        }
        return NextResponse.redirect(onboardingUrl)
      }
    } catch (error) {
      console.error("Middleware error:", error)
      const locale = pathnameLocale || getLocale(request)
      const loginUrl = request.nextUrl.clone()
      if (locale === defaultLocale) {
        loginUrl.pathname = "/login"
      } else {
        loginUrl.pathname = `/${locale}/login`
      }
      return NextResponse.redirect(loginUrl)
    }
  }

  // Rewrite URL internally to /[lang]/path
  // But keep the visible URL clean: /path or /{locale}/path
  const locale = pathnameLocale || getLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathAfterLocale === "/" ? "" : pathAfterLocale}`

  const res = NextResponse.rewrite(new URL(url.toString()))

  // Set tenant header
  res.headers.set("x-tenant", tenant)

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - error/* routes are handled separately
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

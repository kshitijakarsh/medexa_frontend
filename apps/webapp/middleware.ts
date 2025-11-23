import { NextResponse, type NextRequest } from "next/server"
import {
  isAuthenticated,
  getAuthTokenFromRequest,
  getTenantIdFromSlug,
  getTenantStatus,
} from "./lib/api/middleware-auth"

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

  // Check if current path is login or onboarding
  // pathname is the original path (e.g., "/login", "/onboarding", "/dashboard")
  const isLoginPage = pathname === "/login" || pathname.startsWith("/login/")
  const isOnboardingPage =
    pathname === "/onboarding" || pathname.startsWith("/onboarding/")

  // Check authentication
  const authenticated = isAuthenticated(request)

  if (!authenticated && !isLoginPage) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/login"
    return NextResponse.redirect(loginUrl)
  }

  // If authenticated, check tenant status
  if (authenticated && !isLoginPage && !isOnboardingPage) {
    try {
      const authToken = getAuthTokenFromRequest(request)
      if (!authToken) {
        const loginUrl = request.nextUrl.clone()
        loginUrl.pathname = "/login"
        return NextResponse.redirect(loginUrl)
      }

      // Get tenant ID from tenant slug
      const tenantId = await getTenantIdFromSlug(tenant, authToken)
      // if (!tenantId) {
      //   // Tenant not found, redirect to error page
      //   const errorUrl = request.nextUrl.clone()
      //   errorUrl.pathname = `/t/${tenant}/error`
      //   errorUrl.searchParams.set("message", "Tenant not found")
      //   return NextResponse.redirect(errorUrl)
      // }

      const tenantStatus = await getTenantStatus(tenantId, authToken)

      if (tenantStatus === "not-done" || tenantStatus === "pending") {
        const onboardingUrl = request.nextUrl.clone()
        onboardingUrl.pathname = "/onboarding"
        return NextResponse.redirect(onboardingUrl)
      }
    } catch (error) {
      console.error("Middleware error:", error)
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = "/login"
      return NextResponse.redirect(loginUrl)
    }
  }

  const url = request.nextUrl.clone()
  url.pathname =
    pathname === "/" || pathname === ""
      ? `/t/${tenant}`
      : `/t/${tenant}${pathname}`

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

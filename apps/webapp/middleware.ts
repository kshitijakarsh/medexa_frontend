import { NextResponse, type NextRequest } from "next/server"

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get("host")
  const tenant = getTenantFromHost(host)

  // No tenant means apex domain (will redirect to admin or show error)
  if (!tenant) {
    const adminUrl = `${process.env.NEXT_PUBLIC_ADMIN_URL}${pathname}`

    return NextResponse.redirect(new URL(adminUrl))
  }

  // ToDo: Check if tenant is valid
  // e.g:
  // const exists = await checkTenantExists(tenant)
  // if (!exists) {
  //   // Rewrite to 404 page or tenant-not-found page
  //   return NextResponse.rewrite(new URL("/tenant-not-found", request.url))
  // }

  // Rewrite to internal tenant namespace /t/[tenant]/...
  const url = request.nextUrl.clone()
  url.pathname =
    pathname === "/" || pathname === ""
      ? `/t/${tenant}`
      : `/t/${tenant}${pathname}`

  const res = NextResponse.rewrite(new URL(url.toString()))

  // Set tenant header
  // e.g:
  // res.headers.set("x-tenant", tenant)

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

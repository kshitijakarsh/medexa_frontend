import { NextResponse, NextRequest } from "next/server"
import { getLocale } from "./i18n/get-locale"
import { locales } from "./i18n/locales"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip special paths and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|txt|xml|json|js|css|map)$/)
  ) {
    return NextResponse.next()
  }

  // Check if the pathname already has a locale
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (hasLocale) {
    return NextResponse.next()
  }

  // Redirect to the detected locale
  const locale = getLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
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
    "/((?!_next).*)",
  ],
}

import { Locale, locales } from "@/i18n/locales"
import { MODULE_PROFILE_ROUTES, ModuleKey } from "@/lib/routes/profile"


export function getProfileRoute(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  if (!segments.length) return null

  let locale: Locale | null = null
  let moduleKey: ModuleKey | null = null

  const firstSegment = segments[0]

  // Detect locale
  if (locales.includes(firstSegment as Locale)) {
    locale = firstSegment as Locale
    moduleKey = segments[1] as ModuleKey
  } else {
    moduleKey = firstSegment as ModuleKey
  }

  // Validate module
  if (!moduleKey || !(moduleKey in MODULE_PROFILE_ROUTES)) return null

  const baseProfileRoute = MODULE_PROFILE_ROUTES[moduleKey]

  return locale
    ? `/${locale}${baseProfileRoute}`
    : baseProfileRoute
}

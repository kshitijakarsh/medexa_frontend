import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { defaultLocale, locales, type Locale } from "./locales"

export function getLocale(request: Request): Locale {
  const acceptLanguage = request.headers.get("accept-language")

  if (!acceptLanguage) {
    return defaultLocale
  }

  const headers: Record<string, string> = { "accept-language": acceptLanguage }
  const languages = new Negotiator({ headers }).languages()

  try {
    return match(languages, locales, defaultLocale) as Locale
  } catch {
    return defaultLocale
  }
}

"use client"

import { locales } from "@/i18n/locales"
import { usePathname } from "next/navigation"

const SUPPORTED_LOCALES = locales
type Locale = (typeof SUPPORTED_LOCALES)[number]

export function useLocalePath(): Locale {
  const pathname = usePathname() || "/"
  const segments = pathname.split("/")

  let locale = segments[1]

  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    return locales[0]
  }

  return locale as Locale
}

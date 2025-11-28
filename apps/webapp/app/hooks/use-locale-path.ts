"use client"

import { usePathname } from "next/navigation"

const SUPPORTED_LOCALES = ["en", "nl"] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]

export function useLocalePath(): Locale {
  const pathname = usePathname() || "/"
  const segments = pathname.split("/")

  let locale = segments[1]

  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    return "en"
  }

  return locale as Locale
}

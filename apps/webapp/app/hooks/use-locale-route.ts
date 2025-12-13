"use client"

import { useLocalePath } from "./use-locale-path"

export function useLocaleRoute() {
  const locale = useLocalePath()

  return {
    locale,
    localePrefix: `/${locale}`,
    withLocale: (path: string) => `/${locale}${path}`,
  }
}

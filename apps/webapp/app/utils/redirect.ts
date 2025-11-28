"use client"

import { useRouter } from "next/navigation"
import { useLocalePath } from "../hooks/use-locale-path"

export function useLocaleRedirect() {
  const locale = useLocalePath()
  const router = useRouter()

  return {
    redirectToLogin: () => router.replace(`/${locale}/login`),
    redirectTo: (path: string) => router.replace(`/${locale}${path}`),
  }
}

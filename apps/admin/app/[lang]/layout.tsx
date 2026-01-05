export const dynamic = "force-dynamic" // temporary fix for suspense

import type { ReactNode } from "react"
import { Providers } from "@/components/providers"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"
import AuthGuard from "@/components/AuthGuard/AuthGuard"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  }
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <AuthGuard>
      <Providers dict={dict}>{children}</Providers>
    </AuthGuard>
  )
}

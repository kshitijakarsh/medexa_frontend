import type { ReactNode } from "react"
import { Providers } from "@/components/providers"
import { getDictionary } from "@/i18n/get-dictionary"
import { locales, type Locale } from "@/i18n/locales"

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

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

  return <Providers dict={dict}>{children}</Providers>
}

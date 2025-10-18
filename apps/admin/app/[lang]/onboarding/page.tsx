import { redirect } from "next/navigation"
import type { Locale } from "@/i18n/locales"

export default async function OnboardingIndexPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  redirect(`/${lang}/create-hospital`)
}

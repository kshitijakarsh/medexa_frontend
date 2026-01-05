import { RegulatoryDocsStepForm } from "../_components/RegulatoryDocsStepForm"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"

export default async function RegulatoryDocsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return <RegulatoryDocsStepForm dict={dict} />
}

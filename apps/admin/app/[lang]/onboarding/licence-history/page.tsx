import { LicenceHistoryStepForm } from "../_components/LicenceHistoryStepForm"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"

export default async function LicenceHistoryPage( {
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return <LicenceHistoryStepForm dict={dict} />
}


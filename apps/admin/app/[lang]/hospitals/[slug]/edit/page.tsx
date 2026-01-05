import { EditHospitalForm } from "../_components/EditHospitalForm"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"

interface EditHospitalPageProps {
  params: Promise<{ slug: string; lang: Locale }>
}

export default async function EditHospitalPage({
  params,
}: EditHospitalPageProps) {
  const { slug, lang } = await params

  // Load dictionary for current language
  const dict = await getDictionary(lang)

  // The slug is the tenant ID
  return (
    <EditHospitalForm
      tenantId={slug}
      dict={dict}
    />
  )
}

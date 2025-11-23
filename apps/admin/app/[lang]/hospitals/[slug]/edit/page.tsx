import { EditHospitalForm } from "../_components/EditHospitalForm"
import type { Locale } from "@/i18n/locales"

interface EditHospitalPageProps {
  params: Promise<{ slug: string; lang: Locale }>
}

export default async function EditHospitalPage({
  params,
}: EditHospitalPageProps) {
  const { slug } = await params

  // The slug should be the tenant ID
  return <EditHospitalForm tenantId={slug} />
}


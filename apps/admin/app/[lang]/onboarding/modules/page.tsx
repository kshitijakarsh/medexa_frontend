// import { ModuleStepForm } from "../_components/ModuleStepForm"
// import { getDictionary } from "@/i18n/get-dictionary"
// import type { Locale } from "@/i18n/locales"

// export default async function ModulesPage({
//   params,
// }: {
//   params: { lang: Locale }
// }) {
  
//   const dict = await getDictionary(params.lang)

//   return <ModuleStepForm dict={dict} />
// }
import { ModuleStepForm } from "../_components/ModuleStepForm"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"

export default async function ModulesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return <ModuleStepForm dict={dict} />
}

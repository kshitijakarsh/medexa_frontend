// import { PaymentStepForm } from "../_components/PaymentStepForm"

// export default function PaymentPage() {
//   return <PaymentStepForm />
// }

import { PaymentStepForm } from "../_components/PaymentStepForm"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const dict = await getDictionary((await params).lang)

  return <PaymentStepForm dict={dict} />
}


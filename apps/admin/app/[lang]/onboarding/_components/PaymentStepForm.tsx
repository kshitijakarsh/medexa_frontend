"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Form } from "@workspace/ui/components/form"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import { PaymentDetailsSection } from "@/app/[lang]/onboarding/_components/sections/PaymentDetailsSection"
import { FormActionsSection } from "@/app/[lang]/onboarding/_components/sections/FormActionsSection"
import {
  step3Schema,
  type Step3Values,
} from "@/app/[lang]/onboarding/_components/schemas"
import { saveHospitalPayment } from "@/lib/hospitals"

const defaultValues: Step3Values = {
  gateway_id: "",
  merchant_id: "",
  terminal_key: "",
  vault_path: "",
  bank_name: "",
  bank_account_no: "",
  vat_registered: false,
  vat_number: "",
  currency_code: "",
}

export function PaymentStepForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ lang: string }>()
  const lang = params?.lang ?? "en"
  const onboardingBase = `/${lang}/onboarding`
  const createHospitalPath = `/${lang}/create-hospital`
  const hospitalId = searchParams.get("hospitalId") || ""

  useEffect(() => {
    if (!hospitalId) {
      router.replace(createHospitalPath)
    }
  }, [hospitalId, router, createHospitalPath])

  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues,
  })

  const handleReset = () => {
    form.reset(defaultValues)
    setServerError(null)
  }

  const onSubmit = async (values: Step3Values) => {
    if (!hospitalId) return

    setLoading(true)
    setServerError(null)

    try {
      await saveHospitalPayment(hospitalId, values)
      router.push(`${onboardingBase}/licence-history?hospitalId=${hospitalId}`)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save payment"
      setServerError(message)
    } finally {
      setLoading(false)
    }
  }

  if (!hospitalId) {
    return null
  }

  const previousStepHref = `${onboardingBase}/modules?hospitalId=${hospitalId}`

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <PaymentDetailsSection form={form} />

        <FormActionsSection
          serverError={serverError}
          loading={loading}
          onReset={handleReset}
          backHref={previousStepHref}
          submitLabel="Save & Continue"
          submitLoadingLabel="Saving..."
        />
      </form>
    </Form>
  )
}

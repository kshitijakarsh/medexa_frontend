"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Form } from "@workspace/ui/components/form"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import { LicenseHistorySection } from "@/app/[lang]/onboarding/_components/sections/LicenseHistorySection"
import { FormActionsSection } from "@/app/[lang]/onboarding/_components/sections/FormActionsSection"
import {
  step4Schema,
  type Step4Values,
} from "@/app/[lang]/onboarding/_components/schemas"
import { saveHospitalLicense } from "@/lib/hospitals"

const defaultValues: Step4Values = {
  plan_key: "",
  seats: 0,
  storage_quota_mb: 10240,
  start_date: "",
  end_date: undefined,
  auto_renew: true,
  status: "active",
}

export function LicenceHistoryStepForm() {
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

  const form = useForm<Step4Values>({
    resolver: zodResolver(step4Schema),
    defaultValues,
  })

  const handleReset = () => {
    form.reset(defaultValues)
    setServerError(null)
  }

  const onSubmit = async (values: Step4Values) => {
    if (!hospitalId) return

    setLoading(true)
    setServerError(null)

    try {
      await saveHospitalLicense(hospitalId, {
        ...values,
        end_date: values.end_date || undefined,
      })
      router.push(`${onboardingBase}/regulatory-docs?hospitalId=${hospitalId}`)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save licence"
      setServerError(message)
    } finally {
      setLoading(false)
    }
  }

  if (!hospitalId) {
    return null
  }

  const previousStepHref = `${onboardingBase}/payment?hospitalId=${hospitalId}`

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <LicenseHistorySection form={form} />

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

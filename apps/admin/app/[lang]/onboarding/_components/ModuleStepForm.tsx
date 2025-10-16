"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Form } from "@workspace/ui/components/form"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import { ModuleAssignmentSection } from "@/app/[lang]/onboarding/_components/sections/ModulesAssignmentSection"
import { FormActionsSection } from "@/app/[lang]/onboarding/_components/sections/FormActionsSection"
import {
  step2Schema,
  type Step2Values,
} from "@/app/[lang]/onboarding/_components/schemas"
import { updateHospitalModules } from "@/lib/hospitals"

const defaultValues: Step2Values = {
  modules: [],
}

export function ModuleStepForm() {
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

  const form = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues,
  })

  const handleReset = () => {
    form.reset(defaultValues)
    setServerError(null)
  }

  const onSubmit = async (values: Step2Values) => {
    if (!hospitalId) return

    setLoading(true)
    setServerError(null)

    try {
      await updateHospitalModules(hospitalId, {
        modules: values.modules || [],
      })

      router.push(`${onboardingBase}/payment?hospitalId=${hospitalId}`)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save modules"
      setServerError(message)
    } finally {
      setLoading(false)
    }
  }

  if (!hospitalId) {
    return null
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <ModuleAssignmentSection form={form} />

        <FormActionsSection
          serverError={serverError}
          loading={loading}
          onReset={handleReset}
          backHref={createHospitalPath}
          submitLabel="Save & Continue"
          submitLoadingLabel="Saving..."
        />
      </form>
    </Form>
  )
}

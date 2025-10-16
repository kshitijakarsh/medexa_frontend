"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Form } from "@workspace/ui/components/form"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import { RegulatoryDocumentSection } from "@/app/[lang]/onboarding/_components/sections/RegulatoryDocumentSection"
import { FormActionsSection } from "@/app/[lang]/onboarding/_components/sections/FormActionsSection"
import {
  step5Schema,
  type Step5Values,
} from "@/app/[lang]/onboarding/_components/schemas"
import { uploadRegulatoryDoc } from "@/lib/hospitals"

const defaultValues: Step5Values = {
  doc_type: "",
  authority_id: "",
  doc_number: "",
  issue_date: "",
  expiry_date: "",
  file_url: "",
  uploaded_by: "",
  verified_by: "",
  verified_at: "",
  status: "pending",
  notes: "",
}

export function RegulatoryDocsStepForm() {
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
  const [docFile, setDocFile] = useState<File | null>(null)
  const [docPreview, setDocPreview] = useState<string | null>(null)

  const form = useForm<Step5Values>({
    resolver: zodResolver(step5Schema),
    defaultValues,
  })

  const handleReset = () => {
    form.reset(defaultValues)
    setServerError(null)
    setDocFile(null)
    setDocPreview(null)
  }

  const onSubmit = async (values: Step5Values) => {
    if (!hospitalId) return

    setLoading(true)
    setServerError(null)

    try {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, String(value))
        }
      })

      if (docFile) {
        formData.append("document", docFile)
      }

      await uploadRegulatoryDoc(hospitalId, formData)

      alert("Hospital onboarded successfully!")
      router.push(`/${lang}/hospitals`)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to upload document"
      setServerError(message)
    } finally {
      setLoading(false)
    }
  }

  if (!hospitalId) {
    return null
  }

  const previousStepHref = `${onboardingBase}/licence-history?hospitalId=${hospitalId}`

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <RegulatoryDocumentSection
          form={form}
          docFile={docFile}
          setDocFile={setDocFile}
          docPreview={docPreview}
          setDocPreview={setDocPreview}
        />

        <FormActionsSection
          serverError={serverError}
          loading={loading}
          onReset={handleReset}
          backHref={previousStepHref}
          submitLabel="Complete Onboarding"
          submitLoadingLabel="Submitting..."
        />
      </form>
    </Form>
  )
}

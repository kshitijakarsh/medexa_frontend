"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import { Form } from "@workspace/ui/components/form"
import { Header } from "@/components/header"
import { FormHeader } from "@/app/[lang]/onboarding/_components/ui/FormHeader"
import { StepHospitalBase } from "@/app/[lang]/onboarding/_components/sections/StepHospitalBase"
import { FormActionsSection } from "@/app/[lang]/onboarding/_components/sections/FormActionsSection"
import {
  step1Schema,
  type Step1Values,
} from "@/app/[lang]/onboarding/_components/schemas"
import { createTenantApiClient } from "@/lib/api/tenant"

const defaultValues: Step1Values = {
  tenant_key: "",
  external_id: "",
  name_en: "",
  name_local: "",
  country_id: 0,
  regulatory_authority_id: 0,
  license_number: "",
  license_expiry: "",
  license_type: "",
  commercial_reg_no: "",
  primary_admin_name: "",
  primary_admin_email: "",
  primary_admin_id_no: "",
  currency_code: "",
  vat_registered: false,
  vat_number: "",
  user_full_name: "",
  user_password: "",
}

export function CreateHospitalForm() {
  const router = useRouter()
  const params = useParams<{ lang: string }>()
  const lang = params?.lang ?? "en"
  const onboardingModulesPath = `/${lang}/onboarding/modules`

  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  })

  const onLogoSelected = (file?: File | null) => {
    setLogoFile(file ?? null)

    if (!file) {
      setLogoPreview(null)
      return
    }

    const reader = new FileReader()
    reader.onload = (event) =>
      setLogoPreview(event.target?.result ? String(event.target.result) : null)
    reader.readAsDataURL(file)
  }

  const onSubmit = async (values: Step1Values) => {
    setLoading(true)
    setServerError(null)

    try {
      const tenantApiClient = createTenantApiClient({ authToken: "" })
      const response = await tenantApiClient.createTenant(values)
      const tenantId = String(response.data.data.id)
      router.push(`${onboardingModulesPath}?hospitalId=${tenantId}`)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create tenant"
      setServerError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="flex flex-col items-start justify-between mb-6">
        <FormHeader title="Create Tenant / Hospital" />
        <div className="p-4 w-full py-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              <StepHospitalBase
                form={form}
                logoPreview={logoPreview}
                setLogoPreview={setLogoPreview}
                logoFile={logoFile}
                setLogoFile={setLogoFile}
                onLogoSelected={onLogoSelected}
              />

              <FormActionsSection
                serverError={serverError}
                loading={loading}
                showReset={false}
                submitLabel="Save & Continue"
                submitLoadingLabel="Saving..."
              />
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}

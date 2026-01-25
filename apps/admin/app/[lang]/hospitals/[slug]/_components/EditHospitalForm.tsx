"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import { Form } from "@workspace/ui/components/form"
import { useQuery } from "@tanstack/react-query"
import { Header } from "@/components/header"
import { FormHeader } from "@/app/[lang]/onboarding/_components/ui/FormHeader"
import { StepHospitalBase } from "@/app/[lang]/onboarding/_components/sections/StepHospitalBase"
import { FormActionsSection } from "@/app/[lang]/onboarding/_components/sections/FormActionsSection"
import { editHospitalSchema, type EditHospitalValues } from "./schemas"
import { createTenantApiClient, type Tenant } from "@/lib/api/tenant"
import type { Dictionary } from "@/i18n/get-dictionary"


interface EditHospitalFormProps {
  tenantId: string
  dict: Dictionary
}

export function EditHospitalForm({ tenantId, dict }: EditHospitalFormProps) {
  const router = useRouter()
  const params = useParams<{ lang: string }>()
  const lang = params?.lang ?? "en"

  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  // Fetch tenant data
  const { data: tenantData, isLoading: isLoadingTenant } = useQuery<Tenant>({
    queryKey: ["tenant", tenantId],
    queryFn: async () => {
      const tenantApiClient = createTenantApiClient({ authToken: "" })
      const response = await tenantApiClient.getTenantById(tenantId)
      return response.data.data
    },
    enabled: !!tenantId,
  })

  const form = useForm<EditHospitalValues>({
    resolver: zodResolver(editHospitalSchema),
    defaultValues: {
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
      primary_admin_password: "",
      currency_code: "",
      vat_registered: false,
      vat_number: "",
    },
  })

  // Pre-populate form when tenant data is loaded
  useEffect(() => {
    if (tenantData) {
      form.reset({
        tenant_key: tenantData.tenant_key || "",
        external_id: tenantData.external_id || "",
        name_en: tenantData.name_en || "",
        name_local: tenantData.name_local || "",
        country_id: tenantData.country_id || tenantData.country?.id || 0,
        regulatory_authority_id: tenantData.regulatory_authority_id || tenantData.regulatory_authority?.id || 0,
        license_number: tenantData.license_number || "",
        license_expiry: isoToDatetimeLocal(tenantData.license_expiry || ""),
        license_type: tenantData.license_type || "",
        commercial_reg_no: tenantData.commercial_reg_no || "",
        primary_admin_name: tenantData.primary_admin_name || "",
        primary_admin_email: tenantData.primary_admin_email || "",
        primary_admin_id_no: tenantData.primary_admin_id_no || "",
        primary_admin_password: "", // Don't pre-fill password
        currency_code: tenantData.currency_code || tenantData.country?.currency_code || "",
        vat_registered: tenantData.vat_registered ?? false,
        vat_number: tenantData.vat_number || "",
      })

      // If tenant has a logo URL, set it as preview
      // Note: You may need to fetch the logo separately if it's stored differently
      // For now, we'll leave logoPreview as null and let user upload new one
    }
  }, [tenantData, form])

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

  // Helper function to convert ISO date string to datetime-local format
  const isoToDatetimeLocal = (isoString: string): string => {
    if (!isoString) return ""
    try {
      const date = new Date(isoString)
      if (isNaN(date.getTime())) return ""

      // Format as YYYY-MM-DDTHH:mm
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      const hours = String(date.getHours()).padStart(2, "0")
      const minutes = String(date.getMinutes()).padStart(2, "0")

      return `${year}-${month}-${day}T${hours}:${minutes}`
    } catch {
      return ""
    }
  }

  const onSubmit = async (values: EditHospitalValues) => {
    setLoading(true)
    setServerError(null)

    try {
      // Transform data to meet API requirements
      const transformedValues: Record<string, any> = {
        tenant_key: values.tenant_key,
        external_id: values.external_id,
        name_en: values.name_en,
        name_local: values.name_local,
        country_id: values.country_id,
        regulatory_authority_id: values.regulatory_authority_id,
        license_number: values.license_number,
        // Convert datetime-local format to ISO 8601 with timezone
        license_expiry: values.license_expiry.includes("T")
          ? `${values.license_expiry}:00Z`
          : `${values.license_expiry}T00:00:00Z`,
        license_type: values.license_type,
        commercial_reg_no: values.commercial_reg_no,
        primary_admin_name: values.primary_admin_name,
        primary_admin_email: values.primary_admin_email,
        primary_admin_id_no: values.primary_admin_id_no,
        // Only include password if it was provided
        ...(values.primary_admin_password && values.primary_admin_password.length > 0
          ? { primary_admin_password: values.primary_admin_password }
          : {}),
        // Ensure currency_code is uppercase
        currency_code: values.currency_code.toUpperCase(),
        vat_registered: values.vat_registered,
        vat_number: values.vat_number,
      }

      const tenantApiClient = createTenantApiClient({ authToken: "" })
      await tenantApiClient.updateTenant(tenantId, transformedValues)
      // Redirect to hospitals list after successful update
      router.push(`/${lang}/hospitals`)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update hospital"
      setServerError(message)
    } finally {
      setLoading(false)
    }
  }

  if (isLoadingTenant) {
    return (
      <main className="min-h-svh w-full">
        <Header />
        <div className="flex flex-col items-center justify-center p-6">
          <div className="text-lg">Loading hospital data...</div>
        </div>
      </main>
    )
  }

  if (!tenantData) {
    return (
      <main className="min-h-svh w-full">
        <Header />
        <div className="flex flex-col items-center justify-center p-6">
          <div className="text-lg text-red-600">Hospital not found</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="flex flex-col items-start justify-between mb-6">
        <FormHeader title="Edit Hospital" backHref={`/${lang}/hospitals`} />
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
                dict={dict}
              />

              <FormActionsSection
                serverError={serverError}
                loading={loading}
                showReset={false}
                submitLabel="Save Changes"
                submitLoadingLabel="Saving..."
              />
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}


"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "@workspace/ui/hooks/use-form"
import { z } from "@workspace/ui/lib/zod"
import { zodResolver } from "@workspace/ui/lib/zod"
import { Form } from "@workspace/ui/components/form"
import { Button } from "@workspace/ui/components/button"
import { PageHeader } from "@/components/common/page-header"
import { TopEmployeeInfo } from "../../add/_components/TopEmployeeInfo"
import { EmployeeFormTabs } from "../../add/_components/EmployeeFormTabs"
import { Header } from "@/components/header"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createEmployeeApiClient } from "@/lib/api/employees"
import { getAuthToken } from "@/app/utils/onboarding"
import { ROUTES } from "@/lib/routes"
import { useLocaleRoute } from "@/app/hooks/use-locale-route"
import { Skeleton } from "@workspace/ui/components/skeleton"

// Helper for optional number fields that handles empty strings
const optionalNumber = z
  .union([
    z.string().transform((val) => (val === "" ? undefined : Number(val))),
    z.number(),
    z.undefined(),
  ])
  .optional()

// Convert YYYY-MM-DD to ISO datetime for API
const toISODateTime = (dateStr: string | undefined): string | undefined => {
  if (!dateStr) return undefined
  return new Date(dateStr).toISOString()
}

// Convert ISO datetime to YYYY-MM-DD for form input
const toDateString = (isoDate: string | undefined): string | undefined => {
  if (!isoDate) return ""
  return isoDate.split("T")[0]
}

const employeeSchema = z.object({
  // Required fields
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),

  // Dropdown IDs (stored as strings from select, converted to numbers on submit)
  department_id: z.string().optional(),
  designation_id: z.string().optional(),
  specialisation_id: z.string().optional(),
  country_id: z.string().optional(),
  user_id: z.string().optional(),

  // Personal Details
  gender: z.string().optional(),
  date_of_birth: z.string().optional(),
  marital_status: z.string().optional(),
  crp_nid: z.string().optional(),
  crp_nid_expiry: z.string().optional(),
  blood_group: z.string().optional(),
  photo_url: z.any().optional(),

  // Contact Details
  phone: z.string().optional(),
  office_email: z
    .string()
    .email("Invalid email format")
    .optional()
    .or(z.literal("")),
  local_address: z.string().optional(),
  permanent_address: z.string().optional(),
  emergency_contact: z.string().optional(),
  language: z.string().optional(),

  // Employment
  qualification: z.string().optional(),
  year_of_experience: optionalNumber,

  // Visa / License
  visa_start: z.string().optional(),
  visa_end: z.string().optional(),
  passport_no: z.string().optional(),
  passport_expiry: z.string().optional(),
  license_no: z.string().optional(),
  license_expiry: z.string().optional(),

  // Contract Details
  joining_date: z.string().optional(),
  last_working_date: z.string().optional(),
  contract_renewal_date: z.string().optional(),
  contract_expiry_date: z.string().optional(),
  notice_period: optionalNumber,

  // Bank Details
  bank_name: z.string().optional(),
  iban: z.string().optional(),
  account_name: z.string().optional(),
  account_no: z.string().optional(),
  swift_code: z.string().optional(),

  // Payroll
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  basic_salary: optionalNumber,
  gosi_deduction_percentage: optionalNumber,
  gosi: optionalNumber,
  housing_allowance: optionalNumber,

  // Documents
  qchp_document_url: z.any().optional(),
  passport_document_url: z.any().optional(),
  id_proof_document_url: z.any().optional(),
  contract_document_url: z.any().optional(),
  signature_document_url: z.any().optional(),
})

import { useFileUpload } from "@/app/hooks/useFileUpload"

// ... imports

export default function EditEmployeePage() {
  const { id } = useParams()
  const router = useRouter()
  const { withLocale } = useLocaleRoute()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState("Personal Details")
  const [authToken, setAuthToken] = useState<string>("")
  const { uploadFile, isUploading } = useFileUpload()

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAuthToken()
        setAuthToken(token)
      } catch (error) {
        console.error("Failed to get auth token:", error)
      }
    }
    fetchToken()
  }, [])

  const employeeClient = useMemo(() => {
    if (!authToken) return null
    return createEmployeeApiClient({ authToken })
  }, [authToken])

  const {
    data: employeeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      if (!employeeClient || !id) throw new Error("API client not initialized")

      const response = await employeeClient.getEmployee(Number(id))
      return response.data.data
    },
    enabled: !!employeeClient && !!id,
  })

  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      department_id: "",
      designation_id: "",
      specialisation_id: "",
      country_id: "",

      // Personal Details
      gender: "",
      date_of_birth: "",
      marital_status: "",
      crp_nid: "",
      crp_nid_expiry: "",
      blood_group: "",
      photo_url: undefined,

      // Contact Details
      phone: "",
      office_email: "",
      local_address: "",
      permanent_address: "",
      emergency_contact: "",
      language: "",

      // Employment
      qualification: "",
      year_of_experience: "",

      // Visa / License
      visa_start: "",
      visa_end: "",
      passport_no: "",
      passport_expiry: "",
      license_no: "",
      license_expiry: "",

      // Contract Details
      joining_date: "",
      last_working_date: "",
      contract_renewal_date: "",
      contract_expiry_date: "",
      notice_period: "",

      // Bank Details
      bank_name: "",
      iban: "",
      account_name: "",
      account_no: "",
      swift_code: "",

      // Payroll
      date_from: "",
      date_to: "",
      basic_salary: "",
      gosi_deduction_percentage: "",
      gosi: "",
      housing_allowance: "",

      // Documents
      qchp_document_url: undefined,
      passport_document_url: undefined,
      id_proof_document_url: undefined,
      contract_document_url: undefined,
      signature_document_url: undefined,
    },
  })

  // Populate form when employee data is loaded
  useEffect(() => {
    if (employeeData) {
      console.log("Resetting form with:", employeeData)
      form.reset({
        first_name: employeeData.first_name || "",
        last_name: employeeData.last_name || "",
        department_id: (employeeData.department_id && employeeData.department_id !== 0) ? String(employeeData.department_id) : "",
        designation_id: (employeeData.designation_id && employeeData.designation_id !== 0) ? String(employeeData.designation_id) : "",
        specialisation_id: (employeeData.specialisation_id && employeeData.specialisation_id !== 0) ? String(employeeData.specialisation_id) : "",
        country_id: (employeeData.country_id && employeeData.country_id !== 0) ? String(employeeData.country_id) : "",
        user_id: (employeeData.user_id && employeeData.user_id !== 0) ? String(employeeData.user_id) : "",
        // Personal Details
        gender: employeeData.gender || "",
        date_of_birth: toDateString(employeeData.date_of_birth),
        marital_status: employeeData.marital_status || "",
        crp_nid: employeeData.crp_nid || "",
        crp_nid_expiry: toDateString(employeeData.crp_nid_expiry),
        blood_group: employeeData.blood_group || "",
        photo_url: employeeData.photo_url || undefined,
        // Contact Details
        phone: employeeData.phone || "",
        office_email: employeeData.office_email || "",
        local_address: employeeData.local_address || "",
        permanent_address: employeeData.permanent_address || "",
        emergency_contact: employeeData.emergency_contact || "",
        language: employeeData.language || "",
        // Employment
        qualification: employeeData.qualification || "",
        year_of_experience: employeeData.year_of_experience || undefined,
        // Visa / License
        visa_start: toDateString(employeeData.visa_start),
        visa_end: toDateString(employeeData.visa_end),
        passport_no: employeeData.passport_no || "",
        passport_expiry: toDateString(employeeData.passport_expiry),
        license_no: employeeData.license_no || "",
        license_expiry: toDateString(employeeData.license_expiry),
        // Contract Details
        joining_date: toDateString(employeeData.joining_date),
        last_working_date: toDateString(employeeData.last_working_date),
        contract_renewal_date: toDateString(employeeData.contract_renewal_date),
        contract_expiry_date: toDateString(employeeData.contract_expiry_date),
        notice_period: employeeData.notice_period || undefined,
        // Bank Details
        bank_name: employeeData.bank_name || "",
        iban: employeeData.iban || "",
        account_name: employeeData.account_name || "",
        account_no: employeeData.account_no || "",
        swift_code: employeeData.swift_code || "",
        // Payroll
        date_from: toDateString(employeeData.date_from),
        date_to: toDateString(employeeData.date_to),
        basic_salary: employeeData.basic_salary || undefined,
        gosi_deduction_percentage:
          employeeData.gosi_deduction_percentage || undefined,
        gosi: employeeData.gosi || undefined,
        housing_allowance: employeeData.housing_allowance || undefined,
        // Documents
        qchp_document_url: employeeData.qchp_document_url || undefined,
        passport_document_url: employeeData.passport_document_url || undefined,
        id_proof_document_url: employeeData.id_proof_document_url || undefined,
        contract_document_url: employeeData.contract_document_url || undefined,
        signature_document_url: employeeData.signature_document_url || undefined,
      })
    }
  }, [employeeData, form])

  const updateMutation = useMutation({
    mutationFn: async (values: any) => {
      if (!employeeClient || !id) throw new Error("API client not initialized")

      // We assume values are already processed (files uploaded, dates formatted) if passed from handleSave,
      // BUT handleSave calls mutateAsync with "raw" form values + uploaded URLs?
      // Actually, standard pattern: prepare data in handleSave, then simple API call in mutation?
      // Or do logic in mutation. 
      // Let's do logic in mutation to keep handleSave clean? 
      // No, file upload is better in handleSave or generally before the "DB transaction" part.
      // However, for simplicity let's stick to the existing structure but fix the DATE formatting inside mutationFn 
      // AND use the values passed to it.

      await employeeClient.updateEmployee(Number(id), {
        first_name: values.first_name,
        last_name: values.last_name,
        // IDs - convert string to number
        department_id: values.department_id ? Number(values.department_id) : undefined,
        designation_id: values.designation_id ? Number(values.designation_id) : undefined,
        specialisation_id: values.specialisation_id ? Number(values.specialisation_id) : undefined,
        country_id: values.country_id ? Number(values.country_id) : undefined,
        user_id: values.user_id ? Number(values.user_id) : undefined,

        // Personal Details - FIX DATES HERE
        gender: values.gender || undefined,
        date_of_birth: toISODateTime(values.date_of_birth),
        marital_status: values.marital_status || undefined,
        crp_nid: values.crp_nid || undefined,
        crp_nid_expiry: toISODateTime(values.crp_nid_expiry),
        blood_group: values.blood_group || undefined,
        photo_url: values.photo_url || undefined,

        // Contact Details
        phone: values.phone || undefined,
        office_email: values.office_email || undefined,
        local_address: values.local_address || undefined,
        permanent_address: values.permanent_address || undefined,
        emergency_contact: values.emergency_contact || undefined,
        language: values.language || undefined,

        // Employment
        qualification: values.qualification || undefined,
        year_of_experience: values.year_of_experience || undefined,

        // Visa / License
        visa_start: toISODateTime(values.visa_start),
        visa_end: toISODateTime(values.visa_end),
        passport_no: values.passport_no || undefined,
        passport_expiry: toISODateTime(values.passport_expiry),
        license_no: values.license_no || undefined,
        license_expiry: toISODateTime(values.license_expiry),

        // Contract Details
        joining_date: toISODateTime(values.joining_date),
        last_working_date: toISODateTime(values.last_working_date),
        contract_renewal_date: toISODateTime(values.contract_renewal_date),
        contract_expiry_date: toISODateTime(values.contract_expiry_date),
        notice_period: values.notice_period || undefined,

        // Bank Details
        bank_name: values.bank_name || undefined,
        iban: values.iban || undefined,
        account_name: values.account_name || undefined,
        account_no: values.account_no || undefined,
        swift_code: values.swift_code || undefined,

        // Payroll
        date_from: toISODateTime(values.date_from),
        date_to: toISODateTime(values.date_to),
        basic_salary: values.basic_salary || undefined,
        gosi_deduction_percentage: values.gosi_deduction_percentage || undefined,
        gosi: values.gosi || undefined,
        housing_allowance: values.housing_allowance || undefined,

        // Documents
        qchp_document_url: values.qchp_document_url || undefined,
        passport_document_url: values.passport_document_url || undefined,
        id_proof_document_url: values.id_proof_document_url || undefined,
        contract_document_url: values.contract_document_url || undefined,
        signature_document_url: values.signature_document_url || undefined,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      queryClient.invalidateQueries({ queryKey: ["employee", id] })
      router.push(withLocale(ROUTES.HR_EMPLOYEE_CONFIGURATION))
    },
  })

  const handleSave = async (values: any) => {
    try {
      const updatedValues = { ...values }

      // Helper to upload file if it's a File object
      const checkAndUploadFile = async (key: string) => {
        const file = values[key]
        if (file instanceof File) {
          const url = await uploadFile(file, "employees")
          updatedValues[key] = url
        }
      }

      // Check all file fields
      await checkAndUploadFile("photo_url")
      await checkAndUploadFile("qchp_document_url")
      await checkAndUploadFile("passport_document_url")
      await checkAndUploadFile("id_proof_document_url")
      await checkAndUploadFile("contract_document_url")
      await checkAndUploadFile("signature_document_url")

      await updateMutation.mutateAsync(updatedValues)
    } catch (error) {
      console.error("Failed to update employee:", error)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
        <Header />
        <div className="p-5 space-y-8">
          <div className="bg-white p-5 rounded-md shadow-sm space-y-6">
            {/* Header Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>

            {/* Top Info Form Skeleton */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="flex flex-wrap gap-2 border-b pb-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-9 w-32 rounded-md" />
              ))}
            </div>

            {/* Content Area Skeleton */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
        <Header />
        <div className="p-5 space-y-8">
          <div className="bg-white p-5 rounded-md shadow-sm">
            <div className="text-center py-8 text-red-600">
              {error instanceof Error
                ? error.message
                : "Failed to load employee"}
            </div>
            <div className="flex justify-center">
              <Button onClick={() => router.push(withLocale(ROUTES.HR_EMPLOYEE_CONFIGURATION))}>
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
      <Header />

      <div className="p-5 space-y-8">
        <div className="bg-white p-5 rounded-md shadow-sm space-y-6">
          <PageHeader title="Edit Human Resource / Employee" />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="space-y-6"
            >
              {/* Always visible top info */}
              <TopEmployeeInfo form={form} authToken={authToken} />

              {/* Tabs for section forms */}
              <EmployeeFormTabs
                form={form}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                authToken={authToken}
                initialData={employeeData}
              />

              {/* Save/Cancel */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  className="text-blue-600 border-blue-500"
                  onClick={() => router.push("/employee-configuration")}
                  disabled={updateMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}

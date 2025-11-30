"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "@workspace/ui/hooks/use-form"
import { z } from "@workspace/ui/lib/zod"
import { zodResolver } from "@workspace/ui/lib/zod"
import { Form } from "@workspace/ui/components/form"
import { Button } from "@workspace/ui/components/button"
import { PageHeader } from "@/components/common/page-header"
import { TopEmployeeInfo } from "./_components/TopEmployeeInfo"
import { EmployeeFormTabs } from "./_components/EmployeeFormTabs"
import { Header } from "@/components/header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEmployeeApiClient } from "@/lib/api/employees"
import { getAuthToken } from "@/app/utils/onboarding"

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
  photo_url: z.string().optional(),

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
  qchp_document_url: z.string().optional(),
  passport_document_url: z.string().optional(),
  id_proof_document_url: z.string().optional(),
  contract_document_url: z.string().optional(),
  signature_document_url: z.string().optional(),
})

export default function AddEmployeePage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState("Personal Details")
  const [authToken, setAuthToken] = useState<string>("")

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

  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      // Required fields
      first_name: "",
      last_name: "",

      // Dropdown IDs
      department_id: "",
      designation_id: "",
      specialisation_id: "",
      country_id: "",
      user_id: "",

      // Personal Details
      gender: "",
      date_of_birth: "",
      marital_status: "",
      crp_nid: "",
      crp_nid_expiry: "",
      blood_group: "",
      photo_url: "",

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
      qchp_document_url: "",
      passport_document_url: "",
      id_proof_document_url: "",
      contract_document_url: "",
      signature_document_url: "",
    },
  })

  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      if (!employeeClient) throw new Error("API client not initialized")
      await employeeClient.createEmployee({
        first_name: values.first_name,
        last_name: values.last_name,
        // IDs - convert string to number
        department_id: values.department_id
          ? Number(values.department_id)
          : undefined,
        designation_id: values.designation_id
          ? Number(values.designation_id)
          : undefined,
        specialisation_id: values.specialisation_id
          ? Number(values.specialisation_id)
          : undefined,
        country_id: values.country_id ? Number(values.country_id) : undefined,
        user_id: values.user_id ? Number(values.user_id) : undefined,
        // Personal Details
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
        gosi_deduction_percentage:
          values.gosi_deduction_percentage || undefined,
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
      router.push("/hr/employee-configuration")
    },
  })

  const handleSave = async (values: any) => {
    try {
      await createMutation.mutateAsync(values)
    } catch (error) {
      console.error("Failed to create employee:", error)
    }
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
      <Header />

      <div className="p-5 space-y-8">
        <div className="bg-white p-5 rounded-md shadow-sm space-y-6">
          <PageHeader title="Add Human Resource / New Employee" />

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
              />

              {/* Save/Cancel */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  className="text-blue-600 border-blue-500"
                  onClick={() => router.push("/hr/employee-configuration")}
                  disabled={createMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}

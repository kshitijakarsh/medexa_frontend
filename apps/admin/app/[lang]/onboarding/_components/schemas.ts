// Zod schemas for each onboarding step
import { z } from "@workspace/ui/lib/zod"

// Step 1: Tenant Base Information (Hospital = Tenant)
export const step1Schema = z.object({
  tenant_key: z.string().min(1, "Tenant key is required"),
  external_id: z.string().min(1, "External ID is required"),
  name_en: z.string().min(3, "Hospital name (English) is required"),
  name_local: z.string().min(1, "Hospital name (Local) is required"),
  country_id: z.number().int().min(1, "Country is required"),
  regulatory_authority_id: z
    .number()
    .int()
    .min(1, "Regulatory authority is required"),
  license_number: z.string().min(1, "License number is required"),
  license_expiry: z.string().min(1, "License expiry is required"),
  license_type: z.string().min(1, "License type is required"),
  commercial_reg_no: z
    .string()
    .min(1, "Commercial registration number is required"),
  primary_admin_name: z.string().min(1, "Primary admin name is required"),
  primary_admin_email: z.email("Invalid email"),
  primary_admin_id_no: z.string().min(1, "Primary admin ID number is required"),
  currency_code: z
    .string()
    .length(3, "Currency code must be exactly 3 characters"),
  vat_registered: z.boolean(),
  vat_number: z.string().min(1, "VAT number is required"),
  user_full_name: z.string().min(1, "User full name is required"),
  user_password: z.string().min(1, "User password is required"),
})

export type Step1Values = z.infer<typeof step1Schema>

// Step 2: Module Assignment
export const step2Schema = z.object({
  modules: z.array(z.string()).min(0),
})

export type Step2Values = z.infer<typeof step2Schema>

// Step 3: Payment Details
export const step3Schema = z.object({
  gateway_id: z.number().int().min(1, "Gateway ID is required"),
  merchant_id: z.string().min(1, "Merchant ID is required"),
  terminal_key: z.string().min(1, "Terminal key is required"),
  vault_path: z.string().min(1, "Vault path is required"),
  bank_name: z.string().min(1, "Bank name is required"),
  bank_account_no: z.string().min(1, "Bank account number is required"),
  vat_registered: z.boolean(),
  vat_number: z.string().min(1, "VAT number is required"),
  currency_code: z
    .string()
    .length(3, "Currency code must be exactly 3 characters"),
  active: z.boolean(),
})

export type Step3Values = z.infer<typeof step3Schema>

// Step 4: License History
export const step4Schema = z.object({
  plan_key: z.string().min(1, "Plan key is required"),
  seats: z.number().int().min(0, "Seats is required"),
  storage_quota_mb: z.number().int().min(0, "Storage quota is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  auto_renew: z.boolean(),
  status: z.string().min(1, "Status is required"),
})

export type Step4Values = z.infer<typeof step4Schema>

// Step 5: Regulatory Document
export const step5Schema = z.object({
  doc_type: z.string().min(1, "Document type is required"),
  authority_id: z.number().int().min(1, "Authority ID is required"),
  doc_number: z.string().min(1, "Document number is required"),
  issue_date: z.string().min(1, "Issue date is required"),
  expiry_date: z.string().min(1, "Expiry date is required"),
  file_url: z.string().min(1, "File is required"),
  uploaded_by: z.number().int().min(1, "Uploaded by is required"),
  verified_by: z.number().int().optional(),
  status: z.string().optional(),
  notes: z.string().optional(),
})

export type Step5Values = z.infer<typeof step5Schema>

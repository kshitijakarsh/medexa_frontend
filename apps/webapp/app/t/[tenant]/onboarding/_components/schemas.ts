// Zod schemas for hospital verification steps
import { z } from "@workspace/ui/lib/zod"

// Step 6: Hospital Information (removed from onboarding flow)
export const hospitalInfoSchema = z.object({
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
  currency_code: z
    .string()
    .length(3, "Currency code must be exactly 3 characters")
    .regex(/^[A-Z]{3}$/, "Currency code must be 3 uppercase letters")
    .transform((val) => val.toUpperCase()),
  vat_registered: z.boolean(),
  vat_number: z.string().min(1, "VAT number is required"),
})

export type HospitalInfoValues = z.infer<typeof hospitalInfoSchema>

// Step 6: Module Assignment
export const modulesSchema = z.object({
  modules: z.array(z.string()).min(1, "At least one module must be selected"),
})

export type ModulesValues = z.infer<typeof modulesSchema>

// Step 7: Payment Details
export const paymentSchema = z.object({
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

export type PaymentValues = z.infer<typeof paymentSchema>

// Step 8: License History
export const licenseHistorySchema = z.object({
  plan_key: z.string().min(1, "Plan key is required"),
  seats: z.number().int().min(0, "Seats is required"),
  storage_quota_mb: z.number().int().min(0, "Storage quota is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  auto_renew: z.boolean(),
  status: z.string().min(1, "Status is required"),
})

export type LicenseHistoryValues = {
  plan_key: string
  seats: number
  storage_quota_mb: number
  start_date: string
  end_date: string
  auto_renew: boolean
  status: string
}

// Step 9: Regulatory Document
export const regulatoryDocSchema = z.object({
  doc_type: z.string().min(1, "Document type is required"),
  authority_id: z.number().int().min(1, "Authority ID is required"),
  doc_number: z.string().min(1, "Document number is required"),
  issue_date: z.string().min(1, "Issue date is required"),
  expiry_date: z.string().min(1, "Expiry date is required"),
  file_url: z.string().min(1, "File is required"),
  status: z.string().optional(),
  notes: z.string().optional(),
})

export type RegulatoryDocValues = {
  doc_type: string
  authority_id: number
  doc_number: string
  issue_date: string
  expiry_date: string
  file_url: string
  status?: string
  notes?: string
}

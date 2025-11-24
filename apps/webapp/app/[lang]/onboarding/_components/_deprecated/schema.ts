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

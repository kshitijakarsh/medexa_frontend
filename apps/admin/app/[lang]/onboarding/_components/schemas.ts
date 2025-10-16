// Zod schemas for each onboarding step
import { z } from "@workspace/ui/lib/zod"

// Step 1: Hospital Base Information
export const step1Schema = z.object({
  hospitalName: z.string().min(3, "Hospital name is required"),
  mophLicenseNumber: z.string().optional(),
  tradeLicense: z.string().optional(),
  taxRegistrationNumber: z.string().optional(),
  contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  contactPhone: z
    .string()
    .optional()
    .refine((v) => !v || /^[+\d\s()-]{7,20}$/.test(v), "Invalid phone"),
  emergencyContactNumber: z.string().optional(),
  city: z.string().optional(),
  fullAddress: z.string().optional(),
  adminFullName: z.string().optional(),
  adminDesignation: z.string().optional(),
  adminEmail: z.string().optional(),
  adminPhone: z.string().optional(),
  userFullName: z.string().optional(),
  userPassword: z.string().min(6, "Password must be at least 6 characters"),
})

export type Step1Values = z.infer<typeof step1Schema>

// Step 2: Module Assignment
export const step2Schema = z.object({
  modules: z.array(z.string()).min(0),
})

export type Step2Values = z.infer<typeof step2Schema>

// Step 3: Payment Details
export const step3Schema = z.object({
  gateway_id: z.string().min(1, "Gateway ID is required"),
  merchant_id: z.string().optional(),
  terminal_key: z.string().optional(),
  vault_path: z.string().optional(),
  bank_name: z.string().optional(),
  bank_account_no: z.string().optional(),
  vat_registered: z.boolean().optional(),
  vat_number: z.string().optional(),
  currency_code: z
    .string()
    .length(3, "Currency code must be exactly 3 characters")
    .optional()
    .or(z.literal("")),
})

export type Step3Values = z.infer<typeof step3Schema>

// Step 4: License History
export const step4Schema = z.object({
  plan_key: z.string().min(1, "Plan key is required"),
  seats: z.number().int().min(0).optional(),
  storage_quota_mb: z.number().int().min(0).optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  auto_renew: z.boolean().optional(),
  status: z.string().optional(),
})

export type Step4Values = z.infer<typeof step4Schema>

// Step 5: Regulatory Document
export const step5Schema = z.object({
  doc_type: z.string().min(1, "Document type is required"),
  authority_id: z.string().optional(),
  doc_number: z.string().optional(),
  issue_date: z.string().optional(),
  expiry_date: z.string().optional(),
  file_url: z.string().min(1, "File is required"),
  uploaded_by: z.string().optional(),
  verified_by: z.string().optional(),
  verified_at: z.string().optional(),
  status: z.string().optional(),
  notes: z.string().optional(),
})

export type Step5Values = z.infer<typeof step5Schema>

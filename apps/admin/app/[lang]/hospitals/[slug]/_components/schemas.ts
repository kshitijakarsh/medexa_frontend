// Zod schema for editing hospital/tenant information
// Password is optional in edit mode
import { z } from "@workspace/ui/lib/zod"

export const editHospitalSchema = z.object({
  // tenant_key: z.string().min(1, "Tenant key is required").regex(/^[a-zA-Z0-9_-]+$/, "Tenant key must contain only letters, numbers, underscores, or hyphens"),
  tenant_key: z
		.string()
		.min(3, { message: "Tenant key must be at least 3 characters long" })
		.max(50, { message: "Tenant key cannot exceed 50 characters" })
		.regex(/^[a-zA-Z0-9_-]+$/, { message: "Tenant key can only contain alphanumeric characters, hyphens, and underscores" }),
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
  // Password is optional in edit mode - only validate if provided
  primary_admin_password: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 8,
      { message: "Password must be at least 8 characters long." }
    )
    .refine(
      (val) => !val || /[0-9]/.test(val),
      { message: "Password must contain at least one number." }
    )
    .refine(
      (val) => !val || /[A-Z]/.test(val),
      { message: "Password must contain at least one uppercase letter." }
    )
    .refine(
      (val) => !val || /[a-z]/.test(val),
      { message: "Password must contain at least one lowercase letter." }
    )
    .refine(
      (val) => !val || /[^A-Za-z0-9]/.test(val),
      { message: "Password must contain at least one special character." }
    ),
  currency_code: z
    .string()
    .length(3, "Currency code must be exactly 3 characters")
    .regex(/^[A-Z]{3}$/, "Currency code must be 3 uppercase letters")
    .transform((val) => val.toUpperCase()),
  vat_registered: z.boolean(),
  vat_number: z.string().min(1, "VAT number is required"),
})

export type EditHospitalValues = z.infer<typeof editHospitalSchema>


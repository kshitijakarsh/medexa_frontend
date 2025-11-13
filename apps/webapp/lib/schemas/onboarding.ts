import { z } from "@workspace/ui/lib/zod"

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

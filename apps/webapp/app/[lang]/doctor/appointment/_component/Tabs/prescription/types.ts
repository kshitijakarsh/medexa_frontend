// components/prescription/types.ts
import { z } from "@workspace/ui/lib/zod";

// Schema for prescription item based on API requirements
export const prescriptionItemSchema = z.object({
  medicine_id: z
    .coerce
    .number()
    .positive({ message: "Medicine ID is required" }),

  dosage: z
    .string()
    .min(1, { message: "Dosage is required" })
    .max(100, { message: "Dosage cannot exceed 100 characters" })
    .trim(),

  route: z
    .string()
    .max(100, { message: "Route cannot exceed 100 characters" })
    .trim()
    .optional()
    .nullable(),

  frequency: z
    .string()
    .min(1, { message: "Frequency is required" })
    .max(100, { message: "Frequency cannot exceed 100 characters" })
    .trim(),

  duration: z
    .string()
    .max(100, { message: "Duration cannot exceed 100 characters" })
    .trim()
    .optional()
    .nullable(),

  medication_instructions: z
    .string()
    .trim()
    .optional()
    .nullable(),
});

// Legacy medication form schema (for modal UI)
export const medicationSchema = z.object({
  medication: z.string().min(1, "Medication is required"),
  medicine_id: z.number().optional(),
  dosage: z.string().min(1, "Dosage is required"),
  route: z.string().optional(),
  interval: z.string().min(1, "Dose interval is required"),
  duration: z.string().min(1, "Duration is required"),
  instructions: z.string().optional(),
});

export type MedicationForm = z.infer<typeof medicationSchema>;
export type PrescriptionItemPayload = z.infer<typeof prescriptionItemSchema>;

// UI-specific prescription item interface
export interface PrescriptionItem {
  id: number;
  medicine_id?: number;
  medication: string;
  dosage: string;
  route?: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

// API Prescription Item interface
export interface ApiPrescriptionItem {
  id?: number;
  medicine_id: number;
  dosage: string;
  route?: string | null;
  frequency: string;
  duration?: string | null;
  medication_instructions?: string | null;
  medicine?: {
    id: number;
    medicine: string;
    type: string;
  };
}


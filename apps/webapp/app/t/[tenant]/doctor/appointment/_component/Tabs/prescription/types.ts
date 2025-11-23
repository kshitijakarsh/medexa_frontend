// components/prescription/types.ts
import { z } from "@workspace/ui/lib/zod";

export const medicationSchema = z.object({
  medication: z.string().min(1, "Medication is required"),
  dosage: z.string().min(1, "Dosage is required"),
  interval: z.string().min(1, "Dose interval is required"),
  duration: z.string().min(1, "Duration is required"),
  instructions: z.string().optional(),
});

export type MedicationForm = z.infer<typeof medicationSchema>;

export interface PrescriptionItem {
  id: number;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

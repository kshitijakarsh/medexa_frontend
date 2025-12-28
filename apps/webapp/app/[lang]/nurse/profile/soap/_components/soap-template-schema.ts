import { z } from "@workspace/ui/lib/zod";

export const soapTemplateSchema = z.object({
  template_name: z.string().min(1, "Template name is required"),
  specialty: z.string().min(1, "Specialty is required"),
  subjective: z.string().min(1, "Subjective is required"),
  objective: z.string().min(1, "Objective is required"),
  assessment: z.string().min(1, "Assessment is required"),
  plan: z.string().min(1, "Plan is required"),
});

export type SoapTemplateFormSchema = z.infer<typeof soapTemplateSchema>;

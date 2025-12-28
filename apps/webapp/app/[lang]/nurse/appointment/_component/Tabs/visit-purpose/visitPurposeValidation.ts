// validation/visitPurposeValidation.ts

import { VisitPurposeData } from "./VisitPurpose";

// Allowed rules for each field
export const VALIDATION_RULES: Record<keyof VisitPurposeData, RegExp> = {
  chiefComplaint: /^[A-Za-z0-9 .,()-]{0,100}$/,
  history: /^[A-Za-z0-9 .,()\-\/\n]{0,800}$/,
  onset: /^[A-Za-z0-9 ]{0,50}$/,     // dropdown — no special chars
  duration: /^[A-Za-z0-9 ]{0,50}$/,  // dropdown — no special chars
  severity: /^[A-Za-z0-9 ]{0,50}$/,  // dropdown — no special chars
  additional_notes: /^[A-Za-z0-9 .,()\-\/\n]{0,800}$/,
};

// Main validator
export function validateField(
  field: keyof VisitPurposeData,
  value: string
): string | null {

  const rule = VALIDATION_RULES[field];

  if (!rule) return null; // safety fallback

  if (!rule.test(value)) {
    return "Invalid characters entered";
  }

  return null;
}

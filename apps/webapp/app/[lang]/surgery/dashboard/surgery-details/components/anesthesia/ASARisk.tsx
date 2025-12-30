"use client";

import { Textarea } from "@workspace/ui/components/textarea";
import { InfoField } from "@/app/[lang]/surgery/components/common/InfoField";
import { NoteField } from "@/app/[lang]/surgery/components/common/NoteField";
import { SelectField } from "@/app/[lang]/surgery/components/common/SelectField";

const ASA_OPTIONS = [
  { value: "asa_1", label: "ASA I - Normal healthy patient" },
  { value: "asa_2", label: "ASA II - Mild systemic disease" },
  { value: "asa_3", label: "ASA III - Severe systemic disease" },
  { value: "asa_4", label: "ASA IV - Life-threatening disease" },
  { value: "asa_5", label: "ASA V - Moribund patient" },
];

const RISK_LEVEL_OPTIONS = [
  { value: "low", label: "Low Risk" },
  { value: "moderate", label: "Moderate Risk" },
  { value: "high", label: "High Risk" },
];

const RISK_CONFIG = [
  {
    key: "asa",
    label: "ASA Physical Status Classification",
    placeholder: "Select ASA Physical Status Classification",
    value: "ASA I - Normal healthy patient",
    options: ASA_OPTIONS,
  },
  {
    key: "risk",
    label: "Surgery Risk Level",
    placeholder: "Select Surgery Risk Level",
    value: "High Risk",
    isHighRisk: true,
    options: RISK_LEVEL_OPTIONS,
  },
];

interface ASARiskProps {
  isEditing?: boolean;
}

export const ASARisk = ({ isEditing = false }: ASARiskProps) => {
  return (
    <div className="flex flex-col gap-2">
      {isEditing ? (
        <>
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RISK_CONFIG.map((field) => (
              <SelectField
                key={field.key}
                label={field.label}
                placeholder={field.placeholder}
                options={field.options}
              />
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-800">
              Risk Notes
            </label>
            <Textarea
              placeholder="Enter Risk Notes"
              className="min-h-[160px] resize-none bg-white border-slate-200 text-sm focus-visible:ring-blue-500"
            />
          </div>
        </>
      ) : (
        <>
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {RISK_CONFIG.map((field) => (
              <InfoField
                key={field.key}
                label={field.label}
                value={field.value}
                variant={field.isHighRisk ? "alert" : "default"}
              />
            ))}
          </div>

          {/* Additional Notes */}
          <NoteField
            label="Additional Notes"
            value="Patient has CAD with previous angioplasty. Diabetic with fair control. Risk of cardiac events during surgery is moderate to high."
          />
        </>
      )}
    </div>
  );
};

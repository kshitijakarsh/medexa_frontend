"use client";

import { Textarea } from "@workspace/ui/components/textarea";
import { InfoField } from "@/app/[lang]/surgery/components/common/InfoField";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import { SelectField } from "@/app/[lang]/surgery/components/common/SelectField";

const ANESTHESIA_TYPES = [
  { value: "general", label: "General Anesthesia" },
  { value: "regional", label: "Regional Anesthesia" },
  { value: "local", label: "Local Anesthesia" },
  { value: "spinal", label: "Spinal Anesthesia" },
  { value: "epidural", label: "Epidural Anesthesia" },
  { value: "sedation_mac", label: "Sedation / MAC" },
];

const MONITORING_OPTIONS = [
  { value: "ecg", label: "ECG" },
  { value: "spo2", label: "SpO₂" },
  { value: "nibp", label: "NIBP" },
  { value: "invasive_bp", label: "Invasive BP (Arterial Line)" },
  { value: "cvp", label: "CVP" },
  { value: "bis", label: "BIS" },
  { value: "etco2", label: "EtCO₂" },
  { value: "temperature", label: "Temperature" },
];

const VENTILATION_OPTIONS = [
  { value: "not_required", label: "Not Required" },
  { value: "short_term", label: "Short-term Ventilation" },
  { value: "prolonged", label: "Prolonged Ventilation" },
];

const ICU_OPTIONS = [
  { value: "not_required", label: "Not Required" },
  { value: "standby", label: "Standby" },
  { value: "planned_admission", label: "Planned ICU Admission" },
];

const MultiSelectField = ({
  label,
  options,
}: {
  label: string;
  options: { value: string; label: string }[];
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-slate-800">{label}</label>
    <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox id={option.value} />
          <Label htmlFor={option.value} className="text-sm text-slate-600 font-normal cursor-pointer">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  </div>
);

interface PlanDetailsProps {
  isEditing?: boolean;
}

export const PlanDetails = ({ isEditing = false }: PlanDetailsProps) => {
  return (
    <div className="flex flex-col gap-6">
      {isEditing ? (
        <>
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Anesthesia Type"
              placeholder="Select Anesthesia Type"
              options={ANESTHESIA_TYPES}
            />
            <MultiSelectField
              label="Monitoring Required"
              options={MONITORING_OPTIONS}
            />
            <SelectField
              label="Post-operative Ventilation Needed"
              placeholder="Select Post-operative Ventilation Needed"
              options={VENTILATION_OPTIONS}
            />
            <SelectField
              label="ICU Requirement"
              placeholder="Select ICU Requirement"
              options={ICU_OPTIONS}
            />
          </div>

          {/* Airway Management Plan */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-800">
              Airway Management Plan
            </label>
            <Textarea
              placeholder="Plan for endotracheal intubation under general anesthesia. Standard laryngoscopy anticipated. Difficult airway equipment to be kept ready as precaution."
              className="min-h-[160px] resize-none bg-white border-slate-200 text-sm focus-visible:ring-blue-500"
            />
          </div>
        </>
      ) : (
        <>
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="Anesthesia Type" value="Regional Anesthesia" />
            <InfoField label="Monitoring Required" value="ECG, SpO₂, NIBP" />
            <InfoField label="Post-operative Ventilation Needed" value="Not Required" />
            <InfoField label="ICU Requirement" value="Standby" />
          </div>

          {/* Airway Management Plan */}
          <div className="rounded-xl bg-blue-50 p-4">
            <label className="mb-2 block text-sm font-medium tracking-tight">
              Airway Management Plan
            </label>
            <div className="text-[13px] space-y-0.5">
              <p>Plan for endotracheal intubation under general anesthesia.</p>
              <p>Standard laryngoscopy anticipated.</p>
              <p>Difficult airway equipment to be kept ready as precaution.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { InfoField } from "@/app/[lang]/surgery/components/common/InfoField";
import { NoteField } from "@/app/[lang]/surgery/components/common/NoteField";

const RISK_CONFIG = [
  {
    key: "asa",
    label: "ASA Physical Status Classification",
    placeholder: "Select ASA Physical Status Classification",
    value: "ASA I - Normal healthy patient",
    options: [
      "ASA I - Normal healthy patient",
      "ASA II - Mild systemic disease",
      "ASA III - Severe systemic disease",
      "ASA IV - Severe systemic disease that is a constant threat to life",
      "ASA V - Moribund patient",
      "ASA VI - Brain-dead organ donor",
    ],
  },
  {
    key: "risk",
    label: "Surgery Risk Level",
    placeholder: "Select Surgery Risk Level",
    value: "High Risk",
    isHighRisk: true,
    options: ["Low Risk", "Moderate Risk", "High Risk", "Critical Risk"],
  },
];



const SelectField = ({
  label,
  placeholder,
  options,
}: {
  label: string;
  placeholder: string;
  options: string[];
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-slate-800">{label}</label>
    <Select>
      <SelectTrigger className="w-full bg-white border-slate-200 text-slate-500 text-sm h-10 rounded-lg">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, "-")}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

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

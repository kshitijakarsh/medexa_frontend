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



const SelectField = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-slate-800">{label}</label>
    <Select>
      <SelectTrigger className="w-full bg-white border-slate-200 text-slate-500 text-sm h-10 rounded-lg">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="general">General Anesthesia</SelectItem>
        <SelectItem value="regional">Regional Anesthesia</SelectItem>
        <SelectItem value="local">Local Anesthesia</SelectItem>
        <SelectItem value="sedation">Sedation</SelectItem>
      </SelectContent>
    </Select>
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
            />
            <SelectField
              label="Monitoring Required"
              placeholder="Select Monitoring"
            />
            <SelectField
              label="Post-operative Ventilation Needed"
              placeholder="Select Post-operative Ventilation Needed"
            />
            <SelectField
              label="ICU Requirement"
              placeholder="Select ICU Requirement"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-800">
              Note
            </label>
            <Textarea
              placeholder="Enter Notes"
              className="min-h-[160px] resize-none bg-white border-slate-200 text-sm focus-visible:ring-blue-500"
            />
          </div>
        </>
      ) : (
        <>
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="Anesthesia Type" value="Regional Anesthesia" />
            <InfoField label="Monitoring Required" value="ECG, SpO2, NIBP" />
            <InfoField label="Post-operative Ventilation Needed" value="Not Required" />
            <InfoField label="ICU Requirement" value="Standby" />
          </div>

          {/* Notes */}
          <div className="hidden">
          </div>
        </>
      )}
    </div>
  );
};

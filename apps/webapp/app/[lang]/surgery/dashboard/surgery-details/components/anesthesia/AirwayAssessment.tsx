import { Info } from "lucide-react";
import { InfoField } from "../../../../components/common/InfoField";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/app/[lang]/surgery/components/common/forms/form-textarea";

const MALLAMPATI_GRADE_OPTIONS = [
  { value: "grade1", label: "Grade I – Full visibility of soft palate, uvula, tonsillar pillars" },
  { value: "grade2", label: "Grade II – Soft palate & uvula visible" },
  { value: "grade3", label: "Grade III – Only soft palate visible" },
  { value: "grade4", label: "Grade IV – Only hard palate visible" },
];

const MOUTH_OPENING_OPTIONS = [
  { value: "normal", label: "> 3cm (Normal)" },
  { value: "adequate", label: "2-3cm (Adequate)" },
  { value: "restricted", label: "< 2cm (Restricted)" },
];

const NECK_MOBILITY_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "mildly_restricted", label: "Mildly Restricted" },
  { value: "severely_restricted", label: "Severely Restricted" },
];

const DIFFICULT_AIRWAY_RISK_OPTIONS = [
  { value: "low", label: "Low Risk" },
  { value: "moderate", label: "Moderate Risk" },
  { value: "high", label: "High Risk" },
];

interface AirwayAssessmentProps {
  isEditing?: boolean;
}

export const AirwayAssessment = ({ isEditing = false }: AirwayAssessmentProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex justify-end">
        <div className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-1.5 text-xs text-slate-500 border border-slate-100">
          Recorded by Nurse Sarah on November 14, 2024, at 8:45 AM.
          <Info size={14} className="text-blue-400" />
        </div>
      </div>

      {isEditing ? (
        <>
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormSelect label="Mallampati Grade" placeholder="Select Mallampati Grade" options={MALLAMPATI_GRADE_OPTIONS} />
            <FormSelect label="Mouth Opening" placeholder="Select Mouth Opening" options={MOUTH_OPENING_OPTIONS} />
            <FormSelect label="Neck Mobility" placeholder="Select Neck Mobility" options={NECK_MOBILITY_OPTIONS} />
            <FormSelect label="Difficult Airway Risk" placeholder="Select Risk" options={DIFFICULT_AIRWAY_RISK_OPTIONS} />
          </div>

          {/* Additional Notes */}
          <FormTextarea
            label="Additional Notes"
            placeholder="Patient has adequate mouth opening with normal neck mobility. No history of difficult intubation. Airway assessment suggests low risk for intubation."
            className="min-h-[120px]"
          />
        </>
      ) : (
        <>
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="Mallampati Grade" value="Grade I - Easy" />
            <InfoField label="Mouth Opening" value="No" />
            <InfoField label="Neck Mobility" value="No" />
            <InfoField label="Difficult Airway Risk" value="Flag as Difficult Airway" variant="alert" />
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

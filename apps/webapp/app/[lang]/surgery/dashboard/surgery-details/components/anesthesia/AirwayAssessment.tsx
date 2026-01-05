import React, { useState } from "react";
import { Info, Loader2 } from "lucide-react";
import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { SelectField } from "@/app/[lang]/surgery/_components/common/SelectField";
import { FormTextarea } from "@/app/[lang]/surgery/_components/common/forms/form-textarea";
import { format } from "@workspace/ui/hooks/use-date-fns";
import { Button } from "@workspace/ui/components/button";

const MALLAMPATI_GRADE_OPTIONS = [
  { value: "grade1", label: "Grade 1 - Full visibility" },
  { value: "grade2", label: "Grade 2 - Partial visibility" },
  { value: "grade3", label: "Grade 3 - Epiglottis only" },
  { value: "grade4", label: "Grade 4 - No visibility" },
];

const MOUTH_OPENING_OPTIONS = [
  { value: "normal", label: "Normal (> 3cm)" },
  { value: "restricted", label: "Restricted (< 3cm)" },
];

const NECK_MOBILITY_OPTIONS = [
  { value: "normal", label: "Normal (> 35°)" },
  { value: "restricted", label: "Restricted" },
  { value: "severely_restricted", label: "Severely Restricted" },
];

const DIFFICULT_AIRWAY_RISK_OPTIONS = [
  { value: "low", label: "Low Risk" },
  { value: "anticipated", label: "Anticipated Difficult Airway" },
  { value: "emergency", label: "Emergency Airway" },
];

interface AirwayAssessmentProps {
  isEditing?: boolean;
  updatedBy?: string;
  updatedAt?: string;
  mallampatiGrade?: string;
  mouthOpening?: boolean;
  neckMobility?: boolean;
  difficultAirwayRisk?: string;
  airwayManagementPlan?: string;
  onSave?: (data: any) => void;
  isSaving?: boolean;
}

export const AirwayAssessment = ({
  isEditing = false,
  updatedBy,
  updatedAt,
  mallampatiGrade,
  mouthOpening,
  neckMobility,
  difficultAirwayRisk,
  airwayManagementPlan,
  onSave,
  isSaving = false,
}: AirwayAssessmentProps) => {
  // Local state for form fields
  const [formState, setFormState] = useState({
    mallampati_grade: mallampatiGrade || "",
    mouth_opening: mouthOpening,
    neck_mobility: neckMobility,
    diffult_airway_risk: difficultAirwayRisk || "",
    airway_management_plan: airwayManagementPlan || "",
  });

  const handleSave = () => {
    if (onSave) {
      onSave(formState);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex justify-between items-center">
        {isEditing && (
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700 text-white h-8 text-xs px-4"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        )}
      </div>

      {isEditing ? (
        <>
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SelectField
              label="Mallampati Grade"
              placeholder="Select Mallampati Grade"
              options={MALLAMPATI_GRADE_OPTIONS}
              value={formState.mallampati_grade.replace(/\s/g, "")}
              onChange={(val) => setFormState(prev => ({ ...prev, mallampati_grade: val }))}
            />
            <SelectField
              label="Mouth Opening"
              placeholder="Select Mouth Opening"
              options={MOUTH_OPENING_OPTIONS}
              value={typeof formState.mouth_opening === 'boolean' ? (formState.mouth_opening ? 'normal' : 'restricted') : formState.mouth_opening}
              onChange={(val) => setFormState(prev => ({ ...prev, mouth_opening: val === 'normal' }))}
            />
            <SelectField
              label="Neck Mobility"
              placeholder="Select Neck Mobility"
              options={NECK_MOBILITY_OPTIONS}
              value={typeof formState.neck_mobility === 'boolean' ? (formState.neck_mobility ? 'normal' : 'severely_restricted') : formState.neck_mobility}
              onChange={(val) => setFormState(prev => ({ ...prev, neck_mobility: val === 'normal' }))}
            />
            <SelectField
              label="Difficult Airway Risk"
              placeholder="Select Risk"
              options={DIFFICULT_AIRWAY_RISK_OPTIONS}
              value={formState.diffult_airway_risk}
              onChange={(val) => setFormState(prev => ({ ...prev, diffult_airway_risk: val }))}
            />
          </div>

          {/* Additional Notes */}
          <FormTextarea
            label="Additional Notes"
            placeholder="Patient has adequate mouth opening with normal neck mobility. No history of difficult intubation. Airway assessment suggests low risk for intubation."
            className="min-h-[120px]"
            value={formState.airway_management_plan}
            onChange={(e) => setFormState(prev => ({ ...prev, airway_management_plan: e.target.value }))}
          />
        </>
      ) : (
        <>
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="Mallampati Grade" value={mallampatiGrade || "-"} />
            <InfoField label="Mouth Opening" value={mouthOpening !== undefined ? (mouthOpening ? "Normal" : "Restricted") : "-"} />
            <InfoField label="Neck Mobility" value={neckMobility !== undefined ? (neckMobility ? "Normal" : "Restricted") : "-"} />
            <InfoField label="Difficult Airway Risk" value={difficultAirwayRisk || "Low"} />
          </div>

          {/* Additional Notes */}
          <div className="rounded-xl border border-blue-50 bg-blue-50/30 p-4">
            <label className="mb-2 block text-sm font-medium tracking-tight">
              Additional Notes
            </label>
            <p className="text-sm">
              {airwayManagementPlan || "No additional notes recorded."}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

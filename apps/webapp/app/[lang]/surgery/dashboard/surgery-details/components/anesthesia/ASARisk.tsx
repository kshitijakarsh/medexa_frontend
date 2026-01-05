"use client";

import React, { useState } from "react";
import { Textarea } from "@workspace/ui/components/textarea";
import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { NoteField } from "@/app/[lang]/surgery/_components/common/NoteField";
import { SelectField } from "@/app/[lang]/surgery/_components/common/SelectField";
import { Button } from "@workspace/ui/components/button";
import { Loader2 } from "lucide-react";

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

interface ASARiskProps {
  isEditing?: boolean;
  asaStatusClassification?: string;
  surgeryRiskLevel?: string;
  asaAndRiskAdditionalNote?: string;
  onSave?: (data: any) => void;
  isSaving?: boolean;
}

export const ASARisk = ({
  isEditing = false,
  asaStatusClassification,
  surgeryRiskLevel,
  asaAndRiskAdditionalNote,
  onSave,
  isSaving = false,
}: ASARiskProps) => {
  const asaValueMap: Record<string, string> = {
    "ASA I": "asa_1",
    "ASA II": "asa_2",
    "ASA III": "asa_3",
    "ASA IV": "asa_4",
    "ASA V": "asa_5",
  };

  const getAsaDefaultValue = (val?: string) => {
    if (!val) return "";
    const match = Object.keys(asaValueMap).find(k => val.includes(k));
    return match ? asaValueMap[match] : val.toLowerCase();
  };

  // Local state for form fields
  const [formState, setFormState] = useState({
    asa_status_classification: getAsaDefaultValue(asaStatusClassification),
    surgery_risk_level: surgeryRiskLevel?.toLowerCase() || "",
    asa_and_risk_additional_note: asaAndRiskAdditionalNote || "",
  });

  const handleSave = () => {
    if (onSave) {
      // Map ASA value back to original format if needed, 
      // but usually the backend expects the option value or label.
      // For now we send the form state as is.
      onSave(formState);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="ASA Physical Status Classification"
              placeholder="Select ASA Physical Status Classification"
              options={ASA_OPTIONS}
              value={formState.asa_status_classification}
              onChange={(val) => setFormState(prev => ({ ...prev, asa_status_classification: val }))}
            />
            <SelectField
              label="Surgery Risk Level"
              placeholder="Select Surgery Risk Level"
              options={RISK_LEVEL_OPTIONS}
              value={formState.surgery_risk_level}
              onChange={(val) => setFormState(prev => ({ ...prev, surgery_risk_level: val }))}
            />
          </div>

          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-medium text-slate-800">
              Risk Notes
            </label>
            <Textarea
              placeholder="Enter Risk Notes"
              className="min-h-[160px] resize-none bg-white border-slate-200 text-sm focus-visible:ring-blue-500"
              value={formState.asa_and_risk_additional_note}
              onChange={(e) => setFormState(prev => ({ ...prev, asa_and_risk_additional_note: e.target.value }))}
            />
          </div>
        </>
      ) : (
        <>
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoField
              label="ASA Physical Status Classification"
              value={asaStatusClassification || "-"}
            />
            <InfoField
              label="Surgery Risk Level"
              value={surgeryRiskLevel || "-"}
              variant={surgeryRiskLevel?.toLowerCase() === 'high' ? "alert" : "default"}
            />
          </div>

          {/* Additional Notes */}
          <NoteField
            label="Additional Notes"
            value={asaAndRiskAdditionalNote || "No additional notes recorded."}
          />
        </>
      )}
    </div>
  );
};

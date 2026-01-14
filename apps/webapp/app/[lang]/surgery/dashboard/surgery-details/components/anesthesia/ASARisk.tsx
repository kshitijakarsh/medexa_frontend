"use client";

import React, { useState, useEffect } from "react";
import { Textarea } from "@workspace/ui/components/textarea";
import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { NoteField } from "@/app/[lang]/surgery/_components/common/NoteField";
import { SelectField } from "@/app/[lang]/surgery/_components/common/SelectField";
import { Button } from "@workspace/ui/components/button";
import { Loader2 } from "lucide-react";
import { useDictionary } from "@/i18n/use-dictionary";

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
  const dict = useDictionary();
  const anesthesia = dict.pages.surgery.surgeryDetails.anesthesia;
  const asaRisk = anesthesia.asaRisk;

  const ASA_OPTIONS = [
    { value: "asa_1", label: asaRisk.options.asa.asa1 },
    { value: "asa_2", label: asaRisk.options.asa.asa2 },
    { value: "asa_3", label: asaRisk.options.asa.asa3 },
    { value: "asa_4", label: asaRisk.options.asa.asa4 },
    { value: "asa_5", label: asaRisk.options.asa.asa5 },
  ];

  const RISK_LEVEL_OPTIONS = [
    { value: "low", label: asaRisk.options.riskLevel.low },
    { value: "moderate", label: asaRisk.options.riskLevel.moderate },
    { value: "high", label: asaRisk.options.riskLevel.high },
  ];


  // Local state for form fields
  const [formState, setFormState] = useState({
    asa_status_classification: asaStatusClassification || "",
    surgery_risk_level: surgeryRiskLevel?.toLowerCase() || "",
    asa_and_risk_additional_note: asaAndRiskAdditionalNote || "",
  });

  useEffect(() => {
    setFormState({
      asa_status_classification: asaStatusClassification || "",
      surgery_risk_level: surgeryRiskLevel?.toLowerCase() || "",
      asa_and_risk_additional_note: asaAndRiskAdditionalNote || "",
    });
  }, [asaStatusClassification, surgeryRiskLevel, asaAndRiskAdditionalNote]);

  const handleSave = () => {
    if (onSave) {
      onSave(formState);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-2">
      </div>

      {isEditing ? (
        <>
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label={asaRisk.fields.asaClassification}
              placeholder={asaRisk.fields.selectAsaClassification}
              options={ASA_OPTIONS}
              value={formState.asa_status_classification}
              onChange={(val) => setFormState(prev => ({ ...prev, asa_status_classification: val }))}
            />
            <SelectField
              label={asaRisk.fields.surgeryRiskLevel}
              placeholder={asaRisk.fields.selectSurgeryRiskLevel}
              options={RISK_LEVEL_OPTIONS}
              value={formState.surgery_risk_level}
              onChange={(val) => setFormState(prev => ({ ...prev, surgery_risk_level: val }))}
            />
          </div>

          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-medium text-slate-800">
              {asaRisk.fields.riskNotes}
            </label>
            <Textarea
              placeholder={asaRisk.fields.enterRiskNotes}
              className="min-h-[160px] resize-none bg-white border-slate-200 text-sm focus-visible:ring-blue-500"
              value={formState.asa_and_risk_additional_note}
              onChange={(e) => setFormState(prev => ({ ...prev, asa_and_risk_additional_note: e.target.value }))}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700 text-white h-8 text-xs px-4"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                  {dict.common.saving}
                </>
              ) : (
                dict.common.save
              )}
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoField
              label={asaRisk.fields.asaClassification}
              value={asaStatusClassification || "-"}
            />
            <InfoField
              label={asaRisk.fields.surgeryRiskLevel}
              value={surgeryRiskLevel || "-"}
              variant={surgeryRiskLevel?.toLowerCase() === 'high' ? "alert" : "default"}
            />
          </div>

          {/* Additional Notes */}
          <NoteField
            label={asaRisk.fields.additionalNotes}
            value={asaAndRiskAdditionalNote || asaRisk.values.noNotesRecorded}
          />
        </>
      )}
    </div>
  );
};

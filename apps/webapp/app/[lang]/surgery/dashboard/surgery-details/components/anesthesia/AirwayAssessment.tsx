import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { NoteField } from "@/app/[lang]/surgery/_components/common/NoteField";
import { SelectField } from "@/app/[lang]/surgery/_components/common/SelectField";
import { FormTextarea } from "@/app/[lang]/surgery/_components/common/forms/form-textarea";
import { Button } from "@workspace/ui/components/button";
import { useDictionary } from "@/i18n/use-dictionary";

interface AirwayAssessmentProps {
  isEditing?: boolean;
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
  mallampatiGrade,
  mouthOpening,
  neckMobility,
  difficultAirwayRisk,
  airwayManagementPlan,
  onSave,
  isSaving = false,
}: AirwayAssessmentProps) => {
  const dict = useDictionary();
  const anesthesia = dict.pages.surgery.surgeryDetails.anesthesia;
  const airway = anesthesia.airwayAssessment;

  const MALLAMPATI_GRADE_OPTIONS = [
    { value: "grade1", label: airway.options.mallampati.grade1 },
    { value: "grade2", label: airway.options.mallampati.grade2 },
    { value: "grade3", label: airway.options.mallampati.grade3 },
    { value: "grade4", label: airway.options.mallampati.grade4 },
  ];

  const MOUTH_OPENING_OPTIONS = [
    { value: "normal", label: airway.options.mouthOpening.normal },
    { value: "restricted", label: airway.options.mouthOpening.restricted },
  ];

  const NECK_MOBILITY_OPTIONS = [
    { value: "normal", label: airway.options.neckMobility.normal },
    { value: "restricted", label: airway.options.neckMobility.restricted },
    { value: "severely_restricted", label: airway.options.neckMobility.severelyRestricted },
  ];

  const DIFFICULT_AIRWAY_RISK_OPTIONS = [
    { value: "low", label: airway.options.airwayRisk.low },
    { value: "anticipated", label: airway.options.airwayRisk.anticipated },
    { value: "emergency", label: airway.options.airwayRisk.emergency },
  ];

  // Local state for form fields
  const [formState, setFormState] = useState({
    mallampati_grade: mallampatiGrade || "",
    mouth_opening: mouthOpening,
    neck_mobility: neckMobility,
    diffult_airway_risk: difficultAirwayRisk || "",
    airway_management_plan: airwayManagementPlan || "",
  });

  useEffect(() => {
    setFormState({
      mallampati_grade: mallampatiGrade || "",
      mouth_opening: mouthOpening,
      neck_mobility: neckMobility,
      diffult_airway_risk: difficultAirwayRisk || "",
      airway_management_plan: airwayManagementPlan || "",
    });
  }, [mallampatiGrade, mouthOpening, neckMobility, difficultAirwayRisk, airwayManagementPlan]);

  const handleSave = () => {
    if (onSave) {
      onSave(formState);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex justify-between items-center">
      </div>

      {isEditing ? (
        <>
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SelectField
              label={airway.fields.mallampatiGrade}
              placeholder={airway.fields.selectMallampatiGrade}
              options={MALLAMPATI_GRADE_OPTIONS}
              value={formState.mallampati_grade.replace(/\s/g, "")}
              onChange={(val) => setFormState(prev => ({ ...prev, mallampati_grade: val }))}
            />
            <SelectField
              label={airway.fields.mouthOpening}
              placeholder={airway.fields.selectMouthOpening}
              options={MOUTH_OPENING_OPTIONS}
              value={typeof formState.mouth_opening === 'boolean' ? (formState.mouth_opening ? 'normal' : 'restricted') : formState.mouth_opening}
              onChange={(val) => setFormState(prev => ({ ...prev, mouth_opening: val === 'normal' }))}
            />
            <SelectField
              label={airway.fields.neckMobility}
              placeholder={airway.fields.selectNeckMobility}
              options={NECK_MOBILITY_OPTIONS}
              value={typeof formState.neck_mobility === 'boolean' ? (formState.neck_mobility ? 'normal' : 'severely_restricted') : formState.neck_mobility}
              onChange={(val) => setFormState(prev => ({ ...prev, neck_mobility: val === 'normal' }))}
            />
            <SelectField
              label={airway.fields.difficultAirwayRisk}
              placeholder={airway.fields.selectRisk}
              options={DIFFICULT_AIRWAY_RISK_OPTIONS}
              value={formState.diffult_airway_risk}
              onChange={(val) => setFormState(prev => ({ ...prev, diffult_airway_risk: val }))}
            />
          </div>

          {/* Additional Notes */}
          <FormTextarea
            label={airway.fields.additionalNotes}
            placeholder={airway.fields.enterAdditionalNotes}
            className="min-h-[120px]"
            value={formState.airway_management_plan}
            onChange={(e) => setFormState(prev => ({ ...prev, airway_management_plan: e.target.value }))}
          />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label={airway.fields.mallampatiGrade} value={mallampatiGrade || "-"} />
            <InfoField label={airway.fields.mouthOpening} value={mouthOpening !== undefined ? (mouthOpening ? airway.values.normal : airway.values.restricted) : "-"} />
            <InfoField label={airway.fields.neckMobility} value={neckMobility !== undefined ? (neckMobility ? airway.values.normal : airway.values.restricted) : "-"} />
            <InfoField label={airway.fields.difficultAirwayRisk} value={difficultAirwayRisk || airway.values.low} />
          </div>

          {/* Additional Notes */}
          <NoteField
            label={airway.fields.additionalNotes}
            value={airwayManagementPlan || airway.values.noNotesRecorded}
          />
        </>
      )}
    </div>
  );
};

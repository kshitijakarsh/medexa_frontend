"use client";

import { Textarea } from "@workspace/ui/components/textarea";
import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import { SelectField } from "@/app/[lang]/surgery/_components/common/SelectField";
import { NoteField } from "@/app/[lang]/surgery/_components/common/NoteField";
import { useDictionary } from "@/i18n/use-dictionary";

interface PlanDetailsProps {
  isEditing?: boolean;
}

export const PlanDetails = ({ isEditing = false }: PlanDetailsProps) => {
  const dict = useDictionary();
  const anesthesia = dict.pages.surgery.surgeryDetails.anesthesia;
  const plan = anesthesia.planDetails;

  const ANESTHESIA_TYPES = [
    { value: "general", label: plan.options.anesthesiaType.general },
    { value: "regional", label: plan.options.anesthesiaType.regional },
    { value: "local", label: plan.options.anesthesiaType.local },
    { value: "spinal", label: plan.options.anesthesiaType.spinal },
    { value: "epidural", label: plan.options.anesthesiaType.epidural },
    { value: "sedation_mac", label: plan.options.anesthesiaType.sedationMac },
  ];

  const MONITORING_OPTIONS = [
    { value: "ecg", label: plan.options.monitoring.ecg },
    { value: "spo2", label: plan.options.monitoring.spo2 },
    { value: "nibp", label: plan.options.monitoring.nibp },
    { value: "invasive_bp", label: plan.options.monitoring.invasiveBp },
    { value: "cvp", label: plan.options.monitoring.cvp },
    { value: "bis", label: plan.options.monitoring.bis },
    { value: "etco2", label: plan.options.monitoring.etco2 },
    { value: "temperature", label: plan.options.monitoring.temperature },
  ];

  const VENTILATION_OPTIONS = [
    { value: "not_required", label: plan.options.ventilation.notRequired },
    { value: "short_term", label: plan.options.ventilation.shortTerm },
    { value: "prolonged", label: plan.options.ventilation.prolonged },
  ];

  const ICU_OPTIONS = [
    { value: "not_required", label: plan.options.icu.notRequired },
    { value: "standby", label: plan.options.icu.standby },
    { value: "planned_admission", label: plan.options.icu.plannedAdmission },
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

  return (
    <div className="flex flex-col gap-6">
      {isEditing ? (
        <>
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label={plan.fields.anesthesiaType}
              placeholder={plan.fields.selectAnesthesiaType}
              options={ANESTHESIA_TYPES}
            />
            <MultiSelectField
              label={plan.fields.monitoringRequired}
              options={MONITORING_OPTIONS}
            />
            <SelectField
              label={plan.fields.postOpVentilation}
              placeholder={plan.fields.selectPostOpVentilation}
              options={VENTILATION_OPTIONS}
            />
            <SelectField
              label={plan.fields.icuRequirement}
              placeholder={plan.fields.selectIcuRequirement}
              options={ICU_OPTIONS}
            />
          </div>

          {/* Airway Management Plan */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-800">
              {plan.fields.airwayManagementPlan}
            </label>
            <Textarea
              placeholder={plan.fields.airwayManagementPlanPlaceholder}
              className="min-h-[160px] resize-none bg-white border-slate-200 text-sm focus-visible:ring-blue-500"
            />
          </div>
        </>
      ) : (
        <>
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label={plan.fields.anesthesiaType} value={plan.options.anesthesiaType.regional} />
            <InfoField label={plan.fields.monitoringRequired} value={`${plan.options.monitoring.ecg}, ${plan.options.monitoring.spo2}, ${plan.options.monitoring.nibp}`} />
            <InfoField label={plan.fields.postOpVentilation} value={plan.options.ventilation.notRequired} />
            <InfoField label={plan.fields.icuRequirement} value={plan.options.icu.standby} />
          </div>

          {/* Airway Management Plan */}
          <NoteField
            label={plan.fields.airwayManagementPlan}
            value={plan.fields.airwayManagementPlanPlaceholder}
          />
        </>
      )}
    </div>
  );
};

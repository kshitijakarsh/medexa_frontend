"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";
import { Loader2 } from "lucide-react";
import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import { SelectField } from "@/app/[lang]/surgery/_components/common/SelectField";
import { NoteField } from "@/app/[lang]/surgery/_components/common/NoteField";
import { useDictionary } from "@/i18n/use-dictionary";

interface PlanDetailsProps {
  isEditing?: boolean;
  anaesthesiaType?: string;
  monitoringRequired?: string;
  postOperativeVentilationRequired?: boolean;
  icuRequired?: string;
  airwayManagementPlan?: string;
  onSave?: (data: any) => void;
  isSaving?: boolean;
}

export const PlanDetails = ({
  isEditing = false,
  anaesthesiaType,
  monitoringRequired,
  postOperativeVentilationRequired,
  icuRequired,
  airwayManagementPlan,
  onSave,
  isSaving = false,
}: PlanDetailsProps) => {
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

  // Local state
  const [formState, setFormState] = useState({
    anaesthesia_type: anaesthesiaType || "",
    monitoring_required: monitoringRequired ? monitoringRequired.split(",") : [],
    post_operative_ventilation_required: postOperativeVentilationRequired,
    icu_required: icuRequired || "",
    airway_management_plan: airwayManagementPlan || "",
  });

  useEffect(() => {
    setFormState({
      anaesthesia_type: anaesthesiaType || "",
      monitoring_required: monitoringRequired ? monitoringRequired.split(",") : [],
      post_operative_ventilation_required: postOperativeVentilationRequired,
      icu_required: icuRequired || "",
      airway_management_plan: airwayManagementPlan || "",
    });
  }, [anaesthesiaType, monitoringRequired, postOperativeVentilationRequired, icuRequired, airwayManagementPlan]);

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...formState,
        monitoring_required: formState.monitoring_required.join(","),
      });
    }
  };

  const handleMonitoringChange = (value: string, checked: boolean) => {
    setFormState(prev => {
      const current = prev.monitoring_required;
      if (checked) {
        return { ...prev, monitoring_required: [...current, value] };
      } else {
        return { ...prev, monitoring_required: current.filter(item => item !== value) };
      }
    });
  };

  const MultiSelectField = ({
    label,
    options,
    value,
    onChange,
  }: {
    label: string;
    options: { value: string; label: string }[];
    value: string[];
    onChange: (value: string, checked: boolean) => void;
  }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-slate-800">{label}</label>
      <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={value.includes(option.value)}
              onCheckedChange={(checked) => onChange(option.value, checked as boolean)}
            />
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
      {/* Header Info */}
      <div className="flex justify-end items-center">
        {isEditing && (
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
        )}
      </div>
      {isEditing ? (
        <>
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label={plan.fields.anesthesiaType}
              placeholder={plan.fields.selectAnesthesiaType}
              options={ANESTHESIA_TYPES}
              value={formState.anaesthesia_type}
              onChange={(val) => setFormState(prev => ({ ...prev, anaesthesia_type: val }))}
            />
            <MultiSelectField
              label={plan.fields.monitoringRequired}
              options={MONITORING_OPTIONS}
              value={formState.monitoring_required}
              onChange={handleMonitoringChange}
            />
            <SelectField
              label={plan.fields.postOpVentilation}
              placeholder={plan.fields.selectPostOpVentilation}
              options={VENTILATION_OPTIONS}
              value={formState.post_operative_ventilation_required === undefined ? "" : (formState.post_operative_ventilation_required ? "prolonged" : "not_required")}
              onChange={(val) => setFormState(prev => ({ ...prev, post_operative_ventilation_required: val === "prolonged" || val === "short_term" }))}
            />
            <SelectField
              label={plan.fields.icuRequirement}
              placeholder={plan.fields.selectIcuRequirement}
              options={ICU_OPTIONS}
              value={formState.icu_required}
              onChange={(val) => setFormState(prev => ({ ...prev, icu_required: val }))}
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
              value={formState.airway_management_plan}
              onChange={(e) => setFormState(prev => ({ ...prev, airway_management_plan: e.target.value }))}
            />
          </div>
        </>
      ) : (
        <>
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label={plan.fields.anesthesiaType} value={anaesthesiaType ? ANESTHESIA_TYPES.find(o => o.value === anaesthesiaType)?.label : "-"} />
            <InfoField label={plan.fields.monitoringRequired} value={monitoringRequired ? monitoringRequired.split(",").map(v => MONITORING_OPTIONS.find(o => o.value === v)?.label).join(", ") : "-"} />
            <InfoField label={plan.fields.postOpVentilation} value={postOperativeVentilationRequired !== undefined ? (postOperativeVentilationRequired ? plan.options.ventilation.prolonged : plan.options.ventilation.notRequired) : "-"} />
            <InfoField label={plan.fields.icuRequirement} value={icuRequired ? ICU_OPTIONS.find(o => o.value === icuRequired)?.label : "-"} />
          </div>

          {/* Airway Management Plan */}
          <NoteField
            label={plan.fields.airwayManagementPlan}
            value={airwayManagementPlan || "-"}
          />
        </>
      )}
    </div>
  );
};

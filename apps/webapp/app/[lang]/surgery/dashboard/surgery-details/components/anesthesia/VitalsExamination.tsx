"use client";

import React from "react";
import { Info, Heart, Activity, Wind, Droplets, Thermometer, Ruler, Weight, User } from "lucide-react";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { NoteField } from "@/app/[lang]/surgery/_components/common/NoteField";

const VitalCard = ({
  icon,
  label,
  value,
  colorClass = "text-slate-800",
  iconBgClass = "bg-slate-100 text-slate-500",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  colorClass?: string;
  iconBgClass?: string;
}) => (
  <div className="bg-white rounded-xl border border-blue-100 p-4 flex items-center gap-4">
    <div className={`p-2.5 rounded-full ${iconBgClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs">{label}</p>
      <p className={`text-sm font-medium ${colorClass}`}>{value}</p>
    </div>
  </div>
);

const VitalInput = ({
  icon,
  label,
  placeholder,
  iconBgClass = "bg-slate-100 text-slate-500",
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  iconBgClass?: string;
}) => (
  <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
    <div className={`p-2.5 rounded-full ${iconBgClass}`}>
      {icon}
    </div>
    <div className="flex-1 space-y-1">
      <label className="text-xs text-slate-500 font-medium">{label}</label>
      <Input
        placeholder={placeholder}
        className="h-8 text-sm font-bold text-slate-800 border-none bg-transparent p-0 focus-visible:ring-0 placeholder:font-normal placeholder:text-slate-300"
      />
    </div>
  </div>
);

const VITALS_CONFIG = [
  {
    icon: <Heart size={18} />,
    label: "Blood Pressure",
    value: "118 / 76 mmHg",
    placeholder: "e.g. 118 / 76 mmHg",
    iconBgClass: "bg-red-50 text-red-500",
  },
  {
    icon: <Activity size={18} />,
    label: "Pulse Rate",
    value: "82 bpm",
    placeholder: "e.g. 82 bpm",
    iconBgClass: "bg-blue-50 text-blue-500",
  },
  {
    icon: <Wind size={18} />,
    label: "Respiration Rate",
    value: "18 breaths/min",
    placeholder: "e.g. 18 breaths/min",
    iconBgClass: "bg-sky-50 text-sky-500",
  },
  {
    icon: <Droplets size={18} />,
    label: "Spo2(%)",
    value: "97%",
    placeholder: "e.g. 97%",
    iconBgClass: "bg-yellow-50 text-yellow-500",
  },
  {
    icon: <Heart size={18} />,
    label: "Systolic(L)",
    value: "118",
    placeholder: "e.g. 118",
    iconBgClass: "bg-red-50 text-red-500",
  },
  {
    icon: <Heart size={18} />,
    label: "Diastolic(L)",
    value: "76",
    placeholder: "e.g. 76",
    iconBgClass: "bg-orange-50 text-orange-500",
  },
  {
    icon: <Heart size={18} />,
    label: "Systolic(R)",
    value: "120",
    placeholder: "e.g. 120",
    iconBgClass: "bg-green-50 text-green-500",
  },
  {
    icon: <Heart size={18} />,
    label: "Diastolic(R)",
    value: "78",
    placeholder: "e.g. 78",
    iconBgClass: "bg-purple-50 text-purple-500",
  },
  {
    icon: <Thermometer size={18} />,
    label: "Temperature",
    value: "98.4°F (36.9°C)",
    placeholder: "e.g. 98.4°F",
    iconBgClass: "bg-orange-50 text-orange-500",
  },
  {
    icon: <Droplets size={18} />,
    label: "GRBS",
    value: "124 mg/dL",
    placeholder: "e.g. 124 mg/dL",
    iconBgClass: "bg-blue-50 text-blue-500",
  },
  {
    icon: <Droplets size={18} />,
    label: "HB",
    value: "124 mg/dL",
    placeholder: "e.g. 124 mg/dL",
    iconBgClass: "bg-red-50 text-red-500",
  },
  {
    icon: <Ruler size={18} />,
    label: "Height",
    value: "165 cm",
    placeholder: "e.g. 165 cm",
    iconBgClass: "bg-purple-50 text-purple-500",
  },
  {
    icon: <Weight size={18} />,
    label: "Weight",
    value: "68 kg",
    placeholder: "e.g. 68 kg",
    iconBgClass: "bg-emerald-50 text-emerald-500",
  },
  {
    icon: <User size={18} />,
    label: "BMI",
    value: "24.9",
    placeholder: "e.g. 24.9",
    iconBgClass: "bg-pink-50 text-pink-500",
  },
  {
    icon: <Weight size={18} />,
    label: "IBW",
    value: "61 kg",
    placeholder: "e.g. 61 kg",
    iconBgClass: "bg-blue-50 text-blue-500",
  },
  {
    icon: <Activity size={18} />,
    label: "RBS",
    value: "128 mg/dL",
    placeholder: "e.g. 128 mg/dL",
    iconBgClass: "bg-blue-50 text-blue-500",
  },
];

interface VitalsExaminationProps {
  isEditing?: boolean;
}

export const VitalsExamination = ({ isEditing = false }: VitalsExaminationProps) => {
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
          {/* Vitals Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {VITALS_CONFIG.map((vital, index) => (
              <VitalInput
                key={index}
                icon={vital.icon}
                label={vital.label}
                placeholder={vital.placeholder}
                iconBgClass={vital.iconBgClass}
              />
            ))}
          </div>

          {/* Additional Note Form */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-800">
              Additional Note
            </label>
            <Textarea
              placeholder="Enter additional notes here..."
              className="min-h-[100px] bg-white border-slate-200"
            />
          </div>
        </>
      ) : (
        <>
          {/* Vitals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {VITALS_CONFIG.map((vital, index) => (
              <VitalCard
                key={index}
                icon={vital.icon}
                label={vital.label}
                value={vital.value}
                iconBgClass={vital.iconBgClass}
              />
            ))}
          </div>

          <NoteField
            label="Additional Note"
            value="Mild swelling observed in lower limbs. Patient reports occasional dizziness when standing. No medicine pain at the time of examination."
          />
        </>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <Button variant="outline" className="border-blue-200 text-slate-600 hover:bg-blue-50 uppercase text-xs font-bold tracking-wider px-6">
          Previous
        </Button>
        <Button className="bg-[#50C786] hover:bg-[#45ad74] text-white uppercase text-xs font-bold tracking-wider px-8">
          Next
        </Button>
      </div>
    </div>
  );
};

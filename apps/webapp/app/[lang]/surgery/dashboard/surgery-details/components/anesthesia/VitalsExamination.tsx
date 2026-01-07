"use client";

import React from "react";
import { Heart, Activity, Wind, Droplets, Thermometer, Ruler, Weight, User } from "lucide-react";
import Button from "@/components/ui/button";
import { NoteField } from "@/app/[lang]/surgery/_components/common/NoteField";
import { useLatestVitalsByPatientId } from "@/app/[lang]/surgery/_hooks/useVitals";
import { Skeleton } from "@workspace/ui/components/skeleton";

interface VitalsExaminationProps {
  patientId?: string;
}

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

export const VitalsExamination = ({
  patientId,
}: VitalsExaminationProps) => {
  const { data: vitalsData, isLoading } = useLatestVitalsByPatientId(patientId);

  const vitalsConfig = [
    {
      icon: <Heart size={18} />,
      label: "Blood Pressure",
      value: vitalsData?.blood_pressure_systolic ? `${vitalsData.blood_pressure_systolic} / ${vitalsData.blood_pressure_diastolic} mmHg` : "--- / --- mmHg",
      placeholder: "e.g. 118 / 76 mmHg",
      iconBgClass: "bg-red-50 text-red-500",
    },
    {
      icon: <Activity size={18} />,
      label: "Pulse Rate",
      value: vitalsData?.heart_rate ? `${vitalsData.heart_rate} bpm` : "--- bpm",
      placeholder: "e.g. 82 bpm",
      iconBgClass: "bg-blue-50 text-blue-500",
    },
    {
      icon: <Wind size={18} />,
      label: "Respiration Rate",
      value: vitalsData?.respiratory_rate ? `${vitalsData.respiratory_rate} breaths/min` : "--- breaths/min",
      placeholder: "e.g. 18 breaths/min",
      iconBgClass: "bg-sky-50 text-sky-500",
    },
    {
      icon: <Droplets size={18} />,
      label: "Spo2(%)",
      value: vitalsData?.oxygen_saturation ? `${vitalsData.oxygen_saturation}%` : "---%",
      placeholder: "e.g. 97%",
      iconBgClass: "bg-yellow-50 text-yellow-500",
    },
    {
      icon: <Thermometer size={18} />,
      label: "Temperature",
      value: vitalsData?.temperature ? `${vitalsData.temperature}°F` : "---°F",
      placeholder: "e.g. 98.4°F",
      iconBgClass: "bg-orange-50 text-orange-500",
    },
    {
      icon: <Ruler size={18} />,
      label: "Height",
      value: vitalsData?.height ? `${vitalsData.height} cm` : "--- cm",
      placeholder: "e.g. 165 cm",
      iconBgClass: "bg-purple-50 text-purple-500",
    },
    {
      icon: <Weight size={18} />,
      label: "Weight",
      value: vitalsData?.weight ? `${vitalsData.weight} kg` : "--- kg",
      placeholder: "e.g. 68 kg",
      iconBgClass: "bg-emerald-50 text-emerald-500",
    },
    {
      icon: <User size={18} />,
      label: "BMI",
      value: vitalsData?.bmi ? `${vitalsData.bmi}` : "---",
      placeholder: "e.g. 24.9",
      iconBgClass: "bg-pink-50 text-pink-500",
    },
    {
      icon: <Droplets size={18} />,
      label: "Blood Glucose",
      value: vitalsData?.blood_glucose ? `${vitalsData.blood_glucose} mg/dL` : "--- mg/dL",
      placeholder: "e.g. 124 mg/dL",
      iconBgClass: "bg-blue-50 text-blue-500",
    },
    {
      icon: <Activity size={18} />,
      label: "Pain Score",
      value: vitalsData?.pain_score ? `${vitalsData.pain_score}/10` : "---/10",
      placeholder: "e.g. 2/10",
      iconBgClass: "bg-red-50 text-red-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">

      {/* Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vitalsConfig.map((vital, index) => (
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
        value={vitalsData?.additional_note || "Vital signs recorded successfully. No abnormal values detected in the latest examination."}
      />

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

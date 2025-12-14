"use client";

import { useParams } from "next/navigation";
import { format } from "@workspace/ui/hooks/use-date-fns";
import { PageHeader } from "@/components/common/page-header";
import { VitalsHistoryDetailsSkeleton } from "../_components/VitalsHistoryDetailsSkeleton";
import { useVitalsHistoryOne } from "../../../../_component/Tabs/_hooks/useVitals";

import {
  HeartPulse,
  Activity,
  Thermometer,
  Scale,
  Ruler,
  Gauge,
  Droplets,
} from "lucide-react";
import { VitalHistoryCard } from "../_components/VitalHistoryCard";


export default function VitalsHistoryDetails() {
  const { vitalsId } = useParams() as { vitalsId: string };

  const { data, isLoading } = useVitalsHistoryOne(vitalsId);

  if (isLoading || !data) return <VitalsHistoryDetailsSkeleton />;

  const createdAt = data.created_at ? new Date(data.created_at) : null;

  return (
    <div className="space-y-6 p-2">
      <PageHeader title="Vitals Details" />

      <div className="p-6 bg-[#F1F9FF] rounded-xl shadow-md">
        {/* DATE */}
        <p className="font-semibold">
          {createdAt ? format(createdAt, "MMMM dd, yyyy") : "Unknown Date"}
        </p>

        {/* RECORDED BY */}
        <p className="text-xs text-gray-500">
          Recorded by{" "}
          {data.createdBy
            ? `${data.createdBy.first_name} ${data.createdBy.last_name}`
            : "Unknown"}
          {createdAt && ` at ${format(createdAt, "hh:mm a")}`}
        </p>

        {/* VITALS GRID */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <VitalHistoryCard
            label="Blood Pressure"
            value={data.blood_pressure}
            icon={<HeartPulse className="text-red-500" />}
          />
          <VitalHistoryCard
            label="Pulse Rate"
            value={data.pulse_rate}
            icon={<Activity className="text-blue-500" />}
          />
          <VitalHistoryCard
            label="Respiration Rate"
            value={data.respiratory_rate}
            icon={<Activity className="text-sky-500" />}
          />
          <VitalHistoryCard
            label="SpO₂ (%)"
            value={data.oxygen_saturation}
            icon={<Droplets className="text-yellow-500" />}
          />

          <VitalHistoryCard
            label="Temperature"
            value={data.temperature}
            icon={<Thermometer className="text-orange-500" />}
          />
          <VitalHistoryCard
            label="GRBS"
            value={data.grbs}
            icon={<Droplets className="text-blue-600" />}
          />
          <VitalHistoryCard
            label="HB"
            value={data.hb}
            icon={<Droplets className="text-pink-500" />}
          />
          <VitalHistoryCard
            label="Height"
            value={data.height}
            icon={<Ruler className="text-purple-500" />}
          />

          <VitalHistoryCard
            label="Weight"
            value={data.weight}
            icon={<Scale className="text-green-500" />}
          />
          <VitalHistoryCard
            label="BMI"
            value={data.bmi}
            icon={<Gauge className="text-red-400" />}
          />
          <VitalHistoryCard
            label="IBW"
            value={data.ibw}
            icon={<Gauge className="text-indigo-500" />}
          />
          <VitalHistoryCard
            label="RBS"
            value={data.rbs}
            icon={<Droplets className="text-blue-700" />}
          />
        </div>

        {/* ADDITIONAL NOTE */}
        <div className="mt-6">
          <p className="text-sm font-medium mb-1">Additional Note</p>
          <div className="bg-white border rounded-xl p-4 text-sm text-gray-700">
            {data.notes || "—"}
          </div>
        </div>
      </div>
    </div>
  );
}

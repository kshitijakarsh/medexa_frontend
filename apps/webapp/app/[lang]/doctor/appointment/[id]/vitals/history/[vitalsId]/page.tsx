// "use client";

// import { useParams } from "next/navigation";
// import { format } from "@workspace/ui/hooks/use-date-fns";
// import { PageHeader } from "@/components/common/page-header";
// import { VitalsHistoryDetailsSkeleton } from "../_components/VitalsHistoryDetailsSkeleton";
// import { useVitalsHistoryOne, useVitalsHistoryOneVisitId } from "../../../../_component/Tabs/_hooks/useVitals";

// import {
//   HeartPulse,
//   Activity,
//   Thermometer,
//   Scale,
//   Ruler,
//   Gauge,
//   Droplets,
// } from "lucide-react";
// import { VitalHistoryCard } from "../_components/VitalHistoryCard";


// export default function VitalsHistoryDetails() {
//   const { vitalsId } = useParams() as { vitalsId: string };

//   // const { data, isLoading } = useVitalsHistoryOne(vitalsId);
//   const { data, isLoading } = useVitalsHistoryOneVisitId(vitalsId);

//   console.log(data)


//   if (isLoading || !data) return <VitalsHistoryDetailsSkeleton />;

//   const createdAt = data.created_at ? new Date(data.created_at) : null;

//   return (
//     <div className="space-y-6 p-2">
//       <PageHeader title="Vitals Details" />

//       <div className="p-6 bg-[#F1F9FF] rounded-xl shadow-md">
//         {/* DATE */}
//         <p className="font-semibold">
//           {createdAt ? format(createdAt, "MMMM dd, yyyy") : "Unknown Date"}
//         </p>

//         {/* RECORDED BY */}
//         <p className="text-xs text-gray-500">
//           Recorded by{" "}
//           {data.createdBy
//             ? `${data.createdBy.first_name} ${data.createdBy.last_name}`
//             : "Unknown"}
//           {createdAt && ` at ${format(createdAt, "hh:mm a")}`}
//         </p>

//         {/* VITALS GRID */}
//         <div className="mt-6 grid grid-cols-4 gap-4">
//           <VitalHistoryCard
//             label="Blood Pressure"
//             value={data.blood_pressure}
//             icon={<HeartPulse className="text-red-500" />}
//           />
//           <VitalHistoryCard
//             label="Pulse Rate"
//             value={data.pulse_rate}
//             icon={<Activity className="text-blue-500" />}
//           />
//           <VitalHistoryCard
//             label="Respiration Rate"
//             value={data.respiratory_rate}
//             icon={<Activity className="text-sky-500" />}
//           />
//           <VitalHistoryCard
//             label="SpO₂ (%)"
//             value={data.oxygen_saturation}
//             icon={<Droplets className="text-yellow-500" />}
//           />

//           <VitalHistoryCard
//             label="Temperature"
//             value={data.temperature}
//             icon={<Thermometer className="text-orange-500" />}
//           />
//           <VitalHistoryCard
//             label="GRBS"
//             value={data.grbs}
//             icon={<Droplets className="text-blue-600" />}
//           />
//           <VitalHistoryCard
//             label="HB"
//             value={data.hb}
//             icon={<Droplets className="text-pink-500" />}
//           />
//           <VitalHistoryCard
//             label="Height"
//             value={data.height}
//             icon={<Ruler className="text-purple-500" />}
//           />

//           <VitalHistoryCard
//             label="Weight"
//             value={data.weight}
//             icon={<Scale className="text-green-500" />}
//           />
//           <VitalHistoryCard
//             label="BMI"
//             value={data.bmi}
//             icon={<Gauge className="text-red-400" />}
//           />
//           <VitalHistoryCard
//             label="IBW"
//             value={data.ibw}
//             icon={<Gauge className="text-indigo-500" />}
//           />
//           <VitalHistoryCard
//             label="RBS"
//             value={data.rbs}
//             icon={<Droplets className="text-blue-700" />}
//           />
//         </div>

//         {/* ADDITIONAL NOTE */}
//         <div className="mt-6">
//           <p className="text-sm font-medium mb-1">Additional Note</p>
//           <div className="bg-white border rounded-xl p-4 text-sm text-gray-700">
//             {data.notes || "—"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useParams } from "next/navigation";
import { format } from "@workspace/ui/hooks/use-date-fns";
import { PageHeader } from "@/components/common/page-header";
import { VitalsHistoryDetailsSkeleton } from "../_components/VitalsHistoryDetailsSkeleton";
import { useVitalsHistoryOneVisitId } from "../../../../_component/Tabs/_hooks/useVitals";

import {
  HeartPulse,
  Activity,
  Thermometer,
  Scale,
  Ruler,
  Gauge,
  Droplets,
  TestTube,
  Wind,
} from "lucide-react";
import { VitalHistoryCard } from "../_components/VitalHistoryCard";

export default function VitalsHistoryDetails() {
  const { vitalsId } = useParams() as { vitalsId: string };

  const { data, isLoading } = useVitalsHistoryOneVisitId(vitalsId);

  if (isLoading || !Array.isArray(data)) {
    return <VitalsHistoryDetailsSkeleton />;
  }

  if (data.length === 0) {
    return (
      <div className="p-4 text-sm italic text-gray-500">
        No vitals recorded
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2">
      <PageHeader title="Vitals Details" />

      {data.map((vital) => {
        const createdAt = vital.created_at
          ? new Date(vital.created_at)
          : null;

        return (
          <div
            key={vital.id}
            className="p-6 bg-[#F1F9FF] rounded-xl shadow-md"
          >
            {/* DATE */}
            <p className="font-semibold">
              {createdAt
                ? format(createdAt, "MMMM dd, yyyy")
                : "Unknown Date"}
            </p>

            {/* RECORDED BY */}
            <p className="text-xs text-gray-500">
              Recorded by{" "}
              {vital.createdBy
                ? `${vital.createdBy.first_name} ${vital.createdBy.last_name}`
                : "Unknown"}
              {createdAt && ` at ${format(createdAt, "hh:mm a")}`}
            </p>

            {/* VITALS GRID — UNCHANGED UI */}
            <div className="mt-6 grid grid-cols-4 gap-4">
              {/* <VitalHistoryCard
                label="Blood Pressure"
                value={vital.blood_pressure}
                icon={<HeartPulse className="text-red-500" />}
              />

              <VitalHistoryCard
                label="Pulse Rate"
                value={vital.pulse_rate}
                icon={<Activity className="text-blue-500" />}
              />

              <VitalHistoryCard
                label="Respiration Rate"
                value={vital.respiration_rate}
                icon={<Wind className="text-sky-500" />}
              />

              <VitalHistoryCard
                label="SpO₂ (%)"
                value={vital.spo2}
                icon={<Droplets className="text-yellow-500" />}
              />

              <VitalHistoryCard
                label="Temperature"
                value={vital.temperature}
                icon={<Thermometer className="text-orange-500" />}
              />

              <VitalHistoryCard
                label="GRBS"
                value={vital.grbs}
                icon={<TestTube className="text-blue-600" />}
              />

              <VitalHistoryCard
                label="HB"
                value={vital.hb}
                icon={<TestTube className="text-pink-500" />}
              />

              <VitalHistoryCard
                label="Height"
                value={vital.height}
                icon={<Ruler className="text-purple-500" />}
              />

              <VitalHistoryCard
                label="Weight"
                value={vital.weight}
                icon={<Scale className="text-green-500" />}
              />

              <VitalHistoryCard
                label="BMI"
                value={vital.bmi}
                icon={<Gauge className="text-red-400" />}
              />

              <VitalHistoryCard
                label="IBW"
                value={vital.ibw}
                icon={<Gauge className="text-indigo-500" />}
              />

              <VitalHistoryCard
                label="RBS"
                value={vital.rbs}
                icon={<TestTube className="text-blue-700" />}
              /> */}
              <VitalHistoryCard
                label="Blood Pressure"
                value={vital.blood_pressure}
                icon={<HeartPulse className="h-5 w-5" />}
                iconBg="bg-red-100"
                iconColor="text-red-500"
              />

              <VitalHistoryCard
                label="Pulse Rate"
                value={vital.pulse_rate}
                icon={<Activity className="h-5 w-5" />}
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
              />

              <VitalHistoryCard
                label="Respiration Rate"
                value={vital.respiration_rate}
                icon={<Wind className="h-5 w-5" />}
                iconBg="bg-sky-100"
                iconColor="text-sky-600"
              />

              <VitalHistoryCard
                label="SpO₂ (%)"
                value={vital.spo2}
                icon={<Droplets className="h-5 w-5" />}
                iconBg="bg-yellow-100"
                iconColor="text-yellow-600"
              />

              <VitalHistoryCard label="Systolic (L)" value={vital.systolic_left} icon={<HeartPulse />} iconBg="bg-red-50" iconColor="text-red-500" />
              <VitalHistoryCard label="Diastolic (L)" value={vital.diastolic_left} icon={<HeartPulse />} iconBg="bg-orange-50" iconColor="text-orange-500" />
              <VitalHistoryCard label="Systolic (R)" value={vital.systolic_right} icon={<HeartPulse />} iconBg="bg-green-50" iconColor="text-green-600" />
              <VitalHistoryCard label="Diastolic (R)" value={vital.diastolic_right} icon={<HeartPulse />} iconBg="bg-pink-50" iconColor="text-pink-500" />

              <VitalHistoryCard label="Temperature" value={vital.temperature} icon={<Thermometer />} iconBg="bg-orange-100" iconColor="text-orange-600" />
              <VitalHistoryCard label="GRBS" value={vital.grbs} icon={<TestTube />} iconBg="bg-blue-50" iconColor="text-blue-600" />
              <VitalHistoryCard label="HB" value={vital.hb} icon={<TestTube />} iconBg="bg-rose-50" iconColor="text-rose-500" />
              <VitalHistoryCard label="Height" value={vital.height} icon={<Ruler />} iconBg="bg-purple-50" iconColor="text-purple-600" />

              <VitalHistoryCard label="Weight" value={vital.weight} icon={<Scale />} iconBg="bg-green-50" iconColor="text-green-600" />
              <VitalHistoryCard label="BMI" value={vital.bmi} icon={<Gauge />} iconBg="bg-pink-100" iconColor="text-pink-600" />
              <VitalHistoryCard label="IBW" value={vital.ibw} icon={<Gauge />} iconBg="bg-sky-50" iconColor="text-sky-600" />
              <VitalHistoryCard label="RBS" value={vital.rbs} icon={<TestTube />} iconBg="bg-blue-50" iconColor="text-blue-600" />

            </div>


            {/* ADDITIONAL NOTE */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-1">Additional Note</p>
              <div className="bg-white border rounded-xl p-4 text-sm text-gray-700">
                {vital.additional_note || "—"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// import React, { useState } from "react";
// import { VitalCard } from "./VitalCard";

// /**
//  * history: array of entries { id, recordedAt, recordedBy, vitals:{ bloodPressure, pulseRate, ... }, observations }
//  */
// export default function VitalsHistory({ history }: { history: any[] }) {
//   const [openId, setOpenId] = useState<string | null>(history?.[0]?.id ?? null);

//   return (
//     <div className="mt-6 space-y-3">
//       {history && history.length ? history.map((entry) => (
//         <div key={entry.id} className="border rounded-xl shadow-sm bg-white">
//           <button
//             onClick={() => setOpenId((s) => (s === entry.id ? null : entry.id))}
//             className="w-full text-left p-4 flex items-center justify-between"
//           >
//             <div>
//               <div className="font-medium">{new Date(entry.recordedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</div>
//               <div className="text-sm text-gray-500">Recorded by {entry.recordedBy} at {new Date(entry.recordedAt).toLocaleTimeString()}</div>
//             </div>
//             <div>{openId === entry.id ? "▴" : "▾"}</div>
//           </button>

//           {openId === entry.id && (
//             <div className="p-4 border-t">
//               <div className="grid grid-cols-3 gap-4">
//                 <VitalCard label="Blood Pressure" value={entry.vitals.bloodPressure ?? "---"} />
//                 <VitalCard label="Pulse Rate" value={entry.vitals.pulseRate ?? "---"} />
//                 <VitalCard label="Temperature" value={entry.vitals.temperature ?? "---"} />
//                 <VitalCard label="Weight" value={entry.vitals.weight ?? "---"} />
//                 <VitalCard label="Height" value={entry.vitals.height ?? "---"} />
//                 <VitalCard label="BMI" value={entry.vitals.bmi ?? "---"} />
//               </div>

//               <div className="mt-4">
//                 <div className="text-sm font-medium mb-1">Additional Observations</div>
//                 <div className="border rounded-xl p-3 text-gray-600">{entry.observations || "-----"}</div>
//               </div>
//             </div>
//           )}
//         </div>
//       )) : <div className="p-4 text-gray-500">No history yet</div>}
//     </div>
//   );
// }


import React, { useState } from "react";
import {
  HeartPulse,
  Activity,
  Thermometer,
  Scale,
  Ruler,
  Gauge,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { VitalCard } from "./VitalCard";

export function VitalsHistory({ history }) {
  const [openId, setOpenId] = useState(history?.[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {history.map((entry) => {
        const open = openId === entry.id;

        return (
          <div
            key={entry.id}
            className="bg-white border rounded-xl shadow-sm overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => setOpenId(open ? null : entry.id)}
              className="w-full flex justify-between items-center p-5"
            >
              <div>
                <div className="font-semibold text-gray-800">
                  {new Date(entry.recordedAt).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>

                <div className="text-gray-500 text-sm">
                  Recorded by {entry.recordedBy} at{" "}
                  {new Date(entry.recordedAt).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {open ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {/* Expanded Content */}
            {open && (
              <div className="border-t p-5 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <VitalCard
                    label="Blood Pressure"
                    value={entry.vitals.bloodPressure}
                    icon={<HeartPulse className="w-6 h-6 text-red-500" />}
                  />
                  <VitalCard
                    label="Pulse Rate"
                    value={entry.vitals.pulseRate}
                    icon={<Activity className="w-6 h-6 text-blue-500" />}
                  />
                  <VitalCard
                    label="Temperature"
                    value={entry.vitals.temperature}
                    icon={<Thermometer className="w-6 h-6 text-orange-500" />}
                  />
                  <VitalCard
                    label="Weight"
                    value={entry.vitals.weight}
                    icon={<Scale className="w-6 h-6 text-green-500" />}
                  />
                  <VitalCard
                    label="Height"
                    value={entry.vitals.height}
                    icon={<Ruler className="w-6 h-6 text-purple-500" />}
                  />
                  <VitalCard
                    label="BMI"
                    value={entry.vitals.bmi}
                    icon={<Gauge className="w-6 h-6 text-pink-500" />}
                  />
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    Additional Observations
                  </div>
                  <div className="border rounded-xl p-3 text-gray-700 bg-gray-50">
                    {entry.observations || "-----"}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

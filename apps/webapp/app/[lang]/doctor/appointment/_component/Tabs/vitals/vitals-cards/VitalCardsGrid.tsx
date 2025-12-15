// // "use client";

// // import { VitalCard } from "./VitalCard";
// // import {
// //   HeartPulse,
// //   Activity,
// //   Thermometer,
// //   Scale,
// //   Ruler,
// //   Gauge,
// // } from "lucide-react";

// // export function VitalCardsGrid({
// //   vitals,
// //   loading,
// //   onDelete,
// // }: {
// //   vitals: any;
// //   loading: boolean;
// //   onDelete: () => void;
// // }) {
// //   if (loading) return <p className="text-sm text-gray-500">Loading vitals...</p>;
// //   if (!vitals) return <p className="italic text-gray-500">No vitals recorded</p>;

// //   return (
// //     <>
// //       <div className="grid grid-cols-4 gap-4 mt-4">
// //         <VitalCard label="Blood Pressure" value={vitals.blood_pressure} icon={<HeartPulse />} />
// //         <VitalCard label="Pulse Rate" value={vitals.pulse_rate} icon={<Activity />} />
// //         <VitalCard label="Temperature" value={vitals.temperature} icon={<Thermometer />} />
// //         <VitalCard label="Weight" value={vitals.weight} icon={<Scale />} />
// //         <VitalCard label="Height" value={vitals.height} icon={<Ruler />} />
// //         <VitalCard label="BMI" value={vitals.bmi} icon={<Gauge />} />
// //       </div>

// //       {/* Notes */}
// //       <div className="mt-4">
// //         <div className="text-sm font-medium mb-1">Additional Notes</div>
// //         <div className="border rounded-xl p-3 text-gray-700">
// //           {vitals.notes || "—"}
// //         </div>
// //       </div>

// //       {/* DELETE */}
// //       <div className="mt-4 text-right">
// //         <button
// //           onClick={onDelete}
// //           className="text-sm text-red-600 hover:underline"
// //         >
// //           Delete Vitals
// //         </button>
// //       </div>
// //     </>
// //   );
// // }



// "use client";

// import { VitalCard } from "./VitalCard";
// import {
//     HeartPulse,
//     Activity,
//     Thermometer,
//     Scale,
//     Ruler,
//     Gauge,
//     Droplets,
//     Wind,
//     TestTube,
//     Info,
//     Trash2,
//     Pencil,
// } from "lucide-react";
// import { VitalCardsGridSkeleton } from "./VitalCardsGridSkeleton";

// export function VitalCardsGrid({
//     vitals,
//     loading,
//     onDelete,
//     onEdit,
// }: {
//     vitals: any;
//     loading: boolean;
//     onDelete: () => void;
//     onEdit: () => void;
// }) {
//     console.log(vitals)
//     if (loading)
//         return <VitalCardsGridSkeleton />;

//     if (!vitals)
//         return <p className="italic text-gray-500">No vitals recorded</p>;

//     return (
//         <>
//             <div className="flex items-center justify-between mb-4">
//                 {/* LEFT */}
//                 <div className="text-sm font-semibold text-gray-800">
//                     Last Vital Signs
//                 </div>

//                 {/* RIGHT */}
//                 <div className="flex items-center gap-3">
//                     {/* Recorded Time */}
//                     <div className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600 bg-white">
//                         <span>
//                             Recorded by{" "}
//                             <span className="font-medium">
//                                 {vitals?.createdBy?.first_name ?? "Nurse"}
//                             </span>{" "}
//                             on{" "}
//                             {vitals?.created_at
//                                 ? new Date(vitals.created_at).toLocaleString("en-IN", {
//                                     day: "numeric",
//                                     month: "long",
//                                     year: "numeric",
//                                     hour: "numeric",
//                                     minute: "2-digit",
//                                 })
//                                 : "--"}
//                         </span>

//                         <Info className="h-3.5 w-3.5 text-blue-500" />
//                     </div>

//                     {/* EDIT */}
//                     <button
//                         onClick={onEdit}
//                         className="rounded-full p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition"
//                         title="Edit Vitals"
//                     >
//                         <Pencil className="h-4 w-4" />
//                     </button>

//                     {/* DELETE ICON */}
//                     <button
//                         onClick={onDelete}
//                         className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
//                         title="Delete Vitals"
//                     >
//                         <Trash2 className="h-4 w-4" />
//                     </button>
//                 </div>
//             </div>

//             <div className="grid grid-cols-4 gap-4">
//                 <VitalCard
//                     label="Blood Pressure"
//                     value={vitals.blood_pressure}
//                     icon={<HeartPulse className="h-5 w-5" />}
//                     iconBg="bg-red-100"
//                     iconColor="text-red-500"
//                 />

//                 <VitalCard
//                     label="Pulse Rate"
//                     value={vitals.pulse_rate}
//                     icon={<Activity className="h-5 w-5" />}
//                     iconBg="bg-blue-100"
//                     iconColor="text-blue-600"
//                 />

//                 <VitalCard
//                     label="Respiration Rate"
//                     value={vitals.respiratory_rate}
//                     icon={<Wind className="h-5 w-5" />}
//                     iconBg="bg-sky-100"
//                     iconColor="text-sky-600"
//                 />

//                 <VitalCard
//                     label="SpO₂ (%)"
//                     value={vitals.oxygen_saturation}
//                     icon={<Droplets className="h-5 w-5" />}
//                     iconBg="bg-yellow-100"
//                     iconColor="text-yellow-600"
//                 />

//                 <VitalCard label="Systolic (L)" value={vitals.systolic_l} icon={<HeartPulse />} iconBg="bg-red-50" iconColor="text-red-500" />
//                 <VitalCard label="Diastolic (L)" value={vitals.diastolic_l} icon={<HeartPulse />} iconBg="bg-orange-50" iconColor="text-orange-500" />
//                 <VitalCard label="Systolic (R)" value={vitals.systolic_r} icon={<HeartPulse />} iconBg="bg-green-50" iconColor="text-green-600" />
//                 <VitalCard label="Diastolic (R)" value={vitals.diastolic_r} icon={<HeartPulse />} iconBg="bg-pink-50" iconColor="text-pink-500" />

//                 <VitalCard label="Temperature" value={vitals.temperature} icon={<Thermometer />} iconBg="bg-orange-100" iconColor="text-orange-600" />
//                 <VitalCard label="GRBS" value={vitals.grbs} icon={<TestTube />} iconBg="bg-blue-50" iconColor="text-blue-600" />
//                 <VitalCard label="HB" value={vitals.hb} icon={<TestTube />} iconBg="bg-rose-50" iconColor="text-rose-500" />
//                 <VitalCard label="Height" value={vitals.height} icon={<Ruler />} iconBg="bg-purple-50" iconColor="text-purple-600" />

//                 <VitalCard label="Weight" value={vitals.weight} icon={<Scale />} iconBg="bg-green-50" iconColor="text-green-600" />
//                 <VitalCard label="BMI" value={vitals.bmi} icon={<Gauge />} iconBg="bg-pink-100" iconColor="text-pink-600" />
//                 <VitalCard label="IBW" value={vitals.ibw} icon={<Gauge />} iconBg="bg-sky-50" iconColor="text-sky-600" />
//                 <VitalCard label="RBS" value={vitals.rbs} icon={<TestTube />} iconBg="bg-blue-50" iconColor="text-blue-600" />
//             </div>

//             {/* ADDITIONAL NOTE */}
//             <div className="mt-6">
//                 <div className="mb-2 text-sm font-medium text-gray-700">
//                     Additional Note
//                 </div>
//                 <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-gray-700">
//                     {vitals.notes || "----"}
//                 </div>
//             </div>

//         </>
//     );
// }


"use client";

import { VitalCard } from "./VitalCard";
import {
    HeartPulse,
    Activity,
    Thermometer,
    Scale,
    Ruler,
    Gauge,
    Droplets,
    Wind,
    TestTube,
    Info,
    Trash2,
    Pencil,
} from "lucide-react";
import { VitalCardsGridSkeleton } from "./VitalCardsGridSkeleton";
import { Vital } from "./vitals";

export function VitalCardsGrid({
    vitals,
    loading,
    onDelete,
    onEdit,
}: {
    vitals: Vital[];
    loading: boolean;
    onDelete: (id: number) => void;
    onEdit: (vital: Vital) => void;
}) {
    if (loading) return <VitalCardsGridSkeleton />;

    if (!Array.isArray(vitals) || vitals.length === 0) {
        return <p className="italic text-gray-500">No vitals recorded</p>;
    }

    return (
        <>
            <div>
                {/* HEADER */}
                <div className="text-sm font-semibold text-gray-800">
                    Last Vital Signs
                </div>
                {vitals.map((vitals) => (
                    <div key={vitals.id} className="border-b pb-4">
                        <div className="flex items-center justify-end my-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600 bg-white">
                                    <span>
                                        Recorded by{" "}
                                        <span className="font-medium">
                                            {vitals?.createdBy?.name ?? "Nurse"}
                                        </span>{" "}
                                        on{" "}
                                        {vitals?.created_at
                                            ? new Date(vitals.created_at).toLocaleString("en-IN", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                                hour: "numeric",
                                                minute: "2-digit",
                                            })
                                            : "--"}
                                    </span>

                                    <Info className="h-3.5 w-3.5 text-blue-500" />
                                </div>

                                <button
                                    onClick={() => onEdit(vitals)}
                                    className="rounded-full p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition"
                                    title="Edit Vitals"
                                >
                                    <Pencil className="h-4 w-4" />
                                </button>

                                <button
                                    onClick={() => onDelete(vitals.id)}
                                    className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                                    title="Delete Vitals"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* GRID — UNCHANGED */}
                        <div className="grid grid-cols-4 gap-4">
                            <VitalCard
                                label="Blood Pressure"
                                value={vitals.blood_pressure}
                                icon={<HeartPulse className="h-5 w-5" />}
                                iconBg="bg-red-100"
                                iconColor="text-red-500"
                            />

                            <VitalCard
                                label="Pulse Rate"
                                value={vitals.pulse_rate}
                                icon={<Activity className="h-5 w-5" />}
                                iconBg="bg-blue-100"
                                iconColor="text-blue-600"
                            />

                            <VitalCard
                                label="Respiration Rate"
                                value={vitals.respiration_rate}
                                icon={<Wind className="h-5 w-5" />}
                                iconBg="bg-sky-100"
                                iconColor="text-sky-600"
                            />

                            <VitalCard
                                label="SpO₂ (%)"
                                value={vitals.spo2}
                                icon={<Droplets className="h-5 w-5" />}
                                iconBg="bg-yellow-100"
                                iconColor="text-yellow-600"
                            />

                            <VitalCard label="Systolic (L)" value={vitals.systolic_left} icon={<HeartPulse />} iconBg="bg-red-50" iconColor="text-red-500" />
                            <VitalCard label="Diastolic (L)" value={vitals.diastolic_left} icon={<HeartPulse />} iconBg="bg-orange-50" iconColor="text-orange-500" />
                            <VitalCard label="Systolic (R)" value={vitals.systolic_right} icon={<HeartPulse />} iconBg="bg-green-50" iconColor="text-green-600" />
                            <VitalCard label="Diastolic (R)" value={vitals.diastolic_right} icon={<HeartPulse />} iconBg="bg-pink-50" iconColor="text-pink-500" />

                            <VitalCard label="Temperature" value={vitals.temperature} icon={<Thermometer />} iconBg="bg-orange-100" iconColor="text-orange-600" />
                            <VitalCard label="GRBS" value={vitals.grbs} icon={<TestTube />} iconBg="bg-blue-50" iconColor="text-blue-600" />
                            <VitalCard label="HB" value={vitals.hb} icon={<TestTube />} iconBg="bg-rose-50" iconColor="text-rose-500" />
                            <VitalCard label="Height" value={vitals.height} icon={<Ruler />} iconBg="bg-purple-50" iconColor="text-purple-600" />

                            <VitalCard label="Weight" value={vitals.weight} icon={<Scale />} iconBg="bg-green-50" iconColor="text-green-600" />
                            <VitalCard label="BMI" value={vitals.bmi} icon={<Gauge />} iconBg="bg-pink-100" iconColor="text-pink-600" />
                            <VitalCard label="IBW" value={vitals.ibw} icon={<Gauge />} iconBg="bg-sky-50" iconColor="text-sky-600" />
                            <VitalCard label="RBS" value={vitals.rbs} icon={<TestTube />} iconBg="bg-blue-50" iconColor="text-blue-600" />
                        </div>

                        {/* NOTE — UNCHANGED */}
                        <div className="mt-6">
                            <div className="mb-2 text-sm font-medium text-gray-700">
                                Additional Note
                            </div>
                            <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-gray-700">
                                {vitals.additional_note || "----"}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

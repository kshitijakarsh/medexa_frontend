// // // app/surgery/[id]/_components/VisitInfoCard.tsx
// // "use client";

// // function VisitCard({ label, value }: { label: string; value: string }) {
// //   return (
// //     <div className="bg-white border rounded-xl p-3 shadow-sm">
// //       <p className="text-gray-500 text-sm">{label}</p>
// //       <p className="font-semibold">{value}</p>
// //     </div>
// //   );
// // }

// // export default function VisitInfoCard() {
// //   return (
// //     <div className="bg-white rounded-xl border p-4 shadow-sm">
// //       <h3 className="text-lg font-semibold mb-3">Current Visit Information</h3>

// //       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
// //         <VisitCard label="Visit Date & Time" value="Nov 14, 2024 10:30 AM" />
// //         <VisitCard label="Visit Type" value="IPD" />
// //         <VisitCard label="Token No" value="C-245" />
// //         <VisitCard label="Department" value="Cardiology" />
// //         <VisitCard label="Consulting Doctor" value="Dr. Ahmed Al-Mansour" />
// //         <VisitCard label="Room No" value="Room 304" />
// //       </div>
// //     </div>
// //   );
// // }



// "use client";

// import {
//   CalendarDays,
//   ClipboardList,
//   Ticket,
//   Building2,
//   Stethoscope,
//   DoorOpen,
// } from "lucide-react";

// function VisitCard({
//   label,
//   value,
//   icon: Icon,
//   iconColor,
// }: {
//   label: string;
//   value: string;
//   icon: any;
//   iconColor: string;
// }) {
//   return (
//     <div className="bg-white border rounded-xl p-4 shadow-sm flex items-start gap-3">
//       <div
//         className={`p-2 rounded-full ${iconColor} flex items-center justify-center`}
//       >
//         <Icon className="w-4 h-4 text-white" />
//       </div>

//       <div>
//         <p className="text-gray-500 text-sm">{label}</p>
//         <p className="font-semibold">{value}</p>
//       </div>
//     </div>
//   );
// }

// export default function VisitInfoCard() {
//   return (
//     <div className="bg-white rounded-xl border p-4 shadow-sm relative">

//       {/* TOP RIGHT BADGE */}
//       <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full">
//         In progress
//       </span>

//       <h3 className="text-lg font-semibold mb-4">Current Visit Information</h3>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

//         <VisitCard
//           label="Visit Date & Time"
//           value="Nov 14, 2024 10:30 AM"
//           icon={CalendarDays}
//           iconColor="bg-red-400"
//         />

//         <VisitCard
//           label="Visit Type"
//           value="IPD"
//           icon={ClipboardList}
//           iconColor="bg-sky-400"
//         />

//         <VisitCard
//           label="Token No"
//           value="C-245"
//           icon={Ticket}
//           iconColor="bg-orange-400"
//         />

//         <VisitCard
//           label="Department"
//           value="Cardiology"
//           icon={Building2}
//           iconColor="bg-blue-500"
//         />

//         <VisitCard
//           label="Consulting Doctor"
//           value="Dr. Ahmed Al-Mansour"
//           icon={Stethoscope}
//           iconColor="bg-green-400"
//         />

//         <VisitCard
//           label="Room No"
//           value="Room 304"
//           icon={DoorOpen}
//           iconColor="bg-yellow-400"
//         />
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@workspace/ui/components/skeleton";

import {
    CalendarDays,
    ClipboardList,
    Ticket,
    Building2,
    Stethoscope,
    DoorOpen,
} from "lucide-react";

interface VisitInfo {
    dateTime: string;
    type: string;
    token: string;
    department: string;
    doctor: string;
    room: string;
    status: string;
}

function VisitCard({
    label,
    value,
    icon: Icon,
    iconColor,
}: {
    label: string;
    value: string;
    icon: any;
    iconColor: string;
}) {
    return (
        <div className="bg-white border-1 border-grey-100 rounded-xl p-3 flex items-center gap-3 ">
            <div
                className={`p-2 rounded-full ${iconColor} flex items-center justify-center`}
            >
                <Icon className="w-5 h-5 " />
            </div>

            <div>
                <p className="text-gray-500 text-sm">{label}</p>
                <p className="font-semibold">{value}</p>
            </div>
        </div>
    );
}

export default function VisitInfoCard() {
    const [data, setData] = useState<VisitInfo | null>(null);
    const [loading, setLoading] = useState(true);

    // ⏳ Simulated API call
    useEffect(() => {
        const timeout = setTimeout(() => {
            setData({
                dateTime: "Nov 14, 2024 10:30 AM",
                type: "IPD",
                token: "C-245",
                department: "Cardiology",
                doctor: "Dr. Ahmed Al-Mansour",
                room: "Room 304",
                status: "In progress",
            });
            setLoading(false);
        }, 1200);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="bg-white rounded-xl border p-4 shadow-sm relative space-y-2">
            <div className="border-b pb-2">

                <h3 className="text-lg font-semibold">Current Visit Information</h3>
                {/* STATUS BADGE */}
                {!loading && data && (
                    <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full">
                        {data.status}
                    </span>
                )}

            </div>
            {/* 🔵 LOADING SKELETON */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white border rounded-xl p-4 shadow-sm">
                            <Skeleton className="h-4 w-32 mb-2" />
                            <Skeleton className="h-5 w-44" />
                        </div>
                    ))}
                </div>
            ) : (
                data && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                        <VisitCard
                            label="Visit Date & Time"
                            value={data.dateTime}
                            icon={CalendarDays}
                            iconColor="bg-red-100 text-red-500"
                        />

                        <VisitCard
                            label="Visit Type"
                            value={data.type}
                            icon={ClipboardList}
                            iconColor="bg-sky-100 text-sky-500"
                        />

                        <VisitCard
                            label="Token No"
                            value={data.token}
                            icon={Ticket}
                            iconColor="bg-orange-100 text-orange-500"
                        />

                        <VisitCard
                            label="Department"
                            value={data.department}
                            icon={Building2}
                            iconColor="bg-blue-100 text-blue-500"
                        />

                        <VisitCard
                            label="Consulting Doctor"
                            value={data.doctor}
                            icon={Stethoscope}
                            iconColor="bg-green-100 text-green-500"
                        />

                        <VisitCard
                            label="Room No"
                            value={data.room}
                            icon={DoorOpen}
                            iconColor="bg-yellow-100 text-yellow-500"
                        />
                    </div>
                )
            )}
        </div>
    );
}

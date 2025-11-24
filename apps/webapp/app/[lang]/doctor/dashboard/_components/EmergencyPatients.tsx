// // // // app/doctor-dashboard/components/EmergencyPatients.tsx
// // // "use client";
// // // import { useEffect, useState } from "react";
// // // import Image from "next/image";
// // // import { getEmergencyPatients } from "./api";
// // // import { SkeletonBlock } from "./ui/SkeletonBlock";
// // // import { StatusPill } from "./ui/StatusPill";

// // // export default function EmergencyPatients() {
// // //   const [loading, setLoading] = useState(true);
// // //   const [items, setItems] = useState<any[]>([]);

// // //   useEffect(() => {
// // //     getEmergencyPatients().then(d => { setItems(d); setLoading(false); });
// // //   }, []);

// // //   if (loading) {
// // //     return <div className="border-2 border-[#CFE9FF] rounded-xl p-3"><div className="flex gap-4"><SkeletonBlock rows={4} /><SkeletonBlock rows={4} /></div></div>;
// // //   }

// // //   return (
// // //     <div className="border-2 border-[#CFE9FF] rounded-xl p-3">
// // //       <div className="flex items-center justify-between mb-3">
// // //         <div className="text-sm font-semibold pl-2">Emergency Patients</div>
// // //         <div className="text-sm text-[#0B84FF]">View All</div>
// // //       </div>

// // //       <div className="flex gap-4 overflow-x-auto pb-2">
// // //         {items.map((p) => (
// // //           <div key={p.id} className="bg-white rounded-lg border p-3 w-[300px] flex-shrink-0 flex flex-col justify-between">
// // //             <div className="flex items-center gap-3">
// // //               <div className="relative w-10 h-10">
// // //                 <Image src={p.avatar} alt="" width={40} height={40} className="rounded-full ring-2 ring-[#DFF5E6]" />
// // //               </div>
// // //               <div>
// // //                 <div className="font-medium">{p.name}</div>
// // //                 <div className="text-xs text-gray-500">MRN-{p.mrn}</div>
// // //               </div>
// // //               <div className="ml-auto"><StatusPill status={p.status} /></div>
// // //             </div>

// // //             <div className="mt-3 flex items-center justify-between text-sm">
// // //               <div className="text-xs text-gray-500"><span>⏱</span> {p.time} · <span className="text-[#17B26D]">{p.room}</span></div>
// // //               <div className="text-xs text-[#FF6B35] font-medium">{p.type}</div>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // app/doctor-dashboard/components/EmergencyPatients.tsx
// // "use client";
// // import { useState, useEffect } from "react";
// // import Image from "next/image";
// // import { getEmergencyPatients } from "./api";
// // import { SkeletonBlock } from "./ui/SkeletonBlock";
// // import { StatusPill } from "./ui/StatusPill";

// // export default function EmergencyPatients() {
// //   const [loading, setLoading] = useState(true);
// //   const [items, setItems] = useState<any[]>([]);

// //   useEffect(() => {
// //     getEmergencyPatients().then((d) => {
// //       setItems(d);
// //       setLoading(false);
// //     });
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="border border-[#CFE9FF] bg-[#F5FBFF] rounded-xl p-4">
// //         <div className="flex gap-4">
// //           <SkeletonBlock rows={4} />
// //           <SkeletonBlock rows={4} />
// //           <SkeletonBlock rows={4} />
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="border border-[#CFE9FF] bg-[#FFFFFF] rounded-xl p-4">
// //       {/* Header */}
// //       <div className="flex items-center justify-between mb-4">
// //         <div className="text-base font-semibold">Emergency Patients</div>
// //         <button className="text-sm text-[#0B84FF] font-medium">View All</button>
// //       </div>

// //       {/* Card List */}
// //       <div className="flex gap-4 overflow-x-auto pb-2">
// //         {items.map((p) => (
// //           <div
// //             key={p.id}
// //             className="bg-white border border-[#E6E6E6] rounded-xl px-4 py-4 w-[310px] flex-shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
// //           >
// //             {/* Top section */}
// //             <div className="flex items-center gap-3">
// //               <Image
// //                 src={p.avatar}
// //                 alt={p.name}
// //                 width={46}
// //                 height={46}
// //                 className="rounded-full border-2 border-[#DFF5E6]"
// //               />

// //               <div className="flex flex-col">
// //                 <span className="font-semibold text-[15px]">{p.name}</span>
// //                 <span className="text-xs text-gray-500">MRN-{p.mrn}</span>
// //               </div>

// //               <div className="ml-auto">
// //                 <StatusPill status={p.status} />
// //               </div>
// //             </div>

// //             {/* Bottom */}
// //             <div className="mt-4 flex items-center justify-between text-sm">
// //               <div className="text-xs text-gray-500 flex items-center gap-1">
// //                 <span className="text-[15px]">🕒</span> {p.time}
// //                 <span className="text-[#17B26D] font-medium">{p.room}</span>
// //               </div>

// //               <div className="text-xs text-[#FF6B35] font-medium">
// //                 {p.type}
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }



// // app/doctor-dashboard/components/EmergencyPatients.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { getEmergencyPatients } from "./api";
// import { EmergencyPatientSkeleton } from "./EmergencyPatient/EmergencyPatientSkeleton";
// import { EmergencyPatientCard } from "./EmergencyPatient/EmergencyPatientCard";

// export default function EmergencyPatients() {
//   const [loading, setLoading] = useState(true);
//   const [items, setItems] = useState<any[]>([]);

//   useEffect(() => {
//     getEmergencyPatients().then((d) => {
//       setItems(d);
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <div className="border border-[#CFE9FF] bg-white rounded-xl p-4">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="text-base font-semibold">Emergency Patients</div>
//         <button className="text-sm text-[#0B84FF] font-medium">View All</button>
//       </div>

//       {/* List */}
//       <div className="flex gap-4 overflow-x-auto pb-2">
//         {loading
//           ? [...Array(3)].map((_, i) => <EmergencyPatientSkeleton key={i} />)
//           : items.map((p) => <EmergencyPatientCard key={p.id} p={p} />)}
//       </div>
//     </div>
//   );
// }



// app/doctor-dashboard/components/EmergencyPatients.tsx
"use client";

import { useEffect, useState } from "react";
import { getEmergencyPatients } from "./api";
import { EmergencyPatientSkeleton } from "./EmergencyPatient/EmergencyPatientSkeleton";
import { EmergencyPatientCard } from "./EmergencyPatient/EmergencyPatientCard";
import { DashboardSectionCard } from "./ui/DashboardSectionCard";
import Link from "next/link";
import { SectionTitle } from "./ui/SectionTitle";
import { ViewAllLink } from "./ui/ViewAllLink";
import { buildUrl, ROUTES } from "@/lib/routes";

export default function EmergencyPatients() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        getEmergencyPatients().then((d) => {
            setItems(d);
            setLoading(false);
        });
    }, []);

    return (
        <DashboardSectionCard>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                {/* <div className="text-base font-semibold">Emergency Patients</div> */}
                <SectionTitle as="h3">Emergency Patients</SectionTitle>

                {/* View All route */}
                {/* <Link
                    href="/doctor-dashboard/emergency-patients"
                    className="text-sm text-[#0B84FF] font-medium"
                >
                    View All
                </Link> */}
                {/* <ViewAllLink href={ROUTES.DOCTOR_VIEW_ALL + "?tab=emergency"} /> */}
                <ViewAllLink href={buildUrl(ROUTES.DOCTOR_VIEW_ALL, { tab: "emergency" })} />

            </div>

            {/* List */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {loading
                    ? [...Array(3)].map((_, i) => <EmergencyPatientSkeleton key={i} />)
                    : items.map((p) => <EmergencyPatientCard key={p.id} p={p} />)}
            </div>
        </DashboardSectionCard>
    );
}

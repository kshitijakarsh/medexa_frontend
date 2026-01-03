// // // // "use client";

// // // // import useSWR from "swr";
// // // // import Image from "next/image";
// // // // import { doctorFetch } from "@/app/api/doctor/fetcher";
// // // // import { Skeleton } from "@/components/ui/skeleton";

// // // // export default function VipPatientsCard() {
// // // //   const { data, isLoading } = useSWR("/api/doctor/vip", doctorFetch);

// // // //   if (isLoading)
// // // //     return (
// // // //       <div className="bg-white p-4 rounded-lg shadow border">
// // // //         <Skeleton className="h-6 w-28 mb-4" />
// // // //         <Skeleton className="h-20 w-full" />
// // // //       </div>
// // // //     );

// // // //   return (
// // // //     <div className="bg-white p-4 rounded-lg shadow border">
// // // //       <h2 className="font-semibold text-lg mb-4">VIP Patients</h2>

// // // //       {data.map((patient: any) => (
// // // //         <div key={patient.id} className="flex items-center gap-3 mb-3">
// // // //           <Image
// // // //             src={patient.image}
// // // //             width={40}
// // // //             height={40}
// // // //             className="rounded-full"
// // // //             alt="img"
// // // //           />
// // // //           <div>
// // // //             <p className="font-semibold">{patient.name}</p>
// // // //             <p className="text-xs text-gray-500">{patient.time} · {patient.room}</p>
// // // //             <p className="text-xs text-orange-600">{patient.type}</p>
// // // //           </div>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }



// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import Image from "next/image";
// // // import { SkeletonBlock } from "./ui/SkeletonBlock";
// // // import { getVipPatients } from "./api";

// // // export default function VipPatientsCard() {
// // //   const [loading, setLoading] = useState(true);
// // //   const [patients, setPatients] = useState([]);

// // //   useEffect(() => {
// // //     getVipPatients().then((res) => {
// // //       setPatients(res);
// // //       setLoading(false);
// // //     });
// // //   }, []);

// // //   if (loading) return <SkeletonBlock rows={5} />;

// // //   return (
// // //     <div className="bg-white p-4 rounded-xl shadow-sm border">
// // //       <div className="flex justify-between mb-4">
// // //         <h2 className="text-lg font-semibold">VIP Patients</h2>
// // //         <button className="text-blue-600 text-sm">View All</button>
// // //       </div>

// // //       {patients.map((p: any) => (
// // //         <div key={p.id} className="flex items-center gap-3 mb-4">
// // //           <Image src={p.avatar} width={40} height={40} className="rounded-full" alt="" />
// // //           <div>
// // //             <p className="font-medium">{p.name}</p>
// // //             <p className="text-xs text-gray-500">{p.time} · {p.room}</p>
// // //             <p className="text-xs text-orange-600">{p.type}</p>
// // //           </div>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }



// // // app/doctor-dashboard/components/VipPatientsCard.tsx
// // "use client";
// // import { useEffect, useState } from "react";
// // import Image from "next/image";
// // import { getVipPatients } from "./api";
// // import { SkeletonBlock } from "./ui/SkeletonBlock";

// // export default function VipPatientsCard() {
// //   const [loading, setLoading] = useState(true);
// //   const [items, setItems] = useState<any[]>([]);
// //   useEffect(() => { getVipPatients().then(d => { setItems(d); setLoading(false); }); }, []);
// //   if (loading) return <SkeletonBlock rows={4} />;

// //   return (
// //     <div className="bg-white p-4 rounded-xl shadow-sm border">
// //       <div className="flex justify-between items-center mb-3">
// //         <div className="text-sm font-semibold">VIP Patients</div>
// //         <div className="text-sm text-[#0B84FF]">View All</div>
// //       </div>
// //       <div className="space-y-3">
// //         {items.map(p => (
// //           <div key={p.id} className="flex items-center gap-3">
// //             <Image src={p.avatar} width={36} height={36} className="rounded-full ring-2 ring-[#FFF4D9]" alt="" />
// //             <div className="flex-1">
// //               <div className="font-medium">{p.name}</div>
// //               <div className="text-xs text-gray-500">{p.time} · <span className="text-[#17B26D]">{p.room}</span></div>
// //             </div>
// //             <div><div className="text-xs text-[#FF6B35]">Emergency</div><div className="mt-1"><span className="bg-[#E8F7FF] text-[#1167D5] px-3 py-1 rounded-full text-xs">In progress</span></div></div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// // app/doctor-dashboard/components/VipPatientsCard.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { getVipPatients } from "./api";
// import { DashboardSectionCard } from "./ui/DashboardSectionCard";
// import { VipPatientItem } from "./VIP/VipPatientItem";
// import { SkeletonBlock } from "./ui/SkeletonBlock";
// import Link from "next/link";
// import { VipCrownBadge } from "../../../../../components/common/pasient-card/vip-crown-badge";
// import { SectionTitle } from "./ui/SectionTitle";
// import { VipPatientSkeleton } from "./VIP/VipPatientSkeleton";
// import { buildUrl, DoctorTabs, ROUTES } from "@/lib/routes";
// import { ViewAllLink } from "./ui/ViewAllLink";

// export default function VipPatientsCard() {
//     const [loading, setLoading] = useState(true);
//     const [items, setItems] = useState<any[]>([]);

//     useEffect(() => {
//         getVipPatients().then((d) => {
//             setItems(d);
//             setLoading(false);
//         });
//     }, []);
//                     console.log(DoctorTabs[2]?.key)


//     return (
//         <DashboardSectionCard>
//             {/* Header */}
//             <div className="flex justify-between items-center mb-4">
//                 <div className="flex items-center gap-2">
//                     <VipCrownBadge size={14} />   {/* HEADER crown */}
//                     <SectionTitle as="h4">VIP Patients</SectionTitle>
//                 </div>


//                 {/* <Link href="/doctor-dashboard/vip-patients" className="text-sm text-[#0B84FF]">
//                     View All
//                 </Link> */}
//                 <ViewAllLink href={buildUrl(ROUTES.DOCTOR_VIEW_ALL, { tab: DoctorTabs[2]?.key })} />

//             </div>

//             {/* List */}
//             <div className="space-y-2">
//                 {loading
//                     ? [...Array(3)].map((_, i) => <VipPatientSkeleton key={i} />)
//                     : items.map((p) => <VipPatientItem key={p.id} p={p} />)}
//             </div>
//         </DashboardSectionCard>
//     );
// }



"use client";

import { DashboardSectionCard } from "./ui/DashboardSectionCard";
import { VipPatientItem } from "./VIP/VipPatientItem";
import { VipPatientSkeleton } from "./VIP/VipPatientSkeleton";
import { VipCrownBadge } from "../../../../../components/common/pasient-card/vip-crown-badge";
import { SectionTitle } from "./ui/SectionTitle";
import { ViewAllLink } from "./ui/ViewAllLink";
import { buildUrl, DoctorTabs, ROUTES } from "@/lib/routes";

import { useDoctorVisitsQuery } from "./api";
import { useDictionary } from "@/i18n/use-dictionary";

export default function VipPatientsCard() {
  const dict = useDictionary();
  const { data, isLoading } = useDoctorVisitsQuery({
    status: "vip",
    limit: 5,
    page: 1,
  });

  const items = data?.data ?? [];
  const hasItems = items.length > 0;

  return (
    <DashboardSectionCard>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <VipCrownBadge size={14} />
          <SectionTitle as="h4">{dict.dashboard.vipPatients}</SectionTitle>
        </div>

        <ViewAllLink
          href={buildUrl(ROUTES.NURSE_VIEW_ALL, { tab: DoctorTabs[2]?.key })}
          disabled={!hasItems}
          label={dict.dashboard.viewAll}
        />
      </div>

      {/* List */}
      <div className="space-y-2">
        {isLoading
          ? [...Array(3)].map((_, i) => <VipPatientSkeleton key={i} />)
          : hasItems
            ? items.map((p) => <VipPatientItem key={p.id} p={p} />)
            : <div className="text-gray-500 text-sm py-4">{dict.dashboard.noVipFound}</div>
        }
      </div>
    </DashboardSectionCard>
  );
}

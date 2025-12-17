// // "use client";

// // import useSWR from "swr";
// // import { doctorFetch } from "@/app/api/doctor/fetcher";
// // import { Skeleton } from "@/components/ui/skeleton";

// // export default function PatientTypesCard() {
// //   const { data, isLoading } = useSWR("/api/doctor/patient-types", doctorFetch);

// //   if (isLoading)
// //     return (
// //       <div className="bg-white p-4 rounded-lg shadow border">
// //         <Skeleton className="h-6 w-32 mb-4" />
// //         <Skeleton className="h-4 w-full mb-2" />
// //         <Skeleton className="h-4 w-full" />
// //       </div>
// //     );

// //   return (
// //     <div className="bg-white p-4 rounded-lg shadow border">
// //       <h2 className="font-semibold text-lg mb-4">Patient Types</h2>
// //       <div className="flex justify-between mb-2">
// //         <span>New Patients</span>
// //         <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md">
// //           {data.new}
// //         </span>
// //       </div>
// //       <div className="flex justify-between">
// //         <span>Follow-ups</span>
// //         <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md">
// //           {data.follow}
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { SkeletonBlock } from "./ui/SkeletonBlock";
// import { getPatientTypes } from "./api";

// export default function PatientTypesCard() {
//   const [loading, setLoading] = useState(true);
//   const [types, setTypes] = useState<any>(null);

//   useEffect(() => {
//     getPatientTypes().then((res) => {
//       setTypes(res);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) return <SkeletonBlock rows={4} />;

//   return (
//     <div className="bg-white p-4 rounded-xl shadow-sm border">
//       <h2 className="text-lg font-semibold mb-4">Patient Types</h2>

//       <div className="flex justify-between mb-3 text-sm">
//         <span>New Patients</span>
//         <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md">
//           {types.newCount}
//         </span>
//       </div>

//       <div className="flex justify-between text-sm">
//         <span>Follow-ups</span>
//         <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md">
//           {types.followUpCount}
//         </span>
//       </div>
//     </div>
//   );
// }


// app/doctor-dashboard/components/PatientTypesCard.tsx
"use client";
import { useEffect, useState } from "react";
import { getPatientTypes } from "./api";
import { SkeletonBlock } from "./ui/SkeletonBlock";
import { SectionTitle } from "./ui/SectionTitle";
import { DashboardSectionCard } from "./ui/DashboardSectionCard";

export default function PatientTypesCard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        getPatientTypes().then((d) => { setData(d); setLoading(false); });
    }, []);

    if (loading) return <SkeletonBlock rows={4} />;

    return (
        // <div className="bg-white p-4 rounded-xl shadow-sm border">
        //   <div className="text-sm font-semibold mb-3"></div>
        <DashboardSectionCard className="space-y-3">
            <SectionTitle as="h3">Patient Types </SectionTitle>
            <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                    <div>New Patients</div>
                    <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#EAF3FF] text-[#1167D5] font-semibold">{data.newCount}</div>
                </div>

                <div className="flex items-center justify-between">
                    <div>Follow-ups</div>
                    <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#F3E6FF] text-[#7B3BE6] font-semibold">{data.followUpCount}</div>
                </div>
            </div>
        </DashboardSectionCard>
    );
}

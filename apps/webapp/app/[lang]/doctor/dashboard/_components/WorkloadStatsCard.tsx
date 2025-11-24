// // "use client";

// // import useSWR from "swr";
// // import { doctorFetch } from "@/app/api/doctor/fetcher";
// // import { Skeleton } from "@/components/ui/skeleton";

// // export default function WorkloadStatsCard() {
// //   const { data, isLoading } = useSWR("/api/doctor/workload", doctorFetch);

// //   if (isLoading)
// //     return (
// //       <div className="bg-white p-4 rounded-lg shadow border">
// //         <Skeleton className="h-6 w-40 mb-4" />
// //         <Skeleton className="h-4 w-full mb-2" />
// //         <Skeleton className="h-4 w-full" />
// //       </div>
// //     );

// //   return (
// //     <div className="bg-white p-4 rounded-lg shadow border">
// //       <h2 className="font-semibold text-lg mb-4">Workload Stats</h2>
// //       <div className="flex justify-between mb-2">
// //         <span>Pending Results</span>
// //         <span className="font-semibold">{data.pending_results}</span>
// //       </div>
// //       <div className="flex justify-between">
// //         <span>Prescriptions Issued</span>
// //         <span className="font-semibold">{data.prescriptions}</span>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useEffect, useState } from "react";
// import { SkeletonBlock } from "./ui/SkeletonBlock";
// import { getWorkloadStats } from "./api";

// export default function WorkloadStatsCard() {
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState<any>(null);

//   useEffect(() => {
//     getWorkloadStats().then((res) => {
//       setStats(res);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) return <SkeletonBlock rows={4} />;

//   return (
//     <div className="bg-white p-4 rounded-xl shadow-sm border">
//       <h2 className="text-lg font-semibold mb-4">Workload Stats</h2>

//       <div className="space-y-2 text-sm">
//         <div className="flex justify-between">
//           <span>Pending Results</span>
//           <span className="font-semibold">{stats.pendingResults}</span>
//         </div>

//         <div className="flex justify-between">
//           <span>Prescriptions Issued</span>
//           <span className="font-semibold">{stats.prescriptionsIssued}</span>
//         </div>
//       </div>
//     </div>
//   );
// }



// app/doctor-dashboard/components/WorkloadStatsCard.tsx
"use client";
import { useEffect, useState } from "react";
import { getWorkloadStats } from "./api";
import { SkeletonBlock } from "./ui/SkeletonBlock";
import { SectionTitle } from "./ui/SectionTitle";
import { DashboardSectionCard } from "./ui/DashboardSectionCard";

export default function WorkloadStatsCard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        getWorkloadStats().then((d) => { setData(d); setLoading(false); });
    }, []);

    if (loading) return <SkeletonBlock rows={4} />;

    return (
        // <div className="bg-white p-4 rounded-xl shadow-sm border">
        //   <div className="text-sm font-semibold mb-3"></div>
        <DashboardSectionCard className="space-y-3">
            <SectionTitle as="h3">Workload Stats </SectionTitle>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between"><div>Pending Results</div><div className="font-semibold border rounded px-2 py-1 text-xs">{data.pendingResults}</div></div>
                <div className="flex justify-between"><div>Prescriptions Issued</div><div className="font-semibold border rounded px-2 py-1 text-xs">{data.prescriptionsIssued}</div></div>
            </div>
        </DashboardSectionCard>
    );
}

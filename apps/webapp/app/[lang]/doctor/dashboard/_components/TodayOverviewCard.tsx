// // "use client";

// // import useSWR from "swr";
// // import SectionContainer from "./ui/SectionContainer";
// // import { SkeletonCard } from "./ui/SkeletonCard";
// // import { doctorFetch } from "@/app/api/doctor/fetcher";

// // export default function TodayOverviewCard() {
// //   const { data, isLoading } = useSWR("/api/doctor/overview", doctorFetch);

// //   if (isLoading) return <SkeletonCard rows={3} />;

// //   return (
// //     <SectionContainer title="Today's Overview">
// //       <div className="space-y-2">
// //         <p>Total Appointments: <span className="font-semibold">{data.total}</span></p>
// //         <p>Completed: <span className="font-semibold text-green-600">{data.completed}</span></p>
// //         <p>Pending: <span className="font-semibold text-yellow-500">{data.pending}</span></p>
// //       </div>
// //     </SectionContainer>
// //   );
// // }


// "use client";

// import { useEffect, useState } from "react";
// import { SkeletonBlock } from "./ui/SkeletonBlock";
// import { getTodayOverview } from "./api";

// export default function TodayOverviewCard() {
//   const [loading, setLoading] = useState(true);
//   const [overview, setOverview] = useState<any>(null);

//   useEffect(() => {
//     getTodayOverview().then((res) => {
//       setOverview(res);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) return <SkeletonBlock rows={4} />;

//   return (
//     <div className="bg-white p-4 rounded-xl shadow-sm border">
//       <h2 className="text-lg font-semibold mb-4">Today's Overview</h2>

//       <div className="space-y-2 text-sm">
//         <div className="flex justify-between">
//           <span>Total Appointments</span>
//           <span className="font-semibold">{overview.total}</span>
//         </div>

//         <div className="flex justify-between text-green-600 font-medium">
//           <span>Completed</span>
//           <span>{overview.completed}</span>
//         </div>

//         <div className="flex justify-between text-yellow-600 font-medium">
//           <span>Pending</span>
//           <span>{overview.pending}</span>
//         </div>
//       </div>
//     </div>
//   );
// }



// app/doctor-dashboard/components/TodayOverviewCard.tsx
"use client";
import { useEffect, useState } from "react";
import { getTodayOverview } from "./api";
import { SkeletonBlock } from "./ui/SkeletonBlock";
import { DashboardSectionCard } from "./ui/DashboardSectionCard";
import { SectionTitle } from "./ui/SectionTitle";

export default function TodayOverviewCard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        getTodayOverview().then((d) => { setData(d); setLoading(false); });
    }, []);

    if (loading) return <SkeletonBlock rows={4} />;

    return (
        <DashboardSectionCard className="space-y-3">
            <SectionTitle as="h3">Today's Overview</SectionTitle>
            <div className="text-sm space-y-2">
                <div className="flex justify-between"><span>Total Appointments</span><span className="font-semibold">{data.total}</span></div>
                <div className="flex justify-between"><span>Completed</span><span className="font-semibold text-[#2CB470]">{data.completed}</span></div>
                <div className="flex justify-between"><span>Pending</span><span className="font-semibold text-[#F08F2B]">{data.pending}</span></div>
            </div>
        </DashboardSectionCard>
    );
}

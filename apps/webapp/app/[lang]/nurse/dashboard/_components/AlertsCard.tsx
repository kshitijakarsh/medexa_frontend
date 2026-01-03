// // // // "use client";

// // // // import useSWR from "swr";
// // // // import { doctorFetch } from "@/app/api/doctor/fetcher";
// // // // import { Skeleton } from "@/components/ui/skeleton";

// // // // export default function AlertsCard() {
// // // //   const { data, isLoading } = useSWR("/api/doctor/alerts", doctorFetch);

// // // //   if (isLoading)
// // // //     return (
// // // //       <div className="bg-white p-4 rounded-lg shadow border space-y-3">
// // // //         <Skeleton className="h-6 w-40" />
// // // //         {[...Array(3)].map((_, i) => (
// // // //           <Skeleton key={i} className="h-14 w-full" />
// // // //         ))}
// // // //       </div>
// // // //     );

// // // //   return (
// // // //     <div className="bg-white p-4 rounded-lg shadow border">
// // // //       <h2 className="font-semibold text-lg mb-4">Alerts</h2>
// // // //       <div className="space-y-3">
// // // //         {data.map((alert: any) => (
// // // //           <div
// // // //             key={alert.id}
// // // //             className={`p-3 rounded-xl border flex justify-between ${
// // // //               alert.type === "emergency"
// // // //                 ? "bg-red-50 border-red-200"
// // // //                 : "bg-yellow-50 border-yellow-200"
// // // //             }`}
// // // //           >
// // // //             <span>{alert.message}</span>
// // // //             <span className="text-sm text-gray-500">{alert.time}</span>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }



// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { SkeletonBlock } from "./ui/SkeletonBlock";
// // // import { getAlerts } from "./api";

// // // export default function AlertsCard() {
// // //   const [loading, setLoading] = useState(true);
// // //   const [alerts, setAlerts] = useState<any[]>([]);

// // //   useEffect(() => {
// // //     getAlerts().then((res) => {
// // //       setAlerts(res);
// // //       setLoading(false);
// // //     });
// // //   }, []);

// // //   if (loading) return <SkeletonBlock rows={6} />;

// // //   return (
// // //     <div className="bg-white p-4 rounded-xl shadow-sm border">
// // //       <h2 className="text-lg font-semibold mb-4">Alerts</h2>

// // //       <div className="space-y-3">
// // //         {alerts.map((a) => (
// // //           <div
// // //             key={a.id}
// // //             className={`p-3 rounded-xl border ${
// // //               a.type === "emergency"
// // //                 ? "bg-red-50 border-red-200"
// // //                 : "bg-yellow-50 border-yellow-200"
// // //             }`}
// // //           >
// // //             <p className="text-sm font-medium">{a.message}</p>
// // //             <p className="text-xs text-gray-500">{a.time}</p>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // app/doctor-dashboard/_components/AlertsCard.tsx
// // "use client";
// // import { useEffect, useState } from "react";
// // import { getAlerts } from "./api";
// // import { SkeletonBlock } from "./ui/SkeletonBlock";

// // export default function AlertsCard() {
// //   const [loading, setLoading] = useState(true);
// //   const [alerts, setAlerts] = useState<any[]>([]);

// //   useEffect(() => {
// //     getAlerts().then((d) => { setAlerts(d); setLoading(false); });
// //   }, []);

// //   if (loading) return <SkeletonBlock rows={4} />;

// //   return (
// //     <div className="bg-white p-4 rounded-xl shadow-sm border">
// //       <div className="flex justify-between items-center mb-3">
// //         <div className="text-sm font-semibold">Alerts</div>
// //         <div className="text-xs text-gray-400"> </div>
// //       </div>

// //       <div className="space-y-3 text-sm">
// //         {alerts.map((a) => (
// //           <div key={a.id} className="flex gap-3 items-start">
// //             <div className={`h-7 w-7 rounded-full flex items-center justify-center ${a.type === "emergency" ? "bg-[#FFEDEC] text-[#F03E3E]" : "bg-[#E8F3FF] text-[#0B84FF]"}` }>
// //               {/* icon placeholder */}
// //               {a.type === "emergency" ? "!" : "i"}
// //             </div>
// //             <div>
// //               <div className="font-medium">{a.title}</div>
// //               <div className="text-xs text-gray-500">{a.subtitle}</div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }



// // app/doctor-dashboard/_components/AlertsCard.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { getAlerts } from "./api";
// import { DashboardSectionCard } from "../_components/ui/DashboardSectionCard";
// import { AlertItem } from "../_components/Alerts/AlertItem";
// import { SkeletonBlock } from "../_components/ui/SkeletonBlock";
// import { AlertCircle } from "lucide-react";

// export default function AlertsCard() {
//   const [loading, setLoading] = useState(true);
//   const [alerts, setAlerts] = useState<any[]>([]);

//   useEffect(() => {
//     getAlerts().then((d) => {
//       setAlerts(d);
//       setLoading(false);
//     });
//   }, []);

//   if (loading)
//     return <DashboardSectionCard><SkeletonBlock rows={4} /></DashboardSectionCard>;

//   return (
//     <DashboardSectionCard>
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-4">
//         <AlertCircle size={16} className="text-gray-600" />
//         <div className="text-sm font-semibold">Alerts</div>
//       </div>

//       {/* Alerts list */}
//       <div className="space-y-3">
//         {alerts.map((a) => (
//           <AlertItem
//             key={a.id}
//             type={a.type}
//             title={a.title}
//             subtitle={a.subtitle}
//           />
//         ))}
//       </div>
//     </DashboardSectionCard>
//   );
// }



// app/doctor-dashboard/_components/AlertsCard.tsx
"use client";

import { useEffect, useState } from "react";
import { getAlerts } from "./api";
import { DashboardSectionCard } from "./ui/DashboardSectionCard";
import { AlertItem } from "./Alerts/AlertItem";
import { SkeletonBlock } from "./ui/SkeletonBlock";
import { AlertCircle } from "lucide-react";
import { useDictionary } from "@/i18n/use-dictionary";

export default function AlertsCard() {
  const dict = useDictionary();
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    getAlerts().then((d) => {
      setAlerts(d);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      //   <DashboardSectionCard>
      <SkeletonBlock rows={4} />
      //   </DashboardSectionCard>
    );

  return (
    <DashboardSectionCard className="pb-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle
          size={16}
          strokeWidth={2.5}
          className="text-gray-600"
        />
        <div className="text-sm font-semibold">{dict.dashboard.alerts}</div>
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {alerts.map((a) => (
          <AlertItem
            key={a.id}
            type={a.type}
            title={a.title}
            subtitle={a.subtitle}
          />
        ))}
      </div>
    </DashboardSectionCard>
  );
}


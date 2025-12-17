// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams, useRouter } from "next/navigation";
// // import { AppointmentItem } from "./_component/types/appointment";
// // import { getAppointments } from "./_component/api";
// // import { AppointmentSidebarSkeleton } from "./_component/AppointmentSidebarSkeleton";
// // import { AppointmentSidebar } from "./_component/AppointmentSidebar";
// // import { PageHeader } from "@/components/common/page-header";

// // export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
// //     const router = useRouter();
// //     const params = useParams();
// //     const currentId = params.id as string | undefined;

// //     const [loading, setLoading] = useState(true);
// //     const [data, setData] = useState<AppointmentItem[]>([]);
// //     const [activeId, setActiveId] = useState<string | null>(null);

// //     useEffect(() => {
// //         getAppointments().then((d: any) => {
// //             setData(d);

// //             if (!currentId && d.length) {
// //                 router.replace(`/doctor-dashboard/consultation/${d[0].id}`);
// //             } else {
// //                 setActiveId(currentId || d[0]?.id);
// //             }

// //             setLoading(false);
// //         });
// //     }, [currentId]);

// //     if (loading) {
// //         return (
// //             <div className="flex gap-6">
// //                 <AppointmentSidebarSkeleton />
// //                 <div className="flex-1">{children}</div>
// //             </div>
// //         );
// //     }

// //     const emergency = data.filter((d) => d.type === "emergency");
// //     const vip = data.filter((d) => d.type === "vip");
// //     const general = data.filter((d) => d.type === "general");

// //     return (
// //         <div className="p-1">
// //             <PageHeader title={"Today Appointments"} onBackButton={false} classNameTitle="text-[1rem] font-bold " />
// //             <div className="flex gap-6 w-full py-3">
// //                 {/* Sidebar */}
// //                 <div className="w-[300px] min-w-[300px]">
// //                     <AppointmentSidebar
// //                         emergency={emergency}
// //                         vip={vip}
// //                         general={general}
// //                         activeId={activeId || undefined}
// //                         onSelect={(item) => {
// //                             setActiveId(item.id);
// //                             router.push(`/doctor-dashboard/consultation/${item.id}`);
// //                         }}
// //                     />
// //                 </div>

// //                 {/* Right Content */}
// //                 <div className="flex-1 pr-4">{children}</div>
// //             </div>
// //         </div>
// //     );
// // }


// "use client";

// import { useEffect, useState } from "react";
// import { useParams, usePathname, useRouter } from "next/navigation";
// import { AppointmentItem } from "./_component/types/appointment";
// import { getAppointments } from "./_component/api";
// import { AppointmentSidebarSkeleton } from "./_component/AppointmentSidebarSkeleton";
// import { AppointmentSidebar } from "./_component/AppointmentSidebar";
// import { PageHeader } from "@/components/common/page-header";

// export default function ConsultationLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const params = useParams();
//   const pathname = usePathname();

//   const currentAppointmentId = params.appointmentId as string | undefined;

//   // 🟩 FIX 1: Strongly type all states
//   const [loading, setLoading] = useState<boolean>(true);
//   const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
//   const [activeId, setActiveId] = useState<string | null>(null);

//   // 🟩 FIX 2: Correct sidebar route logic
//   const showSidebar = pathname.split("/").length <= 4;

//   useEffect(() => {
//     getAppointments().then((list: AppointmentItem[]) => {
//       setAppointments(list);

//       if (!currentAppointmentId && list.length > 0) {
//         const firstId = list[0]?.id?.toString();
//         if (firstId) {
//           router.replace(`/doctor/appointment/${firstId}`);
//           setActiveId(firstId);
//         }
//       } else {
//         setActiveId(currentAppointmentId ?? list[0]?.id ?? null);
//       }

//       setLoading(false);
//     });
//   }, [currentAppointmentId, router]);

//   if (loading) {
//     return (
//       <div className="flex gap-6">
//         {showSidebar && <AppointmentSidebarSkeleton />}
//         <div className="flex-1">{children}</div>
//       </div>
//     );
//   }

//   // 🟩 FIX 3: Type-safe filters
//   const emergency = appointments.filter((d) => d.type === "emergency");
//   const vip = appointments.filter((d) => d.type === "vip");
//   const general = appointments.filter((d) => d.type === "general");

//   return (
//     <div className="p-1">
//       {/* Show page header only on main appointment page */}
//       {showSidebar && (
//         <PageHeader
//           title="Today Appointments"
//           onBackButton={false}
//           classNameTitle="text-[1rem] font-bold"
//         />
//       )}

//       <div className="flex gap-6 w-full py-3">
//         {/* LEFT SIDEBAR → Only show when on appointment page */}
//         {showSidebar && (
//           // <div className="w-[300px] min-w-[300px]">
//           <div className="w-[300px] shrink-0">
//             <AppointmentSidebar
//               emergency={emergency}
//               vip={vip}
//               general={general}
//               activeId={activeId ?? undefined}
//               onSelect={(item) => {
//                 setActiveId(item.id.toString());
//                 router.push(`/doctor/appointment/${item.id}`);
//               }}
//             />
//           </div>
//         )}

//         {/* RIGHT CONTENT */}
//         {/* <div className="flex-1 pr-4"> */}
//         <div className="flex-1 min-w-0 pr-4">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { AppointmentSidebar } from "./_component/sidebar/AppointmentSidebar";
import { AppointmentSidebarSkeleton } from "./_component/sidebar/AppointmentSidebarSkeleton";
import { useDoctorVisitsQuery } from "../dashboard/_components/api";

function mapVisitToSidebarItem(visit: any) {
  const fullName =
    `${visit.patient?.first_name || ""} ${visit.patient?.last_name || ""}`.trim();

  return {
    id: visit.id,
    name: fullName,
    mrn: visit.patient?.civil_id || "-",
    time: visit.time_slot || "-",
    type: visit.visit_type || "general",
    avatar: "",                     // ✔ EMPTY STRING
    isVip: visit.visit_type === "vip",
    status: visit.status || "",
  };
}


export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentId = params.appointmentId as string | undefined;
  const showSidebar = pathname.split("/").length <= 4;

  // 3 small queries
  const emergencyQuery = useDoctorVisitsQuery({
    status: "emergency",
    limit: 3,
    page: 1,
  });

  const vipQuery = useDoctorVisitsQuery({
    status: "vip",
    limit: 3,
    page: 1,
  });

  const generalQuery = useDoctorVisitsQuery({
    status: undefined,
    limit: 3,
    page: 1,
  });

  const loading =
    emergencyQuery.isLoading || vipQuery.isLoading || generalQuery.isLoading;

  const emergency = emergencyQuery.data?.data?.map(mapVisitToSidebarItem) ?? [];
  const vip = vipQuery.data?.data?.map(mapVisitToSidebarItem) ?? [];
  const general = generalQuery.data?.data?.map(mapVisitToSidebarItem) ?? [];

  const firstAvailable =
    emergency[0] ?? vip[0] ?? general[0] ?? null;

  // 🔥 MOVE REDIRECT INTO EFFECT — fixes the error
  useEffect(() => {
    if (!loading && !currentId && firstAvailable) {
      router.replace(`/nurse/appointment/${firstAvailable.id}`);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex gap-6 w-full py-3">
        {showSidebar && <AppointmentSidebarSkeleton />}
        <div className="flex-1 min-w-0 pr-4">{children}</div>
      </div>
    );
  }

  return (
    <div className="p-1">
      {showSidebar && (
        <PageHeader
          title="Today Appointments"
          onBackButton={false}
          classNameTitle="text-[1rem] font-bold"
        />
      )}

      <div className="flex gap-6 w-full py-3">
        {/* {showSidebar && (
          <div className="w-[300px] shrink-0 sticky top-4 self-start">
            <AppointmentSidebar
              emergency={emergency}
              vip={vip}
              general={general}
              activeId={currentId ?? undefined}
              onSelect={(item) =>
                router.push(`/nurse/appointment/${item.id}`)
              }
            />
          </div>
        )} */}

        <div className="flex-1 min-w-0 pr-4">{children}</div>
      </div>
    </div>
  );
}

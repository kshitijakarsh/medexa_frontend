// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";
// // import { getAppointments } from "../_component/api";
// // import { AppointmentSidebarSkeleton } from "../_component/AppointmentSidebarSkeleton";
// // import { AppointmentDetailSkeleton } from "../_component/AppointmentDetailSkeleton";
// // import { AppointmentSidebar } from "../_component/AppointmentSidebar";
// // import { AppointmentDetailHeader } from "../_component/AppointmentDetailHeader";
// // import { AppointmentDetailTabs } from "../_component/AppointmentDetailTabs";
// // import { AppointmentDetailContent } from "../_component/AppointmentDetailContent";


// // export default function ConsultationPage() {
// //   const params = useParams();
// //   const consultationId = params.id; // <- dynamic id

// //   const [loading, setLoading] = useState(true);
// //   const [activeTab, setActiveTab] = useState("Visit purpose");
// //   const [selected, setSelected] = useState(null);
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     getAppointments().then((d: any) => {
// //       setData(d);

// //       const selectedFromUrl = d.find((x) => x.id === consultationId);

// //       // if no match, default to first item
// //       setSelected(selectedFromUrl || d[0]);

// //       setLoading(false);
// //     });
// //   }, [consultationId]);

// //   if (loading)
// //     return (
// //       <div className="flex gap-6">
// //         <AppointmentSidebarSkeleton />
// //         <AppointmentDetailSkeleton />
// //       </div>
// //     );

// //   const emergency = data.filter((d) => d.type === "emergency");
// //   const vip = data.filter((d) => d.type === "vip");
// //   const general = data.filter((d) => d.type === "general");

// //   return (
// //     <div className="flex gap-6">

// //       {/* LEFT PANEL */}
// //       <AppointmentSidebar
// //         emergency={emergency}
// //         vip={vip}
// //         general={general}
// //         activeId={selected?.id}
// //         onSelect={(item) => {
// //           setSelected(item);
// //           window.history.pushState({}, "", `/doctor-dashboard/consultation/${item.id}`);
// //         }}
// //       />

// //       {/* CENTER PANEL */}
// //       <div className="flex-1">
// //         <AppointmentDetailHeader item={selected} />
// //         <AppointmentDetailTabs active={activeTab} onChange={setActiveTab} />
// //         <AppointmentDetailContent activeTab={activeTab} />
// //       </div>

// //     </div>
// //   );
// // }



// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// import { getAppointments } from "../_component/api";
// import { AppointmentDetailSkeleton } from "../_component/AppointmentDetailSkeleton";
// import { AppointmentDetailHeader } from "../_component/AppointmentDetailHeader";
// import { AppointmentDetailTabs } from "../_component/AppointmentDetailTabs";
// import { AppointmentDetailContent } from "../_component/AppointmentDetailContent";
// import { AppointmentItem } from "../_component/types/appointment";

// export default function ConsultationDetailPage() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [selected, setSelected] = useState<AppointmentItem | null>(null);
//   const [activeTab, setActiveTab] = useState("Visit purpose");

//   useEffect(() => {
//     getAppointments().then((list: AppointmentItem[]) => {
//       const match = list.find((x) => x.id === id);
//       setSelected(match || null);
//       setLoading(false);
//     });
//   }, [id]);

//   if (loading || !selected) return <AppointmentDetailSkeleton />;

//   return (
//     <>
//       <AppointmentDetailHeader item={selected} />
//       <AppointmentDetailTabs active={activeTab} onChange={setActiveTab} />
//       <AppointmentDetailContent activeTab={activeTab} />
//     </>
//   );
// }


"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getAppointments } from "../_component/api";
import { AppointmentDetailSkeleton } from "../_component/AppointmentDetailSkeleton";
import { AppointmentDetailHeader } from "../_component/AppointmentDetailHeader";
import { AppointmentDetailTabs } from "../_component/AppointmentDetailTabs";
import { AppointmentDetailContent } from "../_component/AppointmentDetailContent";
import { AppointmentItem } from "../_component/types/appointment";

export default function ConsultationDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AppointmentItem | null>(null);
  const [activeTab, setActiveTab] = useState("Visit purpose");

  useEffect(() => {
    getAppointments().then((list: AppointmentItem[]) => {
      const match = list.find((x) => x.id === id);
      setSelected(match || null);
      setLoading(false);
    });
  }, [id]);

  if (loading || !selected) return <AppointmentDetailSkeleton />;

  return (
    <div className="w-full flex flex-col gap-4">
      <AppointmentDetailHeader item={selected} />

      <AppointmentDetailTabs active={activeTab} onChange={setActiveTab} />

      <div className="bg-white rounded-2xl shadow-sm p-4 min-h-[500px]">
        <AppointmentDetailContent activeTab={activeTab} />
      </div>
    </div>
  );
}

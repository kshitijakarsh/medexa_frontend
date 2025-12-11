// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { useParams } from "next/navigation";
// // // import { getAppointments } from "../_component/api";
// // // import { AppointmentSidebarSkeleton } from "../_component/AppointmentSidebarSkeleton";
// // // import { AppointmentDetailSkeleton } from "../_component/AppointmentDetailSkeleton";
// // // import { AppointmentSidebar } from "../_component/AppointmentSidebar";
// // // import { AppointmentDetailHeader } from "../_component/AppointmentDetailHeader";
// // // import { AppointmentDetailTabs } from "../_component/AppointmentDetailTabs";
// // // import { AppointmentDetailContent } from "../_component/AppointmentDetailContent";


// // // export default function ConsultationPage() {
// // //   const params = useParams();
// // //   const consultationId = params.id; // <- dynamic id

// // //   const [loading, setLoading] = useState(true);
// // //   const [activeTab, setActiveTab] = useState("Visit purpose");
// // //   const [selected, setSelected] = useState(null);
// // //   const [data, setData] = useState([]);

// // //   useEffect(() => {
// // //     getAppointments().then((d: any) => {
// // //       setData(d);

// // //       const selectedFromUrl = d.find((x) => x.id === consultationId);

// // //       // if no match, default to first item
// // //       setSelected(selectedFromUrl || d[0]);

// // //       setLoading(false);
// // //     });
// // //   }, [consultationId]);

// // //   if (loading)
// // //     return (
// // //       <div className="flex gap-6">
// // //         <AppointmentSidebarSkeleton />
// // //         <AppointmentDetailSkeleton />
// // //       </div>
// // //     );

// // //   const emergency = data.filter((d) => d.type === "emergency");
// // //   const vip = data.filter((d) => d.type === "vip");
// // //   const general = data.filter((d) => d.type === "general");

// // //   return (
// // //     <div className="flex gap-6">

// // //       {/* LEFT PANEL */}
// // //       <AppointmentSidebar
// // //         emergency={emergency}
// // //         vip={vip}
// // //         general={general}
// // //         activeId={selected?.id}
// // //         onSelect={(item) => {
// // //           setSelected(item);
// // //           window.history.pushState({}, "", `/doctor-dashboard/consultation/${item.id}`);
// // //         }}
// // //       />

// // //       {/* CENTER PANEL */}
// // //       <div className="flex-1">
// // //         <AppointmentDetailHeader item={selected} />
// // //         <AppointmentDetailTabs active={activeTab} onChange={setActiveTab} />
// // //         <AppointmentDetailContent activeTab={activeTab} />
// // //       </div>

// // //     </div>
// // //   );
// // // }



// // "use client";

// // import { useParams } from "next/navigation";
// // import { useEffect, useState } from "react";

// // import { getAppointments } from "../_component/api";
// // import { AppointmentDetailSkeleton } from "../_component/AppointmentDetailSkeleton";
// // import { AppointmentDetailHeader } from "../_component/AppointmentDetailHeader";
// // import { AppointmentDetailTabs } from "../_component/AppointmentDetailTabs";
// // import { AppointmentDetailContent } from "../_component/AppointmentDetailContent";
// // import { AppointmentItem } from "../_component/types/appointment";

// // export default function ConsultationDetailPage() {
// //   const { id } = useParams();
// //   const [loading, setLoading] = useState(true);
// //   const [selected, setSelected] = useState<AppointmentItem | null>(null);
// //   const [activeTab, setActiveTab] = useState("Visit purpose");

// //   useEffect(() => {
// //     getAppointments().then((list: AppointmentItem[]) => {
// //       const match = list.find((x) => x.id === id);
// //       setSelected(match || null);
// //       setLoading(false);
// //     });
// //   }, [id]);

// //   if (loading || !selected) return <AppointmentDetailSkeleton />;

// //   return (
// //     <>
// //       <AppointmentDetailHeader item={selected} />
// //       <AppointmentDetailTabs active={activeTab} onChange={setActiveTab} />
// //       <AppointmentDetailContent activeTab={activeTab} />
// //     </>
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
//     <div className="w-full flex flex-col gap-4">

//       {/* HEADER */}
//       <AppointmentDetailHeader item={selected} />

//       {/* TABS */}
//       <AppointmentDetailTabs active={activeTab} onChange={setActiveTab} />

//       {/* CONTENT */}
//       <AppointmentDetailContent activeTab={activeTab} />
//     </div>
//   );
// }

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { getAppointments } from "../_component/api";
import { AppointmentDetailSkeleton } from "../_component/AppointmentDetailSkeleton";
import { AppointmentDetailHeader } from "../_component/AppointmentDetailHeader";
import { AppointmentDetailTabs } from "../_component/AppointmentDetailTabs";
import { AppointmentDetailContent } from "../_component/AppointmentDetailContent";
import { AppointmentItem } from "../_component/types/appointment";

import { VisitPurposeData } from "../_component/Tabs/visit-purpose/VisitPurpose";

import {
  getVisitPurposeAPI,
  saveVisitPurposeAPI,
  finishConsultationAPI
} from "./api/visitPurposeApi";
import { FloatingSaveBar } from "../_component/FloatingSaveBar";

export default function ConsultationDetailPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AppointmentItem | null>(null);
  const [activeTab, setActiveTab] = useState("Visit purpose");

  // ------------------ Visit Purpose State ------------------
  const [visitPurposeData, setVisitPurposeData] = useState<VisitPurposeData>({
    chiefComplaint: "",
    history: "",
    onset: "",
    duration: "",
    severity: "",
    notes: "",
  });

  const [isVisitPurposeDirty, setVisitPurposeDirty] = useState(false);

  // ------------------ LOAD APPOINTMENT ------------------
  useEffect(() => {
    getAppointments().then((list: AppointmentItem[]) => {
      const match = list.find((x) => x.id === id);
      setSelected(match || null);
      setLoading(false);
    });
  }, [id]);

  // ------------------ LOAD VISIT PURPOSE DATA ------------------
  useEffect(() => {
    if (!id) return;

    async function loadVisitPurpose() {
      // const res = await getVisitPurposeAPI(id as string);
      // if (res) {
      //   setVisitPurposeData({
      //     chiefComplaint: res.chiefComplaint ?? "",
      //     history: res.history ?? "",
      //     onset: res.onset ?? "",
      //     duration: res.duration ?? "",
      //     severity: res.severity ?? "",
      //     notes: res.notes ?? "",
      //   });
      // }
    }

    loadVisitPurpose();
  }, [id]);

  // ------------------ SAVE AS DRAFT ------------------
  const saveDraftMutation = useMutation({
    mutationFn: async () => {
      if (isVisitPurposeDirty) {
        console.log(visitPurposeData)
        // await saveVisitPurposeAPI(id as string, visitPurposeData);
      }
    },
    onSuccess: () => {
      setVisitPurposeDirty(false);
      alert("Draft saved!");
    },
    onError: () => {
      alert("Failed to save draft");
    },
  });

  // ------------------ FINISH CONSULTATION ------------------
  const finishMutation = useMutation({
    mutationFn: async () => {
      // 1. Save all dirty tabs (Visit Purpose for now)
      if (isVisitPurposeDirty) {
        // await saveVisitPurposeAPI(id as string, visitPurposeData);
      }

      // 2. Mark consultation as complete
      // await finishConsultationAPI(id as string);
    },
    onSuccess: () => {
      alert("Consultation Finished Successfully!");
    },
    onError: () => {
      alert("Failed to finish consultation");
    },
  });

  if (loading || !selected) return <AppointmentDetailSkeleton />;

  const injectedProps = {
    visitPurposeData,
    setVisitPurposeData,
    setVisitPurposeDirty,
  };

  return (
    <div className="w-full flex flex-col gap-4">

      {/* HEADER */}
      <AppointmentDetailHeader
        item={selected}
        onSaveDraft={() => saveDraftMutation.mutate()}
        onFinish={() => finishMutation.mutate()}
        saving={saveDraftMutation.isLoading}
        finishing={finishMutation.isLoading}
      />

      {/* TABS */}
      <AppointmentDetailTabs
        active={activeTab}
        onChange={setActiveTab}
        injectedProps={injectedProps}
      />

      {/* CONTENT */}
      <AppointmentDetailContent
        activeTab={activeTab}
        injectedProps={injectedProps}
      />

      {/* FLOATING SAVE BAR */}
      <FloatingSaveBar
        saving={saveDraftMutation.isLoading}
        finishing={finishMutation.isLoading}
        onSaveDraft={() => saveDraftMutation.mutate()}
        onFinish={() => finishMutation.mutate()}
      />
    </div>
  );
}

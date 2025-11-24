// // // app/doctor-dashboard/view-all/page.tsx
// // "use client";

// // import { useEffect, useState } from "react";

// // import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
// // import { getAppointments } from "./_components/api";
// // import AppointmentGrid from "./_components/AppointmentGrid";

// // const tabs = [
// //   { key: "all", label: "All" },
// //   { key: "emergency", label: "Emergency Appointments" },
// //   { key: "vip", label: "VIP Appointments" },
// //   { key: "follow", label: "Follow Up" },
// //   { key: "standard", label: "Standard Appointments" },
// // ];

// // export default function ViewAllAppointmentsPage() {
// //   const [loading, setLoading] = useState(true);
// //   const [rows, setRows] = useState<any[]>([]);
// //   const [activeTab, setActiveTab] = useState<string>("all");

// //   useEffect(() => {
// //     setLoading(true);
// //     getAppointments().then((d) => {
// //       setRows(d);
// //       setLoading(false);
// //     });
// //   }, []);

// //   const filtered =
// //     activeTab === "all"
// //       ? rows
// //       : activeTab === "emergency"
// //       ? rows.filter((r) => r.type?.toLowerCase().includes("emergency"))
// //       : activeTab === "vip"
// //       ? rows.filter((r) => r.type?.toLowerCase().includes("vip"))
// //       : activeTab === "follow"
// //       ? rows.filter((r) => r.type?.toLowerCase().includes("follow"))
// //       : rows.filter((r) => r.type?.toLowerCase().includes("standard"));

// //   return (
// //     <div className="min-h-screen p-6 ">
// //       <div className="w-full mx-auto">
// //         <div className="mb-6">
// //           <DynamicTabs
// //             tabs={tabs}
// //             defaultTab="all"
// //             onChange={(k) => setActiveTab(k)}
// //           />
// //         </div>

// //         <AppointmentGrid items={filtered} loading={loading} />
// //       </div>
// //     </div>
// //   );
// // }


// // app/doctor-dashboard/view-all/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
// import { getAppointments } from "./_components/api";
// import AppointmentGrid from "./_components/AppointmentGrid";

// const tabs = [
//   { key: "all", label: "All" },
//   { key: "emergency", label: "Emergency Appointments" },
//   { key: "vip", label: "VIP Appointments" },
//   { key: "follow", label: "Follow Up" },
//   { key: "standard", label: "Standard Appointments" },
// ];

// export default function ViewAllAppointmentsPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const initialTab = searchParams.get("tab") || "all";

//   const [activeTab, setActiveTab] = useState<string>(initialTab);
//   const [loading, setLoading] = useState(true);
//   const [rows, setRows] = useState<any[]>([]);

//   useEffect(() => {
//     setLoading(true);
//     getAppointments().then((d) => {
//       setRows(d);
//       setLoading(false);
//     });
//   }, []);

//   const filtered =
//     activeTab === "all"
//       ? rows
//       : rows.filter((r) =>
//           r.type?.toLowerCase().includes(activeTab.toLowerCase())
//         );

//   return (
//     <div className="min-h-screen p-6">
//       <div className="w-full mx-auto">
//         <div className="mb-6">
//           <DynamicTabs
//             tabs={tabs}
//             defaultTab={initialTab}
//             onChange={(k) => {
//               setActiveTab(k);
//               router.replace(`?tab=${k}`); // ← updates URL query
//             }}
//           />
//         </div>

//         <AppointmentGrid items={filtered} loading={loading} />
//       </div>
//     </div>
//   );
// }


// app/doctor-dashboard/view-all/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { getAppointments } from "./_components/api";
import AppointmentGrid from "./_components/AppointmentGrid";
import { DOCTOR_DEFAULT_TAB, DoctorTabKeys, DoctorTabs } from "@/lib/routes";

// Extract list of allowed tab keys for validation
// const allowedTabKeys = DoctorTabs.map((t) => t.key);

export default function ViewAllAppointmentsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  let initialTab = searchParams.get("tab") || "all";

  // ❗ Validate query param → Fix invalid tabs
  if (!DoctorTabKeys.includes(initialTab)) {
    router.replace(`?tab=${DOCTOR_DEFAULT_TAB}`);
    initialTab = DOCTOR_DEFAULT_TAB;
  }

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);

  // Fetch once
  useEffect(() => {
    setLoading(true);
    getAppointments().then((d) => {
      setRows(d);
      setLoading(false);
    });
  }, []);

  // Handle tab change (with loading)
  const handleTabChange = (k: string) => {
    setLoading(true); // ← start loader immediately
    setActiveTab(k);
    router.replace(`?tab=${k}`);

    // Optional: small delay to show loading UX
    setTimeout(() => {
      setLoading(false);
    }, 300); // You can increase/decrease this
  };

  // Filtered list (memoized)
  const filtered = useMemo(() => {
    if (activeTab === DOCTOR_DEFAULT_TAB) return rows;
    return rows.filter((r) =>
      r.type?.toLowerCase().includes(activeTab.toLowerCase())
    );
  }, [activeTab, rows]);

  return (
    <div className="min-h-screen p-6">
      <div className="w-full mx-auto">

        {/* Tabs */}
        <div className="mb-6">
          <DynamicTabs
            tabs={DoctorTabs}
            defaultTab={initialTab}
            onChange={handleTabChange}
          />
        </div>

        {/* Grid with loading */}
        <AppointmentGrid items={filtered} loading={loading} />
      </div>
    </div>
  );
}

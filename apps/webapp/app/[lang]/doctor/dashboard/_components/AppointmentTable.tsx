// // // // // "use client";

// // // // // import useSWR from "swr";
// // // // // import Image from "next/image";
// // // // // import { doctorFetch } from "@/app/api/doctor/fetcher";
// // // // // import { Skeleton } from "@/components/ui/skeleton";

// // // // // export default function AppointmentTable() {
// // // // //   const { data, isLoading } = useSWR("/api/doctor/appointments", doctorFetch);

// // // // //   if (isLoading) return <Skeleton className="h-64 w-full rounded-lg" />;

// // // // //   return (
// // // // //     <div className="bg-white p-4 rounded-lg shadow border">
// // // // //       <table className="w-full text-sm">
// // // // //         <thead>
// // // // //           <tr className="text-gray-600 border-b">
// // // // //             <th className="py-2 text-left">Token</th>
// // // // //             <th className="text-left">Patient</th>
// // // // //             <th className="text-left">Time</th>
// // // // //             <th className="text-left">Diagnosis</th>
// // // // //             <th className="text-left">Type</th>
// // // // //             <th className="text-left">Status</th>
// // // // //           </tr>
// // // // //         </thead>
// // // // //         <tbody>
// // // // //           {data.map((item: any) => (
// // // // //             <tr key={item.id} className="border-b">
// // // // //               <td className="py-3">{item.token}</td>

// // // // //               <td className="flex items-center gap-2">
// // // // //                 <Image
// // // // //                   src={item.image}
// // // // //                   width={35}
// // // // //                   height={35}
// // // // //                   className="rounded-full"
// // // // //                   alt=""
// // // // //                 />
// // // // //                 <div>
// // // // //                   <p className="font-semibold">{item.patient}</p>
// // // // //                   <p className="text-xs text-gray-500">MRN-{item.mrn}</p>
// // // // //                 </div>
// // // // //               </td>

// // // // //               <td>{item.time}</td>
// // // // //               <td>{item.diagnosis}</td>
// // // // //               <td>{item.type}</td>

// // // // //               <td>
// // // // //                 <span
// // // // //                   className={`px-2 py-1 text-xs rounded-full ${
// // // // //                     item.status === "In Consultation"
// // // // //                       ? "bg-blue-100 text-blue-600"
// // // // //                       : "bg-orange-100 text-orange-600"
// // // // //                   }`}
// // // // //                 >
// // // // //                   {item.status}
// // // // //                 </span>
// // // // //               </td>
// // // // //             </tr>
// // // // //           ))}
// // // // //         </tbody>
// // // // //       </table>
// // // // //     </div>
// // // // //   );
// // // // // }




// // // // "use client";

// // // // import { useEffect, useState } from "react";
// // // // import {
// // // //   Table,
// // // //   TableBody,
// // // //   TableCell,
// // // //   TableHead,
// // // //   TableHeader,
// // // //   TableRow,
// // // // } from "@workspace/ui/components/table";
// // // // import Image from "next/image";
// // // // import { StatusPill } from "./ui/StatusPill";
// // // // import { SkeletonBlock } from "./ui/SkeletonBlock";
// // // // import { getAppointments } from "./api";

// // // // export default function AppointmentTable() {
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [appointments, setAppointments] = useState([]);

// // // //   useEffect(() => {
// // // //     getAppointments().then((res) => {
// // // //       setAppointments(res);
// // // //       setLoading(false);
// // // //     });
// // // //   }, []);

// // // //   if (loading) return <SkeletonBlock rows={10} />;

// // // //   return (
// // // //     <div className="bg-white p-4 rounded-xl shadow-sm border mt-6">
// // // //       <div className="flex justify-between mb-4">
// // // //         <div className="flex gap-4">
// // // //           <button className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm">
// // // //             All Appointments
// // // //           </button>
// // // //           <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm">
// // // //             VIP Patients
// // // //           </button>
// // // //           <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm">
// // // //             Follow-Up Patients
// // // //           </button>
// // // //         </div>

// // // //         <button className="text-blue-600 text-sm">View All</button>
// // // //       </div>

// // // //       <Table>
// // // //         <TableHeader>
// // // //           <TableRow className="text-gray-600 text-sm">
// // // //             <TableHead>Token</TableHead>
// // // //             <TableHead>Patient</TableHead>
// // // //             <TableHead>Time</TableHead>
// // // //             <TableHead>Diagnosis</TableHead>
// // // //             <TableHead>Types</TableHead>
// // // //             <TableHead>Status</TableHead>
// // // //           </TableRow>
// // // //         </TableHeader>

// // // //         <TableBody>
// // // //           {appointments.map((p: any) => (
// // // //             <TableRow key={p.id}>
// // // //               <TableCell>{p.token}</TableCell>

// // // //               <TableCell>
// // // //                 <div className="flex items-center gap-2">
// // // //                   <Image
// // // //                     src={p.avatar}
// // // //                     width={35}
// // // //                     height={35}
// // // //                     className="rounded-full"
// // // //                     alt=""
// // // //                   />
// // // //                   <div>
// // // //                     <p className="font-medium">{p.name}</p>
// // // //                     <p className="text-xs text-gray-500">MRN-{p.mrn}</p>
// // // //                   </div>
// // // //                 </div>
// // // //               </TableCell>

// // // //               <TableCell>{p.time}</TableCell>
// // // //               <TableCell>{p.diagnosis}</TableCell>
// // // //               <TableCell>{p.type}</TableCell>
// // // //               <TableCell><StatusPill status={p.status} /></TableCell>
// // // //             </TableRow>
// // // //           ))}
// // // //         </TableBody>
// // // //       </Table>
// // // //     </div>
// // // //   );
// // // // }



// // // // app/doctor-dashboard/components/AppointmentTable.tsx
// // // "use client";
// // // import { useEffect, useState } from "react";
// // // import Image from "next/image";
// // // import {
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableHead,
// // //   TableHeader,
// // //   TableRow
// // // } from "@workspace/ui/components/table";
// // // import { getAppointments } from "./api";
// // // import { SkeletonBlock } from "./ui/SkeletonBlock";
// // // import { StatusPill } from "./ui/StatusPill";

// // // export default function AppointmentTable() {
// // //   const [loading, setLoading] = useState(true);
// // //   const [rows, setRows] = useState<any[]>([]);
// // //   useEffect(() => { getAppointments().then(d => { setRows(d); setLoading(false); }); }, []);

// // //   if (loading) return <SkeletonBlock rows={8} wide />;

// // //   return (
// // //     <div className="bg-white p-4 rounded-b-xl rounded-t-lg shadow-sm border mt-6 overflow-hidden">
// // //       <div className="flex justify-between items-center mb-4">
// // //         <div className="flex gap-3">
// // //           <button className="px-4 py-2 rounded-full bg-[#0B84FF] text-white text-sm">All Appointments</button>
// // //           <button className="px-4 py-2 rounded-full bg-[#F1F6FB] text-[#5D7287] text-sm">VIP Patients</button>
// // //           <button className="px-4 py-2 rounded-full bg-[#F1F6FB] text-[#5D7287] text-sm">Follow Up Patients</button>
// // //         </div>
// // //         <div className="text-sm text-[#0B84FF]">View All</div>
// // //       </div>

// // //       <Table>
// // //         <TableHeader>
// // //           <TableRow className="text-gray-500">
// // //             <TableHead>Token</TableHead>
// // //             <TableHead>Patient</TableHead>
// // //             <TableHead>Time</TableHead>
// // //             <TableHead>Diagnosis</TableHead>
// // //             <TableHead>Types</TableHead>
// // //             <TableHead>Status</TableHead>
// // //           </TableRow>
// // //         </TableHeader>

// // //         <TableBody>
// // //           {rows.map((r, idx) => (
// // //             <TableRow key={r.id} className={idx % 2 === 0 ? "bg-[#F6FBFF]" : ""}>
// // //               <TableCell className="py-4">{r.token}</TableCell>
// // //               <TableCell>
// // //                 <div className="flex items-center gap-3">
// // //                   <Image src={r.avatar} width={36} height={36} className="rounded-full ring-2 ring-[#E6F3FF]" alt="" />
// // //                   <div>
// // //                     <div className="font-medium">{r.name}</div>
// // //                     <div className="text-xs text-gray-400">{r.mrn}</div>
// // //                   </div>
// // //                 </div>
// // //               </TableCell>
// // //               <TableCell>{r.time}</TableCell>
// // //               <TableCell>{r.diagnosis}</TableCell>
// // //               <TableCell>{r.type}</TableCell>
// // //               <TableCell><StatusPill status={r.status} /></TableCell>
// // //             </TableRow>
// // //           ))}
// // //         </TableBody>
// // //       </Table>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useEffect, useState } from "react";
// // import { getAppointments } from "./api";
// // import { AppointmentTableRow } from "./Appointment/AppointmentTableRow";
// // import { AppointmentTableSkeleton } from "./Appointment/AppointmentTableSkeleton";

// // type TabType = "all" | "vip" | "follow";

// // export default function AppointmentTable() {
// //   const [loading, setLoading] = useState(true);
// //   const [rows, setRows] = useState<any[]>([]);
// //   const [activeTab, setActiveTab] = useState<TabType>("all");

// //   useEffect(() => {
// //     getAppointments().then((d) => {
// //       setRows(d);
// //       setLoading(false);
// //     });
// //   }, []);

// //   if (loading) return <AppointmentTableSkeleton />;

// //   // FILTERED DATA
// //   const filteredRows =
// //     activeTab === "all"
// //       ? rows
// //       : activeTab === "vip"
// //       ? rows.filter((r) => r.type.toLowerCase().includes("vip"))
// //       : rows.filter((r) => r.type.toLowerCase().includes("follow"));

// //   // ACTIVE TAB BUTTON CLASS
// //   const activeBtn =
// //     "px-4 py-2 rounded-full bg-[#0B84FF] text-white text-sm transition";
// //   const inactiveBtn =
// //     "px-4 py-2 rounded-full bg-[#F1F6FB] text-[#5D7287] text-sm hover:bg-[#e6eef6] transition";

// //   return (
// //     <div className="bg-white p-4 rounded-b-xl rounded-t-lg shadow-sm border mt-6 overflow-hidden">
// //       {/* Header Buttons */}
// //       <div className="flex justify-between items-center mb-4">
// //         <div className="flex gap-3">
// //           <button
// //             className={activeTab === "all" ? activeBtn : inactiveBtn}
// //             onClick={() => setActiveTab("all")}
// //           >
// //             All Appointments
// //           </button>

// //           <button
// //             className={activeTab === "vip" ? activeBtn : inactiveBtn}
// //             onClick={() => setActiveTab("vip")}
// //           >
// //             VIP Patients
// //           </button>

// //           <button
// //             className={activeTab === "follow" ? activeBtn : inactiveBtn}
// //             onClick={() => setActiveTab("follow")}
// //           >
// //             Follow Up Patients
// //           </button>
// //         </div>

// //         <div className="text-sm text-[#0B84FF] cursor-pointer">View All</div>
// //       </div>

// //       {/* Table */}
// //       <table className="w-full text-sm">
// //         <thead className="text-gray-500">
// //           <tr>
// //             <th className="text-left py-2">Token</th>
// //             <th className="text-left py-2">Patient</th>
// //             <th className="text-left py-2">Time</th>
// //             <th className="text-left py-2">Diagnosis</th>
// //             <th className="text-left py-2">Types</th>
// //             <th className="text-left py-2">Status</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {filteredRows.length === 0 ? (
// //             <tr>
// //               <td colSpan={6} className="py-6 text-center text-gray-400">
// //                 No records found.
// //               </td>
// //             </tr>
// //           ) : (
// //             filteredRows.map((r, idx) => (
// //               <AppointmentTableRow key={r.id} r={r} idx={idx} />
// //             ))
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }



// "use client";

// import { useEffect, useState } from "react";
// import { getAppointments } from "./api";
// import { AppointmentTableRow } from "./Appointment/AppointmentTableRow";
// import { AppointmentTableSkeleton } from "./Appointment/AppointmentTableSkeleton";
// import { DynamicTabs } from "./ui/DynamicTabs";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@workspace/ui/components/table";
// import { DashboardSectionCard } from "./ui/DashboardSectionCard";
// import { ViewAllLink } from "./ui/ViewAllLink";
// import { buildUrl, DOCTOR_DEFAULT_TAB, DoctorHomeTabKeys, DoctorHomeTabs, ROUTES } from "@/lib/routes";

// export default function AppointmentTable() {
//     const [loading, setLoading] = useState(true);
//     const [rows, setRows] = useState<any[]>([]);
//     const [activeTab, setActiveTab] = useState(DOCTOR_DEFAULT_TAB);

//     useEffect(() => {
//         getAppointments().then((d) => {
//             setRows(d);
//             setLoading(false);
//         });
//     }, []);

//     if (loading) return <AppointmentTableSkeleton />;

//     // dynamic filtering
//     const filteredRows =
//         activeTab === DOCTOR_DEFAULT_TAB
//             ? rows
//             : activeTab === DoctorHomeTabKeys[1]
//                 ? rows.filter((r) => r.type.toLowerCase().includes(DoctorHomeTabKeys[1]))
//                 : rows.filter((r) => r.type.toLowerCase().includes(DoctorHomeTabKeys[2]));

//     return (
//         // <div className="bg-white p-4 rounded-xl shadow-sm border ">
//         <DashboardSectionCard className="mt-6">

//             {/* Header Tabs */}
//             <div className="flex justify-between items-center mb-4">
//                 <DynamicTabs
//                     // tabs={[
//                     //     { key: "all", label: "All Appointments" },
//                     //     { key: "vip", label: "VIP Patients" },
//                     //     { key: "follow", label: "Follow Up Patients" },
//                     // ]}
//                     tabs={DoctorHomeTabs}
//                     defaultTab={DOCTOR_DEFAULT_TAB}
//                     onChange={(key) => setActiveTab(key)}
//                 />

//                 {/* <div className="text-sm text-[#0B84FF] cursor-pointer">
//                     View All
//                 </div> */}
//                 {/* <ViewAllLink href="/doctor-dashboard/emergency-patients" /> */}
//                 <ViewAllLink href={buildUrl(ROUTES.DOCTOR_VIEW_ALL, { tab: activeTab })} />

//             </div>

//             {/* Table */}
//             <Table>
//                 <TableHeader>
//                     <TableRow className="text-gray-500">
//                         <TableHead>Token</TableHead>
//                         <TableHead>Patient</TableHead>
//                         <TableHead>Time</TableHead>
//                         <TableHead>Diagnosis</TableHead>
//                         <TableHead>Types</TableHead>
//                         <TableHead>Status</TableHead>
//                     </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                     {filteredRows.map((r, idx) => (
//                         <AppointmentTableRow key={r.id} r={r} idx={idx} />
//                     ))}
//                 </TableBody>
//             </Table>
//         </DashboardSectionCard>
//     );
// }



"use client";

import { DynamicTabs } from "./ui/DynamicTabs";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table";
import { DashboardSectionCard } from "./ui/DashboardSectionCard";
import { ViewAllLink } from "./ui/ViewAllLink";
import {
    buildUrl,
    DOCTOR_DEFAULT_TAB,
    DoctorHomeTabs,
    ROUTES,
} from "@/lib/routes";

import { AppointmentTableRow } from "./Appointment/AppointmentTableRow";
import { AppointmentTableSkeleton } from "./Appointment/AppointmentTableSkeleton";
import { useDoctorVisitsQuery } from "./api";

import { useState } from "react";

export default function AppointmentTable() {
    const [activeTab, setActiveTab] = useState(DOCTOR_DEFAULT_TAB);

    // Map active tab to status
    const status =
        activeTab === "all" ? undefined : activeTab; // vip / followup

    const { data, isLoading } = useDoctorVisitsQuery({
        status,
        limit: 10,
        page: 1,
    });

    const rows = data?.data ?? [];
    const hasItems = rows.length > 0;

    return (
        <DashboardSectionCard className="mt-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <DynamicTabs
                    tabs={DoctorHomeTabs}
                    defaultTab={DOCTOR_DEFAULT_TAB}
                    onChange={(key) => setActiveTab(key)}
                />

                {/* Disable View All if empty */}
                <ViewAllLink
                    href={buildUrl(ROUTES.DOCTOR_VIEW_ALL, { tab: activeTab })}
                    disabled={!hasItems}
                />
            </div>

            {/* Loading */}
            {isLoading && <AppointmentTableSkeleton />}

            {/* Empty State */}
            {!isLoading && !hasItems && (
                <div className="text-gray-500 p-6 text-center">
                    No appointments found.
                </div>
            )}

            {/* Table */}
            {!isLoading && hasItems && (
                <Table>
                    <TableHeader>
                        <TableRow className="text-gray-500">
                            <TableHead>Token</TableHead>
                            <TableHead>Patient</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Diagnosis</TableHead>
                            <TableHead>Types</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {/* {rows.map((visit, idx) => (
              <AppointmentTableRow key={visit.id} r={visit} idx={idx} />
            ))} */}
                        {rows.map((visit, idx) => {
                            const fullName = `${visit.patient.first_name} ${visit.patient.last_name}`;

                            return (
                                <AppointmentTableRow
                                    key={visit.id}
                                    r={{
                                        token: visit.id,
                                        name: fullName,
                                        mrn: visit.patient.civil_id,
                                        avatar: null, // or visit.patient.avatar if available
                                        time: visit.time_slot,
                                        diagnosis: visit.department?.department_name || "-",
                                        type: visit.visit_type,
                                        status: visit.status,
                                    }}
                                    idx={idx}
                                />
                            );
                        })}

                    </TableBody>
                </Table>
            )}
        </DashboardSectionCard>
    );
}

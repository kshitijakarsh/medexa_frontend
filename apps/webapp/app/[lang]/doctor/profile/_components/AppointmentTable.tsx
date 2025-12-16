// "use client";

// import { DataTable } from "@/components/common/data-table";
// import { appointments } from "./appointments";

// export function AppointmentTable({ activeTab }: { activeTab: string }) {
//   const filtered =
//     activeTab === "all"
//       ? appointments
//       : activeTab === "new"
//       ? appointments.filter((i) => i.type === "New")
//       : appointments.filter((i) => i.type === "Follow Up");

//   const columns = [
//     {
//       key: "token",
//       label: "Token",
//       render: (row: any) => <span className="font-medium">{row.token}</span>,
//     },
//     {
//       key: "patient",
//       label: "Patient",
//       render: (row: any) => (
//         <div className="flex items-center gap-2">
//           <img
//             src={row.avatar}
//             className="w-8 h-8 rounded-full object-cover"
//             alt=""
//           />
//           <div>
//             <div className="font-medium">{row.patient}</div>
//             <div className="text-xs text-gray-400">{row.mrn}</div>
//           </div>
//         </div>
//       ),
//     },
//     { key: "mrn", label: "MRN" },
//     { key: "date", label: "Date" },
//     { key: "diagnosis", label: "Diagnosis" },
//     { key: "type", label: "Type" },
//     {
//       key: "status",
//       label: "Status",
//       render: (row: any) => (
//         <span
//           className={`px-3 py-1 text-xs rounded-full ${
//             row.status === "Completed"
//               ? "bg-green-100 text-green-700"
//               : "bg-blue-100 text-blue-700"
//           }`}
//         >
//           {row.status}
//         </span>
//       ),
//     },
//   ];

//   return (
//     <DataTable
//       title=""
//       columns={columns}
//       data={filtered}
//       striped
//     />
//   );
// }



"use client";

import { DataTable } from "@/components/common/data-table";
import { useDoctorVisitsQuery } from "../../dashboard/_components/api";
import { StatusPill } from "@/components/common/pasient-card/status-pill";
import { TypeBadge } from "@/components/common/pasient-card/type-badge";
import { PatientCell } from "../../dashboard/_components/Appointment/PatientCell";

export function AppointmentTable({ activeTab }: { activeTab: string }) {
  // Map tab → API status
  const status = activeTab === "all" ? undefined : activeTab;

  const { data, isLoading } = useDoctorVisitsQuery({
    status,
    limit: 10,
    page: 1,
  });

  const rows = data?.data ?? [];

  const columns = [
    {
      key: "token",
      label: "Token",
      render: (row: any) => (
        <span className="font-medium">{row.id}</span>
      ),
    },
    {
      key: "patient",
      label: "Patient",
      render: (row: any) => {
        const patient = row.patient;
        const fullName = `${patient.first_name} ${patient.last_name}`;

        return (
          // <div className="flex items-center gap-2">
          //   <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
          //     {patient.first_name?.[0]}
          //     {patient.last_name?.[0]}
          //   </div>

          //   <div>
          //     <div className="font-medium">{fullName}</div>
          //     <div className="text-xs text-gray-400">
          //       {patient.civil_id}
          //     </div>
          //   </div>
          // </div>
          <PatientCell name={fullName} mrn={row.patient.civil_id} avatar={row.avatar} />

        );
      },
    },
    {
      key: "date",
      label: "Date",
      render: (row: any) => row.visit_date || "-",
    },
    {
      key: "diagnosis",
      label: "Diagnosis",
      render: (row: any) =>
        row.department?.department_name || "-",
    },
    {
      key: "type",
      label: "Type",
      render: (row: any) => <TypeBadge type={row.visit_type} />
    },
    {
      key: "status",
      label: "Status",
      render: (row: any) => (
        // <span
        //   className={`px-3 py-1 text-xs rounded-full ${
        //     row.status === "completed"
        //       ? "bg-green-100 text-green-700"
        //       : "bg-blue-100 text-blue-700"
        //   }`}
        // >
        //   {row.status}
        // </span>
        <StatusPill status={row.status} />
      ),
    },
  ];

  /* 🔄 Loading */
  // if (isLoading) {
  //   return (
  //     <div className="p-6 text-sm text-gray-500">
  //       Loading appointments…
  //     </div>
  //   );
  // }

  /* 📭 Empty */
  if (!rows.length && !isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        No appointments found.
      </div>
    );
  }

  return (
    <DataTable
      title=""
      columns={columns}
      data={rows}
      striped
      loading={isLoading}
    />
  );
}


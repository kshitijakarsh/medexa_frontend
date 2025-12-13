"use client";

import { DataTable } from "@/components/common/data-table";
import { appointments } from "./appointments";

export function AppointmentTable({ activeTab }: { activeTab: string }) {
  const filtered =
    activeTab === "all"
      ? appointments
      : activeTab === "new"
      ? appointments.filter((i) => i.type === "New")
      : appointments.filter((i) => i.type === "Follow Up");

  const columns = [
    {
      key: "token",
      label: "Token",
      render: (row: any) => <span className="font-medium">{row.token}</span>,
    },
    {
      key: "patient",
      label: "Patient",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <img
            src={row.avatar}
            className="w-8 h-8 rounded-full object-cover"
            alt=""
          />
          <div>
            <div className="font-medium">{row.patient}</div>
            <div className="text-xs text-gray-400">{row.mrn}</div>
          </div>
        </div>
      ),
    },
    { key: "mrn", label: "MRN" },
    { key: "date", label: "Date" },
    { key: "diagnosis", label: "Diagnosis" },
    { key: "type", label: "Type" },
    {
      key: "status",
      label: "Status",
      render: (row: any) => (
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            row.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      title=""
      columns={columns}
      data={filtered}
      striped
    />
  );
}

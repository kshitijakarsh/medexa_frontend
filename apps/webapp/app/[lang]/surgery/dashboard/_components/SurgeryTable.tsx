"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { createSurgeryApiClient, Surgery } from "@/lib/api/surgery/surgeries";
import { SurgeryStatus } from "../../lib/types";
import { ResponsiveDataTable, type Column } from "@/components/common/data-table/ResponsiveDataTable";
import { MoreVertical } from "lucide-react";
import Image from "next/image";

import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { VipCrownBadge } from "@/components/common/pasient-card/vip-crown-badge";
import { Button } from "@workspace/ui/components/button";

// Table row interface for display
interface SurgeryRow {
  id: string;
  otRoom: string;
  patient: {
    id: string;
    name: string;
    mrn: string;
    avatarUrl?: string;
  };
  time: string;
  procedure: string;
  surgeon: string;
  specialty: string;
  status: SurgeryStatus;
}

const SurgeryTable: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("Surgeries");

  // API Client
  const surgeryApi = createSurgeryApiClient({});

  // Fetch surgeries with React Query
  const {
    data: surgeriesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["surgeries", activeTab],
    queryFn: async () => {
      const statusFilter = activeTab === "Ongoing"
        ? "in_progress"
        : activeTab === "Upcoming"
          ? "scheduled"
          : undefined;
      const response = await surgeryApi.getAll({ status: statusFilter });
      console.log("Surgeries API Response:", response.data);
      return response.data;
    },
  });

  // Extract surgeries from response
  const extractSurgeries = (): Surgery[] => {
    if (!surgeriesData) return [];
    if (Array.isArray(surgeriesData)) return surgeriesData;
    if (Array.isArray(surgeriesData.data)) return surgeriesData.data;
    return [];
  };

  // Map API data to table rows
  const tableData: SurgeryRow[] = extractSurgeries().map((surgery: Surgery) => ({
    id: surgery.id,
    otRoom: (surgery as any).ot_room || "OT-1",
    patient: {
      id: surgery.patient?.id || surgery.patient_id || "",
      name: surgery.patient
        ? `${surgery.patient.first_name} ${surgery.patient.last_name}`
        : "Unknown Patient",
      mrn: (surgery as any).patient?.mrn || "MRN-0000",
      avatarUrl: (surgery as any).patient?.photo_url || "/images/avatars/1.png",
    },
    time: surgery.scheduled_date
      ? new Date(surgery.scheduled_date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      })
      : "—",
    procedure: surgery.surgery_type || "—",
    surgeon: surgery.doctor
      ? `Dr. ${surgery.doctor.first_name} ${surgery.doctor.last_name}`
      : "Not Assigned",
    specialty: surgery.department || "General",
    status: mapStatus(surgery.status),
  }));

  // Map API status to SurgeryStatus enum
  function mapStatus(status?: string): SurgeryStatus {
    switch (status?.toLowerCase()) {
      case "in_progress":
      case "in progress":
        return SurgeryStatus.IN_PROGRESS;
      case "pre_op":
      case "pre-op":
        return SurgeryStatus.PRE_OP;
      case "scheduled":
        return SurgeryStatus.SCHEDULED;
      default:
        return SurgeryStatus.SCHEDULED;
    }
  }

  const getStatusStyle = (status: SurgeryStatus) => {
    switch (status) {
      case SurgeryStatus.IN_PROGRESS:
        return "bg-orange-50 text-orange-600 border-orange-200";
      case SurgeryStatus.PRE_OP:
        return "bg-blue-50 text-blue-600 border-blue-200";
      case SurgeryStatus.SCHEDULED:
        return "bg-indigo-50 text-indigo-600 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-500 border-border-light";
    }
  };

  const columns: Column<SurgeryRow>[] = [
    {
      key: "otRoom",
      label: "OT Room",
    },
    {
      key: "patient",
      label: "Patient",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="relative">
            <Image
              src={row.patient.avatarUrl || '/images/avatars/1.png'}
              alt={row.patient.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <VipCrownBadge size={10} className="absolute -top-2 -right-1" />
          </div>

          <div>
            <div className="text-sm font-medium text-gray-900">
              {row.patient.name}
            </div>
            <div className="text-xs text-gray-500">
              {row.patient.mrn}{" "}
              <span className="text-blue-500">{row.patient.id}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "time",
      label: "Time",
    },
    {
      key: "procedure",
      label: "Procedure",
    },
    {
      key: "surgeon",
      label: "Surgeon",
      render: (row) => (
        <>
          <div className="text-sm font-medium text-gray-900">
            {row.surgeon}
          </div>
          <div className="text-xs text-gray-500">{row.specialty}</div>
        </>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`rounded-full border px-4 py-1 text-xs font-medium ${getStatusStyle(
            row.status
          )}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      className: "text-right",
      render: () => (
        <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
          <MoreVertical size={16} />
        </button>
      ),
    },
  ];

  return (
    <div className="mb-8 overflow-hidden rounded-3xl bg-background shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-light px-2 py-5">
        <div className="flex gap-2 rounded-2xl py-1.5">
          <DynamicTabs
            tabs={[
              { key: "Surgeries", label: "Surgeries" },
              { key: "Ongoing", label: "Ongoing" },
              { key: "Upcoming", label: "Upcoming" },
            ]}
            defaultTab={activeTab}
            onChange={(v) => setActiveTab(v)}
            variant="scroll"
          />
        </div>

        <Button variant="link" className="text-blue-500 text-sm">Advanced Filters</Button>
      </div>

      {error ? (
        <div className="p-8 text-center text-red-500">
          Failed to load surgeries. Please try again.
        </div>
      ) : (
        <ResponsiveDataTable
          columns={columns}
          data={tableData}
          striped
          loading={isLoading}
        />
      )}
    </div>
  );
};

export default SurgeryTable;

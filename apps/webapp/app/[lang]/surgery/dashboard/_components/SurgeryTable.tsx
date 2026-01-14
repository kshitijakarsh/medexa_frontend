"use client";

import React from "react";
import { Surgery } from "@/lib/api/surgery/surgeries";
import { useSurgeries } from "@/app/[lang]/surgery/_hooks/useSurgery";
import { useDictionary } from "@/i18n/use-dictionary";
import { ResponsiveDataTable, type Column } from "@/components/common/data-table/ResponsiveDataTable";
import Image from "next/image";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { VipCrownBadge } from "@/components/common/pasient-card/vip-crown-badge";
import { Button } from "@workspace/ui/components/button";
import { useRouter, useParams } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import ActionMenu from "@/components/common/action-menu";
import { StatusPill } from "@/components/common/pasient-card/status-pill";

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
  status: string;
}

interface SurgeryTableProps {
  initialData?: Surgery[];
}

export const SurgeryTable = ({ initialData }: SurgeryTableProps) => {
  const router = useRouter();
  const { lang } = useParams();
  const dict = useDictionary();
  const surgeryTableDict = dict.pages.surgery.dashboard;
  const [activeTab, setActiveTab] = React.useState("Surgeries");
  const {
    data: surgeriesData,
    isLoading,
    error,
  } = useSurgeries({
    status: activeTab === "Ongoing"
      ? "in_progress"
      : activeTab === "Upcoming"
        ? "scheduled"
        : undefined
  });

  const extractSurgeries = (): Surgery[] => {
    if (initialData) return initialData;
    if (!surgeriesData) return [];

    // Check if it's a paginated response with a .data property
    if ('data' in surgeriesData && Array.isArray(surgeriesData.data)) {
      return surgeriesData.data as Surgery[];
    }

    if (Array.isArray(surgeriesData)) {
      return surgeriesData;
    }

    return [];
  };

  const surgeries = extractSurgeries();

  // Map API data to table rows
  const tableData: SurgeryRow[] = surgeries.map((surgery: Surgery) => ({
    id: surgery.id,
    otRoom: surgery.ot_room
      ? `${dict.pages.surgery.common.prefixes.otRoom} ${surgery.ot_room}`
      : (surgery.ot_room_id ? `${dict.pages.surgery.common.prefixes.otRoom} ${surgery.ot_room_id}` : "—"),
    patient: {
      id: surgery.patient?.id || surgery.patient_id || "",
      name: surgery.patient
        ? `${surgery.patient.first_name} ${surgery.patient.last_name}`
        : dict.pages.surgery.common.fallbacks.unknownPatient,
      mrn: surgery.patient?.civil_id || surgery.patient?.mrn || "—",
      avatarUrl: surgery.patient?.photo_url || surgery.patient?.avatarUrl || "/images/avatars/1.png",
      vip: surgery.patient?.vip,
    },
    time: (surgery.date || surgery.scheduled_date)
      ? new Date(surgery.date || (surgery.scheduled_date as string)).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      })
      : "—",
    procedure: surgery.procedure?.name || (surgery as any).surgery_type || "—",
    surgeon: surgery.doctor
      ? `${dict.pages.surgery.common.prefixes.doctor} ${surgery.doctor.first_name} ${surgery.doctor.last_name}`
      : dict.pages.surgery.common.fallbacks.notAssigned,
    specialty: surgery.department || "General",
    status: (surgery.status || "scheduled").toLowerCase(),
  }));


  const columns = React.useMemo<Column<SurgeryRow>[]>(() => [
    {
      key: "otRoom",
      label: surgeryTableDict.table.otRoom,
    },
    {
      key: "patient",
      label: dict.table.patient,
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
      label: dict.table.time,
    },
    {
      key: "procedure",
      label: surgeryTableDict.table.procedure,
    },
    {
      key: "surgeon",
      label: surgeryTableDict.table.surgeon,
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
      label: dict.table.status,
      render: (row) => (
        <StatusPill status={row.status} />
      ),
    },
    {
      key: "action",
      label: dict.table.action,
      className: "text-right",
      render: (row) => (
        <ActionMenu actions={[
          {
            label: dict.common.view,
            onClick: () => {
              router.push(`/${lang}/surgery/dashboard/surgery-details/${row.id}`);
            }
          },
          {
            label: dict.common.edit,
            onClick: () => {
              router.push(`/${lang}/surgery/dashboard/surgery-details/${row.id}`);
            }
          },
          {
            label: dict.common.delete,
            // onClick: () => {
            //     router.push(`/surgery/dashboard/surgery-details/${row.id}`);
            // }
          }
        ]} className="bg-transparent hover:bg-transparent text-blue-500" />
      ),
    },
  ], [dict, lang, router]);

  return (
    <div className="mb-8 overflow-hidden rounded-3xl bg-background">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-2 pt-4">
        <div className="flex gap-2 rounded-2xl">
          <DynamicTabs
            tabs={[
              { key: "Surgeries", label: surgeryTableDict.tabs.all },
              { key: "Ongoing", label: surgeryTableDict.tabs.ongoing },
              { key: "Upcoming", label: surgeryTableDict.tabs.upcoming },
            ]}
            defaultTab={activeTab}
            onChange={(v) => setActiveTab(v)}
            variant="scroll"
          />
        </div>

        <Button
          variant="link"
          className="text-blue-500 text-sm"
          onClick={() => router.push(`/${lang}${ROUTES.SURGERY_OT_SCHEDULE}`)}
        >
          {dict.dashboard.viewAll}
        </Button>
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

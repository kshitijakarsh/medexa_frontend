"use client";

import React from "react";
import {
  CalendarDays,
} from "lucide-react";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { useRouter, useParams } from "next/navigation";
import { Surgery } from "@/lib/api/surgery/surgeries";
import { useSurgeries } from "@/app/[lang]/surgery/_hooks/useSurgery";
import { SurgeryRow } from "@/app/[lang]/surgery/_lib/types";
import { ResponsiveDataTable, type Column } from "@/components/common/data-table/ResponsiveDataTable";
import { useDictionary } from "@/i18n/use-dictionary";
import { AppointmentPatientCell } from "@/components/common/pasient-card/appointment-patient-cell";
import { StatusPill } from "@/components/common/pasient-card/status-pill";
import { TimeRoomInfo } from "@/components/common/pasient-card/time-room-info";
import ActionMenu from "@/components/common/action-menu";
import FilterButton from "@/components/common/filter-button";
import DateFilter from "@/app/[lang]/surgery/_components/common/DateFilter";
import { StatusToggle } from "@/app/[lang]/surgery/_components/common/StatusToggle";
import ViewModeToggle from "@/app/[lang]/surgery/_components/common/ViewModeToggle";
import SearchWithDropdown from "@/app/[lang]/surgery/_components/common/SearchWithDropdown";


const PRE_OP_DATA_MOCK: SurgeryRow[] = [
  {
    id: "1",
    otRoom: "OT-12",
    patient: {
      id: "p1",
      name: "Fatima Al-Sabah",
      mrn: "MRN-2501",
      avatarUrl: "/images/avatars/1.png",
      vip: true,
    },
    procedure: "Doctor Consultation",
    surgeon: "Dr. Ahmed Khan",
    specialty: "General",
    time: "10:30 AM",
    status: "PreOp",
  },
  {
    id: "2",
    otRoom: "OT-08",
    patient: {
      id: "p2",
      name: "John Mathew",
      mrn: "MRN-2502",
      avatarUrl: "/images/avatars/1.png",
    },
    procedure: "Pre Surgery Check",
    surgeon: "Dr. Sarah Lee",
    specialty: "General",
    time: "11:15 AM",
    status: "IntraOp",
  },
];

export default function PreOpList() {
  const [activeTab, setActiveTab] = React.useState("All Surgeries");
  const router = useRouter();
  const { lang } = useParams();
  const dict = useDictionary();
  const [sortOrder, setSortOrder] = React.useState<"nearest" | "farthest">("nearest");
  const [isCalendarView, setIsCalendarView] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list");
  const [searchType, setSearchType] = React.useState({ label: "MRN", value: "mrn" });
  const [searchValue, setSearchValue] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const {
    data: responseData,
    isLoading,
    refetch,
  } = useSurgeries({
    search: searchQuery || undefined,
    status: (() => {
      const statusMap: Record<string, string> = {
        "Pre-op": "PreOp",
        "Intra Op": "IntraOp",
        "Post-op": "PostOp",
      };
      return statusMap[activeTab];
    })(),
  });

  const USE_MOCK_DATA = false; // Turned off primarily, but maintained for structure

  const tableData: SurgeryRow[] = React.useMemo(() => {
    const actualSurgeries = responseData?.data || [];

    // Map API data to table rows
    const mappedActual: SurgeryRow[] = actualSurgeries.map((surgery: Surgery) => ({
      id: surgery.id,
      otRoom: (surgery as any).ot_room_id ? `${dict.pages.surgery.common.prefixes.otRoom}${(surgery as any).ot_room_id}` : ((surgery as any).ot_room || "—"),
      patient: {
        id: surgery.patient?.id || surgery.patient_id || "",
        name: surgery.patient
          ? `${surgery.patient.first_name} ${surgery.patient.last_name}`
          : dict.pages.surgery.common.fallbacks.unknownPatient,
        mrn: surgery.patient?.civil_id || (surgery as any).patient?.mrn || "MRN-0000",
        avatarUrl: (surgery.patient as any)?.photo_url || (surgery.patient as any)?.avatarUrl || "/images/avatars/1.png",
        vip: surgery.patient?.vip,
      },
      time: (surgery.date || surgery.scheduled_date)
        ? new Date(surgery.date || (surgery.scheduled_date as string)).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        })
        : "—",
      procedure: surgery.procedure?.name || (surgery as any).procedure?.name || (surgery as any).surgery_type || "—",
      surgeon: surgery.doctor
        ? `${dict.pages.surgery.common.prefixes.doctor} ${surgery.doctor.first_name} ${surgery.doctor.last_name}`
        : dict.pages.surgery.common.fallbacks.notAssigned,
      specialty: surgery.department || "General",
      status: surgery.status || "scheduled",
    }));

    if (USE_MOCK_DATA && mappedActual.length === 0) {
      return PRE_OP_DATA_MOCK.filter(d => {
        if (activeTab === "All Surgeries") return true;
        const statusMap: Record<string, string> = {
          "Pre-op": "PreOp",
          "Intra Op": "IntraOp",
          "Post-op": "PostOp",
        };
        return d.status === statusMap[activeTab];
      });
    }

    return mappedActual;
  }, [responseData, activeTab, USE_MOCK_DATA]);

  const searchOptions = [
    { label: "MRN", value: "mrn" },
    { label: "Name", value: "name" },
    { label: "Status", value: "status" },
  ];

  const columns = React.useMemo<Column<SurgeryRow>[]>(() => [
    {
      key: "otRoom",
      label: "OT Room",
    },
    {
      key: "patient",
      label: "Patient",
      render: (row) => (
        <AppointmentPatientCell
          name={row.patient.name}
          mrn={row.patient.mrn}
          avatar={row.patient.avatarUrl}
          vip={row.patient.vip}
        />
      ),
    },
    {
      key: "time",
      label: "Date and Time",
      render: (row) => <TimeRoomInfo time={row.time} />,
    },
    {
      key: "procedure",
      label: "Procedure",
    },
    {
      key: "surgeon",
      label: "Surgeon",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      key: "action",
      label: dict.pages.surgery.common.action,
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
          }
        ]} className="bg-transparent hover:bg-transparent text-blue-500" />
      ),
    },
  ], [dict, lang, router]);

  const counts = React.useMemo(() => ({
    all: tableData.length,
    preOp: tableData.filter((d) => d.status.toLowerCase() === "preop").length,
    intraOp: tableData.filter((d) => d.status.toLowerCase() === "intraop").length,
    postOp: tableData.filter((d) => d.status.toLowerCase() === "postop").length,
  }), [tableData]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="font-medium text-base">
          {dict.pages.surgery.preOp.surgeriesRequestList}
        </h1>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 w-full">
            <DynamicTabs
              tabs={[
                { key: "All Surgeries", label: dict.pages.surgery.preOp.tabs.allSurgeries },
                { key: "Pre-op", label: dict.pages.surgery.preOp.tabs.preOp, count: counts.preOp },
                { key: "Intra Op", label: dict.pages.surgery.preOp.tabs.intraOp, count: counts.intraOp },
                { key: "Post-op", label: dict.pages.surgery.preOp.tabs.postOp, count: counts.postOp },
              ]}
              defaultTab={activeTab}
              onChange={(key) => setActiveTab(key)}
            />
          </div>
          <StatusToggle
            variant="simple"
            isActive={isCalendarView}
            onToggle={setIsCalendarView}
            className="flex shrink-0"
            label={
              <>
                <CalendarDays size={18} className="text-blue-500" />
                {dict.pages.surgery.common.calendarView}
              </>
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 my-2">
        <FilterButton onClick={() => refetch()} className="bg-blue-500 text-white hover:none" />

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="w-auto">
            <SearchWithDropdown
              options={searchOptions}
              selectedOption={searchType}
              onOptionSelect={setSearchType}
              searchValue={searchValue}
              onSearchChange={(val: string) => {
                setSearchValue(val);
                if (val.length >= 2) {
                  setSearchQuery(val);
                } else if (val.length === 0) {
                  setSearchQuery("");
                }
              }}
              placeholder={dict.common.search}
            />
          </div>

          <DateFilter
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />

          <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-4">
        <ResponsiveDataTable
          columns={columns}
          data={tableData}
          loading={isLoading}
          striped
        />
      </div>
    </div>
  );
}

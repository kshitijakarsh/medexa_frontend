"use client";

import React from "react";
import {
  CalendarDays,
} from "lucide-react";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { createSurgeryApiClient, Surgery } from "@/lib/api/surgery/surgeries";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { useDictionary } from "@/i18n/use-dictionary";
// import type { Column } from "@/components/common/data-table";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T, index?: number) => React.ReactNode;
  className?: string;
}

import { AppointmentPatientCell } from "@/components/common/pasient-card/appointment-patient-cell";
import { StatusPill } from "@/components/common/pasient-card/status-pill";
import { TimeRoomInfo } from "@/components/common/pasient-card/time-room-info";
import NewButton from "@/components/common/new-button";
import ActionMenu from "@/components/common/action-menu";
import FilterButton from "@/components/common/filter-button";
import DateFilter from "@/app/[lang]/surgery/_components/common/DateFilter";
import { StatusToggle } from "@/app/[lang]/surgery/_components/common/StatusToggle";
import ViewModeToggle from "@/app/[lang]/surgery/_components/common/ViewModeToggle";
import SearchWithDropdown from "@/app/[lang]/surgery/_components/common/SearchWithDropdown";

type PreOpRow = {
  id: string;
  patient: {
    name: string;
    mrn: string;
    avatar?: string;
    vip?: boolean;
  };
  procedure: string;
  doctor: string;
  time: string;
  room: string;
  status: "PreOp" | "IntraOp" | "PostOp";
};

const PRE_OP_DATA: PreOpRow[] = [
  {
    id: "1",
    patient: {
      name: "Fatima Al-Sabah",
      mrn: "MRN-2501",
      avatar: "/images/avatars/1.png",
      vip: true,
    },
    procedure: "Doctor Consultation",
    doctor: "Dr. Ahmed Khan",
    time: "10:30 AM",
    room: "OT-12",
    status: "PreOp",
  },
  {
    id: "2",
    patient: {
      name: "John Mathew",
      mrn: "MRN-2502",
      avatar: "/images/avatars/1.png",
    },
    procedure: "Pre Surgery Check",
    doctor: "Dr. Sarah Lee",
    time: "11:15 AM",
    room: "OT-08",
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

  const surgeryApi = createSurgeryApiClient({});

  const {
    data: responseData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["surgeries-preop", searchQuery, activeTab],
    queryFn: async () => {
      const statusMap: Record<string, string> = {
        "Pre-op": "PreOp",
        "Intra Op": "IntraOp",
        "Post-op": "PostOp",
      };
      const resp = await surgeryApi.getAll({
        search: searchQuery || undefined,
        status: statusMap[activeTab] || undefined,
      });
      return resp.data;
    },
  });

  const USE_MOCK_DATA = true;

  const surgeries = React.useMemo(() => {
    const actualData = responseData?.data || [];
    if (USE_MOCK_DATA) {
      // Filter mock data based on active tab locally for now
      const filteredMock = activeTab === "All Surgeries"
        ? PRE_OP_DATA
        : PRE_OP_DATA.filter(d => {
          const statusMap: Record<string, string> = {
            "Pre-op": "PreOp",
            "Intra Op": "IntraOp",
            "Post-op": "PostOp",
          };
          return d.status === statusMap[activeTab];
        });
      return [...filteredMock, ...actualData];
    }
    return actualData;
  }, [responseData, activeTab]);

  const searchOptions = [
    { label: "MRN", value: "mrn" },
    { label: "Name", value: "name" },
    { label: "Status", value: "status" },
  ];

  const columns = React.useMemo<Column<PreOpRow>[]>(() => [
    {
      key: "room",
      label: "OT Room",
    },
    {
      key: "patient",
      label: "Patient",
      render: (row) => (
        <AppointmentPatientCell
          name={row.patient.name}
          mrn={row.patient.mrn}
          avatar={row.patient.avatar}
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
      key: "doctor",
      label: "Surgeon",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <ActionMenu actions={[
          {
            label: dict.common.view,
            onClick: () => {
              router.push(`/${lang}/surgery/ot-setting/teams/${row.id}`);
            }
          },
          {
            label: dict.common.edit,
            // onClick: () => {
            //     router.push(`/surgery/dashboard/surgery-details/${row.id}`);
            // }
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
  ], []);

  const counts = React.useMemo(() => ({
    all: PRE_OP_DATA.length,
    preOp: PRE_OP_DATA.filter((d) => d.status === "PreOp").length,
    intraOp: PRE_OP_DATA.filter((d) => d.status === "IntraOp").length,
    postOp: PRE_OP_DATA.filter((d) => d.status === "PostOp").length,
  }), []);

  const filteredData = surgeries;

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

          {/* <NewButton
            name={dict.pages.surgery.otSchedule.addSurgery}
            className="h-9 text-sm"
            handleClick={() => {
              router.push(`/${lang}/surgery/dashboard/surgery-details/new`);
            }}
          ></NewButton> */}

          <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-4">
        <ResponsiveDataTable
          columns={columns}
          data={filteredData}
          loading={isLoading}
          striped
        />
      </div>
    </div>
  );
}

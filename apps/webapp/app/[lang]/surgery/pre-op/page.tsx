"use client";

import React from "react";
import {
  CalendarDays,
  LayoutGrid,
  Search,
  ChevronDown,
  SlidersHorizontal,
  LayoutList,
} from "lucide-react";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { useRouter, useParams } from "next/navigation";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
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
      render: (row) => <TimeRoomInfo time={row.time}/>,
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
      className: "text-right",
      render: (row) => (
        <ActionMenu actions={[
          {
            label: "View",
            onClick: () => {
              router.push(`/${lang}/surgery/ot-setting/teams/${row.id}`);
            }
          },
          {
            label: "Edit",
            // onClick: () => {
            //     router.push(`/surgery/dashboard/surgery-details/${row.id}`);
            // }
          },
          {
            label: "Delete",
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

  const filteredData = React.useMemo(() => {
    switch (activeTab) {
      case "Pre-op":
        return PRE_OP_DATA.filter((d) => d.status === "PreOp");
      case "Intra Op":
        return PRE_OP_DATA.filter((d) => d.status === "IntraOp");
      case "Post-op":
        return PRE_OP_DATA.filter((d) => d.status === "PostOp");
      default:
        return PRE_OP_DATA;
    }
  }, [activeTab]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-slate-800 font-medium text-sm">
          Surgeries Request List
        </h1>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 w-full">
            <DynamicTabs
              tabs={[
                { key: "All Surgeries", label: "All Surgeries"},
                { key: "Pre-op", label: "Pre-op", count: counts.preOp },
                { key: "Intra Op", label: "Intra Op", count: counts.intraOp },
                { key: "Post-op", label: "Post-op", count: counts.postOp },
              ]}
              defaultTab={activeTab}
              onChange={(key) => setActiveTab(key)}
            />
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
              <CalendarDays size={18} className="text-blue-500" />
              Calendar View
            </span>

            <button
              role="switch"
              aria-checked="false"
              className="relative h-5 w-10 rounded-full bg-gray-300"
            >
              <div className="absolute left-1 top-1 h-3 w-3 rounded-full bg-white shadow-sm" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 my-2">
        <button className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm text-white shadow-soft">
          Filter <SlidersHorizontal size={14} />
        </button>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="flex h-9 items-center overflow-hidden rounded-full bg-background shadow-soft">
            <button className="flex h-full items-center gap-1 px-3 text-xs font-medium text-blue-500">
              <Search size={14} />
              MRN
              <ChevronDown size={12} />
            </button>
            <input
              type="text"
              placeholder="Search MRN"
              className="w-48 px-3 text-sm outline-none"
            />
          </div>

          <button className="flex items-center gap-2 rounded-full bg-white shadow-soft px-4 py-1.5 text-sm">
            Quick
            <div className="flex flex-col">
              <ChevronDown size={12} className="rotate-180 text-blue-500" />
              <ChevronDown size={12} className="text-blue-500" />
            </div>
          </button>

          {/* <button className="flex items-center gap-2 rounded-full bg-green-room pl-4 pr-0.5 py-0.5 text-sm text-white shadow-soft">
            Add surgery
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#50C786]">
              <Plus size={14} />
            </div>
          </button> */}

          <NewButton
            name="Add Surgeries"
            handleClick={() => {
              router.push(`/${lang}/surgery/dashboard/surgery-details/new`);
            }}
          ></NewButton>

          <div className="flex items-center gap-1 bg-white rounded-full p-0.5 shadow-soft">
            <button className="p-1.5 text-gray-500">
              <LayoutGrid size={18} />
            </button>
            <button className="rounded-full bg-green-room p-1.5 text-white">
              <LayoutList size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-4">
        <ResponsiveDataTable
          columns={columns}
          data={filteredData}
          striped
        />
      </div>
    </div>
  );
}

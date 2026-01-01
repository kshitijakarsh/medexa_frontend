"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/common/data-table";
interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
}
import { SurgeryRequest } from "./../../_lib/types";
import { StatusBadge } from "../../_components/common/StatusBadge";
import {
    SlidersHorizontal,
    Search,
    ChevronDown,
    LayoutGrid,
    LayoutList,
    Calendar,
    BriefcaseMedical,
    Stethoscope,
    CalendarDays,
    MoreVertical,
    Ellipsis,
} from "lucide-react";
import Image from "next/image";
import { FilterDropdown } from "./UI/FilterDropdown";
import NewButton from "@/components/common/new-button";
import { VipCrownBadge } from "@/components/common/pasient-card/vip-crown-badge";

interface DashboardEntityListProps {
    title: string;
    addButtonText: string;
    onAddClick: () => void;
    data: any[];
    searchPlaceholder?: string;
}

export const DashboardEntityList = ({
    title,
    addButtonText,
    onAddClick,
    data,
    searchPlaceholder = "Search MRN",
}: DashboardEntityListProps) => {
    const router = useRouter();

    const columns: Column<SurgeryRequest>[] = [
        {
            key: "patient",
            label: "Patient",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Image
                            src={row.patient.avatarUrl || "/images/avatars/1.png"}
                            alt={row.patient.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                        <VipCrownBadge size={10} className="absolute -top-2 -right-1" />
                    </div>

                    <div className="flex flex-col">
                        <span className="font-medium text-slate-800 text-sm">
                            {row.patient.name}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                            <span>MRN {row.patient.mrn}</span>
                            <span className="text-green-500">|</span>
                            <span className="text-blue-500 font-medium">
                                {row.patient.id}
                            </span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: "requestedDoctor",
            label: "Requested Doctor",
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        {row.requestedDoctor.name}
                    </span>
                    <span className="text-xs text-slate-500">
                        {row.requestedDoctor.department}
                    </span>
                </div>
            )
        },
        {
            key: "procedure",
            label: "Procedure",
            className: "text-sm text-slate-600"
        },
        {
            key: "surgeon",
            label: "Surgeon",
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        {row.surgeon.name}
                    </span>
                    <span className="text-xs text-slate-500">
                        {row.surgeon.department}
                    </span>
                </div>
            )
        },
        {
            key: "requestedFor",
            label: "Requested For",
            className: "text-sm text-slate-600"
        },
        {
            key: "urgency",
            label: "Urgency",
            render: (row) => <StatusBadge status={row.urgency} />
        },
        {
            key: "actions",
            label: "Action",
            className: "text-right",
            render: () => (
                <div className="flex items-center justify-end gap-1">
                    <button className="text-blue-500 text-xs font-medium hover:underline">
                        Action
                    </button>
                    <button className="text-emerald-500 p-1 hover:bg-slate-100 rounded">
                        <MoreVertical size={14} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1 className="text-slate-800 font-medium text-sm">
                    {title}
                </h1>

                {/* Filters + Calendar toggle */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 w-full">
                        <FilterDropdown icon={<Calendar size={16} />} label="Today's" />
                        <FilterDropdown
                            icon={<BriefcaseMedical size={16} />}
                            label="All Department"
                        />
                        <FilterDropdown
                            icon={<Stethoscope size={16} />}
                            label="All Doctor"
                        />
                        <FilterDropdown
                            icon={<Ellipsis size={16} />}
                            label="All Status"
                        />
                    </div>

                    {/* View Toggle */}
                    <div className="flex shrink-0 items-center gap-3">
                        <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
                            <CalendarDays size={18} className="text-blue-500" />
                            Calendar View
                        </span>

                        <button
                            role="switch"
                            aria-checked="false"
                            aria-label="Toggle calendar view"
                            className="
          relative h-5 w-10 rounded-full
          bg-gray-300
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-blue-500/30
        "
                        >
                            <div className="absolute left-1 top-1 h-3 w-3 rounded-full bg-white shadow-sm" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 my-2">
                {/* LEFT */}
                <div className="flex shrink-0 items-center gap-3">
                    <button
                        className="
        flex items-center gap-2
        rounded-full bg-blue-500 px-4 py-2
        text-sm text-white
        shadow-soft
      "
                    >
                        Filter <SlidersHorizontal size={14} />
                    </button>
                </div>

                {/* RIGHT */}
                <div className="flex flex-1 items-center justify-end gap-3 min-w-0">
                    {/* Search */}
                    <div
                        className="
        flex h-9 items-center overflow-hidden rounded-full
        shadow-soft bg-background
        transition focus-within:ring-2 focus-within:ring-blue-500/20
      "
                    >
                        <button
                            className="
          flex h-full items-center gap-1
          shadow-soft
          px-3
          text-xs font-medium text-blue-500
        "
                        >
                            <Search size={14} />
                            MRN
                            <ChevronDown size={12} className="text-gray-500" />
                        </button>

                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            className="
          w-48 px-3 text-sm
          text-gray-700 placeholder:text-gray-500
          outline-none
        "
                        />
                    </div>

                    {/* Quick filter */}
                    <button
                        className="
        flex items-center gap-2
        rounded-full bg-white shadow-soft
        px-4 py-1.5
        text-sm font-medium text-gray-700
      "
                    >
                        Quick
                        <div className="flex flex-col">
                            <ChevronDown size={12} className="rotate-180 text-[#0086F8]" />
                            <ChevronDown size={12} className="text-[#0086F8]" />
                        </div>
                    </button>

                    {/* Add Button */}
                    <NewButton
                        name={addButtonText}
                        handleClick={onAddClick}
                    ></NewButton>

                    {/* View mode toggle */}
                    <div className="flex shrink-0 items-center gap-1 bg-white rounded-full p-0.5 shadow-soft">
                        <button className="rounded-full p-1.5 text-gray-500">
                            <LayoutGrid size={18} />
                        </button>

                        <button className="rounded-full bg-green-room p-1.5 text-white">
                            <LayoutList size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={data}
                onRowClick={() => router.push(`/surgery/dashboard/surgery-details`)}
            />
        </div>
    );
};

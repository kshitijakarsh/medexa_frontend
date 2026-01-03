"use client";

import { AppSelect } from "@/components/common/app-select";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { Switch } from "@workspace/ui/components/switch";
import { OPDFilterState } from "../types";

// Filter Options
const STATUS_OPTIONS = [
    { label: "All Status", value: "all" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "Waiting", value: "Waiting" },
    { label: "In Consultation", value: "In Consultation" },
];

interface OPDFilterBarProps {
    filters: OPDFilterState;
    onFilterChange: (key: keyof OPDFilterState, value: string) => void;
    doctorOptions: { label: string; value: string }[];
    departmentOptions: { label: string; value: string }[];
    setDepartmentSearchQuery: (query: string) => void;
    setDoctorSearchQuery: (query: string) => void;
    isAdvancedView: boolean;
    setIsAdvancedView: (v: boolean) => void;
    hideStatus?: boolean; // Optional
    toggleLabel?: string; // New prop for dynamic label
    currentView?: string; // Current view to conditionally show/hide elements
}

export function OPDFilterBar({
    filters,
    onFilterChange,
    doctorOptions,
    departmentOptions,
    setDepartmentSearchQuery,
    setDoctorSearchQuery,
    isAdvancedView,
    setIsAdvancedView,
    hideStatus = false,
    toggleLabel = "Advanced View", // Default fallback
    currentView,
}: OPDFilterBarProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
                {/* Filter Dropdowns Row - Transparent Background */}
                <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
                    {/* Date - Hide in completed view */}
                    {currentView !== "completed" && (
                        <div className="w-full sm:w-[220px]">
                            <AppSelect
                                placeholder={currentView === "instructions" ? "Today's Instructions" : "Today's OPD QUE"}
                                value={filters.dateRange}
                                onChange={(val) => onFilterChange("dateRange", val)}
                                options={currentView === "instructions" 
                                    ? [
                                        { label: "Today's Instructions", value: "today" },
                                    ]
                                    : [
                                        { label: "Today's OPD QUE", value: "today_queue" },
                                        { label: "Tomorrow's Queue", value: "tomorrow" },
                                    ]}
                                icon={<CalendarDays className="w-5 h-5 text-gray-700" />}
                                triggerClassName="h-11 rounded-full border-blue-100 bg-white text-gray-900 font-medium pl-2 hover:border-blue-300 transition-colors shadow-sm"
                            />
                        </div>
                    )}

                    {/* Department */}
                    <div className="w-full sm:w-[200px]">
                        <AppSelect
                            placeholder="Department"
                            value={filters.department}
                            onChange={(val) => onFilterChange("department", val)}
                            options={departmentOptions}
                            icon={
                                <Image
                                    src="/images/folder_supervised.png"
                                    alt="Department"
                                    width={18}
                                    height={18}
                                />
                            }
                            searchable={true}
                            searchPlaceholder="Search Department"
                            onSearchChange={setDepartmentSearchQuery}
                            triggerClassName="min-w-[180px] h-10 border-gray-300 bg-white rounded-full text-gray-900 pl-2 hover:border-blue-300 transition-colors shadow-sm"
                        />
                    </div>

                    {/* Doctor */}
                    <div className="w-full sm:w-[200px]">
                        <AppSelect
                            placeholder="Doctor"
                            value={filters.doctor}
                            onChange={(val) => onFilterChange("doctor", val)}
                            options={doctorOptions}
                            icon={
                                <Image
                                    src="/images/stethoscope.svg"
                                    alt="Doctor"
                                    width={18}
                                    height={18}
                                />
                            }
                            searchable={true}
                            searchPlaceholder="Search Doctor"
                            onSearchChange={setDoctorSearchQuery}
                            triggerClassName="min-w-[180px] h-10 border-gray-300 bg-white rounded-full text-gray-900 pl-2 hover:border-blue-300 transition-colors shadow-sm"
                        />
                    </div>

                    {/* Status */}
                    {!hideStatus && (
                        <div className="w-full sm:w-[200px]">
                            <AppSelect
                                placeholder="All Status"
                                value={filters.status}
                                onChange={(val) => onFilterChange("status", val)}
                                options={STATUS_OPTIONS}
                                icon={
                                    <Image
                                        src="/images/donut_large.svg"
                                        alt="Status"
                                        width={20}
                                        height={20}
                                        className="w-5 h-5"
                                    />
                                }
                                triggerClassName="h-11 rounded-full border-blue-100 bg-white text-gray-900 font-medium pl-2 hover:border-blue-300 transition-colors shadow-sm"
                            />
                        </div>
                    )}
                </div>

                {/* Right Side: Toggle - Hide when label is "Overview Today" or in completed view */}
                {toggleLabel !== "Overview Today" && currentView !== "completed" && (
                    <div className="flex items-center gap-3 ml-auto">
                        <CalendarDays className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-semibold text-gray-800">
                            {toggleLabel}
                        </span>
                        <Switch
                            checked={isAdvancedView}
                            onCheckedChange={setIsAdvancedView}
                            className="data-[state=checked]:bg-blue-500"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

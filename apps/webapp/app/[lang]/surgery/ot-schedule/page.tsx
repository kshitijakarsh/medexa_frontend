"use client";

import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { createSurgeryApiClient, Surgery } from "@/lib/api/surgery/surgeries";
import { ResponsiveDataTable } from "@/components/common/data-table/ResponsiveDataTable";
import { PaginationControls } from "@/components/common/data-table/PaginationControls";
import NewButton from "@/components/common/new-button";
import FilterButton from "@/components/common/filter-button";
import { DateRangeDropdown } from "@/app/[lang]/surgery/dashboard/_components/UI/DateRangeDropdown";
import { DateRange } from "react-day-picker";
import {
    BriefcaseMedical,
    Stethoscope,
    CalendarDays,
    Ellipsis
} from "lucide-react";
import { FilterDropdown } from "@/app/[lang]/surgery/dashboard/_components/UI/FilterDropdown";
import SearchWithDropdown from "@/app/[lang]/surgery/_components/common/SearchWithDropdown";
import DateFilter from "@/app/[lang]/surgery/_components/common/DateFilter";
import { StatusToggle } from "@/app/[lang]/surgery/_components/common/StatusToggle";
import ViewModeToggle from "@/app/[lang]/surgery/_components/common/ViewModeToggle";
import ActionMenu from "@/components/common/action-menu";

interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
}

export default function SurgeryList() {
    const router = useRouter();
    const { lang } = useParams();
    const [selectedTeam, setSelectedTeam] = useState("");
    const [searchType, setSearchType] = useState({ label: "MRN", value: "mrn" });
    const [searchValue, setSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"nearest" | "farthest">("nearest");
    const [isCalendarView, setIsCalendarView] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    const [page, setPage] = useState(1);
    const limit = 10;

    // Filter states
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const surgeryApi = createSurgeryApiClient({});

    const {
        data: responseData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["surgeries", page, searchQuery, selectedStatus, selectedDept, selectedDoctor],
        queryFn: async () => {
            const resp = await surgeryApi.getAll({
                page,
                limit,
                search: searchQuery || undefined,
                status: selectedStatus || undefined,
                department: selectedDept || undefined,
                // doctor_id: selectedDoctor || undefined, // API client doesn't have doctor_id param yet but we can pass it if needed
            });
            return resp.data;
        },
    });

    const surgeries = useMemo(() => {
        if (!responseData?.data) return [];
        return responseData.data;
    }, [responseData]);

    const totalPages = responseData?.pagination?.totalPages || 0;

    const departments = useMemo(() => {
        // Ideally these should come from separate master APIs, but we can extract from data if needed
        return [];
    }, []);

    const doctors = useMemo(() => {
        return [];
    }, []);

    const searchOptions = [
        { label: "MRN", value: "mrn" },
        { label: "Name", value: "name" },
        { label: "Surgery", value: "surgery" },
    ];

    const columns: Column<Surgery>[] = [
        {
            key: "patient",
            label: "Patient",
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        {row.patient?.first_name} {row.patient?.last_name}
                    </span>
                    <span className="text-xs text-slate-500">
                        {/* {row.patient?.mrn} • {row.patient?.age}y • {row.patient?.gender} */}
                        ID: {row.patient_id}
                    </span>
                </div>
            )
        },
        {
            key: "requestedDoctor",
            label: "Requested Doctor",
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        {row.doctor?.first_name} {row.doctor?.last_name}
                    </span>
                    <span className="text-xs text-slate-500">
                        {row.department}
                    </span>
                </div>
            )
        },
        {
            key: "procedure",
            label: "Procedure",
            render: (row) => (
                <span className="text-sm text-slate-700 font-medium">
                    {row.surgery_type || "N/A"}
                </span>
            )
        },
        {
            key: "surgeon",
            label: "Surgeon",
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        {row.doctor?.first_name} {row.doctor?.last_name}
                    </span>
                    <span className="text-xs text-slate-500">
                        {row.department}
                    </span>
                </div>
            )
        },
        {
            key: "requestedFor",
            label: "Requested For",
            render: (row) => (
                <span className="text-sm text-slate-700">
                    {row.scheduled_date ? new Date(row.scheduled_date).toLocaleDateString() : "—"}
                </span>
            )
        },
        {
            key: "urgency",
            label: "Urgency",
            render: (row) => (
                <span
                    className={`
                  ${row.urgency === 'emergency'
                            ? 'text-rose-600'
                            : row.urgency === 'urgent'
                                ? 'text-orange-600'
                                : 'text-emerald-600'}
                  text-xs capitalize
                `}
                >
                    {row.urgency}
                </span>
            )
        },
        {
            key: "actions",
            label: "Action",
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
                        onClick: () => {
                            router.push(`/${lang}/surgery/ot-setting/teams/${row.id}`);
                        }
                    },
                    {
                        label: "Delete",
                        // onClick: () => { }
                    }
                ]} className="bg-transparent hover:bg-transparent text-blue-500" />
            )
        }
    ];


    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1 className="font-medium text-base">Surgery List</h1>

                {/* Filters + Calendar toggle */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 w-full">
                        <DateRangeDropdown
                            label="Date Range"
                            value={dateRange}
                            onSelect={setDateRange}
                        />
                        <FilterDropdown
                            icon={<BriefcaseMedical size={16} />}
                            label="Department"
                            options={departments}
                            value={selectedDept}
                            onSelect={setSelectedDept}
                        />
                        <FilterDropdown
                            icon={<Stethoscope size={16} />}
                            label="Doctor"
                            options={doctors}
                            value={selectedDoctor}
                            onSelect={setSelectedDoctor}
                        />
                        <FilterDropdown
                            icon={<Ellipsis size={16} />}
                            label="Status"
                            options={["Active", "Inactive"]}
                            value={selectedStatus}
                            onSelect={setSelectedStatus}
                        />
                    </div>

                    {/* View Toggle */}
                    <StatusToggle
                        variant="simple"
                        isActive={isCalendarView}
                        onToggle={setIsCalendarView}
                        label={
                            <>
                                <CalendarDays size={18} className="text-blue-500" />
                                Calendar View
                            </>
                        }
                    />
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 my-2">
                {/* LEFT */}
                <div className="flex shrink-0 items-center gap-3">
                    <FilterButton onClick={() => { }} className="bg-blue-500 text-white hover:none" />
                </div>

                {/* RIGHT */}
                <div className="flex flex-1 items-center justify-end gap-3 min-w-0">
                    {/* Search */}
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
                            placeholder="Search Surgeries"
                        />
                    </div>

                    {/* Quick filter (Sort) */}
                    <DateFilter
                        sortOrder={sortOrder}
                        onSortChange={setSortOrder}
                    />

                    {/* Add Button */}
                    <NewButton
                        name="Add Surgery"
                        className="h-9 text-sm"
                        handleClick={() => {
                            router.push(`/${lang}/surgery/dashboard/surgery-details/new`);
                        }}
                    ></NewButton>

                    {/* View mode toggle */}
                    <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
                </div>
            </div>

            {error ? (
                <div className="text-center py-8 text-red-600">
                    <p>Failed to load surgeries. Please try again.</p>
                </div>
            ) : (
                <ResponsiveDataTable
                    columns={columns}
                    data={surgeries}
                    loading={isLoading}
                    pagination={
                        totalPages > 1 ? (
                            <PaginationControls
                                page={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        ) : undefined
                    }
                />
            )}
        </div>
    );
}

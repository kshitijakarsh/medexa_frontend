"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/common/data-table";

import {
    Calendar,
    BriefcaseMedical,
    Stethoscope,
    CalendarDays,
    Ellipsis
} from "lucide-react";
import ActionMenu from "@/components/common/action-menu";
import { FilterDropdown } from "@/app/[lang]/surgery/dashboard/_components/UI/FilterDropdown";
import SearchWithDropdown from "@/app/[lang]/surgery/_components/common/SearchWithDropdown";
import DateFilter from "@/app/[lang]/surgery/_components/common/DateFilter";
import { StatusToggle } from "@/app/[lang]/surgery/_components/common/StatusToggle";
import ViewModeToggle from "@/app/[lang]/surgery/_components/common/ViewModeToggle";
import { useState, useMemo } from "react";
import NewButton from "@/components/common/new-button";
import FilterButton from "@/components/common/filter-button";
import { DateRangeDropdown } from "@/app/[lang]/surgery/dashboard/_components/UI/DateRangeDropdown";
import { DateRange } from "react-day-picker";
import { Column } from "@/components/common/data-table/ResponsiveDataTable";

interface TemplateData {
    id: string;
    templateName: string;
    procedure: string;
    leadSurgeon: {
        name: string;
        department: string;
    };
    createdOn: string;
    createdBy: {
        name: string;
        department: string;
    };
    status: "Active" | "Inactive";
}

// Mock Data for Templates
const MOCK_TEMPLATES: TemplateData[] = [
    {
        id: "1",
        templateName: "Cardiac Bypass Standard",
        procedure: "Coronary Artery Bypass",
        leadSurgeon: { name: "Dr. Sarah Smith", department: "Cardiology" },
        createdOn: "2024-01-15 09:30 AM",
        createdBy: { name: "Dr. James Wilson", department: "Cardiology" },
        status: "Active"
    },
    {
        id: "2",
        templateName: "Appendectomy Routine",
        procedure: "Laparoscopic Appendectomy",
        leadSurgeon: { name: "Dr. Mike Chen", department: "General Surgery" },
        createdOn: "2024-02-01 02:15 PM",
        createdBy: { name: "Admin System", department: "Administration" },
        status: "Active"
    },
    {
        id: "3",
        templateName: "Knee Replacement Prep",
        procedure: "Total Knee Arthroplasty",
        leadSurgeon: { name: "Dr. Emily Wong", department: "Orthopedics" },
        createdOn: "2023-11-20 11:45 AM",
        createdBy: { name: "Dr. Sarah Smith", department: "Orthopedics" },
        status: "Inactive"
    },
    {
        id: "4",
        templateName: "Cataract Surgery Flow",
        procedure: "Phacoemulsification",
        leadSurgeon: { name: "Dr. John Doe", department: "Ophthalmology" },
        createdOn: "2024-03-10 08:00 AM",
        createdBy: { name: "Admin System", department: "Administration" },
        status: "Active"
    },
    {
        id: "5",
        templateName: "Hernia Repair Fast",
        procedure: "Inguinal Hernia Repair",
        leadSurgeon: { name: "Dr. Lisa Ray", department: "General Surgery" },
        createdOn: "2024-01-05 04:30 PM",
        createdBy: { name: "Dr. Mike Chen", department: "General Surgery" },
        status: "Active"
    }
];

export default function TemplatesList() {
    const router = useRouter();

    // State
    const [searchType, setSearchType] = useState({ label: "Template Name", value: "templateName" });
    const [searchValue, setSearchValue] = useState("");
    const [sortOrder, setSortOrder] = useState<"nearest" | "farthest">("nearest");
    const [isCalendarView, setIsCalendarView] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    // Filter States
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    // Memoized Filter Options
    const departments = useMemo(() => {
        const uniqueValues = new Set(MOCK_TEMPLATES.map((t) => t.leadSurgeon.department));
        return Array.from(uniqueValues);
    }, []);

    const doctors = useMemo(() => {
        const uniqueValues = new Set(MOCK_TEMPLATES.map((t) => t.leadSurgeon.name));
        return Array.from(uniqueValues);
    }, []);

    const searchOptions = [
        { label: "Template Name", value: "templateName" },
        { label: "Procedure", value: "procedure" },
        { label: "Surgeon", value: "surgeon" },
    ];

    const columns: Column<TemplateData>[] = [
        {
            key: "templateName",
            label: "Template Name",
        },
        {
            key: "procedure",
            label: "Procedure",
        },
        {
            key: "leadSurgeon",
            label: "Lead Surgeon",
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        {row.leadSurgeon.name}
                    </span>
                    <span className="text-xs text-slate-500">
                        {row.leadSurgeon.department}
                    </span>
                </div>
            )
        },
        {
            key: "createdOn",
            label: "Created On",
            render: (row) => {
                const [date, ...timeParts] = row.createdOn.split(' ');
                const time = timeParts.join(' ');
                return (
                    <div className="flex flex-col">
                        <span className="text-sm text-slate-700">{date} {time}</span>
                    </div>
                );
            }
        },
        {
            key: "createdBy",
            label: "Created By",
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        {row.createdBy.name}
                    </span>
                    <span className="text-xs text-slate-500">
                        {row.createdBy.department}
                    </span>
                </div>
            )
        },
        {
            key: "status",
            label: "Status",
            render: (row) => (
                <span
                    className={`
                  ${row.status === 'Active'
                            ? 'text-emerald-600'
                            : 'text-rose-600'}
                  font-medium
                `}
                >
                    {row.status}
                </span>
            )
        },
        {
            key: "actions",
            label: "Action",
            render: () => (
                <ActionMenu actions={[
                    {
                        label: "View",
                        // onClick: () => {
                        //     router.push(`/surgery/dashboard/surgery-details/${row.id}`);
                        // }
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
            )
        }
    ];

    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1 className="font-medium text-base text-slate-800">Templates</h1>

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
                    <FilterButton onClick={() => { }} className="bg-blue-500 text-white hover:bg-blue-600 border-none" />
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
                            onSearchChange={setSearchValue}
                            placeholder="Search Templates"
                        />
                    </div>

                    {/* Quick filter (Sort) */}
                    <DateFilter
                        sortOrder={sortOrder}
                        onSortChange={setSortOrder}
                    />

                    {/* Add Button */}
                    <NewButton
                        name="Create Template"
                        className="h-9 text-sm"
                        handleClick={() => {
                            router.push("/surgery/templates/new");
                        }}
                    ></NewButton>

                    {/* View mode toggle */}
                    <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={MOCK_TEMPLATES}
            // onRowClick={(row) => router.push(`/surgery/dashboard/templates/${row.id}`)}
            />
        </div>
    );
}

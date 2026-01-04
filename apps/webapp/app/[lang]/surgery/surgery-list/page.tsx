"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/common/data-table";
import ActionMenu from "@/components/common/action-menu";
import {
    Calendar,
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
import { useState, useMemo } from "react";
import NewButton from "@/components/common/new-button";
import FilterButton from "@/components/common/filter-button";
import { DateRangeDropdown } from "@/app/[lang]/surgery/dashboard/_components/UI/DateRangeDropdown";
import { DateRange } from "react-day-picker";

interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
}

interface SurgeryData {
    id: string;
    patient: {
        name: string;
        age: number;
        gender: string;
        mrn: string;
    };
    requestedDoctor: {
        name: string;
        specialty: string;
    };
    procedure: string;
    surgeon: {
        name: string;
        department: string;
    };
    requestedFor: string; // Date
    urgency: "Elective" | "Urgent" | "Emergency";
    status: "Active" | "Inactive";
    surgeryScheduled?: boolean;
}

// Custom Mock Data for Surgeries
const SURGERIES_DATA: SurgeryData[] = [
    {
        id: "1",
        patient: { name: "Sarah Williams", age: 55, gender: "F", mrn: "MRN-123" },
        requestedDoctor: { name: "Dr. James Wilson", specialty: "Cardiology" },
        procedure: "Coronary Artery Bypass",
        surgeon: { name: "Dr. Sarah Smith", department: "Cardiology" },
        requestedFor: "2024-01-20",
        urgency: "Urgent",
        status: "Active",
        surgeryScheduled: true
    },
    {
        id: "2",
        patient: { name: "Michael Brown", age: 42, gender: "M", mrn: "MRN-456" },
        requestedDoctor: { name: "Dr. Emily Davis", specialty: "Orthopedics" },
        procedure: "ACL Reconstruction",
        surgeon: { name: "Dr. Mike Chen", department: "Orthopedics" },
        requestedFor: "2024-02-15",
        urgency: "Elective",
        status: "Active",
        surgeryScheduled: false
    },
    {
        id: "3",
        patient: { name: "Emma Wilson", age: 28, gender: "F", mrn: "MRN-789" },
        requestedDoctor: { name: "Dr. Robert Lee", specialty: "Neurology" },
        procedure: "Brain Tumor Resection",
        surgeon: { name: "Dr. Emily Wong", department: "Neurology" },
        requestedFor: "2023-11-25",
        urgency: "Emergency",
        status: "Inactive"
    },
    {
        id: "4",
        patient: { name: "David Miller", age: 12, gender: "M", mrn: "MRN-101" },
        requestedDoctor: { name: "Dr. Susan Clark", specialty: "Pediatrics" },
        procedure: "Appendectomy",
        surgeon: { name: "Dr. John Doe", department: "Pediatrics" },
        requestedFor: "2024-03-12",
        urgency: "Emergency",
        status: "Active"
    },
    {
        id: "5",
        patient: { name: "Linda Johnson", age: 60, gender: "F", mrn: "MRN-202" },
        requestedDoctor: { name: "Dr. Karen White", specialty: "General Surgery" },
        procedure: "Gallbladder Removal",
        surgeon: { name: "Dr. Lisa Ray", department: "General Surgery" },
        requestedFor: "2024-01-10",
        urgency: "Elective",
        status: "Active"
    }
];

export default function SurgeryList() {
    const router = useRouter();
    const [selectedTeam, setSelectedTeam] = useState("");
    const [searchType, setSearchType] = useState({ label: "MRN", value: "mrn" });
    const [searchValue, setSearchValue] = useState("");
    // const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
    const [sortOrder, setSortOrder] = useState<"nearest" | "farthest">("nearest");
    const [isCalendarView, setIsCalendarView] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    const departments = useMemo(() => {
        const uniqueValues = new Set(SURGERIES_DATA.map((t) => t.surgeon.department));
        return Array.from(uniqueValues);
    }, []);

    const doctors = useMemo(() => {
        const uniqueValues = new Set(SURGERIES_DATA.map((t) => t.requestedDoctor.name));
        return Array.from(uniqueValues);
    }, []);

    // Filter states
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const searchOptions = [
        { label: "MRN", value: "mrn" },
        { label: "Name", value: "name" },
        { label: "Surgery", value: "surgery" },
    ];

    const columns: Column<SurgeryData>[] = [
        {
            key: "patient",
            label: "Patient",
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        {row.patient.name}
                    </span>
                    <span className="text-xs text-slate-500">
                        {row.patient.mrn} • {row.patient.age}y • {row.patient.gender}
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
                        {row.requestedDoctor.name}
                    </span>
                    <span className="text-xs text-slate-500">
                        {row.requestedDoctor.specialty}
                    </span>
                </div>
            )
        },
        {
            key: "procedure",
            label: "Procedure",
            render: (row) => (
                <span className="text-sm text-slate-700 font-medium">
                    {row.procedure}
                </span>
            )
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
            render: (row) => (
                <span className="text-sm text-slate-700">
                    {row.requestedFor}
                </span>
            )
        },
        {
            key: "urgency",
            label: "Urgency",
            render: (row) => (
                <span
                    className={`
                  ${row.urgency === 'Emergency'
                            ? 'text-rose-600'
                            : row.urgency === 'Urgent'
                                ? 'text-orange-600'
                                : 'text-emerald-600'}
                  text-xs
                `}
                >
                    {row.urgency}
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
                            onSearchChange={setSearchValue}
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
                            // No action as requested
                        }}
                    ></NewButton>

                    {/* View mode toggle */}
                    <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={SURGERIES_DATA}
                onRowClick={(row) => {
                    if (row.surgeryScheduled) {
                        router.push(`/surgery/dashboard/surgery-details/${row.id}`);
                    } else {
                        router.push(`/surgery/dashboard/surgery-details/new`);
                    }
                }}
            />
        </div>
    );
}

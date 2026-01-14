"use client";

import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { Surgery } from "@/lib/api/surgery/surgeries";
import { useSurgeries } from "@/app/[lang]/surgery/_hooks/useSurgery";
import { SurgeryRow } from "@/app/[lang]/surgery/_lib/types";
import { ResponsiveDataTable, type Column } from "@/components/common/data-table/ResponsiveDataTable";
import { PaginationControls } from "@/components/common/data-table/PaginationControls";
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
import { useDictionary } from "@/i18n/use-dictionary";
import { AppointmentPatientCell } from "@/components/common/pasient-card/appointment-patient-cell";
import { StatusPill } from "@/components/common/pasient-card/status-pill";
import { TimeRoomInfo } from "@/components/common/pasient-card/time-room-info";


export default function SurgeryList() {
    const router = useRouter();
    const { lang } = useParams();
    const dict = useDictionary();
    const scheduleDict = dict.pages.surgery.otSchedule;
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

    const {
        data: responseData,
        isLoading,
        error,
        refetch,
    } = useSurgeries({
        page,
        limit,
        search: searchQuery || undefined,
        status: selectedStatus || undefined,
        department: selectedDept || undefined,
    });

    const surgeries = useMemo(() => {
        return responseData?.data || [];
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
        { label: "Status", value: "status" },
    ];

    // Map API data to table rows
    const tableData: SurgeryRow[] = surgeries.map((surgery: Surgery) => ({
        id: surgery.id,
        otRoom: (surgery as any).ot_room_id ? `${dict.pages.surgery.common.prefixes.otRoom}${(surgery as any).ot_room_id}` : ((surgery as any).ot_room || "OT-1"),
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

    const columns: Column<SurgeryRow>[] = [
        {
            key: "otRoom",
            label: scheduleDict.columns.otRoom || "OT Room",
        },
        {
            key: "patient",
            label: scheduleDict.columns.patient,
            render: (row) => (
                <AppointmentPatientCell
                    name={row.patient.name}
                    mrn={row.patient.mrn}
                    avatar={row.patient.avatarUrl}
                    vip={row.patient.vip}
                />
            )
        },
        // {
        //     key: "requestedDoctor",
        //     label: scheduleDict.columns.requestedDoctor,
        //     render: (row) => (
        //         <div className="flex flex-col">
        //             <span className="text-sm font-medium text-slate-700">
        //                 {row.doctor?.first_name} {row.doctor?.last_name}
        //             </span>
        //             <span className="text-xs text-slate-500">
        //                 {row.department}
        //             </span>
        //         </div>
        //     )
        // },
        {
            key: "procedure",
            label: scheduleDict.columns.procedure,
            render: (row) => (
                <span className="text-sm text-slate-700 font-medium">
                    {row.procedure}
                </span>
            )
        },
        {
            key: "surgeon",
            label: scheduleDict.columns.surgeon,
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        {row.surgeon}
                    </span>
                    <span className="text-xs text-slate-500">
                        {row.specialty}
                    </span>
                </div>
            )
        },
        {
            key: "time",
            label: scheduleDict.columns.requestedFor,
            render: (row) => (
                <TimeRoomInfo
                    time={row.time}
                />
            )
        },
        {
            key: "status",
            label: scheduleDict.columns.status || "Status",
            render: (row) => (
                <StatusPill status={row.status} />
            )
        },
        {
            key: "actions",
            label: dict.table.action,
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
                        // onClick: () => { }
                    }
                ]} className="bg-transparent hover:bg-transparent text-blue-500" />
            )
        }
    ];


    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1 className="font-medium text-base">{scheduleDict.surgeryList}</h1>

                {/* Filters + Calendar toggle */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 w-full">
                        <DateRangeDropdown
                            label={scheduleDict.dateRange}
                            value={dateRange}
                            onSelect={setDateRange}
                        />
                        <FilterDropdown
                            icon={<BriefcaseMedical size={16} />}
                            label={dict.pages.surgery.common.department}
                            options={departments}
                            value={selectedDept}
                            onSelect={setSelectedDept}
                        />
                        <FilterDropdown
                            icon={<Stethoscope size={16} />}
                            label={dict.pages.surgery.common.doctor}
                            options={doctors}
                            value={selectedDoctor}
                            onSelect={setSelectedDoctor}
                        />
                        <FilterDropdown
                            icon={<Ellipsis size={16} />}
                            label={dict.common.status}
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
                                {dict.pages.surgery.common.calendarView}
                            </>
                        }
                    />
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 my-2">
                <div className="flex shrink-0 items-center gap-3">
                    <FilterButton onClick={() => refetch()} className="bg-blue-500 text-white hover:none" />
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
                            placeholder={dict.common.search}
                        />
                    </div>

                    {/* Quick filter (Sort) */}
                    <DateFilter
                        sortOrder={sortOrder}
                        onSortChange={setSortOrder}
                    />

                    {/* Add Button */}
                    {/* <NewButton
                        name={dict.pages.surgery.otSchedule.addSurgery}
                        className="h-9 text-sm"
                        handleClick={() => {
                            router.push(`/${lang}/surgery/dashboard/surgery-details/new`);
                        }}
                    ></NewButton> */}

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
                    data={tableData}
                    loading={isLoading}
                    striped
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

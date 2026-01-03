"use client";

import { Button } from "@workspace/ui/components/button";
import { DataTable } from "@/components/common/data-table";
import FilterButton from "@/components/common/filter-button";
import {
    Search,
    Grid,
    List as ListIcon,
    MoreVertical,
    Phone,
    Clock,
    Stethoscope,
    Calendar,
    Plus
} from "lucide-react";
import Image from "next/image";
import { OPDEntry, OPDFilterState } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";

interface OPDQueueViewProps {
    data: OPDEntry[];
    loading: boolean;
    viewMode: "list" | "grid";
    setViewMode: (mode: "list" | "grid") => void;
    filters: OPDFilterState;
    onFilterChange: (key: keyof OPDFilterState, value: string) => void;
    onClearFilters: () => void;
    isCompletedView?: boolean;
}

export function OPDQueueView({
    data,
    loading,
    viewMode,
    setViewMode,
    filters,
    onFilterChange,
    onClearFilters,
    isCompletedView = false,
}: OPDQueueViewProps) {

    // Helper for Status Colors in Grid View
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Booked":
                return "bg-[#FFF6E9] text-[#AF5A62]";
            case "Confirmed":
                return "bg-[#E6FFFA] text-[#2CB470]";
            case "Checked-In":
                return "bg-[#F3E8FF] text-[#A855F7]";
            case "Completed":
                return "bg-gray-100 text-gray-600";
            case "Cancelled":
                return "bg-red-50 text-red-600";
            case "Waiting":
                return "bg-orange-50 text-orange-600";
            case "In Consultation":
                return "bg-red-50 text-red-500";
            case "Called":
                return "bg-pink-50 text-pink-500";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    // Columns for List View
    const columns = [
        {
            key: "tokenNo",
            label: "Token No",
            render: (row: OPDEntry) => (
                <div className="flex items-center">
                    {/* Square-ish Token Badge - Dynamic & Padded */}
                    <div className="h-10 w-12 bg-[#0095FF] hover:bg-[#0080DD] text-white rounded-lg flex items-center justify-center font-medium shadow-sm">
                        {row.tokenNo}
                    </div>
                </div>
            )
        },
        {
            key: "patient",
            label: "Patient Name",
            render: (row: OPDEntry) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-gray-100">
                        <AvatarImage src={row.patientImg} />
                        <AvatarFallback className="bg-orange-100 text-orange-600 font-medium">
                            {row.patientName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="font-semibold text-sm text-gray-900">{row.patientName}</div>
                        </div>
                        <div className="text-xs text-gray-500 flex gap-1">
                            <span>{row.mrn}</span>
                            <span className="text-blue-500">| {row.visitId}</span>
                            <span className="text-gray-400">| Visit ID-1000</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "doctor",
            label: "Doctor",
            render: (row: OPDEntry) => (
                <div>
                    <div className="text-sm font-medium text-gray-900">{row.doctorName}</div>
                    <div className="text-xs text-gray-500">{row.specialty}</div>
                </div>
            )
        },
        {
            key: "date",
            label: "Date",
            render: (row: OPDEntry) => (
                <div className="text-sm text-gray-700">{row.date}</div>
            )
        },
        {
            key: "time",
            label: "Time",
            render: (row: OPDEntry) => (
                <div className="text-sm text-gray-700">{row.time}</div>
            )
        },
        {
            key: "bookingType",
            label: "Booking Type",
            render: (row: OPDEntry) => (
                <span className="text-xs text-[#2CB470] font-medium">
                    {row.bookingType}
                </span>
            )
        },
        {
            key: "priorityType",
            label: "Priority Type",
            render: (row: OPDEntry) => (
                <div className="text-sm text-gray-700">{row.priorityType}</div>
            )
        },
        {
            key: "status",
            label: "Status",
            render: (row: OPDEntry) => {
                let colorClass = "text-[#E36868]";
                if (row.status === "Waiting") colorClass = "text-orange-500";
                return (
                    <span className={`text-xs font-medium ${colorClass}`}>
                        {row.status}
                    </span>
                )
            }
        },
        {
            key: "action",
            label: "Action",
            render: (row: OPDEntry) => (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            )
        }
    ];

    // Columns for Completed View
    const getCompletedColumns = () => [
        {
            key: "date",
            label: "Follow-Up Date",
            render: (row: OPDEntry) => (
                <div className="text-sm text-gray-700">{row.date} <span className="text-gray-500">{row.time}</span></div>
            )
        },
        {
            key: "patient",
            label: "Patient",
            render: (row: OPDEntry) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-gray-100">
                        <AvatarImage src={row.patientImg} />
                        <AvatarFallback className="bg-orange-100 text-orange-600 font-medium">
                            {row.patientName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            {row.priorityType === 'VIP' && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1 rounded">VIP</span>}
                            <div className="font-semibold text-sm text-gray-900">{row.patientName}</div>
                        </div>
                        <div className="text-xs text-blue-500">{row.mrn} <span className="text-gray-400">| {row.visitId}</span></div>
                    </div>
                </div>
            )
        },
        {
            key: "visit",
            label: "Visit",
            render: () => <span className="text-sm text-gray-700">OPD</span>
        },
        {
            key: "doctor",
            label: "Doctor",
            render: (row: OPDEntry) => (
                <div>
                    <div className="text-sm font-medium text-gray-900">{row.doctorName}</div>
                    <div className="text-xs text-gray-500">{row.specialty}</div>
                </div>
            )
        },
        {
            key: "reason",
            label: "Reason",
            render: (row: OPDEntry) => <span className="text-sm text-gray-700">{row.reason || "-"}</span>
        },
        {
            key: "type",
            label: "Type",
            render: (row: OPDEntry) => <span className="text-sm text-gray-700">{row.type || "In-person"}</span>
        },
        {
            key: "createdOn",
            label: "Created On",
            render: (row: OPDEntry) => <span className="text-sm text-gray-700">{row.createdOn || row.date}</span>
        },
        {
            key: "status",
            label: "Status",
            render: (row: OPDEntry) => {
                let colorClass = "bg-green-500 text-white"; // Completed default
                if (row.status === "Pending") colorClass = "bg-orange-500 text-white";
                if (row.status === "Missed") colorClass = "bg-red-500 text-white";
                if (row.status === "Completed") colorClass = "bg-[#2CB470] text-white";

                return (
                    <span className={`text-xs px-3 py-1 rounded-full ${colorClass}`}>
                        {row.status}
                    </span>
                )
            }
        },
        {
            key: "action",
            label: "Action",
            render: (row: OPDEntry) => (
                <div className="flex items-center gap-1 cursor-pointer">
                    <span className="text-blue-500 text-sm">Action</span>
                    <MoreVertical className="w-4 h-4 text-green-500" />
                </div>
            )
        }
    ];

    const activeColumns = isCompletedView ? getCompletedColumns() : columns;

    return (
        <>
            {/* Tabs / Filter Pills Row */}
            <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar py-1">
                    <Button className="rounded-full bg-[#0095FF] hover:bg-[#0080DD] text-white px-6 h-9 font-normal text-sm">
                        All
                    </Button>
                    <Button variant="outline" className="rounded-full border-gray-200 bg-white text-gray-600 px-6 h-9 font-normal text-sm hover:bg-gray-50">
                        New Consultation
                    </Button>
                    <Button variant="outline" className="rounded-full border-gray-200 bg-white text-gray-600 px-6 h-9 font-normal text-sm hover:bg-gray-50">
                        VIP Appointments
                    </Button>
                    <Button variant="outline" className="rounded-full border-gray-200 bg-white text-gray-600 px-6 h-9 font-normal text-sm hover:bg-gray-50">
                        Follow Up
                    </Button>
                    {/* Emergency Button with fixed badge positioning */}
                    <Button variant="outline" className="relative rounded-full border-gray-200 bg-white text-gray-600 px-6 h-9 font-normal text-sm hover:bg-gray-50 overflow-visible">
                        Emergency
                        <span className="absolute -top-[6px] -right-[2px] bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-sm z-10">
                            1
                        </span>
                    </Button>
                </div>
            </div>

            {/* Action Bar Row: Filter, Search, Action Buttons */}
            <div className="flex flex-col xl:flex-row gap-4 items-center justify-between pt-2">
                {/* Left Filter Button */}
                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <FilterButton
                        onClick={onClearFilters}
                        onClear={onClearFilters}
                        filters={{
                            department: filters.department,
                            doctor: filters.doctor,
                            status: filters.status === 'all' ? undefined : filters.status,
                            dateFilter: filters.dateRange === 'today' ? undefined : filters.dateRange
                        }}
                    />
                </div>


                {/* Right Search & Actions */}
                <div className="flex items-center gap-3 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 no-scrollbar ml-auto">
                    {/* Search Box */}
                    <div className="relative flex items-center bg-white rounded-full border border-blue-100 px-4 h-10 shadow-sm w-[300px] shrink-0">
                        <input
                            placeholder="Search"
                            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400"
                            value={filters.search}
                            onChange={(e) => onFilterChange("search", e.target.value)}
                        />
                        <Search className="w-4 h-4 text-blue-500" />
                    </div>

                    <Button variant="outline" className="rounded-full h-10 border-blue-100 bg-white text-gray-700 font-medium gap-1 min-w-[90px] shadow-sm hover:bg-gray-50 shrink-0">
                        Quick <Image src="/images/unfold_more.svg" alt="Quick" width={14} height={14} className="w-3.5 h-3.5" />
                    </Button>

                    {isCompletedView && (
                        <Button className="rounded-full h-10 bg-[#2CB470] hover:bg-[#28a063] text-white font-medium pl-5 pr-1 gap-3 shadow-sm shrink-0 ml-2 border-none">
                            <span className="text-sm">Add Follow-Up Visit</span>
                            <div className="h-8 w-8 bg-[#52C58C] rounded-full flex items-center justify-center">
                                <div className="h-5 w-5 bg-white rounded-full flex items-center justify-center">
                                    <Plus className="w-3.5 h-3.5 text-[#2CB470]" strokeWidth={2.5} />
                                </div>
                            </div>
                        </Button>
                    )}

                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 ml-2 shadow-sm shrink-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 rounded-md ${viewMode === 'list' ? 'bg-[#2CB470] text-white hover:bg-[#259b60] hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                            onClick={() => setViewMode("list")}
                        >
                            <ListIcon className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 rounded-md ${viewMode === 'grid' ? 'bg-[#2CB470] text-white hover:bg-[#259b60] hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                            onClick={() => setViewMode("grid")}
                        >
                            <Grid className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {viewMode === "list" ? (
                <div className="rounded-t-xl overflow-hidden mt-4 [&_thead_th]:font-normal">
                    <DataTable
                        columns={activeColumns}
                        data={data}
                        loading={loading}
                        striped={false}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {data.map((patient) => (
                        <div key={patient.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow relative">
                            {/* Top Row: App ID & Status */}
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-sm font-medium text-gray-600">{patient.visitId}</span>
                                {/* More Options */}
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(patient.status)}`}>
                                        {patient.status}
                                    </span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-600">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Patient Profile */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative shrink-0">
                                    {patient.priorityType === 'VIP' && (
                                        <div className="absolute -top-1 -left-1 z-10 w-5 h-5 rounded-full flex items-center justify-center bg-[#FFF9C4]">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#FACC15" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" stroke="#B45309" strokeWidth="1" />
                                            </svg>
                                        </div>
                                    )}
                                    <Avatar className="h-14 w-14 border-2 border-green-500 p-0.5">
                                        <AvatarImage src={patient.patientImg} className="rounded-full object-cover" />
                                        <AvatarFallback className="bg-blue-100 text-blue-600">
                                            {patient.patientName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 text-base truncate">{patient.patientName}</h3>
                                    <p className="text-sm text-gray-500 truncate">{patient.mrn}</p>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="space-y-3 mb-2 relative">
                                {/* Date & Time */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                        <span>{patient.date} {patient.time}</span>
                                    </div>
                                    {patient.priorityType === 'VIP' && <span className="text-sm font-semibold text-gray-500">VIP</span>}
                                </div>

                                {/* Type */}
                                <div className="flex items-center text-sm text-green-600 font-medium">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>{patient.bookingType}</span>
                                </div>

                                {/* Doctor - with Call Button aligned right */}
                                <div className="flex items-start justify-between mt-4">
                                    <div className="flex items-start">
                                        <Stethoscope className="w-4 h-4 mr-2 text-blue-500 mt-1" />
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{patient.doctorName}</p>
                                            <p className="text-gray-500 text-xs">{patient.specialty}</p>
                                        </div>
                                    </div>
                                    <Button size="icon" className="bg-[#2CB470] hover:bg-[#259b60] text-white rounded-xl h-10 w-10 shadow-sm">
                                        <Phone className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

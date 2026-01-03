"use client";

import { useState } from "react";
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
    Activity
} from "lucide-react";
import Image from "next/image";
import { InstructionEntry, InstructionFilterState } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { NURSE_TASKS_DATA, LAB_ORDERS_DATA } from "../mock-data";

interface DoctorInstructionsViewProps {
    loading: boolean;
    viewMode: "list" | "grid";
    setViewMode: (mode: "list" | "grid") => void;
    searchQuery: string;
    onSearchChange: (val: string) => void;
    onClearFilters: () => void;
    filters?: any;
    // Data Props injection
    nurseTasks?: InstructionEntry[];
    labOrders?: InstructionEntry[];
    radiologyOrders?: InstructionEntry[];
    surgeryRequests?: InstructionEntry[];
    followUps?: InstructionEntry[];
    referrals?: InstructionEntry[];
}

const TABS = [
    { label: "Nurse Clinical Tasks", value: "Nurse Clinical Tasks", count: 3 },
    { label: "Laboratory Orders", value: "Laboratory Orders", count: 3 },
    { label: "Radiology Orders", value: "Radiology Orders", count: 3 },
    { label: "Surgery / OT Requests", value: "Surgery / OT Requests", count: 3 },
    { label: "Follow Up Required", value: "Follow Up Required", count: 3 },
    { label: "Referral", value: "Referral", count: 3 },
];

export function DoctorInstructionsView({
    loading,
    viewMode,
    setViewMode,
    searchQuery,
    onSearchChange,
    onClearFilters,
    filters = {},
    nurseTasks,
    labOrders,
    radiologyOrders,
    surgeryRequests,
    followUps,
    referrals
}: DoctorInstructionsViewProps) {
    const [activeTab, setActiveTab] = useState<string>("Nurse Clinical Tasks");

    // Dynamic Data Source
    const getData = () => {
        switch (activeTab) {
            case "Nurse Clinical Tasks": return nurseTasks || NURSE_TASKS_DATA;
            case "Laboratory Orders": return labOrders || LAB_ORDERS_DATA;
            // Add others as needed or fallback to empty
            case "Radiology Orders": return radiologyOrders || [];
            case "Surgery / OT Requests": return surgeryRequests || [];
            case "Follow Up Required": return followUps || [];
            case "Referral": return referrals || [];
            default: return [];
        }
    };

    const data = getData(); // In real app, this would be fetched based on tab

    // Columns Definition
    const getNurseColumns = () => [
        {
            key: "patient",
            label: "Patient Name",
            render: (row: InstructionEntry) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-gray-100">
                        <AvatarImage src={row.patientImg} />
                        <AvatarFallback className="bg-orange-100 text-orange-600 font-medium">{row.patientName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold text-sm text-gray-900">{row.patientName}</div>
                        <div className="text-xs text-blue-500">{row.mrn} <span className="text-gray-400">| {row.visitId}</span></div>
                    </div>
                </div>
            )
        },
        {
            key: "nurse",
            label: "Nurse",
            render: (row: InstructionEntry) => (
                <div>
                    <div className="font-semibold text-sm text-gray-900">{row.nurseName}</div>
                    <div className="text-xs text-gray-500">{row.nurseRole}</div>
                </div>
            )
        },
        { key: "orderType", label: "Order Type", render: (row: InstructionEntry) => <span className="text-sm text-gray-700">{row.orderType}</span> },
        { key: "description", label: "Order Type (Desc)", render: (row: InstructionEntry) => <span className="text-sm text-gray-500">{row.description}</span> }, // "Order Type" header is duplicated in image? Let's use Description
        { key: "frequency", label: "Frequency", render: (row: InstructionEntry) => <span className="text-sm text-gray-700">{row.frequency}</span> },
        { key: "dateTime", label: "Date Time", render: (row: InstructionEntry) => <span className="text-sm text-gray-700">{row.dateTime}</span> },
        {
            key: "orderedBy",
            label: "Ordered By",
            render: (row: InstructionEntry) => (
                <div>
                    <div className="font-semibold text-sm text-gray-900">{row.doctorName}</div>
                    <div className="text-xs text-gray-500">{row.specialty}</div>
                </div>
            )
        },
        { key: "priority", label: "Priority", render: (row: InstructionEntry) => <span className="text-sm text-orange-500 font-medium">{row.priority}</span> },
        {
            key: "status",
            label: "Status",
            render: (row: InstructionEntry) => (
                <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">{row.status}</span>
            )
        },
        {
            key: "action",
            label: "Action",
            render: () => <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4 text-gray-400" /></Button>
        }
    ];

    const getLabColumns = () => [
        {
            key: "patient",
            label: "Patient",
            render: (row: InstructionEntry) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-gray-100">
                        <AvatarImage src={row.patientImg} />
                        <AvatarFallback className="bg-orange-100 text-orange-600 font-medium">{row.patientName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold text-sm text-gray-900">{row.patientName}</div>
                        <div className="text-xs text-blue-500">{row.mrn} <span className="text-gray-400">| {row.visitId}</span></div>
                    </div>
                </div>
            )
        },
        {
            key: "orderedDoctor",
            label: "Ordered Doctor",
            render: (row: InstructionEntry) => (
                <div>
                    <div className="font-semibold text-sm text-gray-900">{row.doctorName}</div>
                    <div className="text-xs text-gray-500">{row.specialty}</div>
                </div>
            )
        },
        { key: "orderedDate", label: "Ordered Date", render: (row: InstructionEntry) => <span className="text-sm text-gray-700">{row.orderedDate}</span> },
        { key: "testName", label: "Test Name", render: (row: InstructionEntry) => <span className="text-sm text-gray-700">{row.testName}</span> },
        { key: "category", label: "Category", render: (row: InstructionEntry) => <span className="text-sm text-gray-700">{row.category}</span> },
        { key: "urgency", label: "Urgency", render: (row: InstructionEntry) => <span className="text-sm text-blue-500 font-medium">{row.urgency}</span> },
        {
            key: "status",
            label: "Status",
            render: (row: InstructionEntry) => (
                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">{row.status}</span>
            )
        },
        {
            key: "action",
            label: "Action",
            render: () => <span className="text-blue-500 text-sm font-medium cursor-pointer">Action</span>
        }
    ];

    const columns = activeTab === "Laboratory Orders" ? getLabColumns() : getNurseColumns();

    return (
        <>
            {/* Tabs / Filter Pills Row */}
            <div className="flex flex-col xl:flex-row gap-4 items-center justify-between mb-2">
                <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar py-1">
                    {TABS.map((tab) => (
                        <Button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            variant={activeTab === tab.value ? "default" : "outline"}
                            className={`rounded-full h-9 font-normal text-sm px-4 gap-2 ${activeTab === tab.value
                                ? "bg-[#0095FF] hover:bg-[#0080DD] text-white"
                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            {tab.label}
                            <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${activeTab === tab.value ? "bg-white text-[#0095FF]" : "bg-red-500 text-white"
                                }`}>
                                {tab.count}
                            </span>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Action Bar Row */}
            <div className="flex flex-col xl:flex-row gap-4 items-center justify-between pt-2">
                {/* Left Filter Button */}
                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <FilterButton
                        // Generic filter button used here, potentially passing different filters for Instructions?
                        // For now reusing same as queue but sticking to basic clearing
                        onClick={onClearFilters}
                        onClear={onClearFilters}
                        filters={{
                            department: filters?.department,
                            doctor: filters?.doctor,
                            status: filters?.status === 'all' ? undefined : filters?.status,
                            dateFilter: filters?.dateRange === 'today' ? undefined : filters?.dateRange
                        }}
                    />
                </div>

                {/* Right Search & Actions */}
                <div className="flex items-center gap-3 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 no-scrollbar ml-auto">
                    <div className="relative flex items-center bg-white rounded-full border border-blue-100 px-4 h-10 shadow-sm w-[300px] shrink-0">
                        <input
                            placeholder="Search"
                            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                        <Search className="w-4 h-4 text-blue-500" />
                    </div>
                    <Button variant="outline" className="rounded-full h-10 border-blue-100 bg-white text-gray-700 font-medium gap-1 min-w-[90px] shadow-sm hover:bg-gray-50 shrink-0">
                        Quick <Image src="/images/unfold_more.svg" alt="Quick" width={14} height={14} className="w-3.5 h-3.5" />
                    </Button>
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
                        columns={columns}
                        data={data}
                        loading={loading}
                        striped={false}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {data.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow relative">
                            {/* Grid Item for Instructions - Adapted Card */}
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-sm font-medium text-gray-600">{item.visitId}</span>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                        {item.status}
                                    </span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-600">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <Avatar className="h-12 w-12 border border-gray-200">
                                    <AvatarImage src={item.patientImg} />
                                    <AvatarFallback className="bg-blue-100 text-blue-600">
                                        {item.patientName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 text-base truncate">{item.patientName}</h3>
                                    <p className="text-sm text-gray-500 truncate">{item.mrn}</p>
                                </div>
                            </div>

                            <div className="space-y-2 mb-2">
                                <div className="text-sm">
                                    <span className="text-gray-500 block text-xs">Doctor</span>
                                    <span className="font-medium text-gray-900">{item.doctorName}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="text-gray-500 block text-xs">Task/Test</span>
                                    <span className="font-medium text-gray-900">{item.testName || item.orderType}</span>
                                </div>
                                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Clock className="w-3.5 h-3.5 mr-1" />
                                        <span>{item.dateTime || item.orderedDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

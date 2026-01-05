"use client";

import { useState, useEffect } from "react";
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
import { createNurseOrdersApiClient } from "@/lib/api/doctor/nurse-orders-api";

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

// TABS will be defined inside component to use dynamic counts

export function DoctorInstructionsView({
    loading: parentLoading,
    viewMode,
    setViewMode,
    searchQuery,
    onSearchChange,
    onClearFilters,
    filters = {},
    nurseTasks: propNurseTasks,
    labOrders,
    radiologyOrders,
    surgeryRequests,
    followUps,
    referrals
}: DoctorInstructionsViewProps) {
    const [activeTab, setActiveTab] = useState<string>("Nurse Clinical Tasks");
    const [nurseTasks, setNurseTasks] = useState<InstructionEntry[]>([]);
    const [nurseTasksLoading, setNurseTasksLoading] = useState(false);

    // Fetch nurse orders when "Nurse Clinical Tasks" tab is active
    useEffect(() => {
        const fetchNurseOrders = async () => {
            if (activeTab === "Nurse Clinical Tasks") {
                setNurseTasksLoading(true);
                try {
                    const apiClient = createNurseOrdersApiClient({});
                    
                    // Prepare params based on filters
                    const params: any = {
                        page: 1,
                        limit: 100,
                    };

                    // Apply filters
                    if (filters?.status && filters.status !== "all" && filters.status !== "") {
                        params.status = filters.status;
                    }
                    if (filters?.department && filters.department !== "all-departments" && filters.department !== "") {
                        params.department_id = String(filters.department);
                    }
                    if (filters?.doctor && filters.doctor !== "all-doctors" && filters.doctor !== "") {
                        params.doctor_id = String(filters.doctor);
                    }
                    if (searchQuery && searchQuery.trim() !== "") {
                        params.search = searchQuery.trim();
                    }

                    const response = await apiClient.getAll(params);

                    if (response.data.success) {
                        // Map API response to InstructionEntry format
                        const mapped: InstructionEntry[] = response.data.data.map((order: any) => {
                            const patientName = order.patient 
                                ? `${order.patient.first_name || ""} ${order.patient.last_name || ""}`.trim()
                                : "Unknown Patient";
                            
                            const mrn = order.patient?.civil_id 
                                ? `MRN-${order.patient.civil_id}` 
                                : (order.patient_id ? `MRN-${order.patient_id}` : "N/A");

                            const visitId = order.visit_id 
                                ? `Visit ID-${order.visit_id}` 
                                : "N/A";

                            // Format order type (convert snake_case to Title Case)
                            const formatOrderType = (type: string): string => {
                                if (!type) return "N/A";
                                return type
                                    .split('_')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                    .join(' ');
                            };

                            // Get doctor name from createdBy if available
                            const doctorName = order.createdBy 
                                ? `${order.createdBy.first_name || ""} ${order.createdBy.last_name || ""}`.trim()
                                : "Unknown Doctor";

                            // Format date time
                            const dateTime = order.details?.start_date 
                                ? new Date(order.details.start_date).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                })
                                : (order.created_at 
                                    ? new Date(order.created_at).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    })
                                    : "N/A");

                            // Map urgency to priority
                            const priority: "Urgent" | "Normal" | "Routine" = 
                                order.urgency === "urgent" ? "Urgent" : 
                                order.urgency === "routine" ? "Routine" : "Normal";

                            // Map status
                            const status: "Pending" | "Completed" = 
                                order.status === "completed" ? "Completed" : "Pending";

                            return {
                                id: order.id,
                                patientName,
                                mrn,
                                visitId,
                                doctorName,
                                specialty: "General", // API doesn't provide specialty
                                nurseName: doctorName, // Using doctor name as nurse name for now
                                nurseRole: "Nurse", // Default role
                                orderType: formatOrderType(order.order_type),
                                description: order.details?.wound_location 
                                    ? `${order.details.wound_location} - ${order.notes || ""}`.trim()
                                    : (order.notes || "N/A"),
                                frequency: order.details?.frequency || "N/A",
                                dateTime,
                                priority,
                                status,
                            };
                        });

                        setNurseTasks(mapped);
                    }
                } catch (error) {
                    console.error("Failed to fetch nurse orders:", error);
                    setNurseTasks([]);
                } finally {
                    setNurseTasksLoading(false);
                }
            }
        };

        fetchNurseOrders();
    }, [activeTab, filters?.status, filters?.department, filters?.doctor, searchQuery]);

    // Dynamic Data Source
    const getData = () => {
        switch (activeTab) {
            case "Nurse Clinical Tasks": 
                // Use fetched data if available, otherwise use prop, otherwise fallback to mock
                return nurseTasks.length > 0 ? nurseTasks : (propNurseTasks || NURSE_TASKS_DATA);
            case "Laboratory Orders": return labOrders || LAB_ORDERS_DATA;
            // Add others as needed or fallback to empty
            case "Radiology Orders": return radiologyOrders || [];
            case "Surgery / OT Requests": return surgeryRequests || [];
            case "Follow Up Required": return followUps || [];
            case "Referral": return referrals || [];
            default: return [];
        }
    };

    const data = getData();
    const loading = parentLoading || (activeTab === "Nurse Clinical Tasks" && nurseTasksLoading);

    // Dynamic tabs with counts
    const TABS = [
        { label: "Nurse Clinical Tasks", value: "Nurse Clinical Tasks", count: nurseTasks.length || (propNurseTasks?.length || 0) },
        { label: "Laboratory Orders", value: "Laboratory Orders", count: labOrders?.length || 0 },
        { label: "Radiology Orders", value: "Radiology Orders", count: radiologyOrders?.length || 0 },
        { label: "Surgery / OT Requests", value: "Surgery / OT Requests", count: surgeryRequests?.length || 0 },
        { label: "Follow Up Required", value: "Follow Up Required", count: followUps?.length || 0 },
        { label: "Referral", value: "Referral", count: referrals?.length || 0 },
    ];

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

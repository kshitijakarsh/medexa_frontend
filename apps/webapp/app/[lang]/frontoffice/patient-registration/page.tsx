"use client";

import { useState, useEffect } from "react";
import { Button } from "@workspace/ui/components/button";
import { DataTable } from "@/components/common/data-table";
import FilterButton from "@/components/common/filter-button";
import { AppSelect } from "@/components/common/app-select";
import { Input } from "@workspace/ui/components/input";
import {
    CalendarDays,
    Search,
    Grid,
    List as ListIcon,
    Plus,
    MoreVertical,
} from "lucide-react";
import Image from "next/image";
import { useDepartments } from "@/hooks/use-departments";
import { useRouter } from "next/navigation";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";
import { PatientEntry, PatientFilterState } from "./types";
import { PatientGridView } from "./_components/patient-grid-view";
import { ContactPopover } from "@/app/[lang]/appointment/_components/contact-popover";
import { Badge } from "@workspace/ui/components/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";

// Dummy data for demonstration
const DUMMY_PATIENTS: PatientEntry[] = [
    {
        id: "1",
        mrn: "MRN-1222",
        patientName: "Ganguli Rathod",
        patientImg: undefined,
        isVip: true,
        dob: "41 Year, 6 Month, 12 Day",
        phone: "(239) 555-0108",
        email: "tim.jennings@example.com",
        gender: "Male",
        category: "VIP",
        lastVisit: "12-02-2025",
        status: "Active",
        registrationStatus: "Registered Patient",
    },
    {
        id: "2",
        mrn: "MRN-1223",
        patientName: "Nevaeh Simmons",
        patientImg: undefined,
        isVip: false,
        dob: "29 Year, 3 Month, 5 Day",
        phone: "(319) 555-0115",
        email: "nevaeh.simmons@example.com",
        gender: "Male",
        category: "Normal",
        lastVisit: "12-02-2025",
        status: "Active",
        registrationStatus: "Registered Patient",
    },
    {
        id: "3",
        mrn: "MRN-1224",
        patientName: "John Doe",
        patientImg: undefined,
        isVip: false,
        dob: "35 Year, 8 Month, 20 Day",
        phone: "(415) 555-0132",
        email: "john.doe@example.com",
        gender: "Male",
        category: "Normal",
        lastVisit: "11-28-2025",
        status: "Active",
        registrationStatus: "Registered Patient",
    },
    {
        id: "4",
        mrn: "MRN-1225",
        patientName: "Sarah Williams",
        patientImg: undefined,
        isVip: true,
        dob: "42 Year, 1 Month, 15 Day",
        phone: "(628) 555-0198",
        email: "sarah.williams@example.com",
        gender: "Female",
        category: "VIP",
        lastVisit: "12-01-2025",
        status: "Active",
        registrationStatus: "Registered Patient",
    },
    {
        id: "5",
        mrn: "MRN-1226",
        patientName: "Michael Brown",
        patientImg: undefined,
        isVip: false,
        dob: "28 Year, 9 Month, 3 Day",
        phone: "(505) 555-0143",
        email: "michael.brown@example.com",
        gender: "Male",
        category: "Normal",
        lastVisit: "11-25-2025",
        status: "Inactive",
        registrationStatus: "Incomplete",
    },
    {
        id: "6",
        mrn: "MRN-1227",
        patientName: "Emma Davis",
        patientImg: undefined,
        isVip: false,
        dob: "31 Year, 2 Month, 8 Day",
        phone: "(720) 555-0167",
        email: "emma.davis@example.com",
        gender: "Female",
        category: "Normal",
        lastVisit: "12-03-2025",
        status: "Active",
        registrationStatus: "Online Registration",
    },
    {
        id: "7",
        mrn: "MRN-1228",
        patientName: "James Wilson",
        patientImg: undefined,
        isVip: false,
        dob: "45 Year, 5 Month, 22 Day",
        phone: "(303) 555-0189",
        email: "james.wilson@example.com",
        gender: "Male",
        category: "Emergency",
        lastVisit: "12-02-2025",
        status: "Active",
        registrationStatus: "Unknown ER",
    },
    {
        id: "8",
        mrn: "MRN-1229",
        patientName: "Olivia Martinez",
        patientImg: undefined,
        isVip: true,
        dob: "38 Year, 11 Month, 17 Day",
        phone: "(212) 555-0156",
        email: "olivia.martinez@example.com",
        gender: "Female",
        category: "VIP",
        lastVisit: "11-30-2025",
        status: "Active",
        registrationStatus: "Registered Patient",
    },
];

// Status Tab Options
const STATUS_TAB_OPTIONS = [
    { label: "Registered Patient", value: "Registered Patient" },
    { label: "Unknown ER", value: "Unknown ER", count: 2 },
    { label: "Incomplete", value: "Incomplete", count: 2 },
    { label: "Online Registration", value: "Online Registration", count: 2 },
];

// Filter Options
const CATEGORY_OPTIONS = [
    { label: "All Category", value: "all" },
    { label: "VIP", value: "VIP" },
    { label: "Normal", value: "Normal" },
    { label: "Emergency", value: "Emergency" },
];

const STATUS_OPTIONS = [
    { label: "All Status", value: "all" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
];

export default function PatientRegistrationPage() {
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [patients, setPatients] = useState<PatientEntry[]>(DUMMY_PATIENTS);
    const [filters, setFilters] = useState<PatientFilterState>({
        department: "",
        category: "",
        status: "",
        dateFilter: "all",
        registrationStatus: "Registered Patient", // Default to first tab
    });
    const [departmentSearchQuery, setDepartmentSearchQuery] = useState("");
    const [mrnSearch, setMrnSearch] = useState("");

    const { departments: departmentOptions } = useDepartments(departmentSearchQuery);

    const router = useRouter();
    const { withLocale } = useLocaleRoute();

    // Filter patients based on current filters
    useEffect(() => {
        let filtered = [...DUMMY_PATIENTS];

        // Filter by registration status (tabs)
        if (filters.registrationStatus) {
            filtered = filtered.filter(p => p.registrationStatus === filters.registrationStatus);
        }

        // Filter by category
        if (filters.category && filters.category !== "all") {
            filtered = filtered.filter(p => p.category === filters.category);
        }

        // Filter by status
        if (filters.status && filters.status !== "all") {
            filtered = filtered.filter(p => p.status === filters.status);
        }

        // Filter by MRN search
        if (mrnSearch) {
            filtered = filtered.filter(p =>
                p.mrn.toLowerCase().includes(mrnSearch.toLowerCase()) ||
                p.patientName.toLowerCase().includes(mrnSearch.toLowerCase())
            );
        }

        setPatients(filtered);
    }, [filters, mrnSearch]);

    const handleFilterChange = (key: keyof PatientFilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleClearFilters = () => {
        setFilters({
            department: "",
            category: "",
            status: "",
            dateFilter: "all",
            registrationStatus: filters.registrationStatus, // Keep the tab selection
        });
        setDepartmentSearchQuery("");
        setMrnSearch("");
    };

    // Get count for each status tab
    const getTabCount = (status: string) => {
        return DUMMY_PATIENTS.filter(p => p.registrationStatus === status).length;
    };

    // Columns for List View
    const columns = [
        {
            key: "patient",
            label: "Patient",
            render: (row: PatientEntry) => (
                <div className="flex items-center gap-3 relative">
                    {/* VIP Crown Icon */}
                    {row.isVip && (
                        <div className="absolute -top-1.5 -left-1.5 z-10 w-4 h-4 rounded-full flex items-center justify-center bg-transparent">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" stroke="white" strokeWidth="1" />
                            </svg>
                        </div>
                    )}

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
                        <div className="text-xs text-gray-500">{row.mrn}</div>
                    </div>
                </div>
            ),
        },
        {
            key: "dob",
            label: "Dob",
            render: (row: PatientEntry) => (
                <div className="text-sm text-gray-700">{row.dob}</div>
            )
        },
        {
            key: "phone",
            label: "Phone",
            render: (row: PatientEntry) => (
                <div className="text-sm text-gray-700">{row.phone}</div>
            )
        },
        {
            key: "email",
            label: "Email",
            render: (row: PatientEntry) => (
                <div className="text-sm text-gray-700">{row.email}</div>
            )
        },
        {
            key: "gender",
            label: "Gender",
            render: (row: PatientEntry) => (
                <div className="text-sm text-gray-700">{row.gender}</div>
            )
        },
        {
            key: "category",
            label: "Category",
            render: (row: PatientEntry) => (
                <span className="text-xs font-medium text-gray-700">
                    {row.category}
                </span>
            )
        },
        {
            key: "lastVisit",
            label: "Last Visit",
            render: (row: PatientEntry) => (
                <div className="text-sm text-gray-700">{row.lastVisit}</div>
            )
        },
        {
            key: "status",
            label: "Status",
            render: (row: PatientEntry) => (
                <span className={`text-xs font-medium ${row.status === 'Active' ? 'text-green-600' : 'text-gray-600'}`}>
                    {row.status}
                </span>
            )
        },
        {
            key: "action",
            label: "Action",
            render: (row: PatientEntry) => (
                <div className="flex items-center gap-1 text-blue-500 text-sm font-medium cursor-pointer hover:text-blue-700">
                    Action
                    <span className="flex items-center">
                        <MoreVertical className="w-4 h-4" />
                    </span>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen w-full bg-[#EAF2F6] p-4 md:p-6 pb-20">
            <div className="w-full max-w-[1700px] mx-auto space-y-4">

                {/* Section Title */}
                <h1 className="text-md font-semibold text-gray-800">All Patient's</h1>

                {/* Status Tabs */}
                <div className="flex flex-wrap items-center gap-3">
                    {STATUS_TAB_OPTIONS.map((tab) => {
                        const isActive = filters.registrationStatus === tab.value;
                        const count = getTabCount(tab.value);

                        return (
                            <button
                                key={tab.value}
                                onClick={() => handleFilterChange("registrationStatus", tab.value)}
                                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all
                  ${isActive
                                        ? 'bg-[#0095FF] text-white shadow-md'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                                    }
                `}
                            >
                                {tab.label}
                                {count > 0 && tab.value !== "Registered Patient" && (
                                    <span className={`
                    flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                    ${isActive ? 'bg-red-500 text-white' : 'bg-red-500 text-white'}
                  `}>
                                        {count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>


                {/* Action Bar Row */}
                <div className="flex flex-col xl:flex-row gap-4 items-center justify-between pt-2">
                    {/* Filter Button */}
                    <div className="flex items-center gap-3 w-full xl:w-auto">
                        <FilterButton
                            onClick={handleClearFilters}
                            onClear={handleClearFilters}
                            filters={{
                                department: filters.department,
                                category: filters.category !== "all" ? filters.category : "",
                                status: filters.status !== "all" ? filters.status : "",
                            }}
                        />
                    </div>

                    {/* Right: Search & Actions */}
                    <div className="flex items-center gap-3 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 no-scrollbar">
                        {/* MRN Search */}
                        <div className="relative flex items-center bg-white rounded-full border border-blue-100 px-4 h-10 shadow-sm w-[280px] shrink-0">
                            <div className="flex items-center gap-1 text-blue-500 text-sm font-medium border-r border-gray-200 pr-3 mr-3 cursor-pointer">
                                <Search className="w-4 h-4" />
                                MRN
                                <span className="text-gray-400 text-[10px]">▼</span>
                            </div>
                            <input
                                placeholder="Search MRN"
                                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400 min-w-[80px]"
                                value={mrnSearch}
                                onChange={(e) => setMrnSearch(e.target.value)}
                            />
                        </div>

                        <Button variant="outline" className="rounded-full h-10 border-blue-100 bg-white text-gray-700 font-medium gap-1 min-w-[90px] shadow-sm hover:bg-gray-50 shrink-0">
                            Quick <Image src="/images/unfold_more.svg" alt="Quick" width={14} height={14} className="w-3.5 h-3.5" />
                        </Button>

                        <Button
                            onClick={() => router.push(withLocale("/patient/add-patient"))}
                            className="bg-[#2CB470] hover:bg-[#259b60] text-white rounded-full h-10 px-5 gap-2 font-medium shadow-sm shrink-0"
                        >
                            Register New <Plus className="w-4 h-4 bg-white text-[#2CB470] rounded-full p-0.5" />
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
                        {!loading && patients.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-b-xl border border-gray-100 shadow-sm text-center">
                                <div className="bg-gray-50 p-4 rounded-full mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No patients found</h3>
                                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                                    We couldn't find any patients matching your filters. Try clearing some filters or searching for something else.
                                </p>
                                <Button
                                    onClick={handleClearFilters}
                                    className="bg-[#0095FF] hover:bg-[#0080DD] text-white rounded-full px-6"
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <DataTable
                                columns={columns}
                                data={patients}
                                loading={loading}
                                striped={false}
                            />
                        )}
                    </div>
                ) : (
                    <div className="mt-4">
                        <PatientGridView data={patients} />
                    </div>
                )}

            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";
import { OPDEntry, OPDFilterState } from "./types";
import { MOCK_OPD_DATA, COMPLETED_OPD_DATA } from "./mock-data";
import { useDoctors } from "@/hooks/use-doctors";
import { useDepartments } from "@/hooks/use-departments";
import { OPDFilterBar } from "./components/opd-filter-bar";
import { OPDQueueView } from "./components/opd-queue-view";
import { DoctorInstructionsView } from "./components/doctor-instructions-view";

export default function OPDPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { withLocale } = useLocaleRoute();

    // "queue", "completed", "instructions" (from sidebar: ?view=instructions)
    const currentView = searchParams.get("view") || "queue";

    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [isAdvancedView, setIsAdvancedView] = useState(false);
    const [data, setData] = useState<OPDEntry[]>([]);

    // Joint Filter State
    const [filters, setFilters] = useState<OPDFilterState>({
        department: "",
        doctor: "",
        status: "",
        dateRange: "today",
        search: "",
        viewMode: "list",
        category: "All",
    });

    const [departmentSearchQuery, setDepartmentSearchQuery] = useState("");
    const [doctorSearchQuery, setDoctorSearchQuery] = useState("");

    const { doctors: doctorOptions } = useDoctors(doctorSearchQuery);
    const { departments: departmentOptions } = useDepartments(departmentSearchQuery);

    // Load Data
    useEffect(() => {
        const fetchData = async () => {
            // For instructions, data filtering happens inside the component for now based on tabs
            // For Queue:
            if (currentView !== "instructions") {
                setLoading(true);
                // Simulate delay
                await new Promise(resolve => setTimeout(resolve, 500));

                if (currentView === "completed") {
                    setData(COMPLETED_OPD_DATA);
                } else {
                    setData(MOCK_OPD_DATA);
                }
                setLoading(false);
            }
        };
        fetchData();
    }, [currentView, filters]);


    const handleFilterChange = (key: keyof OPDFilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleClearFilters = () => {
        setFilters(prev => ({
            ...prev,
            department: "",
            doctor: "",
            status: "",
            dateRange: "today",
            search: "",
            category: "All"
        }));
    };

    return (
        <div className="min-h-screen w-full bg-[#EAF2F6] p-4 md:p-6 pb-20">
            <div className="w-full max-w-[1700px] mx-auto space-y-4">

                <OPDFilterBar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    doctorOptions={doctorOptions}
                    departmentOptions={departmentOptions}
                    setDepartmentSearchQuery={setDepartmentSearchQuery}
                    setDoctorSearchQuery={setDoctorSearchQuery}
                    isAdvancedView={isAdvancedView}
                    setIsAdvancedView={setIsAdvancedView}
                    toggleLabel={currentView === "instructions" ? "Overview Today" : "Attendance View"}
                // Hide generic status filter if in strict instructions view? 
                // The design shows "All Status" dropdown in instructions view too.
                />

                {currentView === "instructions" ? (
                    <DoctorInstructionsView
                        loading={loading}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        searchQuery={filters.search}
                        onSearchChange={(val) => handleFilterChange("search", val)}
                        onClearFilters={handleClearFilters}
                        filters={filters}
                    />
                ) : (
                    <OPDQueueView
                        data={data}
                        loading={loading}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                        isCompletedView={currentView === "completed"}
                    />
                )}

            </div>
        </div>
    );
}

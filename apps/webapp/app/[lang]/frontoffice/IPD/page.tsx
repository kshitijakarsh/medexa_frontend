
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { IPDQueueView } from "./components/ipd-queue-view";
import { DoctorInstructionsView } from "../OPD/components/doctor-instructions-view"; // Reuse from OPD
import {
    ADMITTED_PATIENTS_DATA,
    DISCHARGED_PATIENTS_DATA,
    NURSE_TASKS_DATA,
    LAB_ORDERS_DATA
} from "./mock-data";
import { IPDFilterState } from "./types";
import { buildUrl } from "@/lib/routes";

import { AdmissionView } from "./components/admission/admission-view";
import { BedManagementView } from "./components/bed-management/bed-management-view";

export default function IPDPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const view = searchParams.get("view") || "admitted"; // Default view

    // State for Filter Bar
    const [filters, setFilters] = useState<IPDFilterState>({
        floor: "",
        ward: "",
        status: "",
        search: "",
        viewMode: "list",
        category: "All"
    });

    const updateFilter = (key: keyof IPDFilterState, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            floor: "",
            ward: "",
            status: "",
            search: "",
            viewMode: "list",
            category: "All"
        });
    };

    // Derived Data based on View
    const getViewData = () => {
        if (view === "discharged") return DISCHARGED_PATIENTS_DATA;
        // if (view === "bed-management") return ...; // Placeholder
        return ADMITTED_PATIENTS_DATA;
    };

    const displayData = getViewData();

    // Render Logic
    const renderContent = () => {
        if (view === "bed-management") {
            return <BedManagementView />;
        }

        if (view === "admission") {
            return (
                <AdmissionView onBack={() => router.back()} />
            )
        }

        if (view === "instructions") {
            // Reusing DoctorInstructionsView from OPD
            // Passing IPD specific data if strictly needed, but reusing mock structure for now
            return (
                <DoctorInstructionsView
                    filters={filters} // Internal filters if any
                    nurseTasks={NURSE_TASKS_DATA}
                    labOrders={LAB_ORDERS_DATA}
                    radiologyOrders={[]} // Add empty or mock
                    surgeryRequests={[]}
                    followUps={[]}
                    referrals={[]}
                    loading={false}
                    viewMode={filters.viewMode}
                    setViewMode={(mode) => updateFilter("viewMode", mode)}
                    searchQuery={filters.search}
                    onSearchChange={(val) => updateFilter("search", val)}
                    onClearFilters={clearFilters}
                />
            );
        }

        // For "admitted", "discharged", "bed-management" (fallback to admitted for now)
        return (
            <div className="space-y-4">
                <IPDQueueView
                    data={displayData}
                    loading={false}
                    viewMode={filters.viewMode}
                    setViewMode={(mode) => updateFilter("viewMode", mode)}
                    filters={filters}
                    onFilterChange={updateFilter}
                    onClearFilters={clearFilters}
                    isDischargedView={view === "discharged"}
                    onBookAdmission={() => router.push(`${pathname}?view=admission`)}
                />
            </div>
        );
    };

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col p-4 bg-gray-50/50">
            {renderContent()}
        </div>
    );
}

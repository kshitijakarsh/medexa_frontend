
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { IPDQueueView } from "./components/ipd-queue-view";
import { DoctorInstructionsView } from "../OPD/components/doctor-instructions-view"; // Reuse from OPD
import {
    DISCHARGED_PATIENTS_DATA,
    NURSE_TASKS_DATA,
    LAB_ORDERS_DATA
} from "./mock-data";
import { IPDFilterState, IPDEntry } from "./types";
import { buildUrl } from "@/lib/routes";
import { createIPDApiClient } from "@/lib/api/ipd-api";
import { mapIPDToEntry } from "@/lib/api/ipd-mapper";

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

    // State for API data
    const [admittedData, setAdmittedData] = useState<IPDEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    // Fetch IPD data from API
    useEffect(() => {
        const fetchIPDs = async () => {
            // Only fetch for admitted view
            if (view !== "admitted") {
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const apiClient = createIPDApiClient();
                const params: any = {
                    page: 1,
                    limit: 100, // Adjust as needed
                };

                // Map filters to API params
                if (filters.search) {
                    params.search = filters.search;
                }
                if (filters.ward) {
                    params.ward_id = filters.ward;
                }
                if (filters.status && filters.status !== "All") {
                    // Map status filter to admission_type if needed
                    // You may need to adjust this mapping based on your business logic
                }

                const response = await apiClient.getIPDs(params);
                
                if (response.data.success) {
                    const mappedData = response.data.data.map(mapIPDToEntry);
                    setAdmittedData(mappedData);
                } else {
                    setError("Failed to fetch IPD data");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred while fetching IPD data");
                console.error("Error fetching IPDs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchIPDs();
    }, [view, filters.search, filters.ward, filters.status]);

    // Derived Data based on View
    const getViewData = () => {
        if (view === "discharged") return DISCHARGED_PATIENTS_DATA;
        // if (view === "bed-management") return ...; // Placeholder
        return admittedData;
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
                    loading={loading}
                    viewMode={filters.viewMode}
                    setViewMode={(mode) => updateFilter("viewMode", mode)}
                    filters={filters}
                    onFilterChange={updateFilter}
                    onClearFilters={clearFilters}
                    isDischargedView={view === "discharged"}
                    onBookAdmission={() => router.push(`${pathname}?view=admission`)}
                />
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
                        {error}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col p-4 bg-gray-50/50">
            {renderContent()}
        </div>
    );
}

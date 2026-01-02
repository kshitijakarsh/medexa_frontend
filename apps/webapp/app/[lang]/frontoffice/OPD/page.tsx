"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";
import { OPDEntry, OPDFilterState } from "./types";
import { useDoctors } from "@/hooks/use-doctors";
import { useDepartments } from "@/hooks/use-departments";
import { OPDFilterBar } from "./components/opd-filter-bar";
import { OPDQueueView } from "./components/opd-queue-view";
import { DoctorInstructionsView } from "./components/doctor-instructions-view";
import { createVisitsApiClient, VisitItem } from "@/lib/api/visits-api";
import { getIdToken } from "@/app/utils/auth";
import axios from "axios";

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
                try {
                    const apiClient = createVisitsApiClient();

                    // Prepare params
                    const params: any = {
                        page: 1,
                        limit: 100,
                    };

                    // Map status filter
                    if (filters.status && filters.status !== "all" && filters.status !== "") {
                        params.status = filters.status.toLowerCase();
                    } else if (currentView === "completed") {
                        // For completed view, filter by completed status
                        params.status = "completed";
                    }

                    // Map department filter (using camelCase to match appointment page)
                    if (filters.department && filters.department !== "all-departments" && filters.department !== "") {
                        params.departmentId = filters.department;
                    }

                    // Map doctor filter (using camelCase to match appointment page)
                    if (filters.doctor && filters.doctor !== "all-doctors" && filters.doctor !== "") {
                        params.doctorId = filters.doctor;
                    }

                    const response = await apiClient.getVisits(params);

                    if (response.data.success) {
                        // Fetch all doctors to create a lookup map
                        let doctorMap = new Map<string, string>();
                        try {
                            const token = await getIdToken();
                            const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URI || "";
                            
                            const doctorsResponse = await axios.get(
                                `${baseUrl}/api/v1/doctor/users/soap-notes-creators`,
                                {
                                    headers: {
                                        "Content-Type": "application/json",
                                        Accept: "application/json",
                                        Authorization: token ? `Bearer ${token}` : "",
                                    },
                                    params: { limit: 1000 }, // Get all doctors
                                }
                            );
                            
                            if (doctorsResponse.data.success) {
                                doctorsResponse.data.data.forEach((doctor: any) => {
                                    doctorMap.set(doctor.id.toString(), doctor.name);
                                });
                            }
                        } catch (err) {
                            console.warn("Failed to fetch doctors for lookup:", err);
                        }

                        // Map visit data to OPDEntry format
                        const mapped: OPDEntry[] = response.data.data.map((visit: VisitItem) => {
                            // Get doctor name
                            let doctorName = "Unknown Doctor";
                            let specialty = "General";
                            
                            if (visit.doctor_ids && visit.doctor_ids.length > 0) {
                                const firstDoctor = visit.doctor_ids[0];
                                if (firstDoctor?.name) {
                                    doctorName = firstDoctor.name;
                                } else if (firstDoctor?.id) {
                                    const doctorId = String(firstDoctor.id);
                                    const lookedUpName = doctorMap.get(doctorId);
                                    if (lookedUpName) {
                                        doctorName = lookedUpName;
                                    }
                                }
                            }


                            // Determine priority type (default to Normal, could be enhanced based on visit data)
                            const priorityType: "VIP" | "Normal" | "Urgent" = visit.patient_visit_type === "emergency" ? "Urgent" : "Normal";

                            // Format date and time
                            const visitDate = visit.time_slot_start ? new Date(visit.time_slot_start) : new Date();
                            const formattedDate = visitDate.toLocaleDateString("en-GB", { 
                                day: "2-digit", 
                                month: "2-digit", 
                                year: "numeric" 
                            }).replace(/\//g, "-");
                            const formattedTime = visitDate.toLocaleTimeString("en-US", { 
                                hour: "2-digit", 
                                minute: "2-digit",
                                hour12: true 
                            });

                            // Get patient name
                            const patientName = visit.full_name || 
                                (visit.patient ? `${visit.patient.first_name || ""} ${visit.patient.last_name || ""}`.trim() : "Unknown Patient");

                            // Get MRN
                            const mrn = visit.emergency_guardian_mrn || 
                                (visit.patient_id ? `MRN-${visit.patient_id}` : "N/A");

                            return {
                                id: visit.id,
                                tokenNo: `T-${String(visit.id).slice(-3)}`, // Use last 3 digits of visit ID
                                patientName,
                                mrn,
                                visitId: `APP-${String(visit.id).padStart(6, '0')}`,
                                patientImg: undefined, // API doesn't return image yet
                                doctorName,
                                specialty,
                                date: formattedDate,
                                time: formattedTime,
                                bookingType: visit.patient_visit_type || "",
                                priorityType,
                                status: visit.status || "",
                                // For completed view, add additional fields
                                ...(currentView === "completed" && {
                                    reason: visit.visit_type || "Consultation",
                                    type: visit.communication_mode_id ? "Teleconsultation" : "In-person",
                                    createdOn: visit.created_at ? new Date(visit.created_at).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric"
                                    }).replace(/\//g, "-") : formattedDate,
                                }),
                            };
                        });

                        setData(mapped);
                    }
                } catch (error) {
                    console.error("Failed to fetch OPD data:", error);
                    setData([]); // Set empty array on error
                } finally {
                    setLoading(false);
                }
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

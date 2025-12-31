"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { PatientHeader } from "../../patient-registration/_components/patient-details/patient-header"
import { PatientTabs, type PatientTab } from "../../patient-registration/_components/patient-details/patient-tabs"
import { OverviewTab } from "../../patient-registration/_components/patient-details/overview-tab"
import { VisitsTab } from "../../patient-registration/_components/patient-details/visits-tab"
import { BillingTab } from "../../patient-registration/_components/patient-details/billing-tab"
import { LabResultsTab } from "../../patient-registration/_components/patient-details/lab-results-tab"
import { RadiologyTab } from "../../patient-registration/_components/patient-details/radiology-tab"
import { MedicationsTab } from "../../patient-registration/_components/patient-details/medications-tab"
import { AllergiesTab } from "../../patient-registration/_components/patient-details/allergies-tab"
import { DocumentsTab } from "../../patient-registration/_components/patient-details/documents-tab"
import { QuickActionsSidebar } from "../../patient-registration/_components/patient-details/quick-actions-sidebar"
import { createPatientsApiClient, type PatientItem } from "@/lib/api/patients-api"
import { createPatientMedicationsApiClient, type MedicationItem as ApiMedicationItem } from "@/lib/api/patient-medications-api"
import { createVisitPurposeApiClient, type VisitPurposeItem } from "@/lib/api/doctor/visit-purpose-api"
import type { PatientDetails, Prescription, Visit } from "../../patient-registration/_components/patient-details/types"
import { format } from "@workspace/ui/hooks/use-date-fns"

// Map API patient to PatientDetails format
const mapPatientToDetails = (patient: PatientItem): PatientDetails => {
    return {
        id: String(patient.id),
        mrn: patient.civil_id ? `MRN-${patient.civil_id}` : `MRN-${patient.id}`,
        cprNid: patient.civil_id || "",
        firstName: patient.first_name || "",
        lastName: patient.last_name || "",
        photoUrl: patient.photo_url || undefined,
        dob: patient.dob || "",
        gender: (patient.gender?.toLowerCase() as 'male' | 'female' | 'other') || 'other',
        bloodGroup: patient.blood_group || "N/A",
        maritalStatus: patient.marital_status || "N/A",
        nationality: patient.country?.name_en || patient.nationality || "N/A",
        phone: patient.mobile_number || "N/A",
        email: patient.email || "N/A",
        address: patient.permanent_address || patient.city || "N/A",
        // Default empty arrays for data that might come from other APIs
        lastVisit: undefined,
        upcomingAppointments: [],
        diagnoses: [],
        activeOrders: [],
        activeProblems: [],
        allergies: [],
        documents: [],
        medications: [],
        visits: [],
        invoices: [],
        labResults: [],
        radiologyReports: [],
        prescriptions: [],
    }
}

// Map API medications to Prescription format (grouped by visit/doctor)
const mapMedicationsToPrescriptions = (medications: ApiMedicationItem[]): Prescription[] => {
    // Group medications by visit_id and created_by (doctor)
    const grouped = new Map<string, ApiMedicationItem[]>()
    
    medications.forEach((med) => {
        if (!med.is_deleted) {
            const key = `${med.visit_id}-${med.created_by}`
            if (!grouped.has(key)) {
                grouped.set(key, [])
            }
            grouped.get(key)!.push(med)
        }
    })

    // Convert grouped medications to Prescription format
    return Array.from(grouped.entries())
        .filter(([key, meds]) => meds.length > 0)
        .map(([key, meds]) => {
            const firstMed = meds[0]
            if (!firstMed) return null

            const doctorName = firstMed.createdBy 
                ? `${firstMed.createdBy.first_name} ${firstMed.createdBy.last_name}`.trim()
                : "Unknown Doctor"
            
            const visitDate = firstMed.visit?.visit_date 
                ? format(new Date(firstMed.visit.visit_date), "MMM dd, yyyy")
                : format(new Date(firstMed.created_at), "MMM dd, yyyy")

            return {
                id: firstMed.visit_id,
                doctorName,
                date: visitDate,
                visitId: firstMed.visit_id,
                visitType: firstMed.visit?.visit_type || "Unknown",
                items: meds.map((med) => ({
                    id: med.id,
                    name: med.medicine,
                    dosage: med.dosage,
                    frequency: med.frequency,
                    duration: med.duration,
                    notes: med.medication_instructions || "",
                })),
            }
        })
        .filter((prescription): prescription is Prescription => prescription !== null)
}

export default function PatientDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<PatientTab>("overview")
    const [patient, setPatient] = useState<PatientDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [medicationsLoading, setMedicationsLoading] = useState(false)
    const [visitsLoading, setVisitsLoading] = useState(false)
    const medicationsFetchedRef = useRef(false)
    const visitsFetchedRef = useRef(false)

    const patientId = params.id as string

    useEffect(() => {
        const fetchPatient = async () => {
            if (!patientId) {
                setError("Patient ID is required")
                setLoading(false)
                return
            }

            setLoading(true)
            setError(null)
            try {
                const apiClient = createPatientsApiClient()
                const response = await apiClient.getPatient(patientId)
                
                if (response.data.success && response.data.data) {
                    const patientDetails = mapPatientToDetails(response.data.data)
                    setPatient(patientDetails)
                    medicationsFetchedRef.current = false // Reset when patient changes
                    visitsFetchedRef.current = false // Reset when patient changes
                } else {
                    setError("Patient not found")
                }
            } catch (err: any) {
                console.error("Error fetching patient:", err)
                setError(err.message || "Failed to load patient details")
            } finally {
                setLoading(false)
            }
        }

        fetchPatient()
        medicationsFetchedRef.current = false // Reset medications fetch flag when patient changes
    }, [patientId])

    // Fetch medications when medications tab is active
    useEffect(() => {
        const fetchMedications = async () => {
            if (!patientId || !patient || activeTab !== "medications") return

            // Only fetch if medications haven't been fetched yet for this patient
            if (!medicationsFetchedRef.current && patient.prescriptions.length === 0) {
                medicationsFetchedRef.current = true
                setMedicationsLoading(true)
                try {
                    const medicationsClient = createPatientMedicationsApiClient()
                    const response = await medicationsClient.getMedicationsByPatientId(patientId, {
                        page: 1,
                        limit: 100,
                    })

                    if (response.data.success) {
                        const prescriptions = mapMedicationsToPrescriptions(response.data.data)
                        setPatient((prev) => {
                            if (!prev) return prev
                            return {
                                ...prev,
                                prescriptions,
                            }
                        })
                    }
                } catch (err: any) {
                    console.error("Error fetching medications:", err)
                    medicationsFetchedRef.current = false // Reset on error so we can retry
                } finally {
                    setMedicationsLoading(false)
                }
            }
        }

        fetchMedications()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patientId, activeTab]) // Only depend on patientId and activeTab - patient is checked inside but not in deps to prevent loop

    // Map visit purposes to Visit format
    const mapVisitPurposesToVisits = (visitPurposes: VisitPurposeItem[]): Visit[] => {
        return visitPurposes
            .filter(vp => !vp.is_deleted)
            .map((vp) => {
                const visitDate = vp.created_at ? format(new Date(vp.created_at), "MMM dd, yyyy") : "N/A"
                const visitTime = vp.created_at ? format(new Date(vp.created_at), "hh:mm a") : "N/A"
                const doctorName = vp.createdBy?.name || "Unknown Doctor"

                return {
                    id: vp.visit_id,
                    date: visitDate,
                    time: visitTime,
                    type: "Visit", // Default type, could be enhanced with visit type from API
                    status: "Completed" as const, // Visit purposes are typically for completed visits
                    doctor: {
                        name: doctorName,
                    },
                    purpose: vp.chief_complaint || vp.history_of_present_illness || "N/A",
                    diagnosis: vp.history_of_present_illness || vp.chief_complaint || "N/A",
                }
            })
    }

    // Fetch visit purposes when patient is loaded (needed for overview tab)
    useEffect(() => {
        const fetchVisitPurposes = async () => {
            if (!patientId || !patient) {
                console.log("PatientDetailsPage: Skipping fetch - patientId:", patientId, "patient:", !!patient)
                return
            }

            // Only fetch if visits haven't been fetched yet for this patient
            if (!visitsFetchedRef.current && (!patient.visits || patient.visits.length === 0)) {
                console.log("PatientDetailsPage: Fetching visit purposes for patient:", patientId)
                visitsFetchedRef.current = true
                setVisitsLoading(true)
                try {
                    const visitPurposeClient = createVisitPurposeApiClient({})
                    console.log("PatientDetailsPage: API client created, making request...")
                    const response = await visitPurposeClient.getByPatient(patientId, {
                        page: 1,
                        limit: 100,
                    })

                    console.log("PatientDetailsPage: API response received", response.data)
                    if (response.data.success) {
                        const visits = mapVisitPurposesToVisits(response.data.data)
                        setPatient((prev) => {
                            if (!prev) return prev
                            const firstVisit = visits.length > 0 ? visits[0] : null
                            return {
                                ...prev,
                                visits,
                                // Set lastVisit to the most recent visit if available
                                lastVisit: firstVisit ? {
                                    id: firstVisit.id,
                                    date: firstVisit.date,
                                    time: firstVisit.time,
                                    type: firstVisit.type,
                                    token: undefined,
                                    status: firstVisit.status,
                                    doctor: firstVisit.doctor,
                                    department: undefined,
                                    ward: undefined,
                                    purpose: firstVisit.purpose,
                                } : undefined,
                            }
                        })
                    }
                } catch (err: any) {
                    console.error("PatientDetailsPage: Error fetching visit purposes", err)
                    visitsFetchedRef.current = false // Reset on error so we can retry
                } finally {
                    setVisitsLoading(false)
                }
            } else {
                console.log("PatientDetailsPage: Skipping fetch - already fetched:", visitsFetchedRef.current, "visits length:", patient.visits?.length)
            }
        }

        fetchVisitPurposes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patientId, patient]) // Fetch when patient is loaded, not when tab changes

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#EFF6FB]">
                <div className="text-lg text-gray-600">Loading patient details...</div>
            </div>
        )
    }

    if (error || !patient) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#EFF6FB]">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {error || "Patient Not Found"}
                </h1>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#007AFF] text-white rounded-lg hover:bg-[#0066CC]"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                </button>
            </div>
        )
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview":
                return <OverviewTab patient={patient} />
            case "visits":
                return <VisitsTab visits={patient.visits} loading={visitsLoading} />
            case "billing":
                return <BillingTab invoices={patient.invoices} />
            case "lab-results":
                return <LabResultsTab results={patient.labResults} />
            case "radiology":
                return <RadiologyTab reports={patient.radiologyReports} />
            case "medications":
                return (
                    <MedicationsTab 
                        prescriptions={patient.prescriptions} 
                        loading={medicationsLoading}
                    />
                )
            case "allergies":
                return <AllergiesTab patientId={patient.id} />
            case "documents":
                return <DocumentsTab patientId={patient.id} />
            default:
                return <OverviewTab patient={patient} />
        }
    }

    return (
        <div className="min-h-screen bg-[#EAF6FF]">
            {/* Header with Back Button - No lines */}
            <div className="px-4 py-3 flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="p-2 bg-[#007AFF] hover:bg-[#0066CC] rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <h1 className="text-xl font-bold text-[#1C1C1E]">Patient Details</h1>
            </div>

            {/* Main Content */}
            <div className="p-4">
                {/* Patient Header Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                    <PatientHeader patient={patient} />
                </div>

                {/* Tabs - No Card Background */}
                <div className="mb-6">
                    <PatientTabs activeTab={activeTab} onTabChange={setActiveTab} />
                </div>

                {/* Content Area - Grid with content and sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
                    {/* Tab Content */}
                    <div className="min-w-0">
                        {renderTabContent()}
                    </div>

                    {/* Quick Actions Sidebar */}
                    <div className="lg:sticky lg:top-4 lg:self-start">
                        <QuickActionsSidebar
                            patient={patient}
                            onCreateVisit={() => console.log("Create visit")}
                            onOpenBilling={() => console.log("Open billing")}
                            onPrintIdCard={() => console.log("Print ID")}
                            onEditDetails={() => console.log("Edit details")}
                            onFamilyLink={() => console.log("Family link")}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

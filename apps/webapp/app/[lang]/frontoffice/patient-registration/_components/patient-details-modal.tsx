"use client"

import { useState, useEffect, useRef } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@workspace/ui/components/dialog"
import { X } from "lucide-react"
import Button from "@/components/ui/button"
import { PatientHeader } from "./patient-details/patient-header"
import { PatientTabs, type PatientTab } from "./patient-details/patient-tabs"
import { OverviewTab } from "./patient-details/overview-tab"
import { AllergiesTab } from "./patient-details/allergies-tab"
import { DocumentsTab } from "./patient-details/documents-tab"
import { QuickActionsSidebar } from "./patient-details/quick-actions-sidebar"
import type { PatientDetails, Visit } from "./patient-details/types"
import { createVisitPurposeApiClient, type VisitPurposeItem } from "@/lib/api/doctor/visit-purpose-api"
import { format } from "@workspace/ui/hooks/use-date-fns"
import { useRouter } from "next/navigation"
import { useLocaleRoute } from "@/app/hooks/use-locale-route"
import { ROUTES } from "@/lib/routes"

interface PatientDetailsModalProps {
    open: boolean
    onClose: () => void
    patient: PatientDetails | null
}

export function PatientDetailsModal({ open, onClose, patient }: PatientDetailsModalProps) {
    const router = useRouter()
    const { withLocale } = useLocaleRoute()
    const [activeTab, setActiveTab] = useState<PatientTab>("overview")
    const [patientData, setPatientData] = useState<PatientDetails | null>(patient)
    const visitsFetchedRef = useRef(false)

    const handleCreateVisit = () => {
        if (patientData?.id) {
            onClose()
            router.push(`${ROUTES.FRONTOFFICE_APPOINTMENT_BOOK}?patientId=${patientData.id}`)
        }
    }

    // Update patient data when prop changes
    useEffect(() => {
        if (patient) {
            console.log("PatientDetailsModal: Patient prop changed, patientId:", patient.id)
            setPatientData(patient)
            visitsFetchedRef.current = false // Reset when patient changes
        }
    }, [patient?.id]) // Use patient?.id to detect patient changes

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
                    type: "Visit",
                    status: "Completed" as const,
                    doctor: {
                        name: doctorName,
                    },
                    purpose: vp.chief_complaint || vp.history_of_present_illness || "N/A",
                    diagnosis: vp.history_of_present_illness || vp.chief_complaint || "N/A",
                }
            })
    }

    // Fetch visit purposes when modal opens and patient is loaded (needed for overview tab)
    useEffect(() => {
        const fetchVisitPurposes = async () => {
            if (!open || !patientData || !patientData.id) {
                console.log("PatientDetailsModal: Skipping fetch - open:", open, "patientData:", !!patientData, "patientId:", patientData?.id)
                return
            }

            // Only fetch if visits haven't been fetched yet for this patient
            if (!visitsFetchedRef.current && (!patientData.visits || patientData.visits.length === 0)) {
                console.log("PatientDetailsModal: Fetching visit purposes for patient:", patientData.id)
                visitsFetchedRef.current = true
                try {
                    const visitPurposeClient = createVisitPurposeApiClient({})
                    console.log("PatientDetailsModal: API client created, making request...")
                    const response = await visitPurposeClient.getByPatient(patientData.id, {
                        page: 1,
                        limit: 100,
                    })

                    console.log("PatientDetailsModal: API response received", response.data)
                    if (response.data.success) {
                        const visits = mapVisitPurposesToVisits(response.data.data)
                        setPatientData((prev) => {
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
                    console.error("PatientDetailsModal: Error fetching visit purposes", err)
                    visitsFetchedRef.current = false // Reset on error so we can retry
                }
            } else {
                console.log("PatientDetailsModal: Skipping fetch - already fetched:", visitsFetchedRef.current, "visits length:", patientData.visits?.length)
            }
        }

        fetchVisitPurposes()
    }, [open, patientData?.id]) // Use patientData?.id instead of patientData object

    if (!patientData) return null

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview":
                return <OverviewTab patient={patientData} />
            case "visits":
                return <div className="text-center text-gray-500 py-8">Visits / Encounters view coming soon</div>
            case "billing":
                return <div className="text-center text-gray-500 py-8">Billing / Invoices view coming soon</div>
            case "lab-results":
                return <div className="text-center text-gray-500 py-8">Lab Results view coming soon</div>
            case "radiology":
                return <div className="text-center text-gray-500 py-8">Radiology Reports view coming soon</div>
            case "medications":
                return <div className="text-center text-gray-500 py-8">Medications view coming soon</div>
            case "allergies":
                return <AllergiesTab key={`allergies-${patientData.id}`} patientId={patientData.id} />
            case "documents":
                return <DocumentsTab key={`documents-${patientData.id}`} patientId={patientData.id} />
            default:
                return <OverviewTab patient={patientData} />
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="max-w-[95vw] w-[1400px] h-[90vh] p-0 gap-0 flex flex-col overflow-hidden"
            >
                {/* Header with title and close button */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#F8F9FA]">
                    <DialogTitle className="text-xl font-bold text-[#1C1C1E] flex items-center gap-2">
                        👤 Patient Details
                    </DialogTitle>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="hover:bg-gray-200 rounded-full w-8 h-8 p-0"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Patient Header */}
                <div className="px-6 pt-4">
                    <PatientHeader patient={patientData} />
                </div>

                {/* Tabs */}
                <div className="px-6">
                    <PatientTabs activeTab={activeTab} onTabChange={setActiveTab} />
                </div>

                {/* Main Content Area - Grid with content and sidebar */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                        {/* Tab Content */}
                        <div className="min-w-0">
                            {renderTabContent()}
                        </div>

                        {/* Quick Actions Sidebar */}
                        <div className="lg:sticky lg:top-0 lg:self-start">
                            <QuickActionsSidebar
                                patient={patientData}
                                onCreateVisit={handleCreateVisit}
                                onOpenBilling={() => console.log("Open billing")}
                                onPrintIdCard={() => console.log("Print ID")}
                                onEditDetails={() => console.log("Edit details")}
                                onFamilyLink={() => console.log("Family link")}
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

"use client"

import { useState } from "react"
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
import type { PatientDetails } from "./patient-details/types"

interface PatientDetailsModalProps {
    open: boolean
    onClose: () => void
    patient: PatientDetails | null
}

export function PatientDetailsModal({ open, onClose, patient }: PatientDetailsModalProps) {
    const [activeTab, setActiveTab] = useState<PatientTab>("overview")

    if (!patient) return null

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview":
                return <OverviewTab patient={patient} />
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
                return <AllergiesTab key={`allergies-${patient.id}`} patientId={patient.id} />
            case "documents":
                return <DocumentsTab key={`documents-${patient.id}`} patientId={patient.id} />
            default:
                return <OverviewTab patient={patient} />
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
                    <PatientHeader patient={patient} />
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

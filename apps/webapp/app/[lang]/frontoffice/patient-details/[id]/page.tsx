"use client"

import { useState } from "react"
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
import { mockPatientDetails } from "../../patient-registration/mock-data"

export default function PatientDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<PatientTab>("overview")

    const patientId = params.id as string
    const patient = mockPatientDetails[patientId]

    if (!patient) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#EFF6FB]">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Patient Not Found</h1>
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
                return <VisitsTab visits={patient.visits} />
            case "billing":
                return <BillingTab invoices={patient.invoices} />
            case "lab-results":
                return <LabResultsTab results={patient.labResults} />
            case "radiology":
                return <RadiologyTab reports={patient.radiologyReports} />
            case "medications":
                return <MedicationsTab prescriptions={patient.prescriptions} />
            case "allergies":
                return <AllergiesTab allergies={patient.allergies} />
            case "documents":
                return <DocumentsTab documents={patient.documents} />
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

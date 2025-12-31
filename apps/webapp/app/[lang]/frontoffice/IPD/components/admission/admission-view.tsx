"use client"

import { useState } from "react"
import { PageHeader } from "@/components/common/page-header"
import { PatientSearchPanel, Patient } from "./patient-search-panel"
import { AdmissionForm } from "./admission-form"
import { AdmissionSuccessScreen } from "./admission-success-screen"
import { useRouter } from "next/navigation"
import { format } from "@workspace/ui/hooks/use-date-fns"

interface AdmissionViewProps {
    onBack: () => void
}

export function AdmissionView({ onBack }: AdmissionViewProps) {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
    const [showSuccess, setShowSuccess] = useState(false)
    const [admissionData, setAdmissionData] = useState<any>(null)

    const handleAdmissionSubmit = (data: any) => {
        console.log("Admission Data:", { patient: selectedPatient, ...data })

        // Prepare success screen data
        const successData = {
            admissionId: `ADM-${Math.floor(Math.random() * 90000) + 10000}`,
            patientName: selectedPatient?.name || "Unknown Patient",
            patientMRN: selectedPatient?.patientId || "MRN-Unknown",
            phone: selectedPatient?.phone || "N/A",
            doctorName: data.doctor || "Dr. Rohan Mehta",
            department: data.department || "General Medicine",
            ward: data.ward || "General Ward",
            bed: data.bed || "B-01",
            admissionDate: data.admissionDate ? format(new Date(data.admissionDate), "dd/MM/yyyy") : format(new Date(), "dd/MM/yyyy"),
            admissionTime: "10:00-10:15",
            totalFee: 240,
        }

        setAdmissionData(successData)
        setShowSuccess(true)

        // In real app: call API here
    }

    const handleCloseSuccess = () => {
        setShowSuccess(false)
        setAdmissionData(null)
        setSelectedPatient(null)
        onBack()
    }

    // Show success screen if admission is completed
    if (showSuccess && admissionData) {
        return (
            <div className="min-h-screen bg-[#E6F7FF]">
                <div className="p-2 py-0 space-y-6">
                    <PageHeader title="Book New Admission" onBackButton={true} onBack={handleCloseSuccess} />
                    <AdmissionSuccessScreen data={admissionData} onClose={handleCloseSuccess} />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <div className="p-2 py-0 space-y-6">
                <PageHeader title="Book New Admission" onBackButton={true} onBack={onBack} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
                    {/* Left Panel - Patient Search */}
                    <div className="h-full">
                        <PatientSearchPanel
                            selectedPatient={selectedPatient}
                            onPatientSelect={setSelectedPatient}
                        />
                    </div>

                    {/* Right Panel - Admission Form */}
                    <div className="h-full">
                        <AdmissionForm
                            selectedPatient={selectedPatient}
                            onSubmit={handleAdmissionSubmit}
                            onCancel={onBack}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

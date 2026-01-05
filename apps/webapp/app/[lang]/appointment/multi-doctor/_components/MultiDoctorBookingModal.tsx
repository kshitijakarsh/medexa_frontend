"use client"

import { useState } from "react"
import { X, ArrowLeft } from "lucide-react"
import { PatientSearchPanel } from "../../book/_components/PatientSearchPanel"

interface Patient {
    id: string
    name: string
    patientId: string
    cprNid: string
    dateOfBirth: string
    gender: string
    bloodGroup: string
    maritalStatus: string
    nationality: string
    phone: string
    email: string
    address: string
    avatar?: string
}

interface MultiDoctorBookingModalProps {
    isOpen: boolean
    onClose: () => void
    selectedDoctors: string[] // IDs
    doctorOptions: { value: string; label: string }[]
    selectedDate: Date | null
    selectedTime?: string | null // "HH:MM AM/PM"
    onConfirm: (patient: Patient | null, visitingPurpose: string) => void
}

export function MultiDoctorBookingModal({
    isOpen,
    onClose,
    selectedDoctors,
    doctorOptions,
    selectedDate,
    selectedTime,
    onConfirm
}: MultiDoctorBookingModalProps) {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
    const [visitingPurpose, setVisitingPurpose] = useState("")

    if (!isOpen) return null

    const selectedDateStr = selectedDate ? selectedDate.toISOString().split('T')[0] : ""

    const handleConfirm = () => {
        onConfirm(selectedPatient, visitingPurpose)
        // Reset state
        setSelectedPatient(null)
        setVisitingPurpose("")
    }

    const handleCancel = () => {
        // Reset state
        setSelectedPatient(null)
        setVisitingPurpose("")
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl my-8 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 bg-blue-50/50 border-b border-blue-100 rounded-t-xl">
                    <button onClick={handleCancel} className="p-2 hover:bg-blue-100 rounded-full text-blue-600 transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h2 className="text-lg font-semibold text-gray-900">Book New Appointment</h2>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {/* Patient Search Panel */}
                    <div className="rounded-lg">
                        <PatientSearchPanel
                            selectedPatient={selectedPatient}
                            onPatientSelect={setSelectedPatient}
                        />
                    </div>

                    {/* Visiting Purpose */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Visiting Purpose</label>
                        <textarea
                            placeholder="Enter visiting purpose"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                            value={visitingPurpose}
                            onChange={(e) => setVisitingPurpose(e.target.value)}
                        />
                    </div>

                    {/* Booking Summary */}
                    <div className="bg-blue-50/50 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between text-sm font-medium text-gray-600">
                            <span>Doctor Charge</span>
                            <span className="text-gray-900 font-bold">120 AED</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-600">
                            <span>IF new + File Registration Charge</span>
                            <span className="text-gray-900 font-bold">120 AED</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-xl">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedPatient}
                        className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        BOOK APPOINTMENT
                    </button>
                </div>
            </div>
        </div>
    )
}

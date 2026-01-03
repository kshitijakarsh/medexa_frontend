import { useState } from "react"
import { X, ArrowLeft } from "lucide-react"
import { PatientSearchPanel } from "../../book/_components/PatientSearchPanel"
import { createVisitsApiClient } from "@/lib/api/visits"
import { getAuthToken } from "@/app/utils/onboarding"

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
    selectedSlotId?: string | null // slot ID from API to pass in booking
    onConfirm: (patient: Patient | null, visitingPurpose: string) => void
}

export function MultiDoctorBookingModal({
    isOpen,
    onClose,
    selectedDoctors,
    doctorOptions,
    selectedDate,
    selectedTime,
    selectedSlotId,
    onConfirm
}: MultiDoctorBookingModalProps) {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
    const [visitingPurpose, setVisitingPurpose] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    if (!isOpen) return null

    const selectedDateStr = selectedDate ? selectedDate.toISOString().split('T')[0] : ""

    // Parse time like "04:00 PM" to 24-hour format
    const parseTime = (timeStr: string): { hour: number; minute: number } => {
        const parts = timeStr.split(" ")
        const timePart = parts[0]
        const period = parts[1]

        if (!timePart || !period) {
            throw new Error("Invalid time format")
        }

        const timeParts = timePart.split(":")
        const hourStr = timeParts[0]
        const minuteStr = timeParts[1]

        if (!hourStr || !minuteStr) {
            throw new Error("Invalid time format")
        }

        let hour = parseInt(hourStr)
        const minute = parseInt(minuteStr)

        if (period === "PM" && hour !== 12) {
            hour += 12
        } else if (period === "AM" && hour === 12) {
            hour = 0
        }

        return { hour, minute }
    }

    const handleConfirm = async () => {
        if (!selectedPatient || !selectedDate || !selectedTime || selectedDoctors.length === 0) {
            alert("Please select a patient, doctors, and time slot")
            return
        }

        // FORCE VISIBLE DEBUG
        alert(`SLOT ID DEBUG:\nselectedSlotId = ${selectedSlotId}\nselectedTime = ${selectedTime}`)

        console.log("=== BOOKING DEBUG ===")
        console.log("selectedSlotId:", selectedSlotId)
        console.log("selectedTime:", selectedTime)
        console.log("selectedDoctors:", selectedDoctors)

        setIsSubmitting(true)
        try {
            const token = await getAuthToken()
            const client = createVisitsApiClient({ authToken: token })

            // Parse the selected time
            const { hour, minute } = parseTime(selectedTime)

            // Create ISO timestamps
            const selectedDateStr = selectedDate.toISOString().split("T")[0]
            const timeSlotStart = new Date(`${selectedDateStr}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00Z`).toISOString()
            // Assume 30-minute slots
            const endTime = new Date(new Date(timeSlotStart).getTime() + 30 * 60 * 1000)
            const timeSlotEnd = endTime.toISOString()

            // Create visit payload
            const visitPayload: any = {
                patient_id: selectedPatient.id,
                procedure_type_id: "1",
                procedure_category_id: "1",
                machine_room_id: "1",
                nurse_id: "1",
                communication_mode_id: "1",
                doctor_ids: selectedDoctors,
                time_slot_start: timeSlotStart,
                time_slot_end: timeSlotEnd,
                shift: hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening",
                visit_type: "doctor_consultation",
                patient_visit_type: "appointment",
                status: "active",
            }

            // Add slot_id if available
            if (selectedSlotId) {
                visitPayload.slot_id = selectedSlotId
                console.log("✅ Added slot_id to payload:", selectedSlotId)
            } else {
                console.log("❌ No slot_id available - selectedSlotId is:", selectedSlotId)
            }

            console.log("Booking appointment with payload:", visitPayload)

            const response = await client.createVisit(visitPayload)

            if (response.data.success) {
                alert("Appointment booked successfully!")
                onConfirm(selectedPatient, visitingPurpose)
                // Reset state
                setSelectedPatient(null)
                setVisitingPurpose("")
                onClose()
            } else {
                throw new Error("Failed to create visit")
            }
        } catch (error: any) {
            console.error("Failed to book appointment:", error)
            alert(error.message || "Failed to book appointment. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        // Reset state
        setSelectedPatient(null)
        setVisitingPurpose("")
        onClose()
    }

    const selectedDoctorNames = selectedDoctors
        .map(id => doctorOptions.find(d => d.value === id)?.label)
        .filter(Boolean)
        .join(", ")

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
                    {/* Appointment Info */}
                    <div className="bg-blue-50/30 rounded-lg p-4 space-y-2">
                        <div className="text-sm text-gray-600">
                            <span className="font-semibold">Date:</span> {selectedDateStr}
                        </div>
                        <div className="text-sm text-gray-600">
                            <span className="font-semibold">Time:</span> {selectedTime}
                        </div>
                        <div className="text-sm text-gray-600">
                            <span className="font-semibold">Doctors:</span> {selectedDoctorNames || "None selected"}
                        </div>
                    </div>

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
                        disabled={isSubmitting}
                        className="px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedPatient || isSubmitting}
                        className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "BOOKING..." : "BOOK APPOINTMENT"}
                    </button>
                </div>
            </div>
        </div>
    )
}

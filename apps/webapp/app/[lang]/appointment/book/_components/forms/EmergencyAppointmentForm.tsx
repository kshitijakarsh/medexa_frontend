"use client"

import { useState, useEffect } from "react"
import { FormSelect } from "@/components/ui/form-select"
import { FormInput } from "@/components/ui/form-input"
import { FormDate } from "@/components/ui/form-date"
import { AlertCircle } from "lucide-react"

interface EmergencyAppointmentFormProps {
    initialPatientVisitType?: "appointment" | "walk_in" | "emergency"
    onPatientVisitTypeChange?: (type: any) => void
    patientType: "existing" | "unknown"
    onFormDataChange?: (data: any) => void
    selectedPatient?: any // using any to accept the patient object structure
    onEmergencyTypeChange?: (type: "existing" | "unknown") => void
}

export function EmergencyAppointmentForm({
    initialPatientVisitType = "emergency",
    onPatientVisitTypeChange,
    patientType,
    onFormDataChange,

    selectedPatient,
    onEmergencyTypeChange,
}: EmergencyAppointmentFormProps) {
    const [formData, setFormData] = useState({
        visitType: "emergency",
        fullName: "",
        gender: "",
        age: "",
        civilId: "",
        phone: "",
        modeOfArrival: "",
        erTeam: "",
        erRoom: "",
        parentMrn: "",
        weight: "",
        reason: "",
    })

    // Start with empty data usually, but if 'existing', maybe parent passes data?
    // For now, handle local state.

    useEffect(() => {
        onFormDataChange?.(formData)
    }, [formData, onFormDataChange])

    // Auto-fill form when selectedPatient changes
    useEffect(() => {
        if (patientType === "existing" && selectedPatient) {
            // Calculate age from DOB if present
            let calculatedAge = ""
            if (selectedPatient.dateOfBirth) {
                const birthDate = new Date(selectedPatient.dateOfBirth)
                const today = new Date()
                let age = today.getFullYear() - birthDate.getFullYear()
                const m = today.getMonth() - birthDate.getMonth()
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--
                }
                calculatedAge = age.toString()
            }

            setFormData(prev => ({
                ...prev,
                fullName: selectedPatient.name || "",
                gender: selectedPatient.gender?.toLowerCase() || "",
                age: calculatedAge,
                civilId: selectedPatient.cprNid || "", // Mapping cprNid to Civil ID
                phone: selectedPatient.phone || "",
            }))
        } else if (patientType === "unknown") {
            // clear fields logic if needed, or keeping it manual
        }
    }, [selectedPatient, patientType])

    const genders = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ]

    const arrivalModes = [
        { value: "ambulance", label: "Ambulance" },
        { value: "walk_in", label: "Walk-In" },
        { value: "referral", label: "Referral" },
    ]

    const erTeams = [
        { value: "team_a", label: "Dr. Nithin Prasad, Nurse Ananya Rao" },
        { value: "team_b", label: "Dr. Sarah Jones, Nurse Mike" },
    ]

    const erRooms = [
        { value: "bed_1", label: "ER Bed 1" },
        { value: "bed_2", label: "ER Bed 2" },
        { value: "trauma_1", label: "Trauma Room 1" },
    ]

    return (
        <div className="space-y-6">
            {/* Patient Type Toggle - Only visible here if Unknown (since Left Panel is hidden) */}
            {patientType === "unknown" && (
                <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="emergencyTypeForm"
                            value="existing"
                            checked={false}
                            onChange={() => onEmergencyTypeChange?.("existing")}
                            className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <span className="text-sm font-medium">Existing Patient</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="emergencyTypeForm"
                            value="unknown"
                            checked={true}
                            onChange={() => onEmergencyTypeChange?.("unknown")}
                            className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <span className="text-sm font-medium">Unknown Patient</span>
                    </label>
                </div>
            )}

            {/* Visit Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                    label="Visit Type"
                    value="emergency"
                    onValueChange={(val) => onPatientVisitTypeChange?.(val)}
                    options={[{ value: "emergency", label: "Emergency" }]}
                    triggerClassName="text-red-500 bg-red-50 border-red-200"
                    disabled // Locked to Emergency
                />
            </div>

            {/* Demographics - Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                    label="Full Name *"
                    placeholder="Enter Full Name *"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    disabled={patientType === "existing"} // Read-only if existing (assumed populated from search)
                    className={patientType === "existing" ? "bg-gray-50 border-gray-300" : "border-gray-300"}
                />
                <FormSelect
                    label="Gender *"
                    placeholder="Select Gender"
                    value={formData.gender}
                    onValueChange={(val) => setFormData({ ...formData, gender: val })}
                    options={genders}
                    disabled={patientType === "existing"}
                />
            </div>

            {/* Demographics - Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                    label="Age *"
                    placeholder="Enter Age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    disabled={patientType === "existing"}
                    className={patientType === "existing" ? "bg-gray-50 border-gray-300" : "border-gray-300"}
                />
                <FormInput
                    label="Civil ID"
                    placeholder="Enter Civil ID"
                    value={formData.civilId}
                    onChange={(e) => setFormData({ ...formData, civilId: e.target.value })}
                    disabled={patientType === "existing"}
                    className={patientType === "existing" ? "bg-gray-50 border-gray-300" : "border-gray-300"}
                />
            </div>

            {/* Contact & Arrival - Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                    label="Phone number"
                    placeholder="Enter Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={patientType === "existing"}
                    className={patientType === "existing" ? "bg-gray-50 border-gray-300" : "border-gray-300"}
                />
                <FormSelect
                    label="Mode of Arrival *"
                    placeholder="Select Mode of Arrival"
                    value={formData.modeOfArrival}
                    onValueChange={(val) => setFormData({ ...formData, modeOfArrival: val })}
                    options={arrivalModes}
                />
            </div>

            {/* ER Specifics - Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                    label="Assign ER Team"
                    placeholder="Select ER Team"
                    value={formData.erTeam}
                    onValueChange={(val) => setFormData({ ...formData, erTeam: val })}
                    options={erTeams}
                />
                <FormSelect
                    label="ER Room"
                    placeholder="Select ER Room"
                    value={formData.erRoom}
                    onValueChange={(val) => setFormData({ ...formData, erRoom: val })}
                    options={erRooms}
                />
            </div>

            {/* Pediatric Section */}
            <div className="bg-red-50/30 p-4 rounded-lg border border-red-100 space-y-4">
                <div className="flex items-center gap-2 text-red-500 font-medium">
                    <AlertCircle className="w-4 h-4" />
                    <span>Pediatric Emergency Details</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Parent/Guardian MRN (if registered)"
                        placeholder="Enter Parent/Guardian"
                        value={formData.parentMrn}
                        onChange={(e) => setFormData({ ...formData, parentMrn: e.target.value })}
                        className="bg-white border-red-300 focus:border-red-500 focus:ring-red-200 placeholder:text-red-300"
                    />
                    <FormInput
                        label="Weight (kg) - for medication dosing"
                        placeholder="Enter Weight (kg)"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        className="bg-white border-red-300 focus:border-red-500 focus:ring-red-200 placeholder:text-red-300"
                    />
                </div>
            </div>

            {/* Reason */}
            <div className="space-y-2">
                <FormInput
                    label="Reason for ER Visit *"
                    placeholder="" // Empty placeholder as per image
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="h-12" // Slightly taller?
                />
            </div>
        </div>
    )
}

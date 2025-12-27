"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/common/page-header"
import { PatientSearchPanel } from "./_components/PatientSearchPanel"
import { EmergencyForm } from "./_components/forms/EmergencyForm"
import { StandardAppointmentForm } from "./_components/forms/StandardAppointmentForm"
import { EmergencyAppointmentForm } from "./_components/forms/EmergencyAppointmentForm"
import { WalkinAppointmentForm } from "./_components/forms/WalkinAppointmentForm" // Keep even if unused to avoid breaking import list order heavily? Actually walkin form was removed from usage but file exists. I'll just add Emergency above it.

// ... existing imports ...



import { SuccessScreen } from "./_components/success-screen"
import { PricingSummary } from "./_components/PricingSummary"
import { CancelButton } from "@/components/common/cancel-button"
import Button from "@/components/ui/button"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { getAuthToken } from "@/app/utils/onboarding"
import { createVisitsApiClient } from "@/lib/api/visits"

export type PatientVisitType = "appointment" | "walk_in" | "emergency"

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

interface LastVisit {
  referringDoctor: string
  lastVisitDate: string
  lastDiagnosis: string
  lastPrescription: string
}

// ... imports

export default function BookAppointmentPage() {
  const router = useRouter()
  const params = useParams<{ lang?: string }>()
  const searchParams = useSearchParams()
  const lang = params?.lang || "en"
  const visitTypeParam = searchParams.get("visitType") || ""

  // Map query param visitType to PatientVisitType
  const getInitialPatientVisitType = (param: string): PatientVisitType => {
    switch (param) {
      case "emergency":
        return "emergency"
      case "walkin":
        return "walk_in"
      case "appointment":
        return "appointment"
      default:
        return "appointment"
    }
  }

  const [patientVisitType, setPatientVisitType] = useState<PatientVisitType>(
    getInitialPatientVisitType(visitTypeParam)
  )
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<any>(null)
  const [emergencyPatientType, setEmergencyPatientType] = useState<"existing" | "unknown">("existing")

  const [showSuccess, setShowSuccess] = useState(false)
  const [bookingData, setBookingData] = useState<any>(null)

  const isMultiDoctor = formData?.visitPurpose === "multi_doctor_appointment"

  // Update patient visit type if query param changes
  useEffect(() => {
    if (visitTypeParam) {
      setPatientVisitType(getInitialPatientVisitType(visitTypeParam))
    }
  }, [visitTypeParam])

  const handleBookAppointment = async () => {
    // Validation for emergency appointments
    if (patientVisitType === "emergency") {
      if (!formData) {
        alert("Please fill in all required fields")
        return
      }
      // For emergency, check required fields from formData
      if (emergencyPatientType === "existing" && !selectedPatient) {
        alert("Please select a patient")
        return
      }
      if (emergencyPatientType === "unknown") {
        // Validate required fields for unknown patient
        if (!formData.fullName || !formData.gender || !formData.age || !formData.modeOfArrival || !formData.reason) {
          alert("Please fill in all required fields (Full Name, Gender, Age, Mode of Arrival, Reason for ER Visit)")
          return
        }
      }
    } else {
      // Validation for regular appointments
      if (!selectedPatient || !formData || !selectedSlot) {
        alert("Please fill in all required fields")
        return
      }
    }

    setIsSubmitting(true)
    try {
      const token = await getAuthToken()
      const client = createVisitsApiClient({ authToken: token })

      let timeSlotStart: string
      let timeSlotEnd: string

      if (patientVisitType === "emergency") {
        // For emergency, use current time or form data time if available
        const now = new Date()
        timeSlotStart = now.toISOString()
        // Set end time to 1 hour later (or use form data if available)
        const endTime = new Date(now.getTime() + 60 * 60 * 1000)
        timeSlotEnd = endTime.toISOString()
      } else {
        // Parse the selected slot (format: "HH:MM-HH:MM")
        const slotParts = selectedSlot!.split("-")
        if (slotParts.length !== 2 || !slotParts[0] || !slotParts[1]) {
          throw new Error("Invalid slot format")
        }

        const startTime = slotParts[0]
        const endTime = slotParts[1]
        const startTimeParts = startTime.split(":")
        const endTimeParts = endTime.split(":")

        if (
          startTimeParts.length !== 2 ||
          endTimeParts.length !== 2 ||
          !startTimeParts[0] ||
          !startTimeParts[1] ||
          !endTimeParts[0] ||
          !endTimeParts[1]
        ) {
          throw new Error("Invalid time format")
        }

        const [startHour, startMinute] = startTimeParts
        const [endHour, endMinute] = endTimeParts

        // Create ISO timestamps by combining date with time
        const selectedDate = formData.date // Format: YYYY-MM-DD
        timeSlotStart = new Date(
          `${selectedDate}T${startHour}:${startMinute}:00Z`
        ).toISOString()
        timeSlotEnd = new Date(
          `${selectedDate}T${endHour}:${endMinute}:00Z`
        ).toISOString()
      }

      // Map form data to API request format
      // Helper to ensure we have a valid string ID (API expects strings, not numbers)
      const toStringId = (value: string | number | undefined, fallback: string): string => {
        if (typeof value === 'string') {
          // If it's already a string, validate it's a valid number string
          const num = parseInt(value, 10)
          return isNaN(num) ? fallback : value
        }
        if (typeof value === 'number') {
          return value > 0 ? String(value) : fallback
        }
        return fallback
      }

      // For ER, we need to ensure we have valid string IDs
      // erRoom and erTeam are strings like "bed_1", "team_a" - we'll use defaults for now
      // In production, these should be mapped to actual IDs from the backend
      let machineRoomId = "1"
      let nurseId = "1"

      if (patientVisitType === "emergency") {
        // For ER, use default values or try to parse if numeric string
        // If erRoom/erTeam are actual IDs (numeric strings), use them; otherwise use default
        machineRoomId = toStringId(formData.erRoom, "1")
        nurseId = toStringId(formData.nurse || formData.erTeam, "1")
      } else {
        machineRoomId = toStringId(formData.machineRoomId || "1", "1")
        nurseId = toStringId(formData.nurse, "1")
      }

      // Ensure doctor_ids has at least one value (as strings)
      // For ER, if no doctor is selected, we might need a default or require selection
      let doctorIds: string[] = []

      if (formData.doctors && Array.isArray(formData.doctors) && formData.doctors.length > 0) {
        doctorIds = formData.doctors
      } else if (formData.doctor) {
        const doctorId = toStringId(formData.doctor, "")
        if (doctorId && doctorId !== "") {
          doctorIds = [doctorId]
        }
      }

      // If no doctor selected, we need at least one for the API
      // So we'll add a default doctor ID for ER if none selected
      if (doctorIds.length === 0) {
        // Use default doctor ID "1" if none selected
        // TODO: This should be configurable or the form should require doctor selection
        doctorIds = ["1"]
      }

      const visitPayload: any = {
        procedure_type_id: toStringId(formData.procedureTypeId || "1", "1"),
        procedure_category_id: toStringId(formData.procedureCategoryId || "1", "1"),
        machine_room_id: machineRoomId,
        nurse_id: nurseId,
        communication_mode_id: toStringId(formData.communicationModeId || "1", "1"),
        doctor_ids: doctorIds,
        time_slot_start: timeSlotStart,
        time_slot_end: timeSlotEnd,
        shift: formData.shift || "morning",
        visit_type: patientVisitType === "emergency" ? "doctor_consultation" : (formData.visitPurpose || "doctor_consultation"),
        patient_visit_type: patientVisitType === "emergency" ? "er" : (formData.patientVisitType === "walk_in" ? "walk_in" : "appointment"),
        status: "active",
      }

      // For emergency with unknown patient, include patient details in payload
      if (patientVisitType === "emergency" && emergencyPatientType === "unknown") {
        visitPayload.full_name = formData.fullName
        visitPayload.gender = formData.gender
        visitPayload.age = formData.age
        visitPayload.civil_id = formData.civilId || null
        visitPayload.phone_no = formData.phone || null
        visitPayload.mode_of_arrival = formData.modeOfArrival
        visitPayload.emergency_guardian_mrn = formData.parentMrn || null
        visitPayload.weight = formData.weight || null
        visitPayload.er_team_id = formData.erTeam || null
        // patient_id will be null or omitted for unknown patients
      } else {
        // For existing patients, include patient_id
        visitPayload.patient_id = selectedPatient!.id
      }

      const response = await client.createVisit(visitPayload)

      if (response.data.success) {
        setBookingData(response.data.data)
        setShowSuccess(true)
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
    router.back()
  }

  const renderForm = () => {
    switch (patientVisitType) {
      case "emergency":
        return (
          <EmergencyAppointmentForm
            initialPatientVisitType={patientVisitType}
            onPatientVisitTypeChange={setPatientVisitType}
            patientType={emergencyPatientType}
            onFormDataChange={setFormData}
            selectedPatient={selectedPatient}
            onEmergencyTypeChange={(type) => {
              setEmergencyPatientType(type)
              if (type === "unknown") {
                setSelectedPatient(null)
              }
            }}
          />
        )
      case "walk_in":
      case "appointment":
      default:
        return (
          <StandardAppointmentForm
            initialPatientVisitType={patientVisitType}
            onPatientVisitTypeChange={setPatientVisitType}
            selectedSlot={selectedSlot}
            onSlotSelect={setSelectedSlot}
            onFormDataChange={setFormData}
          />
        )
    }
  }

  // Pricing configuration for different visit types
  // This can be extended for all visit types
  const procedureTypeLabels: Record<string, string> = {
    mri: "MRI Scan",
    xray: "X-Ray",
    blood_test: "Blood Test",
    physio: "Physiotherapy Session",
  }

  // Pricing configuration for different visit types
  // This can be extended for all visit types
  const getPricingConfig = (
    visitType: string,
    currentFormData: any
  ): { label: string; amount: number }[] => {
    const defaultPricing: { label: string; amount: number }[] = [
      { label: "Consultation Fee", amount: 100 },
      { label: "IF new + File Registration Charge", amount: 120 },
    ]

    const pricingMap: Record<
      string,
      { label: string; amount: number }[]
    > = {
      doctor_consultation: [
        { label: "Doctor Charge", amount: 120 },
        { label: "IF new + File Registration Charge", amount: 120 },
      ],
      follow_up: [
        { label: "Follow-Up Consultation Charge", amount: 120 },
        { label: "IF new + File Registration Charge", amount: 120 },
      ],
      // Add more visit types here as needed
      procedure_appointment: [
        {
          label: currentFormData?.procedureType
            ? procedureTypeLabels[currentFormData.procedureType] ||
            "Procedure Fee"
            : "Procedure Fee",
          amount: 120,
        },
        {
          label:
            currentFormData?.patientVisitType === "walk_in"
              ? "Contrast Charge"
              : "IF new + File Registration Charge",
          amount: 120,
        },
      ],
      teleconsultation: [
        { label: "Teleconsultation Fee", amount: 100 },
        { label: "IF new + File Registration Charge", amount: 120 },
      ],
      home_visit: [
        { label: "Home Visit Fee", amount: 150 },
        { label: "IF new + File Registration Charge", amount: 120 },
      ],
      multi_doctor_appointment: [
        { label: "Multi Doctor Consultation Fee", amount: 200 },
        { label: "IF new + File Registration Charge", amount: 120 },
      ],
      multi_procedure: [
        { label: "Multi Procedure Fee", amount: 300 },
        { label: "IF new + File Registration Charge", amount: 120 },
      ],
    }

    return pricingMap[visitType] || defaultPricing
  }

  const getPricingData = () => {
    // Get visit type from form data, fallback to patient visit type
    const visitType =
      formData?.visitPurpose ||
      (patientVisitType === "emergency"
        ? "emergency"
        : patientVisitType === "walk_in"
          ? "walk_in"
          : "doctor_consultation")

    // Get pricing items for this visit type
    const pricingItems = getPricingConfig(visitType, formData)

    // Calculate total
    const total = pricingItems.reduce((sum, item) => sum + item.amount, 0)

    // Format items with AED currency
    const formattedItems = pricingItems.map((item) => ({
      label: item.label,
      amount: `${item.amount} AED`,
    }))

    return {
      items: formattedItems,
      total: `${total} AED`,
    }
  }

  if (showSuccess) {
    return (
      <main className="min-h-svh w-full bg-white">
        <Header />
        <div className="p-2 py-6 min-h-screen bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
          <PageHeader title={patientVisitType === 'walk_in' ? 'Walk-In Registered' : 'Appointment Booked'} onBackButton={true} />
          <SuccessScreen
            data={bookingData}
            visitType={patientVisitType}
            patientDetails={selectedPatient}
            onClose={() => router.push(`/${lang}/appointment`)}
          />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-2 py-6 space-y-6 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
        <PageHeader title="Book New Appointment" />




        {/* Main Content Grid */}
        <div className={`grid gap-6 ${(patientVisitType === "emergency" && emergencyPatientType === "unknown") || isMultiDoctor
          ? "grid-cols-1"
          : "grid-cols-1 lg:grid-cols-2"
          }`}>
          {/* Left Panel - Patient Search - Hide if Unknown OR Multi-Doctor */}
          {!(patientVisitType === "emergency" && emergencyPatientType === "unknown") && !isMultiDoctor && (
            <div className="space-y-4">
              <PatientSearchPanel
                selectedPatient={selectedPatient}
                onPatientSelect={setSelectedPatient}
                patientVisitType={patientVisitType}
                emergencyType={emergencyPatientType}
                onEmergencyTypeChange={(type) => {
                  setEmergencyPatientType(type)
                  if (type === "unknown") {
                    setSelectedPatient(null)
                  }
                }}
              />
            </div>
          )}

          {/* Right Panel - Appointment Form */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
              {/* Dynamic Form Based on Patient Visit Type */}
              {renderForm()}

              {/* Pricing Summary */}
              <PricingSummary data={getPricingData()} />

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <CancelButton onClick={handleCancel} label="CANCEL" />
                <Button
                  onClick={handleBookAppointment}
                  disabled={
                    isSubmitting ||
                    (patientVisitType === "emergency"
                      ? (emergencyPatientType === "existing" && !selectedPatient) || !formData
                      : !selectedPatient || !formData || !selectedSlot)
                  }
                  className={
                    patientVisitType === "walk_in" || patientVisitType === "emergency"
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : ""
                  }
                >
                  {isSubmitting
                    ? "Submitting..."
                    : patientVisitType === "walk_in"
                      ? "ADD VISIT"
                      : patientVisitType === "emergency"
                        ? "GENERATE ER"
                        : "BOOK APPOINTMENT"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


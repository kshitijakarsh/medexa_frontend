"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/common/page-header"
import { PatientSearchPanel } from "./_components/PatientSearchPanel"
import { VisitTypeSelector } from "./_components/VisitTypeSelector"
import { ProcedureAppointmentForm } from "./_components/forms/ProcedureAppointmentForm"
import { TeleconsultationForm } from "./_components/forms/TeleconsultationForm"
import { EmergencyForm } from "./_components/forms/EmergencyForm"
import { StandardAppointmentForm } from "./_components/forms/StandardAppointmentForm"
import { WalkinAppointmentForm } from "./_components/forms/WalkinAppointmentForm"
import { PricingSummary } from "./_components/PricingSummary"
import { CancelButton } from "@/components/common/cancel-button"
import Button from "@/components/ui/button"
import { useRouter, useParams } from "next/navigation"

export type VisitType =
  | "procedure"
  | "teleconsultation"
  | "emergency"
  | "standard"
  | "walkin"

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

export default function BookAppointmentPage() {
  const router = useRouter()
  const params = useParams<{ lang?: string }>()
  const lang = params?.lang || "en"

  const [selectedVisitType, setSelectedVisitType] =
    useState<VisitType>("procedure")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBookAppointment = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    // TODO: Handle success/error
    router.push(`/${lang}/appointment`)
  }

  const handleCancel = () => {
    router.back()
  }

  const renderForm = () => {
    switch (selectedVisitType) {
      case "procedure":
        return (
          <ProcedureAppointmentForm
            selectedSlot={selectedSlot}
            onSlotSelect={setSelectedSlot}
          />
        )
      case "teleconsultation":
        return (
          <TeleconsultationForm
            selectedSlot={selectedSlot}
            onSlotSelect={setSelectedSlot}
          />
        )
      case "emergency":
        return <EmergencyForm />
      case "standard":
        return (
          <StandardAppointmentForm
            selectedSlot={selectedSlot}
            onSlotSelect={setSelectedSlot}
          />
        )
      case "walkin":
        return <WalkinAppointmentForm />
      default:
        return null
    }
  }

  const getPricingData = () => {
    switch (selectedVisitType) {
      case "procedure":
        return {
          items: [
            { label: "MRI Brain", amount: "120 AED" },
            { label: "Contrast Charge", amount: "120 AED" },
          ],
          total: "240 AED",
        }
      case "teleconsultation":
        return {
          items: [
            { label: "Teleconsultation Fee", amount: "120 AED" },
            { label: "Registration Charge", amount: "120 AED" },
          ],
          total: "240 AED",
        }
      case "emergency":
        return {
          items: [
            { label: "Emergency Fee", amount: "150 AED" },
            { label: "Registration Charge", amount: "120 AED" },
          ],
          total: "270 AED",
        }
      case "standard":
        return {
          items: [
            { label: "Consultation Fee", amount: "100 AED" },
            { label: "Registration Charge", amount: "120 AED" },
          ],
          total: "220 AED",
        }
      case "walkin":
        return {
          items: [
            { label: "Walk-in Fee", amount: "80 AED" },
            { label: "Registration Charge", amount: "120 AED" },
          ],
          total: "200 AED",
        }
      default:
        return { items: [], total: "0 AED" }
    }
  }

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-2 py-6 space-y-6 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
        <PageHeader title="Book New Appointment" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Patient Search */}
          <div className="lg:col-span-1 space-y-4">
            <PatientSearchPanel
              selectedPatient={selectedPatient}
              onPatientSelect={setSelectedPatient}
            />
          </div>

          {/* Right Panel - Appointment Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
              {/* Visit Type Selector */}
              <VisitTypeSelector
                value={selectedVisitType}
                onChange={setSelectedVisitType}
              />

              {/* Dynamic Form Based on Visit Type */}
              {renderForm()}

              {/* Pricing Summary */}
              <PricingSummary data={getPricingData()} />

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <CancelButton onClick={handleCancel} label="CANCEL" />
                <Button
                  onClick={handleBookAppointment}
                  disabled={isSubmitting || !selectedPatient}
                >
                  {isSubmitting ? "BOOKING..." : "BOOK APPOINTMENT"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


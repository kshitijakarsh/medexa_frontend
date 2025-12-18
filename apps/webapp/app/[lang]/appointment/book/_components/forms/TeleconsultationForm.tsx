"use client"

import { useState } from "react"
import { FormSelect } from "@/components/ui/form-select"
import { FormDate } from "@/components/ui/form-date"
import { FormInput } from "@/components/ui/form-input"
import { AvailableSlotGrid } from "../AvailableSlotGrid"

interface TeleconsultationFormProps {
  selectedSlot: string | null
  onSlotSelect: (slot: string) => void
}

export function TeleconsultationForm({
  selectedSlot,
  onSlotSelect,
}: TeleconsultationFormProps) {
  // Get today's date in YYYY-MM-DD format for min date restriction
  const today = new Date().toISOString().split("T")[0]

  const [formData, setFormData] = useState({
    department: "General Medicine",
    doctor: "",
    communicationMode: "",
    date: "",
    visitingPurpose: "",
  })

  const departments = [
    { value: "general-medicine", label: "General Medicine" },
    { value: "cardiology", label: "Cardiology" },
    { value: "dermatology", label: "Dermatology" },
    { value: "pediatrics", label: "Pediatrics" },
  ]

  const doctors = [
    { value: "doctor-1", label: "Dr. Rohan Mehta" },
    { value: "doctor-2", label: "Dr. Sarah Johnson" },
    { value: "doctor-3", label: "Dr. Maria Garcia" },
  ]

  const communicationModes = [
    { value: "video", label: "Video Call" },
    { value: "audio", label: "Audio Call" },
    { value: "chat", label: "Chat" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          label="Department"
          required
          value={formData.department}
          onValueChange={(value) =>
            setFormData({ ...formData, department: value })
          }
          options={departments}
        />
        <FormSelect
          label="Doctor"
          required
          value={formData.doctor}
          onValueChange={(value) =>
            setFormData({ ...formData, doctor: value })
          }
          placeholder="Select Procedure Type"
          options={doctors}
        />
        <FormSelect
          label="Communication Mode"
          value={formData.communicationMode}
          onValueChange={(value) =>
            setFormData({ ...formData, communicationMode: value })
          }
          placeholder="Select Communication Mode"
          options={communicationModes}
        />
        <FormDate
          label="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          placeholder="Select Date"
          min={today}
        />
      </div>

      {/* Available Slots */}
      <AvailableSlotGrid
        slots={[]}
        selectedSlot={selectedSlot}
        onSlotSelect={onSlotSelect}
      />

      {/* Visiting Purpose */}
      <FormInput
        label="Visiting Purpose"
        value={formData.visitingPurpose}
        onChange={(e) =>
          setFormData({ ...formData, visitingPurpose: e.target.value })
        }
        placeholder="Enter visiting purpose"
      />
    </div>
  )
}


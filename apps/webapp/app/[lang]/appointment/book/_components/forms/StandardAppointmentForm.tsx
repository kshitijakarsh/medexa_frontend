"use client"

import { useState } from "react"
import { FormSelect } from "@/components/ui/form-select"
import { FormDate } from "@/components/ui/form-date"
import { FormInput } from "@/components/ui/form-input"
import { AvailableSlotGrid } from "../AvailableSlotGrid"

interface StandardAppointmentFormProps {
  selectedSlot: string | null
  onSlotSelect: (slot: string) => void
}

export function StandardAppointmentForm({
  selectedSlot,
  onSlotSelect,
}: StandardAppointmentFormProps) {
  const [formData, setFormData] = useState({
    department: "",
    doctor: "",
    date: "",
    shift: "",
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

  const shifts = [
    { value: "morning", label: "Morning" },
    { value: "afternoon", label: "Afternoon" },
    { value: "evening", label: "Evening" },
    { value: "night", label: "Night" },
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
          placeholder="Select Department"
          options={departments}
        />
        <FormSelect
          label="Doctor"
          required
          value={formData.doctor}
          onValueChange={(value) =>
            setFormData({ ...formData, doctor: value })
          }
          placeholder="Select Doctor"
          options={doctors}
        />
        <FormDate
          label="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          placeholder="Select Date"
        />
        <FormSelect
          label="Shift"
          value={formData.shift}
          onValueChange={(value) =>
            setFormData({ ...formData, shift: value })
          }
          placeholder="Select Shift"
          options={shifts}
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


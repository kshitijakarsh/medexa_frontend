"use client"

import { useState } from "react"
import { FormSelect } from "@/components/ui/form-select"
import { FormDate } from "@/components/ui/form-date"
import { FormInput } from "@/components/ui/form-input"
import { Textarea } from "@workspace/ui/components/textarea"
import { AvailableSlotGrid } from "../AvailableSlotGrid"

interface ProcedureAppointmentFormProps {
  selectedSlot: string | null
  onSlotSelect: (slot: string) => void
}

export function ProcedureAppointmentForm({
  selectedSlot,
  onSlotSelect,
}: ProcedureAppointmentFormProps) {
  // Get today's date in YYYY-MM-DD format for min date restriction
  const today = new Date().toISOString().split("T")[0]

  const [formData, setFormData] = useState({
    procedureCategory: "General Medicine",
    procedureType: "",
    machineRoom: "",
    duration: "20 mins",
    date: "",
    nurse: "",
    preparationInstructions: "Patient must remove all metal objects. 6 hours fasting recommended if contrast MRI.",
    visitingPurpose: "",
  })

  const procedureCategories = [
    { value: "general-medicine", label: "General Medicine" },
    { value: "radiology", label: "Radiology" },
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
  ]

  const procedureTypes = [
    { value: "mri-brain", label: "MRI Brain" },
    { value: "ct-scan", label: "CT Scan" },
    { value: "x-ray", label: "X-Ray" },
    { value: "ultrasound", label: "Ultrasound" },
  ]

  const rooms = [
    { value: "room-1", label: "Room 1" },
    { value: "room-2", label: "Room 2" },
    { value: "room-3", label: "Room 3" },
  ]

  const nurses = [
    { value: "nurse-1", label: "Nurse Ananya Rao" },
    { value: "nurse-2", label: "Nurse Sarah Johnson" },
    { value: "nurse-3", label: "Nurse Maria Garcia" },
  ]

  return (
    <div className="space-y-6">
      {/* Procedure Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-800">
          Procedure Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            label="Procedure Category"
            value={formData.procedureCategory}
            onValueChange={(value) =>
              setFormData({ ...formData, procedureCategory: value })
            }
            options={procedureCategories}
          />
          <FormSelect
            label="Procedure Type"
            required
            value={formData.procedureType}
            onValueChange={(value) =>
              setFormData({ ...formData, procedureType: value })
            }
            placeholder="Select Procedure Type"
            options={procedureTypes}
          />
          <FormSelect
            label="Machine / Room"
            value={formData.machineRoom}
            onValueChange={(value) =>
              setFormData({ ...formData, machineRoom: value })
            }
            placeholder="Select Room"
            options={rooms}
          />
          <FormInput
            label="Duration"
            value={formData.duration}
            readOnly
            className="bg-gray-50"
          />
          <FormDate
            label="Date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            placeholder="Select Date"
            min={today}
          />
          <FormSelect
            label="Nurse"
            value={formData.nurse}
            onValueChange={(value) =>
              setFormData({ ...formData, nurse: value })
            }
            placeholder="Select Nurse"
            options={nurses}
          />
        </div>
      </div>

      {/* Preparation Instructions */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Preparation Instructions</label>
        <Textarea
          value={formData.preparationInstructions}
          onChange={(e) =>
            setFormData({
              ...formData,
              preparationInstructions: e.target.value,
            })
          }
          className="min-h-[100px] resize-none"
          placeholder="Enter preparation instructions..."
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


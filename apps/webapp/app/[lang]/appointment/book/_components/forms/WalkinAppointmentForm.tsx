"use client"

import { useState } from "react"
import { FormSelect } from "@/components/ui/form-select"
import { FormDate } from "@/components/ui/form-date"
import { FormInput } from "@/components/ui/form-input"

export function WalkinAppointmentForm() {
  const [formData, setFormData] = useState({
    department: "",
    doctor: "",
    date: "",
    priority: "",
    startTime: "",
    endTime: "",
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

  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ]

  const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = Math.floor(i / 2)
    const minute = i % 2 === 0 ? "00" : "30"
    const period = hour >= 12 ? "PM" : "AM"
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    const value = `${displayHour.toString().padStart(2, "0")}:${minute} ${period}`
    return { value, label: value }
  })

  const formatDuration = () => {
    if (formData.startTime && formData.endTime) {
      return `${formData.startTime} - ${formData.endTime}`
    }
    return ""
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          label="Department"
          value={formData.department}
          onValueChange={(value) =>
            setFormData({ ...formData, department: value })
          }
          placeholder="Select Department"
          options={departments}
        />
        <FormSelect
          label="Doctor"
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
          label="Priority"
          value={formData.priority}
          onValueChange={(value) =>
            setFormData({ ...formData, priority: value })
          }
          placeholder="Select Priority"
          options={priorities}
        />
        <div className="md:col-span-2">
          <label className="text-sm font-medium mb-2 block">
            Duration <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Start Time"
              value={formData.startTime}
              onValueChange={(value) =>
                setFormData({ ...formData, startTime: value })
              }
              placeholder="Select Start Time"
              options={timeOptions}
            />
            <FormSelect
              label="End Time"
              value={formData.endTime}
              onValueChange={(value) =>
                setFormData({ ...formData, endTime: value })
              }
              placeholder="Select End Time"
              options={timeOptions}
            />
          </div>
          {formData.startTime && formData.endTime && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm font-medium text-gray-700">
                Duration: {formatDuration()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


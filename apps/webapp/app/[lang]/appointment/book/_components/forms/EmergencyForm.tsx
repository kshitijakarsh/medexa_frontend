"use client"

import { useState, useEffect } from "react"
import { FormSelect } from "@/components/ui/form-select"
import { FormInput } from "@/components/ui/form-input"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { Textarea } from "@workspace/ui/components/textarea"

interface EmergencyFormProps {
  initialPatientVisitType?: "emergency"
  onPatientVisitTypeChange?: (type: "emergency") => void
}

export function EmergencyForm({
  initialPatientVisitType = "emergency",
  onPatientVisitTypeChange,
}: EmergencyFormProps) {
  const [patientType, setPatientType] = useState<"adult" | "child">("adult")
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    civilId: "",
    phone: "",
    modeOfArrival: "",
    erTeam: "Dr. Nithin Prasad, Nurse Ananya Rao",
    erRoom: "ER Bed 1",
    reasonForVisit: "",
  })

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]

  const ages = Array.from({ length: 100 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1} years`,
  }))

  const modesOfArrival = [
    { value: "ambulance", label: "Ambulance" },
    { value: "walk-in", label: "Walk-in" },
    { value: "private-vehicle", label: "Private Vehicle" },
  ]

  const erTeams = [
    { value: "team-1", label: "Dr. Nithin Prasad, Nurse Ananya Rao" },
    { value: "team-2", label: "Dr. Sarah Johnson, Nurse Maria Garcia" },
  ]

  const erRooms = [
    { value: "bed-1", label: "ER Bed 1" },
    { value: "bed-2", label: "ER Bed 2" },
    { value: "bed-3", label: "ER Bed 3" },
  ]

  return (
    <div className="space-y-6">
      {/* Patient Type Toggle */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Patient Type <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-3">
          <Button
            type="button"
            variant={patientType === "adult" ? "default" : "outline"}
            onClick={() => setPatientType("adult")}
            className={cn(
              "flex-1 h-10 rounded-lg font-medium transition-all",
              patientType === "adult"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            )}
          >
            Adult Emergency
          </Button>
          <Button
            type="button"
            variant={patientType === "child" ? "default" : "outline"}
            onClick={() => setPatientType("child")}
            className={cn(
              "flex-1 h-10 rounded-lg font-medium transition-all",
              patientType === "child"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            )}
          >
            Child Emergency
          </Button>
        </div>
      </div>

      {/* Patient Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-800">
          Patient Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Full Name"
            required
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            placeholder="Enter Full Name *"
          />
          <FormSelect
            label="Gender"
            required
            value={formData.gender}
            onValueChange={(value) =>
              setFormData({ ...formData, gender: value })
            }
            placeholder="Select Gender"
            options={genders}
          />
          <FormSelect
            label="Age"
            required
            value={formData.age}
            onValueChange={(value) =>
              setFormData({ ...formData, age: value })
            }
            placeholder="Select Age"
            options={ages}
          />
          <FormSelect
            label="Civil ID"
            value={formData.civilId}
            onValueChange={(value) =>
              setFormData({ ...formData, civilId: value })
            }
            placeholder="Select Civil ID"
            options={[]}
          />
          <FormInput
            label="Phone number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Enter Phone number"
          />
          <FormSelect
            label="Mode of Arrival"
            required
            value={formData.modeOfArrival}
            onValueChange={(value) =>
              setFormData({ ...formData, modeOfArrival: value })
            }
            placeholder="Select Emergency ward"
            options={modesOfArrival}
          />
        </div>
      </div>

      {/* ER Assignment */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-800">ER Assignment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            label="Assign ER Team"
            value={formData.erTeam}
            onValueChange={(value) =>
              setFormData({ ...formData, erTeam: value })
            }
            options={erTeams}
          />
          <FormSelect
            label="ER Room"
            value={formData.erRoom}
            onValueChange={(value) =>
              setFormData({ ...formData, erRoom: value })
            }
            options={erRooms}
          />
        </div>
      </div>

      {/* Reason for ER Visit */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Reason for ER Visit <span className="text-red-500">*</span>
        </label>
        <Textarea
          value={formData.reasonForVisit}
          onChange={(e) =>
            setFormData({ ...formData, reasonForVisit: e.target.value })
          }
          className="min-h-[100px] resize-none"
          placeholder="Enter reason for ER visit..."
        />
      </div>
    </div>
  )
}


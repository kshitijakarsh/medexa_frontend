"use client"

import { FormSelect } from "@/components/ui/form-select"
import { Calendar, Wifi, AlertTriangle, Clock, User } from "lucide-react"
import { VisitType } from "../page"

interface VisitTypeSelectorProps {
  value: VisitType
  onChange: (value: VisitType) => void
}

const visitTypeOptions = [
  {
    value: "procedure",
    label: "Procedure Appointment",
    icon: Calendar,
    iconColor: "text-blue-600",
  },
  {
    value: "teleconsultation",
    label: "Teleconsultation",
    icon: Wifi,
    iconColor: "text-green-600",
  },
  {
    value: "emergency",
    label: "◆ New Patient Emergency",
    icon: AlertTriangle,
    iconColor: "text-orange-600",
  },
  {
    value: "standard",
    label: "Standard Appointment",
    icon: Clock,
    iconColor: "text-blue-600",
  },
  {
    value: "walkin",
    label: "Walk-in Appointment",
    icon: User,
    iconColor: "text-purple-600",
  },
]

export function VisitTypeSelector({
  value,
  onChange,
}: VisitTypeSelectorProps) {
  const selectedOption = visitTypeOptions.find((opt) => opt.value === value)
  const Icon = selectedOption?.icon || Calendar

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Visit Type</label>
      <div className="flex items-center gap-2">
        {selectedOption && (
          <Icon className={`h-5 w-5 ${selectedOption.iconColor}`} />
        )}
        <div className="flex-1">
          <FormSelect
            label=""
            value={value}
            onValueChange={(val) => onChange(val as VisitType)}
            placeholder="Select Visit Type"
            options={visitTypeOptions.map((opt) => ({
              value: opt.value,
              label: opt.label,
            }))}
          />
        </div>
      </div>
    </div>
  )
}


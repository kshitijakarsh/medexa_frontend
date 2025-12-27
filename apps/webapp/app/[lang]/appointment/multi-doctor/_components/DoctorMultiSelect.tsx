"use client"

import { DynamicSelect } from "@/components/common/dynamic-select"
import { X } from "lucide-react"

interface DoctorOption {
  value: string
  label: string
}

interface DoctorMultiSelectProps {
  label?: string
  placeholder?: string
  options: DoctorOption[]
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
  className?: string
}

export function DoctorMultiSelect({
  label,
  placeholder = "Select Doctor",
  options,
  value,
  onChange,
  disabled = false,
  className,
}: DoctorMultiSelectProps) {
  const selectedDoctors = options.filter((opt) => value.includes(opt.value))

  const handleRemove = (doctorId: string) => {
    onChange(value.filter((id) => id !== doctorId))
  }

  return (
    <div className={className}>
      <DynamicSelect
        label={label}
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={(val) => onChange(val as string[])}
        multi={true}
        searchable={true}
        disabled={disabled}
      />

      {/* Selected Doctors Tags */}
      {selectedDoctors.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedDoctors.map((doctor) => (
            <div
              key={doctor.value}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              <span>{doctor.label}</span>
              <button
                type="button"
                onClick={() => handleRemove(doctor.value)}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                disabled={disabled}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


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
  hideTags?: boolean
}

export function DoctorMultiSelect({
  label,
  placeholder = "Select Doctor",
  options,
  value,
  onChange,
  disabled = false,
  className,
  hideTags = false,
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
      {!hideTags && selectedDoctors.length > 0 && (
        <div className="flex overflow-x-auto gap-3 mt-3 pb-2 scrollbar-none">
          {selectedDoctors.map((doctor) => (
            <div
              key={doctor.value}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-bold shadow-sm border border-transparent whitespace-nowrap min-w-max"
            >
              <span>{doctor.label}</span>
              <button
                type="button"
                onClick={() => handleRemove(doctor.value)}
                className="bg-[#FCA5A5] hover:bg-red-400 text-white rounded-full p-1 transition-colors flex items-center justify-center"
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


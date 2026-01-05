"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

interface FormSelectProps {
  label: string
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  options: { value: string; label: string }[]
  error?: string
  required?: boolean
  id?: string
  disabled?: boolean
  triggerClassName?: string
}

export const FormSelect = ({
  label,
  value,
  onValueChange,
  placeholder = "Select an option",
  options,
  error,
  required,
  id,
  disabled,
  triggerClassName,
}: FormSelectProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-black ml-1">*</span>}
      </label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          id={id}
          className={`w-full ${triggerClassName || ""}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

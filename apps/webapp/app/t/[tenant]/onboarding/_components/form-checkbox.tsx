"use client"

interface FormCheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
  required?: boolean
  id?: string
}

export const FormCheckbox = ({
  label,
  checked,
  onChange,
  error,
  required,
  id,
}: FormCheckboxProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 cursor-pointer rounded border-gray-300 text-green-500 focus:ring-green-500"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id} className="text-sm font-medium cursor-pointer">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

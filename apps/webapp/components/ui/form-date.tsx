"use client"

import { Input } from "@/components/ui/input"
import { forwardRef } from "react"
import { Calendar } from "lucide-react"

interface FormDateProps extends Omit<React.ComponentProps<"input">, "type"> {
  label: string
  error?: string
  required?: boolean
  iconClassName?: string
}

export const FormDate = forwardRef<HTMLInputElement, FormDateProps>(
  ({ label, error, required, className, id, iconClassName, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
          <Input
            ref={ref}
            type="date"
            id={id}
            className={`${className} [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer relative z-10`}
            {...props}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          <Calendar
            className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none ${iconClassName || "text-gray-500"}`}
          />
        </div>
        {error && (
          <p id={`${id}-error`} className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormDate.displayName = "FormDate"

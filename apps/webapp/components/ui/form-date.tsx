"use client"

import { Input } from "@/components/ui/input"
import { forwardRef } from "react"

interface FormDateProps extends Omit<React.ComponentProps<"input">, "type"> {
  label: string
  error?: string
  required?: boolean
}

export const FormDate = forwardRef<HTMLInputElement, FormDateProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <Input
          ref={ref}
          type="date"
          id={id}
          className={className}
          {...props}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
        />
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

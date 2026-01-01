"use client"

import { Textarea } from "@workspace/ui/components/textarea"
import { forwardRef } from "react"

interface FormTextareaProps extends React.ComponentProps<"textarea"> {
    label: string
    error?: string
    required?: boolean
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    ({ label, error, required, className, ...props }, ref) => {
        return (
            <div className="space-y-2">
                <label htmlFor={props.id} className="text-sm font-medium">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <Textarea
                    ref={ref}
                    className={className}
                    {...props}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${props.id}-error` : undefined}
                />
                {error && (
                    <p id={`${props.id}-error`} className="text-sm text-red-500">
                        {error}
                    </p>
                )}
            </div>
        )
    }
)

FormTextarea.displayName = "FormTextarea"

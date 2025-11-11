"use client"

import { useState } from "react"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import { VerificationIcon } from "../../assets/icons"
import { StepIndicator } from "./step-indicator"
import { FormInput } from "./form-input"
import { FormDate } from "./form-date"
import { FormCheckbox } from "./form-checkbox"
import Button from "@/components/ui/button"
import { licenseHistorySchema, type LicenseHistoryValues } from "./schemas"
import { submitLicenseHistory } from "@/lib/api/onboarding"

interface LicenseHistoryProps {
  onNext?: (data: LicenseHistoryValues) => void
  onBack?: () => void
  initialData?: Partial<LicenseHistoryValues>
  tenantId: string
}

const LicenseHistory = ({
  onNext,
  onBack,
  initialData,
  tenantId,
}: LicenseHistoryProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LicenseHistoryValues>({
    resolver: zodResolver(licenseHistorySchema),
    defaultValues: {
      plan_key: initialData?.plan_key || "",
      seats: initialData?.seats || 0,
      storage_quota_mb: initialData?.storage_quota_mb || 10240,
      start_date: initialData?.start_date || "",
      end_date: initialData?.end_date || "",
      auto_renew: initialData?.auto_renew ?? true,
      status: initialData?.status || "active",
    },
  })

  const onSubmit = async (data: LicenseHistoryValues) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const result = await submitLicenseHistory(tenantId, data)
      if (result.success) {
        onNext?.(data)
      } else {
        setError(result.message || "Failed to submit license history")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-sm">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2.5">
          <VerificationIcon />
          <h1 className="text-2xl font-semibold">
            Complete Your Hospital Verification
          </h1>
          <p className="text-gray-600">
            Provide license history and subscription details.
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={4} totalSteps={5} />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              {...register("plan_key")}
              label="Plan Key"
              id="plan_key"
              placeholder="Enter plan key"
              required
              error={errors.plan_key?.message}
            />

            <FormInput
              {...register("seats", { valueAsNumber: true })}
              type="number"
              label="Seats"
              id="seats"
              placeholder="Number of seats"
              required
              error={errors.seats?.message}
            />

            <FormInput
              {...register("storage_quota_mb", { valueAsNumber: true })}
              type="number"
              label="Storage Quota (MB)"
              id="storage_quota_mb"
              placeholder="Storage in MB"
              required
              error={errors.storage_quota_mb?.message}
            />

            <FormInput
              {...register("status")}
              label="Status"
              id="status"
              placeholder="active"
              required
              error={errors.status?.message}
            />

            <FormDate
              {...register("start_date")}
              label="Start Date"
              id="start_date"
              required
              error={errors.start_date?.message}
            />

            <FormDate
              {...register("end_date")}
              label="End Date"
              id="end_date"
              required
              error={errors.end_date?.message}
            />

            <div className="md:col-span-2">
              <FormCheckbox
                label="Auto Renew"
                id="auto_renew"
                checked={watch("auto_renew")}
                onChange={(checked) => setValue("auto_renew", checked)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            {onBack && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="w-fit"
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-fit ml-auto"
            >
              {isSubmitting ? "Submitting..." : "NEXT STEP"}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center space-y-2 mt-8 pt-6 border-t">
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline flex items-center justify-center gap-1"
          >
            Help
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 11L11 1M11 1H1M11 1V11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <p className="text-xs text-gray-500">
            © 2025 MedExa Cloud Health Platform
          </p>
        </div>
      </div>
    </div>
  )
}

export default LicenseHistory

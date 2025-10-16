// components/onboard-hospital/sections/FormActionsSection.tsx
"use client"

import React from "react"
import { Button } from "@workspace/ui/components/button"
import { SubmitButton } from "../ui/SubmitButton"
import { ArrowLeft } from "lucide-react"

interface FormActionsSectionProps {
  serverError?: string | null
  loading: boolean
  onReset?: () => void
  isEdit?: boolean | string | number | null
  // Wizard-specific props
  stepIndex?: number
  totalSteps?: number
  onBack?: () => void
  onPrimary?: () => void
  primaryLabel?: string
  showReset?: boolean
}

export const FormActionsSection = ({
  serverError,
  loading,
  onReset,
  isEdit,
  stepIndex,
  totalSteps,
  onBack,
  onPrimary,
  primaryLabel,
  showReset = true,
}: FormActionsSectionProps) => {
  // Determine if we're in wizard mode
  const isWizardMode = stepIndex !== undefined && totalSteps !== undefined

  return (
    <div className="bg-white/80 rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center relative">
      {/* Error Message */}
      {serverError && (
        <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-red-600">
          {serverError}
        </div>
      )}

      {/* Buttons */}
      <div className="ml-auto flex gap-3 items-center">
        {/* Back button (wizard mode only, not on first step) */}
        {isWizardMode && stepIndex > 0 && onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={loading}
            className="px-4 py-2 cursor-pointer flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
        )}

        {/* Reset button (non-wizard or when showReset is true) */}
        {showReset && onReset && (
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            disabled={loading}
            className="px-4 py-2 cursor-pointer"
          >
            Reset
          </Button>
        )}

        {/* Primary action button */}
        {isWizardMode && onPrimary ? (
          <Button
            type="button"
            onClick={onPrimary}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full py-3 px-6"
          >
            {loading ? "Processing..." : primaryLabel || "Next"}
          </Button>
        ) : (
          <SubmitButton loading={loading} isEdit={!!isEdit} />
        )}
      </div>
    </div>
  )
}

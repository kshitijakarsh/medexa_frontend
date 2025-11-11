"use client"

import { useState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import axios from "axios"
import { VerificationIcon } from "../../assets/icons"
import { StepIndicator } from "./step-indicator"
import Button from "@/components/ui/button"
import { modulesSchema, type ModulesValues } from "./schemas"
import { submitModules } from "@/lib/api/onboarding"
import { getAuthToken } from "@/lib/api/utils"
import { createModulesApiClient } from "@/lib/api/modules"
import type { Module } from "@/lib/api/modules"
import { Check } from "lucide-react"

interface ModulesProps {
  onNext?: (data: ModulesValues) => void
  onBack?: () => void
  initialData?: Partial<ModulesValues>
  tenantId: string
  tenantModules?: Module[]
}

const Modules = ({
  onNext,
  onBack,
  initialData,
  tenantId,
  tenantModules = [],
}: ModulesProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [availableModules, setAvailableModules] = useState<Module[]>([])
  const [isLoadingModules, setIsLoadingModules] = useState(true)
  const [warning, setWarning] = useState<string | null>(null)

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ModulesValues>({
    resolver: zodResolver(modulesSchema),
    defaultValues: {
      modules: [],
    },
  })

  // Helper function to normalize module ID to string for consistent comparison
  const normalizeModuleId = (id: string | number): string => {
    return String(id)
  }

  // Fetch available modules from API (master list, not tenant-specific)
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const token = await getAuthToken()
        const modulesClient = createModulesApiClient({ authToken: token })
        const response = await modulesClient.getModules()
        const modules = response.data.data

        // Filter to only active modules and normalize IDs to strings
        const activeModules = modules
          .filter((module) => module.active)
          .map((module) => ({
            ...module,
            id: normalizeModuleId(module.id),
          }))
        setAvailableModules(activeModules)

        // Get available module IDs for validation (as strings)
        const availableModuleIds = new Set(
          activeModules.map((m) => normalizeModuleId(m.id))
        )

        // Determine initial selected modules from tenant modules or initialData
        // Only include modules that are active and available
        let initialSelected: string[] = []

        if (initialData?.modules && initialData.modules.length > 0) {
          // Filter initialData modules to only include active, available ones
          initialSelected = initialData.modules
            .map((id) => normalizeModuleId(id))
            .filter((id) => availableModuleIds.has(id))
        } else if (tenantModules && tenantModules.length > 0) {
          // Filter tenant modules to only include active, available ones
          // Normalize tenant module IDs to strings for comparison
          const tenantModuleIds = tenantModules.map((module) =>
            normalizeModuleId(module.id)
          )
          initialSelected = tenantModuleIds.filter((id) =>
            availableModuleIds.has(id)
          )

          // Check if any tenant modules are invalid/inactive
          const invalidTenantModules = tenantModuleIds.filter(
            (id) => !availableModuleIds.has(id)
          )
          if (invalidTenantModules.length > 0) {
            setWarning(
              `Some previously selected modules are no longer available and have been removed: ${invalidTenantModules.join(", ")}`
            )
          }
        }

        setSelectedModules(initialSelected)
        setValue("modules", initialSelected)
      } catch (err) {
        console.error("Failed to fetch modules:", err)
        setError("Failed to load modules. Please refresh the page.")
      } finally {
        setIsLoadingModules(false)
      }
    }

    fetchModules()
  }, [tenantModules, initialData, setValue])

  const toggleModule = (moduleId: string) => {
    // Normalize the module ID for comparison
    const normalizedId = normalizeModuleId(moduleId)

    // Only allow toggling modules that are in the available modules list
    const moduleExists = availableModules.some(
      (m) => normalizeModuleId(m.id) === normalizedId && m.active
    )
    if (!moduleExists) {
      setError(`Module ${moduleId} is not available or inactive`)
      return
    }

    const newSelection = selectedModules.includes(normalizedId)
      ? selectedModules.filter((id) => id !== normalizedId)
      : [...selectedModules, normalizedId]
    setSelectedModules(newSelection)
    setValue("modules", newSelection)
    setError(null)
    setWarning(null)
  }

  const onSubmit = async (data: ModulesValues) => {
    setIsSubmitting(true)
    setError(null)
    setWarning(null)

    try {
      // Filter selected modules to only include active, available modules
      // Normalize all IDs to strings for consistent comparison
      const availableModuleIds = new Set(
        availableModules
          .filter((m) => m.active)
          .map((m) => normalizeModuleId(m.id))
      )
      const validModules = data.modules
        .map((id) => normalizeModuleId(id))
        .filter((id) => availableModuleIds.has(id))

      if (validModules.length !== data.modules.length) {
        const normalizedDataModules = data.modules.map((id) =>
          normalizeModuleId(id)
        )
        const invalidModules = normalizedDataModules.filter(
          (id) => !availableModuleIds.has(id)
        )
        setError(
          `Some selected modules are invalid or inactive: ${invalidModules.join(", ")}. Please refresh the page and try again.`
        )
        setIsSubmitting(false)
        return
      }

      if (validModules.length === 0) {
        setError("Please select at least one active module to continue.")
        setIsSubmitting(false)
        return
      }

      // Submit only valid modules
      const result = await submitModules(tenantId, { modules: validModules })

      if (result.success) {
        // Invalidate tenant query to refetch tenant data with updated modules
        queryClient.invalidateQueries({ queryKey: ["tenant", tenantId] })
        onNext?.(data)
      } else {
        // Handle backend error response with invalidModuleIds
        const errorMessage = result.message || "Failed to submit modules"

        if (result.invalidModuleIds && result.invalidModuleIds.length > 0) {
          setError(
            `Some modules are invalid or inactive: ${result.invalidModuleIds.join(", ")}. These modules have been removed. Please refresh the page to see only available modules.`
          )
        } else {
          setError(errorMessage)
        }
      }
    } catch (err) {
      // Fallback error handling
      if (axios.isAxiosError(err) && err.response?.data) {
        const errorData = err.response.data as {
          message?: string
          invalidModuleIds?: number[]
        }

        if (
          errorData.invalidModuleIds &&
          errorData.invalidModuleIds.length > 0
        ) {
          setError(
            `Some modules are invalid or inactive: ${errorData.invalidModuleIds.join(", ")}. Please refresh the page to see only available modules.`
          )
        } else {
          setError(
            errorData.message ||
              err.message ||
              "Failed to submit modules. Please try again."
          )
        }
      } else {
        setError(err instanceof Error ? err.message : "Failed to submit")
      }
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
            Select the modules you want to enable for your hospital.
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={2} totalSteps={5} />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium">
              Select Modules <span className="text-red-500">*</span>
            </label>
            {isLoadingModules ? (
              <div className="text-center py-8 text-gray-500">
                Loading modules...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableModules.map((module) => {
                  const normalizedModuleId = normalizeModuleId(module.id)
                  const isSelected =
                    selectedModules.includes(normalizedModuleId)
                  return (
                    <div
                      key={normalizedModuleId}
                      onClick={() => toggleModule(normalizedModuleId)}
                      className={`
                        border-2 rounded-lg p-4 cursor-pointer transition-colors
                        ${
                          isSelected
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`
                            w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                            ${
                              isSelected
                                ? "border-green-500 bg-green-500"
                                : "border-gray-300"
                            }
                          `}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">
                            {module.name_en}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">
                            {module.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            {errors.modules && (
              <p className="text-sm text-red-500">{errors.modules.message}</p>
            )}
          </div>

          {warning && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-yellow-800 text-sm">{warning}</p>
            </div>
          )}

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

export default Modules

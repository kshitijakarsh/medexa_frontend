"use client"

import { useState, useEffect } from "react"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
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
}

const Modules = ({ onNext, onBack, initialData, tenantId }: ModulesProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedModules, setSelectedModules] = useState<string[]>(
    initialData?.modules || []
  )
  const [availableModules, setAvailableModules] = useState<Module[]>([])
  const [isLoadingModules, setIsLoadingModules] = useState(true)

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ModulesValues>({
    resolver: zodResolver(modulesSchema),
    defaultValues: {
      modules: initialData?.modules || [],
    },
  })

  // Fetch modules from API
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const token = await getAuthToken()
        const modulesClient = createModulesApiClient({ authToken: token })
        const response = await modulesClient.getModules()
        setAvailableModules(response.data.data)
      } catch (err) {
        console.error("Failed to fetch modules:", err)
        setError("Failed to load modules. Please refresh the page.")
      } finally {
        setIsLoadingModules(false)
      }
    }

    fetchModules()
  }, [])

  const toggleModule = (moduleId: string) => {
    const newSelection = selectedModules.includes(moduleId)
      ? selectedModules.filter((id) => id !== moduleId)
      : [...selectedModules, moduleId]
    setSelectedModules(newSelection)
    setValue("modules", newSelection)
  }

  const onSubmit = async (data: ModulesValues) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const result = await submitModules(tenantId, data)
      if (result.success) {
        onNext?.(data)
      } else {
        setError(result.message || "Failed to submit modules")
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
                  const isSelected = selectedModules.includes(module.id)
                  return (
                    <div
                      key={module.id}
                      onClick={() => toggleModule(module.id)}
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

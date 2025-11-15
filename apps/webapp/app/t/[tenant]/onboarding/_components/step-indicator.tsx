"use client"

interface StepIndicatorProps {
  currentStep: number
  totalSteps?: number
}

const STEP_NAMES = ["License History", "Regulatory Documents"]

export const StepIndicator = ({
  currentStep,
  totalSteps = 2,
}: StepIndicatorProps) => {
  return (
    <div className="w-full mb-8">
      {/* Step Numbers */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1
          const isActive = stepNum === currentStep
          const isCompleted = stepNum < currentStep

          return (
            <div key={idx} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-500 text-white"
                    : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNum}
              </div>
              {idx < totalSteps - 1 && (
                <div
                  className={`w-12 h-1 transition-colors ${
                    isCompleted ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Step Name */}
      <div className="text-center text-sm text-gray-600">
        Step {currentStep} of {totalSteps}: {STEP_NAMES[currentStep - 1]}
      </div>
    </div>
  )
}

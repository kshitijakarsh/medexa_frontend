import { useState, useEffect, useCallback } from "react"
import type { OnboardingStep } from "../utils/onboarding"
import { hasWelcomeBeenShown } from "../utils/onboarding"
import type { OnboardingStatus } from "@/lib/api/onboarding"

interface UseOnboardingFlowProps {
  tenantId: string | null
  onboardingStatus: OnboardingStatus | null
}

interface UseOnboardingFlowReturn {
  currentStep: OnboardingStep
  setCurrentStep: (
    step: OnboardingStep | ((prev: OnboardingStep) => OnboardingStep)
  ) => void
  isInitialized: boolean
}

/**
 * Hook to manage onboarding flow state and transitions
 * Simple logic: Only welcome status is stored in localStorage
 * - If welcome not shown → show welcome
 * - If welcome shown → check server status:
 *   - pending → verification-pending
 *   - completed → verification-approved
 *   - not-done → license-history (start verification flow)
 */
export function useOnboardingFlow({
  tenantId,
  onboardingStatus,
}: UseOnboardingFlowProps): UseOnboardingFlowReturn {
  const [currentStep, setCurrentStepState] = useState<OnboardingStep>("welcome")
  const [isInitialized, setIsInitialized] = useState(false)

  // Determine initial step based on welcome status and server status
  useEffect(() => {
    if (!tenantId || !onboardingStatus) return

    // Check if welcome has been shown
    const welcomeShown = hasWelcomeBeenShown(tenantId)

    if (!welcomeShown) {
      // Welcome not shown → show welcome page
      setCurrentStepState("welcome")
    } else {
      // Welcome shown → check server status
      if (onboardingStatus === "pending") {
        setCurrentStepState("verification-pending")
      } else if (onboardingStatus === "completed") {
        setCurrentStepState("verification-approved")
      } else if (onboardingStatus === "not-done") {
        // Start verification flow
        setCurrentStepState("license-history")
      }
    }

    setIsInitialized(true)
  }, [tenantId, onboardingStatus])

  // Simple setCurrentStep without localStorage storage
  const setCurrentStep = useCallback(
    (step: OnboardingStep | ((prev: OnboardingStep) => OnboardingStep)) => {
      setCurrentStepState((prev) => {
        return typeof step === "function" ? step(prev) : step
      })
    },
    []
  )

  return {
    currentStep,
    setCurrentStep,
    isInitialized,
  }
}

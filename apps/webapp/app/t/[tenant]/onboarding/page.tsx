"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import Welcome from "./_components/welcome"
import Security from "./_components/security"
import VerifyEmail from "./_components/verify-email"
import NewPassword from "./_components/new-password"
import PasswordUpdated from "./_components/password-updated"
import HospitalInfo from "./_components/hospital-info"
import Modules from "./_components/modules"
import Payment from "./_components/payment"
import LicenseHistory from "./_components/license-history"
import RegulatoryDocs from "./_components/regulatory-docs"
import VerifiedPending from "./_components/verification-pending"
import VerifiedApproved from "./_components/verification-approved"
import hospitalSS from "../assets/hospital-ss.png"
import hospitalIcon from "../assets/hospital-img.png"
import Image from "next/image"
import {
  getOnboardingStatus,
  completeVerification,
  getTenantId,
  getTenantData,
} from "@/lib/api/onboarding"
import { refreshCognitoToken } from "@/lib/api/auth"
import { useRouter, useParams } from "next/navigation"
import type {
  HospitalInfoValues,
  ModulesValues,
  PaymentValues,
  LicenseHistoryValues,
  RegulatoryDocValues,
} from "./_components/schemas"

type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

// Helper function to get base domain URL for error redirect
const getBaseDomainUrl = (path: string): string => {
  if (typeof window === "undefined") return path
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || "lvh.me"
  const protocol = window.location.protocol
  const port = window.location.port ? `:${window.location.port}` : ""
  return `${protocol}//${baseDomain}${port}${path}`
}

// Helper function to check if Welcome was shown for a tenant
const hasWelcomeBeenShown = (tenantId: string): boolean => {
  if (typeof window === "undefined") return false
  const key = `onboarding_welcome_shown_${tenantId}`
  return localStorage.getItem(key) === "false"
}

// Helper function to mark Welcome as shown for a tenant
const markWelcomeAsShown = (tenantId: string): void => {
  if (typeof window === "undefined") return
  const key = `onboarding_welcome_shown_${tenantId}`
  localStorage.setItem(key, "true")
}

// Helper function to get current step from localStorage
const getStoredStep = (tenantId: string): OnboardingStep | null => {
  if (typeof window === "undefined") return null
  const key = `onboarding_current_step_${tenantId}`
  const stored = localStorage.getItem(key)
  if (stored) {
    const step = parseInt(stored, 10) as OnboardingStep
    if (step >= 1 && step <= 12) {
      return step
    }
  }
  return null
}

// Helper function to store current step in localStorage
const storeStep = (tenantId: string, step: OnboardingStep): void => {
  if (typeof window === "undefined") return
  const key = `onboarding_current_step_${tenantId}`
  localStorage.setItem(key, String(step))
}

// Helper function to check if authentication token exists
const hasAuthToken = async (): Promise<boolean> => {
  try {
    await refreshCognitoToken()
    return true
  } catch {
    return false
  }
}

const OnboardingPage = () => {
  // Initialize step from localStorage if available, otherwise default to 1
  const [currentStep, setCurrentStepState] = useState<OnboardingStep>(1)
  const [isLoading, setIsLoading] = useState(true)
  const [tenantId, setTenantId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [onboardingStatus, setOnboardingStatus] = useState<
    "not-done" | "pending" | "completed" | null
  >(null)
  const router = useRouter()
  const params = useParams()
  const tenant = params?.tenant as string
  const stepInitializedRef = useRef(false)

  // Wrapper for setCurrentStep that also stores in localStorage
  const setCurrentStep = useCallback(
    (step: OnboardingStep | ((prev: OnboardingStep) => OnboardingStep)) => {
      setCurrentStepState((prev) => {
        const newStep = typeof step === "function" ? step(prev) : step
        if (tenantId) {
          storeStep(tenantId, newStep)
        }
        return newStep
      })
    },
    [tenantId]
  )

  // Store verification form data
  const [verificationData, setVerificationData] = useState<{
    hospitalInfo?: HospitalInfoValues
    modules?: ModulesValues
    payment?: PaymentValues[]
    licenseHistory?: LicenseHistoryValues[]
    regulatoryDoc?: RegulatoryDocValues[]
  }>({})

  // Fetch tenant ID
  useEffect(() => {
    const initialize = async () => {
      try {
        // Check if authentication token exists
        const tokenExists = await hasAuthToken()

        if (!tenant) {
          // No tenant parameter - redirect based on token existence
          window.location.href = getBaseDomainUrl("/error/no-tenant")
          return
        }

        // Get tenant ID from tenant slug
        try {
          const id = await getTenantId(tenant)
          if (!id) {
            // No tenant ID found - redirect based on token existence
            if (!tokenExists) {
              // No token, redirect to error page on base domain
              router.push("/login")
            } else {
              // Token exists, redirect to login page
              window.location.href = getBaseDomainUrl("/error/no-tenant")
            }
            return
          }
          setTenantId(id)
        } catch (error) {
          console.error("Failed to get tenant ID:", error)
          // getTenantId failed - redirect based on token existence
          if (!tokenExists) {
            // No token, redirect to error page on base domain
            router.push("/login")
          } else {
            // Token exists, redirect to login page
            window.location.href = getBaseDomainUrl("/error/no-tenant")
          }
        }
      } catch (error) {
        console.error("Failed to initialize:", error)
        setError("Failed to initialize. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    initialize()
  }, [tenant, router])

  // Fetch tenant data with all related arrays using React Query
  const {
    data: tenantData,
    isLoading: isLoadingTenantData,
    error: tenantDataError,
  } = useQuery({
    queryKey: ["tenant", tenantId],
    queryFn: async () => {
      if (!tenantId) throw new Error("Tenant ID is required")
      return await getTenantData(tenantId)
    },
    enabled: !!tenantId,
  })

  // Restore step from localStorage when tenantId is available
  useEffect(() => {
    if (tenantId) {
      const storedStep = getStoredStep(tenantId)
      if (storedStep) {
        setCurrentStepState(storedStep)
      }
    }
  }, [tenantId])

  // Fetch onboarding status when tenant ID is available (only once)
  useEffect(() => {
    if (tenantId && !stepInitializedRef.current) {
      // Mark as initialized immediately to prevent multiple initializations
      stepInitializedRef.current = true

      const initializeStatus = async () => {
        try {
          const response = await getOnboardingStatus(tenantId)
          setOnboardingStatus(response.serverStatus)

          // Check if there's a stored step first
          const storedStep = getStoredStep(tenantId)
          if (storedStep) {
            // If there's a stored step, use it (user was already on a step)
            setCurrentStep(storedStep)
            return
          }

          // Only set the step on initial load if there's no stored step
          // This prevents resetting the step when user has navigated to a different step
          setCurrentStep((prevStep) => {
            // If user is already on a step that requires tenant data (6-10), don't reset
            if (prevStep >= 6 && prevStep <= 10) {
              return prevStep
            }

            // Otherwise, set step based on onboarding status
            if (response.serverStatus === "not-done") {
              return 1
            } else if (response.serverStatus === "pending") {
              if (hasWelcomeBeenShown(tenantId)) {
                return 11
              } else {
                markWelcomeAsShown(tenantId)
                return 1
              }
            } else if (response.serverStatus === "completed") {
              if (hasWelcomeBeenShown(tenantId)) {
                return 12
              } else {
                markWelcomeAsShown(tenantId)
                return 1
              }
            } else {
              return 1
            }
          })
        } catch (error) {
          console.error("Failed to get onboarding status:", error)
          setError("Failed to load onboarding status. Please try again.")
          // Reset ref on error so we can retry
          stepInitializedRef.current = false
        }
      }

      initializeStatus()
    }
  }, [tenantId])

  // Handler to progress to next step
  const handleNext = () => {
    setCurrentStep((prev) => {
      console.log("onboardingStatus", onboardingStatus)
      // If status is pending and we're on Welcome (step 1), skip to VerificationPending
      if (prev === 1 && onboardingStatus === "pending") {
        return (prev + 1) as OnboardingStep
      }

      if (prev === 1 && onboardingStatus === "completed") {
        return 12 as OnboardingStep
      }
      if (prev < 12) {
        return (prev + 1) as OnboardingStep
      }
      return prev
    })
  }

  // Handler for hospital info step
  const handleHospitalInfoNext = (data: HospitalInfoValues) => {
    setVerificationData((prev) => ({ ...prev, hospitalInfo: data }))
    setCurrentStep(7)
  }

  // Handler for modules step
  const handleModulesNext = (data: ModulesValues) => {
    setVerificationData((prev) => ({ ...prev, modules: data }))
    setCurrentStep(8)
  }

  const handleModulesBack = () => {
    setCurrentStep(6)
  }

  // Handler for payment step
  const handlePaymentNext = (data: PaymentValues[]) => {
    setVerificationData((prev) => ({ ...prev, payment: data }))
    setCurrentStep(9)
  }

  const handlePaymentBack = () => {
    setCurrentStep(7)
  }

  // Handler for license history step
  const handleLicenseHistoryNext = (data: LicenseHistoryValues[]) => {
    setVerificationData((prev) => ({ ...prev, licenseHistory: data }))
    setCurrentStep(10)
  }

  const handleLicenseHistoryBack = () => {
    setCurrentStep(8)
  }

  // Handler for regulatory docs step (final verification step)
  const handleRegulatoryDocsNext = async (data: RegulatoryDocValues[]) => {
    setVerificationData((prev) => ({ ...prev, regulatoryDoc: data }))
    try {
      // Complete the verification process
      if (tenantId) {
        const result = await completeVerification(tenantId)
        if (result.success) {
          setCurrentStep(11) // Go to VerifiedPending
        } else {
          console.error("Failed to complete verification:", result.message)
        }
      } else {
        console.error("Tenant ID not available")
      }
    } catch (error) {
      console.error("Failed to complete verification:", error)
    }
  }

  const handleRegulatoryDocsBack = () => {
    setCurrentStep(9)
  }

  const handleDashboardNavigation = () => {
    // Navigate to dashboard
    router.push(`/t/${tenant}/dashboard`)
  }

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked")
  }

  if (isLoading || (tenantId && isLoadingTenantData)) {
    return (
      <main className="min-h-svh w-full flex items-center justify-center">
        <div>Loading...</div>
      </main>
    )
  }

  if (tenantDataError) {
    return (
      <main className="min-h-svh w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {tenantDataError instanceof Error
              ? tenantDataError.message
              : "Failed to load tenant data"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  if (error && !tenantId && currentStep >= 6) {
    return (
      <main className="min-h-svh w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  // For steps that require tenantId, check if it's available
  const requiresTenantId = currentStep >= 6 && currentStep <= 10
  const canProceed = !requiresTenantId || tenantId !== null

  return (
    <main className="min-h-svh w-full flex">
      <div className="flex-1/3 bg-[#001A4D] relative flex">
        <div className="w-full flex justify-center py-36">
          <Image src={hospitalSS} alt="alt" className="h-fit" />
        </div>
        <Image src={hospitalIcon} alt="alt" className="absolute bottom-0" />
      </div>
      <div className="flex-2/3 p-8">
        {currentStep === 1 && <Welcome onNext={handleNext} />}
        {currentStep === 2 && <Security onNext={handleNext} />}
        {currentStep === 3 && <VerifyEmail onNext={handleNext} />}
        {currentStep === 4 && <NewPassword onNext={handleNext} />}
        {currentStep === 5 && <PasswordUpdated onNext={handleNext} />}
        {/* {currentStep === 6 && canProceed && tenantId && (
          <HospitalInfo
            onNext={handleHospitalInfoNext}
            initialData={verificationData.hospitalInfo}
            tenantId={tenantId}
          />
        )} */}
        {(currentStep === 7 || currentStep === 6) && canProceed && tenantId && (
          <Modules
            onNext={handleModulesNext}
            onBack={handleModulesBack}
            initialData={verificationData.modules}
            tenantId={tenantId}
            tenantModules={tenantData?.tenant_modules}
          />
        )}
        {currentStep === 8 && canProceed && tenantId && (
          <Payment
            onNext={handlePaymentNext}
            onBack={handlePaymentBack}
            initialData={verificationData.payment}
            tenantId={tenantId}
            paymentConfigs={tenantData?.tenant_payment_configs}
          />
        )}
        {currentStep === 9 && canProceed && tenantId && (
          <LicenseHistory
            onNext={handleLicenseHistoryNext}
            onBack={handleLicenseHistoryBack}
            initialData={verificationData.licenseHistory}
            tenantId={tenantId}
            licenses={tenantData?.tenant_license_history}
          />
        )}
        {currentStep === 10 && canProceed && tenantId && (
          <RegulatoryDocs
            onNext={handleRegulatoryDocsNext}
            onBack={handleRegulatoryDocsBack}
            initialData={verificationData.regulatoryDoc}
            tenantId={tenantId}
            documents={tenantData?.tenant_regulatory_documents}
          />
        )}
        {currentStep === 11 && <VerifiedPending onLogout={handleLogout} />}
        {currentStep === 12 && (
          <VerifiedApproved
            onDashboard={handleDashboardNavigation}
            onLogout={handleLogout}
          />
        )}
        {requiresTenantId && !tenantId && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">
              {error || "Failed to load tenant information"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default OnboardingPage

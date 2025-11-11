"use client"

import { useState, useEffect } from "react"
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
} from "@/lib/api/onboarding"
import { useRouter, useParams } from "next/navigation"
import type {
  HospitalInfoValues,
  ModulesValues,
  PaymentValues,
  LicenseHistoryValues,
  RegulatoryDocValues,
} from "./_components/schemas"

type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1)
  const [isLoading, setIsLoading] = useState(true)
  const [tenantId, setTenantId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const params = useParams()
  const tenant = params?.tenant as string

  // Store verification form data
  const [verificationData, setVerificationData] = useState<{
    hospitalInfo?: HospitalInfoValues
    modules?: ModulesValues
    payment?: PaymentValues
    licenseHistory?: LicenseHistoryValues
    regulatoryDoc?: RegulatoryDocValues
  }>({})

  useEffect(() => {
    // Get tenant ID and fetch onboarding status
    const initialize = async () => {
      try {
        if (!tenant) {
          setError("Tenant not found")
          setIsLoading(false)
          return
        }

        // Get tenant ID from tenant slug
        try {
          const id = await getTenantId(tenant)
          setTenantId(id)

          // Fetch onboarding status
          const response = await getOnboardingStatus(id)

          if (response.serverStatus === "not-done") {
            setCurrentStep(1) // Start with Welcome
          } else if (response.serverStatus === "pending") {
            setCurrentStep(11) // Jump to VerificationPending
          } else if (response.serverStatus === "completed") {
            setCurrentStep(12) // Jump to VerificationApproved
          }
        } catch (error) {
          console.error("Failed to get tenant ID:", error)
          setError("Failed to load tenant information. Please try again.")
          // Still allow user to proceed, they might be creating a new tenant
          setCurrentStep(1)
        }
      } catch (error) {
        console.error("Failed to initialize:", error)
        setError("Failed to initialize. Please try again.")
        setCurrentStep(1)
      } finally {
        setIsLoading(false)
      }
    }

    initialize()
  }, [tenant])

  // Handler to progress to next step
  const handleNext = () => {
    setCurrentStep((prev) => {
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
  const handlePaymentNext = (data: PaymentValues) => {
    setVerificationData((prev) => ({ ...prev, payment: data }))
    setCurrentStep(9)
  }

  const handlePaymentBack = () => {
    setCurrentStep(7)
  }

  // Handler for license history step
  const handleLicenseHistoryNext = (data: LicenseHistoryValues) => {
    setVerificationData((prev) => ({ ...prev, licenseHistory: data }))
    setCurrentStep(10)
  }

  const handleLicenseHistoryBack = () => {
    setCurrentStep(8)
  }

  // Handler for regulatory docs step (final verification step)
  const handleRegulatoryDocsNext = async (data: RegulatoryDocValues) => {
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

  if (isLoading) {
    return (
      <main className="min-h-svh w-full flex items-center justify-center">
        <div>Loading...</div>
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
        {currentStep === 6 && canProceed && tenantId && (
          <HospitalInfo
            onNext={handleHospitalInfoNext}
            initialData={verificationData.hospitalInfo}
            tenantId={tenantId}
          />
        )}
        {currentStep === 7 && canProceed && tenantId && (
          <Modules
            onNext={handleModulesNext}
            onBack={handleModulesBack}
            initialData={verificationData.modules}
            tenantId={tenantId}
          />
        )}
        {currentStep === 8 && canProceed && tenantId && (
          <Payment
            onNext={handlePaymentNext}
            onBack={handlePaymentBack}
            initialData={verificationData.payment}
            tenantId={tenantId}
          />
        )}
        {currentStep === 9 && canProceed && tenantId && (
          <LicenseHistory
            onNext={handleLicenseHistoryNext}
            onBack={handleLicenseHistoryBack}
            initialData={verificationData.licenseHistory}
            tenantId={tenantId}
          />
        )}
        {currentStep === 10 && canProceed && tenantId && (
          <RegulatoryDocs
            onNext={handleRegulatoryDocsNext}
            onBack={handleRegulatoryDocsBack}
            initialData={verificationData.regulatoryDoc}
            tenantId={tenantId}
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

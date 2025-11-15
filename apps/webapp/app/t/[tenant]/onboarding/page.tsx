"use client"

import { useState, useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import Welcome from "./_components/welcome"
import LicenseHistory from "./_components/license-history"
import RegulatoryDocs from "./_components/regulatory-docs"
import VerifiedPending from "./_components/verification-pending"
import VerifiedApproved from "./_components/verification-approved"
import Image from "next/image"
import { IMAGES } from "@/lib/images"
import {
  getOnboardingStatus,
  completeVerification,
  getTenantId,
  getTenantData,
} from "@/lib/api/onboarding"
import { useRouter, useParams } from "next/navigation"
import type {
  LicenseHistoryValues,
  RegulatoryDocValues,
} from "@/lib/schemas/onboarding"
import { logoutCognitoUser } from "@/app/utils/auth"
import { useOnboardingFlow } from "@/app/hooks/use-onboarding-flow"
import { markWelcomeAsShown } from "@/app/utils/onboarding"

// Helper function to get base domain URL for error redirect
const getBaseDomainUrl = (path: string): string => {
  if (typeof window === "undefined") return path
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || "lvh.me"
  const protocol = window.location.protocol
  const port = window.location.port ? `:${window.location.port}` : ""
  return `${protocol}//${baseDomain}${port}${path}`
}

const OnboardingPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [tenantId, setTenantId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [onboardingStatus, setOnboardingStatus] = useState<
    "not-done" | "pending" | "completed" | null
  >(null)
  const router = useRouter()
  const params = useParams()
  const tenant = params?.tenant as string
  const statusInitializedRef = useRef(false)

  // Use onboarding flow hook for step management
  const {
    currentStep,
    setCurrentStep,
    isInitialized: flowInitialized,
  } = useOnboardingFlow({
    tenantId,
    onboardingStatus,
  })

  // Store verification form data (only license history and regulatory docs)
  const [verificationData, setVerificationData] = useState<{
    licenseHistory?: LicenseHistoryValues[]
    regulatoryDoc?: RegulatoryDocValues[]
  }>({})

  // Fetch tenant ID
  useEffect(() => {
    const initialize = async () => {
      try {
        const id = await getTenantId(tenant)
        if (!id) {
          window.location.href = getBaseDomainUrl("/error/no-tenant")
          return
        }
        setTenantId(id)
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

  // Fetch onboarding status when tenant ID is available (only once)
  useEffect(() => {
    if (tenantId && !statusInitializedRef.current) {
      // Mark as initialized immediately to prevent multiple initializations
      statusInitializedRef.current = true

      const initializeStatus = async () => {
        try {
          const response = await getOnboardingStatus(tenantId)
          setOnboardingStatus(response.serverStatus)
        } catch (error) {
          console.error("Failed to get onboarding status:", error)
          setError("Failed to load onboarding status. Please try again.")
          // Reset ref on error so we can retry
          statusInitializedRef.current = false
        }
      }

      initializeStatus()
    }
  }, [tenantId])

  // Handler for welcome page - mark welcome as shown and go to license history
  const handleWelcomeNext = () => {
    if (tenantId) {
      markWelcomeAsShown(tenantId)
      setCurrentStep("license-history")
    }
  }

  // Handler for license history step
  const handleLicenseHistoryNext = (data: LicenseHistoryValues[]) => {
    setVerificationData((prev) => ({ ...prev, licenseHistory: data }))
    setCurrentStep("regulatory-docs")
  }

  const handleLicenseHistoryBack = () => {
    setCurrentStep("welcome")
  }

  // Handler for regulatory docs step (final verification step)
  const handleRegulatoryDocsNext = async (data: RegulatoryDocValues[]) => {
    setVerificationData((prev) => ({ ...prev, regulatoryDoc: data }))
    try {
      // Complete the verification process
      if (tenantId) {
        const result = await completeVerification(tenantId)
        if (result.success) {
          setCurrentStep("verification-pending")
          // Update status to reflect pending state
          setOnboardingStatus("pending")
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
    setCurrentStep("license-history")
  }

  const handleDashboardNavigation = () => {
    // Navigate to dashboard
    router.push("/dashboard")
  }

  const handleLogout = () => {
    logoutCognitoUser()
    router.push("/login")
  }

  if (
    isLoading ||
    (tenantId && isLoadingTenantData) ||
    (tenantId && !flowInitialized)
  ) {
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

  // For steps that require tenantId, check if it's available
  const requiresTenantId =
    currentStep === "license-history" ||
    currentStep === "regulatory-docs" ||
    currentStep === "verification-pending" ||
    currentStep === "verification-approved"
  const canProceed = !requiresTenantId || tenantId !== null

  return (
    <main className="min-h-svh w-full flex">
      <div className="flex-1/3 bg-[#001A4D] relative flex">
        <div className="w-full flex justify-center py-36">
          <Image
            src={IMAGES.hospitalSS}
            alt="alt"
            className="h-fit"
            width={230}
            height={230}
          />
        </div>
        <Image
          src={IMAGES.hospitalIcon}
          alt="alt"
          className="absolute bottom-0"
          width={640}
          height={100}
        />
      </div>
      <div className="flex-2/3 p-8 h-screen overflow-y-auto">
        {currentStep === "welcome" && (
          <Welcome onNext={handleWelcomeNext} tenantData={tenantData} />
        )}
        {currentStep === "license-history" && canProceed && tenantId && (
          <LicenseHistory
            onNext={handleLicenseHistoryNext}
            onBack={handleLicenseHistoryBack}
            initialData={verificationData.licenseHistory}
            tenantId={tenantId}
            licenses={tenantData?.tenant_license_history}
          />
        )}
        {currentStep === "regulatory-docs" && canProceed && tenantId && (
          <RegulatoryDocs
            onNext={handleRegulatoryDocsNext}
            onBack={handleRegulatoryDocsBack}
            initialData={verificationData.regulatoryDoc}
            tenantId={tenantId}
            documents={tenantData?.tenant_regulatory_documents}
          />
        )}
        {currentStep === "verification-pending" && (
          <VerifiedPending onLogout={handleLogout} />
        )}
        {currentStep === "verification-approved" && (
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

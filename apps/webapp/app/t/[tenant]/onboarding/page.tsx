"use client"

import { useState, useEffect } from "react"
import Welcome from "./_components/welcome"
import Security from "./_components/security"
import VerifyEmail from "./_components/verify-email"
import NewPassword from "./_components/new-password"
import PasswordUpdated from "./_components/password-updated"
import VerifiedPending from "./_components/verification-pending"
import VerifiedApproved from "./_components/verification-approved"
import hospitalSS from "../assets/hospital-ss.png"
import hospitalIcon from "../assets/hospital-img.png"
import Image from "next/image"
import { getOnboardingStatus } from "@/lib/api/onboarding"
import { useRouter, useParams } from "next/navigation"

type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const tenant = params?.tenant as string

  useEffect(() => {
    // Fetch server status and determine initial step
    const fetchStatus = async () => {
      try {
        const response = await getOnboardingStatus()

        if (response.serverStatus === "not-done") {
          setCurrentStep(1) // Start with Welcome
        } else if (response.serverStatus === "pending") {
          setCurrentStep(6) // Jump to VerificationPending
        } else if (response.serverStatus === "completed") {
          setCurrentStep(7) // Jump to VerificationApproved
        }
      } catch (error) {
        console.error("Failed to fetch onboarding status:", error)
        // On error, default to step 1
        setCurrentStep(1)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStatus()
  }, [])

  // Handler to progress to next step
  const handleNext = () => {
    setCurrentStep((prev) => {
      if (prev < 7) {
        return (prev + 1) as OnboardingStep
      }
      return prev
    })
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
        {currentStep === 6 && <VerifiedPending onLogout={handleLogout} />}
        {currentStep === 7 && (
          <VerifiedApproved
            onDashboard={handleDashboardNavigation}
            onLogout={handleLogout}
          />
        )}
      </div>
    </main>
  )
}

export default OnboardingPage

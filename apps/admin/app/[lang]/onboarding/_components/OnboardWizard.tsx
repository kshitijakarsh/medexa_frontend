// Multi-step Onboarding Wizard
"use client"

import React, { useState } from "react"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import { Form } from "@workspace/ui/components/form"
import { Header } from "@/components/header"
import { FormHeader } from "./ui/FormHeader"
import { StepHospitalBase } from "./sections/StepHospitalBase"
import { ModuleAssignmentSection } from "./sections/ModulesAssignmentSection"
import { PaymentDetailsSection } from "./sections/PaymentDetailsSection"
import { LicenseHistorySection } from "./sections/LicenseHistorySection"
import { RegulatoryDocumentSection } from "./sections/RegulatoryDocumentSection"
import { FormActionsSection } from "./sections/FormActionsSection"
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  Step1Values,
  Step2Values,
  Step3Values,
  Step4Values,
  Step5Values,
} from "./schemas"
import {
  createHospital,
  updateHospitalModules,
  saveHospitalPayment,
  saveHospitalLicense,
  uploadRegulatoryDoc,
} from "@/lib/hospitals"

const TOTAL_STEPS = 5

export default function OnboardWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [hospitalId, setHospitalId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  // Step 1: Hospital Base
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const step1Form = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      hospitalName: "",
      mophLicenseNumber: "",
      tradeLicense: "",
      taxRegistrationNumber: "",
      contactEmail: "",
      contactPhone: "",
      emergencyContactNumber: "",
      city: "",
      fullAddress: "",
      adminFullName: "",
      adminDesignation: "",
      adminEmail: "",
      adminPhone: "",
      userFullName: "",
      userPassword: "",
    },
  })

  // Step 2: Modules
  const step2Form = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      modules: [],
    },
  })

  // Step 3: Payment Details
  const step3Form = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      gateway_id: "",
      merchant_id: "",
      terminal_key: "",
      vault_path: "",
      bank_name: "",
      bank_account_no: "",
      vat_registered: false,
      vat_number: "",
      currency_code: "",
    },
  })

  // Step 4: License History
  const step4Form = useForm<Step4Values>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      plan_key: "",
      seats: 0,
      storage_quota_mb: 10240,
      start_date: "",
      end_date: undefined,
      auto_renew: true,
      status: "active",
    },
  })

  // Step 5: Regulatory Document
  const [docFile, setDocFile] = useState<File | null>(null)
  const [docPreview, setDocPreview] = useState<string | null>(null)

  const step5Form = useForm<Step5Values>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      doc_type: "",
      authority_id: "",
      doc_number: "",
      issue_date: "",
      expiry_date: "",
      file_url: "",
      uploaded_by: "",
      verified_by: "",
      verified_at: "",
      status: "pending",
      notes: "",
    },
  })

  const onLogoSelected = (file?: File | null) => {
    setLogoFile(file ?? null)
    if (!file) {
      setLogoPreview(null)
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => setLogoPreview(String(e.target?.result ?? null))
    reader.readAsDataURL(file)
  }

  // Get current form based on step
  const getCurrentForm = () => {
    switch (currentStep) {
      case 0:
        return step1Form
      case 1:
        return step2Form
      case 2:
        return step3Form
      case 3:
        return step4Form
      case 4:
        return step5Form
      default:
        return step1Form
    }
  }

  // Handle primary action for current step
  const handlePrimary = async () => {
    const form = getCurrentForm()
    setServerError(null)

    // Trigger validation
    const isValid = await form.trigger()
    if (!isValid) {
      setServerError("Please fix the errors before continuing")
      return
    }

    setLoading(true)

    try {
      switch (currentStep) {
        case 0: {
          // Step 1: Create Hospital
          const values = step1Form.getValues()
          const result = await createHospital(values, logoFile)
          setHospitalId(result.id)
          setCurrentStep(1)
          break
        }

        case 1: {
          // Step 2: Update Modules
          if (!hospitalId) throw new Error("Hospital ID not found")
          const values = step2Form.getValues()
          await updateHospitalModules(hospitalId, {
            modules: values.modules || [],
          })
          setCurrentStep(2)
          break
        }

        case 2: {
          // Step 3: Save Payment Details
          if (!hospitalId) throw new Error("Hospital ID not found")
          const values = step3Form.getValues()
          await saveHospitalPayment(hospitalId, values)
          setCurrentStep(3)
          break
        }

        case 3: {
          // Step 4: Save License History
          if (!hospitalId) throw new Error("Hospital ID not found")
          const values = step4Form.getValues()
          // Dates are already strings from the form
          const payload = {
            ...values,
            start_date: values.start_date,
            end_date: values.end_date,
          }
          await saveHospitalLicense(hospitalId, payload)
          setCurrentStep(4)
          break
        }

        case 4: {
          // Step 5: Upload Regulatory Document
          if (!hospitalId) throw new Error("Hospital ID not found")
          const values = step5Form.getValues()

          const formData = new FormData()
          Object.entries(values).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== "") {
              formData.append(k, String(v))
            }
          })

          if (docFile) {
            formData.append("document", docFile)
          }

          await uploadRegulatoryDoc(hospitalId, formData)

          // Success! Optionally redirect or show success message
          alert("Hospital onboarded successfully!")
          // TODO: Redirect to hospital list or detail page
          window.location.href = "/hospitals"
          break
        }
      }
    } catch (err: any) {
      console.error(err)
      setServerError(err?.message ?? "Failed to save. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Handle back navigation
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setServerError(null)
    }
  }

  // Get primary button label
  const getPrimaryLabel = () => {
    if (currentStep === 0) return "Onboard New"
    if (currentStep === TOTAL_STEPS - 1) return "Onboard New"
    return "Next"
  }

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Form {...step1Form}>
            <StepHospitalBase
              form={step1Form}
              logoPreview={logoPreview}
              setLogoPreview={setLogoPreview}
              logoFile={logoFile}
              setLogoFile={setLogoFile}
              onLogoSelected={onLogoSelected}
            />
          </Form>
        )

      case 1:
        return (
          <Form {...step2Form}>
            <ModuleAssignmentSection form={step2Form} />
          </Form>
        )

      case 2:
        return (
          <Form {...step3Form}>
            <PaymentDetailsSection form={step3Form} />
          </Form>
        )

      case 3:
        return (
          <Form {...step4Form}>
            <LicenseHistorySection form={step4Form} />
          </Form>
        )

      case 4:
        return (
          <Form {...step5Form}>
            <RegulatoryDocumentSection
              form={step5Form}
              docFile={docFile}
              setDocFile={setDocFile}
              docPreview={docPreview}
              setDocPreview={setDocPreview}
            />
          </Form>
        )

      default:
        return null
    }
  }

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between mb-6">
          <FormHeader title="Onboard New Hospital" backHref="/hospitals" />

          {/* Step Indicator */}
          <div className="w-full px-4 pb-3 pt-7">
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: TOTAL_STEPS }).map((_, idx) => (
                <div key={idx} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      idx === currentStep
                        ? "bg-blue-600 text-white"
                        : idx < currentStep
                          ? "bg-green-500 text-white"
                          : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  {idx < TOTAL_STEPS - 1 && (
                    <div
                      className={`w-12 h-1 ${
                        idx < currentStep ? "bg-green-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-2 text-sm text-slate-600">
              Step {currentStep + 1} of {TOTAL_STEPS}:{" "}
              {currentStep === 0 && "Hospital Information"}
              {currentStep === 1 && "Module Assignment"}
              {currentStep === 2 && "Payment Details"}
              {currentStep === 3 && "License History"}
              {currentStep === 4 && "Regulatory Document"}
            </div>
          </div>

          <div className="p-4 w-full py-3">
            <div className="space-y-4">
              {/* Step Content */}
              {renderStepContent()}

              {/* Form Actions */}
              <FormActionsSection
                serverError={serverError}
                loading={loading}
                stepIndex={currentStep}
                totalSteps={TOTAL_STEPS}
                onBack={handleBack}
                onPrimary={handlePrimary}
                primaryLabel={getPrimaryLabel()}
                showReset={false}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

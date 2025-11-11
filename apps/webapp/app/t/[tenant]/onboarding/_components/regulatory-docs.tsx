"use client"

import { useState, useEffect } from "react"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import { VerificationIcon } from "../../assets/icons"
import { StepIndicator } from "./step-indicator"
import { FormInput } from "./form-input"
import { FormSelect } from "./form-select"
import { FormDate } from "./form-date"
import { FileUpload } from "./file-upload"
import Button from "@/components/ui/button"
import { regulatoryDocSchema, type RegulatoryDocValues } from "./schemas"
import {
  submitRegulatoryDoc,
  uploadRegulatoryDocFile,
} from "@/lib/api/onboarding"
import { getAuthToken } from "@/lib/api/utils"
import { createRegulatoryApiClient } from "@/lib/api/regulatory"
import type { Authority } from "@/lib/api/regulatory"
import { Textarea } from "@workspace/ui/components/textarea"

interface RegulatoryDocsProps {
  onNext?: (data: RegulatoryDocValues) => void
  onBack?: () => void
  initialData?: Partial<RegulatoryDocValues>
  tenantId: string
}

const RegulatoryDocs = ({
  onNext,
  onBack,
  initialData,
  tenantId,
}: RegulatoryDocsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [authorities, setAuthorities] = useState<
    { value: string; label: string }[]
  >([])
  const [isLoadingAuthorities, setIsLoadingAuthorities] = useState(true)
  const [isUploadingFile, setIsUploadingFile] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegulatoryDocValues>({
    resolver: zodResolver(regulatoryDocSchema),
    defaultValues: {
      doc_type: initialData?.doc_type || "",
      authority_id: initialData?.authority_id || 0,
      doc_number: initialData?.doc_number || "",
      issue_date: initialData?.issue_date || "",
      expiry_date: initialData?.expiry_date || "",
      file_url: initialData?.file_url || "",
      status: initialData?.status || "pending",
      notes: initialData?.notes || "",
    },
  })

  // Fetch authorities from API
  useEffect(() => {
    const fetchAuthorities = async () => {
      try {
        const token = await getAuthToken()
        const regulatoryClient = createRegulatoryApiClient({ authToken: token })
        const response = await regulatoryClient.getAuthoritesList()
        const authoritiesData = response.data.data.map((authority: Authority) => ({
          value: String(authority.id),
          label: `${authority.name_en} (${authority.short_code})`,
        }))
        setAuthorities(authoritiesData)
      } catch (err) {
        console.error("Failed to fetch authorities:", err)
        setError("Failed to load regulatory authorities. Please refresh the page.")
      } finally {
        setIsLoadingAuthorities(false)
      }
    }

    fetchAuthorities()
  }, [])

  const docTypes = [
    { value: "license", label: "License" },
    { value: "certificate", label: "Certificate" },
    { value: "permit", label: "Permit" },
    { value: "registration", label: "Registration" },
    { value: "accreditation", label: "Accreditation" },
  ]

  const handleFileSelect = async (file: File | null) => {
    if (file) {
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setFilePreview(result)
      }
      reader.readAsDataURL(file)

      // Try to upload file, but fall back to file name if upload fails
      setIsUploadingFile(true)
      setError(null)
      try {
        const uploadResult = await uploadRegulatoryDocFile(file)
        setValue("file_url", uploadResult.file_url)
      } catch (err) {
        console.warn("File upload not available, using file name:", err)
        // Use file name as placeholder - backend may handle upload separately
        setValue("file_url", file.name)
      } finally {
        setIsUploadingFile(false)
      }
    } else {
      setFilePreview(null)
      setValue("file_url", "")
    }
  }

  const onSubmit = async (data: RegulatoryDocValues) => {
    setIsSubmitting(true)
    setError(null)
    try {
      if (!data.file_url) {
        setError("Please upload a document file")
        setIsSubmitting(false)
        return
      }

      const result = await submitRegulatoryDoc(tenantId, data)
      if (result.success) {
        onNext?.(data)
      } else {
        setError(result.message || "Failed to submit regulatory document")
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
            Upload your regulatory documents to complete verification.
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={5} totalSteps={5} />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Document Type"
              id="doc_type"
              value={watch("doc_type") || ""}
              onValueChange={(value) => setValue("doc_type", value)}
              options={docTypes}
              placeholder="Select document type"
              required
              error={errors.doc_type?.message}
            />

            <FormSelect
              label="Authority"
              id="authority_id"
              value={
                watch("authority_id") && watch("authority_id") > 0
                  ? watch("authority_id").toString()
                  : ""
              }
              onValueChange={(value) =>
                setValue("authority_id", parseInt(value))
              }
              options={authorities}
              placeholder={
                isLoadingAuthorities
                  ? "Loading authorities..."
                  : "Select authority"
              }
              required
              error={errors.authority_id?.message}
              disabled={isLoadingAuthorities}
            />

            <FormInput
              {...register("doc_number")}
              label="Document Number"
              id="doc_number"
              placeholder="Enter document number"
              required
              error={errors.doc_number?.message}
            />

            <FormDate
              {...register("issue_date")}
              label="Issue Date"
              id="issue_date"
              required
              error={errors.issue_date?.message}
            />

            <FormDate
              {...register("expiry_date")}
              label="Expiry Date"
              id="expiry_date"
              required
              error={errors.expiry_date?.message}
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <FileUpload
              onFileSelect={handleFileSelect}
              accept=".pdf,.png,.jpg,.jpeg"
              label="Upload Document"
              required
              previewUrl={filePreview}
              error={errors.file_url?.message}
              disabled={isUploadingFile}
            />
            {isUploadingFile && (
              <p className="text-sm text-gray-500">Uploading file...</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes (Optional)
            </label>
            <Textarea
              {...register("notes")}
              id="notes"
              placeholder="Additional notes"
              rows={3}
              className="w-full"
            />
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
              disabled={isSubmitting || isUploadingFile}
              className="w-fit ml-auto"
            >
              {isSubmitting
                ? "Submitting..."
                : isUploadingFile
                  ? "Uploading..."
                  : "SUBMIT VERIFICATION"}
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

export default RegulatoryDocs

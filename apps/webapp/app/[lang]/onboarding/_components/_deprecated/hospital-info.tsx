"use client"

import { useState, useEffect } from "react"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import Image from "next/image"
import { ICONS } from "@/lib/icons"
import { StepIndicator } from "../step-indicator"
import { FormInput } from "../../../../../../components/ui/form-input"
import { FormSelect } from "../../../../../../components/ui/form-select"
import { FormDate } from "../../../../../../components/ui/form-date"
import { FormCheckbox } from "../../../../../../components/ui/form-checkbox"
import Button from "@/components/ui/button"
import { hospitalInfoSchema, type HospitalInfoValues } from "./schema"
import { submitHospitalInfo } from "./onboarding-api-deprecated"
import { getAuthToken } from "@/app/utils/onboarding"
import { createTenantApiClient } from "@/lib/api/tenant"
import { createRegulatoryApiClient } from "@/lib/api/regulatory"
import type { Country } from "@/lib/api/tenant"
import type { Authority } from "@/lib/api/regulatory"

interface HospitalInfoProps {
  onNext?: (data: HospitalInfoValues) => void
  initialData?: Partial<HospitalInfoValues>
  tenantId: string
}

const HospitalInfo = ({ onNext, initialData, tenantId }: HospitalInfoProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([])
  const [authorities, setAuthorities] = useState<
    { value: string; label: string }[]
  >([])
  const [isLoadingCountries, setIsLoadingCountries] = useState(true)
  const [isLoadingAuthorities, setIsLoadingAuthorities] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<HospitalInfoValues>({
    resolver: zodResolver(hospitalInfoSchema),
    defaultValues: {
      tenant_key: initialData?.tenant_key || "",
      external_id: initialData?.external_id || "",
      name_en: initialData?.name_en || "",
      name_local: initialData?.name_local || "",
      country_id: initialData?.country_id || 0,
      regulatory_authority_id: initialData?.regulatory_authority_id || 0,
      license_number: initialData?.license_number || "",
      license_expiry: initialData?.license_expiry || "",
      license_type: initialData?.license_type || "",
      commercial_reg_no: initialData?.commercial_reg_no || "",
      currency_code: initialData?.currency_code || "",
      vat_registered: initialData?.vat_registered || false,
      vat_number: initialData?.vat_number || "",
    },
  })

  const vatRegistered = watch("vat_registered")

  // Fetch countries and authorities from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAuthToken()
        const tenantClient = createTenantApiClient({ authToken: token })
        const regulatoryClient = createRegulatoryApiClient({ authToken: token })

        // Fetch countries
        try {
          const countriesResponse = await tenantClient.getCountriesList()
          const countriesData = countriesResponse.data.data.map(
            (country: Country) => ({
              value: String(country.id),
              label: `${country.name_en} (${country.iso_code})`,
            })
          )
          setCountries(countriesData)
        } catch (err) {
          console.error("Failed to fetch countries:", err)
          setError("Failed to load countries. Please refresh the page.")
        } finally {
          setIsLoadingCountries(false)
        }

        // Fetch authorities
        try {
          const authoritiesResponse = await regulatoryClient.getAuthoritesList()
          const authoritiesData = authoritiesResponse.data.data.map(
            (authority: Authority) => ({
              value: String(authority.id),
              label: `${authority.name_en} (${authority.short_code})`,
            })
          )
          setAuthorities(authoritiesData)
        } catch (err) {
          console.error("Failed to fetch authorities:", err)
          setError(
            "Failed to load regulatory authorities. Please refresh the page."
          )
        } finally {
          setIsLoadingAuthorities(false)
        }
      } catch (err) {
        console.error("Failed to get auth token:", err)
        setError("Authentication failed. Please log in again.")
        setIsLoadingCountries(false)
        setIsLoadingAuthorities(false)
      }
    }

    fetchData()
  }, [])

  // Currency options - these are typically static but can be derived from countries if needed
  const currencies = [
    { value: "QAR", label: "QAR - Qatari Riyal" },
    { value: "USD", label: "USD - US Dollar" },
    { value: "AED", label: "AED - UAE Dirham" },
    { value: "SAR", label: "SAR - Saudi Riyal" },
    { value: "EUR", label: "EUR - Euro" },
  ]

  const onSubmit = async (data: HospitalInfoValues) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const result = await submitHospitalInfo(tenantId, data)
      if (result.success) {
        onNext?.(data)
      } else {
        setError(result.message || "Failed to submit hospital information")
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
          <Image
            src={ICONS.verificationIcon}
            alt="Verification icon"
            width={78}
            height={78}
          />
          <h1 className="text-2xl font-semibold">
            Complete Your Hospital Verification
          </h1>
          <p className="text-gray-600">
            To activate your MedExa account and enable full access, please
            upload your hospital's legal and licensing documents.
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={1} totalSteps={5} />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              {...register("tenant_key")}
              label="Tenant Key"
              id="tenant_key"
              placeholder="Enter tenant key"
              required
              error={errors.tenant_key?.message}
            />

            <FormInput
              {...register("external_id")}
              label="External ID"
              id="external_id"
              placeholder="Enter external ID"
              required
              error={errors.external_id?.message}
            />

            <FormInput
              {...register("name_en")}
              label="Hospital Name (English)"
              id="name_en"
              placeholder="Enter hospital name in English"
              required
              error={errors.name_en?.message}
            />

            <FormInput
              {...register("name_local")}
              label="Hospital Name (Local)"
              id="name_local"
              placeholder="Enter hospital name in local language"
              required
              error={errors.name_local?.message}
            />

            <FormSelect
              label="Country"
              id="country_id"
              value={
                watch("country_id") && watch("country_id") > 0
                  ? watch("country_id").toString()
                  : ""
              }
              onValueChange={(value) => setValue("country_id", parseInt(value))}
              options={countries}
              placeholder={
                isLoadingCountries ? "Loading countries..." : "Select Country"
              }
              required
              error={errors.country_id?.message}
              disabled={isLoadingCountries}
            />

            <FormSelect
              label="Regulatory Authority"
              id="regulatory_authority_id"
              value={
                watch("regulatory_authority_id") &&
                watch("regulatory_authority_id") > 0
                  ? watch("regulatory_authority_id").toString()
                  : ""
              }
              onValueChange={(value) =>
                setValue("regulatory_authority_id", parseInt(value))
              }
              options={authorities}
              placeholder={
                isLoadingAuthorities
                  ? "Loading authorities..."
                  : "Select Authority"
              }
              required
              error={errors.regulatory_authority_id?.message}
              disabled={isLoadingAuthorities}
            />

            <FormInput
              {...register("license_number")}
              label="License Number"
              id="license_number"
              placeholder="Enter license number"
              required
              error={errors.license_number?.message}
            />

            <FormDate
              {...register("license_expiry")}
              label="License Expiry"
              id="license_expiry"
              required
              error={errors.license_expiry?.message}
            />

            <FormInput
              {...register("license_type")}
              label="License Type"
              id="license_type"
              placeholder="e.g., Medical Center"
              required
              error={errors.license_type?.message}
            />

            <FormInput
              {...register("commercial_reg_no")}
              label="Commercial Registration Number"
              id="commercial_reg_no"
              placeholder="Enter CR number"
              required
              error={errors.commercial_reg_no?.message}
            />

            <FormSelect
              label="Currency"
              id="currency_code"
              value={watch("currency_code") || ""}
              onValueChange={(value) => setValue("currency_code", value)}
              options={currencies}
              placeholder="Select Currency"
              required
              error={errors.currency_code?.message}
            />

            <div className="space-y-4">
              <FormCheckbox
                label="VAT Registered"
                id="vat_registered"
                checked={vatRegistered}
                onChange={(checked) => setValue("vat_registered", checked)}
                required
              />

              {vatRegistered && (
                <FormInput
                  {...register("vat_number")}
                  label="VAT Number"
                  id="vat_number"
                  placeholder="Enter VAT number"
                  required
                  error={errors.vat_number?.message}
                />
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end mt-8">
            <Button type="submit" disabled={isSubmitting} className="w-fit">
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

export default HospitalInfo

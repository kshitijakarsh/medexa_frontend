"use client"

import { useState, useEffect } from "react"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import { VerificationIcon } from "../../assets/icons"
import { StepIndicator } from "./step-indicator"
import { FormInput } from "./form-input"
import { FormSelect } from "./form-select"
import { FormCheckbox } from "./form-checkbox"
import Button from "@/components/ui/button"
import { paymentSchema, type PaymentValues } from "./schemas"
import { submitPaymentDetails } from "@/lib/api/onboarding"
import { getAuthToken } from "@/lib/api/utils"
import { createPaymentConfigApiClient } from "@/lib/api/payment"
import { createTenantApiClient } from "@/lib/api/tenant"
import type { PaymentGateway } from "@/lib/api/payment"
import type { Country } from "@/lib/api/tenant"

interface PaymentProps {
  onNext?: (data: PaymentValues) => void
  onBack?: () => void
  initialData?: Partial<PaymentValues>
  tenantId: string
}

const Payment = ({ onNext, onBack, initialData, tenantId }: PaymentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentGateways, setPaymentGateways] = useState<
    { value: string; label: string }[]
  >([])
  const [countries, setCountries] = useState<{ value: string; label: string }[]>(
    []
  )
  const [isLoadingGateways, setIsLoadingGateways] = useState(true)
  const [isLoadingCountries, setIsLoadingCountries] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      gateway_id: initialData?.gateway_id || 0,
      merchant_id: initialData?.merchant_id || "",
      terminal_key: initialData?.terminal_key || "",
      vault_path: initialData?.vault_path || "",
      bank_name: initialData?.bank_name || "",
      bank_account_no: initialData?.bank_account_no || "",
      vat_registered: initialData?.vat_registered || false,
      vat_number: initialData?.vat_number || "",
      currency_code: initialData?.currency_code || "",
      active: initialData?.active ?? true,
    },
  })

  const vatRegistered = watch("vat_registered")

  // Fetch payment gateways and countries from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAuthToken()
        const paymentClient = createPaymentConfigApiClient({ authToken: token })
        const tenantClient = createTenantApiClient({ authToken: token })

        // Fetch payment gateways
        try {
          const gatewaysResponse = await paymentClient.getPaymentGateways()
          const gatewaysData = gatewaysResponse.data.data.map(
            (gateway: PaymentGateway) => ({
              value: String(gateway.id),
              label: gateway.name,
            })
          )
          setPaymentGateways(gatewaysData)
        } catch (err) {
          console.error("Failed to fetch payment gateways:", err)
          setError("Failed to load payment gateways. Please refresh the page.")
        } finally {
          setIsLoadingGateways(false)
        }

        // Fetch countries for currency selection
        try {
          const countriesResponse = await tenantClient.getCountriesList()
          const countriesData = countriesResponse.data.data.map(
            (country: Country) => ({
              value: country.currency_code,
              label: `${country.currency_code} - ${country.name_en}`,
            })
          )
          // Remove duplicates based on currency code
          const uniqueCurrencies = Array.from(
            new Map(countriesData.map((item) => [item.value, item])).values()
          )
          setCountries(uniqueCurrencies)
        } catch (err) {
          console.error("Failed to fetch countries:", err)
          // Don't set error for countries as it's not critical
        } finally {
          setIsLoadingCountries(false)
        }
      } catch (err) {
        console.error("Failed to get auth token:", err)
        setError("Authentication failed. Please log in again.")
        setIsLoadingGateways(false)
        setIsLoadingCountries(false)
      }
    }

    fetchData()
  }, [])

  const onSubmit = async (data: PaymentValues) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const result = await submitPaymentDetails(tenantId, data)
      if (result.success) {
        onNext?.(data)
      } else {
        setError(result.message || "Failed to submit payment details")
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
            Provide payment gateway and bank details for your hospital.
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={3} totalSteps={5} />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Payment Gateway"
              id="gateway_id"
              value={
                watch("gateway_id") && watch("gateway_id") > 0
                  ? watch("gateway_id").toString()
                  : ""
              }
              onValueChange={(value) => setValue("gateway_id", parseInt(value))}
              options={paymentGateways}
              placeholder={
                isLoadingGateways
                  ? "Loading gateways..."
                  : "Select Payment Gateway"
              }
              required
              error={errors.gateway_id?.message}
              disabled={isLoadingGateways}
            />

            <FormInput
              {...register("merchant_id")}
              label="Merchant ID"
              id="merchant_id"
              placeholder="Enter merchant ID"
              required
              error={errors.merchant_id?.message}
            />

            <FormInput
              {...register("terminal_key")}
              label="Terminal Key"
              id="terminal_key"
              placeholder="Enter terminal key"
              required
              error={errors.terminal_key?.message}
            />

            <FormInput
              {...register("vault_path")}
              label="Vault Path"
              id="vault_path"
              placeholder="Enter vault path"
              required
              error={errors.vault_path?.message}
            />

            <FormInput
              {...register("bank_name")}
              label="Bank Name"
              id="bank_name"
              placeholder="Enter bank name"
              required
              error={errors.bank_name?.message}
            />

            <FormInput
              {...register("bank_account_no")}
              label="Bank Account Number"
              id="bank_account_no"
              placeholder="Enter account number"
              required
              error={errors.bank_account_no?.message}
            />

            <FormSelect
              label="Currency Code"
              id="currency_code"
              value={watch("currency_code") || ""}
              onValueChange={(value) => setValue("currency_code", value)}
              options={countries}
              placeholder={
                isLoadingCountries ? "Loading currencies..." : "Select Currency"
              }
              required
              error={errors.currency_code?.message}
              disabled={isLoadingCountries}
            />

            <div className="space-y-4">
              <FormCheckbox
                label="VAT Registered"
                id="vat_registered"
                checked={vatRegistered}
                onChange={(checked) => setValue("vat_registered", checked)}
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

export default Payment

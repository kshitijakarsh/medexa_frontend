"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import Image from "next/image"
import { ICONS } from "@/lib/icons"
import { StepIndicator } from "../step-indicator"
import { FormInput } from "../../../../../../components/ui/form-input"
import { FormSelect } from "../../../../../../components/ui/form-select"
import { FormCheckbox } from "../../../../../../components/ui/form-checkbox"
import Button from "@/components/ui/button"
import { paymentSchema, type PaymentValues } from "./schema"
import { getAuthToken } from "@/app/utils/onboarding"
import {
  createPaymentConfigApiClient,
  type PaymentConfig,
  type PaymentGateway,
  type CreatePaymentConfigParams,
  type UpdatePaymentConfigParams,
} from "./payment-api"
import { createTenantApiClient, type Country } from "@/lib/api/tenant"
import { Edit, Plus, Trash2 } from "lucide-react"

interface PaymentProps {
  onNext?: (data: PaymentValues[]) => void
  onBack?: () => void
  initialData?: Partial<PaymentValues>[]
  tenantId: string
  paymentConfigs?: PaymentConfig[]
}

const defaultValues: PaymentValues = {
  gateway_id: 0,
  merchant_id: "",
  terminal_key: "",
  vault_path: "",
  bank_name: "",
  bank_account_no: "",
  vat_registered: false,
  vat_number: "",
  currency_code: "",
  active: true,
}

const Payment = ({
  onNext,
  onBack,
  tenantId,
  paymentConfigs: propPaymentConfigs = [],
}: PaymentProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<PaymentConfig | null>(null)
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  // Use payment configs from props
  const paymentConfigs = propPaymentConfigs
  const isLoadingConfigs = false

  // Get auth token for API clients
  const [authToken, setAuthToken] = useState<string>("")

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAuthToken()
        setAuthToken(token)
      } catch (err) {
        console.error("Failed to get auth token:", err)
        setError("Authentication failed. Please log in again.")
      }
    }
    fetchToken()
  }, [])

  // Create API clients
  const paymentClient = authToken
    ? createPaymentConfigApiClient({ authToken })
    : null
  const tenantClient = authToken ? createTenantApiClient({ authToken }) : null

  // Fetch payment gateways
  const { data: gateways = [], isLoading: isLoadingGateways } = useQuery({
    queryKey: ["payment-gateways"],
    queryFn: async () => {
      if (!paymentClient) throw new Error("API client not initialized")
      const response = await paymentClient.getPaymentGateways()
      return response.data.data
    },
    enabled: !!paymentClient,
  })

  // Fetch countries
  const { data: countries = [], isLoading: isLoadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      if (!tenantClient) throw new Error("API client not initialized")
      const response = await tenantClient.getCountriesList()
      return response.data.data
    },
    enabled: !!tenantClient,
  })

  const form = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  })

  const vatRegistered = form.watch("vat_registered")

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (payload: CreatePaymentConfigParams) => {
      if (!paymentClient) throw new Error("API client not initialized")
      const response = await paymentClient.createPaymentConfig(
        tenantId,
        payload
      )
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenant", tenantId] })
      setIsDialogOpen(false)
      setEditingItem(null)
      form.reset(defaultValues)
      setError(null)
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to create payment config")
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: { id: string } & UpdatePaymentConfigParams) => {
      if (!paymentClient) throw new Error("API client not initialized")
      const response = await paymentClient.updatePaymentConfig(id, payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenant", tenantId] })
      setIsDialogOpen(false)
      setEditingItem(null)
      form.reset(defaultValues)
      setError(null)
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to update payment config")
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!paymentClient) throw new Error("API client not initialized")
      await paymentClient.deletePaymentConfig(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenant", tenantId] })
      setError(null)
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to delete payment config")
    },
  })

  const handleAddNew = () => {
    setEditingItem(null)
    form.reset(defaultValues)
    setIsDialogOpen(true)
    setError(null)
  }

  const handleEdit = (item: PaymentConfig) => {
    setEditingItem(item)
    form.reset({
      gateway_id: item.gateway_id,
      merchant_id: item.merchant_id,
      terminal_key: item.terminal_key,
      vault_path: item.vault_path,
      bank_name: item.bank_name,
      bank_account_no: item.bank_account_no,
      vat_registered: item.vat_registered,
      vat_number: item.vat_number,
      currency_code: item.currency_code,
      active: item.active,
    })
    setIsDialogOpen(true)
    setError(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this payment config?")) {
      deleteMutation.mutate(id)
    }
  }

  const handleSaveItem = async (values: PaymentValues) => {
    if (editingItem) {
      updateMutation.mutate({
        id: editingItem.id,
        ...values,
      })
    } else {
      createMutation.mutate(values)
    }
  }

  const handleNext = () => {
    // Convert payment configs to PaymentValues format for onNext
    const paymentValues: PaymentValues[] = paymentConfigs.map((config) => ({
      gateway_id: config.gateway_id,
      merchant_id: config.merchant_id,
      terminal_key: config.terminal_key,
      vault_path: config.vault_path,
      bank_name: config.bank_name,
      bank_account_no: config.bank_account_no,
      vat_registered: config.vat_registered,
      vat_number: config.vat_number,
      currency_code: config.currency_code,
      active: config.active,
    }))
    onNext?.(paymentValues)
  }

  // Prepare options for dropdowns
  const paymentGatewaysOptions =
    gateways.map((gateway: PaymentGateway) => ({
      value: String(gateway.id),
      label: gateway.name,
    })) || []

  const countriesOptions = Array.from(
    new Map(
      countries.map((country: Country) => [
        country.currency_code,
        {
          value: country.currency_code,
          label: `${country.currency_code} - ${country.name_en}`,
        },
      ])
    ).values()
  )

  const isPending = createMutation.isPending || updateMutation.isPending

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
            Provide payment gateway and bank details for your hospital.
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={2} totalSteps={4} />

        {/* Error Display */}
        {(error ||
          createMutation.isError ||
          updateMutation.isError ||
          deleteMutation.isError) && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600 text-sm">
              {error ||
                (createMutation.error instanceof Error
                  ? createMutation.error.message
                  : updateMutation.error instanceof Error
                    ? updateMutation.error.message
                    : deleteMutation.error instanceof Error
                      ? deleteMutation.error.message
                      : "An error occurred")}
            </p>
          </div>
        )}

        {/* Payment Configs List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Payment Configurations</h2>
            <Button
              type="button"
              onClick={handleAddNew}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Payment Config
            </Button>
          </div>

          {isLoadingConfigs ? (
            <div className="text-center py-8 text-gray-500">
              Loading payment configurations...
            </div>
          ) : paymentConfigs.length === 0 ? (
            <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
              No payment configurations added yet. Click "Add Payment Config" to
              get started.
            </div>
          ) : (
            <div className="space-y-3">
              {paymentConfigs.map((config) => {
                const gateway = gateways.find(
                  (g) => Number(g.id) === config.gateway_id
                )
                return (
                  <div
                    key={config.id}
                    className="border border-gray-200 rounded-lg p-4 flex items-start justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {gateway?.name || `Gateway #${config.gateway_id}`}
                      </div>
                      <div className="text-sm text-gray-600 mt-1 space-y-1">
                        {config.merchant_id && (
                          <div>Merchant ID: {config.merchant_id}</div>
                        )}
                        {config.bank_name && (
                          <div>Bank: {config.bank_name}</div>
                        )}
                        {config.currency_code && (
                          <div>Currency: {config.currency_code}</div>
                        )}
                        <div>
                          Status: {config.active ? "Active" : "Inactive"}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleEdit(config)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleDelete(config.id)}
                        disabled={deleteMutation.isPending}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

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
            type="button"
            onClick={handleNext}
            disabled={isLoadingConfigs || paymentConfigs.length === 0}
            className="w-fit ml-auto"
          >
            NEXT STEP
          </Button>
        </div>

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

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Payment Config" : "Add Payment Config"}
            </DialogTitle>
            <DialogDescription>
              Configure payment gateway and banking details
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(handleSaveItem)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label="Payment Gateway"
                id="gateway_id"
                value={
                  form.watch("gateway_id") && form.watch("gateway_id") > 0
                    ? form.watch("gateway_id").toString()
                    : ""
                }
                onValueChange={(value) =>
                  form.setValue("gateway_id", parseInt(value))
                }
                options={paymentGatewaysOptions}
                placeholder={
                  isLoadingGateways
                    ? "Loading gateways..."
                    : "Select Payment Gateway"
                }
                required
                error={form.formState.errors.gateway_id?.message}
                disabled={isLoadingGateways}
              />

              <FormInput
                {...form.register("merchant_id")}
                label="Merchant ID"
                id="merchant_id"
                placeholder="Enter merchant ID"
                required
                error={form.formState.errors.merchant_id?.message}
              />

              <FormInput
                {...form.register("terminal_key")}
                label="Terminal Key"
                id="terminal_key"
                placeholder="Enter terminal key"
                required
                error={form.formState.errors.terminal_key?.message}
              />

              <FormInput
                {...form.register("vault_path")}
                label="Vault Path"
                id="vault_path"
                placeholder="Enter vault path"
                required
                error={form.formState.errors.vault_path?.message}
              />

              <FormInput
                {...form.register("bank_name")}
                label="Bank Name"
                id="bank_name"
                placeholder="Enter bank name"
                required
                error={form.formState.errors.bank_name?.message}
              />

              <FormInput
                {...form.register("bank_account_no")}
                label="Bank Account Number"
                id="bank_account_no"
                placeholder="Enter account number"
                required
                error={form.formState.errors.bank_account_no?.message}
              />

              <FormSelect
                label="Currency Code"
                id="currency_code"
                value={form.watch("currency_code") || ""}
                onValueChange={(value) => form.setValue("currency_code", value)}
                options={countriesOptions}
                placeholder={
                  isLoadingCountries
                    ? "Loading currencies..."
                    : "Select Currency"
                }
                required
                error={form.formState.errors.currency_code?.message}
                disabled={isLoadingCountries}
              />

              <div className="space-y-4">
                <FormCheckbox
                  label="VAT Registered"
                  id="vat_registered"
                  checked={vatRegistered}
                  onChange={(checked) =>
                    form.setValue("vat_registered", checked)
                  }
                />

                {vatRegistered && (
                  <FormInput
                    {...form.register("vat_number")}
                    label="VAT Number"
                    id="vat_number"
                    placeholder="Enter VAT number"
                    required
                    error={form.formState.errors.vat_number?.message}
                  />
                )}
              </div>

              <div className="md:col-span-2">
                <FormCheckbox
                  label="Active"
                  id="active"
                  checked={form.watch("active")}
                  onChange={(checked) => form.setValue("active", checked)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  setEditingItem(null)
                  form.reset(defaultValues)
                  setError(null)
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? editingItem
                    ? "Updating..."
                    : "Adding..."
                  : editingItem
                    ? "Update"
                    : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Payment

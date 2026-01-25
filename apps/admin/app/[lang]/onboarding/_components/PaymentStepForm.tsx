"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Label } from "@workspace/ui/components/label"
import type { Dictionary } from "@/i18n/get-dictionary"
import { Input } from "@workspace/ui/components/input"
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react"
import {
  step3Schema,
  type Step3Values,
} from "@/app/[lang]/onboarding/_components/schemas"
import {
  createPaymentConfigApiClient,
  type PaymentGateway,
  type PaymentConfig,
  type CreatePaymentConfigParams,
  type UpdatePaymentConfigParams,
} from "@/lib/api/payment"
import { createTenantApiClient, type Country } from "@/lib/api/tenant"
import { useOnboardingStore } from "@/stores/onboarding"
import { getIdToken } from "@/lib/api"
import { cn } from "@workspace/ui/lib/utils"

import { toast } from "@workspace/ui/lib/sonner"

const defaultValues: Step3Values = {
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

export function PaymentStepForm({ dict }: { dict: Dictionary }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ lang: string }>()
  const queryClient = useQueryClient()
  // const dict = useDictionary();
  const t = dict.pages.onboarding.payment
  const common = dict.common


  const lang = params?.lang ?? "en"
  const onboardingBase = `/${lang}/onboarding`
  const modulesPath = `${onboardingBase}/modules`
  const hospitalId = searchParams.get("hospitalId") || "dev-hospital-1"
  const type = searchParams.get("type")
  const isEditMode = type === "edit"

  const {
    payment: paymentState,
    setPaymentItems,
    setPaymentCountryId,
    savePayment,
  } = useOnboardingStore()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<PaymentConfig | null>(null)
  const [authToken, setAuthToken] = useState<string>("")

  // Retrieve token on component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getIdToken()
        setAuthToken(token || "")
      } catch (error) {
        console.error("Failed to get auth token:", error)
        setAuthToken("")
      }
    }
    fetchToken()
  }, [])

  // Create API client instance with retrieved token
  const paymentApiClient = useMemo(
    () => createPaymentConfigApiClient({ authToken }),
    [authToken]
  )

  useEffect(() => {
    if (!hospitalId) {
      router.replace(`/${lang}/create-hospital`)
    }
  }, [hospitalId, router, lang])

  // Fetch tenant data to populate payment configs from backend
  const { data: tenantData } = useQuery({
    queryKey: ["tenant", hospitalId, authToken],
    queryFn: async () => {
      const token = authToken || (await getIdToken()) || ""
      const client = createTenantApiClient({ authToken: token })
      const response = await client.getTenantById(hospitalId)
      return response.data.data
    },
    enabled: !!hospitalId && !!authToken,
  })

  const { data: gateways = [], isLoading: isLoadingGateways } = useQuery({
    queryKey: ["gateways"],
    queryFn: async () => {
      const response = await paymentApiClient.getPaymentGateways()
      return response.data.data
    },
  })

  const { data: countries = [], isLoading: isLoadingCountries } = useQuery<
    Country[]
  >({
    queryKey: ["countries", authToken],
    queryFn: async () => {
      const token = authToken || (await getIdToken()) || ""
      const client = createTenantApiClient({ authToken: token })
      const response = await client.getCountriesList()
      return response.data.data
    },
    enabled: !!authToken,
  })

  // Populate store with tenant payment configs when data loads
  useEffect(() => {
    if (tenantData?.tenant_payment_configs !== undefined) {
      const paymentConfigs = tenantData.tenant_payment_configs
      // Only update if different from current state
      if (
        JSON.stringify(paymentConfigs) !== JSON.stringify(paymentState.items)
      ) {
        setPaymentItems(paymentConfigs)
        // Extract country_id from first payment config if available and countries are loaded
        const firstPaymentConfig = paymentConfigs[0]
        if (
          firstPaymentConfig &&
          firstPaymentConfig.currency_code &&
          countries.length > 0
        ) {
          const country = countries.find(
            (c) => c.currency_code === firstPaymentConfig.currency_code
          )
          if (country) {
            setPaymentCountryId(country.id)
          }
        }
      }
    }
  }, [
    tenantData,
    setPaymentItems,
    setPaymentCountryId,
    paymentState.items,
    countries,
  ])

  const createMutation = useMutation({
    mutationFn: async (payload: CreatePaymentConfigParams) => {
      const response = await paymentApiClient.createPaymentConfig(
        hospitalId,
        payload
      )
      return response.data.data
    },
    onSuccess: (newConfig) => {
      const gg = Array.isArray(newConfig) ? newConfig : [newConfig]
      const updatedItems = [...paymentState.items, ...gg]
      setPaymentItems(updatedItems)
      queryClient.invalidateQueries({ queryKey: ["tenant", hospitalId] })
      setIsDialogOpen(false)
      form.reset(defaultValues)
      toast.success("Payment configuration added successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to add payment configuration")
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: { id: string } & UpdatePaymentConfigParams) => {
      const response = await paymentApiClient.updatePaymentConfig(id, payload)
      return response.data
    },
    onSuccess: (updatedConfig) => {
      const updatedItems = paymentState.items.map((item) =>
        item.id === updatedConfig.id ? updatedConfig : item
      )
      setPaymentItems(updatedItems)
      queryClient.invalidateQueries({ queryKey: ["tenant", hospitalId] })
      setIsDialogOpen(false)
      setEditingItem(null)
      form.reset(defaultValues)
      toast.success("Payment configuration updated successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to update payment configuration")
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await paymentApiClient.deletePaymentConfig(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenant", hospitalId] })
      toast.success("Payment configuration deleted successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to delete payment configuration")
    },
  })

  const form = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues,
  })

  const handleAddNew = () => {
    setEditingItem(null)
    form.reset(defaultValues)
    setIsDialogOpen(true)
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
  }

  const handleDelete = (id: string) => {
    if (confirm(t.deleteConfirm)) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          const updatedItems = paymentState.items.filter(
            (item) => item.id !== id
          )
          setPaymentItems(updatedItems)
        },
      })
    }
  }

  const handleSaveItem = async (values: Step3Values) => {
    if (editingItem) {
      updateMutation.mutate({
        id: editingItem.id,
        ...values,
      })
    } else {
      createMutation.mutate(values)
    }
  }

  const handleSaveAndContinue = () => {
    savePayment()
    const params = new URLSearchParams({ hospitalId })
    if (isEditMode) {
      params.set("type", "edit")
    }
    router.push(`${onboardingBase}/licence-history?${params.toString()}`)
  }

  if (!hospitalId) {
    return null
  }

  if (isLoadingGateways) {
    return (
      <div className="space-y-4">
        <div className="bg-white/80 rounded-lg p-4 md:p-6">
          <p className="text-center text-muted-foreground">
            Loading payment gateways...
          </p>
        </div>
      </div>
    )
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <div className="space-y-4">
      <div className="bg-white/80 rounded-lg p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {t.title}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {t.subtitle}
            </p>
          </div>
          <Button
            type="button"
            onClick={handleAddNew}
            className="flex items-center gap-2"
          >
            <Plus className="size-4" />
            {t.addPaymentConfig}
          </Button>
        </div>

        {paymentState.items.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            {t.emptyState}
          </div>
        ) : (
          <div className="space-y-3">
            {paymentState.items.map((item) => {
              const gateway = gateways.find(
                (g) => Number(g.id) === item.gateway_id
              )
              return (
                <div
                  key={item.gateway_id}
                  className="border border-slate-200 rounded-lg p-4 flex items-start justify-between"
                >
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">
                      {gateway?.name || `Gateway #${item.gateway_id}`}
                    </div>
                    <div className="text-sm text-slate-600 mt-1 space-y-1">
                      {item.merchant_id && (
                        <div>Merchant ID: {item.merchant_id}</div>
                      )}
                      {item.bank_name && <div>Bank: {item.bank_name}</div>}
                      {item.currency_code && (
                        <div>Currency: {item.currency_code}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div
        className={cn(
          "bg-white/80 rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between relative",
          isEditMode ? "justify-end" : "justify-between"
        )}
      >
        {(createMutation.isError ||
          updateMutation.isError ||
          deleteMutation.isError) && (
            <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-red-600">
              {deleteMutation.error instanceof Error
                ? deleteMutation.error.message
                : createMutation.error instanceof Error
                  ? createMutation.error.message
                  : updateMutation.error instanceof Error
                    ? updateMutation.error.message
                    : common.error}
            </div>
          )}

        {!isEditMode && (
          <div className="flex gap-3 items-center">
            <Button
              type="button"
              variant="outline"
              asChild
              className="px-4 py-2 cursor-pointer flex items-center gap-2 rounded-full"
            >
              <Link href={`${modulesPath}?hospitalId=${hospitalId}`}>
                <ArrowLeft className="size-4" />
                {common.back}
              </Link>
            </Button>
          </div>
        )}

        <div className="flex gap-3 items-center mt-4 md:mt-0">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              const params = new URLSearchParams({ hospitalId })
              if (isEditMode) {
                params.set("type", "edit")
              }
              router.push(
                `${onboardingBase}/licence-history?${params.toString()}`
              )
            }}
            className="px-4 py-2 cursor-pointer flex items-center gap-2 rounded-full"
          >
            {common.skip}
          </Button>
          <Button
            type="button"
            onClick={handleSaveAndContinue}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full py-3 px-6"
          >
            {dict.pages.hospitals.create.submit}
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? t.editDialogTitle : t.addDialogTitle}
            </DialogTitle>
            <DialogDescription>
              {t.dialogDescription}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSaveItem)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="gateway_id"
                render={({ field }) => (
                  <FormItem>
                    <Label>{t.gateway.label}</Label>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={
                        field.value && field.value !== 0
                          ? String(field.value)
                          : undefined
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t.gateway.placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gateways.map((gateway) => (
                          <SelectItem
                            key={gateway.id}
                            value={String(gateway.id)}
                          >
                            {gateway.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="merchant_id"
                  render={({ field }) => (
                    <FormItem>
                      <Label>{t.merchantId.label}</Label>
                      <FormControl>
                        <Input placeholder={t.merchantId.placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terminal_key"
                  render={({ field }) => (
                    <FormItem>
                      <Label>{t.terminalKey.label}</Label>
                      <FormControl>
                        <Input placeholder={t.terminalKey.placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vault_path"
                  render={({ field }) => (
                    <FormItem>
                      <Label>{t.vaultPath.label}</Label>
                      <FormControl>
                        <Input placeholder={t.vaultPath.placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bank_name"
                  render={({ field }) => (
                    <FormItem>
                      <Label>{t.bankName.label}</Label>
                      <FormControl>
                        <Input placeholder={t.bankName.placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bank_account_no"
                render={({ field }) => (
                  <FormItem>
                    <Label>{t.bankAccount.label}</Label>
                    <FormControl>
                      <Input placeholder={t.bankAccount.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vat_registered"
                  render={({ field }) => (
                    <FormItem>
                      <Label>{t.vatRegistered}</Label>
                      <FormControl>
                        <div className="flex items-center gap-2 h-10">
                          <input
                            type="checkbox"
                            checked={field.value || false}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm text-slate-600">
                            {field.value ? common.yes : common.no}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("vat_registered") && (
                  <FormField
                    control={form.control}
                    name="vat_number"
                    render={({ field }) => (
                      <FormItem>
                        <Label>{t.vatNumber.label}</Label>
                        <FormControl>
                          <Input placeholder={t.vatNumber.placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="currency_code"
                render={({ field }) => (
                  <FormItem>
                    <Label>{t.currency.label}</Label>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          // Find the country and store its ID in session
                          const selectedCountry = countries.find(
                            (c) => c.currency_code === value
                          )
                          if (selectedCountry) {
                            setPaymentCountryId(selectedCountry.id)
                          }
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t.currency.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoadingCountries ? (
                            <div className="py-2 px-3 text-sm text-muted-foreground">
                              {common.loading}
                            </div>
                          ) : (
                            countries.map((c) => (
                              <SelectItem key={c.id} value={c.currency_code}>
                                {c.currency_code} - {c.name_en}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <Label>{t.status}</Label>
                    <FormControl>
                      <div className="flex items-center gap-2 h-10">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-sm text-slate-600">
                          {field.value ? common.active : common.inactive}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false)
                    setEditingItem(null)
                    form.reset(defaultValues)
                  }}
                >
                  {common.cancel}
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isPending
                    ? editingItem
                      ? common.updating
                      : common.adding
                    : editingItem
                      ? common.update
                      : common.add}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

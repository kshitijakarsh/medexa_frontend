"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form"
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
import { Input } from "@workspace/ui/components/input"
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react"
import { step3Schema, type Step3Values } from "@/app/[lang]/onboarding/_components/schemas"
import {
  getPaymentGateways,
  createPaymentConfig,
  updatePaymentConfig,
  type PaymentConfig,
} from "@/lib/api/mock/payment"
import { useOnboardingStore } from "@/stores/onboarding"

const defaultValues: Step3Values = {
  gateway_id: "",
  merchant_id: "",
  terminal_key: "",
  vault_path: "",
  bank_name: "",
  bank_account_no: "",
  vat_registered: false,
  vat_number: "",
  currency_code: "",
}

export function PaymentStepForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ lang: string }>()
  const queryClient = useQueryClient()

  const lang = params?.lang ?? "en"
  const onboardingBase = `/${lang}/onboarding`
  const modulesPath = `${onboardingBase}/modules`
  const hospitalId = searchParams.get("hospitalId") || "dev-hospital-1"

  const { payment: paymentState, setPaymentItems, savePayment, skipPayment } = useOnboardingStore()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<PaymentConfig | null>(null)

  useEffect(() => {
    if (!hospitalId) {
      router.replace(`/${lang}/create-hospital`)
    }
  }, [hospitalId, router, lang])

  const { data: gateways = [], isLoading: isLoadingGateways } = useQuery({
    queryKey: ["gateways"],
    queryFn: getPaymentGateways,
  })

  const createMutation = useMutation({
    mutationFn: (payload: Omit<PaymentConfig, "id">) =>
      createPaymentConfig(hospitalId, payload),
    onSuccess: (newConfig) => {
      const updatedItems = [...paymentState.items, newConfig]
      setPaymentItems(updatedItems)
      queryClient.setQueryData(["tenant", "payment-config"], updatedItems)
      setIsDialogOpen(false)
      form.reset(defaultValues)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, ...payload }: PaymentConfig) =>
      updatePaymentConfig(id, { id, ...payload }),
    onSuccess: (updatedConfig) => {
      const updatedItems = paymentState.items.map((item) =>
        item.id === updatedConfig.id ? updatedConfig : item
      )
      setPaymentItems(updatedItems)
      queryClient.setQueryData(["tenant", "payment-config"], updatedItems)
      setIsDialogOpen(false)
      setEditingItem(null)
      form.reset(defaultValues)
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
      merchant_id: item.merchant_id || "",
      terminal_key: item.terminal_key || "",
      vault_path: item.vault_path || "",
      bank_name: item.bank_name || "",
      bank_account_no: item.bank_account_no || "",
      vat_registered: item.vat_registered || false,
      vat_number: item.vat_number || "",
      currency_code: item.currency_code || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const updatedItems = paymentState.items.filter((item) => item.id !== id)
    setPaymentItems(updatedItems)
    queryClient.setQueryData(["tenant", "payment-config"], updatedItems)
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
    router.push(`${onboardingBase}/licence-history?hospitalId=${hospitalId}`)
  }

  const handleSkip = () => {
    skipPayment()
    router.push(`${onboardingBase}/licence-history?hospitalId=${hospitalId}`)
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
            <h2 className="text-xl font-semibold text-slate-900">Payment Details</h2>
            <p className="text-sm text-slate-600 mt-1">
              Configure payment gateways and banking details
            </p>
          </div>
          <Button
            type="button"
            onClick={handleAddNew}
            className="flex items-center gap-2"
          >
            <Plus className="size-4" />
            Add Payment Config
          </Button>
        </div>

        {paymentState.items.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No payment configurations added yet. Click &quot;Add Payment Config&quot; to get started.
          </div>
        ) : (
          <div className="space-y-3">
            {paymentState.items.map((item) => {
              const gateway = gateways.find((g) => g.id === item.gateway_id)
              return (
                <div
                  key={item.id}
                  className="border border-slate-200 rounded-lg p-4 flex items-start justify-between"
                >
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">
                      {gateway?.name || item.gateway_id}
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

      <div className="bg-white/80 rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between relative">
        {(createMutation.isError || updateMutation.isError) && (
          <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-red-600">
            {createMutation.error instanceof Error
              ? createMutation.error.message
              : updateMutation.error instanceof Error
                ? updateMutation.error.message
                : "An error occurred"}
          </div>
        )}

        <div className="flex gap-3 items-center">
          <Button
            type="button"
            variant="outline"
            asChild
            className="px-4 py-2 cursor-pointer flex items-center gap-2 rounded-full"
          >
            <Link href={`${modulesPath}?hospitalId=${hospitalId}`}>
              <ArrowLeft className="size-4" />
              Back
            </Link>
          </Button>
        </div>

        <div className="flex gap-3 items-center mt-4 md:mt-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleSkip}
            className="rounded-full py-3 px-6"
          >
            Skip
          </Button>
          <Button
            type="button"
            onClick={handleSaveAndContinue}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full py-3 px-6"
          >
            Save & Continue
          </Button>
        </div>
      </div>

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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveItem)} className="space-y-4">
              <FormField
                control={form.control}
                name="gateway_id"
                render={({ field }) => (
                  <FormItem>
                    <Label>Payment Gateway *</Label>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select gateway" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gateways.map((gateway) => (
                          <SelectItem key={gateway.id} value={gateway.id}>
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
                      <Label>Merchant ID</Label>
                      <FormControl>
                        <Input placeholder="Enter merchant ID" {...field} />
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
                      <Label>Terminal Key</Label>
                      <FormControl>
                        <Input placeholder="Enter terminal key" {...field} />
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
                      <Label>Vault Path</Label>
                      <FormControl>
                        <Input placeholder="Enter vault path" {...field} />
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
                      <Label>Bank Name</Label>
                      <FormControl>
                        <Input placeholder="Enter bank name" {...field} />
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
                    <Label>Bank Account Number</Label>
                    <FormControl>
                      <Input placeholder="Enter account number" {...field} />
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
                      <Label>VAT Registered</Label>
                      <FormControl>
                        <div className="flex items-center gap-2 h-10">
                          <input
                            type="checkbox"
                            checked={field.value || false}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm text-slate-600">
                            {field.value ? "Yes" : "No"}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vat_number"
                  render={({ field }) => (
                    <FormItem>
                      <Label>VAT Number</Label>
                      <FormControl>
                        <Input placeholder="Enter VAT number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="currency_code"
                render={({ field }) => (
                  <FormItem>
                    <Label>Currency Code</Label>
                    <FormControl>
                      <Input
                        placeholder="USD"
                        maxLength={3}
                        {...field}
                      />
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
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
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
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

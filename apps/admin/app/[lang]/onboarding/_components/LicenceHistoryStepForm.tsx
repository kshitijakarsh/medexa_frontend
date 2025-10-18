"use client"

import { useEffect, useState } from "react"
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
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react"
import {
  step4Schema,
  type Step4Values,
} from "@/app/[lang]/onboarding/_components/schemas"
import { createLicenseApiClient, type License } from "@/lib/api/license"
import { useOnboardingStore } from "@/stores/onboarding"

const defaultValues: Step4Values = {
  plan_key: "",
  seats: 0,
  storage_quota_mb: 10240,
  start_date: "",
  end_date: "",
  auto_renew: true,
  status: "active",
}

// Helper function to convert YYYY-MM-DD to ISO datetime format (YYYY-MM-DDTHH:MM:SSZ)
function dateToISODateTime(dateString: string): string {
  if (!dateString) return ""
  // Create a date at midnight UTC
  const date = new Date(dateString + "T00:00:00Z")
  return date.toISOString()
}

// Helper function to convert ISO datetime back to YYYY-MM-DD for date inputs
function isoDateTimeToDate(isoString: string): string {
  if (!isoString) return ""
  // Extract just the date part (YYYY-MM-DD)
  return isoString.split("T")[0]
}

export function LicenceHistoryStepForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ lang: string }>()
  const queryClient = useQueryClient()

  const lang = params?.lang ?? "en"
  const onboardingBase = `/${lang}/onboarding`
  const paymentPath = `${onboardingBase}/payment`
  const hospitalId = searchParams.get("hospitalId") || "dev-hospital-1"

  const {
    licence: licenceState,
    setLicenceItems,
    saveLicence,
    skipLicence,
  } = useOnboardingStore()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<License | null>(null)

  useEffect(() => {
    if (!hospitalId) {
      router.replace(`/${lang}/create-hospital`)
    }
  }, [hospitalId, router, lang])

  const createMutation = useMutation({
    mutationFn: async (
      payload: Omit<License, "id" | "tenant_id" | "created_at" | "updated_at">
    ) => {
      const client = createLicenseApiClient({ authToken: "dev-token" })
      const response = await client.createLicense(hospitalId, payload)
      return response.data.data
    },
    onSuccess: (newLicence) => {
      const updatedItems = [...licenceState.items, newLicence]
      setLicenceItems(updatedItems)
      queryClient.setQueryData(["tenant", "licence-history"], updatedItems)
      setIsDialogOpen(false)
      form.reset(defaultValues)
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...payload }: { id: string } & Step4Values) => {
      const client = createLicenseApiClient({ authToken: "dev-token" })
      const response = await client.updateLicense(id, payload)
      return response.data.data
    },
    onSuccess: (updatedLicence) => {
      const updatedItems = licenceState.items.map((item) =>
        item.id === updatedLicence.id ? updatedLicence : item
      )
      setLicenceItems(updatedItems)
      queryClient.setQueryData(["tenant", "licence-history"], updatedItems)
      setIsDialogOpen(false)
      setEditingItem(null)
      form.reset(defaultValues)
    },
  })

  const form = useForm<Step4Values>({
    resolver: zodResolver(step4Schema),
    defaultValues,
  })

  const handleAddNew = () => {
    setEditingItem(null)
    form.reset(defaultValues)
    setIsDialogOpen(true)
  }

  const handleEdit = (item: License) => {
    setEditingItem(item)
    form.reset({
      plan_key: item.plan_key,
      seats: item.seats,
      storage_quota_mb: item.storage_quota_mb,
      start_date: isoDateTimeToDate(item.start_date),
      end_date: isoDateTimeToDate(item.end_date),
      auto_renew: item.auto_renew,
      status: item.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const updatedItems = licenceState.items.filter((item) => item.id !== id)
    setLicenceItems(updatedItems)
    queryClient.setQueryData(["tenant", "licence-history"], updatedItems)
  }

  const handleSaveItem = async (values: Step4Values) => {
    // Transform dates to ISO datetime format before submission
    const payload = {
      ...values,
      start_date: dateToISODateTime(values.start_date),
      end_date: dateToISODateTime(values.end_date),
    }

    if (editingItem) {
      updateMutation.mutate({
        id: editingItem.id,
        ...payload,
      })
    } else {
      createMutation.mutate(payload)
    }
  }

  const handleSaveAndContinue = () => {
    saveLicence()
    router.push(`${onboardingBase}/regulatory-docs?hospitalId=${hospitalId}`)
  }

  const handleSkip = () => {
    skipLicence()
    router.push(`${onboardingBase}/regulatory-docs?hospitalId=${hospitalId}`)
  }

  if (!hospitalId) {
    return null
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <div className="space-y-4">
      <div className="bg-white/80 rounded-lg p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Licence History
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Manage licence history and subscription details
            </p>
          </div>
          <Button
            type="button"
            onClick={handleAddNew}
            className="flex items-center gap-2"
          >
            <Plus className="size-4" />
            Add Licence History
          </Button>
        </div>

        {licenceState.items.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No licence history added yet. Click &quot;Add Licence History&quot;
            to get started.
          </div>
        ) : (
          <div className="space-y-3">
            {licenceState.items.map((item) => (
              <div
                key={item.id}
                className="border border-slate-200 rounded-lg p-4 flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="font-medium text-slate-900">
                    {item.plan_key}
                  </div>
                  <div className="text-sm text-slate-600 mt-1 space-y-1">
                    <div>Seats: {item.seats}</div>
                    <div>Start Date: {item.start_date}</div>
                    <div>Status: {item.status}</div>
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
            ))}
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
            <Link href={`${paymentPath}?hospitalId=${hospitalId}`}>
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
              {editingItem ? "Edit Licence History" : "Add Licence History"}
            </DialogTitle>
            <DialogDescription>
              Configure licence plan and subscription details
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSaveItem)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="plan_key"
                render={({ field }) => (
                  <FormItem>
                    <Label>Plan Key *</Label>
                    <FormControl>
                      <Input placeholder="Enter plan key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="seats"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Seats *</Label>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Number of seats"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="storage_quota_mb"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Storage Quota (MB) *</Label>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Storage in MB"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 10240)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Start Date *</Label>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <Label>End Date *</Label>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="auto_renew"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Auto Renew</Label>
                      <FormControl>
                        <div className="flex items-center gap-2 h-10">
                          <input
                            type="checkbox"
                            checked={field.value ?? true}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm text-slate-600">
                            {field.value ? "Enabled" : "Disabled"}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Status *</Label>
                      <FormControl>
                        <Input placeholder="active" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

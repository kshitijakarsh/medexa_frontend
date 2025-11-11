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
import { VerificationIcon } from "../../assets/icons"
import { StepIndicator } from "./step-indicator"
import { FormInput } from "./form-input"
import { FormDate } from "./form-date"
import { FormCheckbox } from "./form-checkbox"
import { FormSelect } from "./form-select"
import Button from "@/components/ui/button"
import { licenseHistorySchema, type LicenseHistoryValues } from "./schemas"
import { getAuthToken } from "@/lib/api/utils"
import {
  createLicenseApiClient,
  type License,
  type CreateLicenseParams,
  type UpdateLicenseParams,
} from "@/lib/api/license"
import { Edit, Plus, Trash2 } from "lucide-react"

interface LicenseHistoryProps {
  onNext?: (data: LicenseHistoryValues[]) => void
  onBack?: () => void
  initialData?: Partial<LicenseHistoryValues>[]
  tenantId: string
  licenses?: License[]
}

const defaultValues: LicenseHistoryValues = {
  plan_key: "",
  seats: 0,
  storage_quota_mb: 10240,
  start_date: "",
  end_date: "",
  auto_renew: true,
  status: "active",
}

// Helper function to convert ISO datetime to YYYY-MM-DD for date inputs
function isoDateTimeToDate(isoString: string): string {
  if (!isoString) return ""
  return isoString.split("T")[0] || ""
}

// Helper function to convert YYYY-MM-DD to ISO datetime format
function dateToISODateTime(dateString: string): string {
  if (!dateString) return ""
  const date = new Date(dateString + "T00:00:00Z")
  return date.toISOString()
}

const LicenseHistory = ({
  onNext,
  onBack,
  tenantId,
  licenses: propLicenses = [],
}: LicenseHistoryProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<License | null>(null)
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  // Use licenses from props
  const licenses = propLicenses
  const isLoadingLicenses = false

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

  // Create API client
  const licenseClient = authToken ? createLicenseApiClient({ authToken }) : null

  const form = useForm<LicenseHistoryValues>({
    resolver: zodResolver(licenseHistorySchema),
    defaultValues,
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (payload: CreateLicenseParams) => {
      if (!licenseClient) throw new Error("API client not initialized")
      const response = await licenseClient.createLicense(tenantId, payload)
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
      setError(err.message || "Failed to create license")
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: { id: string } & UpdateLicenseParams) => {
      if (!licenseClient) throw new Error("API client not initialized")
      const response = await licenseClient.updateLicense(id, payload)
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
      setError(err.message || "Failed to update license")
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!licenseClient) throw new Error("API client not initialized")
      await licenseClient.deleteLicense(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenant", tenantId] })
      setError(null)
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to delete license")
    },
  })

  const handleAddNew = () => {
    setEditingItem(null)
    form.reset(defaultValues)
    setIsDialogOpen(true)
    setError(null)
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
    setError(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this license?")) {
      deleteMutation.mutate(id)
    }
  }

  const handleSaveItem = async (values: LicenseHistoryValues) => {
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

  const handleNext = () => {
    // Convert licenses to LicenseHistoryValues format for onNext
    const licenseValues: LicenseHistoryValues[] = licenses.map((license) => ({
      plan_key: license.plan_key,
      seats: license.seats,
      storage_quota_mb: license.storage_quota_mb,
      start_date: isoDateTimeToDate(license.start_date),
      end_date: isoDateTimeToDate(license.end_date),
      auto_renew: license.auto_renew,
      status: license.status,
    }))
    onNext?.(licenseValues)
  }

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
  ]

  const isPending = createMutation.isPending || updateMutation.isPending

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
            Provide license history and subscription details.
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={4} totalSteps={5} />

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

        {/* Licenses List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">License History</h2>
            <Button
              type="button"
              onClick={handleAddNew}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add License
            </Button>
          </div>

          {isLoadingLicenses ? (
            <div className="text-center py-8 text-gray-500">
              Loading licenses...
            </div>
          ) : licenses.length === 0 ? (
            <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
              No licenses added yet. Click "Add License" to get started.
            </div>
          ) : (
            <div className="space-y-3">
              {licenses.map((license) => (
                <div
                  key={license.id}
                  className="border border-gray-200 rounded-lg p-4 flex items-start justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {license.plan_key}
                    </div>
                    <div className="text-sm text-gray-600 mt-1 space-y-1">
                      <div>Seats: {license.seats}</div>
                      <div>
                        Start Date: {isoDateTimeToDate(license.start_date)}
                      </div>
                      <div>End Date: {isoDateTimeToDate(license.end_date)}</div>
                      <div>Status: {license.status}</div>
                      <div>Auto Renew: {license.auto_renew ? "Yes" : "No"}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleEdit(license)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDelete(license.id)}
                      disabled={deleteMutation.isPending}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
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
            disabled={isLoadingLicenses || licenses.length === 0}
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
              {editingItem ? "Edit License" : "Add License"}
            </DialogTitle>
            <DialogDescription>
              Configure license plan and subscription details
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(handleSaveItem)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                {...form.register("plan_key")}
                label="Plan Key"
                id="plan_key"
                placeholder="Enter plan key"
                required
                error={form.formState.errors.plan_key?.message}
              />

              <FormInput
                {...form.register("seats", { valueAsNumber: true })}
                type="number"
                label="Seats"
                id="seats"
                placeholder="Number of seats"
                required
                error={form.formState.errors.seats?.message}
              />

              <FormInput
                {...form.register("storage_quota_mb", { valueAsNumber: true })}
                type="number"
                label="Storage Quota (MB)"
                id="storage_quota_mb"
                placeholder="Storage in MB"
                required
                error={form.formState.errors.storage_quota_mb?.message}
              />

              <FormSelect
                label="Status"
                id="status"
                value={form.watch("status") || ""}
                onValueChange={(value) => form.setValue("status", value)}
                options={statusOptions}
                placeholder="Select status"
                required
                error={form.formState.errors.status?.message}
              />

              <FormDate
                {...form.register("start_date")}
                label="Start Date"
                id="start_date"
                required
                error={form.formState.errors.start_date?.message}
              />

              <FormDate
                {...form.register("end_date")}
                label="End Date"
                id="end_date"
                required
                error={form.formState.errors.end_date?.message}
              />

              <div className="md:col-span-2">
                <FormCheckbox
                  label="Auto Renew"
                  id="auto_renew"
                  checked={form.watch("auto_renew")}
                  onChange={(checked) => form.setValue("auto_renew", checked)}
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

export default LicenseHistory

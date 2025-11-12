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
import { FormSelect } from "./form-select"
import { FormDate } from "./form-date"
import { FileUpload } from "./file-upload"
import Button from "@/components/ui/button"
import { regulatoryDocSchema, type RegulatoryDocValues } from "./schemas"
import { getAuthToken } from "@/lib/api/utils"
import {
  createRegulatoryApiClient,
  type Document,
  type Authority,
  type CreateDocumentParams,
  type UpdateDocumentParams,
} from "@/lib/api/regulatory"
import { Textarea } from "@workspace/ui/components/textarea"
import { Edit, Plus, Trash2, FileText } from "lucide-react"

interface RegulatoryDocsProps {
  onNext?: (data: RegulatoryDocValues[]) => void
  onBack?: () => void
  initialData?: Partial<RegulatoryDocValues>[]
  tenantId: string
  documents?: Document[]
}

const defaultValues: RegulatoryDocValues = {
  doc_type: "",
  authority_id: 0,
  doc_number: "",
  issue_date: "",
  expiry_date: "",
  file_url: "",
  status: "pending",
  notes: "",
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

const RegulatoryDocs = ({
  onNext,
  onBack,
  tenantId,
  documents: propDocuments = [],
}: RegulatoryDocsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Document | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [docFile, setDocFile] = useState<File | null>(null)
  const queryClient = useQueryClient()

  // Use documents from props
  const documents = propDocuments
  const isLoadingDocuments = false

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
  const regulatoryClient = authToken
    ? createRegulatoryApiClient({ authToken })
    : null

  // Fetch authorities
  const { data: authorities = [], isLoading: isLoadingAuthorities } = useQuery({
    queryKey: ["authorities"],
    queryFn: async () => {
      if (!regulatoryClient) throw new Error("API client not initialized")
      const response = await regulatoryClient.getAuthoritesList()
      return response.data.data
    },
    enabled: !!regulatoryClient,
  })

  const form = useForm<RegulatoryDocValues>({
    resolver: zodResolver(regulatoryDocSchema),
    defaultValues,
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (payload: CreateDocumentParams) => {
      if (!regulatoryClient) throw new Error("API client not initialized")
      const response = await regulatoryClient.createDocument(tenantId, payload)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenant", tenantId] })
      setIsDialogOpen(false)
      setEditingItem(null)
      form.reset(defaultValues)
      setFilePreview(null)
      setDocFile(null)
      setError(null)
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to create document")
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: { id: string } & UpdateDocumentParams) => {
      if (!regulatoryClient) throw new Error("API client not initialized")
      const response = await regulatoryClient.updateDocument(id, payload)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenant", tenantId] })
      setIsDialogOpen(false)
      setEditingItem(null)
      form.reset(defaultValues)
      setFilePreview(null)
      setDocFile(null)
      setError(null)
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to update document")
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!regulatoryClient) throw new Error("API client not initialized")
      await regulatoryClient.deleteDocument(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenant", tenantId] })
      setError(null)
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to delete document")
    },
  })

  const handleAddNew = () => {
    setEditingItem(null)
    form.reset(defaultValues)
    setFilePreview(null)
    setDocFile(null)
    setIsDialogOpen(true)
    setError(null)
  }

  const handleEdit = (item: Document) => {
    setEditingItem(item)
    form.reset({
      doc_type: item.doc_type,
      authority_id: item.authority_id,
      doc_number: item.doc_number,
      issue_date: isoDateTimeToDate(item.issue_date),
      expiry_date: isoDateTimeToDate(item.expiry_date),
      file_url: item.file_url,
      status: item.status || "pending",
      notes: item.notes || "",
    })
    setDocFile(null)
    setFilePreview(item.file_url || null)
    setIsDialogOpen(true)
    setError(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      deleteMutation.mutate(id)
    }
  }

  const handleFileSelect = (file: File | null) => {
    if (file) {
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setFilePreview(result)
      }
      reader.readAsDataURL(file)
      setDocFile(file)
      // Set file_url to hardcoded placeholder (same as admin)
      form.setValue("file_url", "https://google.com/file")
    } else {
      setFilePreview(null)
      setDocFile(null)
      form.setValue("file_url", "")
    }
  }

  const handleSaveItem = async (values: RegulatoryDocValues) => {
    if (!values.file_url) {
      setError("Please upload a document file")
      return
    }

    const fileUrl = "https://google.com/file"

    // Convert dates to ISO datetime format before submission
    const payload = {
      ...values,
      file_url: fileUrl,
      issue_date: dateToISODateTime(values.issue_date),
      expiry_date: dateToISODateTime(values.expiry_date),
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
    // Convert documents to RegulatoryDocValues format for onNext
    const docValues: RegulatoryDocValues[] = documents.map((doc) => ({
      doc_type: doc.doc_type,
      authority_id: doc.authority_id,
      doc_number: doc.doc_number,
      issue_date: isoDateTimeToDate(doc.issue_date),
      expiry_date: isoDateTimeToDate(doc.expiry_date),
      file_url: doc.file_url,
      status: doc.status,
      notes: doc.notes,
    }))
    onNext?.(docValues)
  }

  const docTypes = [
    { value: "license", label: "License" },
    { value: "certificate", label: "Certificate" },
    { value: "permit", label: "Permit" },
    { value: "registration", label: "Registration" },
    { value: "accreditation", label: "Accreditation" },
  ]

  const authoritiesOptions =
    authorities.map((authority: Authority) => ({
      value: String(authority.id),
      label: `${authority.name_en} (${authority.short_code})`,
    })) || []

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
            Upload your regulatory documents to complete verification.
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={4} totalSteps={4} />

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

        {/* Documents List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Regulatory Documents</h2>
            <Button
              type="button"
              onClick={handleAddNew}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Document
            </Button>
          </div>

          {isLoadingDocuments ? (
            <div className="text-center py-8 text-gray-500">
              Loading documents...
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
              No regulatory documents added yet. Click "Add Document" to get
              started.
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => {
                const authority = authorities.find(
                  (a) => a.id === doc.authority_id
                )
                return (
                  <div
                    key={doc.id}
                    className="border border-gray-200 rounded-lg p-4 flex items-start justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {doc.doc_type}
                      </div>
                      <div className="text-sm text-gray-600 mt-1 space-y-1">
                        {authority && <div>Authority: {authority.name_en}</div>}
                        {doc.doc_number && (
                          <div>Document Number: {doc.doc_number}</div>
                        )}
                        {doc.issue_date && (
                          <div>
                            Issue Date: {isoDateTimeToDate(doc.issue_date)}
                          </div>
                        )}
                        {doc.expiry_date && (
                          <div>
                            Expiry Date: {isoDateTimeToDate(doc.expiry_date)}
                          </div>
                        )}
                        {doc.status && <div>Status: {doc.status}</div>}
                        {doc.file_url && (
                          <div className="text-xs text-blue-600">
                            File: {doc.file_url}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleEdit(doc)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleDelete(doc.id)}
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
            disabled={isLoadingDocuments || documents.length === 0}
            className="w-fit ml-auto"
          >
            SUBMIT VERIFICATION
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
              {editingItem
                ? "Edit Regulatory Document"
                : "Add Regulatory Document"}
            </DialogTitle>
            <DialogDescription>
              Upload regulatory and compliance documentation
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(handleSaveItem)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label="Document Type"
                id="doc_type"
                value={form.watch("doc_type") || ""}
                onValueChange={(value) => form.setValue("doc_type", value)}
                options={docTypes}
                placeholder="Select document type"
                required
                error={form.formState.errors.doc_type?.message}
              />

              <FormSelect
                label="Authority"
                id="authority_id"
                value={
                  form.watch("authority_id") && form.watch("authority_id") > 0
                    ? form.watch("authority_id").toString()
                    : ""
                }
                onValueChange={(value) =>
                  form.setValue("authority_id", parseInt(value))
                }
                options={authoritiesOptions}
                placeholder={
                  isLoadingAuthorities
                    ? "Loading authorities..."
                    : "Select authority"
                }
                required
                error={form.formState.errors.authority_id?.message}
                disabled={isLoadingAuthorities}
              />

              <FormInput
                {...form.register("doc_number")}
                label="Document Number"
                id="doc_number"
                placeholder="Enter document number"
                required
                error={form.formState.errors.doc_number?.message}
              />

              <FormSelect
                label="Status"
                id="status"
                value={form.watch("status") || "pending"}
                onValueChange={(value) => form.setValue("status", value)}
                options={statusOptions}
                placeholder="Select status"
                error={form.formState.errors.status?.message}
              />

              <FormDate
                {...form.register("issue_date")}
                label="Issue Date"
                id="issue_date"
                required
                error={form.formState.errors.issue_date?.message}
              />

              <FormDate
                {...form.register("expiry_date")}
                label="Expiry Date"
                id="expiry_date"
                required
                error={form.formState.errors.expiry_date?.message}
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
                error={form.formState.errors.file_url?.message}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes (Optional)
              </label>
              <Textarea
                {...form.register("notes")}
                id="notes"
                placeholder="Additional notes"
                rows={3}
                className="w-full"
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
                  setFilePreview(null)
                  setDocFile(null)
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

export default RegulatoryDocs

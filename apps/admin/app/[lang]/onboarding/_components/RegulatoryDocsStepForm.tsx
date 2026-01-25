"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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
import { Textarea } from "@workspace/ui/components/textarea"
import { ArrowLeft, Edit, Plus, Trash2, FileText } from "lucide-react"
import {
  step5Schema,
  type Step5Values,
} from "@/app/[lang]/onboarding/_components/schemas"
import {
  createRegulatoryApiClient,
  type Authority,
  type Document,
} from "@/lib/api/regulatory"
import { createTenantApiClient } from "@/lib/api/tenant"
import { useOnboardingStore } from "@/stores/onboarding"
import { getIdToken } from "@/lib/api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { cn } from "@workspace/ui/lib/utils"
import type { Dictionary } from "@/i18n/get-dictionary"
import { useFileUpload } from "@/app/hooks/useFileUpload"



import { toast } from "@workspace/ui/lib/sonner"

const defaultValues: Step5Values = {
  doc_type: "",
  authority_id: 0,
  doc_number: "",
  issue_date: "",
  expiry_date: "",
  file_url: "",
  status: "pending",
  notes: "",
}


export function RegulatoryDocsStepForm({ dict }: { dict: Dictionary }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ lang: string }>()
  const queryClient = useQueryClient()

  const lang = params?.lang ?? "en"
  const onboardingBase = `/${lang}/onboarding`
  const licenceHistoryPath = `${onboardingBase}/licence-history`
  const hospitalId = searchParams.get("hospitalId") || "dev-hospital-1"
  const type = searchParams.get("type")
  const isEditMode = type === "edit"
  const t = dict.pages.onboarding.regulatoryDocs
  const common = dict.common

  const {
    regulatory: regulatoryState,
    setRegulatoryItems,
    saveRegulatory,
    resetAll,
  } = useOnboardingStore()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Document | null>(null)
  const [docFile, setDocFile] = useState<File | null>(null)
  const [docPreview, setDocPreview] = useState<string | null>(null)
  const [isActivating, setIsActivating] = useState(false)
  const [activationError, setActivationError] = useState<string | null>(null)
  const { uploadFile, isUploading } = useFileUpload()
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

  useEffect(() => {
    if (!hospitalId) {
      router.replace(`/${lang}/create-hospital`)
    }
  }, [hospitalId, router, lang])

  // Fetch tenant data to populate regulatory documents from backend
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

  // Populate store with tenant regulatory documents when data loads
  useEffect(() => {
    if (tenantData?.tenant_regulatory_documents !== undefined) {
      const regulatoryDocs = tenantData.tenant_regulatory_documents
      // Only update if different from current state
      if (
        JSON.stringify(regulatoryDocs) !== JSON.stringify(regulatoryState.items)
      ) {
        setRegulatoryItems(regulatoryDocs)
      }
    }
  }, [tenantData, setRegulatoryItems, regulatoryState.items])

  const { data: authorities = [], isLoading: isLoadingAuthorites } = useQuery<
    Authority[]
  >({
    queryKey: ["authorites", authToken],
    queryFn: async () => {
      const token = authToken || (await getIdToken()) || ""
      const client = createRegulatoryApiClient({ authToken: token })
      const response = await client.getAuthoritesList()
      return response.data.data // Extract data array from response
    },
    enabled: !!authToken,
  })

  const createMutation = useMutation({
    mutationFn: async (
      payload: Omit<Document, "id" | "tenant_id" | "created_at" | "updated_at">
    ) => {
      const token = authToken || (await getIdToken()) || ""
      const client = createRegulatoryApiClient({ authToken: token })
      const response = await client.createDocument(hospitalId, payload)
      return response.data.data
    },
    onSuccess: (newDoc) => {
      const updatedItems = [...regulatoryState.items, newDoc]
      setRegulatoryItems(updatedItems)
      queryClient.invalidateQueries({ queryKey: ["tenant", hospitalId] })
      setIsDialogOpen(false)
      form.reset(defaultValues)
      setDocFile(null)
      setDocPreview(null)
      toast.success("Document added successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to add document")
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...payload }: { id: string } & Step5Values) => {
      const token = authToken || (await getIdToken()) || ""
      const client = createRegulatoryApiClient({ authToken: token })
      const response = await client.updateDocument(id, payload)
      return response.data.data
    },
    onSuccess: (updatedDoc) => {
      const updatedItems = regulatoryState.items.map((item) =>
        item.id === updatedDoc.id ? updatedDoc : item
      )
      setRegulatoryItems(updatedItems)
      queryClient.invalidateQueries({ queryKey: ["tenant", hospitalId] })
      setIsDialogOpen(false)
      setEditingItem(null)
      form.reset(defaultValues)
      setDocFile(null)
      setDocPreview(null)
      toast.success("Document updated successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to update document")
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = authToken || (await getIdToken()) || ""
      const client = createRegulatoryApiClient({ authToken: token })
      await client.deleteDocument(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenant", hospitalId] })
      toast.success("Document deleted successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to delete document")
    },
  })

  const form = useForm<Step5Values>({
    resolver: zodResolver(step5Schema) as any,
    defaultValues,
  })

  const handleAddNew = () => {
    setEditingItem(null)
    form.reset(defaultValues)
    setDocFile(null)
    setDocPreview(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (item: Document) => {
    setEditingItem(item)

    // Convert ISO datetime to date format (YYYY-MM-DD) for date inputs
    const formatISOToDate = (isoString: string) => {
      if (!isoString) return ""
      // Extract date part from ISO string (YYYY-MM-DDTHH:MM:SSZ -> YYYY-MM-DD)
      return isoString.split("T")[0]
    }

    form.reset({
      doc_type: item.doc_type,
      authority_id: item.authority_id,
      doc_number: item.doc_number,
      issue_date: formatISOToDate(item.issue_date),
      expiry_date: formatISOToDate(item.expiry_date),
      file_url: item.file_url,
      status: item.status || "pending",
      notes: item.notes || "",
    })
    setDocFile(null)
    setDocPreview(item.file_url || null)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this regulatory document?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          const updatedItems = regulatoryState.items.filter(
            (item) => item.id !== id
          )
          setRegulatoryItems(updatedItems)
        },
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setDocFile(file)
      // For mock purposes, create a preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        const url = event.target?.result as string
        setDocPreview(url)
        // form.setValue("file_url", "https://google.com/file") // Removed mock
        form.setValue("file_url", "PENDING_UPLOAD")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveItem = async (values: Step5Values) => {
    //console.log("handleSaveItem invoked", values);
    let fileUrl = values.file_url

    if (docFile) {
      // console.log("Starting upload for file:", docFile.name);
      try {
        fileUrl = await uploadFile(docFile, "regulatory_documents")
        // console.log("Upload successful, URL:", fileUrl);
      } catch (error) {
        console.error("Upload failed", error)
        toast.error("File upload failed. Please try again.")
        return
      }
    } else if (!fileUrl) {
      // If no file selected AND no existing url (mock or real), handle error?
      // Schema validation handles required check if applicable, but optional otherwise
    }


    // Convert dates to ISO datetime format (YYYY-MM-DDTHH:MM:SSZ)
    const formatDateToISO = (dateString: string) => {
      if (!dateString) return dateString
      // If already in ISO format, return as is
      if (dateString.includes("T")) return dateString
      // Convert YYYY-MM-DD to YYYY-MM-DDTHH:MM:SSZ
      return `${dateString}T00:00:00Z`
    }

    const formattedData = {
      ...values,
      issue_date: formatDateToISO(values.issue_date),
      expiry_date: formatDateToISO(values.expiry_date),
      file_url: fileUrl,
    }

    if (editingItem) {
      updateMutation.mutate({
        id: editingItem.id,
        ...formattedData,
      })
    } else {
      createMutation.mutate({
        ...formattedData,
        status: formattedData?.status || "pending",
      })
    }
  }

  const handleCompleteOnboarding = async () => {
    try {
      setIsActivating(true)
      setActivationError(null)

      // Create tenant API client and activate tenant
      const token = authToken || (await getIdToken()) || ""
      const tenantApiClient = createTenantApiClient({ authToken: token })
      await tenantApiClient.activateTenant(hospitalId)

      // Save state and reset
      saveRegulatory()
      resetAll()

      toast.success("Onboarding completed successfully!")
      router.push(`/${lang}/hospitals`)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to activate tenant"
      setActivationError(errorMessage)
    } finally {
      setIsActivating(false)
    }
  }

  if (!hospitalId) {
    return null
  }

  const isPending = createMutation.isPending || updateMutation.isPending || isUploading

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
            {t.addDocument}
          </Button>
        </div>

        {regulatoryState.items.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            {t.emptyState}
          </div>
        ) : (
          <div className="space-y-3">
            {regulatoryState.items.map((item) => (
              <div
                key={item.id}
                className="border border-slate-200 rounded-lg p-4 flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="font-medium text-slate-900 flex items-center gap-2">
                    <FileText className="size-4" />
                    {item.doc_type}
                  </div>
                  <div className="text-sm text-slate-600 mt-1 space-y-1">
                    {item.authority_id && (
                      <div>{t.fields.authority}: {item.authority_id}</div>
                    )}
                    {item.doc_number && (
                      <div>{t.fields.documentNumber}: {item.doc_number}</div>
                    )}
                    {item.issue_date && (
                      <div>{t.fields.issueDate}: {item.issue_date}</div>
                    )}
                    {item.status && <div>{t.fields.status}: {item.status}</div>}
                    {item.file_url && (
                      <div className="text-xs text-blue-600">
                        {t.fields.file} {item.file_url}
                      </div>
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
            ))}
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
          deleteMutation.isError ||
          activationError) && (
            <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-red-600">
              {activationError ||
                (deleteMutation.error instanceof Error
                  ? deleteMutation.error.message
                  : createMutation.error instanceof Error
                    ? createMutation.error.message
                    : updateMutation.error instanceof Error
                      ? updateMutation.error.message
                      : common.error)}
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
              <Link href={`${licenceHistoryPath}?hospitalId=${hospitalId}`}>
                <ArrowLeft className="size-4" />
                {common.back}
              </Link>
            </Button>
          </div>
        )}

        <div className="flex gap-3 items-center mt-4 md:mt-0">
          <Button
            type="button"
            onClick={handleCompleteOnboarding}
            disabled={isActivating}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isActivating
              ? dict.pages.hospitals.create.submitting
              : isEditMode
                ? common.save
                : t.completeOnboarding}
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem
                ? t.editDialogTitle
                : t.addDialogTitle}
            </DialogTitle>
            <DialogDescription>
              {t.dialogDescription}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSaveItem, (errors) => console.log("Validation errors:", errors))}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="doc_type"
                render={({ field }) => (
                  <FormItem>
                    <Label>{t.form.docType.label}</Label>
                    <FormControl>
                      <Input
                        placeholder={t.form.docType.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <FormField
                  control={form.control}
                  name="authority_id"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Authority ID *</Label>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Issuing authority ID"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="authority_id"
                  render={({ field }) => (
                    <FormItem>
                      <Label>{t.form.authority.label}</Label>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={
                            field.value && field.value > 0
                              ? String(field.value)
                              : undefined
                          }
                        >
                          <SelectTrigger className="w-full max-w-full truncate">
                            <SelectValue placeholder={t.form.authority.placeholder} />
                          </SelectTrigger>
                          <SelectContent className="w-[var(--radix-select-trigger-width)]">
                            {isLoadingAuthorites ? (
                              <div className="py-2 px-3 text-sm text-muted-foreground">
                                {common.loading}...
                              </div>
                            ) : (
                              authorities.map((a) => (
                                <SelectItem key={a.id} value={String(a.id)}>
                                  {a.name_en} ({a.short_code})
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
                  name="doc_number"
                  render={({ field }) => (
                    <FormItem>
                      <Label>{t.form.documentNumber.label}</Label>
                      <FormControl>
                        <Input placeholder={t.form.documentNumber.placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="issue_date"
                  render={({ field }) => (
                    <FormItem>
                      <Label>{t.form.issueDate}</Label>
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
                  name="expiry_date"
                  render={({ field }) => (
                    <FormItem>
                      <Label>{t.form.expiryDate}</Label>
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

              <FormField
                control={form.control}
                name="file_url"
                render={({ field }) => (
                  <FormItem>
                    <Label>{t.form.file}</Label>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                        {docPreview && (
                          <div className="text-xs text-slate-600 flex items-center gap-2">
                            <FileText className="size-3" />
                            {docFile?.name || field.value}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                  control={form.control}
                  name="uploaded_by"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Uploaded By *</Label>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Uploader ID"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              {/* 
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Status</Label>
                      <FormControl>
                        <Input placeholder="pending" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Label>{t.form.status.label}</Label>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue placeholder={t.form.status.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="w-[var(--radix-select-trigger-width)]">
                          <SelectItem value="pending">{common.pending}</SelectItem>
                          <SelectItem value="active">{common.active}</SelectItem>
                          <SelectItem value="inactive">{common.inactive}</SelectItem>
                          <SelectItem value="suspended">{common.suspended}</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* </div> */}

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <Label>{t.form.notes.label}</Label>
                    <FormControl>
                      <Textarea
                        placeholder={t.form.notes.placeholder}
                        rows={3}
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
                    setDocFile(null)
                    setDocPreview(null)
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

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
import { useOnboardingStore } from "@/stores/onboarding"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

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

export function RegulatoryDocsStepForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ lang: string }>()
  const queryClient = useQueryClient()

  const lang = params?.lang ?? "en"
  const onboardingBase = `/${lang}/onboarding`
  const licenceHistoryPath = `${onboardingBase}/licence-history`
  const hospitalId = searchParams.get("hospitalId") || "dev-hospital-1"

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

  useEffect(() => {
    if (!hospitalId) {
      router.replace(`/${lang}/create-hospital`)
    }
  }, [hospitalId, router, lang])

  const { data: authorities = [], isLoading: isLoadingAuthorites } = useQuery<
    Authority[]
  >({
    queryKey: ["authorites"],
    queryFn: async () => {
      const client = createRegulatoryApiClient({ authToken: "dev-token" })
      const response = await client.getAuthoritesList()
      return response.data.data // Extract data array from response
    },
  })

  const createMutation = useMutation({
    mutationFn: async (
      payload: Omit<Document, "id" | "tenant_id" | "created_at" | "updated_at">
    ) => {
      const client = createRegulatoryApiClient({ authToken: "dev-token" })
      const response = await client.createDocument(hospitalId, payload)
      return response.data.data
    },
    onSuccess: (newDoc) => {
      const updatedItems = [...regulatoryState.items, newDoc]
      setRegulatoryItems(updatedItems)
      queryClient.setQueryData(["tenant", "regulatory-docs"], updatedItems)
      setIsDialogOpen(false)
      form.reset(defaultValues)
      setDocFile(null)
      setDocPreview(null)
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...payload }: { id: string } & Step5Values) => {
      const client = createRegulatoryApiClient({ authToken: "dev-token" })
      const response = await client.updateDocument(id, payload)
      return response.data.data
    },
    onSuccess: (updatedDoc) => {
      const updatedItems = regulatoryState.items.map((item) =>
        item.id === updatedDoc.id ? updatedDoc : item
      )
      setRegulatoryItems(updatedItems)
      queryClient.setQueryData(["tenant", "regulatory-docs"], updatedItems)
      setIsDialogOpen(false)
      setEditingItem(null)
      form.reset(defaultValues)
      setDocFile(null)
      setDocPreview(null)
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
    const updatedItems = regulatoryState.items.filter((item) => item.id !== id)
    setRegulatoryItems(updatedItems)
    queryClient.setQueryData(["tenant", "regulatory-docs"], updatedItems)
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
        form.setValue("file_url", "https://google.com/file")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveItem = async (values: Step5Values) => {
    const fileUrl = "https://google.com/file"

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

    console.log("📤 Sending to API:", formattedData)

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

  const handleCompleteOnboarding = () => {
    saveRegulatory()
    resetAll()
    alert("Hospital onboarded successfully!")
    router.push(`/${lang}/hospitals`)
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
              Regulatory Documents
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Upload and manage regulatory compliance documents
            </p>
          </div>
          <Button
            type="button"
            onClick={handleAddNew}
            className="flex items-center gap-2"
          >
            <Plus className="size-4" />
            Add Regulatory Document
          </Button>
        </div>

        {regulatoryState.items.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No regulatory documents added yet. Click &quot;Add Regulatory
            Document&quot; to get started.
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
                      <div>Authority ID: {item.authority_id}</div>
                    )}
                    {item.doc_number && (
                      <div>Document Number: {item.doc_number}</div>
                    )}
                    {item.issue_date && (
                      <div>Issue Date: {item.issue_date}</div>
                    )}
                    {item.status && <div>Status: {item.status}</div>}
                    {item.file_url && (
                      <div className="text-xs text-blue-600">
                        File: {item.file_url}
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
            <Link href={`${licenceHistoryPath}?hospitalId=${hospitalId}`}>
              <ArrowLeft className="size-4" />
              Back
            </Link>
          </Button>
        </div>

        <div className="flex gap-3 items-center mt-4 md:mt-0">
          <Button
            type="button"
            onClick={handleCompleteOnboarding}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full py-3 px-6"
          >
            Complete Onboarding
          </Button>
        </div>
      </div>

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

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSaveItem)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="doc_type"
                render={({ field }) => (
                  <FormItem>
                    <Label>Document Type *</Label>
                    <FormControl>
                      <Input
                        placeholder="e.g., License, Certificate, Permit"
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
                      <Label>Authority ID *</Label>
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
                            <SelectValue placeholder="Select Authority" />
                          </SelectTrigger>
                          <SelectContent className="w-[var(--radix-select-trigger-width)]">
                            {isLoadingAuthorites ? (
                              <div className="py-2 px-3 text-sm text-muted-foreground">
                                Loading...
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
                      <Label>Document Number *</Label>
                      <FormControl>
                        <Input placeholder="Document number" {...field} />
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
                      <Label>Issue Date *</Label>
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
                      <Label>Expiry Date *</Label>
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
                    <Label>Document File *</Label>
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
                    <Label>Status</Label>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="w-[var(--radix-select-trigger-width)]">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
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
                    <Label>Notes</Label>
                    <FormControl>
                      <Textarea
                        placeholder="Additional notes or comments"
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

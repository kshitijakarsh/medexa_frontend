// Step 5: Regulatory Document Section
"use client"

import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { FormSection } from "../ui/FormSection"
import { FormInput } from "../ui/FormInput"
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { FileUploader } from "../ui/FileUploader"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { createRegulatoryApiClient, type Authority } from "@/lib/api/regulatory"

interface RegulatoryDocumentSectionProps {
  form: any // react-hook-form instance
  docFile: File | null
  setDocFile: (file: File | null) => void
  docPreview: string | null
  setDocPreview: (preview: string | null) => void
}

export const RegulatoryDocumentSection = ({
  form,
  docFile,
  setDocFile,
  docPreview,
  setDocPreview,
}: RegulatoryDocumentSectionProps) => {
  const { data: authorities = [], isLoading: isLoadingAuthorities } = useQuery<
    Authority[]
  >({
    queryKey: ["authorities"],
    queryFn: async () => {
      const client = createRegulatoryApiClient({ authToken: "dev-token" })
      const response = await client.getAuthoritesList()
      return response.data.data // Extract data array from response
    },
  })

  return (
    <FormSection title="Regulatory Document">
      <div className="space-y-4">
        {/* Document Type & Authority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormInput
            control={form.control}
            name="doc_type"
            label="Document Type"
            placeholder="e.g., License, Certificate"
          />
          <FormField
            control={form.control}
            name="authority_id"
            render={({ field }) => (
              <FormItem>
                <Label className="block text-sm text-slate-600 mb-1">
                  Authority
                </Label>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
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
                      {isLoadingAuthorities ? (
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
        </div>

        {/* Document Number */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
          <FormInput
            control={form.control}
            name="doc_number"
            label="Document Number"
            placeholder="Enter document number"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="issue_date"
            render={({ field }) => (
              <FormItem>
                <Label className="block text-sm text-slate-600 mb-1">
                  Issue Date
                </Label>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
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
                <Label className="block text-sm text-slate-600 mb-1">
                  Expiry Date
                </Label>
                <FormControl>
                  <Input
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* File Upload */}
        <FormField
          control={form.control}
          name="file_url"
          render={({ field }) => (
            <FormItem>
              <Label className="block text-sm text-slate-600 mb-2">
                Upload Document
              </Label>
              <FormControl>
                <FileUploader
                  onSelect={(file) => {
                    setDocFile(file)
                    if (file) {
                      // Set file_url to a placeholder or file name
                      field.onChange(file.name)
                      const reader = new FileReader()
                      reader.onload = (e) =>
                        setDocPreview(e.target?.result as string)
                      reader.readAsDataURL(file)
                    } else {
                      field.onChange("")
                      setDocPreview(null)
                    }
                  }}
                  previewUrl={docPreview}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormInput
            control={form.control}
            name="status"
            label="Status"
            placeholder="pending"
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <Label className="block text-sm text-slate-600 mb-1">
                  Notes
                </Label>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Additional notes"
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </FormSection>
  )
}

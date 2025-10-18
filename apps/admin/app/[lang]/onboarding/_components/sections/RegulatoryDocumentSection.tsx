// Step 5: Regulatory Document Section
"use client"

import React, { useState } from "react"
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
          <FormInput
            control={form.control}
            name="authority_id"
            label="Authority ID"
            placeholder="Enter authority ID"
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

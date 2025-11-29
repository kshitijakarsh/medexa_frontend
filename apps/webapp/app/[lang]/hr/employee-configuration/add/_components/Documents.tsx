"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@workspace/ui/components/form"
import { UploadCard } from "@/components/common/upload-card"

interface DocumentsProps {
  form: any
}

const documentFields = [
  { name: "qchp_document_url", label: "QCHP License Copy" },
  { name: "passport_document_url", label: "Passport Copy" },
  { name: "id_proof_document_url", label: "ID Proof" },
  { name: "contract_document_url", label: "Offer Letter / Contract" },
  { name: "signature_document_url", label: "Signature" },
]

export function Documents({ form }: DocumentsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {documentFields.map((doc) => (
        <FormField
          key={doc.name}
          control={form.control}
          name={doc.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700 text-sm">{doc.label}</FormLabel>
              <FormControl>
                <UploadCard
                  title={doc.label}
                  value={field.value}
                  onFileSelect={(file) => {
                    if (file) {
                      // Create a temporary URL for preview
                      // In production, you'd upload to a server and store the returned URL
                      const url = URL.createObjectURL(file)
                      field.onChange(url)
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  )
}

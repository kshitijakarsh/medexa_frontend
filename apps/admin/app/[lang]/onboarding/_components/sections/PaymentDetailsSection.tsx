// Step 3: Payment Details Section
"use client"

import React from "react"
import { FormSection } from "../ui/FormSection"
import { FormInput } from "../ui/FormInput"
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form"
import { Label } from "@workspace/ui/components/label"

interface PaymentDetailsSectionProps {
  form: any // react-hook-form instance
}

export const PaymentDetailsSection = ({ form }: PaymentDetailsSectionProps) => {
  return (
    <FormSection title="Payment Details">
      <div className="space-y-4">
        {/* Gateway & Merchant Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FormInput
            control={form.control}
            name="gateway_id"
            label="Gateway ID"
            placeholder="Enter gateway ID"
          />
          <FormInput
            control={form.control}
            name="merchant_id"
            label="Merchant ID"
            placeholder="Enter merchant ID"
          />
          <FormInput
            control={form.control}
            name="terminal_key"
            label="Terminal Key"
            placeholder="Enter terminal key"
          />
        </div>

        {/* Bank Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FormInput
            control={form.control}
            name="vault_path"
            label="Vault Path"
            placeholder="Enter vault path"
          />
          <FormInput
            control={form.control}
            name="bank_name"
            label="Bank Name"
            placeholder="Enter bank name"
          />
          <FormInput
            control={form.control}
            name="bank_account_no"
            label="Bank Account Number"
            placeholder="Enter account number"
          />
        </div>

        {/* VAT & Currency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="vat_registered"
            render={({ field }) => (
              <FormItem>
                <Label className="block text-sm text-slate-600 mb-1">
                  VAT Registered
                </Label>
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
          <FormInput
            control={form.control}
            name="vat_number"
            label="VAT Number"
            placeholder="Enter VAT number"
          />
          <FormInput
            control={form.control}
            name="currency_code"
            label="Currency Code"
            placeholder="USD"
            maxLength={3}
          />
        </div>
      </div>
    </FormSection>
  )
}

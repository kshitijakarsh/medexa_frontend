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
import type { Dictionary } from "@/i18n/get-dictionary"

import { Label } from "@workspace/ui/components/label"

interface PaymentDetailsSectionProps {
  form: any // react-hook-form instance
  dict: Dictionary
}

export const PaymentDetailsSection = ({ form, dict }: PaymentDetailsSectionProps) => {

const t = dict.pages.onboarding
const common = dict.common

return (
    <FormSection title={t.paymentDetails.sectionTitle}>
      <div className="space-y-4">
        {/* Gateway & Merchant Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FormInput
            control={form.control}
            name="gateway_id"
            label={t.paymentDetails.fields.gatewayId.label}
            placeholder={t.paymentDetails.fields.gatewayId.placeholder}
          />
          <FormInput
            control={form.control}
            name="merchant_id"
            label={t.paymentDetails.fields.merchantId.label}
            placeholder={t.paymentDetails.fields.merchantId.placeholder}
          />
          <FormInput
            control={form.control}
            name="terminal_key"
            label={t.paymentDetails.fields.terminalKey.label}
            placeholder={t.paymentDetails.fields.terminalKey.placeholder}
          />
        </div>

        {/* Bank Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FormInput
            control={form.control}
            name="vault_path"
            label={t.paymentDetails.fields.vaultPath.label}
            placeholder={t.paymentDetails.fields.vaultPath.placeholder}
          />
          <FormInput
            control={form.control}
            name="bank_name"
            label={t.paymentDetails.fields.bankName.label}
            placeholder={t.paymentDetails.fields.bankName.placeholder}
          />
          <FormInput
            control={form.control}
            name="bank_account_no"
            label={t.paymentDetails.fields.bankAccountNumber.label}
            placeholder={t.paymentDetails.fields.bankAccountNumber.placeholder}
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
                  {t.paymentDetails.fields.vatRegistered.label}
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
                      {field.value ? common.yes : common.no}
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
            label={t.paymentDetails.fields.vatNumber.label}
            placeholder={t.paymentDetails.fields.vatNumber.placeholder}
          />
          <FormInput
            control={form.control}
            name="currency_code"
            label={t.paymentDetails.fields.currencyCode.label}
            placeholder={t.paymentDetails.fields.currencyCode.placeholder}
            maxLength={3}
          />
        </div>
      </div>
    </FormSection>
  )
}

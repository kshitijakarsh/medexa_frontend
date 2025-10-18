// Step 4: License History Section
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
import { Input } from "@workspace/ui/components/input"

interface LicenseHistorySectionProps {
  form: any // react-hook-form instance
}

export const LicenseHistorySection = ({ form }: LicenseHistorySectionProps) => {
  return (
    <FormSection title="License History">
      <div className="space-y-4">
        {/* Plan & Seats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FormInput
            control={form.control}
            name="plan_key"
            label="Plan Key"
            placeholder="Enter plan key"
          />
          <FormField
            control={form.control}
            name="seats"
            render={({ field: { onChange, value, ...restField } }) => (
              <FormItem>
                <Label className="block text-sm text-slate-600 mb-1">
                  Seats
                </Label>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    {...restField}
                    value={value ?? ""}
                    onChange={(e) => {
                      const val = e.target.value
                      onChange(val === "" ? 0 : Number(val))
                    }}
                    placeholder="Number of seats"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="storage_quota_mb"
            render={({ field: { onChange, value, ...restField } }) => (
              <FormItem>
                <Label className="block text-sm text-slate-600 mb-1">
                  Storage Quota (MB)
                </Label>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    {...restField}
                    value={value ?? ""}
                    onChange={(e) => {
                      const val = e.target.value
                      onChange(val === "" ? 10240 : Number(val))
                    }}
                    placeholder="Storage in MB"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <Label className="block text-sm text-slate-600 mb-1">
                  Start Date
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
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <Label className="block text-sm text-slate-600 mb-1">
                  End Date
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

        {/* Auto Renew & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="auto_renew"
            render={({ field }) => (
              <FormItem>
                <Label className="block text-sm text-slate-600 mb-1">
                  Auto Renew
                </Label>
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
          <FormInput
            control={form.control}
            name="status"
            label="Status"
            placeholder="active"
          />
        </div>
      </div>
    </FormSection>
  )
}

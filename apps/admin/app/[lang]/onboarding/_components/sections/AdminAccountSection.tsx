// components/onboard-hospital/sections/AdminAccountSection.tsx
"use client"

import React from "react"
import { FormSection } from "../ui/FormSection"
import { FormInput } from "../ui/FormInput"

interface AdminAccountSection {
  form: any // react-hook-form instance
}

export const AdminAccountSection = ({ form }: AdminAccountSection) => {
  return (
    <FormSection title="Primary Admin Account">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FormInput
          control={form.control}
          name="primary_admin_name"
          label="Full Name *"
          type="text"
          placeholder="Primary admin full name"
        />
        <FormInput
          control={form.control}
          name="primary_admin_email"
          label="Email *"
          placeholder="admin@example.com"
          type="email"
        />
        <FormInput
          control={form.control}
          name="primary_admin_password"
          label="Primary Admin Password"
          placeholder="Enter password"
          type="password"
        />
        <FormInput
          control={form.control}
          name="primary_admin_id_no"
          label="ID Number *"
          placeholder="Admin ID number"
        />
      </div>
    </FormSection>
  )
}

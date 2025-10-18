// components/onboard-hospital/sections/UserCredentialSection.tsx
"use client"

import React from "react"
import { FormSection } from "../ui/FormSection"
import { FormInput } from "../ui/FormInput"

interface UserCredentialSectionProps {
  form: any // react-hook-form instance
}

export const UserCredentialSection = ({ form }: UserCredentialSectionProps) => {
  return (
    <FormSection title="User Credential">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormInput
          control={form.control}
          name="user_full_name"
          label="Full Name"
          placeholder="User name"
          type="text"
        />
        <FormInput
          control={form.control}
          name="user_password"
          label="Password"
          placeholder="Password"
          type="password"
        />
      </div>
    </FormSection>
  )
}

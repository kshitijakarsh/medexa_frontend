"use client"

import React from "react"
import { FormSection } from "../ui/FormSection"
import { FormInput } from "../ui/FormInput"
import type { Dictionary } from "@/i18n/get-dictionary"

interface AdminAccountSectionProps {
  form: any // react-hook-form instance
  dict: Dictionary
}

export const AdminAccountSection = ({
  form,
  dict,
}: AdminAccountSectionProps) => {
  const t = dict.pages.onboarding.adminAccount

  return (
    <FormSection title={t.sectionTitle}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FormInput
          control={form.control}
          name="primary_admin_name"
          label={t.fullName.label}
          placeholder={t.fullName.placeholder}
          type="text"
        />

        <FormInput
          control={form.control}
          name="primary_admin_email"
          label={t.email.label}
          placeholder={t.email.placeholder}
          type="email"
        />

        <FormInput
          control={form.control}
          name="primary_admin_password"
          label={t.password.label}
          placeholder={t.password.placeholder}
          type="password"
        />

        <FormInput
          control={form.control}
          name="primary_admin_id_no"
          label={t.idNumber.label}
          placeholder={t.idNumber.placeholder}
        />
      </div>
    </FormSection>
  )
}

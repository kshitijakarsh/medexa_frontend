// Step 1: Hospital Base Information (wraps existing sections)
"use client"

import React from "react"
import { HospitalInfoSection } from "./HospitalInfoSection"
import { AdminAccountSection } from "./AdminAccountSection"
import { UserCredentialSection } from "./UserCredentialSection"

interface StepHospitalBaseProps {
  form: any // react-hook-form instance
  logoPreview: string | null
  setLogoPreview: (preview: string | null) => void
  logoFile: File | null
  setLogoFile: (file: File | null) => void
  onLogoSelected: (file?: File | null) => void
}

export const StepHospitalBase = ({
  form,
  logoPreview,
  setLogoPreview,
  logoFile,
  setLogoFile,
  onLogoSelected,
}: StepHospitalBaseProps) => {
  return (
    <div className="space-y-4">
      {/* Hospital Information */}
      <HospitalInfoSection
        form={form}
        logoPreview={logoPreview}
        setLogoPreview={setLogoPreview}
        logoFile={logoFile}
        setLogoFile={setLogoFile}
        onLogoSelected={onLogoSelected}
      />

      {/* Admin Account */}
      <AdminAccountSection form={form} />

      {/* User Credential */}
      {/* <UserCredentialSection form={form} /> */}
    </div>
  )
}

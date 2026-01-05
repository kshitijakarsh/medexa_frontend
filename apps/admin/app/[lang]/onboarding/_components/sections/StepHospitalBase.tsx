import React from "react"
import { HospitalInfoSection } from "./HospitalInfoSection"
import { AdminAccountSection } from "./AdminAccountSection"
import { UserCredentialSection } from "./UserCredentialSection"
import type { Dictionary } from "@/i18n/get-dictionary"

interface StepHospitalBaseProps {
  form: any // react-hook-form instance
  logoPreview: string | null
  setLogoPreview: (preview: string | null) => void
  logoFile: File | null
  setLogoFile: (file: File | null) => void
  onLogoSelected: (file?: File | null) => void
  dict: Dictionary
}

export const StepHospitalBase = ({
  form,
  logoPreview,
  setLogoPreview,
  logoFile,
  setLogoFile,
  onLogoSelected,
  dict,
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
        dict={dict}
      />

      {/* Admin Account */}
      <AdminAccountSection
        form={form}
        dict={dict}
      />

      {/* User Credential (optional) */}
      {/* <UserCredentialSection form={form} dict={dict} /> */}
    </div>
  )
}

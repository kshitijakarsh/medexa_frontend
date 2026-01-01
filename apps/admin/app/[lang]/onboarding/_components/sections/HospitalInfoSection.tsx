// // components/onboard-hospital/sections/HospitalInfoSection.tsx
// "use client"

// import React from "react"
// import {
//   FormField,
//   FormItem,
//   FormControl,
//   FormMessage,
// } from "@workspace/ui/components/form"
// import { Input } from "@workspace/ui/components/input"
// import { FormInput } from "../ui/FormInput"
// import { FileUploader } from "../ui/FileUploader"
// import { FormSection } from "../ui/FormSection"
// import { Label } from "@workspace/ui/components/label"
// import { createTenantApiClient, type Country } from "@/lib/api/tenant"
// import { createRegulatoryApiClient, type Authority } from "@/lib/api/regulatory"
// import { useQuery } from "@tanstack/react-query"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@workspace/ui/components/select"
// import { FormLabel } from "../ui/FormLable"

// interface HospitalInfoSectionProps {
//   form: any // react-hook-form instance
//   logoPreview: string | null
//   setLogoPreview: (preview: string | null) => void
//   logoFile: File | null
//   setLogoFile: (file: File | null) => void
//   onLogoSelected: (file?: File | null) => void
// }

// export const HospitalInfoSection = ({
//   form,
//   logoPreview,
//   setLogoPreview,
//   logoFile,
//   setLogoFile,
//   onLogoSelected,
// }: HospitalInfoSectionProps) => {
//   const { data: countries = [], isLoading: isLoadingCountries } = useQuery<
//     Country[]
//   >({
//     queryKey: ["countries"],
//     queryFn: async () => {
//       const client = createTenantApiClient({ authToken: "dev-token" })
//       const response = await client.getCountriesList()
//       return response.data.data // Extract data array from response
//     },
//   })

//   const { data: authorities = [], isLoading: isLoadingAuthorities } = useQuery<
//     Authority[]
//   >({
//     queryKey: ["authorities"],
//     queryFn: async () => {
//       const client = createRegulatoryApiClient({ authToken: "dev-token" })
//       const response = await client.getAuthoritesList()
//       return response.data.data // Extract data array from response
//     },
//   })

//   return (
//     <FormSection title="Hospital / Tenant Information">
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
//         {/* Left: Form Fields */}
//         <div className="md:col-span-8 space-y-4">
//           {/* Tenant Identification */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <FormInput
//               control={form.control}
//               name="tenant_key"
//               label="Tenant Key *"
//               placeholder="e.g., hospital-abc"
//             />
//             <FormInput
//               control={form.control}
//               name="external_id"
//               label="External ID *"
//               placeholder="External identifier"
//             />
//           </div>

//           {/* Hospital Names */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <FormInput
//               control={form.control}
//               name="name_en"
//               label="Hospital Name (English) *"
//               placeholder="Enter hospital name in English"
//             />
//             <FormInput
//               control={form.control}
//               name="name_local"
//               label="Hospital Name (Local) *"
//               placeholder="Enter hospital name in local language"
//             />
//           </div>

//           {/* Country and Regulatory */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {/* <FormField
//               control={form.control}
//               name="country_id"
//               render={({ field }) => (
//                 <FormItem>
//                   <Label>Country ID *</Label>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       placeholder="Enter country ID"
//                       {...field}
//                       onChange={(e) => field.onChange(Number(e.target.value))}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             /> */}
//             <FormField
//               control={form.control}
//               name="country_id"
//               render={({ field }) => (
//                 <FormItem>
//                   {/* <Label>Country *</Label> */}
//                   <FormLabel label={"Country *"} />
//                   <FormControl>
//                     <Select
//                       onValueChange={(value) => field.onChange(Number(value))}
//                       value={
//                         field.value && field.value > 0
//                           ? String(field.value)
//                           : undefined
//                       }
//                     >
//                       <SelectTrigger className="w-full max-w-full truncate">
//                         <SelectValue placeholder="Select Country" />
//                       </SelectTrigger>
//                       <SelectContent className="w-[var(--radix-select-trigger-width)]">
//                         {isLoadingCountries ? (
//                           <div className="py-2 px-3 text-sm text-muted-foreground">
//                             Loading...
//                           </div>
//                         ) : (
//                           countries.map((c) => (
//                             <SelectItem key={c.id} value={String(c.id)}>
//                               {c.name_en} ({c.iso_code})
//                             </SelectItem>
//                           ))
//                         )}
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="regulatory_authority_id"
//               render={({ field }) => (
//                 <FormItem>
//                   {/* <Label>Regulatory Authority *</Label> */}
//                   <FormLabel label={"Regulatory Authority *"} />
//                   <FormControl>
//                     <Select
//                       onValueChange={(value) => field.onChange(Number(value))}
//                       value={
//                         field.value && field.value > 0
//                           ? String(field.value)
//                           : undefined
//                       }
//                     >
//                       <SelectTrigger className="w-full max-w-full truncate">
//                         <SelectValue placeholder="Select Authority" />
//                       </SelectTrigger>
//                       <SelectContent className="w-[var(--radix-select-trigger-width)]">
//                         {isLoadingAuthorities ? (
//                           <div className="py-2 px-3 text-sm text-muted-foreground">
//                             Loading...
//                           </div>
//                         ) : (
//                           authorities.map((a) => (
//                             <SelectItem key={a.id} value={String(a.id)}>
//                               {a.name_en} ({a.short_code})
//                             </SelectItem>
//                           ))
//                         )}
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* License Information */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             <FormInput
//               control={form.control}
//               name="license_number"
//               label="License Number *"
//               placeholder="Enter license number"
//             />
//             <FormField
//               control={form.control}
//               name="license_expiry"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel label={"License Expiry *"} />
//                   <FormControl>
//                     <Input type="datetime-local" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormInput
//               control={form.control}
//               name="license_type"
//               label="License Type *"
//               placeholder="e.g., Medical Center"
//             />
//           </div>

//           {/* Commercial Registration */}
//           <FormInput
//             control={form.control}
//             name="commercial_reg_no"
//             label="Commercial Registration Number *"
//             placeholder="Enter CR number"
//           />

//           {/* Currency and VAT */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             {/* <FormField
//               control={form.control}
//               name="currency_code"
//               render={({ field }) => (
//                 <FormItem>
//                   <Label>Currency Code *</Label>
//                   <FormControl>
//                     <Input
//                       placeholder="USD"
//                       maxLength={3}
//                       {...field}
//                       onChange={(e) =>
//                         field.onChange(e.target.value.toUpperCase())
//                       }
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             /> */}
//             <FormField
//               control={form.control}
//               name="currency_code"
//               render={({ field }) => (
//                 <FormItem>
//                   {/* <Label></Label> */}
//                   <FormLabel label={"Currency *"} />
//                   <FormControl>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <SelectTrigger className="w-full max-w-full truncate">
//                         <SelectValue placeholder="Select Currency" />
//                       </SelectTrigger>
//                       <SelectContent className="w-[var(--radix-select-trigger-width)]">
//                         {isLoadingCountries ? (
//                           <div className="py-2 px-3 text-sm text-muted-foreground">
//                             Loading...
//                           </div>
//                         ) : (
//                           countries.map((c) => (
//                             <SelectItem key={c.id} value={c.currency_code}>
//                               {c.currency_code} - {c.name_en}
//                             </SelectItem>
//                           ))
//                         )}
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* <FormField
//               control={form.control}
//               name="vat_registered"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel label={"VAT Registered *"} />
//                   <FormControl>
//                     <div className="flex items-center gap-2 h-10">
//                       <input
//                         type="checkbox"
//                         checked={field.value}
//                         onChange={(e) => field.onChange(e.target.checked)}
//                         className="w-4 h-4 cursor-pointer"
//                       />
//                       <span className="text-sm text-slate-600">
//                         {field.value ? "Yes" : "No"}
//                       </span>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             /> */}
//             <FormInput
//               control={form.control}
//               name="vat_number"
//               label="VAT Number *"
//               placeholder="Enter VAT number"
//             />
//           </div>
//         </div>

//         {/* Right: Logo Upload */}
//         <div className="md:col-span-4 flex flex-col items-center justify-start gap-3">
//           <FileUploader
//             onSelect={(file) => {
//               setLogoFile(file)
//               if (file) {
//                 const reader = new FileReader()
//                 reader.onload = (e) =>
//                   setLogoPreview(e.target?.result as string)
//                 reader.readAsDataURL(file)
//               } else {
//                 setLogoPreview(null)
//               }
//               onLogoSelected(file)
//             }}
//             previewUrl={logoPreview}
//           />

//           <div className="w-full text-xs text-slate-500 text-center">
//             Recommended: 300x300 px, PNG/JPG. Maximum 2MB.
//           </div>
//         </div>
//       </div>
//     </FormSection>
//   )
// }

"use client"

import React from "react"
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import { FormInput } from "../ui/FormInput"
import { FileUploader } from "../ui/FileUploader"
import { FormSection } from "../ui/FormSection"
import { createTenantApiClient, type Country } from "@/lib/api/tenant"
import { createRegulatoryApiClient, type Authority } from "@/lib/api/regulatory"
import { useQuery } from "@tanstack/react-query"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { FormLabel } from "../ui/FormLable"
import type { Dictionary } from "@/i18n/get-dictionary"

interface HospitalInfoSectionProps {
  form: any // react-hook-form instance
  logoPreview: string | null
  setLogoPreview: (preview: string | null) => void
  logoFile: File | null
  setLogoFile: (file: File | null) => void
  onLogoSelected: (file?: File | null) => void
  dict: Dictionary
}

export const HospitalInfoSection = ({
  form,
  logoPreview,
  setLogoPreview,
  logoFile,
  setLogoFile,
  onLogoSelected,
  dict,
}: HospitalInfoSectionProps) => {
  const t = dict.pages.onboarding.hospitalInfo

  const { data: countries = [], isLoading: isLoadingCountries } = useQuery<
    Country[]
  >({
    queryKey: ["countries"],
    queryFn: async () => {
      const client = createTenantApiClient({ authToken: "dev-token" })
      const response = await client.getCountriesList()
      return response.data.data // Extract data array from response
    },
  })

  const { data: authorities = [], isLoading: isLoadingAuthorities } = useQuery<
    Authority[]
  >({
    queryKey: ["authorities"],
    queryFn: async () => {
      const client = createRegulatoryApiClient({ authToken: "dev-token" })
      const response = await client.getAuthoritesList()
      return response.data.data // Extract data array from response
    },
  })

  return (
    <FormSection title={t.sectionTitle}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left */}
        <div className="md:col-span-8 space-y-4">

          {/* Tenant Identification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormInput
              control={form.control}
              name="tenant_key"
              label={t.tenantKey.label}
              placeholder={t.tenantKey.placeholder}
            />
            <FormInput
              control={form.control}
              name="external_id"
              label={t.externalId.label}
              placeholder={t.externalId.placeholder}
            />
          </div>

          {/* Hospital Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormInput
              control={form.control}
              name="name_en"
              label={t.hospitalNameEn.label}
              placeholder={t.hospitalNameEn.placeholder}
            />
            <FormInput
              control={form.control}
              name="name_local"
              label={t.hospitalNameLocal.label}
              placeholder={t.hospitalNameLocal.placeholder}
            />
          </div>

          {/* Country & Regulatory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="country_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel label={t.country.label} />
                  <FormControl>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value ? String(field.value) : undefined}
                    >
                      <SelectTrigger className="w-full max-w-full truncate">
                        <SelectValue placeholder={t.country.placeholder} />
                      </SelectTrigger>
                      <SelectContent className="w-[var(--radix-select-trigger-width)]">
                        {isLoadingCountries ? (
                          <div className="py-2 px-3 text-sm text-muted-foreground">
                            {t.country.loading}
                          </div>
                        ) : (
                          countries.map((c) => (
                            <SelectItem key={c.id} value={String(c.id)}>
                              {c.name_en} ({c.iso_code})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="regulatory_authority_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel label={t.authority.label} />
                  <FormControl>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value ? String(field.value) : undefined}
                    >
                      <SelectTrigger className="w-full max-w-full truncate">
                        <SelectValue placeholder={t.authority.placeholder} />
                      </SelectTrigger>
                      <SelectContent className="w-[var(--radix-select-trigger-width)]">
                        {isLoadingAuthorities ? (
                          <div  className="py-2 px-3 text-sm text-muted-foreground">
                            {t.authority.loading}
                          </div>
                        ) : (
                          authorities.map((a) => (
                            <SelectItem key={a.id} value={String(a.id)}>
                              {a.name_en} ({a.short_code})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* License */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FormInput
              control={form.control}
              name="license_number"
              label={t.licenseNumber.label}
              placeholder={t.licenseNumber.placeholder}
            />
            <FormField
              control={form.control}
              name="license_expiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel label={t.licenseExpiry.label} />
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormInput
              control={form.control}
              name="license_type"
              label={t.licenseType.label}
              placeholder={t.licenseType.placeholder}
            />
          </div>

          {/* Commercial Registration */}
          <FormInput
            control={form.control}
            name="commercial_reg_no"
            label={t.commercialReg.label}
            placeholder={t.commercialReg.placeholder}
          />

          {/* Currency & VAT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="currency_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel label={t.currency.label} />
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full max-w-full truncate">
                        <SelectValue placeholder={t.currency.placeholder} />
                      </SelectTrigger>
                      <SelectContent className="w-[var(--radix-select-trigger-width)]">
                        {isLoadingCountries ? (
                          <div className="py-2 px-3 text-sm text-muted-foreground">
                            {t.country.loading}
                          </div>
                        ) : (
                          countries.map((c) => (
                            <SelectItem key={c.id} value={c.currency_code}>
                              {c.currency_code} - {c.name_en}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormInput
              control={form.control}
              name="vat_number"
              label={t.vatNumber.label}
              placeholder={t.vatNumber.placeholder}
            />
          </div>
        </div>

        {/* Right */}
        <div className="md:col-span-4 flex flex-col items-center gap-3">
          <FileUploader
            previewUrl={logoPreview}
            onSelect={onLogoSelected}
          />
          <div className="text-xs text-slate-500 text-center">
            {t.logoHelp}
          </div>
        </div>
      </div>
    </FormSection>
  )
}

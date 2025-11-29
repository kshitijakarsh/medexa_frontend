"use client"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import { UploadCard } from "@/components/common/upload-card"
import { AppSelect } from "@/components/common/app-select"

interface PersonalDetailsProps {
  form: any
  authToken: string
}

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
]

const maritalStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
]

const bloodGroupOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
]

// Static country options (temporary until API is working)
const countryOptions = [
  { value: "1", label: "Kuwait" },
  { value: "2", label: "Bahrain" },
  { value: "3", label: "Saudi Arabia" },
  { value: "4", label: "United Arab Emirates" },
  { value: "5", label: "Qatar" },
  { value: "6", label: "Oman" },
]

export function PersonalDetails({ form, authToken }: PersonalDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <AppSelect
                  placeholder="Select Gender"
                  value={field.value}
                  onChange={field.onChange}
                  options={genderOptions}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="marital_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marital Status</FormLabel>
              <FormControl>
                <AppSelect
                  placeholder="Select Marital Status"
                  value={field.value}
                  onChange={field.onChange}
                  options={maritalStatusOptions}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality / Country</FormLabel>
              <FormControl>
                <AppSelect
                  placeholder="Select Country"
                  value={field.value}
                  onChange={field.onChange}
                  options={countryOptions}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="crp_nid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CRP/NID</FormLabel>
              <FormControl>
                <Input placeholder="Enter CRP/NID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="crp_nid_expiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CRP/NID Expiry</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="blood_group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Group</FormLabel>
              <FormControl>
                <AppSelect
                  placeholder="Select Blood Group"
                  value={field.value}
                  onChange={field.onChange}
                  options={bloodGroupOptions}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="pt-4 max-w-sm">
        <FormField
          control={form.control}
          name="photo_url"
          render={({ field }) => (
            <FormItem className="pt-4 max-w-sm">
              <FormLabel>Employee Photo</FormLabel>
              <FormControl>
                <UploadCard
                  title="Employee Photo"
                  value={field.value}
                  onFileSelect={(file) => {
                    // For now, store the file object. In production, you'd upload and get a URL
                    if (file) {
                      // Create a temporary URL for preview
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
      </div>
    </div>
  )
}

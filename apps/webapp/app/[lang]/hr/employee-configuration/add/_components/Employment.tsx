"use client"

import { AppSelect } from "@/components/common/app-select"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"

interface EmploymentProps {
  form: any
}

const qualificationOptions = [
  { value: "MBBS", label: "MBBS" },
  { value: "MD", label: "MD" },
  { value: "MS", label: "MS" },
  { value: "BDS", label: "BDS" },
  { value: "B.Sc Nursing", label: "B.Sc Nursing" },
  { value: "M.Sc", label: "M.Sc" },
  { value: "PhD", label: "PhD" },
  { value: "Diploma", label: "Diploma" },
  { value: "Other", label: "Other" },
]

export function Employment({ form }: EmploymentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <FormField
        control={form.control}
        name="qualification"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Qualification</FormLabel>
            <FormControl>
              <AppSelect
                placeholder="Select Qualification"
                value={field.value}
                onChange={field.onChange}
                options={qualificationOptions}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="year_of_experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years of Experience</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter years"
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

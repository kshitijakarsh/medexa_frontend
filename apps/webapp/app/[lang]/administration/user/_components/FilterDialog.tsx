// /app/.../_components/FilterDialog.tsx
"use client"

import { useEffect, useMemo } from "react"
import { z } from "@workspace/ui/lib/zod"
import { zodResolver } from "@workspace/ui/lib/zod"
import { useForm } from "@workspace/ui/hooks/use-form"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { AppDialog } from "@/components/common/app-dialog"
import { DynamicSelect } from "@/components/common/dynamic-select"
import { AppSelect } from "@/components/common/app-select"
import { useQuery } from "@tanstack/react-query"
import { createRoleApiClient } from "@/lib/api/administration/roles"
import { useDictionary } from "@/i18n/use-dictionary"

const filterSchema = z.object({
  role: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  status: z.string().optional(),
  date: z.string().optional(),
})

type FilterSchema = z.infer<typeof filterSchema>

interface FilterDialogProps {
  open: boolean
  onClose: () => void
  onApply: (filters: FilterSchema) => void
  isLoading?: boolean
}

export function FilterDialog({
  open,
  onClose,
  onApply,
  isLoading,
}: FilterDialogProps) {
  const form = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: { role: "", email: "", phone: "", status: "", date: "" },
  })

  const roleApi = createRoleApiClient({})
  const dict = useDictionary();
  const trans = dict.pages.users.filterdialog

  /* Fetch roles for filter dropdown */
  const { data: rolesData } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await roleApi.getRoles({ limit: 100 })
      return response.data
    },
  })

  const roleOptions = useMemo(() => {
    if (!rolesData?.data) return []
    return rolesData.data.map((role) => ({
      label: role.name,
      value: role.id.toString(),
    }))
  }, [rolesData])

  useEffect(() => {
    if (!open) form.reset()
  }, [open, form])

  const handleApply = (values: FilterSchema) => {
    onApply(values)
    onClose()
  }

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={trans.title}
      maxWidth="md:max-w-3xl"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleApply)}
          className="space-y-6 py-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{trans.role}</FormLabel>
                  <FormControl>
                    <DynamicSelect
                      options={roleOptions}
                      value={field.value}
                      onChange={(v) => field.onChange(v as string)}
                      placeholder={trans.placeholderRole}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{trans.email}</FormLabel>
                  <FormControl>
                    <Input placeholder={trans.placeholderEmail} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{trans.phone}</FormLabel>
                  <FormControl>
                    <Input placeholder={trans.placeholderPhone} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict.common.status}</FormLabel>
                  <FormControl>
                    {/* <select value={field.value || ""} onChange={(e) => field.onChange(e.target.value)} className="w-full rounded border px-3 py-2">
                      <option value="">Any</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select> */}
                    <AppSelect
                      placeholder={trans.placeholderStatus}
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        // { label: "", value: "Any" },
                        { label: dict.common.active, value: "Active" },
                        { label: dict.common.inactive, value: "Inactive" },
                      ]}
                      error={form.formState.errors.status}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{trans.createdDate}</FormLabel>
                  <FormControl>
                    <Input type={trans.placeholderCreatedDate} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset()
                onClose()
              }}
              className="text-blue-600 border-blue-500"
            >
              {dict.common.cancel}
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {isLoading ? dict.common.applying : dict.common.appplyfilters}
            </Button>
          </div>
        </form>
      </Form>
    </AppDialog>
  )
}

export default FilterDialog

// /app/.../_components/AddDialog.tsx
"use client"

import { useEffect, useState } from "react"
import { z } from "@workspace/ui/lib/zod"
import { zodResolver } from "@workspace/ui/lib/zod"
import { useForm } from "@workspace/ui/hooks/use-form"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form"
import { AppDialog } from "@/components/common/app-dialog"
import { StatusSwitch } from "@/components/common/switch-green"
import { fetchUserRoles, addUsers } from "./api"
import { DynamicSelect } from "@/components/common/dynamic-select"

const itemSchema = z.object({
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(5, "Enter a valid phone"),
  password: z.string().min(6, "Password must be 6+ chars"),
  status: z.boolean().catch(false),
})

const formSchema = z.object({
  items: z.array(itemSchema).min(1),
})

type FormSchema = z.infer<typeof formSchema>

interface AddDialogProps {
  open: boolean
  onClose: () => void
  mode?: "roles" | "users"
  onSave?: (data: any[]) => void
}

export function AddDialog({ open, onClose, onSave }: AddDialogProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [{ role: "", email: "", phone: "", password: "", status: false }],
    },
  })

  const [roleOptions, setRoleOptions] = useState<
    { label: string; value: string }[]
  >([])
  const [loadingRoles, setLoadingRoles] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open)
      form.reset({
        items: [
          { role: "", email: "", phone: "", password: "", status: false },
        ],
      })
  }, [open, form])

  useEffect(() => {
    setLoadingRoles(true)
    fetchUserRoles()
      .then((r: any) => setRoleOptions(r))
      .finally(() => setLoadingRoles(false))
  }, [])

  const handleSave = async (values: FormSchema) => {
    setSubmitting(true)
    try {
      // map to API shape (API will add createdOn, id, addedBy)
      const payload = values.items.map((it) => ({
        role: it.role,
        email: it.email,
        phone: it.phone,
        password: it.password,
        status: (it.status ? "Active" : "Inactive") as "Active" | "Inactive",
      }))
      const added = await addUsers(payload)
      if (onSave) onSave(added)
    } finally {
      setSubmitting(false)
      onClose()
    }
  }

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Add New User"
      maxWidth="md:max-w-1xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          <div className="max-h-[60vh] overflow-y-auto py-3">
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="items.0.role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <DynamicSelect
                        options={roleOptions}
                        value={field.value}
                        onChange={(v) => field.onChange(v as string)}
                        placeholder={
                          loadingRoles ? "Loading roles..." : "Select role"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="items.0.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="items.0.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="items.0.password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="items.0.status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <div
                      className={`flex items-center gap-3 ${field.value ? "bg-green-50" : "bg-gray-50"} h-9 px-2 rounded-md`}
                    >
                      <span className="text-sm text-red-500">Inactive</span>
                      <FormControl>
                        <StatusSwitch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <span
                        className={`text-sm ${field.value ? "text-green-600" : "text-gray-400"}`}
                      >
                        Active
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-blue-600 border-blue-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {submitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </AppDialog>
  )
}

export default AddDialog

"use client"

import { useEffect } from "react"
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
import type { Role } from "@/lib/api/roles"

const schema = z.object({
  name: z.string().min(1, "This field is required").max(100),
  active: z.boolean().catch(false),
})

type FormValues = z.infer<typeof schema>

interface EditRoleDialogProps {
  open: boolean
  onClose: () => void
  role: Role | null
  onSave: (values: FormValues) => Promise<void>
  isLoading?: boolean
}

export function EditRoleDialog({
  open,
  onClose,
  role,
  onSave,
  isLoading = false,
}: EditRoleDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      active: false,
    },
  })

  useEffect(() => {
    if (open && role) {
      form.reset({
        name: role.name,
        active: role.status === "active",
      })
    } else if (!open) {
      form.reset({
        name: "",
        active: false,
      })
    }
  }, [open, role, form])

  const handleSave = async (values: FormValues) => {
    try {
      await onSave(values)
      onClose()
    } catch (error) {
      // Error handling is done in the parent component
      console.error("Failed to save role:", error)
    }
  }

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Edit User Role"
      maxWidth="md:max-w-4xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          {/* Body */}
          <div className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Role Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter User Role Name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col rounded-md px-3">
                    <FormLabel className="pb-2">Status</FormLabel>
                    <div
                      className={`flex items-center gap-3 ${
                        field.value ? "bg-green-50" : "bg-gray-50"
                      } h-9 px-2`}
                    >
                      <span className="text-sm text-red-500">Inactive</span>
                      <FormControl>
                        <StatusSwitch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <span
                        className={`text-sm ${
                          field.value ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        Active
                      </span>
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-blue-600 border-blue-500"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </AppDialog>
  )
}

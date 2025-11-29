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
import type { Designation } from "@/lib/api/designations"

const schema = z.object({
  name: z.string().min(1, "This field is required").max(100),
})

type FormValues = z.infer<typeof schema>

interface EditDesignationDialogProps {
  open: boolean
  onClose: () => void
  designation: Designation | null
  onSave: (values: FormValues) => Promise<void>
  isLoading?: boolean
}

export function EditDesignationDialog({
  open,
  onClose,
  designation,
  onSave,
  isLoading = false,
}: EditDesignationDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  })

  useEffect(() => {
    if (open && designation) {
      form.reset({
        name: designation.name,
      })
    } else if (!open) {
      form.reset({
        name: "",
      })
    }
  }, [open, designation, form])

  const handleSave = async (values: FormValues) => {
    try {
      await onSave(values)
      onClose()
    } catch (error) {
      // Error handling is done in the parent component
      console.error("Failed to save designation:", error)
    }
  }

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Edit Designation"
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
                  <FormLabel>Designation Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Designation Name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
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


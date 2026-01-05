// /app/.../_components/EditDialog.tsx
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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@workspace/ui/lib/sonner"
import {
  createUserApiClient,
  type UserItem,
} from "@/lib/api/administration/users"
import { Check, X, Eye, EyeOff } from "lucide-react"

/* Password validation schema - same as AddDialog */
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .refine((p) => /[0-9]/.test(p), {
    message: "Password must contain at least one number.",
  })
  .refine((p) => /[A-Z]/.test(p), {
    message: "Password must contain at least one uppercase letter.",
  })
  .refine((p) => /[^A-Za-z0-9]/.test(p), {
    message: "Password must contain at least one special character.",
  })

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // If password is provided and not empty, validate it
    if (data.password && data.password.trim() !== "") {
      const result = passwordSchema.safeParse(data.password)
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: issue.message,
            path: ["password"],
          })
        })
      }
    }
  })

type FormSchema = z.infer<typeof formSchema>

interface EditDialogProps {
  open: boolean
  onClose: () => void
  user: UserItem | null
}

export function EditDialog({ open, onClose, user }: EditDialogProps) {
  const queryClient = useQueryClient()
  const userApi = createUserApiClient({})
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  })

  // Password validation checks
  const passwordChecks = {
    minLength: password.length >= 8,
    hasNumber: /[0-9]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
  }

  /* Update user mutation */
  const updateUserMutation = useMutation({
    mutationFn: async (payload: { name: string; password?: string }) => {
      if (!user) throw new Error("No user selected")
      const response = await userApi.updateUser(user.id.toString(), payload)
      return response.data
    },
    onSuccess: () => {
      toast.success("User updated successfully")
      queryClient.invalidateQueries({ queryKey: ["users"] })
      onClose()
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update user")
    },
  })

  /* Reset form when dialog opens/closes or user changes */
  useEffect(() => {
    if (open && user) {
      form.reset({
        name: user.name,
        password: "",
      })
      setPassword("")
    } else if (!open) {
      form.reset({
        name: "",
        password: "",
      })
      setPassword("")
    }
  }, [open, user, form])

  const handleSave = async (values: FormSchema) => {
    const payload: { name: string; password?: string } = {
      name: values.name,
    }

    // Only include password if it's provided and not empty
    // Form validation already ensures password meets requirements if provided
    if (values.password && values.password.trim() !== "") {
      payload.password = values.password
    }

    updateUserMutation.mutate(payload)
  }

  if (!user) return null

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Edit User"
      maxWidth="md:max-w-1xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          <div className="max-h-[60vh] overflow-y-auto py-3">
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Leave empty to keep current password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            field.onChange(e)
                            setPassword(e.target.value)
                          }}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    {password && (
                      <div className="mt-2 space-y-1.5">
                        <p className="text-xs font-medium text-gray-700 mb-2">
                          Password requirements:
                        </p>
                        <div className="space-y-1.5">
                          <div
                            className={`flex items-center gap-2 text-xs ${passwordChecks.minLength ? "text-green-600" : "text-gray-500"}`}
                          >
                            {passwordChecks.minLength ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <X className="w-3.5 h-3.5" />
                            )}
                            <span>At least 8 characters</span>
                          </div>
                          <div
                            className={`flex items-center gap-2 text-xs ${passwordChecks.hasUppercase ? "text-green-600" : "text-gray-500"}`}
                          >
                            {passwordChecks.hasUppercase ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <X className="w-3.5 h-3.5" />
                            )}
                            <span>At least 1 uppercase letter</span>
                          </div>
                          <div
                            className={`flex items-center gap-2 text-xs ${passwordChecks.hasNumber ? "text-green-600" : "text-gray-500"}`}
                          >
                            {passwordChecks.hasNumber ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <X className="w-3.5 h-3.5" />
                            )}
                            <span>At least 1 number</span>
                          </div>
                          <div
                            className={`flex items-center gap-2 text-xs ${passwordChecks.hasSpecialChar ? "text-green-600" : "text-gray-500"}`}
                          >
                            {passwordChecks.hasSpecialChar ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <X className="w-3.5 h-3.5" />
                            )}
                            <span>At least 1 special character</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {!password && (
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty to keep current password. If provided,
                        password must meet all requirements above.
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={
                      user.status === "active"
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {user.status === "active" ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
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
              disabled={updateUserMutation.isPending}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {updateUserMutation.isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </AppDialog>
  )
}

export default EditDialog

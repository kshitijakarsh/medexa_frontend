// /app/.../_components/AddDialog.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
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
import { DynamicSelect } from "@/components/common/dynamic-select"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@workspace/ui/lib/sonner"
import { createUserApiClient } from "@/lib/api/administration/users"
import { createRoleApiClient } from "@/lib/api/administration/roles"
import type { RoleItem } from "@/lib/api/administration/roles"
import { Check, X, Eye, EyeOff } from "lucide-react"
import { useDictionary } from "@/i18n/use-dictionary"

/* Password validation schema */
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

const itemSchema = z.object({
  role: z.string().min(1, "Role is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(5, "Enter a valid phone"),
  password: passwordSchema,
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
  const queryClient = useQueryClient()
  const userApi = createUserApiClient({})
  const roleApi = createRoleApiClient({})
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const dict = useDictionary();
  const trans = dict.pages.users.addDialog

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [
        {
          role: "",
          name: "",
          email: "",
          phone: "",
          password: "",
          status: false,
        },
      ],
    },
  })

  // Password validation checks
  const passwordChecks = {
    minLength: password.length >= 8,
    hasNumber: /[0-9]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
  }

  /* Fetch roles for dropdown */
  const { data: rolesData, isLoading: loadingRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await roleApi.getRoles({ limit: 100 })
      return response.data
    },
  })

  const roleOptions = useMemo(() => {
    if (!rolesData?.data) return []
    return rolesData.data.map((role: RoleItem) => ({
      label: role.name,
      value: role.id.toString(),
    }))
  }, [rolesData])

  /* Create role map for role_id lookup */
  const rolesMap = useMemo(() => {
    const map = new Map<string, number>()
    if (rolesData?.data) {
      rolesData.data.forEach((role: RoleItem) => {
        map.set(role.id.toString(), Number(role.id))
      })
    }
    return map
  }, [rolesData])

  /* Create user mutation */
  const createUserMutation = useMutation({
    mutationFn: async (payload: {
      email: string
      name: string
      password: string
      phone: string
      role_id: number
    }) => {
      const response = await userApi.createUser(payload)
      return response.data
    },
    onSuccess: () => {
      toast.success("User created successfully")
      queryClient.invalidateQueries({ queryKey: ["users"] })
      if (onSave) onSave([])
      onClose()
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create user")
    },
  })

  useEffect(() => {
    if (!open) {
      form.reset({
        items: [
          {
            role: "",
            name: "",
            email: "",
            phone: "",
            password: "",
            status: false,
          },
        ],
      })
      setPassword("")
    }
  }, [open, form])

  const handleSave = async (values: FormSchema) => {
    const item = values.items[0]

    if (!item) {
      toast.error("Please fill in all required fields")
      return
    }

    const roleId = rolesMap.get(item.role)

    if (!roleId) {
      toast.error("Please select a valid role")
      return
    }

    // Note: API doesn't require name field based on the schema, but we'll use email as name if needed
    // Based on API spec: { email, name, password, phone, role_id }
    createUserMutation.mutate({
      email: item.email,
      name: item.name,
      password: item.password,
      phone: item.phone,
      role_id: roleId,
    })
  }

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={trans.title}
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
                    <FormLabel>{trans.role}</FormLabel>
                    <FormControl>
                      <DynamicSelect
                        options={roleOptions}
                        value={field.value}
                        onChange={(v) => field.onChange(v as string)}
                        placeholder={
                          loadingRoles ? trans.placeholderRole1 : trans.placeholderRole
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="items.0.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{trans.name}</FormLabel>
                    <FormControl>
                      <Input placeholder={trans.placeholderName} {...field} />
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
                    <FormLabel>{trans.email}</FormLabel>
                    <FormControl>
                      <Input placeholder={trans.placeholderEmail} {...field} />
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
                    <FormLabel>{trans.phone}</FormLabel>
                    <FormControl>
                      <Input placeholder={trans.placeholderPhone} {...field} />
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
                    <FormLabel>{trans.password}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder={trans.placeholderPassword}
                          type={showPassword ? "text" : "password"}
                          {...field}
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
                          {trans.passwordReq}
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
                            <span>{trans.req1}</span>
                          </div>
                          <div
                            className={`flex items-center gap-2 text-xs ${passwordChecks.hasUppercase ? "text-green-600" : "text-gray-500"}`}
                          >
                            {passwordChecks.hasUppercase ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <X className="w-3.5 h-3.5" />
                            )}
                            <span>{trans.req2}</span>
                          </div>
                          <div
                            className={`flex items-center gap-2 text-xs ${passwordChecks.hasNumber ? "text-green-600" : "text-gray-500"}`}
                          >
                            {passwordChecks.hasNumber ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <X className="w-3.5 h-3.5" />
                            )}
                            <span>{trans.req4}</span>
                          </div>
                          <div
                            className={`flex items-center gap-2 text-xs ${passwordChecks.hasSpecialChar ? "text-green-600" : "text-gray-500"}`}
                          >
                            {passwordChecks.hasSpecialChar ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <X className="w-3.5 h-3.5" />
                            )}
                            <span>{trans.req3}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {!password && (
                      <p className="text-xs text-gray-500 mt-1">
                        {trans.alert}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="items.0.status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dict.common.status}</FormLabel>
                    <div
                      className={`flex items-center gap-3 ${field.value ? "bg-green-50" : "bg-gray-50"} h-9 px-2 rounded-md`}
                    >
                      <span className="text-sm text-red-500">{dict.common.inactive}</span>
                      <FormControl>
                        <StatusSwitch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <span
                        className={`text-sm ${field.value ? "text-green-600" : "text-gray-400"}`}
                      >
                        {dict.common.active}
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
              {dict.common.cancel}
            </Button>
            <Button
              type="submit"
              disabled={createUserMutation.isPending}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {createUserMutation.isPending ? dict.common.saving : dict.common.save}
            </Button>
          </div>
        </form>
      </Form>
    </AppDialog>
  )
}

export default AddDialog

"use client"

import { useState, useTransition } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "@workspace/ui/lib/sonner"
import { z, zodResolver } from "@workspace/ui/lib/zod"
import { useForm } from "@workspace/ui/hooks/use-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { User, Lock, Eye, EyeOff, Fingerprint } from "lucide-react"
import { Label } from "@workspace/ui/components/label"
import { loginUserCognito } from "@/lib/api/auth"
import { setAuthTokenCookie } from "@/lib/api/utils"

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().optional(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const params = useParams()
  const router = useRouter()
  const tenant = params?.tenant as string

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "", newPassword: "" },
    mode: "onChange",
  })

  const handleLogin = async (values: LoginFormValues) => {
    startTransition(async () => {
      try {
        const res = await loginUserCognito(
          values.username,
          values.password,
          showNewPassword ? values.newPassword : undefined
        )
        if (res.message === "NEW_PASSWORD_REQUIRED") {
          setShowNewPassword(true)
          toast.info("Password update required", {
            description: "Please set a new password to continue.",
          })
          return
        }

        if (res.success && res.tokens) {
          // Store tokens if needed
          // localStorage.setItem("access_token", res.tokens.AccessToken);
          // localStorage.setItem("id_token", res.tokens.IdToken);
          // localStorage.setItem("refresh_token", res.tokens.RefreshToken);

          // Set cookie for middleware authentication check
          setAuthTokenCookie(res.tokens.AccessToken)

          toast.success(res.message || "Login successful! Redirecting...", {
            description: "Redirecting to your dashboard...",
          })
          // Redirect to tenant dashboard
          router.push(`/dashboard`)
          setShowNewPassword(false)
        } else if (res.success) {
          // Success but no tokens (shouldn't happen, but handle gracefully)
          toast.success(res.message || "Login successful", {
            description: "Redirecting to your dashboard...",
          })
          router.push(`/dashboard`)
          setShowNewPassword(false)
        }
      } catch (err: any) {
        console.error("Login error:", err)
        toast.error("Login failed", {
          description: err.message || "Unexpected error, try again later.",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="space-y-5 animate-fade-in"
        aria-label="Login form"
      >
        {/* Header */}
        <div className="flex justify-start items-center">
          <Fingerprint className="h-8 w-8 text-green-600" />
          <h2 className="text-center text-2xl font-semibold text-gray-800 ps-3">
            {showNewPassword ? "Set New Password" : "Login"}
          </h2>
        </div>

        {/* Username */}
        {!showNewPassword && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="username">User Name</Label>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="username"
                      placeholder="Username"
                      autoComplete="username"
                      {...field}
                      className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-200 transition-colors"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="password">
                {showNewPassword ? "Current Password" : "Password"}
              </Label>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="current-password"
                    {...field}
                    className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-200 transition-colors"
                  />
                  {showPassword ? (
                    <EyeOff
                      aria-label="Hide password"
                      className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600 transition"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <Eye
                      aria-label="Show password"
                      className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600 transition"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password (only if required) */}
        {showNewPassword && (
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="newPassword">New Password</Label>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      {...field}
                      className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-200 transition-colors"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
        >
          {isPending
            ? "Processing..."
            : showNewPassword
              ? "Update Password & Login"
              : "Login"}
        </Button>
        <div className="text-center mt-2">
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            Help?
          </a>
        </div>
        {/* Footer */}
        {!showNewPassword && (
          <div className="text-center text-xs text-gray-800 mt-4">
            © 2025 MEdExa Cloud Health Platform
          </div>
        )}
      </form>
    </Form>
  )
}

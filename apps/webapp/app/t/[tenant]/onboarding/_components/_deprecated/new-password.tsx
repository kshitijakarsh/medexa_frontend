"use client"

import Image from "next/image"
import { ICONS } from "@/lib/icons"
import { Input } from "@/components/ui/input"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import { z } from "@workspace/ui/lib/zod"
import { useState } from "react"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import Button from "@/components/ui/button"

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special symbol"),
    confirmPassword: z.string(),
  })
  .refine(
    (data: PasswordFormData) => data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  )

type PasswordFormData = z.infer<typeof passwordSchema>

interface NewPasswordProps {
  onNext?: () => void
}

const NewPassword = ({ onNext }: NewPasswordProps) => {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  const onSubmit = async (data: PasswordFormData) => {
    setIsSaving(true)
    try {
      // TODO: Call setNewPassword API when available
      // await setNewPassword(data.newPassword)
      await new Promise((resolve) => setTimeout(resolve, 500)) // Mock delay
      console.log("Password submitted:", data)
      onNext?.()
    } catch (error) {
      console.error("Failed to save password:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSkip = () => {
    // Skip password setup and proceed to next step
    onNext?.()
  }

  const hasErrors = errors.newPassword || errors.confirmPassword

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-sm">
      <div className="space-y-2.5 max-w-md my-20">
        <Image src={ICONS.passwordLock} alt="Password lock icon" width={78} height={78} />
        <h1 className="text-2xl font-semibold mt-6">Set Your New Password</h1>
        <p className="">
          Your email has been verified successfully.Now create a new password to
          secure your MedExa admin account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">
              New Password
            </label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter Password"
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-Enter Password"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {hasErrors && (
            <div className="border border-red-500 bg-red-50 rounded-md p-4 flex items-start gap-3">
              <AlertCircle
                className="text-red-500 flex-shrink-0 mt-0.5"
                size={20}
              />
              <p className="text-red-500 text-sm">
                Must contain 8+ characters, one uppercase letter, one number,
                and one special symbol.
              </p>
            </div>
          )}

          <div className="flex justify-start gap-2 mt-8">
            <Button
              variant="outline"
              className="w-1/2"
              onClick={handleSkip}
              type="button"
            >
              Skip
            </Button>
            <Button type="submit" className="w-1/2" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPassword

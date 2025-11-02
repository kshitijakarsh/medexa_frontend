"use client"

import { useState } from "react"
import { EmailIcon } from "../../assets/icons"
import Button from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp"
import { verifyOTP } from "@/lib/api/onboarding"

interface VerifyEmailProps {
  onNext?: () => void
}

const VerifyEmail = ({ onNext }: VerifyEmailProps) => {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      const response = await verifyOTP(otp)
      if (response.success) {
        // Verification successful, proceed to next step
        onNext?.()
      } else {
        setError(response.message || "Invalid OTP. Please try again.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = () => {
    // TODO: Implement resend OTP logic
    console.log("Resend OTP clicked")
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-sm">
      <div className="space-y-2.5 max-w-md my-28">
        <EmailIcon />
        <h1 className="text-2xl font-semibold mt-6">Verify Your Email</h1>
        <p className="">
          We've sent a 6-digit verification code to admin@hospital.com Please
          enter it below to continue.
        </p>
        <div className="space-y-1 mt-6 max-w-sm">
          <div className="flex justify-between items-center text-gray-900 font-light text-sm">
            <p>Enter OTP</p>
            <p>
              Resend OTP in <span className="text-blue-500">00:59</span>
            </p>
          </div>
          <InputOTP
            containerClassName="gap-4"
            maxLength={6}
            value={otp}
            onChange={setOtp}
          >
            <InputOTPGroup>
              <InputOTPSlot className="w-12 h-12" index={0} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot className="w-12 h-12" index={1} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot className="w-12 h-12" index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot className="w-12 h-12" index={3} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot className="w-12 h-12" index={4} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot className="w-12 h-12" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <div className="flex justify-start gap-2 mt-8">
          <Button
            variant="outline"
            className="w-1/2"
            onClick={handleResend}
            type="button"
          >
            Resend OTP
          </Button>
          <Button
            className="w-1/2"
            onClick={handleVerify}
            disabled={isVerifying || otp.length !== 6}
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail

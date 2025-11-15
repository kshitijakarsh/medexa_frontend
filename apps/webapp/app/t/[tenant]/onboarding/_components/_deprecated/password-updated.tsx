"use client"

import Image from "next/image"
import Button from "@/components/ui/button"
import { ICONS } from "@/lib/icons"

interface PasswordUpdatedProps {
  onNext?: () => void
}

const PasswordUpdated = ({ onNext }: PasswordUpdatedProps) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-sm">
      <div className="space-y-2.5 max-w-md my-20">
        <Image src={ICONS.passwordUpdatedIcon} alt="Password updated icon" width={78} height={78} />
        <h1 className="text-2xl font-semibold mt-6">Password Updated!</h1>
        <p className="">
          Your new password has been saved and will be used for future logins.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mt-6">
          <p className="">
            You can update your password later if you wish, but please remember
            this one for future logins.
          </p>
        </div>

        <div className="flex justify-start mt-8">
          <Button className="w-full" onClick={onNext}>
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PasswordUpdated

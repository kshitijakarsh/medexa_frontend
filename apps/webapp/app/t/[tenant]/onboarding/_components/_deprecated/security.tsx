"use client"

import Image from "next/image"
import Button from "@/components/ui/button"
import { ICONS } from "@/lib/icons"

interface SecurityProps {
  onNext?: () => void
}

const Security = ({ onNext }: SecurityProps) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-sm">
      <div className="space-y-2.5 max-w-md my-28">
        <Image src={ICONS.securityIcon} alt="Security icon" width={78} height={78} />
        <h1 className="text-2xl font-semibold mt-6">Secure Your Account</h1>
        <p className="">
          You're currently using a temporary password shared by the MedExa team.
          For security reasons, you can create a new password linked to your
          email.
        </p>
        <div className="flex justify-start mt-8">
          <Button className="w-full" onClick={onNext}>
            Set New Password
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Security

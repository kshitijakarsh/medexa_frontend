"use client"

import Image from "next/image"
import Button from "@/components/ui/button"
import { ICONS } from "@/lib/icons"

interface VerificationPendingProps {
  onLogout?: () => void
}

const VerificationPending = ({ onLogout }: VerificationPendingProps) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-12 shadow-sm">
      <div className="space-y-2.5 max-w-md">
        <Image src={ICONS.verifiedIcon} alt="Verified icon" width={78} height={78} />
        <h1 className="text-2xl font-semibold mt-6">
          Verification Submitted Successfully!
        </h1>
        <p className="">Thank you for completing your onboarding.</p>

        <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mt-6">
          <p className="">
            Your hospital is now in Pending Verification status. We'll notify
            you once it's approved by the MedExa compliance team. This typically
            takes 2-3 business days.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="font-semibold mb-4">What happens next?</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Our compliance team will review your documents</li>
            <li>You may be contacted if additional information is needed</li>
            <li>Once approved, all features will be unlocked</li>

          </ol>
        </div>

        <div className="flex gap-2 mt-8">
          <Button
            variant="outline"
            className="w-1/2 bg-red-500 hover:bg-red-600 text-white border-none"
            onClick={onLogout}
          >
            LOGOUT
          </Button>
          <Button
            disabled
            className="w-1/2 bg-gray-300 text-gray-600 cursor-not-allowed"
          >
            GO TO DASHBOARD
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VerificationPending

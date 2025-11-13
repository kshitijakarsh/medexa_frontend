"use client"

import Image from "next/image"
import Button from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { ICONS } from "@/lib/icons"

interface VerificationApprovedProps {
  onDashboard?: () => void
  onLogout?: () => void
}

const VerificationApproved = ({
  onDashboard,
  onLogout,
}: VerificationApprovedProps) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-12 shadow-sm">
      <div className="space-y-2.5 max-w-md">
        <Image src={ICONS.verifiedIcon} alt="Verified icon" width={78} height={78} />
        <div className="flex items-center gap-2 mt-6">
          <h1 className="text-2xl font-semibold">Verification Approved!</h1>
          <CheckCircle2 className="text-green-500" size={28} />
        </div>
        <p className="">
          Congratulations! Your hospital has successfully completed MedExa's
          verification process.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mt-6">
          <p className="">
            Your account is now fully activated, and you can access all MedExa
            modules, including billing, staff management, and reporting. Thank
            you for providing the required details and helping us ensure
            compliance with Kuwait MOH and PDPL standards.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="font-semibold mb-4">What happens next?</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Our compliance team will review your documents</li>
            <li>You may be contacted if additional information is needed</li>
            <li>Once approved, all features will be unlocked</li>
            <li>You'll receive an email and SMS notification</li>
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
          <Button className="w-1/2" onClick={onDashboard}>
            GO TO DASHBOARD
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VerificationApproved

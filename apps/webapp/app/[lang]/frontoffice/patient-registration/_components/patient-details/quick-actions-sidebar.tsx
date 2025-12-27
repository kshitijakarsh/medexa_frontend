"use client"

import { UserPlus2, CreditCard, IdCard, Edit2, Users, AlertCircle } from "lucide-react"
import Button from "@/components/ui/button"
import { ActiveProblemsWidget } from "./widgets/active-problems-widget"
import { AllergiesWidget } from "./widgets/allergies-widget"
import { OngoingMedicationsWidget } from "./widgets/ongoing-medications-widget"
import type { PatientDetails } from "./types"

interface QuickActionsSidebarProps {
    patient: PatientDetails
    onCreateVisit?: () => void
    onOpenBilling?: () => void
    onPrintIdCard?: () => void
    onEditDetails?: () => void
    onFamilyLink?: () => void
}

export function QuickActionsSidebar({
    patient,
    onCreateVisit,
    onOpenBilling,
    onPrintIdCard,
    onEditDetails,
    onFamilyLink
}: QuickActionsSidebarProps) {
    return (
        <div className="space-y-4">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-[#1C1C1E]" />
                    <h4 className="font-bold text-[#1C1C1E] text-[17px]">Quick Actions</h4>
                </div>

                <div className="space-y-3">
                    <Button
                        onClick={onCreateVisit}
                        className="w-full justify-start bg-[#007AFF] hover:bg-[#0066CC] text-white h-11 rounded-lg text-sm font-medium"
                    >
                        <UserPlus2 className="w-5 h-5 mr-3" />
                        Create New Visit
                    </Button>

                    <Button
                        onClick={onOpenBilling}
                        className="w-full justify-start bg-[#007AFF] hover:bg-[#0066CC] text-white h-11 rounded-lg text-sm font-medium"
                    >
                        <CreditCard className="w-5 h-5 mr-3" />
                        Open Billing
                    </Button>

                    <Button
                        onClick={onPrintIdCard}
                        className="w-full justify-start bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#1C1C1E] h-11 rounded-lg text-sm font-medium border-none shadow-none"
                    >
                        <IdCard className="w-5 h-5 mr-3" />
                        Print ID Card
                    </Button>

                    <Button
                        onClick={onEditDetails}
                        className="w-full justify-start bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#1C1C1E] h-11 rounded-lg text-sm font-medium border-none shadow-none"
                    >
                        <Edit2 className="w-5 h-5 mr-3" />
                        Edit Details
                    </Button>

                    <Button
                        onClick={onFamilyLink}
                        className="w-full justify-start bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#1C1C1E] h-11 rounded-lg text-sm font-medium border-none shadow-none"
                    >
                        <Users className="w-5 h-5 mr-3" />
                        Family Link
                    </Button>
                </div>
            </div>

            {/* Widgets */}
            <div className="space-y-8">
                <ActiveProblemsWidget problems={patient.activeProblems} />
                <AllergiesWidget allergies={patient.allergies} />
                <OngoingMedicationsWidget medications={patient.medications} />
            </div>
        </div>
    )
}

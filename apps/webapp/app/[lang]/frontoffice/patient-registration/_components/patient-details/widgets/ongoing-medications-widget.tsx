"use client"

import { Link2 } from "lucide-react"
import type { Medication } from "../types"

interface OngoingMedicationsWidgetProps {
    medications: Medication[]
}

export function OngoingMedicationsWidget({ medications }: OngoingMedicationsWidgetProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <Link2 className="w-5 h-5 text-[#1C1C1E]" />
                <h4 className="font-bold text-[#1C1C1E] text-[17px]">Ongoing Medications</h4>
            </div>

            {medications.length === 0 ? (
                <p className="text-sm text-gray-500">No ongoing medications</p>
            ) : (
                <div className="space-y-3">
                    {medications.map((medication, index) => (
                        <div
                            key={index}
                            className="p-4 bg-[#F0F9FF] rounded-lg border border-[#BAE6FD] transition-colors hover:bg-[#E0F2FE]"
                        >
                            <p className="text-[15px] font-bold text-[#1C1C1E] mb-1">{medication.name}</p>
                            <p className="text-sm text-gray-600">{medication.dosage}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

"use client"

import { AlertCircle } from "lucide-react"
import type { Allergy } from "../types"

interface AllergiesWidgetProps {
    allergies: Allergy[]
}

export function AllergiesWidget({ allergies }: AllergiesWidgetProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-[#1C1C1E]" />
                <h4 className="font-bold text-[#1C1C1E] text-[17px]">Allergies</h4>
            </div>

            {allergies.length === 0 ? (
                <p className="text-sm text-gray-500">No known allergies</p>
            ) : (
                <div className="space-y-3">
                    {allergies.map((allergy, index) => (
                        <div
                            key={index}
                            className="p-4 bg-[#FFF1F2] rounded-lg border border-[#FFE4E6] transition-colors hover:bg-[#FFF5F7]"
                        >
                            <p className="text-[15px] font-medium text-[#881337]">
                                {allergy.allergen} <span className="font-normal text-[#9F1239]">- {allergy.severity}</span>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

"use client"

import { Stethoscope } from "lucide-react"
import type { Diagnosis } from "../types"

interface RecentDiagnosesSectionProps {
    diagnoses: Diagnosis[]
}

export function RecentDiagnosesSection({ diagnoses }: RecentDiagnosesSectionProps) {
    return (
        <div>
            <h3 className="text-[17px] font-bold text-[#1C1C1E] mb-4">Recent Diagnoses</h3>

            {diagnoses.length === 0 ? (
                <p className="text-gray-500 text-sm">No diagnoses recorded</p>
            ) : (
                <div className="space-y-3">
                    {diagnoses.map((diagnosis, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors"
                        >
                            <p className="font-bold text-[#1C1C1E] text-[15px] mb-1.5">
                                {diagnosis.name} <span className="text-[#1C1C1E] font-bold">({diagnosis.code})</span>
                            </p>
                            <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                                <Stethoscope className="w-3.5 h-3.5" />
                                <span>Dr. {diagnosis.doctor}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

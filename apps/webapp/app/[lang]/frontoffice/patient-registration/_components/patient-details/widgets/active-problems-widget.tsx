"use client"

import { AlertCircle } from "lucide-react"
import type { Problem } from "../types"

interface ActiveProblemsWidgetProps {
    problems: Problem[]
}

export function ActiveProblemsWidget({ problems }: ActiveProblemsWidgetProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-[#1C1C1E]" />
                <h4 className="font-bold text-[#1C1C1E] text-[17px]">Active Problems</h4>
            </div>

            {problems.length === 0 ? (
                <p className="text-sm text-gray-500">No active problems</p>
            ) : (
                <div className="space-y-3">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className="p-4 bg-[#FFFBEB] rounded-lg border border-[#FEF3C7] transition-colors hover:bg-[#FFF7ED]"
                        >
                            <p className="text-[15px] font-medium text-[#451A03]">{problem.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

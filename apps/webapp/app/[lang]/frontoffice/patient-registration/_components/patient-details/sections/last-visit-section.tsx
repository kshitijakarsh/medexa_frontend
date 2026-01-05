"use client"

import { Calendar, FileText, Stethoscope, Building2, Bed } from "lucide-react"
import Button from "@/components/ui/button"
import type { Visit } from "../types"

interface LastVisitSectionProps {
    visit?: Visit
}

export function LastVisitSection({ visit }: LastVisitSectionProps) {
    if (!visit) {
        return (
            <div className="bg-gray-50 p-6 text-center text-gray-500 border-b border-gray-100">
                No visit history available
            </div>
        )
    }

    return (
        <div className="bg-[#EAF6FF] p-6 rounded-2xl">
            <h3 className="text-[17px] font-bold text-[#1C1C1E] mb-5">Last Visit Visit</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Visit Date & Time */}
                <div className="bg-white rounded-xl p-4 flex items-center gap-4 border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#FFEAEB] flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-[#FF5A5F]" />
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 mb-0.5">Visit Date & Time</span>
                        <div className="flex items-baseline gap-2">
                            <span className="font-bold text-[#1C1C1E] text-[15px]">{visit.date}</span>
                            <span className="text-xs text-gray-400 font-normal">{visit.time}</span>
                        </div>
                    </div>
                </div>

                {/* Visit Type */}
                <div className="bg-white rounded-xl p-4 flex items-center gap-4 border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-[#007AFF]" />
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 mb-0.5">Visit Type</span>
                        <span className="font-bold text-[#1C1C1E] text-[15px] block">{visit.type}</span>
                    </div>
                </div>

                {/* Doctor */}
                <div className="bg-white rounded-xl p-4 flex items-center gap-4 border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#E6FFFA] flex items-center justify-center flex-shrink-0">
                        <Stethoscope className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 mb-0.5">Doctor</span>
                        <div className="flex items-baseline gap-2">
                            <span className="font-bold text-[#1C1C1E] text-[15px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]" title={visit.doctor.name}>{visit.doctor.name}</span>
                            <span className="text-xs text-gray-400 font-normal">{visit.doctor.specialty}</span>
                        </div>
                    </div>
                </div>

                {/* Department */}
                <div className="bg-white rounded-xl p-4 flex items-center gap-4 border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#E0F7FA] flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-[#06B6D4]" />
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 mb-0.5">Department</span>
                        <div className="flex items-baseline gap-2">
                            <span className="font-bold text-[#1C1C1E] text-[15px]">{visit.department}</span>
                            <span className="text-xs text-gray-400 font-normal">In Consultation</span>
                        </div>
                    </div>
                </div>

                {/* Token / Status */}
                <div className="bg-white rounded-xl p-4 flex items-center gap-4 border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#FFF7ED] flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-[#F97316]" />
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 mb-0.5">Token / Status</span>
                        <div className="flex items-baseline gap-2">
                            <span className="font-bold text-[#1C1C1E] text-[15px]">{visit.token}</span>
                            <span className="text-xs text-gray-400 font-normal">{visit.status}</span>
                        </div>
                    </div>
                </div>

                {/* Ward/room/bed */}
                <div className="bg-white rounded-xl p-4 flex items-center gap-4 border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#FEF9C3] flex items-center justify-center flex-shrink-0">
                        <Bed className="w-6 h-6 text-[#EAB308]" />
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 mb-0.5">Ward/room/bed</span>
                        <span className="font-bold text-[#1C1C1E] text-[15px] block">{visit.ward}</span>
                    </div>
                </div>
            </div>

            {/* Visiting Purpose */}
            <div className="mb-6">
                <p className="text-[13px] font-medium text-[#1C1C1E] mb-2">Visiting Purpose</p>
                <div className="bg-white p-3.5 rounded-xl border border-gray-100 w-full text-gray-600 text-sm shadow-sm">
                    {visit.purpose}
                </div>
            </div>

            {/* Open CMR Button */}
            <Button className="bg-[#007AFF] hover:bg-[#0066CC] text-white w-auto rounded-lg h-9 px-4 text-sm font-medium">
                <FileText className="w-4 h-4 mr-2" />
                Open Clinical Record (CMR)
            </Button>
        </div>
    )
}

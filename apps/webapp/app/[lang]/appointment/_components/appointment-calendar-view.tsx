"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { DateStatCard } from "./date-stat-card"
import { AppointmentEntry } from "../types"

// Mock data to match the screenshot
const MOCK_DATE_CARDS = Array(7).fill({
    date: "2nd Nov Saturday",
    total: 17,
    booked: 17,
    blocked: 18,
    available: 17,
}).map((item, i) => {
    // Just varying the date slightly for realism if needed, 
    // but user image shows identical cards mostly. 
    // Let's vary the label slightly or keep generic as requested "show like this"
    if (i === 0) return { ...item, date: "1st Nov Saturday" }
    return item
})

interface AppointmentCalendarViewProps {
    data: any[]
    doctor?: { name: string; specialty?: string }
}

export function AppointmentCalendarView({ data, doctor }: AppointmentCalendarViewProps) {
    const doctorName = doctor?.name || "Dr. Michael Chen"
    const doctorSpecialty = doctor?.specialty || "Cardiology Specialist"

    return (
        <div className="space-y-6">
            {/* Unified Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">

                {/* Doctor Profile Section */}
                <div className="border border-sky-100 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl overflow-hidden border-2 border-[#34D399] flex-shrink-0 p-0.5">
                        <Avatar className="h-full w-full rounded-xl">
                            <AvatarImage src="/images/doctor_michael.png" className="object-cover" />
                            <AvatarFallback className="bg-orange-100 text-orange-600 text-2xl font-bold rounded-xl">
                                {doctorName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <h2 className="text-lg font-bold text-gray-900">{doctorName}</h2>
                        <p className="text-gray-500 text-sm">{doctorSpecialty}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            <div className="bg-gray-50 text-gray-700 text-xs px-2 py-0.5 rounded-full border border-gray-100">
                                MBBS, MD Cardiology
                            </div>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 text-xs font-normal">
                                Active
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Date Cards Grid */}
                <div className="grid grid-cols-1 sc-vs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {MOCK_DATE_CARDS.map((card, index) => (
                        <DateStatCard
                            key={index}
                            date={card.date}
                            total={card.total}
                            booked={card.booked}
                            blocked={card.blocked}
                            available={card.available}
                        />
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" className="border-blue-500 text-gray-700 hover:bg-blue-50 w-32 rounded-lg">
                        CANCEL
                    </Button>
                    <Button className="bg-[#34D399] hover:bg-[#2EB886] text-white w-32 rounded-lg">
                        SAVE
                    </Button>
                </div>
            </div>
        </div>
    )
}

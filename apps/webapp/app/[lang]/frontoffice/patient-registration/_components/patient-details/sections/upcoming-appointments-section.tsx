"use client"

import { Eye, Calendar, Stethoscope } from "lucide-react"
import Button from "@/components/ui/button"
import type { Appointment } from "../types"

interface UpcomingAppointmentsSectionProps {
    appointments: Appointment[]
}

export function UpcomingAppointmentsSection({ appointments }: UpcomingAppointmentsSectionProps) {
    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime)
        // Format: 2025-11-25 at 10:00 AM
        return `${date.toLocaleDateString('en-CA')} at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`
    }

    return (
        <div>
            <h3 className="text-[17px] font-bold text-[#1C1C1E] mb-4">Upcoming Appointments</h3>

            {appointments.length === 0 ? (
                <p className="text-gray-500 text-sm">No upcoming appointments</p>
            ) : (
                <div className="space-y-3">
                    {appointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                {/* Date Icon */}
                                <div className="w-12 h-12 rounded-full bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-6 h-6 text-[#007AFF]" />
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-[#1C1C1E] text-[15px]">
                                            {formatDateTime(appointment.dateTime)}
                                        </span>
                                        {appointment.type === 'follow-up' && (
                                            <span className="inline-flex items-center px-3 py-0.5 text-[11px] font-semibold text-[#D97706] bg-[#FFFBEB] border border-[#FDE68A] rounded-full">
                                                Follow-Up
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                                        <Stethoscope className="w-3.5 h-3.5" />
                                        <span>Dr. {appointment.doctor}</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                className="bg-[#007AFF] hover:bg-[#0066CC] text-white rounded-full px-5 h-8 text-xs font-semibold gap-1.5"
                            >
                                <Eye className="w-3.5 h-3.5" />
                                View
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

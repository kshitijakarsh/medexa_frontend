"use client";

import { AppointmentEntry } from "../types";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { Phone, MoreVertical, Calendar, Stethoscope, Clock, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";

interface AppointmentGridViewProps {
    data: AppointmentEntry[];
}

export function AppointmentGridView({ data }: AppointmentGridViewProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl border border-gray-100 min-h-[400px]">
                <p className="text-gray-500 text-lg">No appointments found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
        </div>
    );
}

function AppointmentCard({ appointment }: { appointment: AppointmentEntry }) {
    // Status Color Logic
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Booked":
                return "bg-[#FFF6E9] text-[#AF5A62]"; // Orange-ish background, specific red text
            case "Confirmed":
                return "bg-[#E6FFFA] text-[#2CB470]"; // Green
            case "Checked-In":
                return "bg-[#F3E8FF] text-[#A855F7]"; // Purple
            case "Completed":
                return "bg-gray-100 text-gray-600";
            case "Cancelled":
                return "bg-red-50 text-red-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow relative">
            {/* Top Row: App ID & Status */}
            <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-medium text-gray-600">{appointment.appId}</span>
                {/* More Options */}
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Patient Profile */}
            <div className="flex items-center gap-3 mb-4">
                <div className="relative shrink-0">
                    {appointment.isVip && (
                        <div className="absolute -top-1 -left-1 z-10 w-5 h-5 rounded-full flex items-center justify-center bg-[#FFF9C4]">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#FACC15" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" stroke="#B45309" strokeWidth="1" />
                            </svg>
                        </div>
                    )}
                    <Avatar className="h-14 w-14 border-2 border-green-500 p-0.5">
                        <AvatarImage src={appointment.patientImg} alt={appointment.patientName} className="rounded-full object-cover" />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                            {appointment.patientName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-base truncate">{appointment.patientName}</h3>
                    <p className="text-sm text-gray-500 truncate">{appointment.mrn}</p>
                </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-3 mb-2 relative">
                {/* Date & Time */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{appointment.appointmentDate} {appointment.bookedSlot}</span>
                    </div>
                    {appointment.isVip && <span className="text-sm font-semibold text-gray-500">VIP</span>}
                </div>

                {/* Type */}
                <div className="flex items-center text-sm text-green-600 font-medium">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{appointment.isNewConsultation ? "New Consultation" : "Follow-up"}</span>
                </div>

                {/* Doctor - with Call Button aligned right */}
                <div className="flex items-start justify-between mt-4">
                    <div className="flex items-start">
                        <Stethoscope className="w-4 h-4 mr-2 text-blue-500 mt-1" />
                        <div>
                            <p className="font-bold text-gray-900 text-sm">{appointment.consultantDoctor}</p>
                            <p className="text-gray-500 text-xs">{appointment.specialty}</p>
                        </div>
                    </div>
                    <Button size="icon" className="h-10 w-10 bg-[#2CB470] hover:bg-[#259b60] rounded-xl shadow-sm shrink-0">
                        <Phone className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </div>

            {/* Removed separate bottom action button as it's now integrated */}
        </div>
    );
}

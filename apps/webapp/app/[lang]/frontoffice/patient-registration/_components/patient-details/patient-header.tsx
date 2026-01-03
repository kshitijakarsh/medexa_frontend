"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Mail, MapPin, Phone } from "lucide-react"
import type { PatientDetails } from "./types"

interface PatientHeaderProps {
    patient: PatientDetails
}

export function PatientHeader({ patient }: PatientHeaderProps) {
    const getInitials = () => {
        return `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`.toUpperCase()
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    return (
        <div className="py-2">
            {/* Top Row: Avatar + Info Columns */}
            <div className="flex items-center gap-6 mb-8">
                {/* Avatar */}
                <Avatar className="h-16 w-16 border-2 border-green-500 p-0.5">
                    <AvatarImage src={patient.photoUrl} alt={`${patient.firstName} ${patient.lastName}`} className="rounded-full object-cover" />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                        {getInitials()}
                    </AvatarFallback>
                </Avatar>

                {/* Name & MRN */}
                <div className="flex flex-col min-w-[150px]">
                    <h2 className="text-lg font-bold text-[#1C1C1E] leading-tight">
                        {patient.firstName} {patient.lastName}
                    </h2>
                    <span className="text-gray-500 text-sm">MRN -{patient.mrn}</span>
                </div>

                {/* Details Grid - Labels on TOP, Values on BOTTOM */}
                <div className="flex flex-1 items-start justify-between gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">CPR/NID</span>
                        <span className="text-[#1C1C1E] font-bold text-sm">{patient.cprNid}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Date Of Birth</span>
                        <span className="text-[#1C1C1E] font-bold text-sm">{patient.dob}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Gender</span>
                        <span className="text-[#1C1C1E] font-bold text-sm capitalize">{patient.gender}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Blood Group</span>
                        <span className="text-[#1C1C1E] font-bold text-sm">{patient.bloodGroup}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Marital Status</span>
                        <span className="text-[#1C1C1E] font-bold text-sm">{patient.maritalStatus}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Nationality</span>
                        <span className="text-[#1C1C1E] font-bold text-sm">{patient.nationality}</span>
                    </div>
                </div>
            </div>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-3 gap-4">
                {/* Phone Card */}
                <div className="bg-[#F9FAFB] p-3 rounded-lg flex items-start gap-3">
                    <div className="mt-1">
                        <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Phone</span>
                        <span className="text-[#1C1C1E] font-semibold text-sm">{patient.phone}</span>
                    </div>
                </div>

                {/* Email Card */}
                <div className="bg-[#F9FAFB] p-3 rounded-lg flex items-start gap-3">
                    <div className="mt-1">
                        <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Email</span>
                        <span className="text-[#1C1C1E] font-semibold text-sm">{patient.email}</span>
                    </div>
                </div>

                {/* Address Card */}
                <div className="bg-[#F9FAFB] p-3 rounded-lg flex items-start gap-3">
                    <div className="mt-1">
                        <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Address</span>
                        <span className="text-[#1C1C1E] font-semibold text-sm break-words">{patient.address}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

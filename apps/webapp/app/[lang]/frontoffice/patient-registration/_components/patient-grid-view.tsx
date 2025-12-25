"use client";

import { PatientEntry } from "../types";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { Phone, MoreVertical, Calendar, User, Mail, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { ContactPopover } from "@/app/[lang]/appointment/_components/contact-popover";

interface PatientGridViewProps {
    data: PatientEntry[];
}

export function PatientGridView({ data }: PatientGridViewProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl border border-gray-100 min-h-[400px]">
                <p className="text-gray-500 text-lg">No patients found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
            ))}
        </div>
    );
}

function PatientCard({ patient }: { patient: PatientEntry }) {
    // Status Color Logic
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
            case "Registered Patient":
                return "bg-[#E6FFFA] text-[#2CB470]"; // Green
            case "Inactive":
                return "bg-gray-100 text-gray-600";
            case "Unknown ER":
                return "bg-red-50 text-red-600";
            case "Incomplete":
                return "bg-[#FFF6E9] text-[#AF5A62]"; // Orange-ish
            case "Online Registration":
                return "bg-blue-50 text-blue-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const getCategoryBadge = (category: string) => {
        if (category === "VIP") {
            return "bg-yellow-100 text-yellow-700";
        } else if (category === "Emergency") {
            return "bg-red-100 text-red-700";
        }
        return "bg-gray-100 text-gray-600";
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow relative">
            {/* Top Row: MRN & Status */}
            <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-medium text-gray-600">{patient.mrn}</span>
                {/* More Options */}
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Patient Profile */}
            <div className="flex items-center gap-3 mb-4">
                <div className="relative shrink-0">
                    {patient.isVip && (
                        <div className="absolute -top-1 -left-1 z-10 w-5 h-5 rounded-full flex items-center justify-center bg-[#FFF9C4]">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#FACC15" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" stroke="#B45309" strokeWidth="1" />
                            </svg>
                        </div>
                    )}
                    <Avatar className="h-14 w-14 border-2 border-green-500 p-0.5">
                        <AvatarImage src={patient.patientImg} alt={patient.patientName} className="rounded-full object-cover" />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                            {patient.patientName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-base truncate">{patient.patientName}</h3>
                    <p className="text-sm text-gray-500 truncate">{patient.dob}</p>
                </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-3 mb-2 relative">
                {/* Phone & Email */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="truncate">{patient.phone}</span>
                    </div>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="truncate">{patient.email}</span>
                </div>

                {/* Gender & Category */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{patient.gender}</span>
                    </div>
                    <Badge className={`text-xs font-semibold px-2 py-0.5 ${getCategoryBadge(patient.category)}`}>
                        {patient.category}
                    </Badge>
                </div>

                {/* Last Visit - with Contact Button aligned right */}
                <div className="flex items-start justify-between mt-4">
                    <div className="flex items-start">
                        <Clock className="w-4 h-4 mr-2 text-blue-500 mt-1" />
                        <div>
                            <p className="font-bold text-gray-900 text-xs">Last Visit</p>
                            <p className="text-gray-500 text-xs">{patient.lastVisit}</p>
                        </div>
                    </div>
                    <ContactPopover phoneNumber={patient.phone} />
                </div>
            </div>
        </div>
    );
}

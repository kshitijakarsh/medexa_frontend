"use client"

import { UserAvatar } from "@/components/common/pasient-card/user-avatar"
import { CardBlock } from "@/components/common/pasient-card/card-block"

export interface Patient {
    id: string
    name: string
    patientId: string
    cprNid: string
    dateOfBirth: string
    gender: string
    bloodGroup: string
    maritalStatus: string
    nationality: string
    phone: string
    email: string
    address: string
    avatar?: string
}

interface PatientDetailsCardProps {
    patient: Patient
}

export function PatientDetailsCard({ patient }: PatientDetailsCardProps) {
    const getInitials = (name: string) => {
        const parts = name.split(" ").filter(Boolean)
        if (parts.length >= 2) {
            return `${parts[0]?.[0] || ""}${parts[parts.length - 1]?.[0] || ""}`.toUpperCase()
        }
        return name.substring(0, 2).toUpperCase()
    }

    return (
        <div className="space-y-4">
            {/* Patient Details */}
            <CardBlock className="p-5 border-[3px] border-[#ECF3FF] shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                    <UserAvatar
                        src={patient.avatar || ""}
                        alt={patient.name}
                        size={60}
                        fallback={getInitials(patient.name)}
                    />
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {patient.name}
                        </h3>
                        <p className="text-sm text-gray-500">{patient.patientId}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">CPR/NID</span>
                        <span className="text-base font-bold text-gray-900">{patient.cprNid}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">Date Of Birth</span>
                        <span className="text-base font-bold text-gray-900">{patient.dateOfBirth}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">Gender</span>
                        <span className="text-base font-bold text-gray-900">{patient.gender}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">Blood Group</span>
                        <span className="text-base font-bold text-gray-900">{patient.bloodGroup}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">Marital Status</span>
                        <span className="text-base font-bold text-gray-900">{patient.maritalStatus}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">Nationality</span>
                        <span className="text-base font-bold text-gray-900">{patient.nationality}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">Phone</span>
                        <span className="text-base font-bold text-gray-900">{patient.phone}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">Email</span>
                        <span className="text-base font-bold text-gray-900 break-words">{patient.email}</span>
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-1">
                        <span className="text-sm text-gray-500">Address</span>
                        <span className="text-base font-bold text-gray-900">{patient.address}</span>
                    </div>
                </div>
            </CardBlock>

        </div>
    )
}

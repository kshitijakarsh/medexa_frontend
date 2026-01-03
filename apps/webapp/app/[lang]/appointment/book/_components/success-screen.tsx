"use client"

import { Button } from "@workspace/ui/components/button"
import { Check, Calendar, Clock, MapPin, User, Phone, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface SuccessScreenProps {
    data: any
    visitType: "appointment" | "walk_in" | "emergency"
    patientDetails?: any
    onClose?: () => void
}

export function SuccessScreen({ data, visitType, patientDetails, onClose }: SuccessScreenProps) {
    const router = useRouter()

    // Logic to determine labels based on visit type
    const isWalkIn = visitType === "walk_in"
    const title = isWalkIn ? "Visit Registered!" : "Appointment Booked!"
    const subtitle = isWalkIn
        ? "Your visit has been successfully created."
        : "Your consultation has been successfully booked"

    const idLabel = isWalkIn ? "Visit ID" : "Appointment ID"

    // Extract data safely
    const id = data?.id || "N/A"
    const patientName = data?.patient?.first_name
        ? `${data.patient.first_name} ${data.patient.last_name}`
        : (data?.full_name || patientDetails?.name || "Unknown")

    const mrn = data?.emergency_guardian_mrn || data?.patient?.mrn || patientDetails?.patientId || "MRN-Unknown"
    const phone = data?.phone_no || data?.patient?.phone || patientDetails?.phone || "N/A"

    const doctorName = data?.doctor_ids?.[0]?.name || "Dr. Rohan Mehta"
    const specialty = "General Medicine"

    const location = "OPD Block A, Room 101"

    // Date/Time - Use UTC to show exact booked time
    const dateObj = new Date(data?.time_slot_start || new Date())
    const dateStr = dateObj.toLocaleDateString('en-GB', { timeZone: 'UTC' })

    const timeStr = data?.time_slot_start && data?.time_slot_end
        ? `${new Date(data.time_slot_start).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} - ${new Date(data.time_slot_end).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}`
        : "10:00 - 10:15"

    return (
        <div className="flex flex-col items-center justify-center py-10 px-4 max-w-2xl mx-auto w-full">
            {/* Success Icon */}
            <div className="relative mb-6">
                <Image src="/images/tick.svg" alt="Success" width={80} height={80} className="w-20 h-20" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-500 mb-8 text-center">{subtitle}</p>

            {/* ID Badge */}
            <div className="bg-[#E6F3FF] rounded-xl py-3 px-12 mb-8 text-center min-w-[200px]">
                <div className="text-sm text-gray-500 font-medium mb-1">{idLabel}</div>
                <div className="text-2xl font-bold text-gray-900">{id}</div>
            </div>

            {/* Details Card */}
            <div className="bg-white rounded-2xl border border-[#E6F3FF] w-full overflow-hidden mb-8">
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
                        {isWalkIn ? "Appointment Details" : "Patient Details"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        {/* Patient Name */}
                        <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <div className="text-sm font-bold text-gray-900">Patient Name</div>
                                <div className="text-sm text-gray-500">{patientName}</div>
                                <div className="text-xs text-gray-400">{mrn}</div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <div className="text-sm font-bold text-gray-900">Phone</div>
                                <div className="text-sm text-gray-500">{phone}</div>
                            </div>
                        </div>

                        {/* Doctor */}
                        <div className="flex items-start gap-3">
                            <StethoscopeIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <div className="text-sm font-bold text-gray-900">{doctorName}</div>
                                <div className="text-sm text-gray-500">{specialty}</div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <div className="text-sm font-bold text-gray-900">Location</div>
                                <div className="text-sm text-gray-500">{location}</div>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <div className="text-sm font-bold text-gray-900">Date</div>
                                <div className="text-sm text-gray-500">{dateStr}</div>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <div className="text-sm font-bold text-gray-900">Time</div>
                                <div className="text-sm text-gray-500">{timeStr}</div>
                            </div>
                        </div>

                        {/* Token (Walk-in only) */}
                        {isWalkIn && (
                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 text-blue-500 mt-0.5" />
                                <div>
                                    <div className="text-sm font-bold text-gray-900">Token Assigned</div>
                                    <div className="text-sm text-gray-500">T-12</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Consultation Fee Box */}
                <div className="bg-[#E6F3FF] p-6 mx-4 mb-4 rounded-xl">
                    <div className="text-sm font-bold text-gray-900 mb-3">Consultation Fee</div>
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Consultation Fee:</span>
                        <span className="font-medium text-gray-900">200 AED</span>
                    </div>
                    <div className="flex justify-between text-md font-bold text-gray-900 mt-2">
                        <span>Total</span>
                        <span>200 AED</span>
                    </div>
                </div>
            </div>

            {/* Footer Instructions */}
            <div className="bg-[#E6F3FF] rounded-lg p-4 w-full text-xs text-gray-600 space-y-1">
                <p>• Please arrive 15 minutes before your appointment time</p>
                <p>• Bring your ID card and insurance documents</p>
                <p>• Bring any previous medical records or test results</p>
                <p>• Contact us if you need to reschedule or cancel</p>
            </div>
        </div>
    )
}

function StethoscopeIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
            <path d="M8 15v6" />
            <path d="M16 15v6" />
            <circle cx="12" cy="21" r="2" />
        </svg>
    )
}

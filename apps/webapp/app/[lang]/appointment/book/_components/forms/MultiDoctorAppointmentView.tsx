"use client"

import { useState, useEffect, useMemo } from "react"
// import { DoctorMultiSelect } from "../../../multi-doctor/_components/DoctorMultiSelect"
// import { MultiDoctorScheduleGrid } from "../../../multi-doctor/_components/MultiDoctorScheduleGrid"
import { AppDatePicker } from "@/components/common/app-date-picker"
import { MultiDoctorBookingModal } from "../../../multi-doctor/_components/MultiDoctorBookingModal"
import { createSlotsApiClient } from "@/lib/api/slots"
import { getAuthToken } from "@/app/utils/onboarding"
import type { Slot } from "@/lib/api/slots"
import axios from "axios"

interface MultiDoctorAppointmentViewProps {
    formData: any
    onFormDataChange: (data: any) => void
    onSlotSelect: (slot: string) => void
    selectedSlot?: string | null
}

interface DoctorOption {
    value: string
    label: string
}

export function MultiDoctorAppointmentView({
    formData,
    onFormDataChange,
    onSlotSelect,
    selectedSlot,
}: MultiDoctorAppointmentViewProps) {
    const [selectedDoctors, setSelectedDoctors] = useState<string[]>(
        Array.isArray(formData.doctors) ? formData.doctors : formData.doctor ? [formData.doctor] : []
    )
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        formData.date ? new Date(formData.date) : new Date()
    )
    const [slots, setSlots] = useState<Record<string, Slot[]>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [doctorOptions, setDoctorOptions] = useState<DoctorOption[]>([])

    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [bookingSlot, setBookingSlot] = useState<{ doctorId: string, time: string } | null>(null)

    // Mock appointments for the grid view (can be empty if we are just booking new)
    const [appointments, setAppointments] = useState<any[]>([])

    // Fetch doctors list
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const token = await getAuthToken()
                const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URI ?? ""
                const response = await axios.get(
                    `${baseUrl}/api/v1/doctor/users/soap-notes-creators`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: { page: 1, limit: 100 },
                    }
                )
                const options = response.data.data.map((d: any) => ({
                    value: String(d.id),
                    label: d.name,
                }))
                setDoctorOptions(options)
            } catch (error) {
                console.error("Failed to fetch doctors", error)
            }
        }
        fetchDoctors()
    }, [])

    // Sync state back to formData
    useEffect(() => {
        onFormDataChange({
            ...formData,
            doctors: selectedDoctors,
            // If single doctor field is needed for compatibility?
            doctor: selectedDoctors.length > 0 ? selectedDoctors[0] : "",
            date: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
        })
    }, [selectedDoctors, selectedDate])

    // Get selected doctor objects for the grid
    const selectedDoctorObjects = useMemo(() => {
        return selectedDoctors
            .map((id) => {
                const option = doctorOptions.find((d) => d.value === id)
                return option ? { id: option.value, name: option.label } : null
            })
            .filter(Boolean) as { id: string; name: string }[]
    }, [selectedDoctors, doctorOptions])

    // Fetch slots
    useEffect(() => {
        const fetchSlots = async () => {
            if (selectedDoctors.length === 0 || !selectedDate) {
                setSlots({})
                return
            }

            setIsLoading(true)
            try {
                const token = await getAuthToken()
                const slotsApiClient = createSlotsApiClient({ authToken: token })
                const isoDate = selectedDate.toISOString().split("T")[0]

                // Fetch slots for each doctor
                const slotsPromises = selectedDoctors.map(async (doctorId) => {
                    try {
                        const [morningResponse, eveningResponse] = await Promise.all([
                            slotsApiClient.getSlots({
                                doctorId,
                                startDate: isoDate,
                                endDate: isoDate,
                                slotVisitType: "multi_doctor_appointment",
                                shift: "Morning",
                                limit: 100,
                            }),
                            slotsApiClient.getSlots({
                                doctorId,
                                startDate: isoDate,
                                endDate: isoDate,
                                slotVisitType: "multi_doctor_appointment",
                                shift: "Evening",
                                limit: 100,
                            }),
                        ])
                        return {
                            doctorId,
                            slots: [...morningResponse.data.data, ...eveningResponse.data.data],
                        }
                    } catch (error) {
                        console.error(`Error fetching slots for doctor ${doctorId}`, error)
                        return { doctorId, slots: [] }
                    }
                })

                const results = await Promise.all(slotsPromises)
                const slotsMap: Record<string, Slot[]> = {}
                results.forEach(({ doctorId, slots }) => {
                    slotsMap[doctorId] = slots
                })
                setSlots(slotsMap)
            } catch (error) {
                console.error("Error fetching slots:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSlots()
    }, [selectedDoctors, selectedDate])

    const handleSlotClick = (doctorId: string, time: string) => {
        setBookingSlot({ doctorId, time })

        // Convert "02:00 PM" to "14:00" for parent selectedSlot
        const [h, m, p] = time.split(/[: ]/)
        // Handle undefined just in case (though fixed in grid)
        const hVal = h || "12"
        const pVal = p || "AM"

        let hNum = parseInt(hVal, 10)
        if (pVal === "PM" && hNum !== 12) hNum += 12
        else if (pVal === "AM" && hNum === 12) hNum = 0
        const time24 = `${hNum.toString().padStart(2, '0')}:${m || "00"}`
        const slotRange = `${time24}-${time24}`

        onSlotSelect(slotRange)
        setIsModalOpen(true)
    }

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* <DoctorMultiSelect
                        label="Doctors*"
                        placeholder="Select Doctors"
                        options={doctorOptions}
                        value={selectedDoctors}
                        onChange={setSelectedDoctors}
                    /> */}
                    <AppDatePicker
                        label="Date"
                        value={selectedDate}
                        onChange={setSelectedDate}
                        placeholder="Select Date"
                    />
                </div>
            </div>

            {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <MultiDoctorScheduleGrid
                    doctors={selectedDoctorObjects}
                    appointments={appointments}
                    slots={slots}
                    isLoading={isLoading}
                    onAddAppointment={handleSlotClick}
                    selectedSlot={selectedSlot}
                />
            </div>

            <MultiDoctorBookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedDoctors={selectedDoctors}
                doctorOptions={doctorOptions}
                selectedDate={selectedDate}
                selectedTime={bookingSlot?.time}
                onConfirm={() => {
                    console.log("Booking confirmed for", bookingSlot)
                    setIsModalOpen(false)
                }}
            />
        </div>
    )
}

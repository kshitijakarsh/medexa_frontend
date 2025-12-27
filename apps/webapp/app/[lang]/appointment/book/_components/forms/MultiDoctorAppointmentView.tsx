"use client"

import { useState, useEffect, useMemo } from "react"
// import { DoctorMultiSelect } from "../../../multi-doctor/_components/DoctorMultiSelect"
// import { MultiDoctorScheduleGrid } from "../../../multi-doctor/_components/MultiDoctorScheduleGrid"
import { AppDatePicker } from "@/components/common/app-date-picker"
import { createSlotsApiClient } from "@/lib/api/slots"
import { getAuthToken } from "@/app/utils/onboarding"
import type { Slot } from "@/lib/api/slots"
import axios from "axios"

interface MultiDoctorAppointmentViewProps {
    formData: any
    onFormDataChange: (data: any) => void
    onSlotSelect: (slot: string) => void
}

interface DoctorOption {
    value: string
    label: string
}

export function MultiDoctorAppointmentView({
    formData,
    onFormDataChange,
    onSlotSelect,
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

    // Mock appointments for the grid view (can be empty if we are just booking new)
    const [appointments, setAppointments] = useState<any[]>([])

    // Fetch doctors list (reusing logic or simplified)
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

    const handleSlotAdd = (doctorId: string, time: string) => {
        if (!time) return

        const parts = time.split(' ')
        if (parts.length < 2) return
        const [timePart, period] = parts

        if (!timePart) return

        let [hoursStr, minutesStr] = timePart.split(':')
        let hours = parseInt(hoursStr || "0", 10)
        let minutes = parseInt(minutesStr || "0", 10)

        if (period === 'PM' && hours !== 12) hours += 12
        if (period === 'AM' && hours === 12) hours = 0

        const startHour = hours
        const startMinute = minutes

        // Create Date objects to add duration easily
        const d = new Date()
        d.setHours(startHour, startMinute, 0, 0)
        const endTime = new Date(d.getTime() + 20 * 60000) // 20 mins

        const endHour = endTime.getHours()
        const endMinute = endTime.getMinutes()

        const fmt = (n: number) => n.toString().padStart(2, '0')
        const slotString = `${fmt(startHour)}:${fmt(startMinute)}-${fmt(endHour)}:${fmt(endMinute)}`

        onSlotSelect(slotString)
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
                    onAddAppointment={handleSlotAdd}
                />
            </div> */}
        </div>
    )
}

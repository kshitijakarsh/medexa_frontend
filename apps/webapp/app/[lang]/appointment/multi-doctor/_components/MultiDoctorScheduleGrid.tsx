"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AppointmentSlotCard } from "./AppointmentSlotCard"
import { cn } from "@workspace/ui/lib/utils"
import type { Slot } from "@/lib/api/slots"

interface Doctor {
  id: string
  name: string
}

interface Appointment {
  id: string
  slotId: string
  doctorId: string
  time: string
  patient: {
    name: string
    id?: string
    phone?: string
    reason?: string
  }
  status?: "confirmed" | "pending" | "waiting"
}

interface MultiDoctorScheduleGridProps {
  doctors: Doctor[]
  appointments: Appointment[]
  slots: Record<string, Slot[]>
  isLoading?: boolean
  onSlotClick?: (doctorId: string, slotId: string, time: string) => void
  onAddAppointment?: (doctorId: string, time: string) => void
  onCancelAppointment?: (appointmentId: string) => void
  onViewAppointment?: (appointmentId: string) => void
  onConfirmAppointment?: (appointmentId: string) => void
}

// Generate time slots for display
const generateTimeSlots = (): string[] => {
  const slots: string[] = []
  const startHour = 0
  const endHour = 24
  const slotDuration = 20 // minutes

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const period = hour >= 12 ? "PM" : "AM"
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
      const timeStr = `${displayHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`
      slots.push(timeStr)
    }
  }

  return slots.slice(0, 30) // Return first 30 slots
}

const timeSlots = generateTimeSlots()

export function MultiDoctorScheduleGrid({
  doctors,
  appointments,
  slots,
  isLoading = false,
  onSlotClick,
  onAddAppointment,
  onCancelAppointment,
  onViewAppointment,
  onConfirmAppointment,
}: MultiDoctorScheduleGridProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollStep = 300

  const handleScrollLeft = () => {
    setScrollPosition((prev) => Math.max(0, prev - scrollStep))
  }

  const handleScrollRight = () => {
    setScrollPosition((prev) => prev + scrollStep)
  }

  // Helper function to check if a time slot has an appointment
  const getAppointmentForSlot = (doctorId: string, time: string): Appointment | undefined => {
    return appointments.find(
      (apt) => apt.doctorId === doctorId && apt.time === time
    )
  }

  // Helper function to check if a time slot is available
  const isSlotAvailable = (doctorId: string, time: string): boolean => {
    const doctorSlots = slots[doctorId] || []
    return doctorSlots.some((slot) => {
      const slotTime = new Date(slot.startTime)
      const slotHour = slotTime.getHours()
      const slotMinute = slotTime.getMinutes()
      const [hour, minute, period] = time.split(/[: ]/) as [
        string,
        string,
        "AM" | "PM"
      ]
      let expectedHour = parseInt(hour)
      if (period === "PM" && expectedHour !== 12) {
        expectedHour += 12
      } else if (period === "AM" && expectedHour === 12) {
        expectedHour = 0
      }
      return (
        slotHour === expectedHour &&
        slotMinute === parseInt(minute)
      )
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading schedules...</div>
      </div>
    )
  }

  if (doctors.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Please select at least one doctor</div>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Header with Doctor Names and Navigation */}
      <div className="bg-[#0B84FF] text-white relative">
        <div className="flex items-center">
          {/* Left Arrow */}
          {scrollPosition > 0 && (
            <button
              onClick={handleScrollLeft}
              className="absolute left-0 top-0 bottom-0 px-2 bg-blue-700 hover:bg-blue-800 z-10 flex items-center"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Doctor Headers */}
          <div
            className="flex overflow-x-auto scrollbar-hide"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
              transition: "transform 0.3s ease",
            }}
          >
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="min-w-[250px] px-4 py-3 font-semibold text-sm border-r border-blue-600"
              >
                {doctor.name}
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleScrollRight}
            className="absolute right-0 top-0 bottom-0 px-2 bg-blue-700 hover:bg-blue-800 z-10 flex items-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="overflow-x-auto">
        <div
          className="flex gap-4 p-4"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            transition: "transform 0.3s ease",
          }}
        >
          {doctors.map((doctor) => (
            <div key={doctor.id} className="min-w-[250px] space-y-2">
              {timeSlots.map((timeSlot, idx) => {
                const appointment = getAppointmentForSlot(doctor.id, timeSlot)
                const isAvailable = isSlotAvailable(doctor.id, timeSlot)

                if (appointment) {
                  // Booked slot
                  return (
                    <AppointmentSlotCard
                      key={`${doctor.id}-${timeSlot}-${idx}`}
                      slotNumber={2}
                      time={timeSlot}
                      isBooked={true}
                      patientData={appointment.patient}
                      status={appointment.status}
                      onAdd={() => onAddAppointment?.(doctor.id, timeSlot)}
                      onCancel={() => onCancelAppointment?.(appointment.id)}
                      onView={() => onViewAppointment?.(appointment.id)}
                      onConfirm={() => onConfirmAppointment?.(appointment.id)}
                    />
                  )
                }

                if (isAvailable) {
                  // Available slot
                  return (
                    <AppointmentSlotCard
                      key={`${doctor.id}-${timeSlot}-${idx}`}
                      slotNumber={1}
                      time={timeSlot}
                      isBooked={false}
                      onAdd={() => onAddAppointment?.(doctor.id, timeSlot)}
                      onCancel={() => { }}
                    />
                  )
                }

                // Empty/unavailable slot
                return null
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


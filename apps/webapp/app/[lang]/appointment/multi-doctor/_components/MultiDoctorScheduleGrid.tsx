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
  onRescheduleAppointment?: (appointmentId: string, doctorId: string, time: string) => void
  selectedSlot?: string | null
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
  onRescheduleAppointment,
  selectedSlot,
}: MultiDoctorScheduleGridProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollStep = 250

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

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Header with Doctor Names and Navigation */}
      <div className="bg-[#001A4D] text-white relative rounded-t-lg">
        <div className="grid grid-cols-[40px_1fr_40px] items-center py-2">
          {/* Left Arrow */}
          <div className="flex justify-center">
            <button
              onClick={handleScrollLeft}
              className={`z-10 flex items-center justify-center text-green-500 hover:text-green-400 ${scrollPosition <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={scrollPosition <= 0}
            >
              <div className="rounded-full border border-green-500 p-1">
                <ChevronLeft className="h-4 w-4" />
              </div>
            </button>
          </div>

          {/* Doctor Headers Mask */}
          <div className="overflow-hidden min-w-0">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${scrollPosition}px)`,
              }}
            >
              {doctors.map((doctor, index) => (
                <div
                  key={doctor.id}
                  className="flex items-center min-w-[400px] w-[400px] justify-center relative flex-shrink-0"
                >
                  <div className="w-full px-4 py-2 font-semibold text-sm text-center truncate">
                    {doctor.name}
                  </div>
                  {/* Divider Line */}
                  {index < doctors.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-[1px] bg-white/30" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <div className="flex justify-center">
            <button
              onClick={handleScrollRight}
              className="z-10 flex items-center justify-center text-green-500 hover:text-green-400"
            >
              <div className="rounded-full border border-green-500 p-1">
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-[40px_1fr_40px] bg-transparent">
        {/* Left Spacer to match header arrow width */}
        <div />

        {/* Scrollable Content */}
        <div className="overflow-hidden min-w-0">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
            }}
          >
            {doctors.map((doctor) => (
              <div key={doctor.id} className="min-w-[400px] w-[400px] space-y-2 p-2 flex-shrink-0 border-r border-transparent">
                {timeSlots.map((timeSlot, idx) => {
                  const appointment = getAppointmentForSlot(doctor.id, timeSlot)
                  const isAvailable = isSlotAvailable(doctor.id, timeSlot)

                  if (appointment) {
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
                        onReschedule={() => onRescheduleAppointment?.(appointment.id, doctor.id, timeSlot)}
                      />
                    )
                  }

                  if (isAvailable) {
                    let isSelected = false
                    if (selectedSlot) {
                      const [selStart] = selectedSlot.split("-")
                      const [h = "0", m = "00", p = "AM"] = timeSlot.split(/[: ]/)
                      let hNum = parseInt(h)
                      if (p === "PM" && hNum !== 12) hNum += 12
                      else if (p === "AM" && hNum === 12) hNum = 0
                      const timeSlot24 = `${hNum.toString().padStart(2, '0')}:${m}`
                      isSelected = selStart === timeSlot24
                    }

                    return (
                      <AppointmentSlotCard
                        key={`${doctor.id}-${timeSlot}-${idx}`}
                        slotNumber={1}
                        time={timeSlot}
                        isBooked={false}
                        isSelected={isSelected}
                        onAdd={() => onAddAppointment?.(doctor.id, timeSlot)}
                        onCancel={() => { }}
                      />
                    )
                  }

                  return null
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Right Spacer */}
        <div />
      </div>
    </div>
  )
}


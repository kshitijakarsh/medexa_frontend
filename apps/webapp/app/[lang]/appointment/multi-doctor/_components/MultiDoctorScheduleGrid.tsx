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
  onAddAppointment?: (doctorId: string, time: string, slotId?: string) => void
  onCancelAppointment?: (appointmentId: string) => void
  onViewAppointment?: (appointmentId: string) => void
  onConfirmAppointment?: (appointmentId: string) => void
  onRescheduleAppointment?: (appointmentId: string, doctorId: string, time: string) => void
  selectedSlot?: string | null
}

// Helper function to format slot time
const formatSlotTime = (dateString: string): string => {
  const date = new Date(dateString)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const period = hours >= 12 ? "PM" : "AM"
  const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  return `${displayHour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`
}

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
  const doctorsPerView = 4 // Show 4 doctors at a time
  const doctorColumnWidth = 400 // Width of each doctor column
  const maxScrollPosition = Math.max(0, (doctors.length - doctorsPerView) * doctorColumnWidth)

  const handleScrollLeft = () => {
    setScrollPosition((prev) => Math.max(0, prev - doctorColumnWidth))
  }

  const handleScrollRight = () => {
    setScrollPosition((prev) => Math.min(maxScrollPosition, prev + doctorColumnWidth))
  }

  // Helper function to check if a time slot has an appointment for a specific slot
  const getAppointmentForSlot = (slotId: string): Appointment | undefined => {
    return appointments.find((apt) => apt.slotId === slotId)
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
              disabled={scrollPosition >= maxScrollPosition}
              className={`z-10 flex items-center justify-center text-green-500 hover:text-green-400 ${scrollPosition >= maxScrollPosition ? 'opacity-50 cursor-not-allowed' : ''}`}
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
            {doctors.map((doctor) => {
              const doctorSlots = slots[doctor.id] || []

              return (
                <div key={doctor.id} className="min-w-[400px] w-[400px] space-y-2 p-2 flex-shrink-0 border-r border-transparent">
                  {doctorSlots.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      No slots available
                    </div>
                  ) : (
                    doctorSlots.map((slot, idx) => {
                      const timeSlot = formatSlotTime(slot.startTime)
                      const appointment = getAppointmentForSlot(slot.id.toString())

                      if (appointment) {
                        console.log('Rendering booked card:', {
                          slotId: slot.id,
                          appointment,
                          patientData: appointment.patient
                        })

                        return (
                          <AppointmentSlotCard
                            key={`${doctor.id}-${slot.id}-${idx}`}
                            slotNumber={idx + 1}
                            time={timeSlot}
                            isBooked={true}
                            patientData={appointment.patient}
                            status={appointment.status}
                            onAdd={() => onAddAppointment?.(doctor.id, timeSlot, slot.id.toString())}
                            onCancel={() => onCancelAppointment?.(appointment.id)}
                            onView={() => onViewAppointment?.(appointment.id)}
                            onConfirm={() => onConfirmAppointment?.(appointment.id)}
                            onReschedule={() => onRescheduleAppointment?.(appointment.id, doctor.id, timeSlot)}
                          />
                        )
                      }

                      // Available slot (not booked)
                      let isSelected = false
                      if (selectedSlot) {
                        const slotTime24 = new Date(slot.startTime).toTimeString().slice(0, 5)
                        const [selStart] = selectedSlot.split("-")
                        isSelected = selStart === slotTime24
                      }

                      return (
                        <AppointmentSlotCard
                          key={`${doctor.id}-${slot.id}-${idx}`}
                          slotNumber={idx + 1}
                          time={timeSlot}
                          isBooked={false}
                          isSelected={isSelected}
                          onAdd={() => onAddAppointment?.(doctor.id, timeSlot, slot.id.toString())}
                          onCancel={() => { }}
                        />
                      )
                    })
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Spacer */}
        <div />
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/common/page-header"
import { AppDatePicker } from "@/components/common/app-date-picker"
import { DoctorMultiSelect } from "./_components/DoctorMultiSelect"
import { MultiDoctorScheduleGrid } from "./_components/MultiDoctorScheduleGrid"
import { createSlotsApiClient } from "@/lib/api/slots"
import { getAuthToken } from "@/app/utils/onboarding"
import type { Slot } from "@/lib/api/slots"
import { X } from "lucide-react"
import axios from "axios"

import { MultiDoctorBookingModal } from "./_components/MultiDoctorBookingModal"

interface DoctorOption {
  value: string
  label: string
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

interface Patient {
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

export default function MultiDoctorAppointmentPage() {
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [slots, setSlots] = useState<Record<string, any[]>>({})
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bookingSlot, setBookingSlot] = useState<{ doctorId: string, time: string } | null>(null)
  const [doctorOptions, setDoctorOptions] = useState<DoctorOption[]>([])

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

  // Get selected doctor objects
  const selectedDoctorObjects = useMemo(() => {
    return selectedDoctors
      .map((id) => {
        const option = doctorOptions.find((d) => d.value === id)
        return option ? { id: option.value, name: option.label } : null
      })
      .filter(Boolean) as { id: string; name: string }[]
  }, [selectedDoctors])

  // Fetch slots and appointments for selected doctors
  useEffect(() => {
    const fetchSlotsAndAppointments = async () => {
      if (selectedDoctors.length === 0 || !selectedDate) {
        setSlots({})
        setAppointments([])
        return
      }

      setIsLoading(true)

      try {
        const token = await getAuthToken()
        const slotsApiClient = createSlotsApiClient({ authToken: token })
        const isoDate = selectedDate.toISOString().split("T")[0]

        // Fetch slots with appointments for each doctor
        const slotsPromises = selectedDoctors.map(async (doctorId) => {
          try {
            const response = await slotsApiClient.getAllSlotsWithAppointments({
              doctorId,
              startDate: isoDate,
              endDate: isoDate,
              slotVisitType: "multi_doctor_appointment",
              limit: 100,
            })

            return {
              doctorId,
              slots: response.data.data,
            }
          } catch (error) {
            console.error(`Error fetching slots for doctor ${doctorId}:`, error)
            return { doctorId, slots: [] }
          }
        })

        const results = await Promise.all(slotsPromises)

        // Separate slots and appointments
        const slotsMap: Record<string, any[]> = {}
        const allAppointments: Appointment[] = []

        results.forEach(({ doctorId, slots: slotsData }) => {
          // Store raw slots for the grid
          slotsMap[doctorId] = slotsData

          // Extract appointments from booked slots
          slotsData.forEach((slot: any) => {
            if (slot.isBooked && slot.appointment) {
              const apt = slot.appointment
              const patient = apt.patient

              allAppointments.push({
                id: apt.id,
                slotId: slot.id,
                doctorId: String(slot.doctorId),
                time: new Date(slot.startTime).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }),
                patient: {
                  name: `${patient.first_name} ${patient.last_name}`.trim(),
                  id: patient.civil_id || patient.id,
                  phone: patient.mobile_number,
                  reason: apt.visitPurposes?.[0]?.description || "",
                },
                status: apt.status === "active" ? "confirmed" : "pending",
              })
            }
          })
        })

        setSlots(slotsMap)
        setAppointments(allAppointments)
      } catch (error) {
        console.error("Error fetching slots and appointments:", error)
        setSlots({})
        setAppointments([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSlotsAndAppointments()
  }, [selectedDoctors, selectedDate])

  const handleAddAppointment = (doctorId: string, time: string) => {
    setBookingSlot({ doctorId, time })
    setIsModalOpen(true)
  }

  const handleCancelAppointment = (appointmentId: string) => {
    // TODO: Implement cancel appointment
    console.log("Cancel appointment:", appointmentId)
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId))
  }

  const handleViewAppointment = (appointmentId: string) => {
    // TODO: Open view appointment dialog/modal
    console.log("View appointment:", appointmentId)
  }

  const handleConfirmAppointment = (appointmentId: string) => {
    // TODO: Implement confirm appointment
    console.log("Confirm appointment:", appointmentId)
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "confirmed" as const } : apt
      )
    )
  }

  const handleRescheduleAppointment = (appointmentId: string, doctorId: string, time: string) => {
    setBookingSlot({ doctorId, time })
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-2 py-6 space-y-6 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen overflow-x-hidden">
        {/* Filter Section */}
        <div className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DoctorMultiSelect
              label="Doctor*"
              placeholder="Select Doctor"
              options={doctorOptions}
              value={selectedDoctors}
              onChange={setSelectedDoctors}
              hideTags={true}
            />
            <AppDatePicker
              label="Date"
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="Select Date"
            />
          </div>
        </div>

        {/* Selected Doctors List (Full Width) */}
        {selectedDoctorObjects.length > 0 && (
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none w-full">
            {selectedDoctorObjects.map((doctor) => (
              <div
                key={doctor.id}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-bold shadow-sm border border-transparent whitespace-nowrap min-w-max"
              >
                <span>{doctor.name}</span>
                <button
                  type="button"
                  onClick={() => setSelectedDoctors(prev => prev.filter(id => id !== doctor.id))}
                  className="bg-[#FCA5A5] hover:bg-red-400 text-white rounded-full p-1 transition-colors flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Schedule Grid */}
        <MultiDoctorScheduleGrid
          doctors={selectedDoctorObjects}
          appointments={appointments}
          slots={slots}
          isLoading={isLoading}
          onAddAppointment={handleAddAppointment}
          onCancelAppointment={handleCancelAppointment}
          onViewAppointment={handleViewAppointment}
          onConfirmAppointment={handleConfirmAppointment}
          onRescheduleAppointment={handleRescheduleAppointment}
        />
      </div>

      <MultiDoctorBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDoctors={selectedDoctors}
        doctorOptions={doctorOptions}
        selectedDate={selectedDate}
        selectedTime={bookingSlot?.time}
        onConfirm={(patient: Patient | null, visitingPurpose: string) => {
          console.log("Booking confirmed for", bookingSlot, patient, visitingPurpose)
          setIsModalOpen(false)
        }}
      />
    </main>
  )
}


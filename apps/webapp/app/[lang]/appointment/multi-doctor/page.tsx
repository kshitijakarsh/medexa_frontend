"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/common/page-header"
import { AppDatePicker } from "@/components/common/app-date-picker"
import { DoctorMultiSelect } from "./_components/DoctorMultiSelect"
import { MultiDoctorScheduleGrid } from "./_components/MultiDoctorScheduleGrid"
import { createSlotsApiClient } from "@/lib/api/slots"
import type { Slot } from "@/lib/api/slots"

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

export default function MultiDoctorAppointmentPage() {
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [slots, setSlots] = useState<Record<string, Slot[]>>({})
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock doctors list - replace with API call when available
  const doctorOptions: DoctorOption[] = [
    { value: "doctor-1", label: "Dr. Kiran Madhav" },
    { value: "doctor-2", label: "Dr. Milan Joshy" },
    { value: "doctor-3", label: "Dr. Famil T" },
    { value: "doctor-4", label: "Dr. Michael Chen" },
    { value: "doctor-5", label: "Dr. Rohan Mehta" },
    { value: "doctor-6", label: "Dr. Sarah Johnson" },
  ]

  // Get selected doctor objects
  const selectedDoctorObjects = useMemo(() => {
    return selectedDoctors
      .map((id) => {
        const option = doctorOptions.find((d) => d.value === id)
        return option ? { id: option.value, name: option.label } : null
      })
      .filter(Boolean) as { id: string; name: string }[]
  }, [selectedDoctors])

  const slotsApiClient = createSlotsApiClient({})

  // Fetch slots for selected doctors
  useEffect(() => {
    const fetchSlots = async () => {
      if (selectedDoctors.length === 0 || !selectedDate) {
        setSlots({})
        return
      }

      setIsLoading(true)

      try {
        const isoDate = selectedDate.toISOString().split("T")[0]

        // Fetch slots for each doctor (both Morning and Evening shifts)
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
            console.error(`Error fetching slots for doctor ${doctorId}:`, error)
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
        setSlots({})
      } finally {
        setIsLoading(false)
      }
    }

    fetchSlots()
  }, [selectedDoctors, selectedDate])

  // Mock appointments data - replace with API call when available
  useEffect(() => {
    // Simulate fetching appointments
    const mockAppointments: Appointment[] = [
      {
        id: "apt-1",
        slotId: "slot-1",
        doctorId: "doctor-1",
        time: "12:00 AM",
        patient: {
          name: "Vinay",
          id: "4568 5568 5658",
          phone: "95554 59856",
          reason: "Stomach discomfort for 2 weeks",
        },
        status: "pending",
      },
      {
        id: "apt-2",
        slotId: "slot-2",
        doctorId: "doctor-2",
        time: "12:00 AM",
        patient: {
          name: "Vinay",
          id: "4568 5568 5658",
          phone: "95554 59856",
          reason: "Stomach discomfort for 2 weeks",
        },
        status: "pending",
      },
    ]

    // Filter appointments for selected doctors
    const filteredAppointments = mockAppointments.filter((apt) =>
      selectedDoctors.includes(apt.doctorId)
    )

    setAppointments(filteredAppointments)
  }, [selectedDoctors])

  const handleAddAppointment = (doctorId: string, time: string) => {
    // TODO: Open add appointment dialog/modal
    console.log("Add appointment:", { doctorId, time })
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

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-2 py-6 space-y-6 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
        <PageHeader title="Multi Doctor Appointment Schedule" />

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DoctorMultiSelect
              label="Doctor*"
              placeholder="Select Doctor"
              options={doctorOptions}
              value={selectedDoctors}
              onChange={setSelectedDoctors}
            />
            <AppDatePicker
              label="Date"
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="Select Date"
            />
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <MultiDoctorScheduleGrid
            doctors={selectedDoctorObjects}
            appointments={appointments}
            slots={slots}
            isLoading={isLoading}
            onAddAppointment={handleAddAppointment}
            onCancelAppointment={handleCancelAppointment}
            onViewAppointment={handleViewAppointment}
            onConfirmAppointment={handleConfirmAppointment}
          />
        </div>
      </div>
    </main>
  )
}


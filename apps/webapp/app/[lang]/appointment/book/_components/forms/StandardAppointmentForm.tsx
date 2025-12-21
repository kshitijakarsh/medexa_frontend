"use client"

import { useState, useEffect } from "react"
import { FormSelect } from "@/components/ui/form-select"
import { FormDate } from "@/components/ui/form-date"
import { FormInput } from "@/components/ui/form-input"
import { AvailableSlotGrid } from "../AvailableSlotGrid"
import { SearchableSelect } from "../SearchableSelect"
import { getAuthToken } from "@/app/utils/onboarding"
import { createDepartmentApiClient } from "@/lib/api/administration/department"
import { createSlotsApiClient } from "@/lib/api/slots"
import axios from "axios"

interface StandardAppointmentFormProps {
  initialPatientVisitType?: "appointment" | "walk_in"
  onPatientVisitTypeChange?: (type: "appointment" | "walk_in") => void
  selectedSlot: string | null
  onSlotSelect: (slot: string) => void
  onFormDataChange?: (formData: any) => void
}

export function StandardAppointmentForm({
  initialPatientVisitType = "appointment",
  onPatientVisitTypeChange,
  selectedSlot,
  onSlotSelect,
  onFormDataChange,
}: StandardAppointmentFormProps) {
  // Get today's date in YYYY-MM-DD format for min date restriction
  const today = new Date().toISOString().split("T")[0]

  const [formData, setFormData] = useState({
    patientVisitType: initialPatientVisitType,
    visitPurpose: "doctor_consultation",
    department: "",
    doctor: "",
    nurse: "",
    date: "",
    shift: "",
    visitingPurpose: "",
  })

  const [departments, setDepartments] = useState<
    { value: string; label: string }[]
  >([])
  const [loadingDepartments, setLoadingDepartments] = useState(false)
  const [doctors, setDoctors] = useState<{ value: string; label: string }[]>(
    []
  )
  const [loadingDoctors, setLoadingDoctors] = useState(false)
  const [nurses, setNurses] = useState<{ value: string; label: string }[]>([])
  const [loadingNurses, setLoadingNurses] = useState(false)
  const [slots, setSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  // Update patient visit type when prop changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      patientVisitType: initialPatientVisitType,
    }))
  }, [initialPatientVisitType])

  // Notify parent of form data changes
  useEffect(() => {
    onFormDataChange?.(formData)
  }, [formData, onFormDataChange])

  // Fetch departments from API
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoadingDepartments(true)
      try {
        const token = await getAuthToken()
        const client = createDepartmentApiClient({ authToken: token })
        const response = await client.getDepartments({
          status: "active",
          limit: 100,
          offset: 0,
        })

        const departmentOptions = response.data.data.map((dept) => ({
          value: dept.id,
          label: dept.department_name,
        }))
        setDepartments(departmentOptions)
      } catch (error) {
        console.error("Failed to fetch departments:", error)
        setDepartments([])
      } finally {
        setLoadingDepartments(false)
      }
    }

    fetchDepartments()
  }, [])

  // Fetch doctors from API
  const fetchDoctors = async (search: string = "") => {
    setLoadingDoctors(true)
    try {
      const token = await getAuthToken()
      const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URI ?? ""
      const params: any = {
        page: 1,
        limit: 100,
      }
      if (search.trim()) {
        params.search = search.trim()
      }

      const response = await axios.get(
        `${baseUrl}/api/v1/doctor/users/soap-notes-creators`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params,
        }
      )

      const doctorOptions = response.data.data.map((doctor: any) => ({
        value: String(doctor.id),
        label: doctor.name,
      }))
      setDoctors(doctorOptions)
    } catch (error) {
      console.error("Failed to fetch doctors:", error)
      setDoctors([])
    } finally {
      setLoadingDoctors(false)
    }
  }

  // Fetch nurses from API
  const fetchNurses = async (search: string = "") => {
    setLoadingNurses(true)
    try {
      const token = await getAuthToken()
      const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URI ?? ""
      const params: any = {
        page: 1,
        limit: 100,
      }
      if (search.trim()) {
        params.search = search.trim()
      }

      const response = await axios.get(
        `${baseUrl}/api/v1/nurse/users/consumables-creators`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params,
        }
      )

      const nurseOptions = response.data.data.map((nurse: any) => ({
        value: String(nurse.id),
        label: nurse.name,
      }))
      setNurses(nurseOptions)
    } catch (error) {
      console.error("Failed to fetch nurses:", error)
      setNurses([])
    } finally {
      setLoadingNurses(false)
    }
  }

  // Initial fetch for doctors and nurses
  useEffect(() => {
    fetchDoctors()
    fetchNurses()
  }, [])

  // Fetch slots when doctor and date are selected
  useEffect(() => {
    const fetchSlots = async () => {
      // Only fetch if both doctor and date are selected
      if (!formData.doctor || !formData.date) {
        setSlots([])
        return
      }

      setLoadingSlots(true)
      try {
        const token = await getAuthToken()
        const client = createSlotsApiClient({ authToken: token })

        // Format date to YYYY-MM-DD for API
        const selectedDate = formData.date

        const params: any = {
          page: 1,
          limit: 100,
          doctorId: formData.doctor,
          startDate: selectedDate,
          endDate: selectedDate,
        }

        // Add shift filter if selected
        if (formData.shift) {
          // Map shift values to API format (capitalize first letter)
          const shiftMap: Record<string, string> = {
            morning: "Morning",
            afternoon: "Afternoon",
            evening: "Evening",
            night: "Night",
          }
          params.shift = shiftMap[formData.shift] || formData.shift
        }

        // Add slot visit type based on visit purpose
        if (formData.visitPurpose) {
          params.slotVisitType = formData.visitPurpose
        }

        const response = await client.getSlots(params)

        // Transform API response to slot format (HH:MM-HH:MM)
        const formattedSlots = response.data.data.map((slot) => {
          // Extract time from ISO string (format: YYYY-MM-DDTHH:MM:SS.sssZ)
          const startTimeStr = slot.startTime
          const endTimeStr = slot.endTime

          // Parse ISO string and get local time
          const startTime = new Date(startTimeStr)
          const endTime = new Date(endTimeStr)

          const startHours = startTime.getHours().toString().padStart(2, "0")
          const startMinutes = startTime.getMinutes().toString().padStart(2, "0")
          const endHours = endTime.getHours().toString().padStart(2, "0")
          const endMinutes = endTime.getMinutes().toString().padStart(2, "0")

          return `${startHours}:${startMinutes}-${endHours}:${endMinutes}`
        })

        setSlots(formattedSlots)
      } catch (error) {
        console.error("Failed to fetch slots:", error)
        setSlots([])
      } finally {
        setLoadingSlots(false)
      }
    }

    fetchSlots()
  }, [formData.doctor, formData.date, formData.shift, formData.visitPurpose])

  const shifts = [
    { value: "morning", label: "Morning" },
    { value: "afternoon", label: "Afternoon" },
    { value: "evening", label: "Evening" },
    { value: "night", label: "Night" },
  ]

  // Patient visit type enum
  const patientVisitTypes = [
    { value: "appointment", label: "Appointment" },
    { value: "walk_in", label: "Walk-In" },
  ]

  // Visit purpose / service type enum options
  const visitPurposeOptions = [
    { value: "doctor_consultation", label: "Doctor Consultation" },
    { value: "follow_up", label: "Follow-Up Visit" },
    { value: "procedure_appointment", label: "Procedure Appointment" },
    { value: "teleconsultation", label: "Teleconsultation" },
    { value: "home_visit", label: "Home Visit" },
    { value: "multi_doctor_appointment", label: "Multi Doctor Appointment" },
    { value: "multi_procedure", label: "Multi Procedure Appointment" },
  ]

  return (
    <div className="space-y-6">
      {/* Top row: Patient Visit Type & Visit Purpose / Service Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          label="Patient Visit Type"
          required
          value={formData.patientVisitType}
          onValueChange={(value) => {
            const newType = value as "appointment" | "walk_in"
            setFormData({ ...formData, patientVisitType: newType })
            onPatientVisitTypeChange?.(newType)
          }}
          placeholder="Select Patient Visit Type"
          options={patientVisitTypes}
        />
        <FormSelect
          label="Visit Purpose / Service Type"
          required
          value={formData.visitPurpose}
          onValueChange={(value) =>
            setFormData({ ...formData, visitPurpose: value })
          }
          placeholder="Select Visit Purpose"
          options={visitPurposeOptions}
        />
      </div>

      {/* Second row: Department, Doctor, Date, Shift */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <FormSelect
          label="Department"
          required
          value={formData.department}
          onValueChange={(value) =>
            setFormData({ ...formData, department: value })
          }
          placeholder={
            loadingDepartments ? "Loading departments..." : "Select Department"
          }
          options={departments}
          disabled={loadingDepartments}
        /> */}
        <SearchableSelect
          label="Doctor"
          required
          value={formData.doctor}
          onChange={(value) => setFormData({ ...formData, doctor: value })}
          placeholder="Select Doctor"
          options={doctors}
          loading={loadingDoctors}
          onSearch={fetchDoctors}
        />
        <SearchableSelect
          label="Nurse"
          value={formData.nurse}
          onChange={(value) => setFormData({ ...formData, nurse: value })}
          placeholder="Select Nurse"
          options={nurses}
          loading={loadingNurses}
          onSearch={fetchNurses}
        />
        <FormDate
          label="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          placeholder="Select Date"
          min={today}
        />
        <FormSelect
          label="Shift"
          value={formData.shift}
          onValueChange={(value) =>
            setFormData({ ...formData, shift: value })
          }
          placeholder="Select Shift"
          options={shifts}
        />
      </div>

      {/* Available Slots - Only show when both doctor and date are selected */}
      {formData.doctor && formData.date && (
        <AvailableSlotGrid
          slots={slots}
          selectedSlot={selectedSlot}
          onSlotSelect={onSlotSelect}
        />
      )}

      {/* Visiting Purpose */}
      <FormInput
        label="Visiting Purpose"
        value={formData.visitingPurpose}
        onChange={(e) =>
          setFormData({ ...formData, visitingPurpose: e.target.value })
        }
        placeholder="Enter visiting purpose"
      />
    </div>
  )
}


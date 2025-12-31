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
import { MultiDoctorAppointmentView } from "./MultiDoctorAppointmentView"

interface StandardAppointmentFormProps {
  initialPatientVisitType?: "appointment" | "walk_in"
  initialVisitPurpose?: string
  onPatientVisitTypeChange?: (type: "appointment" | "walk_in") => void
  selectedSlot: string | null
  onSlotSelect: (slot: string) => void
  onFormDataChange?: (formData: any) => void
}

export function StandardAppointmentForm({
  initialPatientVisitType = "appointment",
  initialVisitPurpose = "doctor_consultation",
  onPatientVisitTypeChange,
  selectedSlot,
  onSlotSelect,
  onFormDataChange,
}: StandardAppointmentFormProps) {
  // Get today's date in YYYY-MM-DD format for min date restriction
  const today = new Date().toISOString().split("T")[0] || ""

  interface AppointmentFormData {
    patientVisitType: "appointment" | "walk_in"
    visitPurpose: string
    department: string
    doctor: string
    nurse: string
    date: string
    shift: string
    visitingPurpose: string
    procedureCategory?: string
    procedureType?: string
    machine?: string
    duration?: string
    communicationMode?: string
  }

  const [formData, setFormData] = useState<AppointmentFormData>({
    patientVisitType: initialPatientVisitType,
    visitPurpose: initialVisitPurpose,
    department: "",
    doctor: "",
    nurse: "",
    date: "",
    shift: "",
    visitingPurpose: "",
    procedureCategory: "",
    procedureType: "",
    machine: "",
    duration: "",
    communicationMode: "",
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
      visitPurpose: initialVisitPurpose
    }))
  }, [initialPatientVisitType, initialVisitPurpose])

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

  // Auto-set date to today for Walk-In
  useEffect(() => {
    if (formData.patientVisitType === "walk_in" && formData.date !== today) {
      setFormData((prev) => ({ ...prev, date: today }))
    }
  }, [formData.patientVisitType, today, formData.date])

  const shifts = [
    { value: "morning", label: "Morning" },
    { value: "afternoon", label: "Afternoon" },
    { value: "evening", label: "Evening" },
    { value: "night", label: "Night" },
  ]

  const patientVisitTypes = [
    { value: "appointment", label: "Appointment" },
    { value: "walk_in", label: "Walk-In" },
  ]

  const visitPurposeOptions = [
    { value: "doctor_consultation", label: "Doctor Consultation" },
    { value: "follow_up", label: "Follow-Up Visit" },
    { value: "procedure_appointment", label: "Procedure Appointment" },
    { value: "teleconsultation", label: "Teleconsultation" },
    { value: "home_visit", label: "Home Visit" },
    { value: "multi_doctor_appointment", label: "Multi Doctor Appointment" },
    { value: "multi_procedure", label: "Multi Procedure Appointment" },
  ]

  // Mock data for procedure fields
  const procedureCategories = [
    { value: "general_medicine", label: "General Medicine" },
    { value: "cardiology", label: "Cardiology" },
    { value: "orthopedics", label: "Orthopedics" },
  ]

  const procedureTypes = [
    { value: "mri", label: "MRI Scan" },
    { value: "xray", label: "X-Ray" },
    { value: "blood_test", label: "Blood Test" },
    { value: "physio", label: "Physiotherapy Session" },
  ]

  const machines = [
    { value: "room_101", label: "Room 101" },
    { value: "room_102", label: "Room 102" },
    { value: "mri_machine_1", label: "MRI Machine 1" },
  ]

  const durations = [
    { value: "15", label: "15 mins" },
    { value: "20", label: "20 mins" },
    { value: "30", label: "30 mins" },
    { value: "45", label: "45 mins" },
  ]

  // Check for Multi Doctor redirection
  const isMultiDoctor = formData.visitPurpose === "multi_doctor_appointment"

  useEffect(() => {
    if (isMultiDoctor) {
      // Redirect to the dedicated multi-doctor page
      // Assuming existing route structure based on file path: /appointment/multi-doctor
      // We might need to handle language parameter [lang]
      const currentPath = window.location.pathname
      // quick hack to preserve lang if present at start
      const langMatch = currentPath.match(/^\/([a-z]{2})\//)
      const langPrefix = langMatch ? `/${langMatch[1]}` : ''
      window.location.href = `${langPrefix}/appointment/multi-doctor`
    }
  }, [isMultiDoctor])

  /*
  // Old Multi Doctor View Logic - REMOVED/COMMENTED OUT to enforce separate route
  const isMultiDoctorView = false // formData.visitPurpose === "multi_doctor_appointment"
  */

  const isProcedure =
    formData.visitPurpose === "procedure_appointment" ||
    formData.visitPurpose === "multi_procedure"

  const isTeleconsultation = formData.visitPurpose === "teleconsultation"
  // The original `isMultiDoctor` definition is now replaced by the one above the useEffect.

  const communicationModes = [
    { value: "video", label: "Video Call" },
    { value: "phone", label: "Phone Call" },
    { value: "chat", label: "Chat" },
  ]

  const getThemeColorClass = (value: string) => {
    if (value === "appointment" || value === "doctor_consultation")
      return "text-green-600"
    if (value === "follow_up" || value === "walk_in") return "text-orange-500"
    if (
      [
        "procedure_appointment",
        "teleconsultation",
        "multi_procedure",
        "general_medicine",
        "cardiology",
      ].includes(value)
    )
      return "text-blue-600"
    return "text-gray-700"
  }

  return (
    <div className="space-y-6">
      {/* Row 1: Patient Visit Type & Visit Purpose */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          label="Patient Visit Type"
          value={formData.patientVisitType}
          onValueChange={(value) => {
            const newType = value as "appointment" | "walk_in"
            setFormData({ ...formData, patientVisitType: newType })
            onPatientVisitTypeChange?.(newType)
          }}
          placeholder="Select Patient Visit Type"
          options={patientVisitTypes}
          triggerClassName={getThemeColorClass(formData.patientVisitType)}
        />
        <FormSelect
          label={formData.patientVisitType === "walk_in" ? "Visit Type" : "Visit Purpose / Service Type"}
          value={formData.visitPurpose}
          onValueChange={(value) =>
            setFormData({ ...formData, visitPurpose: value })
          }
          placeholder="Select Visit Purpose"
          options={visitPurposeOptions}
          triggerClassName={getThemeColorClass(formData.visitPurpose)}
        />
      </div>

      {isProcedure ? (
        // Procedure Form Layout
        <>
          {/* Row 2: Category & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Procedure Category"
              value={formData.procedureCategory || ""}
              onValueChange={(value) => setFormData({ ...formData, procedureCategory: value })}
              placeholder="Select Procedure Category"
              options={procedureCategories}
            />
            <FormSelect
              label="Procedure Type"
              required
              value={formData.procedureType || ""}
              onValueChange={(value) => setFormData({ ...formData, procedureType: value })}
              placeholder="Select Procedure Type"
              options={procedureTypes}
            />
          </div>

          {/* Row 3: Machine & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Machine / Room"
              value={formData.machine || ""}
              onValueChange={(value) => setFormData({ ...formData, machine: value })}
              placeholder="Select Room"
              options={machines}
            />
            <FormSelect
              label="Duration"
              value={formData.duration || ""}
              onValueChange={(value) => setFormData({ ...formData, duration: value })}
              placeholder="Select Duration"
              options={durations}
            />
          </div>

          {/* Row 4: Date & Nurse */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormDate
              label="Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="Select Date"
              min={today}
              disabled={formData.patientVisitType === "walk_in"}
              className={formData.patientVisitType === "walk_in" ? "bg-blue-50 border-gray-300 text-gray-500" : "border-gray-300"}
              iconClassName={
                formData.patientVisitType === "walk_in"
                  ? "text-green-600"
                  : getThemeColorClass(formData.visitPurpose)
              }
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
          </div>

          {/* Preparation Instructions */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Preparation Instructions</label>
            <div className="bg-blue-50 text-gray-600 p-3 rounded-md text-sm">
              Patient must remove all metal objects. 6 hours fasting recommended if contrast MRI.
            </div>
          </div>
        </>
      ) : isTeleconsultation ? (
        // Teleconsultation Layout
        <>
          {/* Row 2: Department & Doctor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
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
            />
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
          </div>

          {/* Row 3: Communication Mode & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Communication Mode"
              value={formData.communicationMode || ""}
              onValueChange={(value) => setFormData({ ...formData, communicationMode: value })}
              placeholder="Select Communication Mode"
              options={communicationModes}
            />
            <FormDate
              label="Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="Select Date"
              min={today}
              disabled={formData.patientVisitType === "walk_in"}
              className={formData.patientVisitType === "walk_in" ? "bg-blue-50 border-gray-300 text-gray-500" : "border-gray-300"}
              iconClassName={getThemeColorClass(formData.visitPurpose)}
            />
          </div>

          {/* Row 4: Nurse */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchableSelect
              label="Nurse"
              value={formData.nurse}
              onChange={(value) => setFormData({ ...formData, nurse: value })}
              placeholder="Select Nurse"
              options={nurses}
              loading={loadingNurses}
              onSearch={fetchNurses}
            />
          </div>
        </>
      ) : (
        // Standard Consultation / Follow-up Layout
        <>
          {/* Row 2: Department & Doctor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
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
            />
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
          </div>

          {/* Row 3: Date & Shift */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormDate
              label="Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="Select Date"
              min={today}
              disabled={formData.patientVisitType === "walk_in"}
              className={formData.patientVisitType === "walk_in" ? "bg-blue-50 border-gray-300 text-gray-500" : "border-gray-300"}
              iconClassName={getThemeColorClass(formData.visitPurpose)}
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

          {/* Row 4: Nurse */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchableSelect
              label="Nurse"
              value={formData.nurse}
              onChange={(value) => setFormData({ ...formData, nurse: value })}
              placeholder="Select Nurse"
              options={nurses}
              loading={loadingNurses}
              onSearch={fetchNurses}
            />
          </div>
        </>
      )}

      {/* Available Slots - Only show when relevant fields are selected and NOT multi-doctor (multi-doctor has its own grid embedded) */}
      {(formData.date && (isProcedure ? true : isMultiDoctor ? false : formData.doctor)) && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <AvailableSlotGrid
            slots={slots}
            selectedSlot={selectedSlot}
            onSlotSelect={onSlotSelect}
          />
        </div>
      )}

      {/* Visiting Purpose Input */}
      <FormInput
        label="Visiting Purpose"
        value={formData.visitingPurpose}
        className="border-gray-300"
        onChange={(e) =>
          setFormData({ ...formData, visitingPurpose: e.target.value })
        }
        placeholder="Enter visiting purpose"
      />
    </div>
  )
}


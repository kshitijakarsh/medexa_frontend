"use client"

import { useState, useEffect } from "react"
import { FormSelect } from "@/components/ui/form-select"
import { FormDate } from "@/components/ui/form-date"
import { FormInput } from "@/components/ui/form-input"
import { AvailableSlotGrid } from "../AvailableSlotGrid"
import { SearchableSelect } from "../SearchableSelect"
import { getAuthToken } from "@/app/utils/onboarding"
import { createDepartmentApiClient } from "@/lib/api/administration/department"
import axios from "axios"

interface WalkinAppointmentFormProps {
  initialPatientVisitType?: "appointment" | "walk_in"
  onPatientVisitTypeChange?: (type: "appointment" | "walk_in") => void
  selectedSlot: string | null
  onSlotSelect: (slot: string) => void
}

export function WalkinAppointmentForm({
  initialPatientVisitType = "walk_in",
  onPatientVisitTypeChange,
  selectedSlot,
  onSlotSelect,
}: WalkinAppointmentFormProps) {
  // Get today's date in YYYY-MM-DD format for min date restriction
  const today = new Date().toISOString().split("T")[0]

  const [formData, setFormData] = useState({
    patientVisitType: initialPatientVisitType,
    visitPurpose: "doctor_consultation",
    department: "",
    doctor: "",
    nurse: "",
    date: "",
    priority: "",
    startTime: "",
    endTime: "",
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

  // Update patient visit type when prop changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      patientVisitType: initialPatientVisitType,
    }))
  }, [initialPatientVisitType])

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

  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ]

  const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = Math.floor(i / 2)
    const minute = i % 2 === 0 ? "00" : "30"
    const period = hour >= 12 ? "PM" : "AM"
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    const value = `${displayHour.toString().padStart(2, "0")}:${minute} ${period}`
    return { value, label: value }
  })

  const formatDuration = () => {
    if (formData.startTime && formData.endTime) {
      return `${formData.startTime} - ${formData.endTime}`
    }
    return ""
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <FormSelect
          label="Department"
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
          label="Priority"
          value={formData.priority}
          onValueChange={(value) =>
            setFormData({ ...formData, priority: value })
          }
          placeholder="Select Priority"
          options={priorities}
        />
        <div className="md:col-span-2">
          <label className="text-sm font-medium mb-2 block">
            Duration <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Start Time"
              value={formData.startTime}
              onValueChange={(value) =>
                setFormData({ ...formData, startTime: value })
              }
              placeholder="Select Start Time"
              options={timeOptions}
            />
            <FormSelect
              label="End Time"
              value={formData.endTime}
              onValueChange={(value) =>
                setFormData({ ...formData, endTime: value })
              }
              placeholder="Select End Time"
              options={timeOptions}
            />
          </div>
          {formData.startTime && formData.endTime && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm font-medium text-gray-700">
                Duration: {formatDuration()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Available Slots */}
      <AvailableSlotGrid
        slots={[]}
        selectedSlot={selectedSlot}
        onSlotSelect={onSlotSelect}
      />

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


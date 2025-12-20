"use client"

import { useState, useEffect } from "react"
import SearchInput from "@/components/common/search-input"
import { Button } from "@workspace/ui/components/button"
import { UserPlus, List } from "lucide-react"
import { PatientDetailsCard } from "./PatientDetailsCard"
import { useRouter, useParams } from "next/navigation"
import {
  PatientItem,
  createPatientsApiClient,
} from "@/lib/api/patients-api"

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

interface PatientSearchPanelProps {
  selectedPatient: Patient | null
  onPatientSelect: (patient: Patient | null) => void
  patientVisitType?: string
  emergencyType?: "existing" | "unknown"
  onEmergencyTypeChange?: (type: "existing" | "unknown") => void
}

function mapBackendPatient(p: PatientItem): Patient {
  return {
    id: String(p.id),
    name: `${p.first_name || ""} ${p.last_name || ""}`.trim(),
    patientId: `PAT-${p.id}`,
    cprNid: p.civil_id || "",
    dateOfBirth: p.dob || "",
    gender: p.gender || "",
    bloodGroup: p.blood_group || "",
    maritalStatus: p.marital_status || "",
    nationality: p.country?.name_en || "",
    phone: p.mobile_number || "",
    email: p.email || "",
    address: p.permanent_address || "",
    avatar: p.photo_url || undefined,
  }
}

export function PatientSearchPanel({
  selectedPatient,
  onPatientSelect,
  patientVisitType,
  emergencyType,
  onEmergencyTypeChange,
}: PatientSearchPanelProps) {
  const router = useRouter()
  const params = useParams<{ lang?: string }>()
  const lang = params?.lang || "en"
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Patient[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch patients whenever searchQuery changes (with debounce)
  useEffect(() => {
    const term = searchQuery.trim()

    if (term.length < 2) {
      setSearchResults([])
      // onPatientSelect(null) - DO NOT clear selected patient when typing! allows refining search without losing selection if needed, or keeping it. 
      // Actually standard behavior: clearing search clears selection? 
      // Let's keep existing logic:
      onPatientSelect(null)
      return
    }

    let cancelled = false;

    const timeoutId = setTimeout(async () => {
      setLoading(true)
      try {
        const client = createPatientsApiClient()
        const response = await client.getPatients({
          page: 1,
          limit: 20,
          search: term,
        })

        if (cancelled) return

        const mapped = response.data.data.map(mapBackendPatient)
        setSearchResults(mapped)

        // Only auto-select if exact match 1 result AND user just typed? 
        // Or keep logic: if 1 result found, select it? 
        // Existing logic: if (mapped.length === 1) onPatientSelect(mapped[0]). 
        // This might be annoying if user is typing and 1 result appears transiently.
        // But I will keep original behavior for now as I'm just replacing API.
        if (mapped.length === 1) {
          onPatientSelect(mapped[0] ?? null)
        } else {
          // If multiple or 0, existing logic clears selection? 
          // Line 103: onPatientSelect(null).
          onPatientSelect(null)
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to search patients:", error)
          setSearchResults([])
          onPatientSelect(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }, 300)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [searchQuery, onPatientSelect])

  const handleAddPatient = () => {
    router.push(`/${lang}/patient/add-patient`)
  }

  const handleViewPatientList = () => {
    router.push(`/${lang}/patient`)
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-6 h-full">
      <div>
        {/* Emergency Toggle */}
        {patientVisitType === "emergency" && (
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="emergencyTypePanel"
                value="existing"
                checked={emergencyType === "existing"}
                onChange={() => onEmergencyTypeChange?.("existing")}
                className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className="text-sm font-medium">Existing Patient</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="emergencyTypePanel"
                value="unknown"
                checked={emergencyType === "unknown"}
                onChange={() => onEmergencyTypeChange?.("unknown")}
                className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className="text-sm font-medium">Unknown Patient</span>
            </label>
          </div>
        )}

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Search Patient
        </h2>

        {/* Search Bar - Hide if Emergency Unknown */}
        {(!patientVisitType || patientVisitType !== "emergency" || emergencyType === "existing") && (
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search Patient"
                width="100%"
              />
            </div>
            <Button
              onClick={handleAddPatient}
              className="h-10 w-10 p-0 bg-green-600 hover:bg-green-700 rounded-lg"
            >
              <UserPlus className="h-5 w-5 text-white" />
            </Button>
            <Button
              onClick={handleViewPatientList}
              className="h-10 w-10 p-0 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              <List className="h-5 w-5 text-white" />
            </Button>
          </div>
        )}
      </div>

      {/* Patient Details Card */}
      {selectedPatient && <PatientDetailsCard patient={selectedPatient} />}
    </div>
  )
}

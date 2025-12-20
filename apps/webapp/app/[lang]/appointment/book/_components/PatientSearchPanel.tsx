"use client"

import { useState, useEffect } from "react"
import SearchInput from "@/components/common/search-input"
import { Button } from "@workspace/ui/components/button"
import { UserPlus, List } from "lucide-react"
import { PatientDetailsCard } from "./PatientDetailsCard"
import { useRouter, useParams } from "next/navigation"
import { getAuthToken } from "@/app/utils/onboarding"
import {
  BackendPatient,
  createPatientsApiClient,
} from "@/lib/api/patients"

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
}

function mapBackendPatient(p: BackendPatient): Patient {
  return {
    id: String(p.id),
    name: `${p.first_name} ${p.last_name}`.trim(),
    patientId: `PAT-${p.id}`,
    cprNid: p.civil_id,
    dateOfBirth: p.dob ?? "",
    gender: p.gender ?? "",
    bloodGroup: p.blood_group ?? "",
    maritalStatus: "", // not present in response
    nationality: p.country?.name_en ?? "",
    phone: p.mobile_number ?? "",
    email: p.email ?? "",
    address: p.permanent_address ?? "",
    avatar: p.photo_url ?? undefined,
  }
}

export function PatientSearchPanel({
  selectedPatient,
  onPatientSelect,
}: PatientSearchPanelProps) {
  const router = useRouter()
  const params = useParams<{ lang?: string }>()
  const lang = params?.lang || "en"
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Patient[]>([])
  const [loading, setLoading] = useState(false)
  const [authToken, setAuthToken] = useState<string>("")

  // Fetch patients whenever searchQuery changes (with debounce)
  useEffect(() => {
    const term = searchQuery.trim()

    if (term.length < 2) {
      setSearchResults([])
      onPatientSelect(null)
      return
    }

    let cancelled = false

    const timeoutId = setTimeout(async () => {
      setLoading(true)
      try {
        let token = authToken
        if (!token) {
          token = await getAuthToken()
          setAuthToken(token)
        }

        const client = createPatientsApiClient({ authToken: token })
        const response = await client.getPatients({
          page: 1,
          limit: 20,
          status: "active",
          search: term,
        })

        if (cancelled) return

        const mapped = response.data.data.map(mapBackendPatient)
        setSearchResults(mapped)

        if (mapped.length === 1) {
          onPatientSelect(mapped[0] ?? null)
        } else {
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
  }, [searchQuery, authToken, onPatientSelect])

  const handleAddPatient = () => {
    router.push(`/${lang}/patient/add-patient`)
  }

  const handleViewPatientList = () => {
    router.push(`/${lang}/patient`)
  }

  return (
    <div className="space-y-4">
      {/* Search Section */}
      <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Search Patient
          </h2>
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
        </div>
      </div>

      {/* Patient Details Card */}
      {selectedPatient && <PatientDetailsCard patient={selectedPatient} />}
    </div>
  )
}

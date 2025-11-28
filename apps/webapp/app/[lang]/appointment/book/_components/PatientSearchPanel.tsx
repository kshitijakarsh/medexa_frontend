"use client"

import { useState, useEffect } from "react"
import SearchInput from "@/components/common/search-input"
import { Button } from "@workspace/ui/components/button"
import { UserPlus, List } from "lucide-react"
import { PatientDetailsCard } from "./PatientDetailsCard"
import { useRouter, useParams } from "next/navigation"

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

// Mock patient data
const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Aarav Nair",
    patientId: "PAT-65",
    cprNid: "9988776655",
    dateOfBirth: "1995-08-12",
    gender: "Male",
    bloodGroup: "B+",
    maritalStatus: "Married",
    nationality: "Indian",
    phone: "(239) 555-0108",
    email: "tim.jennings@example.com",
    address: "Villa No. 8, Aluva, Kochi, Kerala, India",
  },
  {
    id: "2",
    name: "Ganguli Rathod",
    patientId: "PAT-66",
    cprNid: "8877665544",
    dateOfBirth: "1982-06-15",
    gender: "Male",
    bloodGroup: "A+",
    maritalStatus: "Single",
    nationality: "Indian",
    phone: "(319) 555-0115",
    email: "ganguli.rathod@example.com",
    address: "123 Main Street, Doha, Qatar",
  },
]

export function PatientSearchPanel({
  selectedPatient,
  onPatientSelect,
}: PatientSearchPanelProps) {
  const router = useRouter()
  const params = useParams<{ lang?: string }>()
  const lang = params?.lang || "en"
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Patient[]>([])

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const filtered = mockPatients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.cprNid.includes(searchQuery)
      )
      setSearchResults(filtered)
      if (filtered.length === 1) {
        onPatientSelect(filtered[0])
      } else {
        onPatientSelect(null)
      }
    } else {
      setSearchResults([])
      onPatientSelect(null)
    }
  }, [searchQuery, onPatientSelect])

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
      {selectedPatient && (
        <PatientDetailsCard patient={selectedPatient} />
      )}
    </div>
  )
}


"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@workspace/ui/components/button"
import { UserPlus, List, Search, X } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import {
    PatientItem,
    createPatientsApiClient,
} from "@/lib/api/patients-api"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { PatientDetailsCard } from "./patient-details-card"

// Reuse the Patient interface or import shared one if available. 
// For now, defining locally to match the PatientDetailsCard expectation roughly.
export interface Patient {
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
}: PatientSearchPanelProps) {
    const router = useRouter()
    const params = useParams<{ lang?: string }>()
    const lang = params?.lang || "en"
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<Patient[]>([])
    const [loading, setLoading] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)

    // Fetch patients whenever searchQuery changes (with debounce)
    useEffect(() => {
        const term = searchQuery.trim()

        if (term.length < 2) {
            setSearchResults([])
            setIsDropdownOpen(false)
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
                setIsDropdownOpen(mapped.length > 0)
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to search patients:", error)
                    setSearchResults([])
                    setIsDropdownOpen(false)
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
    }, [searchQuery])

    const handlePatientSelect = (patient: Patient) => {
        onPatientSelect(patient)
        setIsDropdownOpen(false)
        setSearchQuery(patient.name) // Show selected patient name in search field
    }

    const handleClearSelection = () => {
        onPatientSelect(null)
        setSearchQuery("")
        setIsDropdownOpen(false)
    }

    const handleAddPatient = () => {
        router.push(`/${lang}/patient/add-patient`)
    }

    const handleViewPatientList = () => {
        router.push(`/${lang}/patient`)
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-6 h-full border border-gray-100">
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Search Patient
                </h2>
                <div className="text-sm text-gray-500 mb-4">
                    Search Patient
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <Popover open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                            <PopoverTrigger asChild>
                                <div className="relative">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            value={selectedPatient ? selectedPatient.name : searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value)
                                                if (e.target.value.trim().length >= 2) {
                                                    setIsDropdownOpen(true)
                                                } else {
                                                    setIsDropdownOpen(false)
                                                }
                                                // Clear selection if user starts typing a different name
                                                if (selectedPatient && e.target.value !== selectedPatient.name) {
                                                    onPatientSelect(null)
                                                }
                                            }}
                                            onFocus={() => {
                                                if (searchResults.length > 0 && searchQuery.trim().length >= 2) {
                                                    setIsDropdownOpen(true)
                                                }
                                            }}
                                            placeholder="Search by name, ID, or phone"
                                            className="w-full pl-10 pr-10 h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        {/* Placeholder removed from input and put above as per design usually but keeping placeholder "" for now or "Search by name/id" */}
                                        {(searchQuery || selectedPatient) && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setSearchQuery("")
                                                    setIsDropdownOpen(false)
                                                    onPatientSelect(null)
                                                }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-[var(--radix-popover-trigger-width)] p-0 mt-1"
                                align="start"
                                onOpenAutoFocus={(e) => e.preventDefault()}
                            >
                                <div className="max-h-[400px] overflow-y-auto">
                                    {loading ? (
                                        <div className="p-4 text-center text-sm text-gray-500">
                                            Searching...
                                        </div>
                                    ) : searchResults.length > 0 ? (
                                        <div className="py-1">
                                            {searchResults.map((patient) => (
                                                <button
                                                    key={patient.id}
                                                    onClick={() => handlePatientSelect(patient)}
                                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                                                >
                                                    <Avatar className="h-12 w-12 flex-shrink-0">
                                                        <AvatarImage src={patient.avatar} alt={patient.name} />
                                                        <AvatarFallback className="bg-blue-100 text-blue-600">
                                                            {patient.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                                                        <div className="font-medium text-gray-900 text-base">
                                                            {patient.name}
                                                        </div>
                                                        {patient.cprNid && (
                                                            <div className="text-sm text-gray-600">
                                                                {patient.cprNid}
                                                            </div>
                                                        )}
                                                        {patient.phone && (
                                                            <div className="text-sm text-gray-500">
                                                                {patient.phone}
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : searchQuery.trim().length >= 2 ? (
                                        <div className="p-4 text-center text-sm text-gray-500">
                                            No patients found
                                        </div>
                                    ) : null}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Button
                        onClick={handleAddPatient}
                        className="h-10 w-10 p-0 bg-green-600 hover:bg-green-700 rounded-lg shrink-0"
                    >
                        <UserPlus className="h-5 w-5 text-white" />
                    </Button>
                    <Button
                        onClick={handleViewPatientList}
                        className="h-10 w-10 p-0 bg-blue-600 hover:bg-blue-700 rounded-lg shrink-0"
                    >
                        <List className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </div>

            {/* Patient Details Card */}
            {selectedPatient && <PatientDetailsCard patient={selectedPatient} />}
        </div>
    )
}

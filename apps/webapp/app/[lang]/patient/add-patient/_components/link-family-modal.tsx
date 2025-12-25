"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import Button from "@/components/ui/button"
import { X, Search, Send } from "lucide-react"
import { createPatientsApiClient } from "@/lib/api/patients-api"
import type { PatientItem } from "@/lib/api/patients-api"

interface LinkFamilyModalProps {
    open: boolean
    onClose: () => void
    currentPatientMrn: string
}

export function LinkFamilyModal({ open, onClose, currentPatientMrn }: LinkFamilyModalProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [patients, setPatients] = useState<PatientItem[]>([])
    const [selectedPatient, setSelectedPatient] = useState<PatientItem | null>(null)
    const [isSearching, setIsSearching] = useState(false)
    const [showPatientDetails, setShowPatientDetails] = useState(false)
    const [relationshipType, setRelationshipType] = useState("")

    // Debounced search
    useEffect(() => {
        if (!searchQuery.trim()) {
            setPatients([])
            return
        }

        const timer = setTimeout(async () => {
            setIsSearching(true)
            try {
                const apiClient = createPatientsApiClient()
                const response = await apiClient.getPatients({ search: searchQuery })
                setPatients(response.data.data || [])
            } catch (error) {
                console.error("Error searching patients:", error)
                setPatients([])
            } finally {
                setIsSearching(false)
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [searchQuery])

    const handleTransfer = () => {
        if (selectedPatient) {
            setShowPatientDetails(true)
        }
    }

    const handleConfirmLink = () => {
        if (selectedPatient && relationshipType) {
            console.log("Linking family member:", selectedPatient, "Relationship:", relationshipType)
            // TODO: Implement actual linking API call
            handleCancel()
        }
    }

    const handleCancel = () => {
        setSearchQuery("")
        setPatients([])
        setSelectedPatient(null)
        setShowPatientDetails(false)
        setRelationshipType("")
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={handleCancel}>
            <DialogContent className="max-w-7xl min-h-[700px] p-0 gap-0">
                {/* Header */}
                <DialogHeader className="p-6 space-y-6">
                    <div>
                        <DialogTitle className="text-2xl font-bold text-gray-900 mb-1">
                            Link Family
                        </DialogTitle>
                        <p className="text-gray-600">Search Family Member NID/MRN Hospital ID</p>
                    </div>

                    {/* Search Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search Patient
                        </label>
                        <div className="relative">
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Patient"
                                className="pl-4 pr-12 h-14 text-base rounded-lg border-gray-300" />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                        </div>
                    </div>
                </DialogHeader>

                {/* Content - Results */}
                <div className="px-6">

                    {/* Results */}
                    {searchQuery && (
                        <div className="space-y-2 max-h-[400px] overflow-y-auto">
                            {isSearching ? (
                                <div className="text-center py-8 text-gray-500">Searching...</div>
                            ) : patients.length > 0 ? (
                                patients.map((patient) => (
                                    <div
                                        key={patient.id}
                                        onClick={() => setSelectedPatient(patient)}
                                        className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${selectedPatient?.id === patient.id
                                            ? "bg-blue-100 border-2 border-blue-500"
                                            : "bg-blue-50 hover:bg-blue-100"
                                            }`}
                                    >
                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                                            {patient.first_name?.[0]}{patient.last_name?.[0]}
                                        </div>

                                        {/* Patient Info */}
                                        <div className="flex-1 flex items-center justify-between gap-6">
                                            <div className="font-medium text-gray-900 flex-1 min-w-0">
                                                {patient.first_name} {patient.last_name}
                                            </div>
                                            <div className="text-gray-700 w-32 flex-shrink-0">
                                                MRN-{patient.id}
                                            </div>
                                            <div className="text-gray-700 w-40 flex-shrink-0 text-right">
                                                {patient.mobile_number || "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">No patients found</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Patient Details View */}
                {showPatientDetails && selectedPatient && (
                    <div className="px-6 py-4 space-y-6">
                        {/* Patient Header */}
                        <div className="flex items-center gap-4 pb-4 border-b">
                            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-2xl">
                                {selectedPatient.first_name?.[0]}{selectedPatient.last_name?.[0]}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {selectedPatient.first_name} {selectedPatient.last_name}
                                </h3>
                                <p className="text-gray-600">PAT-{selectedPatient.id}</p>
                            </div>
                        </div>

                        {/* Patient Details Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">CPR/NID</p>
                                <p className="text-base font-semibold text-gray-900">{selectedPatient.civil_id || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Date Of Birth</p>
                                <p className="text-base font-semibold text-gray-900">{selectedPatient.dob || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Gender</p>
                                <p className="text-base font-semibold text-gray-900">{selectedPatient.gender || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Blood Group</p>
                                <p className="text-base font-semibold text-gray-900">{selectedPatient.blood_group || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Marital Status</p>
                                <p className="text-base font-semibold text-gray-900">{selectedPatient.marital_status || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Nationality</p>
                                <p className="text-base font-semibold text-gray-900">{selectedPatient.nationality || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Phone</p>
                                <p className="text-base font-semibold text-gray-900">{selectedPatient.mobile_number || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Email</p>
                                <p className="text-base font-semibold text-gray-900">{selectedPatient.email || "N/A"}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-600 mb-1">Address</p>
                                <p className="text-base font-semibold text-gray-900">{selectedPatient.permanent_address || selectedPatient.city || "N/A"}</p>
                            </div>
                        </div>

                        {/* Relationship Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Relationship Type
                            </label>
                            <select
                                value={relationshipType}
                                onChange={(e) => setRelationshipType(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select Relationship Type</option>
                                <option value="father">Father</option>
                                <option value="mother">Mother</option>
                                <option value="spouse">Spouse</option>
                                <option value="child">Child</option>
                                <option value="sibling">Sibling</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="absolute bottom-0 right-0 p-6 flex gap-3">
                    {!showPatientDetails ? (
                        <>
                            <Button
                                variant="outline"
                                onClick={handleCancel}
                                className="px-8 py-3 rounded-lg border-2 border-blue-500 text-blue-600 font-medium hover:bg-blue-50"
                            >
                                CANCEL
                            </Button>
                            <Button
                                onClick={handleTransfer}
                                disabled={!selectedPatient}
                                className="px-8 py-3 rounded-lg bg-[#44B678] text-white font-medium hover:bg-[#3a9d66] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                TRANSFER PATIENT
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => setShowPatientDetails(false)}
                                className="px-8 py-3 rounded-lg border-2 border-blue-500 text-blue-600 font-medium hover:bg-blue-50"
                            >
                                BACK
                            </Button>
                            <Button
                                onClick={handleConfirmLink}
                                disabled={!relationshipType}
                                className="px-8 py-3 rounded-lg bg-[#44B678] text-white font-medium hover:bg-[#3a9d66] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                LINK FAMILY MEMBER
                            </Button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import Button from "@/components/ui/button"
import { Search, Send } from "lucide-react"
import { createPatientsApiClient } from "@/lib/api/patients-api"
import type { PatientItem } from "@/lib/api/patients-api"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select"

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

    // Get initials for avatar
    const getInitials = (patient: PatientItem) => {
        const first = patient.first_name?.[0] || ""
        const last = patient.last_name?.[0] || ""
        return `${first}${last}`.toUpperCase()
    }

    return (
        <Dialog open={open} onOpenChange={handleCancel}>
            <DialogContent
                className="p-0 gap-0"
                style={{ maxWidth: '1400px', width: '45vw', minHeight: '600px' }}
                showCloseButton={false}
            >
                {/* Header */}
                <div className="p-6 pb-4">
                    <div className="mb-4">
                        <DialogTitle className="text-2xl font-bold text-gray-900 mb-1">
                            Link Family
                        </DialogTitle>
                        <p className="text-gray-600">Search Family Member NID/MRN Hospital ID</p>
                    </div>

                    {/* Search Input */}
                    <div className="relative">
                        <Input
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setShowPatientDetails(false)
                            }}
                            placeholder="Search Patient"
                            className="pl-4 pr-12 h-12 text-base rounded-lg border-gray-300 bg-white placeholder:text-gray-400"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Search className="w-5 h-5 text-blue-500" />
                        </div>
                    </div>
                </div>

                {/* Content - Results */}
                <div className="px-6 pb-6">
                    {/* Results Container - Hidden when showing details */}
                    {!showPatientDetails && (
                        <div className="w-full rounded-lg bg-white max-h-[400px] overflow-y-auto min-h-[200px]">
                            {!searchQuery ? null : isSearching ? (
                                <div className="text-center py-8 text-gray-500">Searching...</div>
                            ) : patients.length > 0 ? (
                                patients.map((patient) => (
                                    <div
                                        key={patient.id}
                                        onClick={() => setSelectedPatient(patient)}
                                        className={`flex items-center gap-4 px-4 py-3 cursor-pointer transition-colors ${selectedPatient?.id === patient.id
                                            ? "bg-blue-50"
                                            : "bg-white hover:bg-gray-50"
                                            }`}
                                    >
                                        {/* Avatar */}
                                        <Avatar className="h-12 w-12 flex-shrink-0">
                                            <AvatarImage src={patient.photo_url ?? undefined} alt={`${patient.first_name} ${patient.last_name}`} />
                                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white font-semibold text-sm">
                                                {getInitials(patient)}
                                            </AvatarFallback>
                                        </Avatar>

                                        {/* Patient Info - All in single horizontal row with proper alignment */}
                                        <div className="flex-1 flex items-center gap-8 flex-nowrap">
                                            <div className="font-medium text-gray-900 text-base whitespace-nowrap min-w-[200px]">
                                                {patient.first_name} {patient.last_name}
                                            </div>
                                            <div className="text-gray-700 text-sm whitespace-nowrap min-w-[120px]">
                                                MRN-{patient.id}
                                            </div>
                                            <div className="text-gray-700 text-sm whitespace-nowrap">
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
                    <div className="px-6 space-y-6">
                        {/* Patient Details Card */}
                        <div className="border border-gray-200 rounded-2xl p-6 bg-white">
                            {/* Patient Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={selectedPatient.photo_url ?? undefined} alt={`${selectedPatient.first_name} ${selectedPatient.last_name}`} />
                                    <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-white font-bold text-xl">
                                        {getInitials(selectedPatient)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-xl font-bold text-black">
                                        {selectedPatient.first_name} {selectedPatient.last_name}
                                    </h3>
                                    <p className="text-gray-500">PAT-{selectedPatient.id}</p>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">CPR/NID</p>
                                    <p className="text-base font-bold text-black">{selectedPatient.civil_id || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Date Of Birth</p>
                                    <p className="text-base font-bold text-black">{selectedPatient.dob || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Gender</p>
                                    <p className="text-base font-bold text-black capitalize">{selectedPatient.gender || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Blood Group</p>
                                    <p className="text-base font-bold text-black">{selectedPatient.blood_group || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Marital Status</p>
                                    <p className="text-base font-bold text-black capitalize">{selectedPatient.marital_status || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Nationality</p>
                                    <p className="text-base font-bold text-black capitalize">{selectedPatient.nationality || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                                    <p className="text-base font-bold text-black">{selectedPatient.mobile_number || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Email</p>
                                    <p className="text-base font-bold text-black break-all">{selectedPatient.email || "N/A"}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-500 mb-1">Address</p>
                                    <p className="text-base font-bold text-black">{selectedPatient.permanent_address || selectedPatient.city || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Relationship Type - Outside the card */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Relationship Type</label>
                            <Select value={relationshipType} onValueChange={setRelationshipType}>
                                <SelectTrigger className="w-[300px] h-12 border-gray-200">
                                    <SelectValue placeholder="Select Relationship Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="father">Father</SelectItem>
                                    <SelectItem value="mother">Mother</SelectItem>
                                    <SelectItem value="spouse">Spouse</SelectItem>
                                    <SelectItem value="child">Child</SelectItem>
                                    <SelectItem value="sibling">Sibling</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}
                {/* Footer */}
                <div className="p-6 flex justify-end gap-3">
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

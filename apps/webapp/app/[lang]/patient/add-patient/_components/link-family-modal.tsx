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
    const [showIdCard, setShowIdCard] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false)

    // Reset state when modal opens/closes
    useEffect(() => {
        if (!open) {
            setSearchQuery("")
            setPatients([])
            setSelectedPatient(null)
            setShowPatientDetails(false)
            setRelationshipType("")
            setShowIdCard(false)
            setIsFlipped(false)
        }
    }, [open])

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

    const handleConfirmLink = () => {
        if (selectedPatient && relationshipType) {
            console.log("Linking family member:", selectedPatient, "Relationship:", relationshipType)
            // TODO: Implement actual linking API call
            setShowIdCard(true)
        }
    }

    const handlePrint = () => {
        window.print()
    }

    // Calculate Age
    const calculateAge = (dobString?: string) => {
        if (!dobString) return "N/A";
        // Attempt to parse 'YYYY-MM-DD' or ISO string
        const dob = new Date(dobString);
        if (isNaN(dob.getTime())) return dobString; // Return original if invalid date

        const now = new Date();

        let years = now.getFullYear() - dob.getFullYear();
        let months = now.getMonth() - dob.getMonth();
        let days = now.getDate() - dob.getDate();

        if (days < 0) {
            months--;
            // Get last day of previous month
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        return `${years} Year ${months} Month ${days} Days`;
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
                className="p-0 gap-0 transition-all duration-300 ease-in-out"
                style={{
                    maxWidth: showIdCard ? '800px' : '1400px',
                    width: showIdCard ? 'auto' : '95vw',
                    minHeight: showIdCard ? 'auto' : '600px',
                    height: showIdCard ? 'auto' : 'auto'
                }}
                showCloseButton={!showIdCard}
            >
                {/* Header */}
                <div className="p-6 pb-4 border-b-0">
                    <div className="flex justify-between items-center mb-4">
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                            {showIdCard ? "Print Hospital ID" : "Link Family"}
                        </DialogTitle>
                        {/* {showIdCard && (
                            <button
                                onClick={handleCancel}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <Search className="w-6 h-6" /> 
                            </button>
                        )} // Custom close logic if needed, but DialogContent handles default X. We disabled it above for ID card? User images show X.
                        */}
                    </div>

                    {!showIdCard && (
                        <>
                            <p className="text-gray-600 mb-4">Search Family Member NID/MRN Hospital ID</p>

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
                        </>
                    )}
                </div>

                {/* Content - Results */}
                <div className="px-6 pb-6">
                    {/* Results Container - Hidden when showing details or ID card */}
                    {!showPatientDetails && !showIdCard && (
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
                {showPatientDetails && selectedPatient && !showIdCard && (
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

                {/* ID Card View */}
                {showIdCard && selectedPatient && (
                    <div className="flex flex-col items-center pb-6">
                        {/* Flip Button Container */}
                        <div className="w-full max-w-[650px] mb-4 flex justify-start">
                            <button
                                onClick={() => setIsFlipped(!isFlipped)}
                                className="p-2 rounded-full hover:bg-gray-100 text-blue-500 transition-colors"
                                title="Flip Card"
                            >
                                <div className="border border-blue-400 border-dashed p-1 rounded">
                                    <span className="sr-only">Flip</span>
                                    {/* Flip Icon Simulation */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 12 12 12 12 3" />
                                        <path d="M21 21 3 21 3 8" />
                                        <path d="M21 12 21 21" />
                                        <path d="M12 3 3 8" />
                                        <path d="M3 21 12 12" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        {/* Card Container with Perspective */}
                        <div className="relative w-full max-w-[650px] h-[400px]" style={{ perspective: '1000px' }}>
                            <div
                                className="relative w-full h-full transition-all duration-700 ease-in-out"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                }}
                            >
                                {/* Front Side */}
                                <div
                                    className="absolute w-full h-full backface-hidden bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between overflow-hidden text-left"
                                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <img src="/images/hospitallogo.svg" alt="Hamad General Hospital" className="h-12 object-contain" />
                                        <div className="text-right">
                                            <h2 className="text-blue-500 font-bold text-lg uppercase">HAMAD GENERAL HOSPITAL</h2>
                                        </div>
                                    </div>

                                    {/* Subheader */}
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-2">
                                            <img src="/images/docimg.svg" alt="Doctor Icon" className="w-6 h-6" />
                                            <h3 className="font-bold text-gray-800 uppercase tracking-wide">PATEITN REGISTRATION CARD</h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700 font-semibold">
                                            <span className="text-xl">📅</span>
                                            <span>{new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}</span>
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex gap-6 mb-6">
                                        {/* Photo */}
                                        <div className="w-32 h-32 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden shadow-inner">
                                            {selectedPatient.photo_url ? (
                                                <img src={selectedPatient.photo_url} alt="Patient" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-3xl font-bold">
                                                    {getInitials(selectedPatient)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 space-y-2">
                                            <h2 className="text-2xl font-bold text-black">Name: {selectedPatient.first_name} {selectedPatient.last_name}</h2>
                                            <p className="text-lg font-medium text-black">MRN: {selectedPatient.id}</p>
                                            <div className="flex gap-8">
                                                <p className="text-lg font-medium text-black">QID: {selectedPatient.civil_id || "28945120314"}</p>
                                                <p className="text-lg font-medium text-black">Blood Group: {selectedPatient.blood_group || "O+"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Details */}
                                    <div className="grid grid-cols-2 gap-4 text-black font-medium">
                                        <div className="flex items-center gap-2">
                                            <span>{selectedPatient.gender === 'male' ? '♂' : '♀'}</span>
                                            <span className="capitalize">{selectedPatient.gender || "Male"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>📅</span>
                                            <span>{calculateAge(selectedPatient.dob ?? undefined)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>📞</span>
                                            <span>{selectedPatient.mobile_number || "0792689298"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>📞</span>
                                            <span>{selectedPatient.mobile_number || "0792689298"}</span>
                                        </div>
                                    </div>

                                    {/* Bottom Row */}
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex gap-2 text-gray-700">
                                            <span>Relation Name</span>
                                            <span className="font-semibold text-black">{selectedPatient.first_name} Ahmed ({relationshipType || "Father"})</span>
                                        </div>
                                        {/* QR Code Placeholder */}
                                        <div className="w-20 h-20 bg-black">
                                            <div className="w-full h-full bg-white p-1 grid grid-cols-4 gap-0.5">
                                                {[...Array(16)].map((_, i) => (
                                                    <div key={i} className={`bg-black ${i % 2 === 0 ? 'opacity-100' : 'opacity-30'}`}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Back Side */}
                                <div
                                    className="absolute w-full h-full backface-hidden bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between overflow-hidden text-left"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)'
                                    }}
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <img src="/images/hospitallogo.svg" alt="Hamad General Hospital" className="h-12 object-contain" />
                                        <div className="text-right">
                                            <h2 className="text-blue-500 font-bold text-lg uppercase">HAMAD GENERAL HOSPITAL</h2>
                                        </div>
                                    </div>

                                    {/* Subheader */}
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-2">
                                            <img src="/images/docimg.svg" alt="Doctor Icon" className="w-6 h-6" />
                                            <h3 className="font-bold text-gray-800 uppercase tracking-wide">PATEITN REGISTRATION CARD</h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700 font-semibold">
                                            <span className="text-xl">📅</span>
                                            <span>{new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}</span>
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex gap-6 mb-6">
                                        {/* Small Photo */}
                                        <div className="w-24 h-24 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden shadow-inner">
                                            {selectedPatient.photo_url ? (
                                                <img src={selectedPatient.photo_url} alt="Patient" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-2xl font-bold">
                                                    {getInitials(selectedPatient)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 space-y-2">
                                            <h2 className="text-2xl font-bold text-black">Name: {selectedPatient.first_name} {selectedPatient.last_name}</h2>
                                            <p className="text-gray-900 font-medium">Emergency Contact: 5550 1122</p>
                                            <p className="text-gray-900 font-medium">Mobile: {selectedPatient.mobile_number || "5588 9933"}</p>
                                            <p className="text-gray-900 font-medium">Patient Category: Corporate</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 mb-8">
                                        <p className="text-lg text-black">"This card is the property of the hospital and must be presented during each visit."</p>
                                        <p className="text-lg text-black mt-2">Hamad General Hospital, Doha - Qatar</p>
                                    </div>

                                    {/* Footer - Barcode & Call Center */}
                                    <div className="flex justify-between items-end">
                                        {/* Barcode Mockup */}
                                        <div className="h-12 w-48 bg-black flex gap-[2px]">
                                            {[...Array(40)].map((_, i) => (
                                                <div key={i} className={`h-full bg-white`} style={{ width: Math.random() > 0.5 ? '2px' : '4px' }}></div>
                                            ))}
                                        </div>
                                        <div className="text-right text-lg font-medium text-black">
                                            Call Center: 16060
                                            <br />
                                            <span className="text-sm text-gray-500">www.hamad.qa</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Footer */}
                <div className="p-6 flex justify-end gap-3">
                    {!showPatientDetails && !showIdCard ? (
                        <>
                            <Button
                                variant="outline"
                                onClick={handleCancel}
                                className="px-8 py-3 rounded-lg border-2 border-blue-500 text-blue-600 font-medium hover:bg-blue-50"
                            >
                                CANCEL
                            </Button>
                            <Button
                                onClick={() => selectedPatient && setShowPatientDetails(true)}
                                disabled={!selectedPatient}
                                className="px-8 py-3 rounded-lg bg-[#44B678] text-white font-medium hover:bg-[#3a9d66] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                TRANSFER PATIENT
                            </Button>
                        </>
                    ) : showIdCard ? (
                        <Button
                            onClick={handlePrint}
                            className="px-8 py-3 rounded-full border-2 border-blue-500 text-blue-600 bg-white hover:bg-blue-50 font-medium flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                            Print Hospital ID
                        </Button>
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

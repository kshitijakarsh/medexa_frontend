"use client"

import { useState, useEffect } from "react"
import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select"
import { CalendarIcon } from "lucide-react"
import { format } from "@workspace/ui/hooks/use-date-fns"
import { cn } from "@workspace/ui/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover"
import { Calendar } from "@workspace/ui/components/calendar"
import { Patient } from "./patient-search-panel"
import { createDoctorsApiClient } from "@/lib/api/doctors-api"
import { createNursesApiClient } from "@/lib/api/nurses-api"
import { createDepartmentApiClient } from "@/lib/api/administration/department"
import { createInsuranceApiClient } from "@/lib/api/insurance-api"
import { createWardTypeApiClient } from "@/lib/api/administration/wardTypes"
import { createFrontofficeBedsApiClient } from "@/lib/api/frontoffice-beds-api"
import { createIPDApiClient } from "@/lib/api/ipd-api"
import { getAuthToken } from "@/app/utils/onboarding"
import { SearchableSelect } from "@/app/[lang]/appointment/book/_components/SearchableSelect"

interface AdmissionFormProps {
    selectedPatient: Patient | null
    onSubmit: (data: any) => void
    onCancel: () => void
}

interface Option {
    value: string
    label: string
}

export function AdmissionForm({ selectedPatient, onSubmit, onCancel }: AdmissionFormProps) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [formData, setFormData] = useState({
        admissionType: "",
        case: "",
        tpa: "",
        casualty: "",
        creditLimit: "",
        department: "",
        doctor: "",
        ward: "",
        bed: "",
        nurse: "",
        expectedDuration: "",
        reason: "",
    })

    // State for dropdown options
    const [departments, setDepartments] = useState<Option[]>([])
    const [doctors, setDoctors] = useState<Option[]>([])
    const [nurses, setNurses] = useState<Option[]>([])
    const [insurances, setInsurances] = useState<Option[]>([])
    const [wards, setWards] = useState<Option[]>([])
    const [beds, setBeds] = useState<Option[]>([])
    const [loadingDepartments, setLoadingDepartments] = useState(false)
    const [loadingDoctors, setLoadingDoctors] = useState(false)
    const [loadingNurses, setLoadingNurses] = useState(false)
    const [loadingInsurances, setLoadingInsurances] = useState(false)
    const [loadingWards, setLoadingWards] = useState(false)
    const [loadingBeds, setLoadingBeds] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [doctorSearchQuery, setDoctorSearchQuery] = useState("")
    const [nurseSearchQuery, setNurseSearchQuery] = useState("")

    // Fetch departments
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

    // Fetch insurance providers (TPA)
    useEffect(() => {
        const fetchInsurances = async () => {
            setLoadingInsurances(true)
            try {
                const insuranceClient = createInsuranceApiClient()
                const response = await insuranceClient.getInsurances({
                    page: 1,
                    limit: 100,
                    status: "active",
                })

                const insuranceOptions = response.data.data.map((insurance) => ({
                    value: insurance.id,
                    label: insurance.provider_name,
                }))
                setInsurances(insuranceOptions)
            } catch (error) {
                console.error("Failed to fetch insurance providers:", error)
                setInsurances([])
            } finally {
                setLoadingInsurances(false)
            }
        }

        fetchInsurances()
    }, [])

    // Fetch ward types - if empty, show default ward_id
    useEffect(() => {
        const fetchWards = async () => {
            setLoadingWards(true)
            try {
                const wardTypeClient = createWardTypeApiClient()
                const response = await wardTypeClient.getWardTypes({
                    page: 1,
                    limit: 100,
                    status: "active",
                })

                if (response.data.data && response.data.data.length > 0) {
                    const wardOptions = response.data.data.map((ward) => ({
                        value: ward.id,
                        label: ward.name,
                    }))
                    setWards(wardOptions)
                } else {
                    // If no wards from API, show default option with ward_id
                    setWards([{ value: "1", label: "Default Ward" }])
                }
            } catch (error) {
                console.error("Failed to fetch ward types:", error)
                // On error, show default option with ward_id
                setWards([{ value: "1", label: "Default Ward" }])
            } finally {
                setLoadingWards(false)
            }
        }

        fetchWards()
    }, [])

    // Fetch beds - if empty, show default bed_id=15
    useEffect(() => {
        const fetchBeds = async () => {
            setLoadingBeds(true)
            try {
                const bedsClient = createFrontofficeBedsApiClient()
                const response = await bedsClient.getBeds({
                    page: 1,
                    limit: 100,
                    status: "active",
                })

                if (response.data.success && response.data.data.length > 0) {
                    const bedOptions = response.data.data.map((bed) => ({
                        value: bed.id,
                        label: `${bed.bed_number} (Available)`,
                    }))
                    setBeds(bedOptions)
                } else {
                    // If no beds from API, show default option with bed_id=15
                    setBeds([{ value: "15", label: "Default Bed" }])
                }
            } catch (error) {
                console.error("Failed to fetch beds:", error)
                // On error, show default option with bed_id=15
                setBeds([{ value: "15", label: "Default Bed" }])
            } finally {
                setLoadingBeds(false)
            }
        }

        fetchBeds()
    }, [])

    // Fetch doctors with search
    useEffect(() => {
        const fetchDoctors = async () => {
            setLoadingDoctors(true)
            try {
                const doctorsClient = createDoctorsApiClient()
                const params: any = {
                    page: 1,
                    limit: 100,
                }
                if (doctorSearchQuery.trim()) {
                    params.search = doctorSearchQuery.trim()
                }

                const response = await doctorsClient.getDoctors(params)
                const doctorOptions = response.data.data.map((doctor) => ({
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

        // Debounce search, but fetch immediately on mount
        const timeoutId = setTimeout(fetchDoctors, doctorSearchQuery ? 300 : 0)

        return () => clearTimeout(timeoutId)
    }, [doctorSearchQuery])

    // Fetch nurses with search
    useEffect(() => {
        const fetchNurses = async () => {
            setLoadingNurses(true)
            try {
                const nursesClient = createNursesApiClient()
                const params: any = {
                    page: 1,
                    limit: 100,
                }
                if (nurseSearchQuery.trim()) {
                    params.search = nurseSearchQuery.trim()
                }

                const response = await nursesClient.getNurses(params)
                const nurseOptions = response.data.data.map((nurse) => ({
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

        // Debounce search, but fetch immediately on mount
        const timeoutId = setTimeout(fetchNurses, nurseSearchQuery ? 300 : 0)

        return () => clearTimeout(timeoutId)
    }, [nurseSearchQuery])

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const isFormValid = selectedPatient && date && formData.department && formData.doctor && formData.ward && formData.bed && formData.reason

    const handleSubmit = async () => {
        if (!isFormValid || submitting) return

        setSubmitting(true)
        setSubmitError(null)

        try {
            // Format date to ISO string (set to start of day in local timezone, then convert to ISO)
            let isoDate: string
            if (date) {
                const localDate = new Date(date)
                localDate.setHours(0, 0, 0, 0)
                isoDate = localDate.toISOString()
            } else {
                isoDate = new Date().toISOString()
            }

            // Prepare API payload
            const apiPayload = {
                patient_id: selectedPatient!.patientId,
                date: isoDate,
                casuality: formData.casualty === "yes",
                credit_limit: formData.creditLimit ? parseFloat(formData.creditLimit) : 0,
                tpa: formData.tpa || "",
                admission_type: (formData.admissionType || "elective") as "emergency" | "elective" | "daycare" | "observation" | "mlc",
                department_id: formData.department,
                doctor_id: formData.doctor,
                ward_id: formData.ward,
                bed_id: formData.bed,
                nurse_id: formData.nurse || "",
                expected_days: formData.expectedDuration ? parseInt(formData.expectedDuration, 10) : 1,
                admission_reason: formData.reason,
            }

            // Call create IPD API
            const ipdClient = createIPDApiClient()
            const response = await ipdClient.createIPD(apiPayload)

            if (response.data.success) {
                // Success - call parent onSubmit with the response data
                onSubmit({ 
                    ...formData, 
                    admissionDate: date,
                    ipdId: response.data.data.id,
                    apiResponse: response.data
                })
            } else {
                setSubmitError("Failed to create admission. Please try again.")
            }
        } catch (error) {
            console.error("Error creating IPD:", error)
            const errorMessage = error instanceof Error ? error.message : "An error occurred while creating admission"
            setSubmitError(errorMessage)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex-1 space-y-6 overflow-y-auto pr-2 pb-4">
                {/* Row 1: Admission Date & Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Admission Date *</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal bg-white border-gray-200 h-10",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4 text-green-500" />
                                    {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Admission Type</Label>
                        <Select onValueChange={(val) => handleChange("admissionType", val)}>
                            <SelectTrigger className="bg-white border-gray-200 h-10 w-full">
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="emergency">Emergency</SelectItem>
                                <SelectItem value="elective">Elective</SelectItem>
                                <SelectItem value="daycare">Day Care</SelectItem>
                                <SelectItem value="observation">Observation</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Row 2: Case & TPA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Case</Label>
                        <Select onValueChange={(val) => handleChange("case", val)}>
                            <SelectTrigger className="bg-white border-gray-200 h-10 w-full">
                                <SelectValue placeholder="Select Case" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="accident">Accident</SelectItem>
                                <SelectItem value="medical">Medical Management</SelectItem>
                                <SelectItem value="surgical">Surgical</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">TPA</Label>
                        <Select 
                            onValueChange={(val) => handleChange("tpa", val)}
                            disabled={loadingInsurances}
                        >
                            <SelectTrigger className="bg-white border-gray-200 h-10 w-full">
                                <SelectValue placeholder={loadingInsurances ? "Loading..." : "Select TPA"} />
                            </SelectTrigger>
                            <SelectContent>
                                {insurances.map((insurance) => (
                                    <SelectItem key={insurance.value} value={insurance.value}>
                                        {insurance.label}
                                    </SelectItem>
                                ))}
                                {insurances.length === 0 && !loadingInsurances && (
                                    <div className="p-2 text-sm text-gray-500">No insurance providers found</div>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Row 3: Casualty & Credit Limit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Casualty</Label>
                        <Select onValueChange={(val) => handleChange("casualty", val)}>
                            <SelectTrigger className="bg-white border-gray-200 h-10 w-full">
                                <SelectValue placeholder="Select Casualty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Credit Limit</Label>
                        <Input
                            placeholder="Enter Credit Limit"
                            className="bg-white border-gray-200 h-10"
                            value={formData.creditLimit}
                            onChange={(e) => handleChange("creditLimit", e.target.value)}
                        />
                    </div>
                </div>

                {/* Section: Medical Info BG */}
                <div className="bg-[#eff6ff] p-5 rounded-xl space-y-4 border border-blue-50/50">
                    {/* Row 4: Department & Doctor */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Department *</Label>
                            <Select 
                                onValueChange={(val) => handleChange("department", val)}
                                disabled={loadingDepartments}
                            >
                                <SelectTrigger className="bg-white border-blue-100 h-10 [&>svg]:text-[#2CB470] w-full">
                                    <SelectValue placeholder={loadingDepartments ? "Loading..." : "Select Department"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept.value} value={dept.value}>
                                            {dept.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <SearchableSelect
                                label="Doctor *"
                                placeholder="Select Doctor"
                                options={doctors}
                                value={formData.doctor}
                                onChange={(val) => handleChange("doctor", val)}
                                onSearch={setDoctorSearchQuery}
                                loading={loadingDoctors}
                                required
                            />
                        </div>
                    </div>

                    {/* Row 5: Ward */}
                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Ward</Label>
                            <Select 
                                onValueChange={(val) => handleChange("ward", val)}
                                disabled={loadingWards}
                            >
                                <SelectTrigger className="bg-white border-blue-100 h-10 [&>svg]:text-[#2CB470] [&>svg]:opacity-100 w-full">
                                    <SelectValue placeholder={loadingWards ? "Loading..." : "Select Ward"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {wards.map((ward) => (
                                        <SelectItem key={ward.value} value={ward.value}>
                                            {ward.label}
                                        </SelectItem>
                                    ))}
                                    {wards.length === 0 && !loadingWards && (
                                        <div className="p-2 text-sm text-gray-500">No wards found</div>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 6: Bed & Nurse */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Bed</Label>
                            <Select 
                                onValueChange={(val) => handleChange("bed", val)}
                                disabled={loadingBeds}
                            >
                                <SelectTrigger className="bg-white border-blue-100 h-10 [&>svg]:text-[#2CB470] [&>svg]:opacity-100 w-full">
                                    <SelectValue placeholder={loadingBeds ? "Loading..." : "Select Bed"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {beds.map((bed) => (
                                        <SelectItem key={bed.value} value={bed.value}>
                                            {bed.label}
                                        </SelectItem>
                                    ))}
                                    {beds.length === 0 && !loadingBeds && (
                                        <div className="p-2 text-sm text-gray-500">No beds found</div>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <SearchableSelect
                                label="Nurse"
                                placeholder="Select Nurse"
                                options={nurses}
                                value={formData.nurse}
                                onChange={(val) => handleChange("nurse", val)}
                                onSearch={setNurseSearchQuery}
                                loading={loadingNurses}
                            />
                        </div>
                    </div>

                    {/* Row 7: expected duration */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Expected Duration (In days)</Label>
                        <Input
                            placeholder="Enter Expected Duration"
                            className="bg-white border-blue-100 h-10 text-gray-700 placeholder:text-gray-400"
                            value={formData.expectedDuration}
                            onChange={(e) => handleChange("expectedDuration", e.target.value)}
                        />
                    </div>

                    {/* Row 8: Reason */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Admission Reason</Label>
                        <Textarea
                            placeholder="Enter Admission Reason"
                            className="bg-white border-blue-100 min-h-[80px] text-gray-700 placeholder:text-gray-400"
                            value={formData.reason}
                            onChange={(e) => handleChange("reason", e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Footer: Fees & Actions */}
            <div className="mt-4 pt-0">
                <div className="bg-[#ECF7FF] rounded-xl p-4 space-y-2 mb-6">
                    <div className="flex justify-between text-gray-700">
                        <span className="text-sm font-normal">Admission Registration Fee</span>
                        <span className="text-sm font-normal">120 AED</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <span className="text-sm font-normal">Bed Fee</span>
                        <span className="text-sm font-normal">120 AED</span>
                    </div>
                    <div className="flex justify-between text-gray-900">
                        <span className="text-sm font-semibold">Total</span>
                        <span className="text-sm font-semibold">240 AED</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {submitError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
                            {submitError}
                        </div>
                    )}
                    <div className="flex justify-end gap-3">
                        <Button 
                            variant="outline" 
                            className="border-gray-200 text-gray-600 uppercase" 
                            onClick={onCancel}
                            disabled={submitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[#2CB470] hover:bg-[#28a063] text-white uppercase font-semibold"
                            disabled={!isFormValid || submitting}
                            onClick={handleSubmit}
                        >
                            {submitting ? "Submitting..." : "Admit Patient"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

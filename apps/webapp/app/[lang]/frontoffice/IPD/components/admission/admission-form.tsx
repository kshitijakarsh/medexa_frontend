"use client"

import { useState } from "react"
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

interface AdmissionFormProps {
    selectedPatient: Patient | null
    onSubmit: (data: any) => void
    onCancel: () => void
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
        room: "",
        bed: "",
        nurse: "",
        expectedDuration: "",
        reason: "",
    })

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const isFormValid = selectedPatient && date && formData.department && formData.doctor && formData.ward && formData.bed && formData.reason

    const handleSubmit = () => {
        if (!isFormValid) return
        onSubmit({ ...formData, admissionDate: date })
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
                        <Select onValueChange={(val) => handleChange("tpa", val)}>
                            <SelectTrigger className="bg-white border-gray-200 h-10 w-full">
                                <SelectValue placeholder="Select TPA" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nlem">NLEM</SelectItem>
                                <SelectItem value="star">Star Health</SelectItem>
                                <SelectItem value="icici">ICICI Lombard</SelectItem>
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
                            <Select onValueChange={(val) => handleChange("department", val)}>
                                <SelectTrigger className="bg-white border-blue-100 h-10 [&>svg]:text-[#2CB470] w-full">
                                    <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cardiology">Cardiology</SelectItem>
                                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                                    <SelectItem value="ent">ENT</SelectItem>
                                    <SelectItem value="gynecology">Gynecology</SelectItem>
                                    <SelectItem value="neurology">Neurology</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Doctor *</Label>
                            <Select onValueChange={(val) => handleChange("doctor", val)}>
                                <SelectTrigger className="bg-white border-blue-100 h-10 [&>svg]:text-[#2CB470] [&>svg]:opacity-100 w-full">
                                    <SelectValue placeholder="Select Doctor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dr_kiran">Dr. Kiran Madha</SelectItem>
                                    <SelectItem value="dr_sarah">Dr. Sarah Smith</SelectItem>
                                    <SelectItem value="dr_rohan">Dr. Rohan Mehta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 5: Ward & Room */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Ward</Label>
                            <Select onValueChange={(val) => handleChange("ward", val)}>
                                <SelectTrigger className="bg-white border-blue-100 h-10 [&>svg]:text-[#2CB470] [&>svg]:opacity-100 w-full">
                                    <SelectValue placeholder="Select Ward" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="general">General Ward</SelectItem>
                                    <SelectItem value="private">Private Ward</SelectItem>
                                    <SelectItem value="icu">ICU</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Room</Label>
                            <Select onValueChange={(val) => handleChange("room", val)}>
                                <SelectTrigger className="bg-white border-blue-100 h-10 [&>svg]:text-[#2CB470] [&>svg]:opacity-100 w-full">
                                    <SelectValue placeholder="Select Room" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="101">Room 101</SelectItem>
                                    <SelectItem value="102">Room 102</SelectItem>
                                    <SelectItem value="icu_1">ICU-1</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 6: Bed & Nurse */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Bed</Label>
                            <Select onValueChange={(val) => handleChange("bed", val)}>
                                <SelectTrigger className="bg-white border-blue-100 h-10 [&>svg]:text-[#2CB470] [&>svg]:opacity-100 w-full">
                                    <SelectValue placeholder="Select Bed" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="b01">B-01 (Available)</SelectItem>
                                    <SelectItem value="b02">B-02 (Available)</SelectItem>
                                    <SelectItem value="b03">B-03 (Occupied)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Nurse</Label>
                            <Select onValueChange={(val) => handleChange("nurse", val)}>
                                <SelectTrigger className="bg-white border-blue-100 h-10 [&>svg]:text-[#2CB470] [&>svg]:opacity-100 w-full">
                                    <SelectValue placeholder="Select Nurse" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="nurse_a">Nurse A</SelectItem>
                                    <SelectItem value="nurse_b">Nurse B</SelectItem>
                                </SelectContent>
                            </Select>
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

                <div className="flex justify-end gap-3">
                    <Button variant="outline" className="border-gray-200 text-gray-600 uppercase" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        className="bg-[#2CB470] hover:bg-[#28a063] text-white uppercase font-semibold"
                        disabled={!isFormValid}
                        onClick={handleSubmit}
                    >
                        Admit Patient
                    </Button>
                </div>
            </div>
        </div>
    )
}

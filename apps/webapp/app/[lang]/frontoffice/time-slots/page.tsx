"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { AppSelect } from "@/components/common/app-select";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import Image from "next/image";
import { ShiftCard } from "@/components/doctor/shift-card";
import { useDoctors } from "@/hooks/use-doctors";
import { useDepartments } from "@/hooks/use-departments";
import { Calendar } from "@workspace/ui/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

type DateRange = {
    from: Date | undefined;
    to?: Date | undefined;
};

// Types
interface Shift {
    id: string;
    shift: string;
    slotFor: string;
    fromTime: string;
    toTime: string;
    duration: string;
    applyForDates: {
        start: string;
        end: string;
    };
    days: string[];
    generatedSlots: string[];
}

interface Filters {
    department: string;
    doctor: string;
    dateRange: string;
}

// Dummy data


export default function FrontofficeTimeSlotPage() {
    const router = useRouter();
    const [filters, setFilters] = useState<Filters>({
        department: "all-departments",
        doctor: "all-doctors",
        dateRange: "12-02-2024 - 12-02-2024",
    });
    const [doctorSearchQuery, setDoctorSearchQuery] = useState("");
    const [departmentSearchQuery, setDepartmentSearchQuery] = useState("");
    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
        start: "2024-12-02",
        end: "2024-12-02"
    });
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(undefined);

    // Fetch doctors from API
    const { doctors: doctorOptions, isLoading: doctorsLoading } = useDoctors(doctorSearchQuery);
    const { departments: departmentOptions, isLoading: departmentsLoading } = useDepartments(departmentSearchQuery);

    const [shifts, setShifts] = useState<Shift[]>([]);

    // Helper to format date for display
    const formatDateRange = () => {
        if (!dateRange.start || !dateRange.end) return "Select Date Range";
        try {
            const start = format(new Date(dateRange.start), "dd-MM-yyyy");
            const end = format(new Date(dateRange.end), "dd-MM-yyyy");
            return `${start} - ${end}`;
        } catch {
            return "Select Date Range";
        }
    };

    // Handle date range selection from calendar
    const handleDateRangeSelect = (range: DateRange | undefined) => {
        if (range) {
            setTempDateRange(range);
            if (range.from && range.to) {
                const startDate = format(range.from, "yyyy-MM-dd");
                const endDate = format(range.to, "yyyy-MM-dd");
                setDateRange({ start: startDate, end: endDate });
                setIsCalendarOpen(false);
            }
        }
    };

    // Handle filter changes
    const handleFilterChange = (key: keyof Filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    // Add new shift card
    const handleAddShift = () => {
        const newShift: Shift = {
            id: `shift-${Date.now()}`,
            shift: "morning",
            slotFor: "online",
            fromTime: "09:00AM",
            toTime: "11:00PM",
            duration: "30min",
            applyForDates: {
                start: "12-02-2024",
                end: "12-02-2024",
            },
            days: [],
            generatedSlots: [],
        };
        setShifts((prev) => [...prev, newShift]);
    };

    // Remove shift card
    const handleRemoveShift = (id: string) => {
        setShifts((prev) => prev.filter((shift) => shift.id !== id));
    };

    // Update shift
    const handleUpdateShift = (id: string, updates: Partial<Shift>) => {
        setShifts((prev) =>
            prev.map((shift) => (shift.id === id ? { ...shift, ...updates } : shift))
        );
    };

    return (
        <div className="min-h-screen w-full">
            {/* Header */}
            <div className="px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="bg-[#0095FF] text-white hover:bg-[#0080DD] p-2 rounded"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900">
                        Doctor Appointment Slots
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 space-y-6">

                {/* Top Filters Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-end gap-4 flex-wrap">
                        {/* Department */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Department *
                            </label>
                            <AppSelect
                                placeholder="All Departments"
                                value={filters.department}
                                onChange={(value) => handleFilterChange("department", value)}
                                options={departmentOptions}
                                searchable={true}
                                searchPlaceholder="Search Department"
                                onSearchChange={setDepartmentSearchQuery}
                                triggerClassName="w-full h-10 border-gray-300 bg-white rounded-lg"
                            />
                        </div>

                        {/* Doctor */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Doctor *
                            </label>
                            <AppSelect
                                placeholder="Select Doctor"
                                value={filters.doctor}
                                onChange={(value) => handleFilterChange("doctor", value)}
                                options={doctorOptions}
                                searchable={true}
                                searchPlaceholder="Search Doctor"
                                onSearchChange={setDoctorSearchQuery}
                                triggerClassName="w-full h-10 border-gray-300 bg-white rounded-lg"
                                icon={
                                    <Image
                                        src="/images/stethoscope.svg"
                                        alt="Doctor"
                                        width={18}
                                        height={18}
                                        className="w-[18px] h-[18px]"
                                    />
                                }
                            />
                        </div>

                        {/* Select Date Range */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Date Range *
                            </label>
                            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full h-10 justify-start text-left font-normal border-gray-300 bg-white rounded-lg hover:bg-gray-50"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formatDateRange()}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="range"
                                        selected={tempDateRange}
                                        onSelect={handleDateRangeSelect}
                                        numberOfMonths={2}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* New Button */}
                        <div>
                            <Button
                                onClick={handleAddShift}
                                className="bg-[#0095FF] hover:bg-[#0080DD] text-white h-10 px-6 rounded-lg font-medium text-sm shadow-sm flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                New
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Shift Cards */}
                <div className="space-y-4">
                    {shifts.map((shift) => (
                        <ShiftCard
                            key={shift.id}
                            shift={shift}
                            onRemove={() => handleRemoveShift(shift.id)}
                            onUpdate={(updates) => handleUpdateShift(shift.id, updates)}
                            doctorId={filters.doctor !== "all-doctors" ? filters.doctor : undefined}
                            dateRange={dateRange}
                            onSlotCreated={() => {
                                console.log("Slot created successfully");
                                // Optional: Can navigate back to schedule or show success message
                            }}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {shifts.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">
                            No shifts added yet. Click "New" to add a shift.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}


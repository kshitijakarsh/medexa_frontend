"use client";

import { useState } from "react";
import { AppSelect } from "@/components/common/app-select";
import { Button } from "@workspace/ui/components/button";
import { X, Clock, Check } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { createSlotApiClient } from "@/lib/api/doctor/slots-api";
import type { SlotTimeRange } from "@/lib/api/doctor/slots-api";

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

interface ShiftCardProps {
    shift: Shift;
    onRemove: () => void;
    onUpdate: (updates: Partial<Shift>) => void;
    doctorId?: string;
    dateRange?: { start: string; end: string };
    onSlotCreated?: () => void;
}

const SHIFT_OPTIONS = [
    { label: "Morning", value: "morning" },
    { label: "Evening", value: "evening" },
    { label: "Night", value: "night" },
];

const SLOT_FOR_OPTIONS = [
    { label: "Online Consultation", value: "online" },
    { label: "Doctor Consultation", value: "doctor" },
    { label: "Teleconsultation", value: "tele" },
    { label: "Home Visit", value: "home" },
];

const DURATION_OPTIONS = [
    { label: "15min", value: "15min" },
    { label: "30min", value: "30min" },
    { label: "45min", value: "45min" },
    { label: "1hr", value: "1hr" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function ShiftCard({ shift, onRemove, onUpdate, doctorId, dateRange, onSlotCreated }: ShiftCardProps) {
    const [localShift, setLocalShift] = useState(shift);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generate time slots based on from, to, and duration
    const generateSlots = () => {
        const slots: string[] = [];
        const from = localShift.fromTime;
        const to = localShift.toTime;
        const durationStr = localShift.duration;

        // Parse times
        const parseTime = (timeStr: string) => {
            const match = timeStr.match(/(\d{1,2}):(\d{2})(AM|PM)/i);
            if (!match) return null;

            let hours = parseInt(match[1]!);
            const minutes = parseInt(match[2]!);
            const period = match[3]!.toUpperCase();

            if (period === "PM" && hours !== 12) hours += 12;
            if (period === "AM" && hours === 12) hours = 0;

            return hours * 60 + minutes; // Total minutes from midnight
        };

        // Parse duration
        const parseDuration = (dur: string) => {
            const match = dur.match(/(\d+)(min|hr)/);
            if (!match) return 30; // default

            const value = parseInt(match[1]!);
            const unit = match[2]!;

            return unit === "hr" ? value * 60 : value;
        };

        const startMinutes = parseTime(from);
        const endMinutes = parseTime(to);
        const durationMinutes = parseDuration(durationStr);

        if (startMinutes === null || endMinutes === null) {
            return;
        }

        // Generate slots
        let currentMinutes = startMinutes;
        const actualEndMinutes = endMinutes < startMinutes ? endMinutes + 24 * 60 : endMinutes;

        while (currentMinutes < actualEndMinutes) {
            const nextMinutes = currentMinutes + durationMinutes;

            const formatTime = (mins: number) => {
                const adjustedMins = mins % (24 * 60);
                const hours = Math.floor(adjustedMins / 60);
                const minutes = adjustedMins % 60;

                const period = hours >= 12 ? "PM" : "AM";
                const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

                return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
            };

            const slotStart = formatTime(currentMinutes);
            const slotEnd = formatTime(nextMinutes);

            slots.push(`${slotStart} - ${slotEnd}`);

            currentMinutes = nextMinutes;

            // Safety limit
            if (slots.length > 50) break;
        }

        setLocalShift({ ...localShift, generatedSlots: slots });
        onUpdate({ generatedSlots: slots });
    };

    const toggleDay = (day: string) => {
        const newDays = localShift.days.includes(day)
            ? localShift.days.filter((d) => d !== day)
            : [...localShift.days, day];

        setLocalShift({ ...localShift, days: newDays });
        onUpdate({ days: newDays });
    };

    // Handle Add button click - create slots via API
    const handleAddSlots = async () => {
        if (!doctorId || !dateRange) {
            alert("Please select a doctor and date range");
            return;
        }

        // Validate required fields
        if (!localShift.fromTime || !localShift.toTime || !localShift.duration || localShift.days.length === 0) {
            alert("Please fill in all required fields and select at least one day");
            return;
        }

        setIsSubmitting(true);
        try {
            const apiClient = createSlotApiClient();

            // Convert time to ISO format
            const formatTimeToISO = (timeStr: string, baseDate: string) => {
                const match = timeStr.match(/(\d{1,2}):(\d{2})(AM|PM)/i);
                if (!match) return "";

                let hours = parseInt(match[1]!);
                const minutes = parseInt(match[2]!);
                const period = match[3]!.toUpperCase();

                if (period === "PM" && hours !== 12) hours += 12;
                if (period === "AM" && hours === 12) hours = 0;

                const date = new Date(baseDate);
                date.setHours(hours, minutes, 0, 0);
                return date.toISOString();
            };

            // Parse duration to get end time
            const parseDuration = (dur: string) => {
                const match = dur.match(/(\d+)(min|hr)/);
                if (!match) return 30;
                const value = parseInt(match[1]!);
                const unit = match[2]!;
                return unit === "hr" ? value * 60 : value;
            };

            const durationMinutes = parseDuration(localShift.duration);

            // Create slot time range
            const startTime = formatTimeToISO(localShift.fromTime, dateRange.start);
            const startDate = new Date(startTime);
            const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

            const slots: SlotTimeRange[] = [{
                startTime: startDate.toISOString(),
                endTime: endDate.toISOString()
            }];

            // Convert day names (Sun, Mon, etc.)
            const applyFor = localShift.days;

            const payload = {
                doctorId: doctorId,
                startDate: dateRange.start,
                endDate: dateRange.end,
                slotVisitType: "doctor_consultation",
                slots: slots,
                applyFor: applyFor
            };

            const response = await apiClient.createSlots(payload);

            console.log("Slots created successfully:", response.data);
            alert(`Success! ${response.data.data.count} slots created`);

            if (onSlotCreated) {
                onSlotCreated();
            }
        } catch (error) {
            console.error("Error creating slots:", error);
            alert(`Error creating slots: ${error instanceof Error ? error.message : "Unknown error"}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
            {/* Remove Button */}
            <button
                onClick={onRemove}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
                <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Main Grid */}
            <div className="grid grid-cols-3 gap-6">
                {/* Left Section (2 columns) */}
                <div className="col-span-2 space-y-4">
                    {/* Shift and Slot For Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Shift
                            </label>
                            <AppSelect
                                placeholder="Select Shift"
                                value={localShift.shift}
                                onChange={(value) => {
                                    setLocalShift({ ...localShift, shift: value });
                                    onUpdate({ shift: value });
                                }}
                                options={SHIFT_OPTIONS}
                                triggerClassName="w-full h-10 border-gray-300 bg-white rounded-lg"
                            />
                        </div>

                        <div className="w-[90%]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Slot For
                            </label>
                            <AppSelect
                                placeholder="Select Slot Type"
                                value={localShift.slotFor}
                                onChange={(value) => {
                                    setLocalShift({ ...localShift, slotFor: value });
                                    onUpdate({ slotFor: value });
                                }}
                                options={SLOT_FOR_OPTIONS}
                                triggerClassName="w-full h-10 border-gray-300 bg-white rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Time and Duration Row */}
                    {/* Time and Duration Row */}
                    <div className="flex items-end gap-4">
                        <div className="flex-[3]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                From
                            </label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    value={localShift.fromTime}
                                    onChange={(e) => {
                                        setLocalShift({ ...localShift, fromTime: e.target.value });
                                        onUpdate({ fromTime: e.target.value });
                                    }}
                                    className="h-10 pr-10"
                                    placeholder="09:00AM"
                                />
                                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        <div className="flex items-center justify-center pb-2">
                            <span className="text-gray-500">To</span>
                        </div>

                        <div className="flex-[3]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                To
                            </label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    value={localShift.toTime}
                                    onChange={(e) => {
                                        setLocalShift({ ...localShift, toTime: e.target.value });
                                        onUpdate({ toTime: e.target.value });
                                    }}
                                    className="h-10 pr-10"
                                    placeholder="11:00PM"
                                />
                                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        <div className="flex-[4] pb-0">
                            <div className="flex items-center justify-between h-10 pl-2 pr-1 bg-[#E0F2FE] rounded-lg border border-transparent gap-6">
                                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Duration</span>
                                <div className="flex-1">
                                    <AppSelect
                                        placeholder="30min"
                                        value={localShift.duration}
                                        onChange={(value) => {
                                            setLocalShift({ ...localShift, duration: value });
                                            onUpdate({ duration: value });
                                        }}
                                        options={DURATION_OPTIONS}
                                        triggerClassName="w-full h-8 border border-gray-200 bg-white rounded-md px-2.5 py-0 focus:ring-0 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pb-0">
                            <Button
                                onClick={generateSlots}
                                className="h-9 w-9 bg-[#22C55E] hover:bg-[#16A34A] rounded-lg p-0 flex items-center justify-center shadow-none"
                            >
                                <img src="/images/add_task.svg" alt="Add" className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Sample Slot Preview */}
                    {localShift.generatedSlots.length > 0 && (
                        <div className="mt-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Sample Slot Preview
                            </h4>
                            <div className="grid grid-cols-3 gap-2">
                                {localShift.generatedSlots.map((slot, index) => (
                                    <div
                                        key={index}
                                        className="text-xs text-gray-700 bg-gray-50 px-2 py-1.5 rounded border border-gray-200"
                                    >
                                        {slot}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Section (1 column) - Apply For */}
                <div className="col-span-1">
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-700">Apply For</h4>

                        {/* Date Range Display */}
                        <div className="text-sm text-gray-600">
                            {localShift.applyForDates.start} To {localShift.applyForDates.end}
                        </div>

                        {/* Day Checkboxes */}
                        <div className="space-y-1.5">
                            {DAYS.map((day) => (
                                <label
                                    key={day}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-1 py-0.5 rounded"
                                >
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={localShift.days.includes(day)}
                                            onChange={() => toggleDay(day)}
                                            className="w-5 h-5 rounded border-2 border-gray-300 text-green-500 focus:ring-0 focus:ring-offset-0 checked:bg-green-500 checked:border-green-500 cursor-pointer"
                                            style={{
                                                appearance: 'none',
                                                WebkitAppearance: 'none',
                                                backgroundImage: localShift.days.includes(day) ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\' fill=\'white\'%3E%3Cpath fill-rule=\'evenodd\' d=\'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z\' clip-rule=\'evenodd\' /%3E%3C/svg%3E")' : 'none',
                                                backgroundSize: '100% 100%',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-700">{day}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Button - Bottom Right */}
            <div className="mt-6 flex justify-end">
                <Button
                    onClick={handleAddSlots}
                    disabled={isSubmitting}
                    className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-8 py-2 rounded-lg font-medium text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Creating..." : "Add"}
                </Button>
            </div>
        </div>
    );
}

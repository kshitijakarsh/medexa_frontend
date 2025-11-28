"use client"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

interface AvailableSlotGridProps {
  slots: string[]
  selectedSlot: string | null
  onSlotSelect: (slot: string) => void
}

// Generate mock time slots
const generateTimeSlots = (): string[] => {
  const slots: string[] = []
  const startHour = 8
  const endHour = 18
  const slotDuration = 20 // minutes

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const startTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      const endMinute = minute + slotDuration
      const endHourAdjusted = endMinute >= 60 ? hour + 1 : hour
      const endMinuteAdjusted = endMinute >= 60 ? endMinute - 60 : endMinute
      const endTime = `${endHourAdjusted.toString().padStart(2, "0")}:${endMinuteAdjusted.toString().padStart(2, "0")}`
      slots.push(`${startTime}-${endTime}`)
    }
  }

  return slots.slice(0, 15) // Return first 15 slots
}

export function AvailableSlotGrid({
  slots,
  selectedSlot,
  onSlotSelect,
}: AvailableSlotGridProps) {
  const defaultSlots = generateTimeSlots()
  const displaySlots = slots.length > 0 ? slots : defaultSlots

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-800">Available Slot</h3>
      <div className="grid grid-cols-5 gap-2">
        {displaySlots.map((slot, index) => (
          <Button
            key={index}
            variant={selectedSlot === slot ? "default" : "outline"}
            onClick={() => onSlotSelect(slot)}
            className={cn(
              "h-10 text-xs font-medium rounded-lg transition-all",
              selectedSlot === slot
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-[#ECF3FF] text-gray-700 border-blue-200 hover:bg-blue-50"
            )}
          >
            {slot}
          </Button>
        ))}
      </div>
    </div>
  )
}


"use client"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

interface AvailableSlotGridProps {
  slots: string[]
  selectedSlot: string | null
  onSlotSelect: (slot: string) => void
}

export function AvailableSlotGrid({
  slots,
  selectedSlot,
  onSlotSelect,
}: AvailableSlotGridProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-800">Available Slot</h3>
      {slots.length > 0 ? (
        <div className="grid grid-cols-5 gap-2">
          {slots.map((slot, index) => (
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
      ) : (
        <div className="p-4 text-center text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
          No available slots found for the selected date and doctor.
        </div>
      )}
    </div>
  )
}


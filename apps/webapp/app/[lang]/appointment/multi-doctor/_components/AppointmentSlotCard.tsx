"use client"

import { useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Check, Clock, Eye, X, Plus, Minus, User, CreditCard, Phone, FileText, Ban, Pencil, Calendar, Trash2, MoreVertical, PlusCircle } from "lucide-react"

interface PatientData {
  name: string
  id?: string
  phone?: string
  reason?: string
}

interface AppointmentSlotCardProps {
  slotNumber: number
  time: string
  isBooked: boolean
  patientData?: PatientData
  onAdd?: () => void
  onCancel?: () => void
  onView?: () => void
  onConfirm?: () => void
  onReschedule?: () => void
  status?: "confirmed" | "pending" | "waiting"
  isSelected?: boolean
}

export function AppointmentSlotCard({
  slotNumber,
  time,
  isBooked,
  patientData,
  onAdd,
  onCancel,
  onView,
  onConfirm,
  onReschedule,
  status = "pending",
  isSelected = false,
}: AppointmentSlotCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (isBooked && patientData) {
    return (
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "bg-white border rounded-xl p-3.5 shadow-sm space-y-3 transition-shadow cursor-pointer",
          isExpanded ? "border-blue-100 shadow-md" : "border-blue-100 hover:shadow-md"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 text-base flex items-center justify-center font-bold">
              {slotNumber}
            </div>
            <span className="text-base font-bold text-black whitespace-nowrap">{time}</span>
          </div>
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
              title="View"
              onClick={onView}
            >
              <Eye className="h-4.5 w-4.5" />
            </button>
            {isExpanded && (
              <>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 hover:bg-cyan-200 transition-colors"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={onReschedule}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                  title="Reschedule"
                >
                  <Calendar className="h-4.5 w-4.5" />
                </button>
              </>
            )}
            <button
              onClick={onCancel}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            {isExpanded && (
              <button
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="More"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Patient Details */}
        {isExpanded && (
          <div className="space-y-2 pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
            {patientData.name && (
              <div className="flex items-center gap-2.5 text-sm text-gray-700">
                <User className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-[#001A4D]">{patientData.name}</span>
              </div>
            )}
            {patientData.id && (
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <CreditCard className="h-4 w-4 text-blue-500" />
                <span>{patientData.id}</span>
              </div>
            )}
            {patientData.phone && (
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-blue-500" />
                <span>{patientData.phone}</span>
              </div>
            )}
            {patientData.reason && (
              <div className="flex items-start gap-2.5 text-sm text-gray-600">
                <FileText className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <span className="line-clamp-2 leading-tight">{patientData.reason}</span>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Available slot
  return (
    <div className={cn(
      "border rounded-xl p-3 transition-all duration-200",
      isSelected
        ? "bg-blue-50 border-blue-200 shadow-sm"
        : "bg-white border-transparent hover:border-gray-100" // Cleaner default state
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-8 h-8 rounded-lg text-sm flex items-center justify-center font-bold transition-colors",
            isSelected ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-500"
          )}>
            {slotNumber}
          </div>
          <span className="text-base font-extrabold text-[#001A4D]">{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel} // Assuming cancel here means 'Block Slot' or similar generic negative action
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
            title="Block Slot"
          >
            <Ban className="h-5 w-5 stroke-[1.5]" />
          </button>
          <button
            onClick={onAdd}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-lg transition-colors border",
              isSelected
                ? "bg-green-500 hover:bg-green-600 text-white border-transparent"
                : "bg-blue-50 hover:bg-blue-100 text-blue-500 border-transparent"
            )}
            title="Book Slot"
          >
            {isSelected ? <Check className="h-5 w-5 stroke-[2.5]" /> : <Plus className="h-5 w-5 stroke-[2.5]" />}
          </button>
        </div>
      </div>
    </div>
  )
}


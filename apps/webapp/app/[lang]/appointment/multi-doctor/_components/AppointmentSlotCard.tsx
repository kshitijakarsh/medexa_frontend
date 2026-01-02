"use client"

import { cn } from "@workspace/ui/lib/utils"
import { Check, Clock, Eye, X, Plus, Minus, User, CreditCard, Phone, FileText } from "lucide-react"

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
  status?: "confirmed" | "pending" | "waiting"
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
  status = "pending",
}: AppointmentSlotCardProps) {
  if (isBooked && patientData) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
        {/* Slot Number and Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-semibold">
              {slotNumber}
            </div>
            <span className="text-sm font-medium text-gray-800">{time}</span>
          </div>
          <div className="flex items-center gap-1">
            {status === "confirmed" && (
              <button
                onClick={onConfirm}
                className="p-1 hover:bg-green-50 rounded"
                title="Confirmed"
              >
                <Check className="h-4 w-4 text-green-600" />
              </button>
            )}
            {status === "pending" && (
              <button
                onClick={onConfirm}
                className="p-1 hover:bg-blue-50 rounded"
                title="Pending"
              >
                <Clock className="h-4 w-4 text-blue-600" />
              </button>
            )}
            <button
              onClick={onView}
              className="p-1 hover:bg-blue-50 rounded"
              title="View Details"
            >
              <Eye className="h-4 w-4 text-blue-600" />
            </button>
            <button
              onClick={onCancel}
              className="p-1 hover:bg-red-50 rounded"
              title="Cancel"
            >
              <X className="h-4 w-4 text-red-600" />
            </button>
          </div>
        </div>

        {/* Patient Details */}
        <div className="space-y-1.5 pt-2 border-t border-gray-100">
          {patientData.name && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <User className="h-3.5 w-3.5 text-gray-400" />
              <span>{patientData.name}</span>
            </div>
          )}
          {patientData.id && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <CreditCard className="h-3.5 w-3.5 text-gray-400" />
              <span>{patientData.id}</span>
            </div>
          )}
          {patientData.phone && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Phone className="h-3.5 w-3.5 text-gray-400" />
              <span>{patientData.phone}</span>
            </div>
          )}
          {patientData.reason && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <FileText className="h-3.5 w-3.5 text-gray-400" />
              <span className="line-clamp-2">{patientData.reason}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Available slot
  return (
    <div className="bg-[#ECF3FF] border border-blue-200 rounded-lg p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-semibold">
            {slotNumber}
          </div>
          <span className="text-sm font-medium text-gray-800">{time}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onCancel}
            className="p-1 hover:bg-red-100 rounded-full"
            title="Unavailable"
          >
            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
              <Minus className="h-3 w-3 text-white" />
            </div>
          </button>
          <button
            onClick={onAdd}
            className="p-1 hover:bg-blue-100 rounded-full"
            title="Add Appointment"
          >
            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
              <Plus className="h-3 w-3 text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}


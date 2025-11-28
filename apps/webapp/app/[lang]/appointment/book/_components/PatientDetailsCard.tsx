"use client"

import { UserAvatar } from "@/components/common/pasient-card/user-avatar"
import { CardBlock } from "@/components/common/pasient-card/card-block"
import { Calendar } from "lucide-react"

interface Patient {
  id: string
  name: string
  patientId: string
  cprNid: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  maritalStatus: string
  nationality: string
  phone: string
  email: string
  address: string
  avatar?: string
}

interface LastVisit {
  referringDoctor: string
  lastVisitDate: string
  lastDiagnosis: string
  lastPrescription: string
}

interface PatientDetailsCardProps {
  patient: Patient
}

// Mock last visit data
const mockLastVisit: LastVisit = {
  referringDoctor: "Dr. Rohan Mehta",
  lastVisitDate: "2025-08-12",
  lastDiagnosis: "Upper Respiratory Infection",
  lastPrescription: "Tab. Paracetamol, Tab. Cetirizine",
}

export function PatientDetailsCard({ patient }: PatientDetailsCardProps) {
  const getInitials = (name: string) => {
    const parts = name.split(" ").filter(Boolean)
    if (parts.length >= 2) {
      return `${parts[0]?.[0] || ""}${parts[parts.length - 1]?.[0] || ""}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="space-y-4">
      {/* Patient Details */}
      <CardBlock className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <UserAvatar
            src={patient.avatar || ""}
            alt={patient.name}
            size={60}
            fallback={getInitials(patient.name)}
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">
              {patient.name}
            </h3>
            <p className="text-sm text-gray-500">{patient.patientId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">CPR/NID:</span>{" "}
            <span className="font-medium text-gray-800">{patient.cprNid}</span>
          </div>
          <div>
            <span className="text-gray-600">Date Of Birth:</span>{" "}
            <span className="font-medium text-gray-800">
              {patient.dateOfBirth}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Gender:</span>{" "}
            <span className="font-medium text-gray-800">{patient.gender}</span>
          </div>
          <div>
            <span className="text-gray-600">Blood Group:</span>{" "}
            <span className="font-medium text-gray-800">
              {patient.bloodGroup}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Marital Status:</span>{" "}
            <span className="font-medium text-gray-800">
              {patient.maritalStatus}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Nationality:</span>{" "}
            <span className="font-medium text-gray-800">
              {patient.nationality}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Phone:</span>{" "}
            <span className="font-medium text-gray-800">{patient.phone}</span>
          </div>
          <div>
            <span className="text-gray-600">Email:</span>{" "}
            <span className="font-medium text-gray-800">{patient.email}</span>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-600">Address:</span>{" "}
            <span className="font-medium text-gray-800">{patient.address}</span>
          </div>
        </div>
      </CardBlock>

      {/* Last Visit Summary */}
      <CardBlock className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Last Visit Summary
          </h3>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-600">Referring Doctor:</span>{" "}
            <span className="font-medium text-gray-800">
              {mockLastVisit.referringDoctor}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Last Visit Date:</span>{" "}
            <span className="font-medium text-gray-800">
              {mockLastVisit.lastVisitDate}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Last Diagnosis:</span>{" "}
            <span className="font-medium text-gray-800">
              {mockLastVisit.lastDiagnosis}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Last Prescription:</span>{" "}
            <span className="font-medium text-gray-800">
              {mockLastVisit.lastPrescription}
            </span>
          </div>
        </div>
      </CardBlock>
    </div>
  )
}


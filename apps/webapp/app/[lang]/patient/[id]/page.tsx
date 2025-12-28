"use client"

import { Header } from "@/components/header"
import { PageHeader } from "@/components/common/page-header"
import { useParams, useRouter } from "next/navigation"
import { usePatientById } from "../_hooks/usePatient"
import Button from "@/components/ui/button"
import { ArrowLeft, Edit, Printer } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"

export default function ViewPatientPage() {
  const params = useParams<{ lang?: string; id: string }>()
  const router = useRouter()
  const lang = params?.lang || "en"
  const patientId = params?.id

  const { data: patient, isLoading } = usePatientById(patientId)

  const getInitials = (name: string) => {
    const parts = name.split(" ").filter(Boolean)
    if (parts.length >= 2) {
      return `${parts[0]?.[0] || ""}${parts[parts.length - 1]?.[0] || ""}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const calculateAge = (dob?: string) => {
    if (!dob) return "N/A"
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }
    return `${age} Years`
  }

  if (isLoading) {
    return (
      <main className="min-h-svh w-full">
        <Header />
        <div className="p-2 py-6 space-y-8 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
          <PageHeader title="Patient Details" />
          <div className="bg-white p-5 rounded-md shadow-sm">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!patient) {
    return (
      <main className="min-h-svh w-full">
        <Header />
        <div className="p-2 py-6 space-y-8 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
          <PageHeader title="Patient Details" />
          <div className="bg-white p-5 rounded-md shadow-sm">
            <p className="text-center text-gray-500">Patient not found</p>
          </div>
        </div>
      </main>
    )
  }

  const patientName = patient.full_name || `${patient.first_name} ${patient.last_name || ""}`.trim()

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-2 py-6 space-y-8 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
        <PageHeader title="Patient Details" />

        <div className="bg-white p-5 rounded-md shadow-sm">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => router.push(`/${lang}/patient/edit/${patientId}`)}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </Button>
            </div>
          </div>

          {/* Patient Header */}
          <div className="flex items-start gap-6 mb-8">
            <Avatar className="h-24 w-24">
              <AvatarImage src={patient.photo_url} alt={patientName} />
              <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl font-medium">
                {getInitials(patientName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{patientName}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>MRN: {patient.civil_id}</span>
                <span>•</span>
                <span className="capitalize">{patient.gender || "N/A"}</span>
                <span>•</span>
                <span>{calculateAge(patient.dob)}</span>
                <span>•</span>
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium capitalize">
                  {typeof patient.status === 'object' ? (patient.status as any)?.name || 'Active' : patient.status || 'Active'}
                </span>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoItem label="Category" value={typeof patient.category === 'object' ? (patient.category as any)?.name || 'General' : patient.category_id || 'General'} />
                <InfoItem label="Date of Birth" value={patient.dob || "N/A"} />
                <InfoItem label="Blood Group" value={patient.blood_group || "N/A"} />
                <InfoItem label="Nationality" value={patient.country?.name_en || 'N/A'} />
              </div>
            </div>

            {/* Identification */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Identification
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoItem label="Civil ID" value={patient.civil_id} />
                <InfoItem label="Passport Number" value={patient.passport_number || "N/A"} />
                <InfoItem label="Issuing Country" value={patient.issuing_country?.name_en || 'N/A'} />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoItem label="Mobile Number" value={patient.mobile_number} />
                <InfoItem label="Alternate Number" value={patient.alternate_number || "N/A"} />
                <InfoItem label="Email" value={patient.email || "N/A"} />
                <InfoItem label="Emergency Contact" value={patient.emergency_contact || "N/A"} />
                <InfoItem label="City" value={patient.city || "N/A"} />
                <InfoItem label="Postal Code" value={patient.postal_code || "N/A"} />
                <InfoItem label="Address" value={patient.permanent_address || "N/A"} className="md:col-span-2 lg:col-span-3" />
              </div>
            </div>

            {/* Insurance Information */}
            {patient.insurance_provider_id && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Insurance Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoItem label="Provider" value={typeof patient.insurance_provider_id === 'object' ? (patient.insurance_provider_id as any)?.name || 'N/A' : patient.insurance_provider_id || 'N/A'} />
                <InfoItem label="Plan Type" value={typeof patient.plan_type === 'object' ? (patient.plan_type as any)?.name || 'N/A' : patient.plan_type || 'N/A'} />
                  <InfoItem label="Policy Number" value={patient.policy_number || "N/A"} />
                  <InfoItem label="Policy Validity" value={patient.policy_validity || "N/A"} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function InfoItem({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`${className}`}>
      <dt className="text-sm font-medium text-gray-500 mb-1">{label}</dt>
      <dd className="text-sm text-gray-900">{value}</dd>
    </div>
  )
}

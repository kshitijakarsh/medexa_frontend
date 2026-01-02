"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/common/page-header"
import { FormInput } from "@/components/ui/form-input"
import { FormSelect } from "@/components/ui/form-select"
import { FormDate } from "@/components/ui/form-date"
import { StatusSwitch } from "@/components/common/switch-green"
import { UploadCard } from "@/components/common/upload-card"
import { CancelButton } from "@/components/common/cancel-button"
import Button from "@/components/ui/button"
import { CheckCircle2, Calendar, Printer } from "lucide-react"
import { useCreatePatient } from "../_hooks/usePatient"
import { useCountries } from "../_hooks/useCountries"
import { usePatientCategories } from "../_hooks/usePatientCategories"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { LinkFamilyModal } from "./_components/link-family-modal"


export default function AddPatientPage() {
  const router = useRouter()
  const params = useParams<{ lang?: string }>()
  const searchParams = useSearchParams()
  const lang = params?.lang || "en"
  const visitType = searchParams.get("visitType") || ""
  const [isSuccess, setIsSuccess] = useState(false)
  const [createdPatientId, setCreatedPatientId] = useState<string>("")
  const [mrn, setMrn] = useState<string>("")
  const [showLinkFamilyModal, setShowLinkFamilyModal] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    category: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    bloodGroup: "",
    civilId: "",
    passportNumber: "",
    issuingCountry: "",
    mobile: "",
    alternativePhone: "",
    email: "",
    emergencyContact: "",
    city: "",
    postalCode: "",
    permanentAddress: "",
    hasInsurance: true,
    insuranceProvider: "",
    planType: "",
    policyNumber: "",
    policyValidity: "",
    patientPhoto: null as File | null,
    insuranceCard: null as File | null,
  })

  // Calculate age from date of birth
  const age = useMemo(() => {
    if (!formData.dateOfBirth) return 0
    const birthDate = new Date(formData.dateOfBirth)
    const today = new Date()
    let calculatedAge = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--
    }
    return calculatedAge
  }, [formData.dateOfBirth])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileSelect =
    (field: "patientPhoto" | "insuranceCard") => (file: File | null) => {
      setFormData((prev) => ({ ...prev, [field]: file }))
    }

  const createMutation = useCreatePatient()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = {
        category_id: formData.category,
        first_name: formData.firstName,
        last_name: formData.lastName,
        dob: formData.dateOfBirth,
        gender: formData.gender,
        country_id: formData.nationality,
        blood_group: formData.bloodGroup,
        civil_id: formData.civilId,
        passport_number: formData.passportNumber,
        issuing_country_id: formData.issuingCountry,
        mobile_number: formData.mobile,
        alternate_number: formData.alternativePhone,
        email: formData.email,
        emergency_contact: formData.emergencyContact,
        city: formData.city,
        postal_code: formData.postalCode,
        permanent_address: formData.permanentAddress,
        insurance_provider_id: formData.hasInsurance ? formData.insuranceProvider : undefined,
        plan_type: formData.hasInsurance ? formData.planType : undefined,
        policy_number: formData.hasInsurance ? formData.policyNumber : undefined,
        policy_validity: formData.hasInsurance ? formData.policyValidity : undefined,
        photo_url: formData.patientPhoto ? URL.createObjectURL(formData.patientPhoto) : undefined,
        insurance_card_url: formData.insuranceCard ? URL.createObjectURL(formData.insuranceCard) : undefined,
        status: "active",
      }

      const response = await createMutation.mutateAsync(payload)

      if (response.success && response.data) {
        setCreatedPatientId(response.data.id)
        setMrn(response.data.civil_id || response.data.id)
        setIsSuccess(true)
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to create patient. Please try again.")
      console.error("Create patient error:", error)
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
    setMrn("")
    setFormData({
      category: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      nationality: "",
      bloodGroup: "",
      civilId: "",
      passportNumber: "",
      issuingCountry: "",
      mobile: "",
      alternativePhone: "",
      email: "",
      emergencyContact: "",
      city: "",
      postalCode: "",
      permanentAddress: "",
      hasInsurance: true,
      insuranceProvider: "",
      planType: "",
      policyNumber: "",
      policyValidity: "",
      patientPhoto: null,
      insuranceCard: null,
    })
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCancel = () => {
    if (isSuccess) {
      resetForm()
    } else {
      router.back()
    }
  }

  const handlePrintIdCard = () => {
    // TODO: Implement print ID card functionality
    console.log("Print ID Card for MRN:", mrn)
  }

  // Set default values based on visitType from query params
  useEffect(() => {
    if (visitType) {
      switch (visitType) {
        case "emergency":
          setFormData((prev) => ({
            ...prev,
            category: "emergency",
          }))
          break
        case "walkin":
          setFormData((prev) => ({
            ...prev,
            category: "outpatient",
          }))
          break
        case "appointment":
          setFormData((prev) => ({
            ...prev,
            category: "outpatient",
          }))
          break
        default:
          break
      }
    }
  }, [visitType])

  const handleBookAppointment = () => {
    // Navigate to book appointment page with visitType if available
    const visitTypeParam = visitType ? `?visitType=${visitType}` : ""
    router.push(`/${lang}/appointment/book${visitTypeParam}`)
  }

  // Options for dropdowns
  const { data: countries } = useCountries()
  const { data: categories } = usePatientCategories()

  const patientCategories =
    categories?.map((c) => ({ value: String(c.id), label: c.name })) ?? []

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]

  const nationalities =
    countries?.map((c) => ({ value: String(c.id), label: c.name_en })) ?? [
      { value: "qa", label: "Qatar" },
      { value: "sa", label: "Saudi Arabia" },
      { value: "ae", label: "UAE" },
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
    ]

  const bloodGroups = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ]

  const insuranceProviders = [
    { value: "12312", label: "Insurance Company 1" },
    { value: "123123", label: "Insurance Company 2" },
    { value: "123123123", label: "Insurance Company 3" },
  ]

  const planTypes = [
    { value: "basic", label: "Basic" },
    { value: "premium", label: "Premium" },
    { value: "gold", label: "Gold" },
  ]

  const cities = [
    { value: "doha", label: "Doha" },
    { value: "al-rayyan", label: "Al Rayyan" },
    { value: "al-wakrah", label: "Al Wakrah" },
    { value: "al-khor", label: "Al Khor" },
  ]

  if (isSuccess) {
    return (
      <main className="min-h-svh w-full bg-white">
        <Header />
        <div className="p-2 py-6 space-y-8 bg-white min-h-screen">
          <PageHeader title="Register New Patient" />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="max-w-lg w-full text-center space-y-8 py-12">
              {/* Success Icon */}
              <div className="flex justify-center">
                <Image
                  src="/images/tick.svg"
                  alt="Success"
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Registration Successful!
                </h2>
                <p className="text-gray-600">
                  Patient has been registered successfully
                </p>
              </div>

              {/* MRN Display */}
              <div className="bg-[#EFF6FF] rounded-lg py-6 px-8 mx-auto max-w-xs">
                <p className="text-sm text-gray-700 mb-2 font-medium">
                  Medical Record Number
                </p>
                <p className="text-3xl font-bold text-gray-900">{mrn}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 max-w-sm mx-auto px-4">
                {/* Row 1: Print Hospital ID and Link Family */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={handlePrintIdCard}
                    className="flex items-center justify-start gap-3 px-6 py-4 rounded-full border-2 border-blue-500 text-blue-600 font-medium hover:bg-blue-50"
                  >
                    <Printer className="w-5 h-5" />
                    Print Hospital ID
                  </Button>

                  <Button
                    onClick={() => setShowLinkFamilyModal(true)}
                    className="flex items-center justify-start gap-3 px-2 py-4 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600"
                  >
                    <Image
                      src="/images/linkfam.svg"
                      alt="Link Family"
                      width={24}
                      height={24}
                      className="w-8 h-8"
                    />
                    Link Family
                  </Button>
                </div>

                {/* Row 2: Add Visit (Full Width) */}
                <Button
                  onClick={handleBookAppointment}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#44B678] text-white font-medium hover:bg-[#3a9d66]"
                >
                  <Calendar className="w-5 h-5" />
                  Add Visit
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Link Family Modal */}
        <LinkFamilyModal
          open={showLinkFamilyModal}
          onClose={() => setShowLinkFamilyModal(false)}
          currentPatientId={createdPatientId}
          currentPatientMrn={mrn}
        />
      </main>
    )
  }

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-2 py-6 space-y-8 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
        <PageHeader title="Register New Patient" />

        <div className="bg-white p-5 rounded-md shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Patient Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Basic Patient Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormSelect
                  label="Category"
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  placeholder="Select Patient Category"
                  options={patientCategories}
                />
                <FormInput
                  label="First Name"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="Enter First Name"
                />
                <FormInput
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  placeholder="Enter Last Name"
                />
                <FormDate
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  placeholder="DD/MM/YYYY"
                />
                <FormInput
                  label="Age (calculated)"
                  value={age.toString()}
                  readOnly
                  className="bg-gray-50"
                />
                <FormSelect
                  label="Gender"
                  required
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  placeholder="Select Gender"
                  options={genders}
                />
                <FormSelect
                  label="Nationality"
                  required
                  value={formData.nationality}
                  onValueChange={(value) =>
                    handleInputChange("nationality", value)
                  }
                  placeholder="Select Nationality"
                  options={nationalities}
                />
                <FormSelect
                  label="Blood Group"
                  value={formData.bloodGroup}
                  onValueChange={(value) =>
                    handleInputChange("bloodGroup", value)
                  }
                  placeholder="Select Blood Group"
                  options={bloodGroups}
                />
              </div>
            </div>

            {/* Identification Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Identification Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormInput
                  label="Civil ID"
                  required
                  value={formData.civilId}
                  onChange={(e) => handleInputChange("civilId", e.target.value)}
                  placeholder="Enter Civil ID"
                />
                <FormInput
                  label="Passport Number"
                  value={formData.passportNumber}
                  onChange={(e) =>
                    handleInputChange("passportNumber", e.target.value)
                  }
                  placeholder="Enter Passport Number"
                />
                <FormSelect
                  label="Country"
                  value={formData.issuingCountry}
                  onValueChange={(value) =>
                    handleInputChange("issuingCountry", value)
                  }
                  placeholder="Issuing country"
                  options={nationalities}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormInput
                  label="Mobile (Preferred)"
                  required
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  placeholder="Enter Mobile Number"
                />
                <FormInput
                  label="Alternative Phone"
                  type="tel"
                  value={formData.alternativePhone}
                  onChange={(e) =>
                    handleInputChange("alternativePhone", e.target.value)
                  }
                  placeholder="Enter Alternative Phone"
                />
                <FormInput
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="patient@example.com"
                />
                <FormInput
                  label="Emergency Contact"
                  value={formData.emergencyContact}
                  onChange={(e) =>
                    handleInputChange("emergencyContact", e.target.value)
                  }
                  placeholder="Enter Emergency Contact"
                />
                <FormSelect
                  label="City"
                  value={formData.city}
                  onValueChange={(value) => handleInputChange("city", value)}
                  placeholder="Enter City"
                  options={cities}
                />
                <FormInput
                  label="Postal Code"
                  value={formData.postalCode}
                  onChange={(e) =>
                    handleInputChange("postalCode", e.target.value)
                  }
                  placeholder="Enter Postal Code"
                />
                <div className="md:col-span-2 lg:col-span-3">
                  <FormInput
                    label="Permanent Address"
                    value={formData.permanentAddress}
                    onChange={(e) =>
                      handleInputChange("permanentAddress", e.target.value)
                    }
                    placeholder="Enter Address"
                  />
                </div>
              </div>
            </div>

            {/* Insurance */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Insurance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">Insurance ?</label>
                  <StatusSwitch
                    checked={formData.hasInsurance}
                    onCheckedChange={(checked) =>
                      handleInputChange("hasInsurance", checked)
                    }
                  />
                </div>
                {formData.hasInsurance && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormSelect
                      label="Insurance Provider"
                      value={formData.insuranceProvider}
                      onValueChange={(value) =>
                        handleInputChange("insuranceProvider", value)
                      }
                      placeholder="Select Insurance Company"
                      options={insuranceProviders}
                    />
                    <FormSelect
                      label="Plan Type"
                      value={formData.planType}
                      onValueChange={(value) =>
                        handleInputChange("planType", value)
                      }
                      placeholder="Select Plan Type"
                      options={planTypes}
                    />
                    <FormInput
                      label="Policy Number"
                      value={formData.policyNumber}
                      onChange={(e) =>
                        handleInputChange("policyNumber", e.target.value)
                      }
                      placeholder="Enter Policy Number"
                    />
                    <FormDate
                      label="Policy Validity"
                      value={formData.policyValidity}
                      onChange={(e) =>
                        handleInputChange("policyValidity", e.target.value)
                      }
                      placeholder="DD-MM-YYYY"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Patient Photo / Insurance Card */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Patient Photo / Insurance card (Uploads)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient Photo</label>
                  <UploadCard
                    title="Patient Photo"
                    onFileSelect={handleFileSelect("patientPhoto")}
                    value={formData.patientPhoto}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Insurance card</label>
                  <UploadCard
                    title="Insurance card"
                    onFileSelect={handleFileSelect("insuranceCard")}
                    value={formData.insuranceCard}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <CancelButton onClick={handleCancel} />
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creating Patient..." : "GENERATE MRN"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

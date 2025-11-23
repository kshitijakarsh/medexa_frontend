"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/common/PageHeader"
import { FormInput } from "@/components/ui/form-input"
import { FormSelect } from "@/components/ui/form-select"
import { FormDate } from "@/components/ui/form-date"
import { StatusSwitch } from "@/components/common/switch-green"
import { UploadCard } from "@/components/common/upload-card"
import { CancelButton } from "@/components/common/cancel-button"
import Button from "@/components/ui/button"
import { CheckCircle2, Calendar, Printer } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddPatientPage() {
  const router = useRouter()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mrn, setMrn] = useState<string>("")

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate mock MRN
    const generatedMrn = `MRN-${Math.floor(Math.random() * 9000) + 1000}`
    setMrn(generatedMrn)
    setIsSuccess(true)
    setIsSubmitting(false)
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

  const handleBookAppointment = () => {
    // Reset form state to allow adding a new patient
    resetForm()
  }

  // Options for dropdowns
  const patientCategories = [
    { value: "inpatient", label: "Inpatient" },
    { value: "outpatient", label: "Outpatient" },
    { value: "emergency", label: "Emergency" },
  ]

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]

  const nationalities = [
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
    { value: "provider1", label: "Insurance Company 1" },
    { value: "provider2", label: "Insurance Company 2" },
    { value: "provider3", label: "Insurance Company 3" },
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
      <main className="min-h-svh w-full">
        <Header />
        <div className="p-2 py-6 space-y-8 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
          <PageHeader title="Register New Patient" />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-white p-8 rounded-md shadow-sm max-w-md w-full text-center space-y-6">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  Registration Successful!
                </h2>
                <p className="text-gray-600">
                  Patient has been registered successfully
                </p>
              </div>

              {/* MRN Display */}
              <div className="bg-[#ECF3FF] rounded-lg p-6 border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">
                  Medical Record Number
                </p>
                <p className="text-3xl font-bold text-gray-800">{mrn}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={handlePrintIdCard}
                  className="flex items-center gap-2 text-blue-600 border-blue-500 hover:bg-blue-50"
                >
                  <Printer className="w-4 h-4" />
                  Print ID Card
                </Button>
                <Button
                  onClick={handleBookAppointment}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Generating MRN..." : "GENERATE MRN"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}


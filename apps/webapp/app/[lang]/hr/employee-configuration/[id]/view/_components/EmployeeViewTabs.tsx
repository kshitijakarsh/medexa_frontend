"use client"

import { useState } from "react"
import { DynamicTabs } from "@/components/common/dynamic-tabs-props"
import { FileText, ExternalLink } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

const tabs = [
    { key: "personal", label: "Personal Details" },
    { key: "contact", label: "Contact & Address" },
    { key: "employment", label: "Employment" },
    { key: "visa", label: "Visa & License" },
    { key: "contract", label: "Contract & Payroll" },
    { key: "documents", label: "Documents" },
]

interface EmployeeViewTabsProps {
    data: any
    formatDate: (date?: string) => string
}

export function EmployeeViewTabs({ data, formatDate }: EmployeeViewTabsProps) {
    const [activeTab, setActiveTab] = useState("personal")

    const renderTabContent = () => {
        switch (activeTab) {
            case "personal":
                return <PersonalDetailsTab data={data} formatDate={formatDate} />
            case "contact":
                return <ContactAddressTab data={data} />
            case "employment":
                return <EmploymentTab data={data} />
            case "visa":
                return <VisaLicenseTab data={data} formatDate={formatDate} />
            case "contract":
                return <ContractPayrollTab data={data} formatDate={formatDate} />
            case "documents":
                return <DocumentsTab data={data} />
            default:
                return null
        }
    }

    return (
        <div>
            <div className="p-4 border-b">
                <DynamicTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />
            </div>
            <div className="p-5">{renderTabContent()}</div>
        </div>
    )
}

// Reusable Detail Item
function DetailItem({ label, value }: { label: string; value?: string | number }) {
    return (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
            <p className="text-sm font-medium text-gray-800 mt-1">{value || "—"}</p>
        </div>
    )
}

// Section Header
function SectionHeader({ title }: { title: string }) {
    return (
        <h3 className="text-base font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
            {title}
        </h3>
    )
}

// Personal Details Tab
function PersonalDetailsTab({ data, formatDate }: { data: any; formatDate: (date?: string) => string }) {
    return (
        <div className="space-y-6">
            <div>
                <SectionHeader title="Basic Information" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="First Name" value={data.first_name} />
                    <DetailItem label="Last Name" value={data.last_name} />
                    <DetailItem label="Gender" value={data.gender ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : undefined} />
                    <DetailItem label="Date of Birth" value={formatDate(data.date_of_birth)} />
                    <DetailItem label="Marital Status" value={data.marital_status ? data.marital_status.charAt(0).toUpperCase() + data.marital_status.slice(1) : undefined} />
                    <DetailItem label="Blood Group" value={data.blood_group} />
                    <DetailItem label="Nationality" value={data.country?.name_en} />
                </div>
            </div>

            <div>
                <SectionHeader title="Identification" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="CRP/NID" value={data.crp_nid} />
                    <DetailItem label="CRP/NID Expiry" value={formatDate(data.crp_nid_expiry)} />
                </div>
            </div>

            {data.photo_url && (
                <div>
                    <SectionHeader title="Photo" />
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                        <img src={data.photo_url} alt="Employee Photo" className="w-full h-full object-cover" />
                    </div>
                </div>
            )}
        </div>
    )
}

// Contact & Address Tab
function ContactAddressTab({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <div>
                <SectionHeader title="Contact Information" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="Phone Number" value={data.phone} />
                    <DetailItem label="Office Email" value={data.office_email} />
                    <DetailItem label="Emergency Contact" value={data.emergency_contact} />
                    <DetailItem label="Language" value={data.language ? data.language.charAt(0).toUpperCase() + data.language.slice(1) : undefined} />
                </div>
            </div>

            <div>
                <SectionHeader title="Address" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem label="Local Address" value={data.local_address} />
                    <DetailItem label="Permanent Address" value={data.permanent_address} />
                </div>
            </div>
        </div>
    )
}

// Employment Tab
function EmploymentTab({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <div>
                <SectionHeader title="Position Details" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="Department" value={data.department?.department_name} />
                    <DetailItem label="Designation" value={data.designation?.name} />
                    <DetailItem label="Specialisation" value={data.specialisation?.name} />
                    <DetailItem label="Linked User" value={data.user?.name} />
                </div>
            </div>

            <div>
                <SectionHeader title="Qualifications" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="Qualification" value={data.qualification} />
                    <DetailItem label="Years of Experience" value={data.year_of_experience ? `${data.year_of_experience} years` : undefined} />
                </div>
            </div>
        </div>
    )
}

// Visa & License Tab
function VisaLicenseTab({ data, formatDate }: { data: any; formatDate: (date?: string) => string }) {
    return (
        <div className="space-y-6">
            <div>
                <SectionHeader title="Visa Details" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="Visa Start Date" value={formatDate(data.visa_start)} />
                    <DetailItem label="Visa End Date" value={formatDate(data.visa_end)} />
                </div>
            </div>

            <div>
                <SectionHeader title="Passport Details" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="Passport Number" value={data.passport_no} />
                    <DetailItem label="Passport Expiry" value={formatDate(data.passport_expiry)} />
                </div>
            </div>

            <div>
                <SectionHeader title="License Details" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="License Number" value={data.license_no} />
                    <DetailItem label="License Expiry" value={formatDate(data.license_expiry)} />
                </div>
            </div>
        </div>
    )
}

// Contract & Payroll Tab
function ContractPayrollTab({ data, formatDate }: { data: any; formatDate: (date?: string) => string }) {
    return (
        <div className="space-y-6">
            <div>
                <SectionHeader title="Contract Details" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="Joining Date" value={formatDate(data.joining_date)} />
                    <DetailItem label="Last Working Date" value={formatDate(data.last_working_date)} />
                    <DetailItem label="Contract Renewal Date" value={formatDate(data.contract_renewal_date)} />
                    <DetailItem label="Contract Expiry Date" value={formatDate(data.contract_expiry_date)} />
                    <DetailItem label="Notice Period" value={data.notice_period ? `${data.notice_period} days` : undefined} />
                </div>
            </div>

            <div>
                <SectionHeader title="Salary Details" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="Date From" value={formatDate(data.date_from)} />
                    <DetailItem label="Date To" value={formatDate(data.date_to)} />
                    <DetailItem label="Basic Salary" value={data.basic_salary ? `${data.basic_salary}` : undefined} />
                    <DetailItem label="Housing Allowance" value={data.housing_allowance ? `${data.housing_allowance}` : undefined} />
                    <DetailItem label="GOSI" value={data.gosi ? `${data.gosi}` : undefined} />
                    <DetailItem label="GOSI Deduction %" value={data.gosi_deduction_percentage ? `${data.gosi_deduction_percentage}%` : undefined} />
                </div>
            </div>

            <div>
                <SectionHeader title="Bank Details" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="Bank Name" value={data.bank_name} />
                    <DetailItem label="Account Name" value={data.account_name} />
                    <DetailItem label="Account Number" value={data.account_no} />
                    <DetailItem label="IBAN" value={data.iban} />
                    <DetailItem label="SWIFT Code" value={data.swift_code} />
                </div>
            </div>
        </div>
    )
}

// Documents Tab
function DocumentsTab({ data }: { data: any }) {
    const documents = [
        { label: "QCHP Document", url: data.qchp_document_url },
        { label: "Passport Copy", url: data.passport_document_url },
        { label: "ID Proof", url: data.id_proof_document_url },
        { label: "Contract Document", url: data.contract_document_url },
        { label: "Signature", url: data.signature_document_url },
    ].filter(doc => doc.url)

    if (documents.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mb-3 text-gray-300" />
                <p>No documents uploaded</p>
            </div>
        )
    }

    return (
        <div>
            <SectionHeader title="Uploaded Documents" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{doc.label}</p>
                                    <p className="text-xs text-gray-500 truncate max-w-[150px]">
                                        {doc.url?.split('/').pop()}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(doc.url, '_blank')}
                                className="text-blue-600 hover:text-blue-700"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                        </div>
                        {/* Thumbnail preview for images */}
                        {doc.url && (doc.url.endsWith('.jpg') || doc.url.endsWith('.jpeg') || doc.url.endsWith('.png')) && (
                            <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                                <img
                                    src={doc.url}
                                    alt={doc.label}
                                    className="w-full h-32 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                    onClick={() => window.open(doc.url, '_blank')}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

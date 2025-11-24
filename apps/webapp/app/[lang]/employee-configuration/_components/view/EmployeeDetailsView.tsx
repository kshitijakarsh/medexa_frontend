"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { Header } from "@/components/header";

const tabs = [
    "Personal Details",
    "Contact & Address",
    "Employment",
    "Visa & License",
    "Contract & Payroll",
    "Documents",
    "System Access",
];

export function EmployeeDetailsView({
    employee,
    onBack,
}: {
    employee: any;
    onBack: () => void;
}) {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        // <main className="min-h-screen bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] p-6">
        <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
            <Header />

            <div className="p-5 space-y-8">
                <div className="bg-white rounded-md shadow-sm p-5 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            onClick={onBack}
                            className="p-1 rounded-md hover:bg-blue-100"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-600" />
                        </Button>
                        <div className="flex items-center gap-4">
                            <img
                                src={employee.avatar}
                                alt={employee.name}
                                className="w-16 h-16 rounded-full border border-gray-300"
                            />
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{employee.name}</h2>
                                <p className="text-gray-500 text-sm">Employee ID: {employee.id}</p>
                            </div>
                        </div>
                    </div>
                    <Button className="bg-blue-600 text-white">Action</Button>
                </div>

                {/* Header Info */}
                <div className="bg-white rounded-md shadow-sm p-4 grid md:grid-cols-4 gap-4 mb-6">
                    <InfoItem label="Department" value={employee.department} />
                    <InfoItem label="Designation" value={employee.designation} />
                    <InfoItem label="Role" value={employee.role} />
                    <InfoItem label="Phone" value={employee.phone} />
                    <InfoItem label="Email" value={employee.email} />
                    <InfoItem label="Emergency Contact No." value={employee.emergencyContact} />
                    <InfoItem label="Office Email" value={employee.officeEmail} />
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-md shadow-sm">
                    <div className="border-b flex gap-2 p-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-4 py-1.5 rounded-md text-sm font-medium",
                                    activeTab === tab
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-4">
                        {activeTab === "Personal Details" && <PersonalDetails data={employee.personal} />}
                        {activeTab === "Contact & Address" && <ContactDetails data={employee.contact} />}
                        {activeTab === "Employment" && <EmploymentDetails data={employee.employment} />}
                        {activeTab === "Visa & License" && <VisaDetails data={employee.visa} />}
                        {activeTab === "Contract & Payroll" && <ContractDetails data={employee.contract} />}
                        {activeTab === "Documents" && <DocumentDetails data={employee.documents} />}
                        {activeTab === "System Access" && <SystemAccess data={employee.systemAccess} />}
                    </div>
                </div>
            </div>
        </main>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col bg-gray-50 p-3 rounded-md border">
            <span className="text-xs text-gray-500">{label}</span>
            <span className="text-sm font-medium text-gray-800">{value}</span>
        </div>
    );
}

// Reusable section renderers
const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-gray-50 rounded-md p-3 border">
        <span className="text-xs text-gray-500">{label}</span>
        <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
);

const PersonalDetails = ({ data }: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([k, v]) => (
            <DetailItem key={k} label={k.replace(/([A-Z])/g, " $1")} value={v as string} />
        ))}
    </div>
);
const ContactDetails = ({ data }: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([k, v]) => (
            <DetailItem key={k} label={k.replace(/([A-Z])/g, " $1")} value={v as string} />
        ))}
    </div>
);
const EmploymentDetails = ({ data }: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DetailItem label="Qualification" value={data.qualification} />
        <DetailItem label="Years of Experience" value={data.experience} />
    </div>
);
const VisaDetails = ({ data }: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([k, v]) => (
            <DetailItem key={k} label={k.replace(/([A-Z])/g, " $1")} value={v as string} />
        ))}
    </div>
);
const ContractDetails = ({ data }: any) => (
    <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Payroll & Bank Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(data).map(([k, v]) => (
                <DetailItem key={k} label={k.replace(/([A-Z])/g, " $1")} value={v as string} />
            ))}
        </div>
    </div>
);
const DocumentDetails = ({ data }: { data: any[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((doc, i) => (
            <div
                key={i}
                className="border rounded-md p-3 flex flex-col items-center bg-[#F7FBFF] shadow-sm"
            >
                <img src={doc.url} alt={doc.label} className="w-full max-h-40 object-contain rounded-md border mb-2" />
                <p className="text-sm font-medium text-gray-700">{doc.label}</p>
                <Button variant="outline" size="sm" className="mt-2 text-blue-600">
                    View
                </Button>
            </div>
        ))}
    </div>
);
const SystemAccess = ({ data }: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DetailItem label="Username" value={data.username} />
        <DetailItem label="Password" value={data.password} />
    </div>
);

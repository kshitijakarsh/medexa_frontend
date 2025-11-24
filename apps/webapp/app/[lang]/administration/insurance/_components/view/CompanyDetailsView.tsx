"use client";

import { Header } from "@/components/header";
import { Button } from "@workspace/ui/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { MoveLeft, MoreVertical } from "lucide-react";
import Image from "next/image";

interface CompanyDetailsViewProps {
    company: any;
    onBack: () => void;
}

export function CompanyDetailsView({ company, onBack }: CompanyDetailsViewProps) {
    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
            <Header />
            {/* Page Header */}
            <div className="p-5 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    {/* Top Header Row */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1"
                                onClick={onBack}
                            >
                                <MoveLeft className="w-4 h-4 mr-1" />
                                Company Details
                            </Button>
                        </div>

                        {/* Action Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="bg-[#0094FF] text-white font-medium px-5 rounded-full flex items-center gap-2 hover:bg-blue-500"
                                >
                                    Action
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-32 rounded-md border border-gray-200 shadow-lg">
                                <DropdownMenuItem
                                    className="bg-green-500 text-white text-sm font-medium cursor-pointer hover:bg-green-600"
                                    onClick={() => alert("Edit clicked")}
                                >
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-sm cursor-pointer hover:bg-gray-100"
                                    onClick={() => alert("Delete clicked")}
                                >
                                    Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-sm cursor-pointer hover:bg-gray-100"
                                    onClick={() => alert("Password clicked")}
                                >
                                    Password
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Company Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-800">
                        <div>
                            <p className="font-semibold">Provider Name</p>
                            <p>{company.providerName}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Company Name</p>
                            <p>{company.companyName}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Approval URL</p>
                            <a
                                href={company.approvalUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 underline"
                            >
                                {company.approvalUrl}
                            </a>
                        </div>
                        <div>
                            <p className="font-semibold">Consultation Service Code</p>
                            <p>{company.consultationServiceCode || "REG-HP-2025"}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Registration Service Code</p>
                            <p>{company.registrationServiceCode || "REG-HP-2025"}</p>
                        </div>
                        <div>
                            <p className="font-semibold">TRN</p>
                            <p>{company.trn || "N/A"}</p>
                        </div>
                        <div className="md:col-span-2 lg:col-span-2">
                            <p className="font-semibold">Address</p>
                            <p>{company.address}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Created By</p>
                            <p>Dr. Ahmed Al-Mansouri</p>
                        </div>
                        <div>
                            <p className="font-semibold">Created At</p>
                            <p>2025-09-27 19:30</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-6 border-t border-gray-200" />

                    {/* License / Logo Section */}
                    <div>
                        <p className="font-semibold text-gray-800 mb-3">
                            QCHP License Copy
                        </p>
                        <div className="border rounded-lg p-4 w-fit bg-gray-50">
                            <div className="flex flex-col items-center gap-3">
                                <div className="border rounded-md overflow-hidden">
                                    <Image
                                        src={company.logoUrl || "/insurance-logo.png"}
                                        alt="Insurance Logo"
                                        width={180}
                                        height={120}
                                        className="object-contain"
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    className="px-6 py-1 text-sm text-blue-600 border-blue-500 hover:bg-blue-50"
                                    onClick={() => alert("View clicked")}
                                >
                                    View
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

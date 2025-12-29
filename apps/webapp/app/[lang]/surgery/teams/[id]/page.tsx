"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { StatusToggle } from "@/app/[lang]/surgery/components/common/StatusToggle";
import { InfoField } from "@/app/[lang]/surgery/components/common/InfoField";
import { useState } from "react";
import { useParams } from "next/navigation";

// Mock Data matching the image context
const MOCK_TEAM_DETAILS = {
    id: "1",
    name: "Ortho Trauma Team",
    specialty: "General Surgery",
    isActive: true,
    createdBy: "Dr.Kiran Madha",
    createdDept: "Cardiology",
    createdDate: "2025-09-27 19:30",
    members: [
        { role: "Lead Surgeon", name: "Dr Vinay" },
        { role: "Assistant Surgeons", name: "Vijay" },
        { role: "Assistant Surgeons", name: "Vishwa" },
        { role: "Assistant Surgeons", name: "Vijay" },
        { role: "Anaesthetist", name: "Vishwa" },
        { role: "Anaesthetist", name: "Vishwa" },
        { role: "Scrub Nurse", name: "Vijay" },
        { role: "Circulating Nurse", name: "Vishwa" },
        { role: "OT Technician", name: "Vijay" },
    ]
};

export default function TeamDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [isActive, setIsActive] = useState(MOCK_TEAM_DETAILS.isActive);

    // Helpers to filter members by role
    const getSingleMemberByRole = (role: string) => MOCK_TEAM_DETAILS.members.find(m => m.role === role)?.name || "-";

    return (
        <div className="min-h-screen bg-blue-100 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 px-6 py-4 flex items-center gap-2">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 bg-blue-500 text-slate-500 transition-colors rounded-md"
                >
                    <ArrowLeft size={20} className="text-white" />
                </button>
                <h1 className="text-base font-medium tracking-tight">Surgery Team</h1>
            </div>

            <div className="w-full p-1 space-y-8">

                {/* Section 1: Team Info (Name/Specialty/Status) */}
                <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-medium text-sm text-slate-800">Team Details</h3>
                    </div>

                    <div className="p-4">
                        <div className="rounded-xl px-2">
                            <div className="flex items-center justify-between gap-8">
                                <div className="flex-1 space-y-4">
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <InfoField label="Team Name" value={MOCK_TEAM_DETAILS.name} className="border-slate-200" />
                                        </div>
                                        <div className="flex-1">
                                            <InfoField label="Specialty" value={MOCK_TEAM_DETAILS.specialty} className="border-slate-200" />
                                        </div>
                                    </div>
                                </div>

                                <StatusToggle isActive={isActive} onToggle={setIsActive} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Metadata (Created By) */}
                <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-medium text-sm text-slate-800">Metadata</h3>
                    </div>

                    <div className="p-4">
                        <div className="rounded-xl px-2">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <label className="text-xs text-slate-500 font-medium">Created by</label>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-sm font-medium text-slate-900">{MOCK_TEAM_DETAILS.createdBy}</span>
                                        <span className="text-xs text-slate-500">{MOCK_TEAM_DETAILS.createdDept}</span>
                                    </div>
                                </div>
                                <div className="space-y-1 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <label className="text-xs text-slate-500 font-medium">Created date</label>
                                    <div className="text-sm font-medium text-slate-900">{MOCK_TEAM_DETAILS.createdDate}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Team Members List */}
                <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-medium text-sm text-slate-800">Team Member</h3>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Lead Surgeon */}
                        <div className="w-full">
                            <InfoField
                                label="Lead Surgeon"
                                value={getSingleMemberByRole("Lead Surgeon")}
                                className="bg-slate-50 border border-slate-100 w-full"
                            />
                        </div>

                        {/* Other Members Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {MOCK_TEAM_DETAILS.members
                                .filter(m => m.role !== "Lead Surgeon")
                                .map((member, idx) => (
                                    <InfoField
                                        key={idx}
                                        label={member.role}
                                        value={member.name}
                                        className="bg-slate-50 border border-slate-100"
                                    />
                                ))}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

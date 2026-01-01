"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { StatusToggle } from "@/app/[lang]/surgery/_components/common/StatusToggle";
import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { createSurgeryTeamApiClient } from "@/lib/api/surgery/teams";

export default function TeamDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const teamsApi = createSurgeryTeamApiClient({});

    const {
        data: teamData,
        isLoading,
        error: teamError,
    } = useQuery({
        queryKey: ["surgery-team", id],
        queryFn: async () => {
            const response = await teamsApi.getById(id as string);
            return response.data.data;
        },
        enabled: !!id,
    });

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (teamData) {
            setIsActive(teamData.status === "active");
        }
    }, [teamData]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-blue-100">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (teamError || !teamData) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-blue-100 p-4">
                <p className="text-red-600 font-medium">Failed to load team details.</p>
                <button
                    onClick={() => router.back()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    // Helpers to filter members by role
    const getSingleMemberByRole = (role: string) => {
        const member = teamData.members?.find(m => m.role === role);
        return member?.name || "-";
    };

    const teamName = teamData.name || "Unknown Team";
    const specialty = (teamData as any).speciality || "General";
    const createdBy = (teamData as any).created_by?.name || "System";
    const createdDept = (teamData as any).created_by?.department || "Administration";
    const createdDate = teamData.created_at
        ? new Date(teamData.created_at).toLocaleString()
        : "—";

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
                                            <InfoField label="Team Name" value={teamName} className="border-slate-200" />
                                        </div>
                                        <div className="flex-1">
                                            <InfoField label="Specialty" value={specialty} className="border-slate-200" />
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
                                        <span className="text-sm font-medium text-slate-900">{createdBy}</span>
                                        <span className="text-xs text-slate-500">{createdDept}</span>
                                    </div>
                                </div>
                                <div className="space-y-1 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <label className="text-xs text-slate-500 font-medium">Created date</label>
                                    <div className="text-sm font-medium text-slate-900">{createdDate}</div>
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
                            {teamData.members
                                ?.filter(m => m.role !== "Lead Surgeon")
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

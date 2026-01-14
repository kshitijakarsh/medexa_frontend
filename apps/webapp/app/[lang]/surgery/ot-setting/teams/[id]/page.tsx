"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { StatusToggle } from "@/app/[lang]/surgery/_components/common/StatusToggle";
import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSurgeryTeam } from "@/app/[lang]/surgery/_hooks/useSurgeryTeam";

import { useDictionary } from "@/i18n/use-dictionary";

export default function TeamDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const dict = useDictionary();
    const teamsDict = dict.pages.surgery.otSetting.teams;
    const detailsDict = teamsDict.details;
    const memberRolesDict = teamsDict.memberRoles;

    const {
        data: teamData,
        isLoading,
        error: teamError,
    } = useSurgeryTeam(id);

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (teamData) {
            setIsActive(teamData.status === "active");
        }
    }, [teamData]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (teamError || !teamData) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-blue-100 p-4">
                <p className="text-red-600 font-medium">{detailsDict.failedToLoad}</p>
                <button
                    onClick={() => router.back()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md transition-colors"
                >
                    {detailsDict.goBack}
                </button>
            </div>
        );
    }

    // Helpers to get member names from explicit fields
    const getMemberNameByRole = (role: keyof typeof memberRolesDict) => {
        switch (role) {
            case "leadSurgeon": return teamData.lead_surgeon?.name || "-";
            case "assistantSurgeon": return teamData.assistant_surgeon?.name || "-";
            case "anaesthetist": return teamData.anaesthetist?.name || "-";
            case "scrubNurse": return teamData.scrub_nurse?.name || "-";
            case "circulatingNurse": return teamData.circulating_nurse?.name || "-";
            case "otTechnician": return teamData.ot_technician?.name || "-";
            default: return "-";
        }
    };

    const teamName = teamData.name || "—";
    const specialty = teamData.speciality || "—";
    const createdBy = teamData.createdBy?.name || "—";
    const createdDept = "-"; // Not present in the provided JSON
    const createdDate = teamData.created_at
        ? new Date(teamData.created_at).toLocaleString()
        : "—";

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 px-6 py-4 flex items-center gap-2">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 bg-blue-500 text-slate-500 transition-colors rounded-md"
                >
                    <ArrowLeft size={20} className="text-white" />
                </button>
                <h1 className="text-base font-medium tracking-tight">{detailsDict.title}</h1>
            </div>

            <div className="w-full p-1 space-y-8">

                {/* Section 1: Team Info (Name/Specialty/Status) */}
                <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-medium text-sm text-slate-800">{detailsDict.sectionTitle}</h3>
                    </div>

                    <div className="p-4">
                        <div className="rounded-xl px-2">
                            <div className="flex items-center justify-between gap-8">
                                <div className="flex-1 space-y-4">
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <InfoField label={detailsDict.teamName} value={teamName} className="border-slate-200" />
                                        </div>
                                        <div className="flex-1">
                                            <InfoField label={detailsDict.specialty} value={specialty} className="border-slate-200" />
                                        </div>
                                    </div>
                                </div>

                                <StatusToggle isActive={isActive} onToggle={setIsActive} label={detailsDict.status} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Metadata (Created By) */}
                <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-medium text-sm text-slate-800">{detailsDict.metadata}</h3>
                    </div>

                    <div className="p-4">
                        <div className="rounded-xl px-2">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <label className="text-xs text-slate-500 font-medium">{detailsDict.createdBy}</label>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-sm font-medium text-slate-900">{createdBy}</span>
                                        <span className="text-xs text-slate-500">{createdDept}</span>
                                    </div>
                                </div>
                                <div className="space-y-1 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <label className="text-xs text-slate-500 font-medium">{detailsDict.createdDate}</label>
                                    <div className="text-sm font-medium text-slate-900">{createdDate}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Team Members List */}
                <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-medium text-sm text-slate-800">{detailsDict.teamMember}</h3>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Lead Surgeon */}
                        <div className="w-full">
                            <InfoField
                                label={memberRolesDict.leadSurgeon}
                                value={getMemberNameByRole("leadSurgeon")}
                                className="bg-slate-50 border border-slate-100 w-full"
                            />
                        </div>

                        {/* Other Members Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <InfoField label={memberRolesDict.assistantSurgeon} value={getMemberNameByRole("assistantSurgeon")} className="bg-slate-50 border border-slate-100" />
                            <InfoField label={memberRolesDict.anaesthetist} value={getMemberNameByRole("anaesthetist")} className="bg-slate-50 border border-slate-100" />
                            <InfoField label={memberRolesDict.scrubNurse} value={getMemberNameByRole("scrubNurse")} className="bg-slate-50 border border-slate-100" />
                            <InfoField label={memberRolesDict.circulatingNurse} value={getMemberNameByRole("circulatingNurse")} className="bg-slate-50 border border-slate-100" />
                            <InfoField label={memberRolesDict.otTechnician} value={getMemberNameByRole("otTechnician")} className="bg-slate-50 border border-slate-100" />
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

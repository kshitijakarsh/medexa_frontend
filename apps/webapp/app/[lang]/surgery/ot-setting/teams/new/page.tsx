
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@workspace/ui/lib/sonner";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { StatusToggle } from "@/app/[lang]/surgery/_components/common/StatusToggle";
import {
    useSurgeryDoctors,
    useSurgeryNurses,
    useCreateSurgeryTeam,
    useUpdateSurgeryTeam,
    useSurgeryTeam
} from "@/app/[lang]/surgery/_hooks/useSurgeryTeam";
import { CreateSurgeryTeamParams, UpdateSurgeryTeamParams } from "@/lib/api/surgery/teams";


import { z } from "@workspace/ui/lib/zod"
import { useDictionary } from "@/i18n/use-dictionary";

// Zod validation schema
const teamFormSchema = z.object({
    teamName: z.string().min(1, "Team name is required"),
    specialty: z.string().min(1, "Specialty is required"),
    leadSurgeon: z.string().min(1, "Lead surgeon is required"),
    assistantSurgeon: z.string().optional(),
    anaesthetist: z.string().optional(),
    scrubNurse: z.string().optional(),
    circulatingNurse: z.string().optional(),
    otTechnician: z.string().optional(),
    isActive: z.boolean(),
});

const MOCK_TECHNICIANS = [
    { id: "401", name: "Tech Support" },
    { id: "402", name: "Tech Guy" },
    { id: "403", name: "Tech Girl" }
];

const toOptions = (items: { id: string; name: string }[]) =>
    items.map(item => ({ value: item.id, label: item.name }));

function TeamForm() {
    const router = useRouter();
    const { lang } = useParams();
    const dict = useDictionary();
    const teamsDict = dict.pages.surgery.otSetting.teams;
    const createTeamDict = teamsDict.createTeam;

    const searchParams = useSearchParams();
    const teamId = searchParams.get("id");
    const isEditMode = !!teamId;

    const queryClient = useQueryClient();

    // Hooks
    const { data: doctorData, isLoading: isLoadingDoctors } = useSurgeryDoctors();
    const { data: nurseData, isLoading: isLoadingNurses } = useSurgeryNurses();
    const { data: existingTeamData, isLoading: isLoadingTeam } = useSurgeryTeam(teamId || undefined);
    const createTeamMutation = useCreateSurgeryTeam();
    const updateTeamMutation = useUpdateSurgeryTeam();

    // Form State
    const [teamName, setTeamName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [isActive, setIsActive] = useState(true);

    // Members State (storing IDs)
    const [leadSurgeon, setLeadSurgeon] = useState("");
    const [assistantSurgeon, setAssistantSurgeon] = useState("");
    const [anaesthetist, setAnaesthetist] = useState("");
    const [scrubNurse, setScrubNurse] = useState("");
    const [circulatingNurse, setCirculatingNurse] = useState("");
    const [otTechnician, setOtTechnician] = useState("");

    const [isPopulated, setIsPopulated] = useState(false);

    // Populate form state when editing
    useEffect(() => {
        if (isEditMode && existingTeamData && !isPopulated) {
            setTeamName(existingTeamData.name || "");
            setSpecialty(existingTeamData.speciality || "");
            setIsActive(existingTeamData.status === "active");
            setLeadSurgeon(existingTeamData.lead_surgeon?.id.toString() || "");
            setAssistantSurgeon(existingTeamData.assistant_surgeon?.id.toString() || "");
            setAnaesthetist(existingTeamData.anaesthetist?.id.toString() || "");
            setScrubNurse(existingTeamData.scrub_nurse?.id.toString() || "");
            setCirculatingNurse(existingTeamData.circulating_nurse?.id.toString() || "");
            setOtTechnician(existingTeamData.ot_technician?.id.toString() || "");
            setIsPopulated(true);
        }
    }, [isEditMode, existingTeamData, isPopulated]);

    const surgeonOptions = doctorData?.map(doc => ({
        value: doc.id.toString(),
        label: doc.name || `${doc.first_name} ${doc.last_name}`
    })) || [];

    const nurseOptions = nurseData?.map(nurse => ({
        value: nurse.id.toString(),
        label: nurse.name || `${nurse.first_name} ${nurse.last_name}`
    })) || [];

    const handleSubmit = () => {
        // Validate using Zod
        const validationResult = teamFormSchema.safeParse({
            teamName,
            specialty,
            leadSurgeon,
            assistantSurgeon,
            anaesthetist,
            scrubNurse,
            circulatingNurse,
            otTechnician,
            isActive,
        });

        if (!validationResult.success) {
            // Map validation errors to localized messages
            const firstIssue = validationResult.error.issues[0];
            if (firstIssue) {
                const errorMessages: Record<string, string> = {
                    teamName: createTeamDict.notifications.teamNameRequired,
                    specialty: createTeamDict.notifications.specialtyRequired,
                    leadSurgeon: createTeamDict.notifications.leadSurgeonRequired,
                };
                const fieldName = firstIssue.path[0] as string;
                toast.error(errorMessages[fieldName] || firstIssue.message);
            }
            return;
        }

        const payload = {
            name: teamName,
            speciality: specialty,
            status: isActive ? ("active" as const) : ("inactive" as const),
            lead_surgeon_id: leadSurgeon,
            assistant_surgeon_id: assistantSurgeon,
            anaesthetist_id: anaesthetist,
            scrub_nurse_id: scrubNurse,
            circulating_nurse_id: circulatingNurse,
            // ot_technician_id: otTechnician,
        };

        if (isEditMode && teamId) {
            updateTeamMutation.mutate(
                { id: teamId, payload },
                {
                    onSuccess: () => {
                        toast.success(dict.toast.updated);
                        router.push(`/${lang}/surgery/ot-setting/teams`);
                    },
                    onError: (error: any) => {
                        toast.error(error?.response?.data?.message || error?.message || createTeamDict.notifications.error);
                    }
                }
            );
        } else {
            createTeamMutation.mutate(
                payload as CreateSurgeryTeamParams,
                {
                    onSuccess: () => {
                        toast.success(createTeamDict.notifications.success);
                        router.push(`/${lang}/surgery/ot-setting/teams`);
                    },
                    onError: (error: any) => {
                        toast.error(error?.response?.data?.message || error?.message || createTeamDict.notifications.error);
                    }
                }
            );
        }
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 px-6 py-4 flex items-center gap-2">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 bg-blue-500 text-slate-500 transition-colors rounded-md"
                >
                    <ArrowLeft size={20} className="text-white" />
                </button>
                <h1 className="text-base font-medium tracking-tight">
                    {isEditMode ? teamsDict.editTeam : createTeamDict.title}
                </h1>
            </div>

            {isLoadingTeam ? (
                <div className="flex h-[60vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
            ) : (
                <div className="w-full p-1 space-y-8">

                    {/* Team Info Section */}
                    <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-medium text-sm text-slate-800">
                                {isEditMode ? teamsDict.editTeam : createTeamDict.title}
                            </h3>
                        </div>

                        <div className="p-4">
                            <div className="rounded-xl px-2">
                                <div className="flex items-center justify-between gap-8">
                                    <div className="flex-1 space-y-4">
                                        <FormInput
                                            label={createTeamDict.teamName}
                                            placeholder={createTeamDict.placeholders.teamName}
                                            value={teamName}
                                            onChange={(e) => setTeamName(e.target.value)}
                                            className="border-slate-200"
                                        />
                                        <div className="flex items-start gap-2">
                                            <div className="flex-1">
                                                <FormInput
                                                    label={createTeamDict.specialty}
                                                    placeholder={createTeamDict.placeholders.specialty}
                                                    value={specialty}
                                                    onChange={(e) => setSpecialty(e.target.value)}
                                                    className="border-slate-200"
                                                />
                                            </div>

                                            <div className="pt-5">
                                                <StatusToggle
                                                    isActive={isActive}
                                                    onToggle={setIsActive}
                                                    label={createTeamDict.status}
                                                />
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Team Member Section */}
                    <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-medium text-sm text-slate-800">{createTeamDict.teamMember}</h3>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Lead Surgeon */}
                            <FormSelect
                                label={teamsDict.memberRoles.leadSurgeon}
                                placeholder={isLoadingDoctors ? createTeamDict.placeholders.loadingDoctors : createTeamDict.placeholders.selectSurgeon}
                                value={leadSurgeon}
                                onValueChange={setLeadSurgeon}
                                options={surgeonOptions}
                                disabled={isLoadingDoctors}
                            />

                            {/* Assistant Surgeon */}
                            <FormSelect
                                label={teamsDict.memberRoles.assistantSurgeon}
                                placeholder={isLoadingDoctors ? createTeamDict.placeholders.loadingDoctors : createTeamDict.placeholders.selectAssistantSurgeon}
                                value={assistantSurgeon}
                                onValueChange={setAssistantSurgeon}
                                options={surgeonOptions}
                                disabled={isLoadingDoctors}
                            />

                            {/* Anaesthetist */}
                            <FormSelect
                                label={teamsDict.memberRoles.anaesthetist}
                                placeholder={isLoadingDoctors ? createTeamDict.placeholders.loadingDoctors : createTeamDict.placeholders.selectAnaesthetist}
                                value={anaesthetist}
                                onValueChange={setAnaesthetist}
                                options={surgeonOptions}
                                disabled={isLoadingDoctors}
                            />

                            {/* Scrub Nurse */}
                            <FormSelect
                                label={teamsDict.memberRoles.scrubNurse}
                                placeholder={isLoadingNurses ? createTeamDict.placeholders.loadingNurses : createTeamDict.placeholders.selectScrubNurse}
                                value={scrubNurse}
                                onValueChange={setScrubNurse}
                                options={nurseOptions}
                                disabled={isLoadingNurses}
                            />

                            {/* Circulating Nurse */}
                            <FormSelect
                                label={teamsDict.memberRoles.circulatingNurse}
                                placeholder={isLoadingNurses ? createTeamDict.placeholders.loadingNurses : createTeamDict.placeholders.selectCirculatingNurse}
                                value={circulatingNurse}
                                onValueChange={setCirculatingNurse}
                                options={nurseOptions}
                                disabled={isLoadingNurses}
                            />

                            {/* OT Technician */}
                            <FormSelect
                                label={teamsDict.memberRoles.otTechnician}
                                placeholder={createTeamDict.placeholders.selectOtTechnician}
                                value={otTechnician}
                                onValueChange={setOtTechnician}
                                options={toOptions(MOCK_TECHNICIANS)}
                            />
                        </div>
                    </section>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        {!isEditMode && (
                            <button className="px-6 py-2 border border-blue-500 text-blue-500 font-medium rounded-lg text-sm bg-white hover:bg-blue-50">
                                {createTeamDict.actions.saveAsDraft}
                            </button>
                        )}
                        <button
                            onClick={handleSubmit}
                            disabled={createTeamMutation.isPending || updateTeamMutation.isPending}
                            className="flex gap-2 items-center px-4 py-2 rounded-lg bg-[#50C786] text-white font-medium text-sm hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={16} />
                            {createTeamMutation.isPending || updateTeamMutation.isPending
                                ? (isEditMode ? dict.common.saving : createTeamDict.actions.creating)
                                : (isEditMode ? dict.common.save : createTeamDict.actions.completeAndSign)}
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default function CreateTeamPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        }>
            <TeamForm />
        </Suspense>
    );
}

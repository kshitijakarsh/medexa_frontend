
"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "@workspace/ui/lib/sonner";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { StatusToggle } from "@/app/[lang]/surgery/_components/common/StatusToggle";
import { createSurgeryTeamApiClient, CreateSurgeryTeamParams } from "@/lib/api/surgery/teams";
import { createDoctorApiClient } from "@/lib/api/surgery/doctor";
import { createNurseApiClient } from "@/lib/api/nurse-api";
import { getAuthToken } from "@/app/utils/onboarding";

const MOCK_TECHNICIANS = [
    { id: "401", name: "Tech Support" },
    { id: "402", name: "Tech Guy" },
    { id: "403", name: "Tech Girl" }
];

const toOptions = (items: { id: string; name: string }[]) =>
    items.map(item => ({ value: item.id, label: item.name }));

export default function CreateTeamPage() {
    const router = useRouter();
    const { lang } = useParams();

    // API Clients
    const teamsApi = createSurgeryTeamApiClient({});
    const doctorApi = createDoctorApiClient({});

    // Fetch Doctors
    const { data: doctorData, isLoading: isLoadingDoctors } = useQuery({
        queryKey: ["doctors-soap-notes-creators"],
        queryFn: async () => {
            const response = await doctorApi.getAll({ limit: 100 });
            return response.data.data;
        },
    });

    // Fetch Nurses
    const { data: nurseData, isLoading: isLoadingNurses } = useQuery({
        queryKey: ["nurses-consumables-creators"],
        queryFn: async () => {
            const token = await getAuthToken();
            const nurseApi = createNurseApiClient({ authToken: token });
            const response = await nurseApi.getConsumablesCreators({ limit: 100 } as any);
            return response.data.data;
        },
    });

    const surgeonOptions = doctorData?.map(doc => ({
        value: doc.id,
        label: doc.name || `${doc.first_name} ${doc.last_name}`
    })) || [];

    const nurseOptions = nurseData?.map(nurse => ({
        value: nurse.id,
        label: nurse.name || `${nurse.first_name} ${nurse.last_name}`
    })) || [];

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

    // Create Team Mutation
    const createTeamMutation = useMutation({
        mutationFn: async (payload: CreateSurgeryTeamParams) => {
            const response = await teamsApi.create(payload);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Team created successfully");
            router.push(`/${lang}/surgery/ot-setting/teams`);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || error?.message || "Failed to create team");
        },
    });

    const handleSubmit = () => {
        // Validate required fields
        if (!teamName.trim()) {
            toast.error("Team name is required");
            return;
        }
        if (!specialty.trim()) {
            toast.error("Specialty is required");
            return;
        }
        if (!leadSurgeon) {
            toast.error("Lead surgeon is required");
            return;
        }
        if (!assistantSurgeon) {
            toast.error("Assistant surgeon is required");
            return;
        }
        if (!anaesthetist) {
            toast.error("Anaesthetist is required");
            return;
        }
        if (!scrubNurse) {
            toast.error("Scrub nurse is required");
            return;
        }
        if (!circulatingNurse) {
            toast.error("Circulating nurse is required");
            return;
        }
        if (!otTechnician) {
            toast.error("OT Technician is required");
            return;
        }

        const payload: CreateSurgeryTeamParams = {
            name: teamName,
            speciality: specialty,
            status: isActive ? "active" : "inactive",
            lead_surgeon_id: leadSurgeon,
            assistant_surgeon_id: assistantSurgeon,
            anaesthetist_id: anaesthetist,
            scrub_nurse_id: scrubNurse,
            circulating_nurse_id: circulatingNurse,
            // ot_technician_id: otTechnician,
        };

        createTeamMutation.mutate(payload);
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
                <h1 className="text-base font-medium tracking-tight">Create Team</h1>
            </div>

            <div className="w-full p-1 space-y-8">

                {/* Create Team Section */}
                <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-medium text-sm text-slate-800">Create Team</h3>
                    </div>

                    <div className="p-4">
                        <div className="rounded-xl px-2">
                            <div className="flex items-center justify-between gap-8">
                                <div className="flex-1 space-y-4">
                                    <FormInput
                                        label="Team Name"
                                        placeholder="Enter Team Name"
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                        className="border-slate-200"
                                    />
                                    <div className="flex items-start gap-2">
                                        <div className="flex-1">
                                            <FormInput
                                                label="Specialty"
                                                placeholder="Enter Specialty"
                                                value={specialty}
                                                onChange={(e) => setSpecialty(e.target.value)}
                                                className="border-slate-200"
                                            />
                                        </div>

                                        <div className="pt-5">
                                            <StatusToggle
                                                isActive={isActive}
                                                onToggle={setIsActive}
                                                label="Status"
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
                        <h3 className="font-medium text-sm text-slate-800">Team Member</h3>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Lead Surgeon */}
                        <FormSelect
                            label="Lead Surgeon"
                            placeholder={isLoadingDoctors ? "Loading Doctors..." : "Select Surgeon"}
                            value={leadSurgeon}
                            onValueChange={setLeadSurgeon}
                            options={surgeonOptions}
                            disabled={isLoadingDoctors}
                        />

                        {/* Assistant Surgeon */}
                        <FormSelect
                            label="Assistant Surgeon"
                            placeholder={isLoadingDoctors ? "Loading Doctors..." : "Select Assistant Surgeon"}
                            value={assistantSurgeon}
                            onValueChange={setAssistantSurgeon}
                            options={surgeonOptions}
                            disabled={isLoadingDoctors}
                        />

                        {/* Anaesthetist */}
                        <FormSelect
                            label="Anaesthetist"
                            placeholder={isLoadingDoctors ? "Loading Doctors..." : "Select Anaesthetist"}
                            value={anaesthetist}
                            onValueChange={setAnaesthetist}
                            options={surgeonOptions}
                            disabled={isLoadingDoctors}
                        />

                        {/* Scrub Nurse */}
                        <FormSelect
                            label="Scrub Nurse"
                            placeholder={isLoadingNurses ? "Loading Nurses..." : "Select Scrub Nurse"}
                            value={scrubNurse}
                            onValueChange={setScrubNurse}
                            options={nurseOptions}
                            disabled={isLoadingNurses}
                        />

                        {/* Circulating Nurse */}
                        <FormSelect
                            label="Circulating Nurse"
                            placeholder={isLoadingNurses ? "Loading Nurses..." : "Select Circulating Nurse"}
                            value={circulatingNurse}
                            onValueChange={setCirculatingNurse}
                            options={nurseOptions}
                            disabled={isLoadingNurses}
                        />

                        {/* OT Technician */}
                        <FormSelect
                            label="OT Technician"
                            placeholder="Select OT Technician"
                            value={otTechnician}
                            onValueChange={setOtTechnician}
                            options={toOptions(MOCK_TECHNICIANS)}
                        />
                    </div>
                </section>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <button className="px-6 py-2 border border-blue-500 text-blue-500 font-medium rounded-lg text-sm bg-white hover:bg-blue-50">
                        SAVE AS DRAFT
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={createTeamMutation.isPending}
                        className="flex gap-2 items-center px-4 py-2 rounded-lg bg-[#50C786] text-white font-medium text-sm hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={16} />
                        {createTeamMutation.isPending ? "Creating..." : "COMPLETE & SIGN"}
                    </button>
                </div>

            </div>
        </div>
    );
}

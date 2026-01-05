
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Trash2, Send } from "lucide-react";
import { DynamicSection } from "@/app/[lang]/surgery/_components/common/DynamicSection";
import { FormInput } from "@/components/ui/form-input";
import { StatusToggle } from "@/app/[lang]/surgery/_components/common/StatusToggle";
import { createSurgeryTemplateApiClient } from "@/lib/api/surgery/templates";

// --- Types ---
interface Procedure {
    id: string;
    title: string;
    details?: string;
}

// --- Mock Data ---
const MOCK_PROCEDURES = [
    {
        title: "ECG - 12 Lead",
        details: "Impression: Normal sinus rhythm. No ST-T wave changes. No evidence of acute ischemia."
    }
];

const MOCK_INVESTIGATIONS = [
    { name: "CBC (Complete Blood Count)", badges: ["Laboratory Tests", "STAT"] }
];

const PendingActionItem = ({ title, details, onRemove }: { title: string, details?: string, onRemove: () => void }) => (
    <div className="rounded-lg border border-blue-200 p-2 flex items-center justify-between bg-blue-50/50">
        <div className="flex flex-col">
            <span className="text-sm font-medium">{title}</span>
            {details && <span className="text-sm text-slate-500">{details}</span>}
        </div>
        <div className="flex items-center gap-2">
            <button
                onClick={onRemove}
                className="text-red-500 transition-colors bg-red-100 p-2 rounded-lg"
            >
                <Trash2 size={16} />
            </button>
        </div>
    </div>
);

export default function CreateTemplatePage() {
    const router = useRouter();

    // API Client
    const templatesApi = createSurgeryTemplateApiClient({});

    // Fetch Procedures
    const { data: proceduresData, isLoading: isLoadingProcedures } = useQuery({
        queryKey: ["procedures"],
        queryFn: async () => {
            const response = await templatesApi.getProcedures({ limit: 100 });
            return response.data.data;
        }
    });

    const procedureOptions = proceduresData?.map(p => p.title) || [];

    // Fetch Clearances
    const { data: clearancesData, isLoading: isLoadingClearances } = useQuery({
        queryKey: ["clearances"],
        queryFn: async () => {
            const response = await templatesApi.getClearances({ limit: 100 });
            return response.data.data;
        }
    });

    const clearanceOptions = clearancesData?.map(c => c.name) || [];

    // Fetch Consents
    const { data: consentsData, isLoading: isLoadingConsents } = useQuery({
        queryKey: ["consents"],
        queryFn: async () => {
            const response = await templatesApi.getConsents({ limit: 100 });
            return response.data.data;
        }
    });

    const consentOptions = consentsData?.map(c => c.name) || [];

    // State
    const [templateName, setTemplateName] = useState("");
    const [isActive, setIsActive] = useState(true);

    // Sections State
    const [procedures, setProcedures] = useState<{ title: string; details?: string }[]>([]);
    const [investigations, setInvestigations] = useState(MOCK_INVESTIGATIONS);
    const [medicalClearances, setMedicalClearances] = useState<string[]>([]);
    const [consents, setConsents] = useState<string[]>([]);
    const [nursingOrders, setNursingOrders] = useState(["Monitor vital signs every 2 hours", "Maintain strict intake & output chart", "Ensure consent forms are signed"]);
    const [patientPrep, setPatientPrep] = useState(["NPO for 6 Hours", "DVT Prophylaxis - Stockings"]);
    const [anesthesiaReq, setAnesthesiaReq] = useState(["General Anesthesia", "Endotracheal Intubation"]);
    const [equipment, setEquipment] = useState(["Laparoscopic Tower", "Harmonic Scalpel"]);
    const [implants, setImplants] = useState(["Clips for Cystic Duct/Artery", "Retrieval Bag"]);
    const [bloodPrep, setBloodPrep] = useState(["Keep 2 units blood on standby", "Platelets on call"]);


    // Generic handler for adding/removing
    const makeHandlers = (getter: any[], setter: any) => ({
        onAddItem: (item: string) => setter([...getter, item]),
        onRemoveItem: (index: number) => setter(getter.filter((_, i) => i !== index))
    });

    // Special handler for procedures to include description
    const handleAddProcedure = (title: string) => {
        const found = proceduresData?.find(p => p.title === title);
        if (found) {
            setProcedures([...procedures, { title: found.title, details: found.details }]);
        } else {
            setProcedures([...procedures, { title, details: "" }]);
        }
    };

    const handleAddClearance = (name: string) => {
        setMedicalClearances([...medicalClearances, name]);
    };

    const handleAddConsent = (name: string) => {
        setConsents([...consents, name]);
    };

    return (
        <div className="min-h-screen">
            <div className="sticky top-0 z-10 px-6 py-4 flex items-center gap-2">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 bg-blue-500 text-slate-500 transition-colors rounded-md"
                >
                    <ArrowLeft size={20} className="text-white" />
                </button>
                <h1 className="text-base font-medium tracking-tight">Create Template</h1>
            </div>

            <div className="w-full p-1 space-y-8">

                <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-medium text-sm text-slate-800">Surgery Requirement</h3>
                    </div>

                    <div className="p-4">
                        <div className="rounded-xl px-2">
                            <div className="flex items-center justify-between gap-8">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-start gap-2">
                                        <div className="flex-1">
                                            <FormInput
                                                label="Surgery Template Name"
                                                placeholder="Select Template Name"
                                                value={templateName}
                                                onChange={(e) => setTemplateName(e.target.value)}
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

                <div className="space-y-8">
                    <DynamicSection
                        title="Procedures"
                        items={procedures}
                        onAddItem={handleAddProcedure}
                        onRemoveItem={(index) => setProcedures(procedures.filter((_, i) => i !== index))}
                        placeholder={isLoadingProcedures ? "Loading Procedures..." : "Select Procedure"}
                        options={procedureOptions}
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={item.title}
                                details={item.details}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title="Required Investigations"
                        items={investigations}
                        {...makeHandlers(investigations, setInvestigations)}
                        placeholder="Select Item Name"
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={typeof item === 'string' ? item : item.name}
                                details={typeof item !== 'string' && item.badges ? item.badges.join(", ") : undefined}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title="Medical Clearances"
                        items={medicalClearances}
                        onAddItem={handleAddClearance}
                        onRemoveItem={(index) => setMedicalClearances(medicalClearances.filter((_, i) => i !== index))}
                        placeholder={isLoadingClearances ? "Loading Clearances..." : "Add Medical Clearances"}
                        options={clearanceOptions}
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={typeof item === 'string' ? item : item.title || item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title="Consents Required"
                        items={consents}
                        onAddItem={handleAddConsent}
                        onRemoveItem={(index) => setConsents(consents.filter((_, i) => i !== index))}
                        placeholder={isLoadingConsents ? "Loading Consents..." : "Add Consents Required"}
                        options={consentOptions}
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={typeof item === 'string' ? item : item.title || item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title="Nursing Orders (Pre-Op)"
                        items={nursingOrders}
                        {...makeHandlers(nursingOrders, setNursingOrders)}
                        placeholder="Add Consents Required"
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={typeof item === 'string' ? item : item.title || item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title="Patient Preparation Requirements"
                        items={patientPrep}
                        {...makeHandlers(patientPrep, setPatientPrep)}
                        placeholder="Add Preparation Requirements"
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={typeof item === 'string' ? item : item.title || item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title="Anesthesia Requirements"
                        items={anesthesiaReq}
                        {...makeHandlers(anesthesiaReq, setAnesthesiaReq)}
                        placeholder="Add Anesthesia Requirements"
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={typeof item === 'string' ? item : item.title || item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title="Equipment & Instruments"
                        items={equipment}
                        {...makeHandlers(equipment, setEquipment)}
                        placeholder="Add Equipment & Instruments"
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={typeof item === 'string' ? item : item.title || item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title="Implants & Consumables"
                        items={implants}
                        {...makeHandlers(implants, setImplants)}
                        placeholder="Add Equipment & Instruments"
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={typeof item === 'string' ? item : item.title || item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title="Blood & Resource Preparation"
                        items={bloodPrep}
                        {...makeHandlers(bloodPrep, setBloodPrep)}
                        placeholder="Add Blood & Resource Preparation"
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={typeof item === 'string' ? item : item.title || item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                </div>

            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button className="px-6 py-2 border border-blue-500 text-blue-500 font-medium rounded-lg text-sm bg-white hover:bg-blue-50">
                    SAVE AS DRAFT
                </button>
                <button className="flex gap-2 items-center px-4 py-2 rounded-lg bg-[#50C786] text-white font-medium text-sm hover:bg-emerald-600">
                    <Send size={16} /> COMPLETE & SIGN
                </button>
            </div>
        </div>
    );
}

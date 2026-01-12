"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, Send } from "lucide-react";
import { DynamicSection } from "@/app/[lang]/surgery/_components/common/DynamicSection";
import { FormInput } from "@/components/ui/form-input";
import { StatusToggle } from "@/app/[lang]/surgery/_components/common/StatusToggle";
import {
    useSurgeryProcedures,
    useSurgeryClearances,
    useSurgeryConsents,
    useCreateSurgeryTemplate
} from "@/app/[lang]/surgery/_hooks/useSurgeryTemplate";
import { useDictionary } from "@/i18n/use-dictionary";
import { z } from "@workspace/ui/lib/zod";
import { toast } from "@workspace/ui/lib/sonner";

const templateFormSchema = z.object({
    templateName: z.string().min(1, "Template name is required"),
});

// --- Types ---
interface Procedure {
    id: string;
    title: string;
    description?: string;
}

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
    const dict = useDictionary();
    const templatesDict = dict.pages.surgery.otSetting.templates;
    const createTemplateDict = templatesDict.createTemplate;

    // Hooks
    const { data: proceduresData, isLoading: isLoadingProcedures } = useSurgeryProcedures();
    const { data: clearancesData, isLoading: isLoadingClearances } = useSurgeryClearances();
    const { data: consentsData, isLoading: isLoadingConsents } = useSurgeryConsents();
    const createTemplateMutation = useCreateSurgeryTemplate();

    const procedureOptions = proceduresData?.map(p => p.title) || [];
    const clearanceOptions = clearancesData?.map(c => c.name) || [];
    const consentOptions = consentsData?.map(c => c.name) || [];

    // State
    const [templateName, setTemplateName] = useState("");
    const [isActive, setIsActive] = useState(true);

    // Sections State
    const [procedures, setProcedures] = useState<{ title: string; details?: string }[]>([]);
    const [investigations, setInvestigations] = useState<string[]>([]);
    const [medicalClearances, setMedicalClearances] = useState<string[]>([]);
    const [consents, setConsents] = useState<string[]>([]);
    const [nursingOrders, setNursingOrders] = useState<string[]>([]);
    const [patientPrep, setPatientPrep] = useState<string[]>([]);
    const [anesthesiaReq, setAnesthesiaReq] = useState<string[]>([]);
    const [equipment, setEquipment] = useState<string[]>([]);
    const [implants, setImplants] = useState<string[]>([]);
    const [bloodPrep, setBloodPrep] = useState<string[]>([]);

    const isPending = createTemplateMutation.isPending;

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

    const handleSave = async (isDraft: boolean) => {
        const validationResult = templateFormSchema.safeParse({ templateName });

        if (!validationResult.success) {
            const firstIssue = validationResult.error.issues[0];
            if (firstIssue) {
                const errorMessages: Record<string, string> = {
                    templateName: (createTemplateDict as any).notifications?.templateNameRequired || "Template name is required",
                };
                const fieldName = firstIssue.path[0] as string;
                toast.error(errorMessages[fieldName] || firstIssue.message);
            }
            return;
        }

        try {
            await createTemplateMutation.mutateAsync({
                name: templateName,
                status: isDraft ? 'inactive' : (isActive ? 'active' : 'inactive'),
                // Extend the payload as per backend requirements
            });
            router.back();
        } catch (error) {
            console.error("Failed to save template:", error);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="sticky top-0 z-10 px-6 py-4 flex items-center gap-2">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 text-slate-500 transition-colors rounded-md"
                >
                    <ArrowLeft size={20} className="text-slate-800" />
                </button>
                <h1 className="text-base font-medium tracking-tight">{createTemplateDict.title}</h1>
            </div>

            <div className="w-full p-1 space-y-8">

                <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-medium text-sm text-slate-800">{createTemplateDict.sectionTitle}</h3>
                    </div>

                    <div className="p-4">
                        <div className="rounded-xl px-2">
                            <div className="flex items-center justify-between gap-8">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-start gap-2">
                                        <div className="flex-1">
                                            <FormInput
                                                label={createTemplateDict.templateName}
                                                placeholder={createTemplateDict.placeholders.templateName}
                                                value={templateName}
                                                onChange={(e) => setTemplateName(e.target.value)}
                                                className="border-slate-200"
                                            />
                                        </div>

                                        <div className="pt-5">
                                            <StatusToggle
                                                isActive={isActive}
                                                onToggle={setIsActive}
                                                label={createTemplateDict.status}
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
                        title={createTemplateDict.sections.procedures}
                        items={procedures}
                        onAddItem={handleAddProcedure}
                        onRemoveItem={(index) => setProcedures(procedures.filter((_, i) => i !== index))}
                        placeholder={isLoadingProcedures ? createTemplateDict.placeholders.loadingProcedures : createTemplateDict.placeholders.selectProcedure}
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
                        title={createTemplateDict.sections.requiredInvestigations}
                        items={investigations}
                        {...makeHandlers(investigations, setInvestigations)}
                        placeholder={createTemplateDict.placeholders.selectItemName}
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title={createTemplateDict.sections.medicalClearances}
                        items={medicalClearances}
                        onAddItem={handleAddClearance}
                        onRemoveItem={(index) => setMedicalClearances(medicalClearances.filter((_, i) => i !== index))}
                        placeholder={isLoadingClearances ? createTemplateDict.placeholders.loadingClearances : createTemplateDict.placeholders.addMedicalClearances}
                        options={clearanceOptions}
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title={createTemplateDict.sections.consentsRequired}
                        items={consents}
                        onAddItem={handleAddConsent}
                        onRemoveItem={(index) => setConsents(consents.filter((_, i) => i !== index))}
                        placeholder={isLoadingConsents ? createTemplateDict.placeholders.loadingConsents : createTemplateDict.placeholders.addConsentsRequired}
                        options={consentOptions}
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title={createTemplateDict.sections.nursingOrders}
                        items={nursingOrders}
                        {...makeHandlers(nursingOrders, setNursingOrders)}
                        placeholder={createTemplateDict.placeholders.addConsentsRequired}
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title={createTemplateDict.sections.patientPreparation}
                        items={patientPrep}
                        {...makeHandlers(patientPrep, setPatientPrep)}
                        placeholder={createTemplateDict.placeholders.addPreparationRequirements}
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title={createTemplateDict.sections.anesthesiaRequirements}
                        items={anesthesiaReq}
                        {...makeHandlers(anesthesiaReq, setAnesthesiaReq)}
                        placeholder={createTemplateDict.placeholders.addAnesthesiaRequirements}
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title={createTemplateDict.sections.equipmentInstruments}
                        items={equipment}
                        {...makeHandlers(equipment, setEquipment)}
                        placeholder={createTemplateDict.placeholders.addEquipmentInstruments}
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title={createTemplateDict.sections.implantsConsumables}
                        items={implants}
                        {...makeHandlers(implants, setImplants)}
                        placeholder={createTemplateDict.placeholders.addEquipmentInstruments}
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                    <DynamicSection
                        title={createTemplateDict.sections.bloodResourcePreparation}
                        items={bloodPrep}
                        {...makeHandlers(bloodPrep, setBloodPrep)}
                        placeholder={createTemplateDict.placeholders.addBloodResourcePreparation}
                        renderItem={(item, index, onRemove) => (
                            <PendingActionItem
                                key={index}
                                title={item}
                                onRemove={onRemove}
                            />
                        )}
                    />

                </div>

            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button
                    disabled={isPending}
                    onClick={() => handleSave(true)}
                    className="px-6 py-2 border border-blue-500 text-blue-500 font-medium rounded-lg text-sm bg-white hover:bg-blue-50 disabled:opacity-50"
                >
                    {isPending ? createTemplateDict.actions.saving : createTemplateDict.actions.saveAsDraft}
                </button>
                <button
                    disabled={isPending}
                    onClick={() => handleSave(false)}
                    className="flex gap-2 items-center px-4 py-2 rounded-lg bg-[#50C786] text-white font-medium text-sm hover:bg-emerald-600 disabled:opacity-50"
                >
                    {isPending ? createTemplateDict.actions.saving : <><Send size={16} /> {createTemplateDict.actions.completeAndSign}</>}
                </button>
            </div>
        </div>
    );
}

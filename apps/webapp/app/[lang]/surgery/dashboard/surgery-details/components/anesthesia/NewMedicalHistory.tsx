"use client";
import { X } from "lucide-react";
import Button from "@/components/ui/button";
import { Input } from "@workspace/ui/components/input";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
} from "@workspace/ui/components/dialog";
import NewButton from "@/components/common/new-button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/app/[lang]/surgery/components/common/forms/form-textarea";

// Constants
const DISEASE_OPTIONS = [
    { value: "asthma", label: "Asthma" },
    { value: "diabetes", label: "Diabetes" },
    { value: "hypertension", label: "Hypertension" },
];

const MEDICATION_OPTIONS = [
    { value: "metformin", label: "Metformin" },
    { value: "lisinopril", label: "Lisinopril" },
    { value: "atorvastatin", label: "Atorvastatin" },
];

const DOSE_OPTIONS = [
    { value: "500mg", label: "500mg" },
    { value: "10mg", label: "10mg" },
    { value: "20mg", label: "20mg" },
];

const FREQUENCY_OPTIONS = [
    { value: "daily", label: "Daily" },
    { value: "bd", label: "BD (Twice daily)" },
    { value: "tds", label: "TDS (Three times daily)" },
];

export const NewMedicalHistory = ({
    open,
    onOpenChange
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="max-w-2xl gap-0 p-0 overflow-hidden border-none shadow-none bg-transparent">
                <div className="w-full h-full rounded-2xl bg-white p-3 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h2 className="text-base font-medium">Medical History</h2>
                            <p className="text-sm font-light text-slate-600">Add Medical History</p>
                        </div>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="border-b border-dashed border-slate-200 my-4" />

                    <div className="space-y-4">
                        <FormTextarea
                            label="History of Present Illness"
                            placeholder="Enter Additional Note"
                        />

                        <FormInput
                            label="Past Surgical History"
                            placeholder="Enter Pulse Rate"
                        />

                        <FormSelect
                            label="Diseases History"
                            placeholder="Enter RR"
                            options={DISEASE_OPTIONS}
                        />

                        <div className="grid grid-cols-2 gap-2 bg-blue-50 p-2 rounded-lg">
                            <FormSelect
                                label="Current Medications"
                                placeholder="Select Medications"
                                options={MEDICATION_OPTIONS}
                            />

                            <FormSelect
                                label="Dose"
                                placeholder="Select Dose"
                                options={DOSE_OPTIONS}
                            />

                            <FormSelect
                                label="Frequency"
                                placeholder="Select Frequency"
                                options={FREQUENCY_OPTIONS}
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Remaining Duration(days)</label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Enter Remaining Duration"
                                        className="border-blue-100 bg-white placeholder:text-slate-400 focus-visible:ring-blue-500"
                                    />
                                    <NewButton
                                        name="Add"
                                        handleClick={() => { }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-4 flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="min-w-[100px] border-blue-500 text-blue-500 hover:bg-blue-50 font-medium"
                        >
                            CANCEL
                        </Button>
                        <Button
                            className="min-w-[100px] bg-green-500 hover:bg-green-600 text-white font-medium"
                        >
                            SAVE
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
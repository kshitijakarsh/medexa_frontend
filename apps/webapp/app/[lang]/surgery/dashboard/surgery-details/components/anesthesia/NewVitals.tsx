"use client";
import { X } from "lucide-react";
import Button from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
} from "@workspace/ui/components/dialog";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/app/[lang]/surgery/_components/common/forms/form-textarea";
import { useLatestVitalsByPatientId } from "@/app/[lang]/surgery/_hooks/useVitals";
import { Skeleton } from "@workspace/ui/components/skeleton";

export const NewVitals = ({
    open,
    onOpenChange,
    patientId,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    patientId?: string;
}) => {
    const { data: vitalsData, isLoading } = useLatestVitalsByPatientId(patientId);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="max-w-4xl gap-0 p-0 overflow-hidden border-none shadow-none bg-transparent">
                <div className="w-full h-full rounded-2xl bg-white p-3 shadow-sm">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h2 className="text-base font-medium">Vital</h2>
                            <p className="text-sm font-light text-slate-600">Add Vital</p>
                        </div>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="border-b border-dashed border-slate-200 my-4" />

                    {/* Form Content */}
                    {isLoading ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                {[...Array(16)].map((_, i) => (
                                    <Skeleton key={i} className="h-16 w-full rounded-lg" />
                                ))}
                            </div>
                            <Skeleton className="h-24 w-full rounded-lg" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                {/* Row 1 */}
                                <FormInput
                                    label="Blood Pressure"
                                    placeholder="Enter BP"
                                    defaultValue={vitalsData?.blood_pressure_systolic && vitalsData?.blood_pressure_diastolic
                                        ? `${vitalsData.blood_pressure_systolic}/${vitalsData.blood_pressure_diastolic}`
                                        : ""}
                                />
                                <FormInput
                                    label="Pulse Rate"
                                    placeholder="Enter Pulse Rate"
                                    defaultValue={vitalsData?.heart_rate?.toString() ?? ""}
                                />
                                <FormInput
                                    label="Respiration Rate"
                                    placeholder="Enter RR"
                                    defaultValue={vitalsData?.respiratory_rate?.toString() ?? ""}
                                />
                                <FormInput
                                    label="Spo2(%)"
                                    placeholder="Enter Spo2"
                                    defaultValue={vitalsData?.oxygen_saturation?.toString() ?? ""}
                                />

                                {/* Row 2 */}
                                <FormInput
                                    label="Systolic(L)"
                                    placeholder="Enter Systolic(L)"
                                    defaultValue={vitalsData?.blood_pressure_systolic?.toString() ?? ""}
                                />
                                <FormInput
                                    label="Diastolic(L)"
                                    placeholder="Enter Diastolic(L)"
                                    defaultValue={vitalsData?.blood_pressure_diastolic?.toString() ?? ""}
                                />
                                <FormInput
                                    label="Systolic(R)"
                                    placeholder="Enter Systolic(R)"
                                    defaultValue=""
                                />
                                <FormInput
                                    label="Diastolic(R)"
                                    placeholder="Enter Diastolic(R)"
                                    defaultValue=""
                                />

                                {/* Row 3 */}
                                <FormInput
                                    label="Temperature"
                                    placeholder="Enter Temperature"
                                    defaultValue={vitalsData?.temperature?.toString() ?? ""}
                                />
                                <FormInput
                                    label="GRBS"
                                    placeholder="Enter GRBS"
                                    defaultValue={vitalsData?.blood_glucose?.toString() ?? ""}
                                />
                                <FormInput
                                    label="HB"
                                    placeholder="Enter HB"
                                    defaultValue=""
                                />
                                <FormInput
                                    label="Height"
                                    placeholder="Enter Height"
                                    defaultValue={vitalsData?.height?.toString() ?? ""}
                                />

                                {/* Row 4 */}
                                <FormInput
                                    label="Weight"
                                    placeholder="Enter Weight"
                                    defaultValue={vitalsData?.weight?.toString() ?? ""}
                                />
                                <FormInput
                                    label="BMI"
                                    placeholder="Enter BMI"
                                    defaultValue={vitalsData?.bmi?.toString() ?? ""}
                                />
                                <FormInput
                                    label="IBW"
                                    placeholder="Enter IBW"
                                    defaultValue=""
                                />
                                <FormInput
                                    label="RBS"
                                    placeholder="Enter RBS"
                                    defaultValue=""
                                />
                            </div>

                            {/* Additional Note */}
                            <FormTextarea
                                label="Additional Note"
                                placeholder="Enter Additional Note"
                                className="min-h-[100px]"
                                defaultValue={vitalsData?.additional_note ?? ""}
                            />
                        </div>
                    )}

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

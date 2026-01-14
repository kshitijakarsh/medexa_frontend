"use client";
import { X } from "lucide-react";
import Button from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
} from "@workspace/ui/components/dialog";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/app/[lang]/surgery/_components/common/forms/form-textarea";
import { useLatestVitalsByPatientId, useCreateVitals, useUpdateVitals } from "@/app/[lang]/surgery/_hooks/useVitals";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useDictionary } from "@/i18n/use-dictionary";

export const NewVitals = ({
    open,
    onOpenChange,
    patientId,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    patientId?: string;
}) => {
    const dict = useDictionary();
    const anesthesia = dict.pages.surgery.surgeryDetails.anesthesia;
    const vitals = anesthesia.vitals;

    const { data: vitalsData, isLoading } = useLatestVitalsByPatientId(patientId);
    const createVitals = useCreateVitals();
    const updateVitals = useUpdateVitals();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: any = Object.fromEntries(formData.entries());

        // Add IDs
        data.patient_id = patientId || "";
        data.visit_id = "15"; // TODO: specific Get actual visit_id

        if (vitalsData?.id) {
            updateVitals.mutate({ id: vitalsData.id, data }, {
                onSuccess: () => {
                    onOpenChange(false);
                },
            });
        } else {
            createVitals.mutate(data, {
                onSuccess: () => {
                    onOpenChange(false);
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="max-w-4xl gap-0 p-0 overflow-hidden border-none shadow-none bg-transparent">
                <form onSubmit={handleSubmit} className="w-full h-full rounded-2xl bg-white p-3 shadow-sm">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h2 className="text-base font-medium">{vitals.title}</h2>
                            <p className="text-sm font-light text-slate-600">{vitals.subtitle}</p>
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
                                    label={vitals.fields.bloodPressure}
                                    name="blood_pressure"
                                    placeholder={vitals.placeholders.enterBP}
                                    defaultValue={vitalsData?.blood_pressure || ""}
                                />
                                <FormInput
                                    label={vitals.fields.pulseRate}
                                    name="pulse_rate"
                                    placeholder={vitals.placeholders.enterPulseRate}
                                    defaultValue={vitalsData?.pulse_rate || ""}
                                />
                                <FormInput
                                    label={vitals.fields.respirationRate}
                                    name="respiration_rate"
                                    placeholder={vitals.placeholders.enterRR}
                                    defaultValue={vitalsData?.respiration_rate || ""}
                                />
                                <FormInput
                                    label={vitals.fields.spo2}
                                    name="spo2"
                                    placeholder={vitals.placeholders.enterSpo2}
                                    defaultValue={vitalsData?.spo2 || ""}
                                />

                                {/* Row 2 */}
                                <FormInput
                                    label={vitals.fields.systolicL}
                                    name="systolic_left"
                                    placeholder={vitals.placeholders.enterSystolicL}
                                    defaultValue={vitalsData?.systolic_left || ""}
                                />
                                <FormInput
                                    label={vitals.fields.diastolicL}
                                    name="diastolic_left"
                                    placeholder={vitals.placeholders.enterDiastolicL}
                                    defaultValue={vitalsData?.diastolic_left || ""}
                                />
                                <FormInput
                                    label={vitals.fields.systolicR}
                                    name="systolic_right"
                                    placeholder={vitals.placeholders.enterSystolicR}
                                    defaultValue=""
                                />
                                <FormInput
                                    label={vitals.fields.diastolicR}
                                    name="diastolic_right"
                                    placeholder={vitals.placeholders.enterDiastolicR}
                                    defaultValue=""
                                />

                                {/* Row 3 */}
                                <FormInput
                                    label={vitals.fields.temperature}
                                    name="temperature"
                                    placeholder={vitals.placeholders.enterTemperature}
                                    defaultValue={vitalsData?.temperature || ""}
                                />
                                <FormInput
                                    label={vitals.fields.grbs}
                                    name="grbs"
                                    placeholder={vitals.placeholders.enterGRBS}
                                    defaultValue={vitalsData?.grbs || ""}
                                />
                                <FormInput
                                    label={vitals.fields.hb}
                                    name="hb"
                                    placeholder={vitals.placeholders.enterHB}
                                    defaultValue=""
                                />
                                <FormInput
                                    label={vitals.fields.height}
                                    name="height"
                                    placeholder={vitals.placeholders.enterHeight}
                                    defaultValue={vitalsData?.height || ""}
                                />

                                {/* Row 4 */}
                                <FormInput
                                    label={vitals.fields.weight}
                                    name="weight"
                                    placeholder={vitals.placeholders.enterWeight}
                                    defaultValue={vitalsData?.weight || ""}
                                />
                                <FormInput
                                    label={vitals.fields.bmi}
                                    name="bmi"
                                    placeholder={vitals.placeholders.enterBMI}
                                    defaultValue={vitalsData?.bmi || ""}
                                />
                                <FormInput
                                    label={vitals.fields.ibw}
                                    name="ibw"
                                    placeholder={vitals.placeholders.enterIBW}
                                    defaultValue=""
                                />
                                <FormInput
                                    label={vitals.fields.rbs}
                                    name="rbs"
                                    placeholder={vitals.placeholders.enterRBS}
                                    defaultValue=""
                                />
                            </div>

                            {/* Additional Note */}
                            <FormTextarea
                                label={vitals.fields.additionalNote}
                                name="additional_note"
                                placeholder={vitals.placeholders.enterAdditionalNote}
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
                            {dict.common.cancel}
                        </Button>
                        <Button
                            className="min-w-[100px] bg-green-500 hover:bg-green-600 text-white font-medium"
                            type="submit"
                            disabled={createVitals.isPending || updateVitals.isPending}
                        >
                            {createVitals.isPending || updateVitals.isPending ? dict.common.saving : dict.common.save}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

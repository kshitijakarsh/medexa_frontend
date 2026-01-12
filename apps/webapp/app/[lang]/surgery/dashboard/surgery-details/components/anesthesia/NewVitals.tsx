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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="max-w-4xl gap-0 p-0 overflow-hidden border-none shadow-none bg-transparent">
                <div className="w-full h-full rounded-2xl bg-white p-3 shadow-sm">
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
                                    placeholder={vitals.placeholders.enterBP}
                                    defaultValue={vitalsData?.blood_pressure_systolic && vitalsData?.blood_pressure_diastolic
                                        ? `${vitalsData.blood_pressure_systolic}/${vitalsData.blood_pressure_diastolic}`
                                        : ""}
                                />
                                <FormInput
                                    label={vitals.fields.pulseRate}
                                    placeholder={vitals.placeholders.enterPulseRate}
                                    defaultValue={vitalsData?.heart_rate?.toString() ?? ""}
                                />
                                <FormInput
                                    label={vitals.fields.respirationRate}
                                    placeholder={vitals.placeholders.enterRR}
                                    defaultValue={vitalsData?.respiratory_rate?.toString() ?? ""}
                                />
                                <FormInput
                                    label={vitals.fields.spo2}
                                    placeholder={vitals.placeholders.enterSpo2}
                                    defaultValue={vitalsData?.oxygen_saturation?.toString() ?? ""}
                                />

                                {/* Row 2 */}
                                <FormInput
                                    label={vitals.fields.systolicL}
                                    placeholder={vitals.placeholders.enterSystolicL}
                                    defaultValue={vitalsData?.blood_pressure_systolic?.toString() ?? ""}
                                />
                                <FormInput
                                    label={vitals.fields.diastolicL}
                                    placeholder={vitals.placeholders.enterDiastolicL}
                                    defaultValue={vitalsData?.blood_pressure_diastolic?.toString() ?? ""}
                                />
                                <FormInput
                                    label={vitals.fields.systolicR}
                                    placeholder={vitals.placeholders.enterSystolicR}
                                    defaultValue=""
                                />
                                <FormInput
                                    label={vitals.fields.diastolicR}
                                    placeholder={vitals.placeholders.enterDiastolicR}
                                    defaultValue=""
                                />

                                {/* Row 3 */}
                                <FormInput
                                    label={vitals.fields.temperature}
                                    placeholder={vitals.placeholders.enterTemperature}
                                    defaultValue={vitalsData?.temperature?.toString() ?? ""}
                                />
                                <FormInput
                                    label={vitals.fields.grbs}
                                    placeholder={vitals.placeholders.enterGRBS}
                                    defaultValue={vitalsData?.blood_glucose?.toString() ?? ""}
                                />
                                <FormInput
                                    label={vitals.fields.hb}
                                    placeholder={vitals.placeholders.enterHB}
                                    defaultValue=""
                                />
                                <FormInput
                                    label={vitals.fields.height}
                                    placeholder={vitals.placeholders.enterHeight}
                                    defaultValue={vitalsData?.height?.toString() ?? ""}
                                />

                                {/* Row 4 */}
                                <FormInput
                                    label={vitals.fields.weight}
                                    placeholder={vitals.placeholders.enterWeight}
                                    defaultValue={vitalsData?.weight?.toString() ?? ""}
                                />
                                <FormInput
                                    label={vitals.fields.bmi}
                                    placeholder={vitals.placeholders.enterBMI}
                                    defaultValue={vitalsData?.bmi?.toString() ?? ""}
                                />
                                <FormInput
                                    label={vitals.fields.ibw}
                                    placeholder={vitals.placeholders.enterIBW}
                                    defaultValue=""
                                />
                                <FormInput
                                    label={vitals.fields.rbs}
                                    placeholder={vitals.placeholders.enterRBS}
                                    defaultValue=""
                                />
                            </div>

                            {/* Additional Note */}
                            <FormTextarea
                                label={vitals.fields.additionalNote}
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
                            {anesthesia.actions.cancel}
                        </Button>
                        <Button
                            className="min-w-[100px] bg-green-500 hover:bg-green-600 text-white font-medium"
                        >
                            {anesthesia.actions.save}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

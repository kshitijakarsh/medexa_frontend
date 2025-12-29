"use client";
import { X } from "lucide-react";
import Button from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
} from "@workspace/ui/components/dialog";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/app/[lang]/surgery/components/common/forms/form-textarea";

export const NewVitals = ({
    open,
    onOpenChange
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
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
                    <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-4">
                            {/* Row 1 */}
                            <FormInput label="Blood Pressure" placeholder="Enter BP" />
                            <FormInput label="Pulse Rate" placeholder="Enter Pulse Rate" />
                            <FormInput label="Respiration Rate" placeholder="Enter RR" />
                            <FormInput label="Spo2(%)" placeholder="Enter Spo2" />

                            {/* Row 2 */}
                            <FormInput label="Systolic(L)" placeholder="Enter Systolic(L)" />
                            <FormInput label="Diastolic(L)" placeholder="Enter Diastolic(L)" />
                            <FormInput label="Systolic(R)" placeholder="Enter Systolic(R)" />
                            <FormInput label="Diastolic(R)" placeholder="Enter Diastolic(R)" />

                            {/* Row 3 */}
                            <FormInput label="Temperature" placeholder="Enter Temperature" />
                            <FormInput label="GRBS" placeholder="Enter GRBS" />
                            <FormInput label="HB" placeholder="Enter HB" />
                            <FormInput label="Height" placeholder="Enter Height" />

                            {/* Row 4 */}
                            <FormInput label="Weight" placeholder="Enter Weight" />
                            <FormInput label="BMI" placeholder="Enter BMI" />
                            <FormInput label="IBW" placeholder="Enter IBW" />
                            <FormInput label="RBS" placeholder="Enter RBS" />
                        </div>

                        {/* Additional Note */}
                        <FormTextarea
                            label="Additional Note"
                            placeholder="Enter Additional Note"
                            className="min-h-[100px]"
                        />
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

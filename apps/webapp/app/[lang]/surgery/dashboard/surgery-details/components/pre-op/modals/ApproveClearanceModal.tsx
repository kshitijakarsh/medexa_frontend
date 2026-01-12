"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { z, zodResolver } from "@workspace/ui/lib/zod";
import { useForm } from "@workspace/ui/hooks/use-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form";
import { ChecklistItem } from "../PreOpChecklist";
import { Info, CheckCircle2 } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

const approveClearanceSchema = z.object({
    status: z.string().min(1, "Required"),
    notes: z.string().optional(),
    doctor: z.string().min(1, "Required"),
});

type ApproveClearanceData = z.infer<typeof approveClearanceSchema>;

type ApproveClearanceModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    onApprove: (data: ApproveClearanceData) => void;
    mode?: 'approve' | 'view';
    itemData?: ChecklistItem;
};

import { useDictionary } from "@/i18n/use-dictionary";

export default function ApproveClearanceModal({
    open,
    onOpenChange,
    title,
    onApprove,
    mode = 'approve',
    itemData,
}: ApproveClearanceModalProps) {
    const user = useUserStore((s) => s.user);
    const doctorName = user?.name || "Dr Vinay";
    const dict = useDictionary();

    const form = useForm<ApproveClearanceData>({
        resolver: zodResolver(approveClearanceSchema),
        defaultValues: {
            status: "",
            notes: "",
            doctor: doctorName,
        },
    });

    React.useEffect(() => {
        if (open) {
            form.reset({
                status: "",
                notes: "",
                doctor: doctorName,
            });
        }
    }, [open, doctorName, form]);

    const handleAdd = (data: ApproveClearanceData) => {
        onApprove(data);
        onOpenChange(false);
    };

    const isView = mode === 'view';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white gap-0 border-none shadow-lg">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-xl font-normal text-slate-900">
                        {title}
                    </DialogTitle>
                    <p className="text-xs text-slate-500">
                        {isView ? `${dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.orderedBy} Dr. Vinay ${dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.at} 8:45 AM.` : `${title} ${dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.forPatient}`}
                    </p>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAdd)} className="space-y-4">
                        <div className="px-6 py-4 space-y-4">
                            {isView ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="p-4 rounded-xl border border-slate-100 bg-white">
                                            <p className="text-xs text-slate-500 font-medium mb-1">{dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.assignedTo}</p>
                                            <p className="text-sm font-medium text-slate-900">{itemData?.doctor || dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.notAssigned}</p>
                                        </div>
                                        <div className="p-4 rounded-xl border border-slate-100 bg-white">
                                            <p className="text-xs text-slate-500 font-medium mb-1">{dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.physicianStatus}</p>
                                            <p className={`text-sm font-normal ${itemData?.clearanceStatus === 'Not Fit for Surgery' ? 'text-red-500' : 'text-green-500'}`}>
                                                {itemData?.clearanceStatus === 'Not Fit for Surgery' ? dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.notFitForSurgery : dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.fitForSurgery}
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-xl border border-slate-100 bg-white">
                                            <p className="text-xs text-slate-500 font-medium mb-1">{dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.status}</p>
                                            <div className="flex items-center gap-1.5">
                                                <Info size={14} />
                                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full w-fit ${itemData?.status === 'Completed' ? 'bg-green-500/10 text-green-600' :
                                                    itemData?.status === 'Pending' ? 'bg-slate-100 text-slate-600' :
                                                        'bg-blue-500/10 text-blue-600'
                                                    }`}>

                                                    <span className="text-sm text-normal">{itemData?.status === 'Completed' ? dict.pages.surgery.dashboard.completed :
                                                        itemData?.status === 'Pending' ? dict.pages.surgery.dashboard.pending :
                                                            itemData?.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 rounded-xl bg-blue-50/50 border border-blue-100">
                                        <p className="text-sm font-normal text-slate-900 mb-2">{dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.instructions}</p>
                                        <p className="text-sm text-slate-600">
                                            {itemData?.notes || dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.noNotes}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="doctor"
                                            render={({ field }) => (
                                                <FormItem className="space-y-2">
                                                    <label className="text-sm font-medium text-slate-700">
                                                        {dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.doctor}
                                                    </label>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled
                                                            className="bg-blue-50/50 border-blue-100 text-slate-700 h-10"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem className="space-y-2">
                                                    <label className="text-sm font-medium text-slate-700">
                                                        {dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.physicianStatus}
                                                    </label>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="border-slate-200 h-10 focus:ring-blue-500">
                                                                <SelectValue placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.selectStatus} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Fit for Surgery">{dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.fitForSurgery}</SelectItem>
                                                            <SelectItem value="Not Fit for Surgery">{dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.notFitForSurgery}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="notes"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">
                                                    {dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.notes}
                                                </label>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.notesPlaceholder}
                                                        className="min-h-[120px] resize-none border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                        </div>

                        {!isView && (
                            <div className="p-6 pt-2 flex items-center justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-11 px-8 border-blue-500 text-blue-500 hover:bg-blue-50 font-medium rounded-xl text-md"
                                    onClick={() => onOpenChange(false)}
                                >
                                    {dict.pages.surgery.surgeryDetails.common.cancel}
                                </Button>
                                <Button
                                    type="submit"
                                    className="h-11 px-12 bg-[#48bb78] hover:bg-[#38a169] text-white font-medium rounded-xl text-md"
                                >
                                    {dict.pages.surgery.surgeryDetails.common.add}
                                </Button>
                            </div>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

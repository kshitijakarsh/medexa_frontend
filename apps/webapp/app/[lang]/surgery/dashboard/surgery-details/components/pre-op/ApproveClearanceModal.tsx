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
import { ChecklistItem } from "./PreOpViewMode";
import { Info, CheckCircle2 } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

type ApproveClearanceModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    onApprove: (data: { status: string; notes: string; doctor: string }) => void;
    mode?: 'approve' | 'view';
    itemData?: ChecklistItem;
};

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

    const [status, setStatus] = React.useState("");
    const [notes, setNotes] = React.useState("");

    const handleAdd = () => {
        onApprove({ status, notes, doctor: doctorName });
        setStatus("");
        setNotes("");
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
                        {isView ? `Ordered by Dr. Vinay at 8:45 AM.` : `${title} for the patient`}
                    </p>
                </DialogHeader>

                <div className="px-6 py-4 space-y-4">
                    {isView ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-3">
                                <div className="p-4 rounded-xl border border-slate-100 bg-white">
                                    <p className="text-xs text-slate-500 font-medium mb-1">Assigned to</p>
                                    <p className="text-sm font-medium text-slate-900">{itemData?.doctor || "Not Assigned"}</p>
                                </div>
                                <div className="p-4 rounded-xl border border-slate-100 bg-white">
                                    <p className="text-xs text-slate-500 font-medium mb-1">Physician Status</p>
                                    <p className={`text-sm font-normal ${itemData?.clearanceStatus === 'Not Fit for Surgery' ? 'text-red-500' : 'text-green-500'}`}>
                                        {itemData?.clearanceStatus || "Fit For Surgery"}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl border border-slate-100 bg-white">
                                    <p className="text-xs text-slate-500 font-medium mb-1">Status</p>
                                    <div className="flex items-center gap-1.5">
                                        <Info size={14} />
                                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full w-fit ${itemData?.status === 'Completed' ? 'bg-green-500/10 text-green-600' :
                                            itemData?.status === 'Pending' ? 'bg-slate-100 text-slate-600' :
                                                'bg-blue-500/10 text-blue-600'
                                            }`}>

                                            <span className="text-sm text-normal">{itemData?.status || "Pending"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-blue-50/50 border border-blue-100">
                                <p className="text-sm font-normal text-slate-900 mb-2">Instructions / Notes</p>
                                <p className="text-sm text-slate-600">
                                    {itemData?.notes || "No notes provided."}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Doctor
                                    </label>
                                    <Input
                                        value={doctorName}
                                        disabled
                                        className="bg-blue-50/50 border-blue-100 text-slate-700 h-10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Physician Status
                                    </label>
                                    <Select onValueChange={setStatus} value={status}>
                                        <SelectTrigger className="border-slate-200 h-10 focus:ring-blue-500">
                                            <SelectValue placeholder="Select Surgery Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Fit for Surgery">Fit for Surgery</SelectItem>
                                            <SelectItem value="Not Fit for Surgery">Not Fit for Surgery</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Notes (Optional)
                                </label>
                                <Textarea
                                    placeholder="Enter Notes"
                                    className="min-h-[120px] resize-none border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                </div>

                {!isView && (
                    <div className="p-6 pt-2 flex items-center justify-end gap-3">
                        <Button
                            variant="outline"
                            className="h-11 px-8 border-blue-500 text-blue-500 hover:bg-blue-50 font-medium rounded-xl text-md"
                            onClick={() => onOpenChange(false)}
                        >
                            CANCEL
                        </Button>
                        <Button
                            className="h-11 px-12 bg-[#48bb78] hover:bg-[#38a169] text-white font-medium rounded-xl text-md"
                            onClick={handleAdd}
                        >
                            ADD
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

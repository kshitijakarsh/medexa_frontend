"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@workspace/ui/components/dialog";
import { User, Stethoscope, Clock, FileText, X } from "lucide-react";

export type NurseOrderData = {
    orderType: string;
    catheterType?: string;
    careType?: string;
    frequency?: string;
    urgency?: string;
    startDate?: string;
    startTime?: string;
    injection?: string;
    dose?: string;
    instructions?: string;
    status: string;
    orderedBy: string;
    assignedTo: string;
    orderedAt: string;
};

type NurseOrderViewModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data?: NurseOrderData;
};

const DetailCard = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
    <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
        <p className="text-xs text-slate-500 mb-0.5 flex items-center gap-1">
            {label}
        </p>
        <p className="text-xs font-medium text-slate-900 flex items-center gap-2">
            {icon}
            {value}
        </p>
    </div>
);

const SummaryCard = ({ label, value, subIcon, subClass }: { label: string; value: string; subIcon?: React.ReactNode; subClass?: string }) => (
    <div className="bg-blue-50/50 p-3 rounded-lg flex-1 border border-blue-100">
        <p className="text-xs font-medium text-slate-700 mb-0.5">{label}</p>
        <div className={`flex items-center gap-2 text-xs ${subClass || "text-slate-600"}`}>
            {subIcon}
            <span>{value}</span>
        </div>
    </div>
);

import { useDictionary } from "@/i18n/use-dictionary";

export default function NurseOrderViewModal({
    open,
    onOpenChange,
    data,
}: NurseOrderViewModalProps) {
    const dict = useDictionary();
    if (!data) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-white gap-0">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex items-start justify-between bg-white">
                    <div>
                        <DialogTitle className="text-base font-semibold text-slate-900 mb-0.5">
                            {dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.title}
                        </DialogTitle>
                        <p className="text-xs text-slate-500">
                            {dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.orderedBy} {data.orderedBy} {dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.at} {data.orderedAt}.
                        </p>
                    </div>
                </div>

                <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
                    {/* Summary Row */}
                    <div className="flex gap-2">
                        <SummaryCard
                            label={dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.orderedBy}
                            value={data.orderedBy}
                            subIcon={<Stethoscope size={12} />}
                        />
                        <SummaryCard
                            label={dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.assignedTo}
                            value={data.assignedTo}
                            subIcon={<User size={12} />}
                        />
                        <div className="bg-blue-50/50 p-3 rounded-lg flex-1 border border-blue-100">
                            <p className="text-xs font-medium text-slate-700 mb-0.5">{dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.status}</p>
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-500 text-white mt-0.5">
                                <Clock size={10} />
                                {data.status}
                            </span>
                        </div>
                    </div>

                    {/* Bed Assignment Details */}
                    <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                        <h3 className="text-sm font-semibold text-slate-900 mb-1">{dict.pages.surgery.surgeryDetails.preOp.modals.bloodRequirementView.bedAssignment}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.orderType} value={data.orderType} />
                            {data.catheterType && <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.catheterType} value={data.catheterType} />}
                            {data.careType && <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.careType} value={data.careType} />}
                            {data.frequency && <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.frequency} value={data.frequency} />}
                            {data.urgency && <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.urgency} value={data.urgency} />}

                            {(data.startDate || data.startTime) && (
                                <div className="grid grid-cols-2 gap-2 col-span-1 md:col-span-1">
                                    {data.startDate && <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.startDate} value={data.startDate} />}
                                    {data.startTime && <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.startTime} value={data.startTime} />}
                                </div>
                            )}

                            {data.injection && <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.injection} value={data.injection} />}
                            {data.dose && <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.dose} value={data.dose} />}

                        </div>
                    </div>

                    {/* Instructions / Notes */}
                    {data.instructions && (
                        <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-slate-900 mb-0.5">{dict.pages.surgery.surgeryDetails.preOp.modals.nurseOrders.instructions}</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {data.instructions}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

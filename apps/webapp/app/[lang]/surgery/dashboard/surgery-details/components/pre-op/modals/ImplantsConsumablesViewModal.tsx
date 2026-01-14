"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@workspace/ui/components/dialog";
import { Stethoscope, Clock } from "lucide-react";

export type ImplantConsumableData = {
    implantType: string;
    size?: string;
    batchLotNo?: string;
    manufacturer?: string;
    quantity?: number;
    clinicalNotes?: string;
    status: string;
    orderedBy: string;
};

type ImplantsConsumablesViewModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data?: ImplantConsumableData;
};

const DetailCard = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        <p className="text-xs font-medium text-slate-900">{value}</p>
    </div>
);

const SummaryCard = ({ label, value, subIcon }: { label: string; value: string; subIcon?: React.ReactNode }) => (
    <div className="bg-blue-50/50 p-3 rounded-lg flex-1 border border-blue-100">
        <p className="text-xs font-medium text-slate-700 mb-0.5">{label}</p>
        <div className="flex items-center gap-2 text-xs text-slate-600">
            {subIcon}
            <span>{value}</span>
        </div>
    </div>
);

import { useDictionary } from "@/i18n/use-dictionary";

export default function ImplantsConsumablesViewModal({
    open,
    onOpenChange,
    data,
}: ImplantsConsumablesViewModalProps) {
    const dict = useDictionary();
    if (!data) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-white gap-0">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 bg-white">
                    <DialogTitle className="text-base font-semibold text-slate-900 mb-0.5">
                        {dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.title}
                    </DialogTitle>
                    <p className="text-xs text-slate-500">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.orderedSubtitle}</p>
                </div>

                <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
                    {/* Summary Row */}
                    <div className="flex gap-2">
                        <SummaryCard
                            label={dict.pages.surgery.surgeryDetails.preOp.modals.approveClearance.orderedBy}
                            value={data.orderedBy}
                            subIcon={<Stethoscope size={12} />}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.implantType} value={data.implantType} />
                            {data.size && <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.size} value={data.size} />}
                            {data.batchLotNo && <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.batchNo} value={data.batchLotNo} />}
                            {data.manufacturer && <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.manufacturer} value={data.manufacturer} />}
                            {data.quantity && <DetailCard label={dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.quantity} value={data.quantity.toString()} />}
                        </div>
                    </div>

                    {/* Clinical Notes */}
                    {data.clinicalNotes && (
                        <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-slate-900 mb-0.5">{dict.pages.surgery.surgeryDetails.preOp.modals.implantsConsumables.clinicalNotes}</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {data.clinicalNotes}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

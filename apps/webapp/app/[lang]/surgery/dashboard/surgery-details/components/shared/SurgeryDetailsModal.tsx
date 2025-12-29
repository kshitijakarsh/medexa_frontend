"use client";

import { AppDialog } from "@/components/common/app-dialog";
import { StatusPill } from "@/components/common/pasient-card/status-pill";
import { Info } from "lucide-react";

interface Surgery {
    id: number;
    surgeryType: string;
    department: string;
    requestedDate: string;
    doctor: string;
    urgency: "Elective" | "Urgent" | "Emergency";
    status: "Ordered" | "Completed" | "In Progress" | "Cancelled";
    specialNotes?: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    surgery: Surgery | null;
}

export default function SurgeryDetailsModal({ open, onClose, surgery }: Props) {
    if (!surgery) return null;

    // Format the requested date for display
    const formatRequestedInfo = () => {
        const date = new Date(surgery.requestedDate);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).replace(/\//g, "-");
        const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
        return `Requested By ${surgery.doctor} On ${formattedDate} at ${formattedTime}.`;
    };

    return (
        <AppDialog
            open={open}
            onClose={onClose}
            title="Requested Surgery"
            description={formatRequestedInfo()}
            maxWidth="md:max-w-2xl"
            headerColor="white"
        >
            <div className="space-y-4">
                {/* Doctor and Status Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                        <p className="text-slate-800 font-medium">{surgery.doctor}</p>
                        <p className="text-slate-500 text-sm">{surgery.department}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                        <p className="text-slate-600 text-sm mb-1">Status</p>
                        <div className="flex items-center gap-2">
                            <Info size={16} className="text-slate-400" />
                            <StatusPill status={surgery.status} />
                        </div>
                    </div>
                </div>

                {/* Surgery Information */}
                <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="text-slate-800 font-semibold mb-4">Surgery Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-lg p-4">
                            <p className="text-slate-500 text-sm mb-1">Procedure</p>
                            <p className="text-slate-800 font-medium">{surgery.surgeryType}</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                            <p className="text-slate-500 text-sm mb-1">Department</p>
                            <p className="text-slate-800 font-medium">{surgery.department}</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                            <p className="text-slate-500 text-sm mb-1">Urgency</p>
                            <p className="text-slate-800 font-medium">{surgery.urgency === "Elective" ? "Routine" : surgery.urgency}</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                            <p className="text-slate-500 text-sm mb-1">Start Date</p>
                            <p className="text-slate-800 font-medium">
                                {new Date(surgery.requestedDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Special Notes */}
                <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-slate-800 font-semibold mb-2">Special Notes</h3>
                    <p className="text-slate-600 text-sm">
                        {surgery.specialNotes || "Clean urethral area with antiseptic solution. Ensure catheter tubing is not kinked. Monitor urine color and output. Report if patient complains of discomfort or leakage."}
                    </p>
                </div>
            </div>
        </AppDialog>
    );
}

"use client";

import React from "react";
import {
    SquareCheckBig,
    Stethoscope,
    Pencil,
    MoreVertical,
    Eye,
    Printer,
    Download,
    Info,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import DocumentViewModal, { DocumentData } from "./DocumentViewModal";
import NurseOrderViewModal, { NurseOrderData } from "./NurseOrderViewModal";
import ImplantsConsumablesViewModal, { ImplantConsumableData } from "./ImplantsConsumablesViewModal";
import BloodRequirementViewModal, { BloodRequirementData } from "./BloodRequirementViewModal";

type ItemStatus = "Completed" | "Ordered" | "Pending" | "Processing" | "Due" | "N/A";

type ChecklistItem = {
    label: string;
    status?: ItemStatus;
    subLabel?: string;
    category?: string;
    urgency?: string;
    orderedBy?: string;
    previousResult?: {
        date: string;
        count: number;
    };
};

export type PreOpMetric = {
    title: string;
    completed: number;
    total: number;
};

const MetricCard = ({ metric }: { metric: PreOpMetric }) => {
    const percentage = Math.round((metric.completed / metric.total) * 100);

    return (
        <div className="bg-slate-50 rounded-xl p-4 min-w-[200px] flex-1">
            <h3 className="text-xs text-slate-700 mb-2">{metric.title}</h3>
            <div className="flex items-end justify-between font-semibold text-lg text-slate-900 mb-2">
                <span>{metric.completed}/{metric.total}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

type AddOption = {
    value: string;
    label: string;
    group?: string;
};

type SectionConfig = {
    title: string;
    count?: string;
    showChanged?: boolean;
    items: ChecklistItem[];
    addLabel: string;
    addOptions: AddOption[];
};

const SECTIONS: SectionConfig[] = [
    {
        title: "Procedures",
        showChanged: false,
        items: [
            {
                label: "Laparoscopic Cholecystectomy",
                subLabel: "Impression: Normal sinus rhythm. No ST-T wave changes. No evidence of acute ischemia."
            },
        ],
        addLabel: "",
        addOptions: [],
    },
    {
        title: "Required Investigations",
        showChanged: true,
        items: [
            { label: "Complete Blood Count (CBC)", status: "Completed", subLabel: "2025-09-27 19:30", urgency: "Stat", orderedBy: "Dr. Vinay" },
            { label: "Liver Function Test (LFT)", status: "Completed", subLabel: "2025-09-27 19:30", category: "Laboratory Test", urgency: "Stat", orderedBy: "Dr. Vinay" },
            {
                label: "Renal Function Test (RFT)",
                status: "Ordered",
                subLabel: "2025-09-27 19:30",
                category: "Radiology & Imaging",
                urgency: "Stat",
                orderedBy: "Dr. Sarah",
                previousResult: {
                    date: "05-Dec-2025",
                    count: 2
                }
            },
            { label: "Blood Sugar (Fasting)", status: "Pending", category: "Laboratory Test", urgency: "Stat" },
            { label: "Coagulation Profile (PT/INR)", status: "Pending", category: "Laboratory Test", urgency: "Stat" },
        ],
        addLabel: "Add Investigation",
        addOptions: [],
    },
    {
        title: "Medical Clearances",
        items: [
            { label: "Anaesthesia Clearance", status: "Pending" },
            { label: "Physician Clearance", status: "Completed" },
            { label: "Cardiology Clearance", status: "Completed" },
        ],
        addLabel: "Add Clearance",
        addOptions: [],
    },
    {
        title: "Consents Required",
        items: [
            { label: "Surgical Consent", status: "Completed", subLabel: "Signed by patient & surgeon" },
            { label: "Anaesthesia Consent", status: "Pending" },
            { label: "Blood Transfusion Consent", status: "Pending" },
        ],
        addLabel: "Add Consent",
        addOptions: [],
    },
    {
        title: "Nursing Orders (Pre-Op)",
        items: [
            { label: "NPO Status Check", status: "Completed", subLabel: "Confirmed NPO since 10 PM" },
            { label: "Pre-medication Administered", status: "Ordered", subLabel: "Midazolam ordered" },
            { label: "Vitals Recorded", status: "Pending" },
        ],
        addLabel: "Add Nursing Order",
        addOptions: [],
    },
    {
        title: "Patient Preparation Requirements",
        items: [
            { label: "Site Marking", status: "Completed", subLabel: "Marked by Dr. Vinay" },
            { label: "Skin Preparation", status: "Pending" },
            { label: "Jewelry/Dentures Removed", status: "Pending" },
        ],
        addLabel: "Add Prep Requirement",
        addOptions: [],
    },
    {
        title: "Anaesthesia Requirements",
        items: [
            { label: "GA Machine Check", status: "Pending" },
            { label: "Spinal Tray", status: "Ordered", subLabel: "Requested from CSSD" },
            { label: "Difficult Airway Cart", status: "N/A" },
        ],
        addLabel: "Add Anaesthesia Req",
        addOptions: [],
    },
    {
        title: "Equipment & Instruments",
        items: [
            { label: "Laparoscopic Tower", subLabel: "Reserved for OR 2", status: "Ordered" },
            { label: "Laparoscopic Cholecystectomy Set", status: "Pending" },
            { label: "Cautery Logic (Diathermy)", status: "Pending" },
        ],
        addLabel: "Add Equipment",
        addOptions: [],
    },
    {
        title: "Implants & Consumables",
        items: [
            { label: "Prolene Mesh (15x15)", status: "Ordered", subLabel: "Size verification needed" },
            { label: "Tacker (Absorbable)", status: "Pending" },
            { label: "Trocars (10mm, 5mm)", status: "Pending" },
        ],
        addLabel: "Add Implant/Consumable",
        addOptions: [],
    },
    {
        title: "Blood & Resource Preparation",
        items: [
            { label: "Blood Grouping & Cross Matching", status: "Completed", subLabel: "O+ Confirmed" },
            { label: "Reserve 2 Units PRBC", status: "Ordered", subLabel: "Sent to Blood Bank" },
        ],
        addLabel: "Add Blood/Resource",
        addOptions: [],
    },
];

const STATUS_STYLES: Record<ItemStatus, string> = {
    Completed: "bg-green-500 text-white",
    Ordered: "bg-orange-500 text-white",
    Pending: "bg-slate-300 text-slate-700",
    Processing: "bg-blue-500 text-white",
    Due: "bg-red-500 text-white",
    "N/A": "bg-slate-200 text-slate-500",
};

const newItemUrgencyStyle = (urgency: string) => {
    switch (urgency.toLowerCase()) {
        case "stat": return "bg-red-100 text-red-500 border-red-200";
        case "urgent": return "bg-orange-100 text-orange-500 border-orange-200";
        case "routine": return "bg-blue-100 text-blue-500 border-blue-200";
        default: return "bg-slate-100 text-slate-500 border-slate-200";
    }
};

const ViewSectionCard = ({ config, onViewDocument }: { config: SectionConfig; onViewDocument: (item: ChecklistItem, sectionTitle: string) => void }) => {
    const { title, count, items } = config;

    return (
        <Card className="shadow-none border-0 mb-4 bg-white">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-medium text-slate-800">
                        {title}
                    </CardTitle>

                    {items.length > 0 && title !== "Procedures" && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                            {items.filter(i => i.status === "Completed").length}/{items.length} Completed
                        </span>
                    )}
                </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className={`rounded-lg p-4 border ${item.status === "Completed"
                            ? "border-green-200 bg-green-50/50"
                            : "border-slate-200 bg-white"
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-slate-800">{item.label}</span>
                                    {title !== "Medical Clearances" && (item.category || title === "Required Investigations") && (
                                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                                            {item.category || "Laboratory Test"}
                                        </span>
                                    )}
                                    {item.urgency && (
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${newItemUrgencyStyle(item.urgency)}`}>
                                            {item.urgency.charAt(0).toUpperCase() + item.urgency.slice(1)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                                    {title === "Required Investigations" && (
                                        <>
                                            <span>Biochemistry</span>
                                            <span>|</span>
                                        </>
                                    )}
                                    <span>{item.subLabel || "2025-09-27 19:30"}</span>
                                    {item.status === "Completed" && (
                                        <span className="flex items-center gap-1 text-green-600 px-2 py-0.5">
                                            <SquareCheckBig size={12} />
                                            Completed using previous result
                                        </span>
                                    )}
                                </div>
                                {/* Ordered by */}
                                {(item.status === "Completed" || item.status === "Ordered") && item.orderedBy && title === "Required Investigations" && (
                                    <p className="text-xs text-blue-500 mt-2 flex items-center gap-1 font-medium">
                                        <Stethoscope size={14} /> Ordered By {item.orderedBy}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2">
                                {item.status && (
                                    <span
                                        className={`text-xs font-medium px-3 py-1.5 rounded-full ${STATUS_STYLES[item.status]}`}
                                    >
                                        {item.status}
                                    </span>
                                )}
                                {!["Procedures", "Patient Preparation Requirements", "Equipment & Instruments"].includes(title) && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="flex items-center gap-1 text-xs text-blue-500 font-medium px-2 py-1 rounded-sm transition-colors bg-white hover:bg-slate-50">
                                                Action
                                                <MoreVertical size={14} className="text-green-500" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                className="gap-2 cursor-pointer justify-between"
                                                onClick={() => {
                                                    if (["Required Investigations", "Consents Required", "Nursing Orders (Pre-Op)", "Implants & Consumables", "Blood & Resource Preparation"].includes(title)) {
                                                        onViewDocument(item, title);
                                                    }
                                                }}
                                            >
                                                View <Eye size={14} className="text-slate-500" />
                                            </DropdownMenuItem>
                                            {!["Medical Clearances", "Implants & Consumables", "Blood & Resource Preparation"].includes(title) && (
                                                <>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        Print <Printer size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        Download <Download size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        </div>

                        {/* Previous Result Available Info (Read-only) */}
                        {item.status === "Ordered" && item.previousResult && (
                            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                                <span className="text-blue-500">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    </svg>
                                </span>
                                <p className="text-xs text-slate-600">
                                    Previous result available: {item.previousResult.date} ({item.previousResult.count} results)
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

type PreOpViewModeProps = {
    onEdit?: () => void;
    metrics?: PreOpMetric[];
};

export const PreOpViewMode = ({ onEdit, metrics = [] }: PreOpViewModeProps) => {
    const [selectedDocument, setSelectedDocument] = React.useState<DocumentData | undefined>(undefined);
    const [isDocumentModalOpen, setIsDocumentModalOpen] = React.useState(false);

    const [selectedNurseOrder, setSelectedNurseOrder] = React.useState<NurseOrderData | undefined>(undefined);
    const [isNurseOrderModalOpen, setIsNurseOrderModalOpen] = React.useState(false);

    const [selectedImplant, setSelectedImplant] = React.useState<ImplantConsumableData | undefined>(undefined);
    const [isImplantModalOpen, setIsImplantModalOpen] = React.useState(false);

    const [selectedBloodReq, setSelectedBloodReq] = React.useState<BloodRequirementData | undefined>(undefined);
    const [isBloodReqModalOpen, setIsBloodReqModalOpen] = React.useState(false);

    const handleViewDocument = (item: ChecklistItem, sectionTitle: string) => {
        if (sectionTitle === "Nursing Orders (Pre-Op)") {
            setSelectedNurseOrder({
                orderType: "Catheter Care",
                catheterType: "Suprapubic catheter",
                careType: "Perineal cleaning",
                frequency: "Every 6 hours",
                urgency: item.urgency || "Routine",
                startDate: "2025-09-27",
                startTime: "19:30",
                injection: "Injection Name",
                dose: "10ml",
                instructions: "Ensure drainage bag is below bladder level.",
                status: item.status || "Ordered",
                orderedBy: item.orderedBy || "Dr. Vinay",
                assignedTo: "Nurse Sarah",
                orderedAt: "8:45 AM",
            });
            setIsNurseOrderModalOpen(true);
        } else if (sectionTitle === "Implants & Consumables") {
            setSelectedImplant({
                implantType: "Orthopedic Screw",
                size: "2.5 × 18 mm",
                batchLotNo: "LOT-2024-CH-00123",
                manufacturer: "Medtronic",
                quantity: 2,
                clinicalNotes: "Selected based on vessel diameter measured intra-operatively",
                status: item.status || "Ordered",
                orderedBy: item.orderedBy || "Dr. Vinay",
            });
            setIsImplantModalOpen(true);
        } else if (sectionTitle === "Blood & Resource Preparation") {
            setSelectedBloodReq({
                bloodComponent: "Packed Red Blood Cells (PRBC)",
                bloodGroup: "A+",
                units: 2,
                urgency: "Urgent",
                date: "2025-09-27",
                time: "19:30",
                clinicalNotes: "High risk of bleeding due to dense adhesions. Please keep blood ready before shifting patient to OT.",
                status: item.status || "Ordered",
                orderedBy: item.orderedBy || "Dr. Vinay",
            });
            setIsBloodReqModalOpen(true);
        } else {
            // Mocking document data based on the item
            setSelectedDocument({
                title: item.label,
                description: "Patient complained of Stomach pain; Test done this morning. Please review before prescribing medication.",
                conductedBy: item.orderedBy?.replace("Dr. ", "Nurse ") || "Nurse Sarah", // Mock logic
                date: item.subLabel || "14 Nov 2024 · 08:45 AM",
                // imageUrl: is left undefined to show placeholder
            });
            setIsDocumentModalOpen(true);
        }
    };

    return (
        <div className="space-y-4">
            {/* Metric Cards */}
            {metrics.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-6">
                    {metrics.map((metric) => (
                        <MetricCard key={metric.title} metric={metric} />
                    ))}
                </div>
            )}


            {/* All checklist sections */}
            {SECTIONS.map((section) => (
                <ViewSectionCard
                    key={section.title}
                    config={section}
                    onViewDocument={handleViewDocument}
                />
            ))}

            <DocumentViewModal
                open={isDocumentModalOpen}
                onOpenChange={setIsDocumentModalOpen}
                document={selectedDocument}
            />

            <NurseOrderViewModal
                open={isNurseOrderModalOpen}
                onOpenChange={setIsNurseOrderModalOpen}
                data={selectedNurseOrder}
            />

            <ImplantsConsumablesViewModal
                open={isImplantModalOpen}
                onOpenChange={setIsImplantModalOpen}
                data={selectedImplant}
            />

            <BloodRequirementViewModal
                open={isBloodReqModalOpen}
                onOpenChange={setIsBloodReqModalOpen}
                data={selectedBloodReq}
            />

            {/* Footer Actions */}
            <div className="flex justify-end pt-4">
                {onEdit && (
                    <Button
                        variant="outline"
                        className="border-blue-500 text-blue-500 hover:bg-blue-50"
                        onClick={onEdit}
                    >
                        <Pencil size={16} className="mr-2" />
                        EDIT PRE-OP CHECKLIST
                    </Button>
                )}
            </div>
        </div>
    );
};

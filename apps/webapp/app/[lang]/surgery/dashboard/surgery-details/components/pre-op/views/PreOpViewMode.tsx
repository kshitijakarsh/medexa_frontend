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
    Trash2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { useDictionary } from "@/i18n/use-dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import DocumentViewModal, { DocumentData } from "../modals/DocumentViewModal";
import NurseOrderViewModal, { NurseOrderData } from "../modals/NurseOrderViewModal";
import ImplantsConsumablesViewModal, { ImplantConsumableData } from "../modals/ImplantsConsumablesViewModal";
import BloodRequirementViewModal, { BloodRequirementData } from "../modals/BloodRequirementViewModal";
import ConsentUploadModal from "../modals/ConsentUploadModal";
import ApproveClearanceModal from "../modals/ApproveClearanceModal";
import {
    ItemStatus,
    ChecklistItem,
    PreOpMetric,
    SectionConfig,
    STATUS_STYLES,
    newItemUrgencyStyle
} from "../PreOpChecklist";

// Reusing types and constants from PreOpChecklist

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


const ViewSectionCard = ({
    config,
    onViewDocument,
    onItemClick,
    onDeleteItem,
    onApproveClearance,
}: {
    config: SectionConfig;
    onViewDocument: (item: ChecklistItem, sectionTitle: string) => void;
    onItemClick?: (item: ChecklistItem, sectionTitle: string) => void;
    onDeleteItem?: (item: ChecklistItem, sectionTitle: string) => void;
    onApproveClearance?: (item: ChecklistItem) => void;
}) => {
    const { title, count, items } = config;
    const dict = useDictionary();

    return (
        <Card className="shadow-none border-0 mb-4 bg-white">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-medium text-slate-800">
                        {title}
                    </CardTitle>

                    {items.length > 0 && title !== dict.pages.surgery.surgeryDetails.preOp.sections.procedures && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                            {items.filter(i => i.status === "Completed").length}/{items.length} {dict.pages.surgery.surgeryDetails.common.completed}
                        </span>
                    )}
                </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
                {items.map((item) => (
                    <div
                        key={item.label}
                        onClick={() => onItemClick?.(item, title)}
                        className={`rounded-lg p-4 border transition-colors ${item.status === "Completed"
                            ? "border-green-200 bg-green-50/50"
                            : "border-slate-200 bg-white"
                            } ${onItemClick ? "cursor-pointer hover:border-blue-200" : ""}`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-slate-800">{item.label}</span>
                                    {title !== dict.pages.surgery.surgeryDetails.preOp.sections.clearances && (item.category || title === dict.pages.surgery.surgeryDetails.preOp.sections.investigations) && (
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
                                    {title === dict.pages.surgery.surgeryDetails.preOp.sections.investigations && (
                                        <>
                                            <span>Biochemistry</span>
                                            <span>|</span>
                                        </>
                                    )}
                                    <span>{item.subLabel || "2025-09-27 19:30"}</span>
                                    {item.status === "Completed" && (
                                        <span className="flex items-center gap-1 text-green-600 px-2 py-0.5">
                                            <SquareCheckBig size={12} />
                                            {dict.pages.surgery.surgeryDetails.preOp.status.completedPrev}
                                        </span>
                                    )}
                                </div>
                                {/* Ordered by */}
                                {(item.status === "Completed" || item.status === "Ordered") && item.orderedBy && title === dict.pages.surgery.surgeryDetails.preOp.sections.investigations && (
                                    <p className="text-xs text-blue-500 mt-2 flex items-center gap-1 font-medium">
                                        <Stethoscope size={14} /> {dict.pages.surgery.surgeryDetails.common.orderedBy} {item.orderedBy}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2">
                                {item.status && (
                                    <span
                                        className={`text-xs font-medium px-3 py-1.5 rounded-full ${STATUS_STYLES[item.status]}`}
                                    >
                                        {item.status === "Completed" ? dict.pages.surgery.surgeryDetails.common.completed :
                                            item.status === "Ordered" ? dict.pages.surgery.surgeryDetails.common.ordered :
                                                item.status === "Pending" ? dict.pages.surgery.surgeryDetails.common.pending :
                                                    item.status}
                                    </span>
                                )}
                                {![dict.pages.surgery.surgeryDetails.preOp.sections.procedures, dict.pages.surgery.surgeryDetails.preOp.sections.prep, dict.pages.surgery.surgeryDetails.preOp.sections.equipment].includes(title) && !(title === dict.pages.surgery.surgeryDetails.preOp.sections.consents && item.status === "Pending") && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                className="flex items-center gap-1 text-xs text-blue-500 font-medium px-2 py-1 rounded-sm transition-colors bg-white hover:bg-slate-50"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {dict.pages.surgery.surgeryDetails.common.action}
                                                <MoreVertical size={14} className="text-green-500" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                                            {title !== dict.pages.surgery.surgeryDetails.preOp.sections.clearances && (
                                                <DropdownMenuItem
                                                    className="gap-2 cursor-pointer justify-between"
                                                    onClick={() => {
                                                        if ([dict.pages.surgery.surgeryDetails.preOp.sections.investigations, dict.pages.surgery.surgeryDetails.preOp.sections.consents, dict.pages.surgery.surgeryDetails.preOp.sections.nursingOrders, dict.pages.surgery.surgeryDetails.preOp.sections.implants, dict.pages.surgery.surgeryDetails.preOp.sections.blood].includes(title)) {
                                                            onViewDocument(item, title);
                                                        }
                                                    }}
                                                >
                                                    {dict.pages.surgery.surgeryDetails.common.view} <Eye size={14} className="text-slate-500" />
                                                </DropdownMenuItem>
                                            )}
                                            {(![dict.pages.surgery.surgeryDetails.preOp.sections.implants, dict.pages.surgery.surgeryDetails.preOp.sections.blood].includes(title) && title !== dict.pages.surgery.surgeryDetails.preOp.sections.clearances) && (
                                                <>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        {dict.pages.surgery.surgeryDetails.common.print} <Printer size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        {dict.pages.surgery.surgeryDetails.common.download} <Download size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                            {title === dict.pages.surgery.surgeryDetails.preOp.sections.consents && (
                                                <DropdownMenuItem
                                                    className="gap-2 cursor-pointer justify-between"
                                                    onClick={() => onDeleteItem?.(item, title)}
                                                >
                                                    {dict.pages.surgery.surgeryDetails.common.delete} <Trash2 size={14} />
                                                </DropdownMenuItem>
                                            )}
                                            {title === dict.pages.surgery.surgeryDetails.preOp.sections.clearances && (
                                                <>
                                                    {item.status === "Pending" && (
                                                        <DropdownMenuItem
                                                            className="gap-2 cursor-pointer justify-between"
                                                            onClick={() => onApproveClearance?.(item)}
                                                        >
                                                            {dict.pages.surgery.surgeryDetails.preOp.actions.approveClearance} <Printer size={14} className="text-slate-500" />
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem
                                                        className="gap-2 cursor-pointer justify-between"
                                                        onClick={() => onViewDocument(item, title)}
                                                    >
                                                        {dict.pages.surgery.surgeryDetails.common.view} <Eye size={14} className="text-slate-500" />
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
                                    {dict.pages.surgery.surgeryDetails.preOp.status.prevAvailable}: {item.previousResult.date} ({item.previousResult.count} {dict.pages.surgery.surgeryDetails.preOp.status.results})
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export type PreOpViewModeProps = {
    sectionsData: SectionConfig[];
    setSectionsData: React.Dispatch<React.SetStateAction<SectionConfig[]>>;
    onEdit?: () => void;
    metrics?: PreOpMetric[];
};

export const PreOpViewMode = ({ sectionsData, setSectionsData, onEdit, metrics = [] }: PreOpViewModeProps) => {
    const [selectedDocument, setSelectedDocument] = React.useState<DocumentData | undefined>(undefined);
    const [isDocumentModalOpen, setIsDocumentModalOpen] = React.useState(false);

    const [selectedNurseOrder, setSelectedNurseOrder] = React.useState<NurseOrderData | undefined>(undefined);
    const [isNurseOrderModalOpen, setIsNurseOrderModalOpen] = React.useState(false);

    const [selectedImplant, setSelectedImplant] = React.useState<ImplantConsumableData | undefined>(undefined);
    const [isImplantModalOpen, setIsImplantModalOpen] = React.useState(false);

    const [selectedBloodReq, setSelectedBloodReq] = React.useState<BloodRequirementData | undefined>(undefined);
    const [isBloodReqModalOpen, setIsBloodReqModalOpen] = React.useState(false);

    const [isConsentUploadModalOpen, setIsConsentUploadModalOpen] = React.useState(false);
    const [selectedConsentItem, setSelectedConsentItem] = React.useState<ChecklistItem | undefined>(undefined);

    const [isApproveModalOpen, setIsApproveModalOpen] = React.useState(false);
    const [selectedClearanceItem, setSelectedClearanceItem] = React.useState<ChecklistItem | undefined>(undefined);
    const [approveModalMode, setApproveModalMode] = React.useState<'approve' | 'view'>('approve');

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
        } else if (sectionTitle === "Medical Clearances") {
            setSelectedClearanceItem(item);
            setApproveModalMode('view');
            setIsApproveModalOpen(true);
        } else {
            setSelectedDocument({
                title: item.label,
                description: "Patient complained of Stomach pain; Test done this morning. Please review before prescribing medication.",
                conductedBy: item.orderedBy?.replace("Dr. ", "Nurse ") || "Nurse Sarah", // Mock logic
                date: item.subLabel || "14 Nov 2024 · 08:45 AM",
            });
            setIsDocumentModalOpen(true);
        }
    };

    const handleItemClick = (item: ChecklistItem, sectionTitle: string) => {
        if (sectionTitle === "Consents Required" && item.status === "Pending") {
            setSelectedConsentItem(item);
            setIsConsentUploadModalOpen(true);
        }
    };

    const handleConsentUpload = (notes: string) => {
        if (!selectedConsentItem) return;

        setSectionsData(prev => prev.map(section => {
            if (section.title === "Consents Required") {
                return {
                    ...section,
                    items: section.items.map(item => {
                        if (item.label === selectedConsentItem.label) {
                            return { ...item, status: "Completed", subLabel: "Uploaded · Just now" };
                        }
                        return item;
                    })
                };
            }
            return section;
        }));
    };

    const handleDeleteItem = (itemToDelete: ChecklistItem, sectionTitle: string) => {
        setSectionsData(prev => prev.map(section => {
            if (section.title === sectionTitle) {
                return {
                    ...section,
                    items: section.items.filter(item => item.label !== itemToDelete.label)
                };
            }
            return section;
        }));
    };

    const handleClearanceApprove = (data: { status: string; notes?: string; doctor: string }) => {
        if (!selectedClearanceItem) return;

        setSectionsData(prev => prev.map(section => {
            if (section.title === "Medical Clearances") {
                return {
                    ...section,
                    items: section.items.map(item => {
                        if (item.label === selectedClearanceItem.label) {
                            return {
                                ...item,
                                status: "Completed",
                                subLabel: `Approved by ${data.doctor} · ${new Date().toLocaleDateString()}`,
                                doctor: data.doctor,
                                clearanceStatus: data.status,
                                notes: data.notes
                            };
                        }
                        return item;
                    })
                };
            }
            return section;
        }));
    };

    const dict = useDictionary();

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
            {sectionsData.map((section) => (
                <ViewSectionCard
                    key={section.title}
                    config={section}
                    onViewDocument={handleViewDocument}
                    onItemClick={handleItemClick}
                    onDeleteItem={handleDeleteItem}
                    onApproveClearance={(item) => {
                        setSelectedClearanceItem(item);
                        setApproveModalMode('approve');
                        setIsApproveModalOpen(true);
                    }}
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

            <ConsentUploadModal
                open={isConsentUploadModalOpen}
                onOpenChange={setIsConsentUploadModalOpen}
                title={selectedConsentItem?.label || dict.pages.surgery.surgeryDetails.preOp.actions.uploadConsent}
                onUpload={handleConsentUpload}
            />

            <ApproveClearanceModal
                open={isApproveModalOpen}
                onOpenChange={setIsApproveModalOpen}
                title={selectedClearanceItem?.label || dict.pages.surgery.surgeryDetails.preOp.actions.approveClearanceOne}
                onApprove={handleClearanceApprove}
                mode={approveModalMode}
                itemData={selectedClearanceItem}
            />
        </div>
    );
};
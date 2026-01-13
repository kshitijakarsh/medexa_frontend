"use client";

import React from "react";
import { useDictionary } from "@/i18n/use-dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import DocumentViewModal, { DocumentData } from "../modals/DocumentViewModal";
import NurseOrderViewModal, { NurseOrderData } from "../modals/NurseOrderViewModal";
import ImplantsConsumablesViewModal, { ImplantConsumableData } from "../modals/ImplantsConsumablesViewModal";
import BloodRequirementViewModal, { BloodRequirementData } from "../modals/BloodRequirementViewModal";
import ConsentUploadModal from "../modals/ConsentUploadModal";
import ApproveClearanceModal from "../modals/ApproveClearanceModal";
import { ViewSectionCard } from "../ViewSectionCard";
import {
    ChecklistItem,
    PreOpMetric,
    SectionConfig,
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
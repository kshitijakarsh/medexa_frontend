"use client";

import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { DetailSection } from "../surgery-details/DetailsSection";
import { Checkbox } from "@workspace/ui/components/checkbox";

interface IntraOpViewModeProps {
    data: any;
    isLoading: boolean;
}

export const IntraOpViewMode = ({ data, isLoading }: IntraOpViewModeProps) => {
    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">Loading intra-operative details...</div>;
    }

    // Map API data (assuming snake_case) to UI. 
    // Fallback to empty strings/defaults if data is missing.
    const displayData = {
        timing: {
            patientIn: data?.timing?.patient_in || "-",
            anesthesiaStart: data?.timing?.anesthesia_start || "-",
            surgeryStart: data?.timing?.surgery_start || "-",
            surgeryEnd: data?.timing?.surgery_end || "-",
        },
        procedure: {
            name: data?.procedure?.name || "-",
            site: data?.procedure?.site || "-",
            approach: data?.procedure?.approach || "-",
            findings: data?.procedure?.findings || "-",
            steps: data?.procedure?.steps || "-",
        },
        complications: data?.complications || "-",
        bloodLoss: {
            estimated: data?.blood_loss?.estimated || "-",
            prbc: data?.blood_loss?.prbc || "0",
            ffp: data?.blood_loss?.ffp || "0",
            platelets: data?.blood_loss?.platelets || "0",
        },
        implants: {
            type: data?.implants?.type || "-",
            size: data?.implants?.size || "-",
            batchNo: data?.implants?.batch_no || "-",
            manufacturer: data?.implants?.manufacturer || "-",
            quantity: data?.implants?.quantity || "-",
        },
        specimens: {
            histopathology: !!data?.specimens?.histopathology,
            drains: !!data?.specimens?.drains,
            specimenDetails: data?.specimens?.specimen_details || "-",
            catheter: !!data?.specimens?.catheter,
        },
        consumables: {
            itemName: data?.consumables?.item_name || "-",
            quantity: data?.consumables?.quantity || "-",
            note: data?.consumables?.note || "-",
        },
        surgeonNotes: data?.surgeon_notes || "-",
    };

    return (
        <>
            {/* View Mode - Surgery Timing */}
            <DetailSection title="Surgery Timing">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <InfoField label="Patient In Time" value={displayData.timing.patientIn} />
                    <InfoField label="Anesthesia Start" value={displayData.timing.anesthesiaStart} />
                    <InfoField label="Surgery Start (Incision)" value={displayData.timing.surgeryStart} />
                    <InfoField label="Surgery End (Closure)" value={displayData.timing.surgeryEnd} />
                </div>
            </DetailSection>

            {/* View Mode - Procedure Details */}
            <DetailSection title="Procedure Details">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <InfoField label="Procedure" value={displayData.procedure.name} />
                    <InfoField label="Side / Site" value={displayData.procedure.site} />
                    <InfoField label="Approach / Access" value={displayData.procedure.approach} />
                </div>
                <div className="space-y-4">
                    <InfoField label="Intra-operative Findings" value={displayData.procedure.findings} />
                    <InfoField label="Operative Steps Summary" value={displayData.procedure.steps} />
                </div>
            </DetailSection>

            {/* View Mode - Complications */}
            <DetailSection title="Complications">
                <InfoField label="Intra-operative Complications" value={displayData.complications} />
            </DetailSection>

            {/* View Mode - Blood Loss */}
            <DetailSection title="Blood Loss & Transfusion">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <InfoField label="Estimated Blood Loss (mL)" value={displayData.bloodLoss.estimated} />
                    <InfoField label="PRBC (Units)" value={displayData.bloodLoss.prbc} />
                    <InfoField label="FFP (Units)" value={displayData.bloodLoss.ffp} />
                    <InfoField label="Platelets (Units)" value={displayData.bloodLoss.platelets} />
                </div>
            </DetailSection>

            {/* View Mode - Implants */}
            <DetailSection title="Implants Used">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label="Implant Type" value={displayData.implants.type} />
                    <InfoField label="Size" value={displayData.implants.size} />
                    <InfoField label="Batch/Lot No." value={displayData.implants.batchNo} />
                    <InfoField label="Manufacturer" value={displayData.implants.manufacturer} />
                    <InfoField label="Quantity" value={displayData.implants.quantity} />
                </div>
            </DetailSection>

            {/* View Mode - Consumables */}
            <DetailSection title="Consumables Used">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label="Item Name" value={displayData.consumables.itemName} />
                    <InfoField label="Quantity" value={displayData.consumables.quantity} />
                    <InfoField label="Note" value={displayData.consumables.note} />
                </div>
            </DetailSection>

            {/* View Mode - Specimens */}
            <DetailSection title="Specimens & Other Details">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Checkbox checked={displayData.specimens.histopathology} disabled />
                        <span className="text-sm text-slate-700">Specimens sent for Histopathology</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox checked={displayData.specimens.drains} disabled />
                        <span className="text-sm text-slate-700">Drains Placed</span>
                    </div>
                    {displayData.specimens.drains && (
                        <div className="ml-6">
                            <InfoField label="Specimen Details" value={displayData.specimens.specimenDetails} />
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Checkbox checked={displayData.specimens.catheter} disabled />
                        <span className="text-sm text-slate-700">Catheter Placed</span>
                    </div>
                </div>
            </DetailSection>

            {/* View Mode - Surgeon's Notes */}
            <DetailSection title="Surgeon's Additional Notes">
                <InfoField label="Notes" value={displayData.surgeonNotes} />
            </DetailSection>
        </>
    );
};

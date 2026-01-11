"use client";

import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { DetailSection } from "../surgery-details/DetailsSection";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { useDictionary } from "@/i18n/use-dictionary";

interface IntraOpViewModeProps {
    data: any;
    isLoading: boolean;
}

export const IntraOpViewMode = ({ data, isLoading }: IntraOpViewModeProps) => {
    const dict = useDictionary();
    const intraOp = dict.pages.surgery.surgeryDetails.intraOp;
    const common = dict.pages.surgery.surgeryDetails.common;

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">{intraOp.loading}</div>;
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
            <DetailSection title={intraOp.sections.surgeryTiming}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <InfoField label={intraOp.fields.patientInTime} value={displayData.timing.patientIn} />
                    <InfoField label={intraOp.fields.anesthesiaStart} value={displayData.timing.anesthesiaStart} />
                    <InfoField label={intraOp.fields.surgeryStartIncision} value={displayData.timing.surgeryStart} />
                    <InfoField label={intraOp.fields.surgeryEndClosure} value={displayData.timing.surgeryEnd} />
                </div>
            </DetailSection>

            {/* View Mode - Procedure Details */}
            <DetailSection title={intraOp.sections.procedureDetails}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <InfoField label={intraOp.fields.procedure} value={displayData.procedure.name} />
                    <InfoField label={intraOp.fields.sideSite} value={displayData.procedure.site} />
                    <InfoField label={intraOp.fields.approachAccess} value={displayData.procedure.approach} />
                </div>
                <div className="space-y-4">
                    <InfoField label={intraOp.fields.intraOpFindings} value={displayData.procedure.findings} />
                    <InfoField label={intraOp.fields.operativeSteps} value={displayData.procedure.steps} />
                </div>
            </DetailSection>

            {/* View Mode - Complications */}
            <DetailSection title={intraOp.sections.complications}>
                <InfoField label={intraOp.fields.intraOpComplications} value={displayData.complications} />
            </DetailSection>

            {/* View Mode - Blood Loss */}
            <DetailSection title={intraOp.sections.bloodLossTransfusion}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <InfoField label={intraOp.fields.estimatedBloodLoss} value={displayData.bloodLoss.estimated} />
                    <InfoField label={intraOp.fields.prbcUnits} value={displayData.bloodLoss.prbc} />
                    <InfoField label={intraOp.fields.ffpUnits} value={displayData.bloodLoss.ffp} />
                    <InfoField label={intraOp.fields.plateletsUnits} value={displayData.bloodLoss.platelets} />
                </div>
            </DetailSection>

            {/* View Mode - Implants */}
            <DetailSection title={common.sections.implantsUsed}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label={common.fields.implantType} value={displayData.implants.type} />
                    <InfoField label={common.fields.size} value={displayData.implants.size} />
                    <InfoField label={common.fields.batchLotNo} value={displayData.implants.batchNo} />
                    <InfoField label={common.fields.manufacturer} value={displayData.implants.manufacturer} />
                    <InfoField label={common.fields.quantity} value={displayData.implants.quantity} />
                </div>
            </DetailSection>

            {/* View Mode - Consumables */}
            <DetailSection title={common.sections.consumablesUsed}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label={common.fields.itemName} value={displayData.consumables.itemName} />
                    <InfoField label={common.fields.quantity} value={displayData.consumables.quantity} />
                    <InfoField label={common.fields.note} value={displayData.consumables.note} />
                </div>
            </DetailSection>

            {/* View Mode - Specimens */}
            <DetailSection title={intraOp.sections.specimensOther}>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Checkbox checked={displayData.specimens.histopathology} disabled />
                        <span className="text-sm text-slate-700">{intraOp.fields.specimensHistopathology}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox checked={displayData.specimens.drains} disabled />
                        <span className="text-sm text-slate-700">{intraOp.fields.drainsPlaced}</span>
                    </div>
                    {displayData.specimens.drains && (
                        <div className="ml-6">
                            <InfoField label={intraOp.fields.specimenDetails} value={displayData.specimens.specimenDetails} />
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Checkbox checked={displayData.specimens.catheter} disabled />
                        <span className="text-sm text-slate-700">{intraOp.fields.catheterPlaced}</span>
                    </div>
                </div>
            </DetailSection>

            {/* View Mode - Surgeon's Notes */}
            <DetailSection title={intraOp.sections.surgeonNotes}>
                <InfoField label={common.fields.notes} value={displayData.surgeonNotes} />
            </DetailSection>
        </>
    );
};

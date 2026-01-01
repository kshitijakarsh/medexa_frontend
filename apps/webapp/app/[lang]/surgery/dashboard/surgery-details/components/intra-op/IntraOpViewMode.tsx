"use client";

import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { DetailSection } from "../surgery-details/DetailsSection";
import { Checkbox } from "@workspace/ui/components/checkbox";

// Mock data for view mode
const MOCK_INTRAOP_DATA = {
    timing: {
        patientIn: "10-09-2025 09:10 AM",
        anesthesiaStart: "10-09-2025 09:25 AM",
        surgeryStart: "10-09-2025 09:45 AM",
        surgeryEnd: "10-09-2025 11:05 AM",
    },
    procedure: {
        name: "Laparoscopic Cholecystectomy",
        site: "Not Applicable",
        approach: "Laparoscopic",
        findings: "Gallbladder inflamed with multiple calculi.",
        steps: "Ports placed, cystic duct and artery clipped and divided.",
    },
    complications: "Moderate bleeding encountered from cystic artery, controlled with surgical clips and cauterization. Hemostasis achieved.",
    bloodLoss: {
        estimated: "50 ml",
        prbc: "0",
        ffp: "0",
        platelets: "0",
    },
    implants: {
        type: "Hernia Mesh",
        size: "Medium",
        batchNo: "HM-45879",
        manufacturer: "Ethicon",
        quantity: "1",
    },
    specimens: {
        histopathology: true,
        drains: true,
        specimenDetails: "Gallbladder sent for HPE. One drain placed.",
        catheter: false,
    },
    consumables: {
        itemName: "Sutures",
        quantity: "3",
        note: "Vicryl 2-0",
    },
    surgeonNotes: "Uneventful surgery. Patient tolerated procedure well.",
};

export const IntraOpViewMode = () => {
    return (
        <>
            {/* View Mode - Surgery Timing */}
            <DetailSection title="Surgery Timing">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <InfoField label="Patient In Time" value={MOCK_INTRAOP_DATA.timing.patientIn} />
                    <InfoField label="Anesthesia Start" value={MOCK_INTRAOP_DATA.timing.anesthesiaStart} />
                    <InfoField label="Surgery Start (Incision)" value={MOCK_INTRAOP_DATA.timing.surgeryStart} />
                    <InfoField label="Surgery End (Closure)" value={MOCK_INTRAOP_DATA.timing.surgeryEnd} />
                </div>
            </DetailSection>

            {/* View Mode - Procedure Details */}
            <DetailSection title="Procedure Details">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <InfoField label="Procedure" value={MOCK_INTRAOP_DATA.procedure.name} />
                    <InfoField label="Side / Site" value={MOCK_INTRAOP_DATA.procedure.site} />
                    <InfoField label="Approach / Access" value={MOCK_INTRAOP_DATA.procedure.approach} />
                </div>
                <div className="space-y-4">
                    <InfoField label="Intra-operative Findings" value={MOCK_INTRAOP_DATA.procedure.findings} />
                    <InfoField label="Operative Steps Summary" value={MOCK_INTRAOP_DATA.procedure.steps} />
                </div>
            </DetailSection>

            {/* View Mode - Complications */}
            <DetailSection title="Complications">
                <InfoField label="Intra-operative Complications" value={MOCK_INTRAOP_DATA.complications} />
            </DetailSection>

            {/* View Mode - Blood Loss */}
            <DetailSection title="Blood Loss & Transfusion">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <InfoField label="Estimated Blood Loss (mL)" value={MOCK_INTRAOP_DATA.bloodLoss.estimated} />
                    <InfoField label="PRBC (Units)" value={MOCK_INTRAOP_DATA.bloodLoss.prbc} />
                    <InfoField label="FFP (Units)" value={MOCK_INTRAOP_DATA.bloodLoss.ffp} />
                    <InfoField label="Platelets (Units)" value={MOCK_INTRAOP_DATA.bloodLoss.platelets} />
                </div>
            </DetailSection>

            {/* View Mode - Implants */}
            <DetailSection title="Implants Used">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label="Implant Type" value={MOCK_INTRAOP_DATA.implants.type} />
                    <InfoField label="Size" value={MOCK_INTRAOP_DATA.implants.size} />
                    <InfoField label="Batch/Lot No." value={MOCK_INTRAOP_DATA.implants.batchNo} />
                    <InfoField label="Manufacturer" value={MOCK_INTRAOP_DATA.implants.manufacturer} />
                    <InfoField label="Quantity" value={MOCK_INTRAOP_DATA.implants.quantity} />
                </div>
            </DetailSection>

            {/* View Mode - Consumables */}
            <DetailSection title="Consumables Used">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoField label="Item Name" value={MOCK_INTRAOP_DATA.consumables.itemName} />
                    <InfoField label="Quantity" value={MOCK_INTRAOP_DATA.consumables.quantity} />
                    <InfoField label="Note" value={MOCK_INTRAOP_DATA.consumables.note} />
                </div>
            </DetailSection>

            {/* View Mode - Specimens */}
            <DetailSection title="Specimens & Other Details">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Checkbox checked={MOCK_INTRAOP_DATA.specimens.histopathology} disabled />
                        <span className="text-sm text-slate-700">Specimens sent for Histopathology</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox checked={MOCK_INTRAOP_DATA.specimens.drains} disabled />
                        <span className="text-sm text-slate-700">Drains Placed</span>
                    </div>
                    {MOCK_INTRAOP_DATA.specimens.drains && (
                        <div className="ml-6">
                            <InfoField label="Specimen Details" value={MOCK_INTRAOP_DATA.specimens.specimenDetails} />
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Checkbox checked={MOCK_INTRAOP_DATA.specimens.catheter} disabled />
                        <span className="text-sm text-slate-700">Catheter Placed</span>
                    </div>
                </div>
            </DetailSection>

            {/* View Mode - Surgeon's Notes */}
            <DetailSection title="Surgeon's Additional Notes">
                <InfoField label="Notes" value={MOCK_INTRAOP_DATA.surgeonNotes} />
            </DetailSection>
        </>
    );
};

"use client";

import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { DetailSection } from "../surgery-details/DetailsSection";
import { Checkbox } from "@workspace/ui/components/checkbox";

// Mock data for view mode
const MOCK_NURSE_DATA = {
    patientReception: {
        time: "08:00 AM",
        identityVerified: true,
        consentVerified: true,
        siteMarked: true,
        fastingConfirmed: true,
    },
    safetyChecklist: {
        time: "08:15 AM",
        identityConfirmed: true,
        siteMarked: true,
        consentComplete: true,
        pulseOximeter: true,
        allergies: true,
        airway: true,
        bloodLoss: true,
        notes: "All safety checks completed satisfactorily.",
    },
    positioning: {
        position: "Supine",
        pressurePoints: true,
    },
    timeOut: {
        time: "08:45 AM",
        teamIntroduced: true,
        confirmed: true,
        antibiotic: true,
        imaging: true,
        sterility: true,
        notes: "Team timeout completed before incision.",
    },
    signOut: {
        time: "10:30 AM",
        procedure: true,
        counts: true,
        specimen: true,
        equipment: true,
        notes: "All counts correct. No equipment issues.",
    },
    implants: [
        { type: "Mesh", size: "15x10cm", batch: "LOT123", manufacturer: "MedCorp", qty: "1" },
    ],
    consumables: [
        { name: "Gauze Pads", qty: "10", note: "Standard 4x4" },
        { name: "Sutures", qty: "3", note: "3-0 Vicryl" },
    ],
    nursingNotes: "Patient tolerated procedure well. Vital signs stable throughout.",
};

// View mode checkbox display
const ChecklistViewItem = ({ label, checked }: { label: string; checked: boolean }) => (
    <div className="flex items-center gap-2">
        <Checkbox checked={checked} disabled />
        <span className="text-sm text-slate-700">{label}</span>
    </div>
);

export const NurseCareViewMode = () => {
    return (
        <>
            {/* View Mode - Patient Reception */}
            <DetailSection title="Patient Reception in OT">
                <InfoField label="Patient Received Time" value={MOCK_NURSE_DATA.patientReception.time} />
                <div className="mt-4 space-y-2">
                    <ChecklistViewItem label="Patient Identity Verified" checked={MOCK_NURSE_DATA.patientReception.identityVerified} />
                    <ChecklistViewItem label="Consent Form Verified" checked={MOCK_NURSE_DATA.patientReception.consentVerified} />
                    <ChecklistViewItem label="Surgical Site Marked" checked={MOCK_NURSE_DATA.patientReception.siteMarked} />
                    <ChecklistViewItem label="Fasting Status Confirmed (NPO)" checked={MOCK_NURSE_DATA.patientReception.fastingConfirmed} />
                </div>
            </DetailSection>

            {/* View Mode - Safety Checklist */}
            <DetailSection title="Surgical Safety Checklist">
                <InfoField label="Time" value={MOCK_NURSE_DATA.safetyChecklist.time} />
                <div className="mt-4 space-y-2">
                    <ChecklistViewItem label="Patient confirms identity, site, procedure, consent" checked={MOCK_NURSE_DATA.safetyChecklist.identityConfirmed} />
                    <ChecklistViewItem label="Site marked / Not applicable" checked={MOCK_NURSE_DATA.safetyChecklist.siteMarked} />
                    <ChecklistViewItem label="Consent form complete" checked={MOCK_NURSE_DATA.safetyChecklist.consentComplete} />
                    <ChecklistViewItem label="Pulse oximeter on patient and functioning" checked={MOCK_NURSE_DATA.safetyChecklist.pulseOximeter} />
                    <ChecklistViewItem label="Known allergies confirmed" checked={MOCK_NURSE_DATA.safetyChecklist.allergies} />
                    <ChecklistViewItem label="Difficult airway/aspiration risk assessed" checked={MOCK_NURSE_DATA.safetyChecklist.airway} />
                    <ChecklistViewItem label="Risk of >500ml blood loss assessed" checked={MOCK_NURSE_DATA.safetyChecklist.bloodLoss} />
                </div>
                <div className="mt-4">
                    <InfoField label="Additional Notes" value={MOCK_NURSE_DATA.safetyChecklist.notes} />
                </div>
            </DetailSection>

            {/* View Mode - Positioning */}
            <DetailSection title="Patient Positioning & Preparation">
                <InfoField label="Patient Position" value={MOCK_NURSE_DATA.positioning.position} />
                <div className="mt-4">
                    <ChecklistViewItem label="All pressure points adequately padded" checked={MOCK_NURSE_DATA.positioning.pressurePoints} />
                </div>
            </DetailSection>

            {/* View Mode - Time Out */}
            <DetailSection title="Time Out (Before Skin Incision)">
                <InfoField label="Time" value={MOCK_NURSE_DATA.timeOut.time} />
                <div className="mt-4 space-y-2">
                    <ChecklistViewItem label="All team members introduced by name and role" checked={MOCK_NURSE_DATA.timeOut.teamIntroduced} />
                    <ChecklistViewItem label="Surgeon, Anaesthetist, Nurse confirm patient, site, procedure" checked={MOCK_NURSE_DATA.timeOut.confirmed} />
                    <ChecklistViewItem label="Antibiotic prophylaxis given within 60 min" checked={MOCK_NURSE_DATA.timeOut.antibiotic} />
                    <ChecklistViewItem label="Essential imaging displayed" checked={MOCK_NURSE_DATA.timeOut.imaging} />
                    <ChecklistViewItem label="Sterility confirmed (including indicator results)" checked={MOCK_NURSE_DATA.timeOut.sterility} />
                </div>
                <div className="mt-4">
                    <InfoField label="Additional Notes" value={MOCK_NURSE_DATA.timeOut.notes} />
                </div>
            </DetailSection>

            {/* View Mode - Sign Out */}
            <DetailSection title="Sign Out (Before Patient Leaves OT)">
                <InfoField label="Time" value={MOCK_NURSE_DATA.signOut.time} />
                <div className="mt-4 space-y-2">
                    <ChecklistViewItem label="Procedure name recorded correctly" checked={MOCK_NURSE_DATA.signOut.procedure} />
                    <ChecklistViewItem label="Instrument, sponge, needle counts correct" checked={MOCK_NURSE_DATA.signOut.counts} />
                    <ChecklistViewItem label="Specimen labeled (including patient name)" checked={MOCK_NURSE_DATA.signOut.specimen} />
                    <ChecklistViewItem label="Equipment problems addressed" checked={MOCK_NURSE_DATA.signOut.equipment} />
                </div>
                <div className="mt-4">
                    <InfoField label="Additional Notes" value={MOCK_NURSE_DATA.signOut.notes} />
                </div>
            </DetailSection>

            {/* View Mode - Implants */}
            <DetailSection title="Implants Used">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-xs font-bold text-slate-500 uppercase">
                                <th className="pb-2">Type</th>
                                <th className="pb-2">Size</th>
                                <th className="pb-2">Batch/Lot</th>
                                <th className="pb-2">Manufacturer</th>
                                <th className="pb-2">Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_NURSE_DATA.implants.map((item, idx) => (
                                <tr key={idx} className="border-t">
                                    <td className="py-2">{item.type}</td>
                                    <td className="py-2">{item.size}</td>
                                    <td className="py-2">{item.batch}</td>
                                    <td className="py-2">{item.manufacturer}</td>
                                    <td className="py-2">{item.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DetailSection>

            {/* View Mode - Consumables */}
            <DetailSection title="Consumables Used">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-xs font-bold text-slate-500 uppercase">
                                <th className="pb-2">Item Name</th>
                                <th className="pb-2">Quantity</th>
                                <th className="pb-2">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_NURSE_DATA.consumables.map((item, idx) => (
                                <tr key={idx} className="border-t">
                                    <td className="py-2">{item.name}</td>
                                    <td className="py-2">{item.qty}</td>
                                    <td className="py-2">{item.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DetailSection>

            {/* View Mode - Nursing Notes */}
            <DetailSection title="Additional Nursing Notes">
                <InfoField label="Nursing Notes" value={MOCK_NURSE_DATA.nursingNotes} />
            </DetailSection>
        </>
    );
};

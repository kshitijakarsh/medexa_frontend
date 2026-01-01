"use client";

import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { DetailSection } from "../surgery-details/DetailsSection";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createNurseNotesApiClient } from "@/lib/api/surgery/nurse-notes";

// View mode checkbox display
const ChecklistViewItem = ({ label, checked }: { label: string; checked: boolean }) => (
    <div className="flex items-center gap-2">
        <Checkbox checked={checked} disabled />
        <span className="text-sm text-slate-700">{label}</span>
    </div>
);

export const NurseCareViewMode = () => {
    const { id: surgeryId } = useParams();
    const nurseNotesApi = createNurseNotesApiClient();

    const { data: nurseNotesResponse, isLoading } = useQuery({
        queryKey: ["surgery-nurse-notes", surgeryId],
        queryFn: async () => {
            const response = await nurseNotesApi.getNurseNotes(surgeryId as string);
            return response.data;
        },
        enabled: !!surgeryId,
    });

    const data = nurseNotesResponse?.data;

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">Loading nursing notes...</div>;
    }

    // Map API data (assuming snake_case) to UI with fallbacks to mock structure or defaults
    const displayData = {
        patientReception: {
            time: data?.patient_reception?.time || "-",
            identityVerified: !!data?.patient_reception?.identity_verified,
            consentVerified: !!data?.patient_reception?.consent_verified,
            siteMarked: !!data?.patient_reception?.site_marked,
            fastingConfirmed: !!data?.patient_reception?.fasting_confirmed,
        },
        safetyChecklist: {
            time: data?.safety_checklist?.time || "-",
            identityConfirmed: !!data?.safety_checklist?.identity_confirmed,
            siteMarked: !!data?.safety_checklist?.site_marked,
            consentComplete: !!data?.safety_checklist?.consent_complete,
            pulseOximeter: !!data?.safety_checklist?.pulse_oximeter,
            allergies: !!data?.safety_checklist?.allergies,
            airway: !!data?.safety_checklist?.airway,
            bloodLoss: !!data?.safety_checklist?.blood_loss,
            notes: data?.safety_checklist?.notes || "-",
        },
        positioning: {
            position: data?.positioning?.position || "-",
            pressurePoints: !!data?.positioning?.pressure_points,
        },
        timeOut: {
            time: data?.time_out?.time || "-",
            teamIntroduced: !!data?.time_out?.team_introduced,
            confirmed: !!data?.time_out?.confirmed,
            antibiotic: !!data?.time_out?.antibiotic,
            imaging: !!data?.time_out?.imaging,
            sterility: !!data?.time_out?.sterility,
            notes: data?.time_out?.notes || "-",
        },
        signOut: {
            time: data?.sign_out?.time || "-",
            procedure: !!data?.sign_out?.procedure,
            counts: !!data?.sign_out?.counts,
            specimen: !!data?.sign_out?.specimen,
            equipment: !!data?.sign_out?.equipment,
            notes: data?.sign_out?.notes || "-",
        },
        implants: (data?.implants || []).map((item: any) => ({
            type: item.type || "-",
            size: item.size || "-",
            batch: item.batch_no || "-",
            manufacturer: item.manufacturer || "-",
            qty: item.quantity || "0",
        })),
        consumables: (data?.consumables || []).map((item: any) => ({
            name: item.item_name || "-",
            qty: item.quantity || "0",
            note: item.note || "-",
        })),
        nursingNotes: data?.nursing_notes || "-",
    };

    return (
        <>
            {/* View Mode - Patient Reception */}
            <DetailSection title="Patient Reception in OT">
                <InfoField label="Patient Received Time" value={displayData.patientReception.time} />
                <div className="mt-4 space-y-2">
                    <ChecklistViewItem label="Patient Identity Verified" checked={displayData.patientReception.identityVerified} />
                    <ChecklistViewItem label="Consent Form Verified" checked={displayData.patientReception.consentVerified} />
                    <ChecklistViewItem label="Surgical Site Marked" checked={displayData.patientReception.siteMarked} />
                    <ChecklistViewItem label="Fasting Status Confirmed (NPO)" checked={displayData.patientReception.fastingConfirmed} />
                </div>
            </DetailSection>

            {/* View Mode - Safety Checklist */}
            <DetailSection title="Surgical Safety Checklist">
                <InfoField label="Time" value={displayData.safetyChecklist.time} />
                <div className="mt-4 space-y-2">
                    <ChecklistViewItem label="Patient confirms identity, site, procedure, consent" checked={displayData.safetyChecklist.identityConfirmed} />
                    <ChecklistViewItem label="Site marked / Not applicable" checked={displayData.safetyChecklist.siteMarked} />
                    <ChecklistViewItem label="Consent form complete" checked={displayData.safetyChecklist.consentComplete} />
                    <ChecklistViewItem label="Pulse oximeter on patient and functioning" checked={displayData.safetyChecklist.pulseOximeter} />
                    <ChecklistViewItem label="Known allergies confirmed" checked={displayData.safetyChecklist.allergies} />
                    <ChecklistViewItem label="Difficult airway/aspiration risk assessed" checked={displayData.safetyChecklist.airway} />
                    <ChecklistViewItem label="Risk of >500ml blood loss assessed" checked={displayData.safetyChecklist.bloodLoss} />
                </div>
                <div className="mt-4">
                    <InfoField label="Additional Notes" value={displayData.safetyChecklist.notes} />
                </div>
            </DetailSection>

            {/* View Mode - Positioning */}
            <DetailSection title="Patient Positioning & Preparation">
                <InfoField label="Patient Position" value={displayData.positioning.position} />
                <div className="mt-4">
                    <ChecklistViewItem label="All pressure points adequately padded" checked={displayData.positioning.pressurePoints} />
                </div>
            </DetailSection>

            {/* View Mode - Time Out */}
            <DetailSection title="Time Out (Before Skin Incision)">
                <InfoField label="Time" value={displayData.timeOut.time} />
                <div className="mt-4 space-y-2">
                    <ChecklistViewItem label="All team members introduced by name and role" checked={displayData.timeOut.teamIntroduced} />
                    <ChecklistViewItem label="Surgeon, Anaesthetist, Nurse confirm patient, site, procedure" checked={displayData.timeOut.confirmed} />
                    <ChecklistViewItem label="Antibiotic prophylaxis given within 60 min" checked={displayData.timeOut.antibiotic} />
                    <ChecklistViewItem label="Essential imaging displayed" checked={displayData.timeOut.imaging} />
                    <ChecklistViewItem label="Sterility confirmed (including indicator results)" checked={displayData.timeOut.sterility} />
                </div>
                <div className="mt-4">
                    <InfoField label="Additional Notes" value={displayData.timeOut.notes} />
                </div>
            </DetailSection>

            {/* View Mode - Sign Out */}
            <DetailSection title="Sign Out (Before Patient Leaves OT)">
                <InfoField label="Time" value={displayData.signOut.time} />
                <div className="mt-4 space-y-2">
                    <ChecklistViewItem label="Procedure name recorded correctly" checked={displayData.signOut.procedure} />
                    <ChecklistViewItem label="Instrument, sponge, needle counts correct" checked={displayData.signOut.counts} />
                    <ChecklistViewItem label="Specimen labeled (including patient name)" checked={displayData.signOut.specimen} />
                    <ChecklistViewItem label="Equipment problems addressed" checked={displayData.signOut.equipment} />
                </div>
                <div className="mt-4">
                    <InfoField label="Additional Notes" value={displayData.signOut.notes} />
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
                            {displayData.implants.map((item: any, idx: number) => (
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
                            {displayData.consumables.map((item: any, idx: number) => (
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
                <InfoField label="Nursing Notes" value={displayData.nursingNotes} />
            </DetailSection>
        </>
    );
};

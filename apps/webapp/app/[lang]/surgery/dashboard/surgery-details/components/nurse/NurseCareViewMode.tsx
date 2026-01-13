"use client";

import { InfoField } from "@/app/[lang]/surgery/_components/common/InfoField";
import { DetailSection } from "../surgery-details/DetailsSection";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createNurseNotesApiClient } from "@/lib/api/surgery/nurse-notes";
import { useDictionary } from "@/i18n/use-dictionary";

// View mode checkbox display
const ChecklistViewItem = ({ label, checked }: { label: string; checked: boolean }) => (
    <div className="flex items-center gap-2">
        <Checkbox checked={checked} disabled />
        <span className="text-sm text-slate-700">{label}</span>
    </div>
);

interface NurseCareViewModeProps {
    data: any;
    isLoading: boolean;
}

export const NurseCareViewMode = ({ data, isLoading }: NurseCareViewModeProps) => {
    const dict = useDictionary();
    const nurseCare = dict.pages.surgery.surgeryDetails.nurseCare;
    const common = dict.pages.surgery.surgeryDetails.common;

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">{nurseCare.loading}</div>;
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
            <DetailSection title={nurseCare.sections.patientReception}>
                <InfoField label={nurseCare.fields.patientReceivedTime} value={displayData.patientReception.time} />
                <div className="mt-4 space-y-2">
                    <ChecklistViewItem label={nurseCare.fields.patientIdentityVerified} checked={displayData.patientReception.identityVerified} />
                    <ChecklistViewItem label={nurseCare.fields.consentFormVerified} checked={displayData.patientReception.consentVerified} />
                    <ChecklistViewItem label={nurseCare.fields.surgicalSiteMarked} checked={displayData.patientReception.siteMarked} />
                    <ChecklistViewItem label={nurseCare.fields.fastingStatusConfirmed} checked={displayData.patientReception.fastingConfirmed} />
                </div>
            </DetailSection>

            {/* View Mode - Safety Checklist */}
            <DetailSection title={nurseCare.sections.safetyChecklist}>
                <InfoField label={nurseCare.fields.time} value={displayData.safetyChecklist.time} />
                <div className="mt-4 space-y-2">
                    <ChecklistViewItem label={nurseCare.fields.patientConfirmsIdentity} checked={displayData.safetyChecklist.identityConfirmed} />
                    <ChecklistViewItem label={nurseCare.fields.siteMarkedNotApplicable} checked={displayData.safetyChecklist.siteMarked} />
                    <ChecklistViewItem label={nurseCare.fields.consentFormComplete} checked={displayData.safetyChecklist.consentComplete} />
                    <ChecklistViewItem label={nurseCare.fields.pulseOximeterFunctioning} checked={displayData.safetyChecklist.pulseOximeter} />
                    <ChecklistViewItem label={nurseCare.fields.knownAllergiesConfirmed} checked={displayData.safetyChecklist.allergies} />
                    <ChecklistViewItem label={nurseCare.fields.difficultAirwayAssessed} checked={displayData.safetyChecklist.airway} />
                    <ChecklistViewItem label={nurseCare.fields.bloodLossRiskAssessed} checked={displayData.safetyChecklist.bloodLoss} />
                </div>
                <div className="mt-4">
                    <InfoField label={nurseCare.fields.additionalNotes} value={displayData.safetyChecklist.notes} />
                </div>
            </DetailSection>

            {/* View Mode - Positioning */}
            <DetailSection title={nurseCare.sections.positioning}>
                <InfoField label={nurseCare.fields.patientPosition} value={displayData.positioning.position} />
                <div className="mt-4">
                    <ChecklistViewItem label={nurseCare.fields.pressurePointsPadded} checked={displayData.positioning.pressurePoints} />
                </div>
            </DetailSection>

            {/* View Mode - Time Out */}
            <DetailSection title={nurseCare.sections.timeOut}>
                <InfoField label={nurseCare.fields.time} value={displayData.timeOut.time} />
                <div className="mt-4 space-y-2">
                    <ChecklistViewItem label={nurseCare.fields.allTeamMembersIntroduced} checked={displayData.timeOut.teamIntroduced} />
                    <ChecklistViewItem label={nurseCare.fields.teamConfirmsPatient} checked={displayData.timeOut.confirmed} />
                    <ChecklistViewItem label={nurseCare.fields.antibioticProphylaxis} checked={displayData.timeOut.antibiotic} />
                    <ChecklistViewItem label={nurseCare.fields.essentialImagingDisplayed} checked={displayData.timeOut.imaging} />
                    <ChecklistViewItem label={nurseCare.fields.sterilityConfirmed} checked={displayData.timeOut.sterility} />
                </div>
                <div className="mt-4">
                    <InfoField label={nurseCare.fields.additionalNotes} value={displayData.timeOut.notes} />
                </div>
            </DetailSection>

            {/* View Mode - Sign Out */}
            <DetailSection title={nurseCare.sections.signOut}>
                <InfoField label={nurseCare.fields.time} value={displayData.signOut.time} />
                <div className="mt-4 space-y-2">
                    <ChecklistViewItem label={nurseCare.fields.procedureRecordedCorrectly} checked={displayData.signOut.procedure} />
                    <ChecklistViewItem label={nurseCare.fields.instrumentCountsCorrect} checked={displayData.signOut.counts} />
                    <ChecklistViewItem label={nurseCare.fields.specimenLabeled} checked={displayData.signOut.specimen} />
                    <ChecklistViewItem label={nurseCare.fields.equipmentProblemsAddressed} checked={displayData.signOut.equipment} />
                </div>
                <div className="mt-4">
                    <InfoField label={nurseCare.fields.additionalNotes} value={displayData.signOut.notes} />
                </div>
            </DetailSection>

            {/* View Mode - Implants */}
            <DetailSection title={common.sections.implantsUsed}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-xs font-bold text-slate-500 uppercase">
                                <th className="pb-2">{common.fields.implantType}</th>
                                <th className="pb-2">{common.fields.size}</th>
                                <th className="pb-2">{common.fields.batchLotNo}</th>
                                <th className="pb-2">{common.fields.manufacturer}</th>
                                <th className="pb-2">{dict.common.quantity}</th>
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
            <DetailSection title={common.sections.consumablesUsed}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-xs font-bold text-slate-500 uppercase">
                                <th className="pb-2">{common.fields.itemName}</th>
                                <th className="pb-2">{dict.common.quantity}</th>
                                <th className="pb-2">{dict.common.note}</th>
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
            <DetailSection title={nurseCare.sections.additionalNotes}>
                <InfoField label={nurseCare.fields.nursingNotes} value={displayData.nursingNotes} />
            </DetailSection>
        </>
    );
};

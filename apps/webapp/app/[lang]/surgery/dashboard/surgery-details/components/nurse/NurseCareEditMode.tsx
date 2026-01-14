"use client";

import { Send, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Button } from "@workspace/ui/components/button";
import NewButton from "@/components/common/new-button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { Clock } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { useDictionary } from "@/i18n/use-dictionary";

// Generate time slots every 30 mins
const TIME_SLOTS = Array.from({ length: 48 }).map((_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    const paddedHours = hours.toString().padStart(2, "0");
    return `${paddedHours}:${minutes}`;
});

// Helper component for inventory selects
const SelectInput = ({ placeholder }: { placeholder: string }) => (
    <Select>
        <SelectTrigger className="w-full h-9 text-xs">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
    </Select>
);

// Checkbox item for checklists
const ChecklistItem = ({
    id,
    label,
    defaultChecked = false,
}: {
    id: string;
    label: string;
    defaultChecked?: boolean;
}) => (
    <div className="flex items-center space-x-2 bg-blue-50/50 p-2 rounded-sm">
        <Checkbox id={id} defaultChecked={defaultChecked} />
        <Label htmlFor={id} className="text-sm font-light cursor-pointer">
            {label}
        </Label>
    </div>
);

type NurseCareEditModeProps = {
    initialData?: any;
    onSaveDraft?: () => void;
};

export const NurseCareEditMode = ({ initialData, onSaveDraft }: NurseCareEditModeProps) => {
    const dict = useDictionary();
    const nurseCare = dict.pages.surgery.surgeryDetails.nurseCare;
    const common = dict.pages.surgery.surgeryDetails.common;

    return (
        <>
            {/* Patient Reception in OT */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{nurseCare.sections.patientReception}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                        <Label className="text-sm font-medium">{nurseCare.fields.patientReceivedTime}</Label>
                        <Select defaultValue={initialData?.patient_reception?.time || "08:00"}>
                            <SelectTrigger className={cn("w-full md:w-1/2 h-10")}>
                                <div className="flex-1 text-left">
                                    <SelectValue placeholder={nurseCare.fields.selectTime} />
                                </div>
                                <Clock className="w-4 h-4 text-green-500 opacity-50 mr-2" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                                {TIME_SLOTS.map((slot) => (
                                    <SelectItem key={slot} value={slot}>
                                        {slot}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <ChecklistItem id="reception-identity" label={nurseCare.fields.patientIdentityVerified} defaultChecked={!!initialData?.patient_reception?.identity_verified} />
                        <ChecklistItem id="reception-consent" label={nurseCare.fields.consentFormVerified} defaultChecked={!!initialData?.patient_reception?.consent_verified} />
                        <ChecklistItem id="reception-site" label={nurseCare.fields.surgicalSiteMarked} defaultChecked={!!initialData?.patient_reception?.site_marked} />
                        <ChecklistItem id="reception-npo" label={nurseCare.fields.fastingStatusConfirmed} defaultChecked={!!initialData?.patient_reception?.fasting_confirmed} />
                    </div>
                </CardContent>
            </Card>

            {/* Surgical Safety Checklist */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium">{nurseCare.sections.safetyChecklist}</CardTitle>
                    <Select defaultValue={initialData?.safety_checklist?.time || "08:15"}>
                        <SelectTrigger className="w-32 h-9">
                            <div className="flex-1 text-left">
                                <SelectValue placeholder={nurseCare.fields.selectTime} />
                            </div>
                            <Clock className="w-3.5 h-3.5 text-green-500 opacity-50 mr-2" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                            {TIME_SLOTS.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                    {slot}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                        <ChecklistItem id="safety-identity" label={nurseCare.fields.patientConfirmsIdentity} defaultChecked={!!initialData?.safety_checklist?.identity_confirmed} />
                        <ChecklistItem id="safety-site" label={nurseCare.fields.siteMarkedNotApplicable} defaultChecked={!!initialData?.safety_checklist?.site_marked} />
                        <ChecklistItem id="safety-consent" label={nurseCare.fields.consentFormComplete} defaultChecked={!!initialData?.safety_checklist?.consent_complete} />
                        <ChecklistItem id="safety-pulse" label={nurseCare.fields.pulseOximeterFunctioning} defaultChecked={!!initialData?.safety_checklist?.pulse_oximeter} />
                        <ChecklistItem id="safety-allergies" label={nurseCare.fields.knownAllergiesConfirmed} defaultChecked={!!initialData?.safety_checklist?.allergies} />
                        <ChecklistItem id="safety-airway" label={nurseCare.fields.difficultAirwayAssessed} defaultChecked={!!initialData?.safety_checklist?.airway} />
                        <ChecklistItem id="safety-blood" label={nurseCare.fields.bloodLossRiskAssessed} defaultChecked={!!initialData?.safety_checklist?.blood_loss} />
                    </div>
                    <div className="space-y-1.5 pt-2">
                        <Label className="text-xs font-medium text-slate-800">{nurseCare.fields.additionalNotes}</Label>
                        <Textarea placeholder={nurseCare.fields.enterAdditionalNotes} className="min-h-[80px] resize-none" defaultValue={initialData?.safety_checklist?.notes} />
                    </div>
                </CardContent>
            </Card>

            {/* Patient Positioning & Preparation */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{nurseCare.sections.positioning}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-slate-800">{nurseCare.fields.patientPosition}</Label>
                        <Input type="text" placeholder={nurseCare.fields.enterPatientPosition} className="h-10" defaultValue={initialData?.positioning?.position} />
                    </div>
                    <ChecklistItem id="pos-pressure" label={nurseCare.fields.pressurePointsPadded} defaultChecked={!!initialData?.positioning?.pressure_points} />
                </CardContent>
            </Card>

            {/* Time Out */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium">{nurseCare.sections.timeOut}</CardTitle>
                    <Select defaultValue={initialData?.time_out?.time || "08:45"}>
                        <SelectTrigger className="w-32 h-9">
                            <div className="flex-1 text-left">
                                <SelectValue placeholder={nurseCare.fields.selectTime} />
                            </div>
                            <Clock className="w-3.5 h-3.5 text-green-500 opacity-50 mr-2" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                            {TIME_SLOTS.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                    {slot}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                        <ChecklistItem id="timeout-team" label={nurseCare.fields.allTeamMembersIntroduced} defaultChecked={!!initialData?.time_out?.team_introduced} />
                        <ChecklistItem id="timeout-confirm" label={nurseCare.fields.teamConfirmsPatient} defaultChecked={!!initialData?.time_out?.confirmed} />
                        <ChecklistItem id="timeout-antibiotic" label={nurseCare.fields.antibioticProphylaxis} defaultChecked={!!initialData?.time_out?.antibiotic} />
                        <ChecklistItem id="timeout-imaging" label={nurseCare.fields.essentialImagingDisplayed} defaultChecked={!!initialData?.time_out?.imaging} />
                        <ChecklistItem id="timeout-sterility" label={nurseCare.fields.sterilityConfirmed} defaultChecked={!!initialData?.time_out?.sterility} />
                    </div>
                    <div className="space-y-1.5 pt-2">
                        <Label className="text-xs font-medium text-slate-800">{nurseCare.fields.additionalNotes}</Label>
                        <Textarea placeholder={nurseCare.fields.enterAdditionalNotes} className="min-h-[80px] resize-none" defaultValue={initialData?.time_out?.notes} />
                    </div>
                </CardContent>
            </Card>

            {/* Sign Out */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium">{nurseCare.sections.signOut}</CardTitle>
                    <Select defaultValue={initialData?.sign_out?.time || "10:30"}>
                        <SelectTrigger className="w-32 h-9">
                            <div className="flex-1 text-left">
                                <SelectValue placeholder={nurseCare.fields.selectTime} />
                            </div>
                            <Clock className="w-3.5 h-3.5 text-green-500 opacity-50 mr-2" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                            {TIME_SLOTS.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                    {slot}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                        <ChecklistItem id="signout-procedure" label={nurseCare.fields.procedureRecordedCorrectly} defaultChecked={!!initialData?.sign_out?.procedure} />
                        <ChecklistItem id="signout-counts" label={nurseCare.fields.instrumentCountsCorrect} defaultChecked={!!initialData?.sign_out?.counts} />
                        <ChecklistItem id="signout-specimen" label={nurseCare.fields.specimenLabeled} defaultChecked={!!initialData?.sign_out?.specimen} />
                        <ChecklistItem id="signout-equipment" label={nurseCare.fields.equipmentProblemsAddressed} defaultChecked={!!initialData?.sign_out?.equipment} />
                    </div>
                    <div className="space-y-1.5 pt-2">
                        <Label className="text-xs font-medium text-slate-800">{nurseCare.fields.additionalNotes}</Label>
                        <Textarea placeholder={nurseCare.fields.enterAdditionalNotes} className="min-h-[80px] resize-none" defaultValue={initialData?.sign_out?.notes} />
                    </div>
                </CardContent>
            </Card>

            {/* Implants Used */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium">{common.sections.implantsUsed}</CardTitle>
                    <NewButton name={common.actions.addImplant} handleClick={() => { }} />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-12 gap-2 text-xs px-1">
                        <div className="col-span-3">{nurseCare.fields.implantType}</div>
                        <div className="col-span-2">{nurseCare.fields.size}</div>
                        <div className="col-span-3">{nurseCare.fields.batchLotNo}</div>
                        <div className="col-span-2">{nurseCare.fields.manufacturer}</div>
                        <div className="col-span-2">{dict.common.quantity}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-start">
                        <div className="col-span-3"><SelectInput placeholder={nurseCare.fields.selectType} /></div>
                        <div className="col-span-2"><SelectInput placeholder={nurseCare.fields.selectSize} /></div>
                        <div className="col-span-3"><SelectInput placeholder={nurseCare.fields.selectBatch} /></div>
                        <div className="col-span-2"><SelectInput placeholder={nurseCare.fields.selectManufacturer} /></div>
                        <div className="col-span-2 flex gap-2">
                            <Input placeholder={nurseCare.fields.qty} className="h-9 text-xs" />
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 hover:bg-red-50">
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Consumables Used */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium">{common.sections.consumablesUsed}</CardTitle>
                    <NewButton name={common.actions.addConsumable} handleClick={() => { }} />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-12 gap-2 text-xs px-1">
                        <div className="col-span-4">{nurseCare.fields.itemName}</div>
                        <div className="col-span-3">{dict.common.quantity}</div>
                        <div className="col-span-5">{dict.common.note}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-start">
                        <div className="col-span-4"><SelectInput placeholder={nurseCare.fields.selectItemName} /></div>
                        <div className="col-span-3"><Input placeholder={nurseCare.fields.qty || "Qty"} className="h-9 text-xs" /></div>
                        <div className="col-span-5 flex gap-2">
                            <Input placeholder={nurseCare.fields.enterNote || "Enter Note"} className="h-9 text-xs" />
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 hover:bg-red-50">
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Additional Nursing Notes */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{nurseCare.sections.additionalNotes}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-slate-800">{nurseCare.fields.nursingNotes}</Label>
                        <Textarea placeholder={nurseCare.fields.enterNursingNotes} className="min-h-[100px] resize-none" defaultValue={initialData?.nursing_notes} />
                    </div>
                </CardContent>
            </Card>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-4">
                <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-white hover:text-blue-500"
                    onClick={onSaveDraft}
                >
                    {common.actions.saveDraft}
                </Button>
                <Button className="bg-green-600 hover:bg-green-600">
                    <Send size={16} className="mr-2" /> {common.actions.markCompleted}
                </Button>
            </div>
        </>
    );
};

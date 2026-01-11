"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { SelectField } from "@/app/[lang]/surgery/_components/common/SelectField";
import { Button } from "@workspace/ui/components/button";
import { useDictionary } from "@/i18n/use-dictionary";

// Options for select fields
const getOptions = (intraOp: any) => ({
    procedures: [
        { value: "lap_chole", label: "Laparoscopic Cholecystectomy" },
        { value: "open_chole", label: "Open Cholecystectomy" },
        { value: "appendectomy", label: "Appendectomy" },
        { value: "hernia_repair", label: "Hernia Repair" },
    ],
    sites: [
        { value: "left", label: "Left" },
        { value: "right", label: "Right" },
        { value: "bilateral", label: "Bilateral" },
        { value: "midline", label: "Midline" },
        { value: "na", label: "Not Applicable" },
    ],
    approaches: [
        { value: "laparoscopic", label: "Laparoscopic" },
        { value: "open", label: "Open" },
        { value: "robotic", label: "Robotic" },
        { value: "endoscopic", label: "Endoscopic" },
        { value: "converted", label: "Converted to Open" },
    ],
    bloodLoss: [
        { value: "<50", label: "<50 ml" },
        { value: "50-100", label: "50–100 ml" },
        { value: "100-300", label: "100–300 ml" },
        { value: ">300", label: ">300 ml" },
    ],
    bloodUnits: [
        { value: "0", label: "0" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
    ],
    implants: [
        { value: "hernia_mesh", label: "Hernia Mesh" },
        { value: "ortho_plate", label: "Orthopedic Plate" },
        { value: "stent", label: "Stent" },
    ],
    sizes: [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
    ],
    manufacturers: [
        { value: "ethicon", label: "Ethicon" },
        { value: "bard", label: "Bard" },
        { value: "covidien", label: "Covidien" },
    ],
    quantities: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
    ],
    consumables: [
        { value: "sutures", label: "Sutures" },
        { value: "stapler", label: "Stapler" },
        { value: "clip_cartridge", label: "Clip Cartridge" },
    ],
});

// Procedure Form Component (reusable for multiple procedures)
const ProcedureFormCard = ({ index, initialData, intraOp, options }: { index: number; initialData?: any; intraOp: any; options: any }) => (
    <div className="border border-slate-100 rounded-lg bg-slate-50/50 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
                label={intraOp.fields.actualProcedure}
                placeholder={intraOp.fields.selectProcedure}
                options={options.procedures}
                value={initialData?.name}
            />
            <SelectField
                label={intraOp.fields.sideSite}
                placeholder={intraOp.fields.selectSideSite}
                options={options.sites}
                value={initialData?.site}
            />
        </div>
        <SelectField
            label={intraOp.fields.approachAccess}
            placeholder={intraOp.fields.selectApproach}
            options={options.approaches}
            value={initialData?.approach}
        />
        <div className="space-y-1.5">
            <Label className="text-sm">{intraOp.fields.intraOpFindings}</Label>
            <Textarea
                placeholder={intraOp.fields.enterFindings}
                className="min-h-[80px] resize-none"
                defaultValue={initialData?.findings}
            />
        </div>
        <div className="space-y-1.5">
            <Label className="text-sm">{intraOp.fields.operativeSteps}</Label>
            <Textarea
                placeholder={intraOp.fields.enterOperativeSteps}
                className="min-h-[80px] resize-none"
                defaultValue={initialData?.steps}
            />
        </div>
    </div>
);

type IntraOpEditModeProps = {
    initialData?: any;
    onSaveDraft?: () => void;
};

export const IntraOpEditMode = ({ initialData, onSaveDraft }: IntraOpEditModeProps) => {
    const dict = useDictionary();
    const intraOp = dict.pages.surgery.surgeryDetails.intraOp;
    const common = dict.pages.surgery.surgeryDetails.common;
    const options = getOptions(intraOp);

    const [specimensChecked, setSpecimensChecked] = useState(!!initialData?.specimens?.histopathology);
    const [drainsChecked, setDrainsChecked] = useState(!!initialData?.specimens?.drains);
    const [catheterChecked, setCatheterChecked] = useState(!!initialData?.specimens?.catheter);

    return (
        <>
            {/* Surgery Timing */}
            <Card className="shadow-none border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">{intraOp.sections.surgeryTiming}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-sm">{intraOp.fields.patientInTime}</Label>
                            <Input type="datetime-local" className="h-10" defaultValue={initialData?.timing?.patient_in} />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-sm">{intraOp.fields.anesthesiaStart}</Label>
                            <Input type="datetime-local" className="h-10" defaultValue={initialData?.timing?.anesthesia_start} />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-sm">{intraOp.fields.surgeryStartIncision}</Label>
                            <Input type="datetime-local" className="h-10" defaultValue={initialData?.timing?.surgery_start} />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-sm">{intraOp.fields.surgeryEndClosure}</Label>
                            <Input type="datetime-local" className="h-10" defaultValue={initialData?.timing?.surgery_end} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Procedure Details */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{intraOp.sections.procedureDetails}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ProcedureFormCard index={1} initialData={initialData?.procedure} intraOp={intraOp} options={options} />
                    
                    <ProcedureFormCard index={2} intraOp={intraOp} options={options} />
                </CardContent>
            </Card>

            {/* Complications */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{intraOp.sections.complications}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium">{intraOp.fields.intraOpComplications}</Label>
                        <Textarea
                            placeholder={intraOp.fields.enterComplications}
                            className="min-h-[60px] resize-none"
                            defaultValue={initialData?.complications}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Blood Loss & Transfusion */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{intraOp.sections.bloodLossTransfusion}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SelectField
                        label={intraOp.fields.estimatedBloodLoss}
                        placeholder={intraOp.fields.selectBloodLoss}
                        options={options.bloodLoss}
                        value={initialData?.blood_loss?.estimated}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectField
                            label={intraOp.fields.prbcUnits}
                            placeholder={intraOp.fields.selectUnits}
                            options={options.bloodUnits}
                            value={initialData?.blood_loss?.prbc?.toString()}
                        />
                        <SelectField
                            label={intraOp.fields.ffpUnits}
                            placeholder={intraOp.fields.selectUnits}
                            options={options.bloodUnits}
                            value={initialData?.blood_loss?.ffp?.toString()}
                        />
                        <SelectField
                            label={intraOp.fields.plateletsUnits}
                            placeholder={intraOp.fields.selectUnits}
                            options={options.bloodUnits}
                            value={initialData?.blood_loss?.platelets?.toString()}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Implants Used */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{intraOp.sections.implantsUsed}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField
                            label={intraOp.fields.implantType}
                            placeholder={intraOp.fields.selectImplantType}
                            options={options.implants}
                            value={initialData?.implants?.type}
                        />
                        <SelectField
                            label={intraOp.fields.size}
                            placeholder={intraOp.fields.selectSize}
                            options={options.sizes}
                            value={initialData?.implants?.size}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-sm">{intraOp.fields.batchLotNo}</Label>
                            <Input type="text" placeholder={intraOp.fields.enterBatchLotNo} className="h-10" defaultValue={initialData?.implants?.batch_no} />
                        </div>
                        <SelectField
                            label={intraOp.fields.manufacturer}
                            placeholder={intraOp.fields.selectManufacturer}
                            options={options.manufacturers}
                            value={initialData?.implants?.manufacturer}
                        />
                    </div>
                    <SelectField
                        label={intraOp.fields.quantity}
                        placeholder={intraOp.fields.selectQuantity}
                        options={options.quantities}
                        value={initialData?.implants?.quantity?.toString()}
                    />
                </CardContent>
            </Card>

            {/* Consumables Used */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{intraOp.sections.consumablesUsed}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField
                            label={intraOp.fields.itemName}
                            placeholder={intraOp.fields.selectItemName}
                            options={options.consumables}
                            value={initialData?.consumables?.item_name}
                        />
                        <div className="space-y-1.5">
                            <Label className="text-sm">{intraOp.fields.quantity}</Label>
                            <Input type="number" placeholder={intraOp.fields.enterQuantity} className="h-10" defaultValue={initialData?.consumables?.quantity} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-sm">{intraOp.fields.note}</Label>
                        <Input type="text" placeholder={intraOp.fields.enterNote} className="h-10" defaultValue={initialData?.consumables?.note} />
                    </div>
                </CardContent>
            </Card>

            {/* Specimens & Other Details */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{intraOp.sections.specimensOther}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="specimens"
                                checked={specimensChecked}
                                onCheckedChange={(checked) => setSpecimensChecked(checked as boolean)}
                            />
                            <Label htmlFor="specimens" className="text-sm cursor-pointer">
                                {intraOp.fields.specimensHistopathology}
                            </Label>
                        </div>
                        {specimensChecked && (
                            <div className="ml-6 space-y-1.5">
                                <Textarea
                                    placeholder={intraOp.fields.enterSpecimenDetails}
                                    className="min-h-[80px] resize-none"
                                />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="drains"
                                checked={drainsChecked}
                                onCheckedChange={(checked) => setDrainsChecked(checked as boolean)}
                            />
                            <Label htmlFor="drains" className="text-sm cursor-pointer">
                                {intraOp.fields.drainsPlaced}
                            </Label>
                        </div>
                        {drainsChecked && (
                            <div className="ml-6 space-y-1.5">
                                <Textarea
                                    placeholder={intraOp.fields.enterDrainDetails}
                                    className="min-h-[80px] resize-none"
                                />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="catheter"
                                checked={catheterChecked}
                                onCheckedChange={(checked) => setCatheterChecked(checked as boolean)}
                            />
                            <Label htmlFor="catheter" className="text-sm cursor-pointer">
                                {intraOp.fields.catheterPlaced}
                            </Label>
                        </div>
                        {catheterChecked && (
                            <div className="ml-6 space-y-1.5">
                                <Textarea
                                    placeholder={intraOp.fields.enterCatheterDetails}
                                    className="min-h-[80px] resize-none"
                                />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Surgeon's Additional Notes */}
            <Card className="shadow-none border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{intraOp.sections.surgeonNotes}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium">{intraOp.fields.operativeSteps}</Label>
                        <Textarea
                            placeholder={intraOp.fields.enterAdditionalNotes}
                            className="min-h-[100px] resize-none"
                            defaultValue={initialData?.surgeon_notes}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
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

"use client";

import React from "react";
import { ArchiveRestore, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import OrderLaboratoryTestModal from "../modals/OrderLaboratoryTestModal";
import OrderRadiologyProcedureModal from "../modals/OrderRadiologyProcedureModal";
import NurseOrdersModal from "../modals/NurseOrdersModal";
import ImplantsConsumablesModal from "../modals/ImplantsConsumablesModal";
import BloodRequirementModal from "../modals/BloodRequirementModal";
import MedicalClearanceModal from "../modals/MedicalClearanceModal";
import { OrderLabData } from "../modals/OrderLaboratoryTestModal";
import { OrderRadiologyData } from "../modals/OrderRadiologyProcedureModal";
import { useDictionary } from "@/i18n/use-dictionary";
import { SectionCard } from "../SectionCard";
import {
    SectionConfig,
    ChecklistItem,
} from "../PreOpChecklist";

export type PreOpEditModeProps = {
    sections: SectionConfig[];
    setSections: React.Dispatch<React.SetStateAction<SectionConfig[]>>;
    onSaveDraft?: () => void;
};

export const PreOpEditMode = ({ sections, setSections, onSaveDraft }: PreOpEditModeProps) => {
    const dict = useDictionary();
    const preOp = dict.pages.surgery.surgeryDetails.preOp;
    const [isLabModalOpen, setIsLabModalOpen] = React.useState(false);
    const [selectedLabTest, setSelectedLabTest] = React.useState("");
    const [isRadModalOpen, setIsRadModalOpen] = React.useState(false);
    const [selectedRadTest, setSelectedRadTest] = React.useState("");
    const [isNurseModalOpen, setIsNurseModalOpen] = React.useState(false);
    const [selectedNurseOrder, setSelectedNurseOrder] = React.useState("");
    const [isImplantsModalOpen, setIsImplantsModalOpen] = React.useState(false);
    const [selectedImplant, setSelectedImplant] = React.useState("");
    const [selectedBlood, setSelectedBlood] = React.useState("");
    const [isBloodModalOpen, setIsBloodModalOpen] = React.useState(false);
    const [selectedTemplate, setSelectedTemplate] = React.useState("");
    const [isClearanceModalOpen, setIsClearanceModalOpen] = React.useState(false);
    const [selectedClearance, setSelectedClearance] = React.useState("");

    const handleAddItem = (sectionId: string, newItem: ChecklistItem) => {
        setSections(prev => prev.map(section => {
            if (section.id === sectionId) {
                return { ...section, items: [...section.items, newItem] };
            }
            return section;
        }));
    };

    const handleRemoveItem = (sectionId: string, itemIndex: number) => {
        setSections(prev => prev.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    items: section.items.filter((_, idx) => idx !== itemIndex)
                };
            }
            return section;
        }));
    };

    const handleOrderLab = (testValue: string) => {
        setSelectedLabTest(testValue);
        setIsLabModalOpen(true);
    };

    const handleLabSave = (data: OrderLabData) => {
        const section = sections.find(s => s.id === "investigations");
        const label = section?.addOptions.find(o => o.value === data.test)?.label || data.test;

        let subLabel = dict.common.justNow;
        // removed urgency from subLabel as it is now a badge
        if (data.notes) subLabel += ` | Note: ${data.notes}`;

        handleAddItem("investigations", {
            label,
            status: "Ordered",
            category: "Laboratory Test",
            urgency: data.urgency,
            subLabel
        });
    };

    const handleOrderRad = (testValue: string) => {
        setSelectedRadTest(testValue);
        setIsRadModalOpen(true);
    };

    const handleRadSave = (data: OrderRadiologyData) => {
        const section = sections.find(s => s.id === "investigations");
        const label = section?.addOptions.find(o => o.value === data.procedure)?.label || data.procedure;

        let subLabel = dict.common.justNow;
        // removed urgency from subLabel as it is now a badge
        if (data.notes) subLabel += ` | Note: ${data.notes}`;

        handleAddItem("investigations", {
            label,
            status: "Ordered",
            category: "Radiology & Imaging",
            urgency: data.urgency,
            subLabel
        });
    };

    const handleOrderNurse = (orderValue: string) => {
        setSelectedNurseOrder(orderValue);
        setIsNurseModalOpen(true);
    };

    const handleNurseSave = (data: any) => {
        const section = sections.find(s => s.id === "nursingOrders");
        const label = section?.addOptions.find(o => o.value === data.orderType)?.label || data.orderType;

        let subLabel = dict.common.justNow;
        if (data.notes) subLabel += ` | ${data.notes}`;

        handleAddItem("nursingOrders", {
            label: data.orderType === 'iv_fluids' ? `IV Fluids: ${data.fluidType} ${data.volume}mL` : label,
            status: "Ordered",
            subLabel
        });
    };


    const handleOrderImplant = (implantValue: string) => {
        setSelectedImplant(implantValue);
        setIsImplantsModalOpen(true);
    };

    const handleImplantSave = (data: any) => {
        const section = sections.find(s => s.id === "implants");
        const label = section?.addOptions.find(o => o.value === data.implantType)?.label || data.implantType;

        // Construct sublabel from details
        const details = [];
        if (data.size) details.push(data.size);
        if (data.implantType === 'mesh' || data.implantType === 'fixation') {
            // Example formatting
        }
        if (data.manufacturer) details.push(data.manufacturer);
        if (data.quantity) details.push(`Qty: ${data.quantity}`);
        if (data.notes) details.push(data.notes);

        handleAddItem("implants", {
            label,
            status: "Ordered",
            subLabel: details.join(" | ") || "Details recorded"
        });
    };



    const handleOrderBlood = (bloodValue: string) => {
        setSelectedBlood(bloodValue);
        setIsBloodModalOpen(true);
    };

    const handleBloodSave = (data: any) => {
        const section = sections.find(s => s.id === "blood");
        const label = section?.addOptions.find(o => o.value === data.component)?.label || data.component;

        // Construct sublabel from details
        const details = [];
        if (data.units) details.push(`${data.units} Units`);
        if (data.group) details.push(`Group: ${data.group}`);
        if (data.urgency) details.push(`Urgency: ${data.urgency}`);
        if (data.date) details.push(`Date: ${data.date}`);
        if (data.time) details.push(`Time: ${data.time}`);
        if (data.notes) details.push(data.notes);

        handleAddItem("blood", {
            label,
            status: "Ordered",
            subLabel: details.join(" | ") || "Details recorded",
        });
    };

    const handleOrderClearance = (clearanceValue: string) => {
        setSelectedClearance(clearanceValue);
        setIsClearanceModalOpen(true);
    };

    const handleClearanceSave = (data: any) => {
        const section = sections.find(s => s.id === "clearances");
        const label = section?.addOptions.find(o => o.value === data.clearanceType)?.label || data.clearanceType;

        handleAddItem("clearances", {
            label,
            status: "Pending",
            doctor: data.doctor,
            urgency: data.urgency,
            subLabel: `Note: ${data.notes || "Not specified"}`
        });
    };



    const handleSaveDraft = () => {
        // Simulate saving data
        console.log("Saving Pre-Op Checklist Draft:", sections);

        // Call the parent handler to switch mode
        if (onSaveDraft) {
            onSaveDraft();
        }
    };

    return (
        <div className="space-y-2">
            {/* Surgery Requirement stays separate */}
            <Card className="shadow-none border-0 mb-4 bg-white">
                <CardHeader>
                    <CardTitle className="text-base font-medium text-slate-800">
                        {preOp.fields.surgeryRequirement}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-4">
                        <div className="flex-1 space-y-1.5">
                            <Label className="text-xs font-medium text-slate-700">
                                {preOp.fields.surgeryTemplate}
                            </Label>
                            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                                <SelectTrigger className="h-10 w-full">
                                    <SelectValue placeholder={preOp.fields.selectTemplate} />
                                </SelectTrigger>
                                <SelectContent className="z-[100]">
                                    <SelectItem value="appendectomy">Appendectomy</SelectItem>
                                    <SelectItem value="cholecystectomy">Cholecystectomy</SelectItem>
                                    <SelectItem value="hernia_repair">Hernia Repair</SelectItem>
                                    <SelectItem value="hip_replacement">Hip Replacement</SelectItem>
                                    <SelectItem value="knee_arthroscopy">Knee Arthroscopy</SelectItem>
                                    <SelectItem value="cesarean">Cesarean Section</SelectItem>
                                    <SelectItem value="mastectomy">Mastectomy</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="shrink-0 bg-[#50C786] hover:bg-[#50C786] text-white px-4 rounded-sm font-light">
                            <div className="flex items-center bg-green-400 p-1 rounded-sm">
                                <ArchiveRestore size={16} strokeWidth={2} />
                            </div>
                            {preOp.actions.loadTemplates}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* All checklist sections */}
            {sections.map((section) => (
                <SectionCard
                    key={section.title}
                    config={section}
                    onAddItem={(item) => handleAddItem(section.id, item)}
                    onRemoveItem={(index) => handleRemoveItem(section.id, index)}
                    onOrderLab={section.id === "investigations" ? handleOrderLab : undefined}
                    onOrderRad={section.id === "investigations" ? handleOrderRad : undefined}
                    onOrderNurse={section.id === "prep" ? handleOrderNurse : undefined}
                    onOrderImplant={section.id === "implants" ? handleOrderImplant : undefined}
                    onOrderBlood={section.id === "blood" ? handleOrderBlood : undefined}
                    onOrderClearance={section.id === "clearances" ? handleOrderClearance : undefined}
                />
            ))}

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-4">
                <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-white hover:text-blue-500"
                    onClick={handleSaveDraft}
                >
                    {preOp.actions.saveDraft}
                </Button>
                <Button className="bg-green-600 hover:bg-green-600">
                    <Send size={16} className="mr-2" /> {preOp.actions.markCompleted}
                </Button>
            </div>

            <OrderLaboratoryTestModal
                open={isLabModalOpen}
                onOpenChange={setIsLabModalOpen}
                onSave={handleLabSave}
                initialTest={selectedLabTest}
                testOptions={sections.find(s => s.id === "investigations")?.addOptions || []}
            />

            <OrderRadiologyProcedureModal
                open={isRadModalOpen}
                onOpenChange={setIsRadModalOpen}
                onSave={handleRadSave}
                initialProcedure={selectedRadTest}
                procedureOptions={sections.find(s => s.id === "investigations")?.addOptions || []}
            />

            <MedicalClearanceModal
                open={isClearanceModalOpen}
                onOpenChange={setIsClearanceModalOpen}
                onSave={handleClearanceSave}
                initialClearance={selectedClearance}
                clearanceOptions={sections.find(s => s.id === "clearances")?.addOptions || []}
                doctorOptions={[
                    { value: "dr_vinay", label: "Dr. Vinay" },
                    { value: "dr_kiran", label: "Dr. Kiran Madha" },
                    { value: "dr_john", label: "Dr. John Doe" },
                    { value: "dr_sarah", label: "Dr. Sarah" },
                ]}
            />

            <NurseOrdersModal
                open={isNurseModalOpen}
                onOpenChange={setIsNurseModalOpen}
                onSave={handleNurseSave}
                initialOrder={selectedNurseOrder}
            />

            <ImplantsConsumablesModal
                open={isImplantsModalOpen}
                onOpenChange={setIsImplantsModalOpen}
                onSave={handleImplantSave}
                initialData={selectedImplant}
            />

            <BloodRequirementModal
                open={isBloodModalOpen}
                onOpenChange={setIsBloodModalOpen}
                onSave={handleBloodSave}
                initialData={selectedBlood}
            />
        </div>
    );
};

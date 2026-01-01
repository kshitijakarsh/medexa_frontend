"use client";

import React from "react";
import { ArchiveRestore, Trash2, MoreVertical, FileSearch, SquareCheckBig, Stethoscope, Plus, Eye, Pencil, FilePlus, Send, Check, ChevronsUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@workspace/ui/components/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@workspace/ui/components/command";
import { cn } from "@workspace/ui/lib/utils";
import NewButton from "@/components/common/new-button";
import OrderLaboratoryTestModal from "../modals/OrderLaboratoryTestModal";
import OrderRadiologyProcedureModal from "../modals/OrderRadiologyProcedureModal";
import NurseOrdersModal from "../modals/NurseOrdersModal";
import ImplantsConsumablesModal from "../modals/ImplantsConsumablesModal";
import BloodRequirementModal from "../modals/BloodRequirementModal";
import MedicalClearanceModal from "../modals/MedicalClearanceModal";

import {
    SectionConfig,
    ChecklistItem,
    ItemStatus,
    AddOption,
    STATUS_STYLES,
    newItemUrgencyStyle
} from "../PreOpChecklist";

const sectionTypeMapping: Record<string, string> = {
    "Consents Required": "Consent Form",
    "Nursing Orders (Pre-Op)": "Nursing Order",
    "Anaesthesia Requirements": "Anaesthesia Req",
    "Equipment & Instruments": "Equipment",
};


type SectionCardProps = {
    config: SectionConfig;
    onAddItem: (item: ChecklistItem) => void;
    onOrderLab?: (test: string) => void;
    onOrderRad?: (test: string) => void;
    onOrderNurse?: (order: string) => void;
    onOrderImplant?: (implant: string) => void;
    onOrderBlood?: (blood: string) => void;
    onOrderClearance?: (clearance: string) => void;
    onRemoveItem: (index: number) => void;
};

const SectionCard = ({ config, onAddItem, onOrderLab, onOrderRad, onOrderNurse, onOrderImplant, onOrderBlood, onOrderClearance, onRemoveItem }: SectionCardProps) => {

    const { title, items, addLabel, addOptions } = config;
    const [selectedValue, setSelectedValue] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const [openPopover, setOpenPopover] = React.useState(false);

    const validateSelection = (): boolean => {
        if (!selectedValue) {
            setError(`${addLabel.replace("Add ", "")} is required`);
            return false;
        }
        return true;
    };


    console.log(addOptions);
    return (
        <Card className="shadow-none border-0 mb-4 bg-white">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-medium text-slate-800">
                        {title}
                    </CardTitle>

                    {items.length > 0 && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                            {items.filter((i: ChecklistItem) => i.status === "Completed" || i.status === "Ordered").length}/{items.length} Completed
                        </span>
                    )}
                </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
                {/* Existing items */}
                {items.map((item: ChecklistItem, index: number) => (
                    <div
                        key={`${item.label}-${index}`}
                        className={`rounded-lg p-3 border ${item.status === "Completed"
                            ? "border-green-200 bg-green-50/50"
                            : "border-slate-200 bg-white"
                            }`}
                    >
                        {/* Main Row */}
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-slate-800">{item.label}</span>
                                    {title !== "Medical Clearances" && (item.category || title === "Required Investigations") && (
                                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                                            {item.category || "Laboratory Test"}
                                        </span>
                                    )}
                                    {item.urgency && (
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${newItemUrgencyStyle(item.urgency)}`}>
                                            {item.urgency.charAt(0).toUpperCase() + item.urgency.slice(1)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                                    {title === "Required Investigations" && (
                                        <>
                                            <span>Biochemistry</span>
                                            <span>|</span>
                                        </>
                                    )}
                                    <span>{item.subLabel || "2025-09-27 19:30"}</span>
                                    {item.status === "Completed" && (
                                        <span className="flex items-center gap-1 text-green-600 px-2 py-0.5">
                                            <SquareCheckBig size={12} />
                                            Completed using previous result
                                        </span>
                                    )}
                                </div>
                                {/* Ordered by (only for Completed/Ordered and Required Investigations) */}
                                {(item.status === "Completed" || item.status === "Ordered") && item.orderedBy && title === "Required Investigations" && (
                                    <p className="text-xs text-blue-500 mt-2 flex items-center gap-1 font-medium">
                                        <Stethoscope size={14} /> Ordered By {item.orderedBy}
                                    </p>
                                )}
                            </div>

                            {/* Right side: Status + Action */}
                            <div className="flex items-center gap-2">
                                <span
                                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${item.status ? STATUS_STYLES[item.status] : "bg-slate-200 text-slate-500"}`}
                                >
                                    {item.status || "Pending"}
                                </span>
                                {title !== "Required Investigations" ? (
                                    <button
                                        onClick={() => onRemoveItem(index)}
                                        className="p-2 bg-red-100 text-red-400 rounded-sm transition-colors hover:bg-red-200"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                ) : (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="flex items-center gap-1 text-xs text-blue-500 font-medium px-2 py-1 rounded-sm transition-colors bg-white hover:bg-slate-50">
                                                Action
                                                <MoreVertical size={14} className="text-green-500" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {item.status === "Completed" ? (
                                                <>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        Create New Order <FilePlus size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        View <Eye size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => onRemoveItem(index)}
                                                        className="gap-2 cursor-pointer justify-between text-red-600 focus:text-red-600"
                                                    >
                                                        Delete <Trash2 size={14} />
                                                    </DropdownMenuItem>
                                                </>
                                            ) : (
                                                <>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        View <Eye size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        Edit <Pencil size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => onRemoveItem(index)}
                                                        className="gap-2 cursor-pointer justify-between text-red-600 focus:text-red-600"
                                                    >
                                                        Delete <Trash2 size={14} />
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        </div>

                        {/* Previous Result Available Section (Only for Ordered and if previousResult exists) */}
                        {item.status === "Ordered" && item.previousResult && (
                            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                                <p className="text-xs text-slate-600 flex items-center gap-1.5">
                                    <span className="text-blue-500">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="16" x2="12" y2="12"></line>
                                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                        </svg>
                                    </span>
                                    Previous result available: {item.previousResult.date} ({item.previousResult.count} results)
                                </p>
                                <Button
                                    size="sm"
                                    className="h-7 text-xs bg-blue-500 hover:bg-blue-600 text-white gap-1.5 rounded-full px-3"
                                >
                                    Use Previous Result
                                    <FileSearch size={12} />
                                </Button>
                            </div>
                        )}
                    </div>
                ))}

                {/* Add row */}
                <div className="pt-4 mt-4">
                    <div className="flex items-end gap-4">
                        <div className="flex-1 space-y-1.5">
                            <Label className="text-xs font-medium text-slate-700">
                                {addLabel}
                            </Label>
                            {title === "Consents Required" ? (
                                <Popover open={openPopover} onOpenChange={setOpenPopover}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openPopover}
                                            className={cn("h-10 w-full justify-between bg-white text-xs font-normal", error && "border-red-500")}
                                        >
                                            {selectedValue
                                                ? addOptions.find((opt) => opt.value === selectedValue)?.label
                                                : `Select ${addLabel.replace("Add ", "")}`}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                        <Command>
                                            <CommandInput placeholder={`Search ${addLabel.replace("Add ", "")}...`} className="h-9 text-xs" />
                                            <CommandList>
                                                <CommandEmpty className="text-xs">No forms found.</CommandEmpty>
                                                <CommandGroup>
                                                    {addOptions.map((opt) => (
                                                        <CommandItem
                                                            key={opt.value}
                                                            value={opt.label}
                                                            onSelect={(currentValue) => {
                                                                // cmdk value is typically lowercase label
                                                                const selected = addOptions.find(o => o.label.toLowerCase() === currentValue.toLowerCase());
                                                                if (selected) {
                                                                    setSelectedValue(selected.value);
                                                                    setError("");
                                                                    setOpenPopover(false);
                                                                }
                                                            }}
                                                            className="text-xs"
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    selectedValue === opt.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {opt.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            ) : (
                                <Select value={selectedValue} onValueChange={(val) => {
                                    setSelectedValue(val);
                                    setError("");
                                }}>
                                    <SelectTrigger className={`h-10 w-full ${error ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder={`Select ${addLabel.replace("Add ", "")}`} />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[300px]">

                                        {addOptions.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            {error && (
                                <p className="text-xs text-red-500 mt-1">{error}</p>
                            )}
                        </div>
                        {title === "Required Investigations" ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        onClick={(e) => {
                                            if (!validateSelection()) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className="bg-green-500 hover:bg-green-600 text-white font-medium flex items-center gap-2 pr-0 rounded-[5.6rem] cursor-pointer transition-colors duration-200"
                                    >
                                        Add
                                        <span className="p-2 bg-green-600 rounded-full">
                                            <Plus className="text-green-600 w-4 h-4 bg-white rounded-full" />
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => {
                                        if (validateSelection()) {
                                            if (onOrderLab) {
                                                onOrderLab(selectedValue);
                                            } else {
                                                const label = addOptions.find((o: AddOption) => o.value === selectedValue)?.label || selectedValue;
                                                onAddItem({
                                                    label,
                                                    status: "Ordered",
                                                    subLabel: "Just added",
                                                    category: "Laboratory Test"
                                                });
                                            }
                                            setSelectedValue("");
                                        }
                                    }}>
                                        Order Laboratory Test
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {
                                        if (validateSelection()) {
                                            if (onOrderRad) {
                                                onOrderRad(selectedValue);
                                            } else {
                                                const label = addOptions.find((o: AddOption) => o.value === selectedValue)?.label || selectedValue;
                                                onAddItem({
                                                    label,
                                                    status: "Ordered",
                                                    subLabel: "Just added",
                                                    category: "Radiology & Imaging"
                                                });
                                            }
                                            setSelectedValue("");
                                        }
                                    }}>
                                        Order Radiology Procedure
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : title === "Patient Preparation Requirements" ? (
                            <NewButton handleClick={() => {
                                if (validateSelection()) {
                                    if (onOrderNurse) {
                                        onOrderNurse(selectedValue);
                                    }
                                    setSelectedValue("");
                                }
                            }} name="Add" />
                        ) : title === "Implants & Consumables" ? (
                            <NewButton handleClick={() => {
                                if (validateSelection()) {
                                    if (onOrderImplant) {
                                        onOrderImplant(selectedValue);
                                    }
                                    setSelectedValue("");
                                }
                            }} name="Add" />
                        ) : title === "Medical Clearances" ? (
                            <NewButton handleClick={() => {
                                if (validateSelection()) {
                                    if (onOrderClearance) {
                                        onOrderClearance(selectedValue);
                                    }
                                    setSelectedValue("");
                                }
                            }} name="Add" />
                        ) : title === "Blood & Resource Preparation" ? (
                            <NewButton handleClick={() => {
                                if (validateSelection()) {
                                    if (onOrderBlood) {
                                        onOrderBlood(selectedValue);
                                    }
                                    setSelectedValue("");
                                }
                            }} name="Add" />
                        ) : (
                            <NewButton handleClick={() => {
                                if (validateSelection()) {
                                    const label = addOptions.find((o: AddOption) => o.value === selectedValue)?.label || selectedValue;
                                    onAddItem({
                                        label,
                                        status: "Ordered",
                                        subLabel: "Just added",
                                        category: sectionTypeMapping[title] || "Requirement"
                                    });
                                    setSelectedValue("");
                                }
                            }} name="Add" />
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

/* ---------------------------------- */
/* Main component                      */
/* ---------------------------------- */

export type PreOpEditModeProps = {
    sections: SectionConfig[];
    setSections: React.Dispatch<React.SetStateAction<SectionConfig[]>>;
    onSaveDraft?: () => void;
};

export const PreOpEditMode = ({ sections, setSections, onSaveDraft }: PreOpEditModeProps) => {
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

    const handleAddItem = (sectionTitle: string, newItem: ChecklistItem) => {
        setSections(prev => prev.map(section => {
            if (section.title === sectionTitle) {
                return { ...section, items: [...section.items, newItem] };
            }
            return section;
        }));
    };

    const handleRemoveItem = (sectionTitle: string, itemIndex: number) => {
        setSections(prev => prev.map(section => {
            if (section.title === sectionTitle) {
                return {
                    ...section,
                    items: section.items.filter((_, i) => i !== itemIndex)
                };
            }
            return section;
        }));
    };

    const handleOrderLab = (testValue: string) => {
        setSelectedLabTest(testValue);
        setIsLabModalOpen(true);
    };

    const handleLabSave = (data: { test: string; urgency: string; isRequired: boolean; notes: string }) => {
        const section = sections.find(s => s.title === "Required Investigations");
        const label = section?.addOptions.find(o => o.value === data.test)?.label || data.test;

        let subLabel = "Just added";
        // removed urgency from subLabel as it is now a badge
        if (data.notes) subLabel += ` | Note: ${data.notes}`;

        handleAddItem("Required Investigations", {
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

    const handleRadSave = (data: { procedure: string; urgency: string; isRequired: boolean; notes: string }) => {
        const section = sections.find(s => s.title === "Required Investigations");
        const label = section?.addOptions.find(o => o.value === data.procedure)?.label || data.procedure;

        let subLabel = "Just added";
        // removed urgency from subLabel as it is now a badge
        if (data.notes) subLabel += ` | Note: ${data.notes}`;

        handleAddItem("Required Investigations", {
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
        const section = sections.find(s => s.title === "Patient Preparation Requirements");
        const label = section?.addOptions.find(o => o.value === data.orderType)?.label || data.orderType;

        let subLabel = "Just added";
        if (data.notes) subLabel += ` | ${data.notes}`;

        handleAddItem("Patient Preparation Requirements", {
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
        const section = sections.find(s => s.title === "Implants & Consumables");
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

        handleAddItem("Implants & Consumables", {
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
        const section = sections.find(s => s.title === "Blood & Resource Preparation");
        const label = section?.addOptions.find(o => o.value === data.component)?.label || data.component;

        // Construct sublabel from details
        const details = [];
        if (data.units) details.push(`${data.units} Units`);
        if (data.group) details.push(`Group: ${data.group}`);
        if (data.urgency) details.push(`Urgency: ${data.urgency}`);
        if (data.date) details.push(`Date: ${data.date}`);
        if (data.time) details.push(`Time: ${data.time}`);
        if (data.notes) details.push(data.notes);

        handleAddItem("Blood & Resource Preparation", {
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
        const section = sections.find(s => s.title === "Medical Clearances");
        const label = section?.addOptions.find(o => o.value === data.clearanceType)?.label || data.clearanceType;

        handleAddItem("Medical Clearances", {
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
                        Surgery Requirement
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-4">
                        <div className="flex-1 space-y-1.5">
                            <Label className="text-xs font-medium text-slate-700">
                                Surgery Template
                            </Label>
                            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                                <SelectTrigger className="h-10 w-full">
                                    <SelectValue placeholder="Select Surgery Template" />
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
                            Load Templates
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* All checklist sections */}
            {sections.map((section) => (
                <SectionCard
                    key={section.title}
                    config={section}
                    onAddItem={(item) => handleAddItem(section.title, item)}
                    onRemoveItem={(index) => handleRemoveItem(section.title, index)}
                    onOrderLab={section.title === "Required Investigations" ? handleOrderLab : undefined}
                    onOrderRad={section.title === "Required Investigations" ? handleOrderRad : undefined}
                    onOrderNurse={section.title === "Patient Preparation Requirements" ? handleOrderNurse : undefined}
                    onOrderImplant={section.title === "Implants & Consumables" ? handleOrderImplant : undefined}
                    onOrderBlood={section.title === "Blood & Resource Preparation" ? handleOrderBlood : undefined}
                    onOrderClearance={section.title === "Medical Clearances" ? handleOrderClearance : undefined}
                />
            ))}

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-4">
                <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-white hover:text-blue-500"
                    onClick={handleSaveDraft}
                >
                    SAVE AS DRAFT
                </Button>
                <Button className="bg-green-600 hover:bg-green-600">
                    <Send size={16} className="mr-2" /> MARK AS COMPLETED
                </Button>
            </div>

            <OrderLaboratoryTestModal
                open={isLabModalOpen}
                onOpenChange={setIsLabModalOpen}
                onSave={handleLabSave}
                initialTest={selectedLabTest}
                testOptions={sections.find(s => s.title === "Required Investigations")?.addOptions || []}
            />

            <OrderRadiologyProcedureModal
                open={isRadModalOpen}
                onOpenChange={setIsRadModalOpen}
                onSave={handleRadSave}
                initialProcedure={selectedRadTest}
                procedureOptions={sections.find(s => s.title === "Required Investigations")?.addOptions || []}
            />

            <MedicalClearanceModal
                open={isClearanceModalOpen}
                onOpenChange={setIsClearanceModalOpen}
                onSave={handleClearanceSave}
                initialClearance={selectedClearance}
                clearanceOptions={sections.find(s => s.title === "Medical Clearances")?.addOptions || []}
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

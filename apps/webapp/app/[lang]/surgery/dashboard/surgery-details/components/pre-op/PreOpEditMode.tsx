"use client";

import React from "react";
import { ArchiveRestore, Trash2, MoreVertical, FileSearch, SquareCheckBig, Stethoscope, Plus, Eye, Pencil, FilePlus, Send } from "lucide-react";
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
import NewButton from "@/components/common/new-button";
import OrderLaboratoryTestModal from "./OrderLaboratoryTestModal";
import OrderRadiologyProcedureModal from "./OrderRadiologyProcedureModal";
import NurseOrdersModal from "./NurseOrdersModal";
import ImplantsConsumablesModal from "./ImplantsConsumablesModal";
import BloodRequirementModal from "./BloodRequirementModal";

type ItemStatus = "Completed" | "Ordered" | "Pending" | "Processing" | "Due" | "N/A";

type ChecklistItem = {
    label: string;
    status: ItemStatus;
    subLabel?: string;
    category?: string;
    urgency?: string;
    orderedBy?: string;
    previousResult?: {
        date: string;
        count: number;
    };
};

type AddOption = {
    value: string;
    label: string;
    group?: string;
};

type SectionConfig = {
    title: string;

    showChanged?: boolean;
    items: ChecklistItem[];
    addLabel: string;
    addOptions: AddOption[];
};

const SECTIONS: SectionConfig[] = [
    {
        title: "Procedures",
        showChanged: false,
        items: [
            {
                label: "Laparoscopic Cholecystectomy",
                // Status not needed for info section
                status: "Pending",
                subLabel: "Impression: Normal sinus rhythm. No ST-T wave changes. No evidence of acute ischemia."
            },
        ],
        addLabel: "Add Procedure",
        addOptions: [
            { value: "lap_chole", label: "Laparoscopic Cholecystectomy" },
            { value: "appendectomy", label: "Appendectomy" },
            { value: "hernia_repair", label: "Hernia Repair" },
            { value: "hip_replacement", label: "Total Hip Replacement" },
            { value: "knee_arthroscopy", label: "Knee Arthroscopy" },
            { value: "mastectomy", label: "Mastectomy" },
        ],
    },
    {
        title: "Required Investigations",
        showChanged: true,
        items: [
            { label: "Complete Blood Count (CBC)", status: "Completed", subLabel: "2025-09-27 19:30", urgency: "Stat", orderedBy: "Dr. Vinay" },
            { label: "Liver Function Test (LFT)", status: "Completed", subLabel: "2025-09-27 19:30", category: "Laboratory Test", urgency: "Stat", orderedBy: "Dr. Vinay" },
            {
                label: "Renal Function Test (RFT)",
                status: "Ordered",
                subLabel: "2025-09-27 19:30",
                category: "Radiology & Imaging",
                urgency: "Stat",
                orderedBy: "Dr. Sarah",
                previousResult: {
                    date: "05-Dec-2025",
                    count: 2
                }
            },
            { label: "Blood Sugar (Fasting)", status: "Pending", category: "Laboratory Test", urgency: "Stat" },
            { label: "Coagulation Profile (PT/INR)", status: "Pending", category: "Laboratory Test", urgency: "Stat" },
        ],
        addLabel: "Add Investigation",
        addOptions: [
            { value: "cbc", label: "Complete Blood Count (CBC)" },
            { value: "lft", label: "Liver Function Test (LFT)" },
            { value: "rft", label: "Renal Function Test (RFT)" },
            { value: "fasting_sugar", label: "Blood Sugar (Fasting)" },
            { value: "pt_inr", label: "Coagulation Profile (PT/INR)" },
        ],
    },
    {
        title: "Medical Clearances",
        items: [
            { label: "Anaesthesia Clearance", status: "Pending" },
            { label: "Physician Clearance", status: "Completed" },
            { label: "Cardiology Clearance", status: "Completed" },
        ],
        addLabel: "Add Clearance",
        addOptions: [
            { value: "anaesthesia", label: "Anaesthesia Clearance" },
            { value: "physician", label: "Physician Clearance" },
            { value: "cardiology", label: "Cardiology Clearance" },
            { value: "pulmonology", label: "Pulmonology Clearance" },
            { value: "nephrology", label: "Nephrology Clearance" },
        ],
    },
    {
        title: "Consents Required",
        items: [
            { label: "Surgical Consent", status: "Completed", subLabel: "Signed by patient & surgeon" },
            { label: "Anaesthesia Consent", status: "Pending" },
            { label: "Blood Transfusion Consent", status: "Pending" },
        ],
        addLabel: "Add Consent",
        addOptions: [
            { value: "surgical_consent", label: "Surgical Consent" },
            { value: "anaesthesia_consent", label: "Anaesthesia Consent" },
            { value: "blood_consent", label: "Blood Transfusion Consent" },
            { value: "high_risk_consent", label: "High Risk Consent" },
        ],
    },
    {
        title: "Nursing Orders (Pre-Op)",
        items: [
            { label: "NPO Status Check", status: "Completed", subLabel: "Confirmed NPO since 10 PM" },
            { label: "Pre-medication Administered", status: "Ordered", subLabel: "Midazolam ordered" },
            { label: "Vitals Recorded", status: "Pending" },
        ],
        addLabel: "Add Nursing Order",
        addOptions: [
            { value: "npo_check", label: "NPO Status Check" },
            { value: "pre_med", label: "Pre-medication Administered" },
            { value: "vitals", label: "Vitals Recorded" },
            { value: "voiding", label: "Voiding/Catheterization" },
            { value: "gown_change", label: "Gown Change Confirmed" },
        ],
    },
    {
        title: "Patient Preparation Requirements",
        items: [
            { label: "Site Marking", status: "Completed", subLabel: "Marked by Dr. Vinay" },
            { label: "Skin Preparation", status: "Pending" },
            { label: "Jewelry/Dentures Removed", status: "Pending" },
        ],
        addLabel: "Add Prep Requirement",
        addOptions: [
            { value: "site_marking", label: "Site Marking" },
            { value: "skin_prep", label: "Skin Preparation" },
            { value: "jewelry_removal", label: "Jewelry/Dentures Removed" },
            { value: "nail_polish", label: "Nail Polish Removal" },
            { value: "ted_stockings", label: "TED Stockings Applied" },
        ],
    },
    {
        title: "Anaesthesia Requirements",
        items: [
            { label: "GA Machine Check", status: "Pending" },
            { label: "Spinal Tray", status: "Ordered", subLabel: "Requested from CSSD" },
            { label: "Difficult Airway Cart", status: "N/A" },
        ],
        addLabel: "Add Anaesthesia Req",
        addOptions: [
            // Anaesthesia Type
            { value: "ga", label: "General Anaesthesia (GA)", group: "Anaesthesia Type" },
            { value: "regional", label: "Regional Anaesthesia", group: "Anaesthesia Type" },
            { value: "spinal", label: "Spinal Anaesthesia", group: "Anaesthesia Type" },
            { value: "epidural", label: "Epidural Anaesthesia", group: "Anaesthesia Type" },
            { value: "cse", label: "Combined Spinal–Epidural (CSE)", group: "Anaesthesia Type" },
            { value: "local", label: "Local Anaesthesia", group: "Anaesthesia Type" },
            { value: "local_sedation", label: "Local Anaesthesia with Sedation", group: "Anaesthesia Type" },
            { value: "mac", label: "Monitored Anaesthesia Care (MAC)", group: "Anaesthesia Type" },
            { value: "tiva", label: "Total Intravenous Anaesthesia (TIVA)", group: "Anaesthesia Type" },

            // Airway Management
            { value: "ett", label: "Endotracheal Intubation", group: "Airway Management" },
            { value: "lma", label: "Laryngeal Mask Airway (LMA)", group: "Airway Management" },
            { value: "mask_vent", label: "Mask Ventilation", group: "Airway Management" },
            { value: "nasal_intubation", label: "Nasal Intubation", group: "Airway Management" },
            { value: "video_laryngo", label: "Video Laryngoscopy Required", group: "Airway Management" },
            { value: "difficult_airway", label: "Anticipated Difficult Airway", group: "Airway Management" },
            { value: "awake_fiberoptic", label: "Awake Fiberoptic Intubation (if required)", group: "Airway Management" },

            // Monitoring Requirements
            { value: "asa_standard", label: "Standard ASA Monitoring", group: "Monitoring Requirements" },
            { value: "ibp", label: "Invasive Blood Pressure Monitoring", group: "Monitoring Requirements" },
            { value: "cvp", label: "Central Venous Line Required", group: "Monitoring Requirements" },
            { value: "art_line", label: "Arterial Line Required", group: "Monitoring Requirements" },
            { value: "bis", label: "BIS Monitoring", group: "Monitoring Requirements" },
            { value: "capno", label: "Capnography", group: "Monitoring Requirements" },
            { value: "temp_monitor", label: "Temperature Monitoring", group: "Monitoring Requirements" },

            // Vascular Access
            { value: "periph_iv", label: "Peripheral IV Line", group: "Vascular Access" },
            { value: "two_large_iv", label: "Two Large Bore IV Lines", group: "Vascular Access" },
            { value: "cvc_access", label: "Central Venous Access", group: "Vascular Access" },
            { value: "picc", label: "PICC Line", group: "Vascular Access" },
            { value: "diff_iv_usg", label: "Difficult IV Access – Ultrasound Guided", group: "Vascular Access" },

            // Special Anaesthesia Considerations
            { value: "high_risk", label: "High-Risk Anaesthesia Case", group: "Special Anaesthesia Considerations" },
            { value: "cardiac_risk", label: "Cardiac Risk Monitoring", group: "Special Anaesthesia Considerations" },
            { value: "pulm_risk", label: "Pulmonary Risk Precautions", group: "Special Anaesthesia Considerations" },
            { value: "renal_risk", label: "Renal Risk Considerations", group: "Special Anaesthesia Considerations" },
            { value: "elderly", label: "Elderly / Geriatric Anaesthesia", group: "Special Anaesthesia Considerations" },
            { value: "peds", label: "Pediatric Anaesthesia", group: "Special Anaesthesia Considerations" },
            { value: "obesity", label: "Obesity / OSA Precautions", group: "Special Anaesthesia Considerations" },

            // Blood & Fluid Related
            { value: "blood_prod", label: "Blood Products Anticipated", group: "Blood & Fluid Related" },
            { value: "massive_transfusion", label: "Massive Transfusion Protocol On Standby", group: "Blood & Fluid Related" },
            { value: "fluid_restrict", label: "Fluid Restriction Required", group: "Blood & Fluid Related" },
            { value: "goal_fluid", label: "Goal-Directed Fluid Therapy", group: "Blood & Fluid Related" },

            // Post-Anaesthesia Plan
            { value: "post_vent", label: "Planned Post-Op Ventilation", group: "Post-Anaesthesia Plan" },
            { value: "extubate_ot", label: "Extubation in OT", group: "Post-Anaesthesia Plan" },
            { value: "extubate_icu", label: "Extubation in ICU", group: "Post-Anaesthesia Plan" },
            { value: "pacu", label: "PACU Observation Required", group: "Post-Anaesthesia Plan" },
            { value: "icu_transfer", label: "ICU Transfer Post Surgery", group: "Post-Anaesthesia Plan" },
            { value: "hdu_transfer", label: "HDU / Step-down Transfer", group: "Post-Anaesthesia Plan" },
        ],
    },
    {
        title: "Equipment & Instruments",
        items: [
            { label: "Laparoscopic Tower", subLabel: "Reserved for OR 2", status: "Ordered" },
            { label: "Laparoscopic Cholecystectomy Set", status: "Pending" },
            { label: "Cautery Logic (Diathermy)", status: "Pending" },
        ],
        addLabel: "Add Equipment",
        addOptions: [
            { value: "lap_tower", label: "Laparoscopic Tower" },
            { value: "c_arm", label: "C-Arm Image Intensifier" },
            { value: "microscope", label: "Operating Microscope" },
            { value: "harmonic", label: "Harmonic Scalpel" },
            { value: "cautery", label: "Cautery Logic (Diathermy)" },
        ],
    },
    {
        title: "Implants & Consumables",
        items: [
            { label: "Prolene Mesh (15x15)", status: "Ordered", subLabel: "Size verification needed" },
            { label: "Tacker (Absorbable)", status: "Pending" },
            { label: "Trocars (10mm, 5mm)", status: "Pending" },
        ],
        addLabel: "Add Implant/Consumable",
        addOptions: [
            { value: "mesh", label: "Prolene Mesh" },
            { value: "tacker", label: "Tacker (Fixation Device)" },
            { value: "trocars", label: "Trocars" },
            { value: "stapler", label: "Linear Cutter Stapler" },
            { value: "sutures", label: "Sutures (Vicryl/Prolene)" },
        ],
    },
    {
        title: "Blood & Resource Preparation",
        items: [
            { label: "Blood Grouping & Cross Matching", status: "Completed", subLabel: "O+ Confirmed" },
            { label: "Reserve 2 Units PRBC", status: "Ordered", subLabel: "Sent to Blood Bank" },
        ],
        addLabel: "Add Blood/Resource",
        addOptions: [
            { value: "grouping", label: "Blood Grouping & Cross Matching" },
            { value: "prbc", label: "Reserve PRBC (Packed Red Blood Cells)" },
            { value: "ffp", label: "Reserve FFP (Fresh Frozen Plasma)" },
            { value: "platelets", label: "Reserve Platelets" },
            { value: "icu_bed", label: "Post-Op ICU Bed Reservation" },
        ],
    },
];


const STATUS_STYLES: Record<ItemStatus, string> = {
    Completed: "bg-green-500 text-white",
    Ordered: "bg-orange-500 text-white",
    Pending: "bg-slate-300 text-slate-700",
    Processing: "bg-blue-500 text-white",
    Due: "bg-red-500 text-white",
    "N/A": "bg-slate-200 text-slate-500",
};

const newItemUrgencyStyle = (urgency: string) => {
    switch (urgency.toLowerCase()) {
        case "stat": return "bg-red-100 text-red-500 border-red-200";
        case "urgent": return "bg-orange-100 text-orange-500 border-orange-200";
        case "routine": return "bg-blue-100 text-blue-500 border-blue-200";
        default: return "bg-slate-100 text-slate-500 border-slate-200";
    }
};


type SectionCardProps = {
    config: SectionConfig;
    onAddItem: (item: ChecklistItem) => void;
    onOrderLab?: (test: string) => void;
    onOrderRad?: (test: string) => void;
    onOrderNurse?: (order: string) => void;
    onOrderImplant?: (implant: string) => void;
    onOrderBlood?: (blood: string) => void;
};

const SectionCard = ({ config, onAddItem, onOrderLab, onOrderRad, onOrderNurse, onOrderImplant, onOrderBlood }: SectionCardProps) => {
    const { title, items, addLabel, addOptions } = config;
    const [selectedValue, setSelectedValue] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");

    const validateSelection = (): boolean => {
        if (!selectedValue) {
            setError(`${addLabel.replace("Add ", "")} is required`);
            return false;
        }
        return true;
    };

    return (
        <Card className="shadow-none border-0 mb-4 bg-white">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-medium text-slate-800">
                        {title}
                    </CardTitle>

                    {items.length > 0 && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                            {items.filter(i => i.status === "Completed" || i.status === "Ordered").length}/{items.length} Completed
                        </span>
                    )}
                </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
                {/* Existing items */}
                {items.map((item) => (
                    <div
                        key={item.label}
                        className={`rounded-lg p-4 border ${item.status === "Completed"
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
                                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${STATUS_STYLES[item.status]}`}
                                >
                                    {item.status}
                                </span>
                                {title !== "Required Investigations" ? (
                                    <button className="p-2 bg-red-100 text-red-400 rounded-sm transition-colors hover:bg-red-200">
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
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between text-red-600 focus:text-red-600">
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
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between text-red-600 focus:text-red-600">
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
                            <Select value={selectedValue} onValueChange={(val) => {
                                setSelectedValue(val);
                                setError("");
                            }}>
                                <SelectTrigger className={`h-10 w-full ${error ? "border-red-500" : ""}`}>
                                    <SelectValue placeholder={`Select ${addLabel.replace("Add ", "")}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* Check if options have groups */}
                                    {addOptions.some(opt => opt.group) ? (
                                        Array.from(new Set(addOptions.map(opt => opt.group).filter(Boolean))).map((group) => (
                                            <SelectGroup key={group}>
                                                <SelectLabel className="text-xs font-bold text-slate-500 px-2 py-1.5 uppercase tracking-wider bg-slate-50">
                                                    {group}
                                                </SelectLabel>
                                                {addOptions
                                                    .filter(opt => opt.group === group)
                                                    .map(opt => (
                                                        <SelectItem key={opt.value} value={opt.value} className="pl-6">
                                                            {opt.label}
                                                        </SelectItem>
                                                    ))}
                                            </SelectGroup>
                                        ))
                                    ) : (
                                        addOptions.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
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
                                                const label = addOptions.find(o => o.value === selectedValue)?.label || selectedValue;
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
                                                const label = addOptions.find(o => o.value === selectedValue)?.label || selectedValue;
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
                                    const label = addOptions.find(o => o.value === selectedValue)?.label || selectedValue;
                                    onAddItem({
                                        label,
                                        status: "Ordered",
                                        subLabel: "Just added",
                                        category: "Laboratory Tests"
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

type PreOpEditModeProps = {
    onSaveDraft?: () => void;
};

export const PreOpEditMode = ({ onSaveDraft }: PreOpEditModeProps) => {
    const [sections, setSections] = React.useState<SectionConfig[]>(SECTIONS);
    const [isLabModalOpen, setIsLabModalOpen] = React.useState(false);
    const [selectedLabTest, setSelectedLabTest] = React.useState("");
    const [isRadModalOpen, setIsRadModalOpen] = React.useState(false);
    const [selectedRadTest, setSelectedRadTest] = React.useState("");
    const [isNurseModalOpen, setIsNurseModalOpen] = React.useState(false);
    const [selectedNurseOrder, setSelectedNurseOrder] = React.useState("");
    const [isImplantsModalOpen, setIsImplantsModalOpen] = React.useState(false);
    const [selectedImplant, setSelectedImplant] = React.useState("");
    const [isBloodModalOpen, setIsBloodModalOpen] = React.useState(false);
    const [selectedBlood, setSelectedBlood] = React.useState("");

    const handleAddItem = (sectionTitle: string, newItem: ChecklistItem) => {
        setSections(prev => prev.map(section => {
            if (section.title === sectionTitle) {
                return { ...section, items: [...section.items, newItem] };
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
            urgency: data.urgency
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
                            <Select>
                                <SelectTrigger className="h-10 w-full">
                                    <SelectValue placeholder="Select Surgery Template" />
                                </SelectTrigger>
                                <SelectContent>
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
                    onOrderLab={section.title === "Required Investigations" ? handleOrderLab : undefined}
                    onOrderRad={section.title === "Required Investigations" ? handleOrderRad : undefined}
                    onOrderNurse={section.title === "Patient Preparation Requirements" ? handleOrderNurse : undefined}
                    onOrderImplant={section.title === "Implants & Consumables" ? handleOrderImplant : undefined}
                    onOrderBlood={section.title === "Blood & Resource Preparation" ? handleOrderBlood : undefined}
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

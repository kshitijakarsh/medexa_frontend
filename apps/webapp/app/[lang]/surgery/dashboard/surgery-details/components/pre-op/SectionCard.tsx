import React from "react";
import { Trash2, MoreVertical, FileSearch, SquareCheckBig, Stethoscope, Eye, Pencil, FilePlus, Check, ChevronsUpDown } from "lucide-react";
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
    SelectItem,
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
import { useDictionary } from "@/i18n/use-dictionary";
import {
    SectionConfig,
    ChecklistItem,
    AddOption,
    STATUS_STYLES,
    newItemUrgencyStyle
} from "./PreOpChecklist";

const sectionTypeMapping: Record<string, string> = {
    "Consents Required": "Consent Form",
    "Nursing Orders (Pre-Op)": "Nursing Order",
    "Anaesthesia Requirements": "Anaesthesia Req",
    "Equipment & Instruments": "Equipment",
};

export type SectionCardProps = {
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

export const SectionCard = ({ config, onAddItem, onOrderLab, onOrderRad, onOrderNurse, onOrderImplant, onOrderBlood, onOrderClearance, onRemoveItem }: SectionCardProps) => {

    const { title, items, addLabel, addOptions } = config;
    const [selectedValue, setSelectedValue] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const [openPopover, setOpenPopover] = React.useState(false);
    const dict = useDictionary();
    const preOp = dict.pages.surgery.surgeryDetails.preOp;

    const validateSelection = (): boolean => {
        if (!selectedValue) {
            setError(`${addLabel.replace(dict.common.add + " ", "")} ${preOp.fields.required}`);
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
                            {items.filter((i: ChecklistItem) => i.status === "Completed" || i.status === "Ordered").length}/{items.length} {dict.common.completed}
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
                                    {config.id !== "clearances" && (item.category || config.id === "investigations") && (
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                                            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                                                {item.category || (config.id === "investigations" ? "Lab Test" : "Requirement")}
                                            </span>
                                        </div>
                                    )}
                                    {config.id === "investigations" && (
                                        <div className={cn(
                                            "flex items-center gap-1.5 px-2 py-0.5 rounded-md border",
                                            newItemUrgencyStyle(item.urgency || "routine")
                                        )}>
                                            <span className="text-[10px] font-medium uppercase tracking-wider">
                                                {item.urgency || "Routine"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                                    {config.id === "investigations" && (
                                        <>
                                            <span>Biochemistry</span>
                                            <span>|</span>
                                        </>
                                    )}
                                    <span>{item.subLabel || "2025-09-27 19:30"}</span>
                                    {item.status === "Completed" && (
                                        <span className="flex items-center gap-1 text-green-600 px-2 py-0.5">
                                            <SquareCheckBig size={12} />
                                            {preOp.status.completedPrev}
                                        </span>
                                    )}
                                </div>
                                {(item.status === "Completed" || item.status === "Ordered") && item.orderedBy && config.id === "investigations" && (
                                    <p className="text-xs text-blue-500 mt-2 flex items-center gap-1 font-medium">
                                        <Stethoscope size={14} /> {dict.table.orderedBy} {item.orderedBy}
                                    </p>
                                )}
                            </div>

                            {/* Right side: Status + Action */}
                            <div className="flex items-center gap-2">
                                <span
                                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${item.status ? STATUS_STYLES[item.status] : "bg-slate-200 text-slate-500"}`}
                                >
                                    {item.status === "Completed" ? dict.common.completed :
                                        item.status === "Ordered" ? dict.common.ordered :
                                            item.status === "Pending" ? dict.common.pending :
                                                item.status || dict.common.pending}
                                </span>
                                {config.id !== "investigations" ? (
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
                                                {dict.table.action}
                                                <MoreVertical size={14} className="text-green-500" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {item.status === "Completed" ? (
                                                <>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        {preOp.actions.createNewOrder} <FilePlus size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        {dict.common.view} <Eye size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => onRemoveItem(index)}
                                                        className="gap-2 cursor-pointer justify-between text-red-600 focus:text-red-600"
                                                    >
                                                        {dict.common.delete} <Trash2 size={14} />
                                                    </DropdownMenuItem>
                                                </>
                                            ) : (
                                                <>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        {dict.common.view} <Eye size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        {dict.common.edit} <Pencil size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => onRemoveItem(index)}
                                                        className="gap-2 cursor-pointer justify-between text-red-600 focus:text-red-600"
                                                    >
                                                        {dict.common.delete} <Trash2 size={14} />
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        </div>

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
                                    {preOp.status.prevAvailable}: {item.previousResult.date} ({item.previousResult.count} {preOp.status.results})
                                </p>
                                <Button
                                    size="sm"
                                    className="h-7 text-xs bg-blue-500 hover:bg-blue-600 text-white gap-1.5 rounded-full px-3"
                                >
                                    {preOp.status.usePrev}
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
                            {config.id === "consents" ? (
                                <Popover open={openPopover} onOpenChange={setOpenPopover}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openPopover}
                                            className={cn("h-10 w-full justify-between bg-white text-xs font-normal", error && "border-red-500")}
                                        >
                                            {selectedValue
                                                ? addOptions.find((opt: AddOption) => opt.value === selectedValue)?.label
                                                : `${preOp.fields.select} ${addLabel.replace(dict.common.add + " ", "")}`}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                        <Command>
                                            <CommandInput placeholder={`${preOp.fields.search} ${addLabel.replace(dict.common.add + " ", "")}...`} className="h-9 text-xs" />
                                            <CommandList>
                                                <CommandEmpty className="text-xs">{preOp.fields.noForms}</CommandEmpty>
                                                <CommandGroup>
                                                    {addOptions.map((opt: AddOption) => (
                                                        <CommandItem
                                                            key={opt.value}
                                                            value={opt.label}
                                                            onSelect={(currentValue) => {
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
                                        <SelectValue placeholder={`${preOp.fields.select} ${addLabel.replace(dict.common.add + " ", "")}`} />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[300px]">

                                        {addOptions.map((opt: AddOption) => (
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
                        {config.id === "investigations" ? (
                            <div className="flex gap-2">
                                <NewButton handleClick={() => {
                                    if (validateSelection()) {
                                        onOrderLab?.(selectedValue);
                                        setSelectedValue("");
                                    }
                                }} name="Lab" />
                                <NewButton handleClick={() => {
                                    if (validateSelection()) {
                                        onOrderRad?.(selectedValue);
                                        setSelectedValue("");
                                    }
                                }} name="Rad" />
                            </div>
                        ) : config.id === "prep" ? (
                            <NewButton handleClick={() => {
                                if (validateSelection()) {
                                    if (onOrderNurse) {
                                        onOrderNurse(selectedValue);
                                    }
                                    setSelectedValue("");
                                }
                            }} name={dict.common.add} />
                        ) : config.id === "implants" ? (
                            <NewButton handleClick={() => {
                                if (validateSelection()) {
                                    if (onOrderImplant) {
                                        onOrderImplant(selectedValue);
                                    }
                                    setSelectedValue("");
                                }
                            }} name={dict.common.add} />
                        ) : config.id === "clearances" ? (
                            <NewButton handleClick={() => {
                                if (validateSelection()) {
                                    if (onOrderClearance) {
                                        onOrderClearance(selectedValue);
                                    }
                                    setSelectedValue("");
                                }
                            }} name={dict.common.add} />
                        ) : config.id === "blood" ? (
                            <NewButton handleClick={() => {
                                if (validateSelection()) {
                                    if (onOrderBlood) {
                                        onOrderBlood(selectedValue);
                                    }
                                    setSelectedValue("");
                                }
                            }} name={dict.common.add} />
                        ) : (
                            <NewButton handleClick={() => {
                                if (validateSelection()) {
                                    const label = addOptions.find((o: AddOption) => o.value === selectedValue)?.label || selectedValue;
                                    onAddItem({
                                        label,
                                        status: "Ordered",
                                        subLabel: dict.common.justNow,
                                        category: sectionTypeMapping[config.id] || "Requirement"
                                    });
                                    setSelectedValue("");
                                }
                            }} name={dict.common.add} />
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

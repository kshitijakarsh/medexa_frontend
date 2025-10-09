// components/onboard-hospital/sections/ModulesAssignmentSection.tsx

"use client";

import { useState } from "react";
import { FormField, FormItem, FormMessage } from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@workspace/ui/components/popover";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandEmpty,
    CommandInput,
} from "@workspace/ui/components/command";
import { Badge } from "@workspace/ui/components/badge";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { FormSection } from "../ui/FormSection";

const MODULE_OPTIONS = [
    { id: "ipd", label: "IPD" },
    { id: "opd", label: "OPD" },
    { id: "ot", label: "OT" },
    { id: "pharmacy", label: "Pharmacy" },
    { id: "lab", label: "Lab" },
    { id: "billing", label: "Billing" },
];

export function ModuleAssignmentSection({ form }: { form: any }) {
    const [open, setOpen] = useState(false);
    const modules = form.watch("modules") || [];

    const toggleModule = (id: string) => {
        const current = form.getValues("modules") || [];
        if (current.includes(id)) {
            form.setValue(
                "modules",
                current.filter((m: string) => m !== id)
            );
        } else {
            form.setValue("modules", [...current, id]);
        }
    };

    return (
        <FormSection title="Modules Assignment">
            <FormField
                control={form.control}
                name="modules"
                render={() => (
                    <FormItem className="space-y-3">
                        {/* Dropdown */}
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className="w-full justify-between bg-white"
                                >
                                    {modules.length > 0
                                        ? `${modules.length} selected`
                                        : "Select Modules"}
                                    <ChevronsUpDown className="opacity-50 h-4 w-4 shrink-0" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[280px] p-0">
                                <Command className="bg-white">
                                    <CommandInput placeholder="Search modules..." />
                                    <CommandList>
                                        <CommandEmpty>No modules found.</CommandEmpty>
                                        <CommandGroup>
                                            {MODULE_OPTIONS.map((m) => {
                                                const selected = modules.includes(m.id);
                                                return (
                                                    <CommandItem
                                                        key={m.id}
                                                        onSelect={() => toggleModule(m.id)}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                selected ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {m.label}
                                                    </CommandItem>
                                                );
                                            })}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {/* Selected modules as badges */}
                        <div className="flex flex-wrap gap-2">
                            {modules.map((id: string) => {
                                const mod = MODULE_OPTIONS.find((m) => m.id === id);
                                return (
                                    <Badge
                                        key={id}
                                        className="gap-2 px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-slate-100 text-slate-700 "
                                    >
                                        {mod?.label}
                                        <X
                                            size={14}
                                            className="cursor-pointer hover:text-red-500"
                                            onClick={() => toggleModule(id)}
                                        />
                                    </Badge>
                                );
                            })}
                        </div>

                        <FormMessage />
                    </FormItem>
                )}
            />
        </FormSection>
    );
}

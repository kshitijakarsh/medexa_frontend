"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@/components/ui/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import AppDatePicker from "@/components/common/app-date-picker";

export type FieldType =
    | "text"
    | "number"
    | "select"
    | "textarea"
    | "date"
    | "time"
    | "checkbox"
    | "group";

export interface FieldConfig {
    id: string;
    type: FieldType;
    label?: string;
    placeholder?: string;
    options?: string[];
    required?: boolean;
    rows?: number;
    defaultValue?: any;
    subFields?: FieldConfig[];
    gridCols?: number;
    className?: string; // Custom styling for the field wrapper
}

export interface SectionConfig {
    id: string;
    title: string;
    fields: FieldConfig[];
    gridCols?: number;
    headerFields?: FieldConfig[]; // Fields to render in the card header
    showMarkCompleted?: boolean;
}

interface DynamicSectionProps {
    config: SectionConfig;
}

const GRID_COLS: Record<number, string> = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
};

const DynamicField = ({ field, isEditing = false }: { field: FieldConfig; isEditing?: boolean }) => {
    const [value, setValue] = useState(field.defaultValue);
    const [isChecked, setIsChecked] = useState(field.defaultValue === true);

    if (!isEditing) {
        // Read-only view
        if (field.type === "group" && field.subFields) {
            const gridClass = GRID_COLS[field.gridCols ?? 1] ?? "grid-cols-1";
            return (
                <div className={`p-3 rounded-lg ${field.className ?? ""}`}>
                    <div className={`grid gap-4 ${gridClass}`}>
                        {field.subFields.map((sub) => (
                            <DynamicField key={sub.id} field={sub} isEditing={isEditing} />
                        ))}
                    </div>
                </div>
            );
        }

        if (field.type === "checkbox") {
            return (
                <div className={`flex items-center space-x-2 p-2 ${field.className ?? ""}`}>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                        {isChecked && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{field.label}</span>
                    {isChecked && field.subFields && (
                        <div className="ml-6 space-y-2 mt-2">
                            {field.subFields.map((subField) => (
                                <DynamicField key={subField.id} field={subField} isEditing={isEditing} />
                            ))}
                        </div>
                    )}
                </div>
            )
        }

        return (
            <div className={`flex flex-col gap-1 w-full ${field.className ?? ""}`}>
                {field.label && (
                    <Label className="text-xs font-medium text-slate-500">
                        {field.label}
                    </Label>
                )}
                <div className="text-sm text-slate-800 min-h-[20px]">
                    {value || field.defaultValue || "-"}
                </div>
            </div>
        );
    }

    // Editable view (existing code)
    if (field.type === "checkbox") {
        return (
            <div className={`space-y-3 ${field.className ?? ""}`}>
                <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-md">
                    <Checkbox
                        id={field.id}
                        checked={isChecked}
                        onCheckedChange={(c) => setIsChecked(!!c)}
                        className="border-slate-300 data-[state=checked]:bg-blue-600"
                    />
                    <Label
                        htmlFor={field.id}
                        className="text-sm font-medium leading-none text-slate-700"
                    >
                        {field.label}
                    </Label>
                </div>

                {isChecked && field.subFields && (
                    <div className="ml-6 space-y-3">
                        {field.subFields.map((subField) => (
                            <DynamicField key={subField.id} field={subField} isEditing={true} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    if (field.type === "group") {
        const gridClass = GRID_COLS[field.gridCols ?? 1] ?? "grid-cols-1";

        return (
            <div
                className={`p-3 rounded-lg ${field.className ?? ""
                    }`}
            >
                <div className={`grid gap-4 ${gridClass}`}>
                    {field.subFields?.map((sub) => (
                        <DynamicField key={sub.id} field={sub} isEditing={true} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col gap-1.5 w-full ${field.className ?? ""}`}>
            {field.label && (
                <Label className="text-sm">
                    {field.label}
                    {field.required && <span className="text-red-500"> *</span>}
                </Label>
            )}

            {(field.type === "text" || field.type === "number" || field.type === "time") && (
                <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2
                     focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0
                     focus:border-transparent placeholder:text-slate-400"
                />
            )}

            {field.type === "textarea" && (
                <Textarea
                    placeholder={field.placeholder}
                    rows={field.rows || 3}
                    className={`w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2
                      focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0
                      focus:border-transparent placeholder:text-slate-400 resize-none
                      ${field.rows === 1 ? "min-h-[40px]" : "min-h-[80px]"}`}
                />
            )}

            {field.type === "select" && (
                <Select>
                    <SelectTrigger className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {field.options?.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                                {opt}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            {field.type === "date" && (
                <AppDatePicker value={value} onChange={setValue} />
            )}
        </div>
    );
};

interface DynamicSectionProps {
    config: SectionConfig;
    isEditing?: boolean;
}

// ... existing code ...

export const ConfigurableFormSection: React.FC<DynamicSectionProps> = ({ config, isEditing = false }) => {
    const gridClass = GRID_COLS[config.gridCols ?? 0];

    return (
        <Card className="shadow-soft">
            <CardHeader className={config.headerFields ? "flex flex-row items-center justify-between space-y-0 pb-2" : ""}>
                <CardTitle className="text-base px-4">
                    {config.title}
                </CardTitle>

                {config.headerFields && (
                    <div className="flex items-center gap-2 pr-4">
                        {config.headerFields.map(field => (
                            <div key={field.id} className="w-[150px]">
                                <DynamicField field={field} isEditing={isEditing} />
                            </div>
                        ))}
                    </div>
                )}

                {!config.headerFields && (config.title === "Surgery Timing" ||
                    config.title === "Procedure Details") && (
                        <div className="h-px w-full bg-blue-50 mt-2" />
                    )}
            </CardHeader>

            <CardContent
                className={
                    gridClass
                        ? `grid gap-2 space-y-0 ${gridClass}`
                        : "space-y-4"
                }
            >
                {config.fields.map((field) => (
                    <DynamicField key={field.id} field={field} isEditing={isEditing} />
                ))}

                {config.showMarkCompleted && isEditing && (
                    <div className={gridClass ? "col-span-full pt-2" : "pt-2"}>
                        <button className="px-4 py-1.5 border border-blue-500 text-blue-500 font-medium rounded-lg text-xs hover:bg-blue-50">
                            MARK AS COMPLETED
                        </button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ConfigurableFormSection;

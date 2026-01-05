"use client";

import { useState } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import NewButton from "@/components/common/new-button";
import { Trash2 } from "lucide-react";

export interface DynamicSectionProps {
    title: string;
    items: any[];
    onAddItem: (item: string) => void;
    onRemoveItem: (index: number) => void;
    placeholder?: string;
    renderItem?: (item: any, index: number, onRemove: () => void) => React.ReactNode;
    options?: string[];
}

export const DynamicSection = ({
    title,
    items,
    onAddItem,
    onRemoveItem,
    placeholder = "Select Item",
    renderItem,
    options = [],
    viewOnly = false,
}: DynamicSectionProps & { viewOnly?: boolean }) => {
    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        if (inputValue.trim()) {
            onAddItem(inputValue);
            setInputValue("");
        }
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-medium text-sm text-slate-800">{title}</h3>
                <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0 h-5"
                >
                    {items.length} Items
                </Badge>
            </div>

            {/* List */}
            <div className="p-4 space-y-3">
                {items.length > 0 && (
                    <div className="space-y-2">
                        {items.map((item, index) => (
                            renderItem ? renderItem(item, index, () => onRemoveItem(index)) : (
                                <div
                                    key={index}
                                    className="group flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white hover:border-slate-200 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-slate-700 font-medium">
                                            {typeof item === "string" ? item : item.name}
                                        </span>
                                        {typeof item !== "string" && item.badges && (
                                            <div className="flex gap-1">
                                                {item.badges.map((b: string, i: number) => (
                                                    <Badge key={i} variant="outline" className="text-[10px] text-slate-500 border-slate-200">{b}</Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {!viewOnly && (
                                        <button
                                            onClick={() => onRemoveItem(index)}
                                            className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                )}

                {!viewOnly && (
                    <div className="flex items-center gap-3 pt-2">
                        <div className="flex-1">
                            <Select value={inputValue} onValueChange={setInputValue}>
                                <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-slate-500">
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.length > 0 ? (
                                        options.map((opt) => (
                                            <SelectItem key={opt} value={opt}>
                                                {opt}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="none" disabled>
                                            No options available
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <NewButton handleClick={handleAdd} name="Add" />
                    </div>
                )}
            </div>
        </div>
    );
};

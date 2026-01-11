"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { cn } from "@workspace/ui/lib/utils";

interface Option {
    label: string;
    value: string;
}

interface SearchWithDropdownProps {
    options: Option[];
    selectedOption: Option;
    onOptionSelect: (option: Option) => void;
    searchValue: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
    className?: string; // For outer container
}

export default function SearchWithDropdown({
    options,
    selectedOption,
    onOptionSelect,
    searchValue,
    onSearchChange,
    placeholder = "Search",
    className,
}: SearchWithDropdownProps) {
    return (
        <div
            className={cn(
                "flex h-9 items-center overflow-hidden rounded-full bg-background transition focus-within:ring-2 focus-within:ring-blue-500/20",
                className
            )}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="flex h-full items-center gap-1 px-3 text-xs font-medium text-blue-500 hover:bg-slate-50 transition-colors outline-none"
                    >
                        <Search size={14} />
                        {selectedOption.label}
                        <ChevronDown size={12} className="text-gray-500" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {options.map((option) => (
                        <DropdownMenuItem
                            key={option.value}
                            onClick={() => onOptionSelect(option)}
                            className="cursor-pointer text-xs"
                        >
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <input
                type="text"
                placeholder={placeholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-48 px-3 text-sm text-gray-700 placeholder:text-gray-500 outline-none bg-transparent"
            />
        </div>
    );
}

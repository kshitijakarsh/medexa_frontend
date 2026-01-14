import React from "react";
import { ChevronDown, ArrowUpAZ, ArrowDownAZ } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { cn } from "@workspace/ui/lib/utils";
import { useDictionary } from "@/i18n/use-dictionary";

export type SortOrder = "nearest" | "farthest";

interface DateFilterProps {
    sortOrder: SortOrder;
    onSortChange: (order: SortOrder) => void;
    className?: string;
}

export default function DateFilter({
    sortOrder,
    onSortChange,
    className,
}: DateFilterProps) {
    const dict = useDictionary();
    const sortDict = dict.pages.surgery.common.sort;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors outline-none",
                        className
                    )}
                >
                    {sortOrder === "nearest" ? sortDict.nearestDate : sortDict.farthestDate}
                    <div className="flex flex-col">
                        <ChevronDown size={12} className="rotate-180 text-[#0086F8]" />
                        <ChevronDown size={12} className="text-[#0086F8]" />
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onSortChange("nearest")}>
                    <ArrowDownAZ className="mr-2 h-4 w-4" />
                    {sortDict.nearestDate}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortChange("farthest")}>
                    <ArrowUpAZ className="mr-2 h-4 w-4" />
                    {sortDict.farthestDate}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

"use client";

import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@workspace/ui/components/popover";
import { Calendar } from "@workspace/ui/components/calendar";
import { cn } from "@workspace/ui/lib/utils";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { format } from "@workspace/ui/hooks/use-date-fns";

interface DateRangeDropdownProps {
    icon?: React.ReactNode;
    label: string;
    value?: DateRange;
    onSelect?: (range: DateRange | undefined) => void;
}

export const DateRangeDropdown: React.FC<DateRangeDropdownProps> = ({
    icon,
    label,
    value,
    onSelect,
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-slate-600 transition-all hover:bg-slate-50 outline-none whitespace-nowrap">
                    <span className="text-slate-500">{icon || <CalendarIcon size={16} />}</span>
                    <span className={cn(value?.from && "text-slate-900 font-medium")}>
                        {value?.from ? (
                            value.to ? (
                                <>
                                    {format(value.from, "LLL dd, y")} - {format(value.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(value.from, "LLL dd, y")
                            )
                        ) : (
                            label
                        )}
                    </span>
                    <ChevronDown size={14} className="ml-2 text-slate-400" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-none shadow-lg" align="start">
                <Calendar
                    mode="range"
                    defaultMonth={value?.from}
                    selected={value}
                    onSelect={onSelect}
                    numberOfMonths={2}
                    className="rounded-lg border shadow-sm bg-white"
                />
            </PopoverContent>
        </Popover>
    );
};

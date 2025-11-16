"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@workspace/ui/components/popover";
import { Calendar } from "@workspace/ui/components/calendar";
import { format } from "@workspace/ui/hooks/use-date-fns";
interface AppDatePickerProps {
    label?: string;
    value?: Date | null;
    onChange?: (date: Date | null) => void;
    placeholder?: string;
    disabled?: boolean;

    /* Optional Conditions */
    minDate?: Date;
    maxDate?: Date;
    disableFuture?: boolean;
    disablePast?: boolean;

    className?: string;
    fullWidth?: boolean;
}

export function AppDatePicker({
    label,
    value,
    onChange,
    placeholder = "Select a date",
    disabled,
    minDate,
    maxDate,
    disableFuture,
    disablePast,
    className,
    fullWidth = true,
}: AppDatePickerProps) {
    const [open, setOpen] = React.useState(false);

    // Disable conditions
    const isDisabled = (date: Date) => {
        if (disablePast && date < new Date(new Date().setHours(0, 0, 0, 0))) {
            return true;
        }
        if (disableFuture && date > new Date(new Date().setHours(23, 59, 59, 999))) {
            return true;
        }
        if (minDate && date < minDate) {
            return true;
        }
        if (maxDate && date > maxDate) {
            return true;
        }
        return false;
    };

    return (
        <div className={cn("flex flex-col w-full", className)}>
            {label && <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            "w-full justify-between border-gray-300 hover:border-gray-400 text-left font-normal",
                            !value && "text-muted-foreground"
                        )}
                    >
                        {value ? format(value, "yyyy-MM-dd") : placeholder}
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    align="start"
                    // style={{ width: "var(--radix-popover-trigger-width)" }}
                    className="p-0 bg-white rounded-md shadow-md border border-gray-100 w-full"
                >

                    <Calendar
                        className="w-[250px]"
                        mode="single"
                        selected={value || undefined}
                        onSelect={(date) => {
                            onChange?.(date ?? null);
                            setOpen(false);
                        }}
                        disabled={isDisabled}
                        initialFocus
                    />

                    {/* Clear Button */}
                    {value && (
                        <div className="flex justify-end p-2 border-t bg-gray-50">
                            <Button
                                variant="ghost"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => onChange?.(null)}
                            >
                                Clear
                            </Button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default AppDatePicker;

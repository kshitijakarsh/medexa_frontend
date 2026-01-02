"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { Button } from "@workspace/ui/components/button";
import { Phone, X } from "lucide-react";

export function ContactPopover({ phoneNumber }: { phoneNumber: string }) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                    <Phone className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3" align="end">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900">{phoneNumber || "No Number"}</span>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(false);
                        }}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

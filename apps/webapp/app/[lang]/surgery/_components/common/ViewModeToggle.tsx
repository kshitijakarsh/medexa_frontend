"use client";

import React from "react";
import { LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

type ViewMode = "grid" | "list";

interface ViewModeToggleProps {
    mode: ViewMode;
    onModeChange: (mode: ViewMode) => void;
    className?: string;
}

export default function ViewModeToggle({
    mode,
    onModeChange,
    className,
}: ViewModeToggleProps) {
    return (
        <div
            className={cn(
                "flex shrink-0 items-center gap-1 bg-white rounded-full p-0.5 shadow-soft",
                className
            )}
        >
            <button
                onClick={() => onModeChange("grid")}
                className={cn(
                    "rounded-full p-1.5 transition-colors",
                    mode === "grid"
                        ? "bg-green-500 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                )}
            >
                <LayoutGrid size={18} />
            </button>

            <button
                onClick={() => onModeChange("list")}
                className={cn(
                    "rounded-full p-1.5 transition-colors",
                    mode === "list"
                        ? "bg-green-500 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                )}
            >
                <LayoutList size={18} />
            </button>
        </div>
    );
}

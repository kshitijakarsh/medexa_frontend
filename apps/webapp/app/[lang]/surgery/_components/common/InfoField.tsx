import React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface InfoFieldProps {
    label: string;
    value: string | React.ReactNode;
    variant?: "default" | "alert";
    className?: string;
    fullWidth?: boolean;
}

export const InfoField = ({
    label,
    value,
    variant = "default",
    className,
    fullWidth = false,
}: InfoFieldProps) => {
    return (
        <div
            className={cn(
                "p-4 rounded-xl",
                variant === "alert" ? "bg-red-100" : "bg-gray-50",
                fullWidth && "col-span-full",
                className
            )}
        >
            <label className="block text-xs tracking-tight">{label}</label>
            <div
                className={cn(
                    "text-sm font-medium",
                    variant === "alert" && "text-red-700"
                )}
            >
                {value}
            </div>
        </div>
    );
};

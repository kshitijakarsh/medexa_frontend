"use client";

import { Button } from "@workspace/ui/components/button";
import { ReactNode } from "react";

export function PrimaryButton({
    label = "Save",
    loadingName = "Saving...",
    onClick,
    loading = false,
    disabled = false,
    className = "",
    type = "button",
    icon
}: {
    label?: string;
    loadingName?: string;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
    icon?: ReactNode;

}) {
    return (
        <Button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            variant="default"
            className={`bg-green-600 hover:bg-green-700 text-white shadow-sm cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
        >
            {icon} {loading ? loadingName : label}
        </Button>
    );
}

"use client";

import { Button } from "@workspace/ui/components/button";

export function PrimaryButton({
    label = "Save",
    loadingName = "Saving...",
    onClick,
    loading = false,
    disabled = false,
    className = "",
    type = "button"
}: {
    label?: string;
    loadingName?: string;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";

}) {
    return (
        <Button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            variant="default" 
            className={`bg-green-600 hover:bg-green-700 text-white shadow-sm cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
        >
            {loading ? loadingName : label}
        </Button>
    );
}

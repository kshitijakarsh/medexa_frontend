"use client"

import { Switch } from "@workspace/ui/components/switch"
import { cn } from "@workspace/ui/lib/utils"

interface StatusToggleProps {
    isActive: boolean
    onToggle: (checked: boolean) => void
    label?: React.ReactNode
    variant?: "status" | "simple"
    className?: string
}

export const StatusToggle = ({
    isActive,
    onToggle,
    label,
    variant = "status",
    className,
}: StatusToggleProps) => {
    if (variant === "simple") {
        return (
            <div className={cn("flex items-center gap-3", className)}>
                {label && (
                    <span className="flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap">
                        {label}
                    </span>
                )}
                <button
                    role="switch"
                    aria-checked={isActive}
                    onClick={() => onToggle(!isActive)}
                    className={cn(
                        "relative h-5 w-10 rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/30",
                        isActive ? "bg-emerald-500" : "bg-gray-300"
                    )}
                >
                    <div
                        className={cn(
                            "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                            isActive ? "translate-x-5" : "translate-x-0"
                        )}
                    />
                </button>
            </div>
        )
    }

    // Default "status" variant
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="flex items-center gap-4 rounded-full bg-[#E0F7FA] px-6 h-10 w-fit">
                {label && <span className="text-sm font-medium text-slate-900">{label}</span>}
                <span className={cn(
                    "text-sm font-medium transition-colors",
                    !isActive ? "text-red-500" : "text-red-300/70"
                )}>
                    Inactive
                </span>

                <button
                    role="switch"
                    aria-checked={isActive}
                    onClick={() => onToggle(!isActive)}
                    className={cn(
                        "relative h-6 w-11 rounded-full transition-colors focus:outline-none",
                        isActive ? "bg-emerald-500" : "bg-slate-200"
                    )}
                >
                    <div
                        className={cn(
                            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                            isActive ? "translate-x-5 left-0.5" : "translate-x-0.5 left-0.5"
                        )}
                    />
                </button>

                <span className={cn(
                    "text-sm font-medium transition-colors",
                    isActive ? "text-emerald-500" : "text-emerald-300/70"
                )}>
                    Active
                </span>
            </div>
        </div>
    )
}

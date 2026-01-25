"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { CalendarDays, ChevronDown } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

export function DateRangeFilter() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentRange = searchParams.get("range") || "all"

    const handleRangeChange = (range: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("range", range)
        router.push(`${pathname}?${params.toString()}`)
    }

    const rangeLabels: Record<string, string> = {
        today: "Today",
        "7days": "7 Days",
        "30days": "Monthly",
        all: "All",
    }

    // Fallback if an unknown range is in URL (though logic defaults to 'all' effectively)
    const currentLabel = rangeLabels[currentRange] || "All"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <CalendarDays className="size-4 text-muted-foreground" />
                    <span>{currentLabel}</span>
                    <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleRangeChange("today")}>
                    Today
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRangeChange("7days")}>
                    7 Days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRangeChange("30days")}>
                    Monthly
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRangeChange("all")}>
                    All
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

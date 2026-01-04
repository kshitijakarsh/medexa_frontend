
import React from "react";
import { cn } from "@workspace/ui/lib/utils";

export function StatusLegend() {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 text-sm">
            <span className="font-bold text-gray-900">Status Legend :</span>
            <div className="flex gap-2">
                <LegendItem label="Occupied" color="bg-orange-100 text-orange-500 border-orange-200" />
                <LegendItem label="Vacant" color="bg-green-100 text-green-600 border-green-200" />
                <LegendItem label="Reserved" color="bg-blue-100 text-blue-500 border-blue-200" />
                <LegendItem label="Cleaning" color="bg-yellow-100 text-yellow-500 border-yellow-200" />
                <LegendItem label="Blocked" color="bg-gray-200 text-gray-500 border-gray-300" />
            </div>
        </div>
    );
}

function LegendItem({ label, color }: { label: string; color: string }) {
    return (
        <span className={cn("px-3 py-1 rounded-full border text-xs font-medium", color)}>
            {label}
        </span>
    );
}

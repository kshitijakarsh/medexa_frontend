
import React from "react";
import { BedData } from "./mock-data";
import {
    BedDouble,
    Stethoscope,
    Calendar,
    CheckSquare,
    AlertTriangle,
    StickyNote,
    UserCircle,
    Upload,
    MoreVertical
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";

interface BedCardProps {
    data: BedData;
}

export function BedCard({ data }: BedCardProps) {
    const { status } = data;

    // Define border and background colors based on status
    const cardStyles = {
        Occupied: "border-l-4 border-l-red-500 bg-red-50/30",
        Vacant: "border-l-4 border-l-green-500 bg-green-50/30",
        Reserved: "border-l-4 border-l-blue-500 bg-blue-50/30",
        Blocked: "border-l-4 border-l-gray-400 bg-gray-50/30",
        Cleaning: "border-l-4 border-l-yellow-500 bg-yellow-50/30",
    };

    const iconColors = {
        Occupied: "text-red-500",
        Vacant: "text-green-500",
        Reserved: "text-blue-500",
        Blocked: "text-gray-500",
        Cleaning: "text-yellow-500",
    };

    // Status-specific content rendering
    const renderContent = () => {
        switch (status) {
            case "Occupied":
                return (
                    <>
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <BedDouble className={cn("w-5 h-5", iconColors[status])} />
                                <span className={cn("font-semibold", iconColors[status])}>
                                    {data.bedNumber}
                                </span>
                            </div>
                            {data.isCritical && (
                                <span className="px-2 py-0.5 text-xs font-medium text-red-600 border border-red-200 bg-white rounded-full">
                                    Critical
                                </span>
                            )}
                        </div>

                        <div className="space-y-1 mb-3">
                            <h3 className="font-bold text-gray-900 text-sm">{data.patientName}</h3>
                            <p className="text-xs text-gray-500">{data.mrn}</p>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                <Stethoscope className="w-3.5 h-3.5 text-blue-500" />
                                <span>{data.doctorName}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                                    <span>{data.admissionDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CheckSquare className="w-3.5 h-3.5 text-blue-400" />
                                    <span>{data.expectedDischargeDate}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex gap-2">
                                <ActionButton icon={<AlertTriangle className="w-4 h-4 text-red-500" />} bg="bg-red-100" />
                                <ActionButton icon={<StickyNote className="w-4 h-4 text-purple-500" />} bg="bg-purple-100" />
                                <ActionButton icon={<UserCircle className="w-4 h-4 text-green-500" />} bg="bg-green-100" />
                                <ActionButton icon={<Upload className="w-4 h-4 text-orange-500" />} bg="bg-orange-100" />
                            </div>
                            <button className="p-1 hover:bg-gray-100 rounded bg-blue-100 text-blue-500">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                );

            case "Vacant":
                return (
                    <>
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <BedDouble className={cn("w-5 h-5", iconColors[status])} />
                                <span className={cn("font-semibold", iconColors[status])}>
                                    {data.bedNumber}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-start">
                            <h3 className="font-bold text-gray-900 text-sm mb-1">Vacant</h3>
                            <p className="text-xs text-gray-500">Bed is Vacant</p>
                        </div>

                        <div className="flex items-center justify-end mt-auto">
                            <button className="hidden p-1 hover:bg-gray-100 rounded text-green-600 bg-green-100">
                                {/* Placeholder to match height if needed, or simply empty */}
                                <MoreVertical className="w-4 h-4" />
                            </button>
                            {/* Design shows a green 3-dot menu or similar on the right bottom? Actually it shows a green square with dots. */}
                            <button className="p-1 hover:bg-green-200 rounded bg-green-100 text-green-600">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                );

            case "Reserved":
                return (
                    <>
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <BedDouble className={cn("w-5 h-5", iconColors[status])} />
                                <span className={cn("font-semibold", iconColors[status])}>
                                    {data.bedNumber}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-start">
                            <h3 className="font-bold text-gray-900 text-sm mb-1">Reserved</h3>
                            <p className="text-xs text-gray-500">Bed is Reserved</p>
                        </div>

                        <div className="flex items-center justify-end mt-auto">
                            <button className="p-1 hover:bg-blue-200 rounded bg-blue-100 text-blue-500">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                );

            case "Blocked":
                return (
                    <>
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <BedDouble className={cn("w-5 h-5", iconColors[status])} />
                                <span className={cn("font-semibold", "#9ca3af" /* gray-400 */)}>
                                    {data.bedNumber}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-start">
                            <h3 className="font-bold text-gray-900 text-sm mb-1">Blocked</h3>
                            <p className="text-xs text-gray-500">{data.reason}</p>
                        </div>

                        <div className="flex items-center justify-end mt-auto">
                            <button className="p-1 hover:bg-gray-200 rounded bg-gray-200 text-gray-500">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className={cn("rounded-lg p-3 w-full h-full min-h-[160px] flex flex-col bg-white shadow-sm border border-gray-100", cardStyles[status])}>
            {renderContent()}
        </div>
    );
}

function ActionButton({ icon, bg }: { icon: React.ReactNode; bg: string }) {
    return (
        <button className={cn("p-1.5 rounded flex items-center justify-center transition-colors hover:opacity-80", bg)}>
            {icon}
        </button>
    );
}

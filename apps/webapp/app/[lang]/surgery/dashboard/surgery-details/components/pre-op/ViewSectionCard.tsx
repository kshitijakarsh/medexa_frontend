import React from "react";
import {
    SquareCheckBig,
    Stethoscope,
    MoreVertical,
    Eye,
    Printer,
    Download,
    Trash2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { useDictionary } from "@/i18n/use-dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import {
    ChecklistItem,
    SectionConfig,
    STATUS_STYLES,
    newItemUrgencyStyle
} from "./PreOpChecklist";

interface ViewSectionCardProps {
    config: SectionConfig;
    onViewDocument: (item: ChecklistItem, sectionTitle: string) => void;
    onItemClick?: (item: ChecklistItem, sectionTitle: string) => void;
    onDeleteItem?: (item: ChecklistItem, sectionTitle: string) => void;
    onApproveClearance?: (item: ChecklistItem) => void;
}

export const ViewSectionCard = ({
    config,
    onViewDocument,
    onItemClick,
    onDeleteItem,
    onApproveClearance,
}: ViewSectionCardProps) => {
    const { title, items } = config;
    const dict = useDictionary();

    return (
        <Card className="shadow-none border-0 mb-4 bg-white">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-medium text-slate-800">
                        {title}
                    </CardTitle>

                    {items.length > 0 && title !== dict.pages.surgery.surgeryDetails.preOp.sections.procedures && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                            {items.filter(i => i.status === "Completed").length}/{items.length} {dict.common.completed}
                        </span>
                    )}
                </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
                {items.map((item: ChecklistItem) => (
                    <div
                        key={item.label}
                        onClick={() => onItemClick?.(item, title)}
                        className={`rounded-lg p-4 border transition-colors ${item.status === "Completed"
                            ? "border-green-200 bg-green-50/50"
                            : "border-slate-200 bg-white"
                            } ${onItemClick ? "cursor-pointer hover:border-blue-200" : ""}`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-slate-800">{item.label}</span>
                                    {title !== dict.pages.surgery.surgeryDetails.preOp.sections.clearances && (item.category || title === dict.pages.surgery.surgeryDetails.preOp.sections.investigations) && (
                                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                                            {item.category || "Laboratory Test"}
                                        </span>
                                    )}
                                    {item.urgency && (
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${newItemUrgencyStyle(item.urgency)}`}>
                                            {item.urgency.charAt(0).toUpperCase() + item.urgency.slice(1)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                                    {title === dict.pages.surgery.surgeryDetails.preOp.sections.investigations && (
                                        <>
                                            <span>Biochemistry</span>
                                            <span>|</span>
                                        </>
                                    )}
                                    <span>{item.subLabel || "2025-09-27 19:30"}</span>
                                    {item.status === "Completed" && (
                                        <span className="flex items-center gap-1 text-green-600 px-2 py-0.5">
                                            <SquareCheckBig size={12} />
                                            {dict.pages.surgery.surgeryDetails.preOp.status.completedPrev}
                                        </span>
                                    )}
                                </div>
                                {/* Ordered by */}
                                {(item.status === "Completed" || item.status === "Ordered") && item.orderedBy && title === dict.pages.surgery.surgeryDetails.preOp.sections.investigations && (
                                    <p className="text-xs text-blue-500 mt-2 flex items-center gap-1 font-medium">
                                        <Stethoscope size={14} /> {dict.table.orderedBy} {item.orderedBy}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2">
                                {item.status && (
                                    <span
                                        className={`text-xs font-medium px-3 py-1.5 rounded-full ${STATUS_STYLES[item.status]}`}
                                    >
                                        {item.status === "Completed" ? dict.common.completed :
                                            item.status === "Ordered" ? dict.common.ordered :
                                                item.status === "Pending" ? dict.common.pending :
                                                    item.status}
                                    </span>
                                )}
                                {![dict.pages.surgery.surgeryDetails.preOp.sections.procedures, dict.pages.surgery.surgeryDetails.preOp.sections.prep, dict.pages.surgery.surgeryDetails.preOp.sections.equipment].includes(title) && !(title === dict.pages.surgery.surgeryDetails.preOp.sections.consents && item.status === "Pending") && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                className="flex items-center gap-1 text-xs text-blue-500 font-medium px-2 py-1 rounded-sm transition-colors bg-white hover:bg-slate-50"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {dict.table.action}
                                                <MoreVertical size={14} className="text-green-500" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                                            {title !== dict.pages.surgery.surgeryDetails.preOp.sections.clearances && (
                                                <DropdownMenuItem
                                                    className="gap-2 cursor-pointer justify-between"
                                                    onClick={() => {
                                                        if ([dict.pages.surgery.surgeryDetails.preOp.sections.investigations, dict.pages.surgery.surgeryDetails.preOp.sections.consents, dict.pages.surgery.surgeryDetails.preOp.sections.nursingOrders, dict.pages.surgery.surgeryDetails.preOp.sections.implants, dict.pages.surgery.surgeryDetails.preOp.sections.blood].includes(title)) {
                                                            onViewDocument(item, title);
                                                        }
                                                    }}
                                                >
                                                    {dict.common.view} <Eye size={14} className="text-slate-500" />
                                                </DropdownMenuItem>
                                            )}
                                            {(![dict.pages.surgery.surgeryDetails.preOp.sections.implants, dict.pages.surgery.surgeryDetails.preOp.sections.blood].includes(title) && title !== dict.pages.surgery.surgeryDetails.preOp.sections.clearances) && (
                                                <>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        {dict.pages.surgery.surgeryDetails.common.print} <Printer size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer justify-between">
                                                        {dict.pages.surgery.surgeryDetails.common.download} <Download size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                            {title === dict.pages.surgery.surgeryDetails.preOp.sections.consents && (
                                                <DropdownMenuItem
                                                    className="gap-2 cursor-pointer justify-between"
                                                    onClick={() => onDeleteItem?.(item, title)}
                                                >
                                                    {dict.common.delete} <Trash2 size={14} />
                                                </DropdownMenuItem>
                                            )}
                                            {title === dict.pages.surgery.surgeryDetails.preOp.sections.clearances && (
                                                <>
                                                    {item.status === "Pending" && (
                                                        <DropdownMenuItem
                                                            className="gap-2 cursor-pointer justify-between"
                                                            onClick={() => onApproveClearance?.(item)}
                                                        >
                                                            {dict.pages.surgery.surgeryDetails.preOp.actions.approveClearance} <Printer size={14} className="text-slate-500" />
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem
                                                        className="gap-2 cursor-pointer justify-between"
                                                        onClick={() => onViewDocument(item, title)}
                                                    >
                                                        {dict.common.view} <Eye size={14} className="text-slate-500" />
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        </div>

                        {/* Previous Result Available Info (Read-only) */}
                        {item.status === "Ordered" && item.previousResult && (
                            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                                <span className="text-blue-500">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    </svg>
                                </span>
                                <p className="text-xs text-slate-600">
                                    {dict.pages.surgery.surgeryDetails.preOp.status.prevAvailable}: {item.previousResult.date} ({item.previousResult.count} {dict.pages.surgery.surgeryDetails.preOp.status.results})
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

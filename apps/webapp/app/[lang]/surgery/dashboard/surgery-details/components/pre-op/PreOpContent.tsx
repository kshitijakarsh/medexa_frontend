import { Trash2, Eye, Printer, Download, EllipsisVertical, Stethoscope } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

import { StatusPill } from "@/components/common/pasient-card/status-pill";
import { PREOP_SECTIONS } from "../../../../lib/constants";
import { CheckItemData } from "../../../../lib/types";


const SectionHeader = ({ title, count }: { title: string; count?: string }) => (
    <div className="flex items-center gap-2 mb-3">
        <h3 className="text-md font-medium text-slate-800">{title}</h3>
        {count && <span className="bg-blue-50 text-blue-600 text-sm font-medium px-2 py-0.5 rounded-full">{count}</span>}
    </div>
);

const PendingActionItem = ({ label }: { label: string }) => (
    <div className="rounded-lg border border-blue-200 p-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <div className="flex items-center gap-2">
            <span className="bg-slate-200 text-black text-sm px-2 py-0.5 rounded-full font-regular">Pending</span>
            <button className="text-red-500 transition-colors bg-red-100 p-2 rounded-full">
                <Trash2 size={14} />
            </button>
        </div>
    </div>
);

type Status = "Completed" | "Ordered" | "Processing";

const STATUS_STYLES: Record<Status, string> = {
    Completed: "bg-green-600 text-white",
    Ordered: "bg-[#FF8D28] text-white",
    Processing: "bg-blue-600 text-white",
};

const CheckItem = ({
    label,
    date,
    user,
    status,
    category,
    urgency,
    testType,
    actionOptions = "full"
}: CheckItemData) => {
    const isSuccess = ["Completed"].includes(status);
    const isInfo = ["Received"].includes(status);
    const testTypeLabel = testType ? "Ordered by" : "Checked by";

    const badgeClass = STATUS_STYLES[status as Status] || (
        isSuccess ? "bg-emerald-100 text-emerald-700" :
            isInfo ? "bg-blue-100 text-blue-700" :
                "bg-red-100 text-red-700"
    );
    const isSuccessStyle = isSuccess ? "bg-emerald-50 border-emerald-500 " : "bg-white border-blue-200";

    return (
        <div className={`rounded-lg border p-3 flex items-center justify-between transition-colors ${isSuccessStyle}`}>
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-slate-800">{label}</h4>
                    {category && (
                        <span className="text-[10px] text-slate-500 font-regular bg-white px-2 py-0.5 rounded-full border border-slate-100">
                            {category}
                        </span>
                    )}
                    {urgency && (
                        <StatusPill status={urgency} className="h-5 font-regular text-[10px] px-2 bg-red-100 text-red-500" />
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    {(date || testType) && (
                        <div className="text-[10px] text-black flex items-center gap-1.5 font-regular">
                            {testType && (
                                <>
                                    <span>{testType}</span>
                                    <span className="text-green-500">|</span>
                                </>
                            )}
                            {date}
                        </div>
                    )}
                    {user && (
                        <div className="flex items-center gap-1 text-[10px] text-blue-500">
                            <Stethoscope size={12} className="shrink-0" />
                            <span>{testTypeLabel}</span>
                            <span>{user}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className={`text-sm font-regular px-2.5 py-1 rounded-full min-w-[70px] text-center ${badgeClass}`}>
                    {status}
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="h-7 px-2.5 flex items-center gap-1.5 rounded-md bg-white text-sm font-regular text-blue-500 transition-colors outline-none focus:ring-2 focus:ring-slate-200">
                            Action <EllipsisVertical className="text-green-500" size={14} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="flex flex-col w-32 bg-blue-50 gap-0.5 border-none shadow-lg">
                        <DropdownMenuItem className="flex justify-between items-center text-xs cursor-pointer rounded-md bg-white hover:bg-slate-50 focus:bg-slate-50 p-2">
                            View
                            <Eye className="h-3 w-3 text-slate-500" />
                        </DropdownMenuItem>
                        {actionOptions === "full" && (
                            <>
                                <DropdownMenuItem className="flex justify-between items-center text-xs cursor-pointer rounded-md bg-white hover:bg-slate-50 focus:bg-slate-50 p-2">
                                    Print
                                    <Printer className="h-3 w-3 text-slate-500" />
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex justify-between items-center text-xs cursor-pointer rounded-md bg-white hover:bg-slate-50 focus:bg-slate-50 p-2">
                                    Download
                                    <Download className="h-3 w-3 text-slate-500" />
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};


const COMPLETED_STATUSES = ["Completed"];

export const PreOpContent = () => {
    return (
        <div className="space-y-6">
            {PREOP_SECTIONS.map((section, index) => {
                const totalItems = section.items.length;
                const completedItems = section.items.filter(item => {
                    const status = item.kind === "check" ? item.data.status : item.data.status;
                    return COMPLETED_STATUSES.includes(status);
                }).length;

                return (
                    <div key={index} className="flex flex-col bg-white border border-slate-100 rounded-xl p-4 mb-4 shadow-soft">
                        <SectionHeader
                            title={section.title}
                            count={`${completedItems}/${totalItems} Completed`}
                        />
                        <div className="space-y-2">
                            {section.items.map((item, itemIndex) => {
                                if (item.kind === "pending") {
                                    return <PendingActionItem key={itemIndex} label={item.data.label} />;
                                }
                                return <CheckItem key={itemIndex} {...item.data} />;
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

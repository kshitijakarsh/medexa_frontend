"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { STATUS_LABELS, STATUS_TRANSITIONS } from "./visit-status";
import { useUpdateVisitStatus } from "./useUpdateVisitStatus";
import {
    normalizeStatus,
    statusKey,
    statusStyles,
    fallbackStyle,
} from "./status-ui";

export function VisitStatusSelector({
    visitId,
    status,
    disabled,
}: {
    visitId: string;
    status: string;
    disabled?: boolean;
}) {
    const updateStatusMutation = useUpdateVisitStatus(visitId);

    const label = normalizeStatus(status);
    const key = statusKey(label);
    const style = statusStyles[key] || fallbackStyle;
    return (
        <div className="min-w-[190px]">
            <Select
                value={status}
                disabled={disabled || updateStatusMutation.isPending}
                onValueChange={(newStatus) => {
                    if (newStatus !== status) {
                        updateStatusMutation.mutate(newStatus);
                    }
                }}
            >
                <SelectTrigger
                    className={`
            !h-7 rounded-full text-xs font-medium p-2
            ${style.bg}
            ${style.text}
            ${style.border || ""}
          `}
                >
                    <SelectValue>
                        {updateStatusMutation.isPending
                            ? "Updating..."
                            : STATUS_LABELS[status]}
                    </SelectValue>
                </SelectTrigger>

                <SelectContent className={` ${style.border || ''}`}>
                    {STATUS_TRANSITIONS[status]?.map((s) => {
                        const lbl = normalizeStatus(s);
                        const k = statusKey(lbl);
                        const st = statusStyles[k] || fallbackStyle;

                        return (
                            <SelectItem key={s} value={s} className="!p-1 w-full">
                                <span
                                    className={`flex items-center w-full px-2 py-1 rounded-md text-xs ${st.bg} ${st.text}`}
                                >
                                    {lbl}
                                </span>
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}

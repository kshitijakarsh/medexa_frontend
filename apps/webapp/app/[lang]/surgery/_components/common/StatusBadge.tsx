import React from "react";
import { UrgencyLevel } from "../../lib/types";

interface StatusBadgeProps {
    status: UrgencyLevel;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    let colorClass = "";

    switch (status) {
        case UrgencyLevel.Stat: // Assuming strictly visual match to "Sat" (Red)
            colorClass = "text-red-500";
            break;
        case UrgencyLevel.Urgent:
            colorClass = "text-orange-400";
            break;
        case UrgencyLevel.Elective:
            colorClass = "text-blue-500";
            break;
        default:
            colorClass = "text-slate-500";
    }

    return <span className={`font-medium text-sm ${colorClass}`}>{status}</span>;
};

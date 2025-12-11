"use client";

import { formatName, getInitials } from "@/app/utils/name";
import { StatusPill } from "./status-pill";
import { UserAvatar } from "./user-avatar";
import { VipCrownBadge } from "./vip-crown-badge";

// function getInitials(name?: string) {
//   if (!name) return "NA";

//   return name
//     .trim()
//     .split(/\s+/)
//     .filter(Boolean)
//     .map((part) => part.charAt(0).toUpperCase())
//     .slice(0, 2)
//     .join("") || "NA";
// }

// function formatName(name?: string) {
//   if (!name) return "";

//   return name
//     .trim()
//     .toLowerCase()
//     .split(/\s+/)
//     .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
//     .join(" ");
// }

export function AppointmentPatientCell({
    name,
    mrn,
    avatar,
    vip,
    status,
    size,
}: {
    name: string;
    mrn: string;
    avatar?: any;
    vip?: boolean;
    status?: string;
    size?: number
}) {
    const formattedName = formatName(name);
    const initials = getInitials(name);

    return (
        <div className="flex items-start gap-3 w-full">
            {/* Avatar + VIP Badge */}
            <div className="relative">
                <UserAvatar src={avatar} fallback={initials} size={size ?? 44} />
                {vip && (
                    <VipCrownBadge
                        size={14}
                        className="absolute -top-1 -left-1"
                    />
                )}
            </div>

            {/* Name + MRN */}
            <div className="flex-1">
                <div className={`font-semibold text-${size === 60 ? "lg" : "sm"}`}>{formattedName}</div>
                <div className={` text-gray-500 text-${size === 60 ? "sm" : "xs"}`}>{mrn}</div>
            </div>

            {/* Status Pill */}
            {status && (
                <div className={`ml-${size === 60 ? "4" : "0"}`}>
                    <StatusPill status={status} />
                </div>
            )}
        </div>
    );
}

// app/doctor-dashboard/components/appointments/AppointmentCard.tsx
"use client";

import { Clock, MoreVertical } from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { StatusPill } from "./status-pill";
import { TypeBadge } from "./type-badge";
import { VipCrownBadge } from "./vip-crown-badge";
import { CardBlock } from "./card-block";
import { TimeRoomInfo } from "@/components/common/pasient-card/time-room-info";
import { MouseEventHandler, useState } from "react";
import { AppointmentPatientCell } from "./appointment-patient-cell";
import { NurseReassignModal } from "@/app/[lang]/nurse/dashboard/_components/NurseReassignModal";

interface AppointmentCardProps {
    item: any,
    // onClick?: MouseEventHandler<HTMLDivElement>,
    onClick?: () => void;
    selected?: boolean
    showNurseMenu?: boolean;
}

export default function AppointmentCard({ item, onClick, selected, showNurseMenu = false }: AppointmentCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const nurseName = item?.nurse
        ? item.nurse.name || `${item.nurse.first_name || ""} ${item.nurse.last_name || ""}`.trim()
        : null;

    console.log(item)
    return (
        <>
        <CardBlock
            onClick={onClick}
            className={`
                cursor-pointer
    px-4 py-4 rounded-2xl shadow-0 space-y-3 flex flex-col bg-[#EFF4FF]
    border border-[#E5EAF0]  
    hover:bg-gray-50
    ${selected ? "border-l-blue-600 border-l-3" : "border-l-[#E5EAF0] border-r"} 
  `}
        >
            {/* ROW 1 */}
            <div className="flex items-start gap-3">
                <AppointmentPatientCell
                    name={item.name}
                    mrn={item.mrn}
                    avatar={item.avatar}
                    vip={item.status === "vip"}
                    status={item.status}
                />
                {showNurseMenu && (
                    <button
                        onClick={handleMenuClick}
                        className="ml-auto p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                )}
            </div>

            {/* ROW 2 */}
            <div className="mt-3 mt-auto flex items-center justify-between text-sm gap-1">
                {/* Time + Room */}
                <TimeRoomInfo time={item.time} room={item.room} />

                <div>
                    <TypeBadge type={item.type} className="text-end"/>
                </div>
            </div>

            {/* Nurse Name */}
            {showNurseMenu && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                        <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        <span className="text-gray-500">Nurse:</span>
                        <span className="font-medium text-gray-700">
                            {nurseName || "Not assigned"}
                        </span>
                    </div>
                </div>
            )}
        </CardBlock>

        {/* Nurse Reassign Modal */}
        {showNurseMenu && (
            <NurseReassignModal
                visit={item}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        )}
        </>
    );
}

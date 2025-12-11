// app/doctor-dashboard/components/appointments/AppointmentCard.tsx
"use client";

import { Clock } from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { StatusPill } from "./status-pill";
import { TypeBadge } from "./type-badge";
import { VipCrownBadge } from "./vip-crown-badge";
import { CardBlock } from "./card-block";
import { TimeRoomInfo } from "@/components/common/pasient-card/time-room-info";
import { MouseEventHandler } from "react";
import { AppointmentPatientCell } from "./appointment-patient-cell";

interface AppointmentCardProps {
    item: any,
    // onClick?: MouseEventHandler<HTMLDivElement>,
    onClick?: () => void;
    selected?: boolean
}

export default function AppointmentCard({ item, onClick, selected }: AppointmentCardProps) {
    console.log(item)
    return (
        // <div className="bg-white rounded-2xl border border-[#E6F3FF] p-4 shadow-sm">
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
                {/* <div className="relative">
                    <UserAvatar
                        src={item.avatar}
                        size={44}
                    // borderColor="#CDEED3"
                    />
                    {item.vip && (
                        <VipCrownBadge
                            size={14}
                            className="absolute -top-1 -left-1"
                        />
                    )}
                </div>

                <div className="flex-1">
                    <div className="font-semibold text-[15px]">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.mrn}</div>
                </div>

                <div>
                    <StatusPill status={item.status} />
                </div> */}
                <AppointmentPatientCell
                    name={item.name}
                    mrn={item.mrn}
                    avatar={item.avatar}
                    vip={item.status === "vip"}
                    status={item.status}
                />
            </div>

            {/* ROW 2 */}
            <div className="mt-3 mt-auto flex items-center justify-between text-sm">
                {/* <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-400" />
                        <span>{item.time}</span>
                    </div>
                    <span className="text-[#17B26D] font-medium">{item.room}</span>
                </div> */}
                {/* Time + Room */}
                <TimeRoomInfo time={item.time} room={item.room} />

                <div>
                    <TypeBadge type={item.type} />
                </div>
            </div>
        </CardBlock>
    );
}

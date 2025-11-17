// app/doctor-dashboard/components/EmergencyPatientCard.tsx
"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import { StatusPill } from "../ui/StatusPill";
import { UserAvatar } from "../ui/AvatarImage";
import { TypeBadge } from "../ui/TypeBadge";
import { TimeRoomInfo } from "../ui/TimeRoomInfo";
import { CardBlock } from "../ui/CardBlock";

export function EmergencyPatientCard({ p }: { p: any }) {
  return (
    // <div className="bg-white border border-[#E6E6E6] rounded-xl px-4 py-4 w-[310px] flex-shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
    <CardBlock className="px-4 py-4 w-[310px] flex-shrink-0">
 
    {/* Top section */}
      <div className="flex items-center gap-3">
        {/* <Image
          src={p.avatar}
          alt={p.name}
          width={46}
          height={46}
          className="rounded-full border-1 border-[var(--sidebar-accent)]"
        /> */}

        <UserAvatar
          src={p.avatar}
          alt={p.name}
          size={46}
          borderColor="var(--sidebar-accent)"
        />


        <div className="flex flex-col">
          <span className="font-semibold text-[15px]">{p.name}</span>
          <span className="text-xs text-gray-500">MRN-{p.mrn}</span>
        </div>

        <div className="ml-auto">
          <StatusPill status={p.status} />
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-4 flex items-center justify-between text-sm">
        {/* <div className="text-xs text-gray-500 flex items-center gap-1">
          <Clock size={14} className="text-gray-400" /> {p.time}
          <span className="text-[#17B26D] font-medium">{p.room}</span>
        </div> */}
        <TimeRoomInfo
          time={p.time}
          room={p.room}
          prefixRoom=""
        />


        {/* <div className="text-xs text-[#FF6B35] font-medium">{p.type}</div> */}
        <TypeBadge type={p.type} />

      </div>
    </CardBlock>
  );
}

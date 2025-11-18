// app/doctor-dashboard/components/appointments/AppointmentCard.tsx
"use client";

import { Clock } from "lucide-react";
import { UserAvatar } from "../../_components/ui/AvatarImage";
import { StatusPill } from "../../_components/ui/StatusPill";
import { TypeBadge } from "../../_components/ui/TypeBadge";
import { VipCrownBadge } from "../../_components/VIP/VipCrownBadge";
import { CardBlock } from "../../_components/ui/CardBlock";



export default function AppointmentCard({ item }: { item: any }) {
    return (
        // <div className="bg-white rounded-2xl border border-[#E6F3FF] p-4 shadow-sm">
        <CardBlock
            className="px-4 py-4 
                rounded-2xl 
                border border-[#E5EAF0]
                shadow-0
                space-y-3
                 flex flex-col
                 "
        >
            {/* ROW 1 */}
            <div className="flex items-start gap-3">
                {/* <div className="relative">
          <UserAvatar src={item.avatar} size={44} borderColor="#CDEED3" />
          {item.vip && (
            <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-[#FFF4D9] text-[#F4A100] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l1.5 4 4 1-3 2 1 4-3-2-3 2 1-4-3-2 4-1L12 2z"/></svg>
            </div>
          )}
        </div> */}
                <div className="relative">
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
                    <div className="text-xs text-gray-500">MRN-{item.mrn}</div>
                </div>

                <div>
                    <StatusPill status={item.status} />
                </div>
            </div>

            {/* ROW 2 */}
            <div className="mt-3 mt-auto flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-400" />
                        <span>{item.time}</span>
                    </div>
                    <span className="text-[#17B26D] font-medium">{item.room}</span>
                </div>

                <div>
                    <TypeBadge type={item.type} />
                </div>
            </div>
        </CardBlock>
    );
}

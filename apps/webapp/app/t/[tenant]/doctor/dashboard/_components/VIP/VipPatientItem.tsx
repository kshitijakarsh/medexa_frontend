// "use client";

// import { VipCrownBadge } from "./VipCrownBadge";
// import { TimeRoomInfo } from "../ui/TimeRoomInfo";
// import { TypeBadge } from "../ui/TypeBadge";
// import { StatusPill } from "../ui/StatusPill";
// import { UserAvatar } from "../ui/AvatarImage";

// export function VipPatientItem({ p }: { p: any }) {
//   return (
//     <div className="flex items-start gap-3 py-2">
//       {/* Crown Icon */}
//       <VipCrownBadge />

//       {/* Avatar */}
//       <UserAvatar
//         src={p.avatar}
//         size={40}
//         borderColor="#CDEED3"
//         fallback={p.name[0]}
//       />

//       {/* Patient Info */}
//       <div className="flex-1">
//         <div className="font-semibold text-[15px] leading-tight">
//           {p.name}
//         </div>
//         <div className="text-xs text-gray-500 mb-1">MRN-{p.mrn}</div>

//         {/* Time + Room */}
//         <TimeRoomInfo time={p.time} room={p.room} />
//       </div>

//       {/* Right side */}
//       <div className="flex flex-col items-end">
//         <TypeBadge type={p.type} />
//         <StatusPill status={p.status} className="mt-1" />
//       </div>
//     </div>
//   );
// }

"use client";

import { VipCrownBadge } from "./VipCrownBadge";
import { UserAvatar } from "../ui/AvatarImage";
import { TimeRoomInfo } from "../ui/TimeRoomInfo";
import { TypeBadge } from "../ui/TypeBadge";
import { StatusPill } from "../ui/StatusPill";
import { CardBlock } from "../ui/CardBlock";

export function VipPatientItem({ p }: { p: any }) {
  return (
    <CardBlock
      className="
        px-4 py-4 
        rounded-2xl 
        border border-[#E5EAF0]
        shadow-0
        space-y-3
      "
    >
      {/* ROW 1 */}
      <div className="flex items-center gap-3">
        {/* Avatar + Crown */}
        <div className="relative">
          <UserAvatar
            src={p.avatar}
            size={48}
            borderColor="#CDEED3"
          />

          <VipCrownBadge
            size={14}
            className="absolute -top-1 -left-1"
          />
        </div>

        {/* Name + MRN */}
        <div className="flex-1">
          <div className="font-semibold text-[15px] leading-snug">
            {p.name}
          </div>

          <div className="text-xs text-gray-500">
            MRN-{p.mrn}
          </div>
        </div>

        {/* Status pill */}
        <StatusPill status={p.status} />
      </div>

      {/* ROW 2 */}
      <div className="flex items-center justify-between">
        {/* Time + Room */}
        <TimeRoomInfo time={p.time} room={p.room} />

        {/* Emergency type */}
        <TypeBadge type={p.type} />
      </div>
    </CardBlock>
  );
}

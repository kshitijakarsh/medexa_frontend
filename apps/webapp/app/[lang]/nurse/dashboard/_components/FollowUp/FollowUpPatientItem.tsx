// "use client";

// import { UserAvatar } from "../ui/AvatarImage";
// import { TimeRoomInfo } from "../ui/TimeRoomInfo";
// import { StatusPill } from "../ui/StatusPill";
// import { TypeBadge } from "../ui/TypeBadge";
// import { CardBlock } from "../ui/CardBlock";
// import { FollowUpBadge } from "./FollowUpBadge";

// export function FollowUpPatientItem({ p }: { p: any }) {
//   return (
//     <CardBlock
//       className="
//         px-4 py-4 
//         rounded-2xl 
//         border border-[#E5EAF0]
//         shadow-sm
//         space-y-3
//       "
//     >
//       {/* Row 1 */}
//       <div className="flex items-start gap-3">
//         {/* Avatar + Badge */}
//         <div className="relative">
//           <UserAvatar
//             src={p.avatar}
//             size={48}
//             borderColor="#E6F3FF"
//           />

//           <FollowUpBadge
//             size={14}
//             className="absolute -top-1.5 -left-1.5"
//           />
//         </div>

//         {/* Name + MRN */}
//         <div className="flex-1">
//           <div className="font-semibold text-[15px] leading-snug">
//             {p.name}
//           </div>
//           <div className="text-xs text-gray-500 -mt-[1px]">
//             MRN-{p.mrn}
//           </div>
//         </div>

//         {/* Status Pill */}
//         <StatusPill status={p.status} />
//       </div>

//       {/* Row 2 */}
//       <div className="flex items-center justify-between">
//         <TimeRoomInfo time={p.time} room={p.room} />
//         <TypeBadge type={p.type} />
//       </div>
//     </CardBlock>
//   );
// }


"use client";

import { FollowUpBadge } from "./FollowUpBadge";
import { UserAvatar } from "../../../../../../components/common/pasient-card/user-avatar";
import { TimeRoomInfo } from "../../../../../../components/common/pasient-card/time-room-info";
import { StatusPill } from "../../../../../../components/common/pasient-card/status-pill";
import { TypeBadge } from "../../../../../../components/common/pasient-card/type-badge";
import { CardBlock } from "../../../../../../components/common/pasient-card/card-block";

export function FollowUpPatientItem({ p }: { p: any }) {
  return (
    <CardBlock
      className="
        px-4 py-4
        rounded-2xl 
        border border-[#E5EAF0]
        shadow-sm
        space-y-3
      "
    >
      {/* ROW 1 */}
      <div className="flex items-start gap-3">
        {/* Avatar + Yellow Follow-Up Badge */}
        <div className="relative">
          <UserAvatar
            src={p.avatar}
            size={48}
            borderColor="#E6F3FF"
          />

          <div className="absolute -left-2 -top-2">
            <FollowUpBadge  />
          </div>
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

        {/* Status Pill */}
        <StatusPill status={p.status} />
      </div>

      {/* ROW 2 */}
      <div className="flex items-center justify-between">
        {/* Time + Room */}
        <TimeRoomInfo time={p.time} room={p.room} />

        {/* Follow Up Type */}
        <TypeBadge type={p.type}  />
      </div>
    </CardBlock>
  );
}

// // "use client";

// // import { StatusPill } from "@/components/common/pasient-card/status-pill";
// // import { UserAvatar } from "@/components/common/pasient-card/user-avatar";


// // export function AppointmentDetailHeader({ item }) {
// //   return (
// //     <div className="flex items-center justify-between mb-4">

// //       <div className="flex items-center gap-3">
// //         <UserAvatar src={item.avatar} size={50} />

// //         <div>
// //           <div className="font-semibold text-lg">{item.name}</div>
// //           <div className="text-sm text-gray-500">MRN-{item.mrn}</div>
// //         </div>

// //         <StatusPill status={item.status} />
// //       </div>

// //       <div className="flex gap-3">
// //         <button className="btn-blue">Finish Consultation</button>
// //         <button className="btn-outline">View Details</button>
// //         <button className="btn-outline">Refer Doctor</button>
// //       </div>

// //     </div>
// //   );
// // }




// "use client";

// import { StatusPill } from "@/components/common/pasient-card/status-pill";
// import { UserAvatar } from "@/components/common/pasient-card/user-avatar";


// export function AppointmentDetailHeader({ item } : {item : object}) {
//   return (
//     <div className="flex justify-between items-center">
//       <div className="flex items-center gap-3">
//         <UserAvatar src={item.avatar} size={55} />
//         <div>
//           <div className="text-lg font-semibold">{item.name}</div>
//           <div className="text-sm text-gray-500">MRN-{item.mrn}</div>
//         </div>
//         <StatusPill status={item.status} />
//       </div>

//       <div className="flex gap-2">
//         <button className="btn-blue">Finish Consultation</button>
//         <button className="btn-outline">View Details</button>
//         <button className="btn-outline">Refer Doctor</button>
//       </div>
//     </div>
//   );
// }


"use client";

import { StatusPill } from "@/components/common/pasient-card/status-pill";
import { UserAvatar } from "@/components/common/pasient-card/user-avatar";
import { AppointmentItem } from "./types/appointment";

interface AppointmentDetailHeaderProps {
  item: AppointmentItem;
}

export function AppointmentDetailHeader({ item }: AppointmentDetailHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <UserAvatar src={item.avatar} size={55} />

        <div>
          <div className="text-lg font-semibold">{item.name}</div>
          <div className="text-sm text-gray-500">MRN-{item.mrn}</div>
        </div>

        <StatusPill status={item.status} />
      </div>

      <div className="flex gap-2">
        <button className="btn-blue">Finish Consultation</button>
        <button className="btn-outline">View Details</button>
        <button className="btn-outline">Refer Doctor</button>
      </div>
    </div>
  );
}

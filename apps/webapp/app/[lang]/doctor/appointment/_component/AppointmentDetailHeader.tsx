// // // // // "use client";

// // // // // import { StatusPill } from "@/components/common/pasient-card/status-pill";
// // // // // import { UserAvatar } from "@/components/common/pasient-card/user-avatar";


// // // // // export function AppointmentDetailHeader({ item }) {
// // // // //   return (
// // // // //     <div className="flex items-center justify-between mb-4">

// // // // //       <div className="flex items-center gap-3">
// // // // //         <UserAvatar src={item.avatar} size={50} />

// // // // //         <div>
// // // // //           <div className="font-semibold text-lg">{item.name}</div>
// // // // //           <div className="text-sm text-gray-500">MRN-{item.mrn}</div>
// // // // //         </div>

// // // // //         <StatusPill status={item.status} />
// // // // //       </div>

// // // // //       <div className="flex gap-3">
// // // // //         <button className="btn-blue">Finish Consultation</button>
// // // // //         <button className="btn-outline">View Details</button>
// // // // //         <button className="btn-outline">Refer Doctor</button>
// // // // //       </div>

// // // // //     </div>
// // // // //   );
// // // // // }




// // // // "use client";

// // // // import { StatusPill } from "@/components/common/pasient-card/status-pill";
// // // // import { UserAvatar } from "@/components/common/pasient-card/user-avatar";


// // // // export function AppointmentDetailHeader({ item } : {item : object}) {
// // // //   return (
// // // //     <div className="flex justify-between items-center">
// // // //       <div className="flex items-center gap-3">
// // // //         <UserAvatar src={item.avatar} size={55} />
// // // //         <div>
// // // //           <div className="text-lg font-semibold">{item.name}</div>
// // // //           <div className="text-sm text-gray-500">MRN-{item.mrn}</div>
// // // //         </div>
// // // //         <StatusPill status={item.status} />
// // // //       </div>

// // // //       <div className="flex gap-2">
// // // //         <button className="btn-blue">Finish Consultation</button>
// // // //         <button className="btn-outline">View Details</button>
// // // //         <button className="btn-outline">Refer Doctor</button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // "use client";

// // // import { StatusPill } from "@/components/common/pasient-card/status-pill";
// // // import { UserAvatar } from "@/components/common/pasient-card/user-avatar";
// // // import { AppointmentItem } from "./types/appointment";

// // // interface AppointmentDetailHeaderProps {
// // //   item: AppointmentItem;
// // // }

// // // export function AppointmentDetailHeader({ item }: AppointmentDetailHeaderProps) {
// // //   return (
// // //     <div className="flex justify-between items-center">
// // //       <div className="flex items-center gap-3">
// // //         <UserAvatar src={item.avatar} size={55} />

// // //         <div>
// // //           <div className="text-lg font-semibold">{item.name}</div>
// // //           <div className="text-sm text-gray-500">MRN-{item.mrn}</div>
// // //         </div>

// // //         <StatusPill status={item.status} />
// // //       </div>

// // //       <div className="flex gap-2">
// // //         <button className="btn-blue">Finish Consultation</button>
// // //         <button className="btn-outline">View Details</button>
// // //         <button className="btn-outline">Refer Doctor</button>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // "use client";

// // import { StatusPill } from "@/components/common/pasient-card/status-pill";
// // import { UserAvatar } from "@/components/common/pasient-card/user-avatar";
// // import { AppointmentItem } from "./types/appointment";
// // import { Users, FileText, Share2 } from "lucide-react";
// // import { ActionButton } from "./button/ActionButton";

// // export function AppointmentDetailHeader({ item }: { item: AppointmentItem }) {
// //   return (
// //     <div className="bg-white rounded-2xl shadow-sm p-4 flex justify-between items-start">
// //       {/* LEFT */}
// //       <div className="flex items-center gap-4">
// //         <UserAvatar src={item.avatar} size={55} />

// //         <div>
// //           <div className="text-lg font-semibold">{item.name}</div>
// //           <div className="text-sm text-gray-500">MRN-{item.mrn}</div>

// //           <div className="flex items-center gap-1 mt-2 text-gray-600 text-sm">
// //             <span>🕒 {item.time}</span>
// //             <span>•</span>
// //             <span>{item.details}</span>
// //             <span>•</span>
// //             <span>{item.insurance}</span>
// //           </div>

// //           <div className="text-green-600 text-sm mt-1">{item.insuranceName}</div>
// //         </div>

// //         <StatusPill status={item.status} />
// //       </div>

// //       {/* RIGHT */}

// //       <div className="flex flex-col gap-3 w-[170px]">

// //         <div className="flex flex-col gap-3 w-[190px]">
// //           <ActionButton
// //             label="Finish Consultation"
// //             icon={<Users size={16} />}
// //             variant="solid"
// //           />

// //           <ActionButton
// //             label="View Details"
// //             icon={<FileText size={16} />}
// //             variant="outline"
// //           />

// //           <ActionButton
// //             label="Refer Doctor"
// //             icon={<Share2 size={16} />}
// //             variant="outline"
// //           />
// //         </div>


// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { StatusPill } from "@/components/common/pasient-card/status-pill";
// import { UserAvatar } from "@/components/common/pasient-card/user-avatar";
// import { AppointmentItem } from "./types/appointment";
// import { Users, FileText, Share2, Clock } from "lucide-react";
// import { ActionButton } from "./button/ActionButton";

// export function AppointmentDetailHeader({ item }: { item: AppointmentItem }) {
//   return (
//     <div className="
//       bg-white 
//       rounded-2xl 
//       shadow-sm 
//       p-5 
//       flex 
//       justify-between 
//       items-start 
//       border border-[#E8F6FF]
//     ">

//       {/* LEFT SECTION */}
//       <div className="flex items-start gap-4">
//         {/* Avatar */}
//         <UserAvatar src={item.avatar} size={60} />

//         {/* Info */}
//         <div className="flex flex-col gap-1 mt-1">
//           <div className="text-lg font-semibold text-gray-900">
//             {item.name}
//           </div>

//           <div className="text-sm text-gray-500">MRN-{item.mrn}</div>

//           {/* Time + Insurance */}
//           <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
//             <Clock size={16} className="text-gray-500" />
//             <span>{item.time}</span>
//             <span>•</span>
//             <span>{item.insurance}</span>
//           </div>

//           {/* Insurance (green) */}
//           {item.insuranceName && (
//             <div className="text-green-600 text-sm mt-1">
//               {item.insuranceName}
//             </div>
//           )}
//         </div>

//         {/* Status Pill */}
//         <div className="ml-4">
//           <StatusPill status={item.status} />
//         </div>
//       </div>

//       {/* RIGHT BUTTONS */}
//       <div className="flex flex-col gap-3 w-[200px]">
//         <ActionButton
//           label="Finish Consultation"
//           icon={<Users size={18} />}
//           variant="solid"
//         />

//         <ActionButton
//           label="View Details"
//           icon={<FileText size={18} />}
//           variant="outline"
//         />

//         <ActionButton
//           label="Refer Doctor"
//           icon={<Share2 size={18} />}
//           variant="outline"
//         />
//       </div>

//     </div>
//   );
// }

"use client";

import { StatusPill } from "@/components/common/pasient-card/status-pill";
import { UserAvatar } from "@/components/common/pasient-card/user-avatar";
import { AppointmentItem } from "./types/appointment";
import { Users, FileText, Share2, Clock } from "lucide-react";
import { ActionButton } from "./button/ActionButton";

export function AppointmentDetailHeader({ item }: { item: AppointmentItem }) {
  return (
    <div className="
      bg-white 
      rounded-2xl 
      shadow-sm 
      p-5 
      flex 
      justify-between 
      items-start 
      border border-[#E8F6FF]
      gap-3
    ">

      {/* LEFT SECTION */}
      <div className="flex items-start flex-col  gap-4">
        <div className="flex gap-3">
          {/* Avatar */}
          <UserAvatar src={item.avatar} size={60} />

          {/* Patient Info */}
          <div className="flex  gap-1 mt-1">
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {item.name}
              </div>

              <div className="text-sm text-gray-500">MRN-{item.mrn}</div>
            </div>
            {/* Status */}
            <div className="ml-4">
              <StatusPill status={item.status} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {/* Time Row */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Clock size={16} className="text-gray-500" />
            <span>{item.time}</span>
          </div>

          {/* Complaint + Age/Gender + Civil ID + Insurance */}
          <div className="flex items-center flex-wrap gap-2 text-sm text-gray-700 mt-1">
            {item.note && <span>{item.note}</span>}

            {item.age && (
              <>
                <span>•</span>
                <span>{item.age}</span>
              </>
            )}

            {item.phone && (
              <>
                <span>•</span>
                <span>{item.phone}</span>
              </>
            )}

            {item.insurance && (
              <>
                <span>•</span>
                <span>{item.insurance}</span>
              </>
            )}
          </div>

          {/* Green Insurance Tag (ONLY if required) */}
          {item.insurance && (
            <div className="text-green-600 text-sm mt-1">
              ✓ {item.insurance}
            </div>
          )}
        </div>
      </div>
      {/* RIGHT SIDE BUTTONS */}
      <div className="flex flex-col gap-3 w-[200px]">
        <ActionButton
          label="Finish Consultation"
          icon={<Users size={18} />}
          variant="solid"
        />

        <ActionButton
          label="View Details"
          icon={<FileText size={18} />}
          variant="outline"
        />

        <ActionButton
          label="Refer Doctor"
          icon={<Share2 size={18} />}
          variant="outline"
        />
      </div>

    </div>
  );
}

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

import { AppointmentItem } from "./types/appointment";
import { Users, FileText, Share2, Save } from "lucide-react";
import { ActionButton } from "./button/ActionButton";
import { AppointmentPatientCell } from "@/components/common/pasient-card/appointment-patient-cell";
import { VisitStatusSelector } from "./common/VisitStatusSelector";
import { canWorkOnVisit } from "./common/visitGuards";

export function AppointmentDetailHeader({
  item,
  onSaveDraft,
  onFinish,
  saving,
  finishing,
  isLoading,
  starting,
  onStart,
}: {
  item: AppointmentItem;
  onSaveDraft: () => void;
  onFinish: () => void;
  saving: boolean;
  finishing: boolean;
  isLoading?: boolean;
  starting?: boolean,
  onStart?: () => void,
}) {

  // const isStarted = [
  //   "in_consultation",
  //   "in_progress",
  //   "lab_test",
  //   "radiology",
  //   // "active"
  // ].includes(item.status);

  const isCompleted = item.status === "completed";

  return (
    <div className="
      bg-white 
      rounded-2xl 
      shadow-sm 
      p-5 
      flex 
      justify-between 
      items-start 
      border border-0 border-b-2
      border-b-[#0086F8]
      gap-3
    ">

      {/* LEFT SECTION */}
      <div className="flex items-start flex-col gap-3">
        <div className="flex gap-3">
          {/* <UserAvatar src={item.avatar} size={60} />

          <div className="flex gap-1 mt-1">
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {item.name}
              </div>
              <div className="text-sm text-gray-500">{item.mrn}</div>
            </div>
            <div className="ml-4">
              <StatusPill status={item.status} />
            </div>
          </div> */}
          <AppointmentPatientCell
            name={item.name}
            mrn={item.mrn}
            avatar={item.avatar}
            vip={item.status === "vip"}
            // status={item.status} // status hiding
            size={60}
          />
          {/* STATUS SELECTOR */}
          {!isCompleted && canWorkOnVisit(item.status) && (
            <VisitStatusSelector
              visitId={item.id}
              status={item.status.toLowerCase()}
              disabled={starting || finishing || isLoading}
            />
          )}


        </div>

        {/* Time + Info */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <span>{item.time}</span>
          </div>

          <div className="flex items-center flex-wrap gap-2 text-sm text-gray-700">
            {item.note && <span>{item.note}</span>}
            {item.age && <><span>•</span> <span>{item.age}</span></>}
            {item.phone && <><span>•</span> <span>{item.phone}</span></>}
            {item.insurance && <><span>•</span> <span>{item.insurance}</span></>}
          </div>
          <div className="text-gray-700 text-sm mt-1">{item.permanent_address}</div>
        </div>
        {item.insuranceName && <div className="text-green-600 text-sm mt-1">{item.insuranceName}</div>}
      </div>

      {/* RIGHT SECTION ACTIONS */}
      <div className="flex flex-col gap-3 w-[210px]">

        {/* SAVE BUTTON (DRAFT) */}
        {/* <ActionButton
          label={saving ? "Saving..." : "Save Draft"}
          icon={<Save size={18} />}
          variant="outline"
          disabled={saving || finishing}
          onClick={onSaveDraft}
        /> */}

        {/* START CONSULTATION */}
        {!canWorkOnVisit(item.status) && !isCompleted && (
          <ActionButton
            label={starting ? "Starting..." : "Start Consultation"}
            icon={<Users size={18} />}
            variant="solid"
            disabled={starting || finishing || isLoading}
            onClick={onStart}
          />
        )}

        {/* FINISH CONSULTATION */}
        {canWorkOnVisit(item.status) && !isCompleted && (
          <ActionButton
            label={finishing ? "Finishing..." : "Finish Consultation"}
            icon={<Users size={18} />}
            variant="solid"
            disabled={finishing || saving || isLoading}
            onClick={onFinish}
          />
        )}

        <ActionButton
          label="View Details"
          icon={<FileText size={18} />}
          variant="outline"
          disabled={true}
        />

        <ActionButton
          label="Refer Doctor"
          icon={<Share2 size={18} />}
          variant="outline"
          disabled={true}
        />
      </div>
    </div>
  );
}

// "use client";

// import { format } from "@workspace/ui/hooks/use-date-fns";
// import { NurseNote } from "./NurseNote";

// interface NurseNoteCardProps {
//   data: NurseNote;
// }

// export default function NurseNoteCard({ data }: NurseNoteCardProps) {
//   const name = data.createdBy?.name ?? "Nurse";
//   const time = data.created_at ? format(new Date(data.created_at), "dd MMM yyyy, hh:mm a") : '';

//   // Optional avatar fallback (initials)
//   const initials = name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

//   return (
//     <div className="p-4 bg-white rounded-xl border shadow-sm" key={data.id}>
//       <div className="flex items-start gap-4">
//         {/* Avatar */}
//         {data.createdBy?.avatar ? (
//           <img
//             src={data.createdBy.avatar}
//             alt={name}
//             className="w-14 h-14 object-cover rounded-full"
//           />
//         ) : (
//           <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
//             {initials}
//           </div>
//         )}

//         <div className="flex-1">
//           {/* Name + Time */}
//           <p className="font-semibold text-gray-900">{name}</p>
//           <p className="text-sm text-gray-500 mb-2">{time}</p>

//           {/* Note Text */}
//           <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//             {data.note}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { format } from "@workspace/ui/hooks/use-date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { NurseNote } from "./NurseNote";

export default function NurseNoteCard({
  data,
  onEdit,
  onDelete,
}: {
  data: NurseNote;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const name = data.createdBy?.name ?? "Nurse";
  const time = format(new Date(data.created_at), "dd MMM yyyy, hh:mm a");

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm">
      <div className="flex gap-4">
        {/* Avatar */}
        {data.createdBy?.avatar ? (
          <img src={data.createdBy.avatar} className="w-12 h-12 rounded-full" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
            {initials}
          </div>
        )}

        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-xs text-gray-500">{time}</p>
            </div>

            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={onEdit} className="cursor-pointer">
                <Pencil className="w-4 h-4 text-green-500" />
              </Button>
              <Button size="icon" variant="ghost" onClick={onDelete} className="cursor-pointer">
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>

          <p className="mt-2 text-gray-700 whitespace-pre-line">
            {data.note}
          </p>
        </div>
      </div>
    </div>
  );
}

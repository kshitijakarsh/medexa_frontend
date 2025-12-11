
"use client";

import AppointmentCard from "@/components/common/pasient-card/appointment-card";
import { SideBarAppointmentItem } from "../types/appointment";

interface AppointmentSidebarSectionProps {
  title: string;
  color: string;
  items: SideBarAppointmentItem[];
  activeId?: string;
  onSelect: (item: SideBarAppointmentItem) => void;
}

export function AppointmentSidebarSection({
  title,
  color,
  items,
  activeId,
  onSelect
}: AppointmentSidebarSectionProps) {
  return (
    <div>
      <div className="text-xs font-semibold mb-1" style={{ color }}>
        {title}
      </div>

      {/* EMPTY STATE */}
      {items.length === 0 ? (
        <div className="text-xs text-gray-400 italic pl-1 py-2">
          No {title.toLowerCase()}.
        </div>
      ) :

        <div className="space-y-2">
          {items.map((item) => (
            <AppointmentCard
              key={item.id}
              item={item}
              selected={activeId === item.id}
              onClick={() => onSelect(item)}
            />
          ))}
        </div>
      }
    </div>
  );
}


// "use client";

// import AppointmentCard from "@/components/common/pasient-card/appointment-card";
// import { SideBarAppointmentItem } from "./types/appointment";

// interface AppointmentSidebarSectionProps {
//   title: string;
//   color: string;
//   items: SideBarAppointmentItem[];
//   activeId?: string;
//   onSelect: (item: SideBarAppointmentItem) => void;
// }

// export function AppointmentSidebarSection({
//   title,
//   color,
//   items,
//   activeId,
//   onSelect,
// }: AppointmentSidebarSectionProps) {
//   return (
//     <div>
//       <div className="text-xs font-semibold mb-1" style={{ color }}>
//         {title}
//       </div>

//       {/* EMPTY STATE */}
//       {items.length === 0 && (
//         <div className="text-xs text-gray-400 italic pl-1 py-2">
//           No {title.toLowerCase()}.
//         </div>
//       )}

//       {/* LIST */}
//       <div className="space-y-2">
//         {items.map((item) => (
//           <AppointmentCard
//             key={item.id}
//             item={item}
//             selected={activeId === item.id}
//             onClick={() => onSelect(item)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

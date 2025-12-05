// // // // "use client";

// // // // import { SectionCard } from "./SectionCard";

// // // // export function AppointmentSidebar({ data, onSelect, activeId }) {
// // // //   return (
// // // //     <SectionCard className="w-[290px] space-y-4">
// // // //       <div className="flex items-center justify-between mb-2">
// // // //         <div className="font-semibold">Today Appointments</div>
// // // //         <div className="text-xs text-blue-600 cursor-pointer">1 Alerts</div>
// // // //       </div>

// // // //       {/* All Sections */}
// // // //       {data.map((section) => (
// // // //         <AppointmentSidebarSection
// // // //           key={section.title}
// // // //           title={section.title}
// // // //           color={section.color}
// // // //           items={section.items}
// // // //           activeId={activeId}
// // // //           onSelect={onSelect}
// // // //         />
// // // //       ))}

// // // //       <div className="text-center text-blue-600 text-sm cursor-pointer mt-2">
// // // //         View All →
// // // //       </div>
// // // //     </SectionCard>
// // // //   );
// // // // }




// // // "use client";

// // // import { SectionCard } from "../common/SectionCard";
// // // import { AppointmentSidebarSection } from "./AppointmentSidebarSection";

// // // export function AppointmentSidebar({ emergency, vip, general, activeId, onSelect }) {
// // //   return (
// // //     <SectionCard className="w-[290px] h-full space-y-4">

// // //       <div className="flex justify-between items-center">
// // //         <div className="font-semibold">Today Appointments</div>
// // //         <div className="text-xs text-blue-600 cursor-pointer">1 Alerts</div>
// // //       </div>

// // //       <AppointmentSidebarSection
// // //         title="Emergency Appointments"
// // //         color="#FF4D4F"
// // //         items={emergency}
// // //         activeId={activeId}
// // //         onSelect={onSelect}
// // //       />

// // //       <AppointmentSidebarSection
// // //         title="VIP Appointments"
// // //         color="#28B469"
// // //         items={vip}
// // //         activeId={activeId}
// // //         onSelect={onSelect}
// // //       />

// // //       <AppointmentSidebarSection
// // //         title="General Appointments"
// // //         color="#A58EFF"
// // //         items={general}
// // //         activeId={activeId}
// // //         onSelect={onSelect}
// // //       />

// // //       <div className="text-blue-600 text-sm cursor-pointer text-center pt-2">
// // //         View All →
// // //       </div>
// // //     </SectionCard>
// // //   );
// // // }


// // "use client";

// // import { AppointmentSidebarSection } from "./AppointmentSidebarSection";
// // import { SectionCard } from "./SectionCard";
// // import { AppointmentItem } from "./types/appointment";

// // interface AppointmentSidebarProps {
// //   emergency: AppointmentItem[];
// //   vip: AppointmentItem[];
// //   general: AppointmentItem[];
// //   activeId?: string;
// //   onSelect: (item: AppointmentItem) => void;
// // }

// // export function AppointmentSidebar({
// //   emergency,
// //   vip,
// //   general,
// //   activeId,
// //   onSelect,
// // }: AppointmentSidebarProps) {
// //   return (
// //     <SectionCard className="w-[290px] h-full space-y-4">
// //       <div className="flex justify-between items-center">
// //         <div className="text-xs text-blue-600 cursor-pointer">1 Alerts</div>
// //       </div>

// //       <AppointmentSidebarSection
// //         title="Emergency Appointments"
// //         color="#FF4D4F"
// //         items={emergency}
// //         activeId={activeId}
// //         onSelect={onSelect}
// //       />

// //       <AppointmentSidebarSection
// //         title="VIP Appointments"
// //         color="#28B469"
// //         items={vip}
// //         activeId={activeId}
// //         onSelect={onSelect}
// //       />

// //       <AppointmentSidebarSection
// //         title="General Appointments"
// //         color="#A58EFF"
// //         items={general}
// //         activeId={activeId}
// //         onSelect={onSelect}
// //       />

// //       <div className="text-blue-600 text-sm cursor-pointer text-center pt-2">
// //         View All →
// //       </div>
// //     </SectionCard>
// //   );
// // }



// "use client";

// import { CardBlock } from "@/components/common/pasient-card/card-block";
// import { AppointmentSidebarSection } from "./AppointmentSidebarSection";
// import { SectionCard } from "./SectionCard";
// import { AppointmentItem } from "./types/appointment";
// import { SlidersHorizontal } from "lucide-react";

// interface AppointmentSidebarProps {
//     emergency: AppointmentItem[];
//     vip: AppointmentItem[];
//     general: AppointmentItem[];
//     activeId?: string;
//     onSelect: (item: AppointmentItem) => void;
// }

// export function AppointmentSidebar({
//     emergency,
//     vip,
//     general,
//     activeId,
//     onSelect,
// }: AppointmentSidebarProps) {
//     return (
//         // <SectionCard className="w-[300px] h-full flex flex-col gap-4 overflow-hidden border border-white bg-transparent">
//         <CardBlock
//             className={`
//         rounded-2xl 
//         p-4 
//         bg-transparent 
//         border border-transparent 
//         shadow-none
//       `
//             }
//         >
//             {/* 🔵 Top filter row */}
//             <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-1 text-sm font-medium">
//                     <span>All</span>
//                     <SlidersHorizontal size={14} className="text-gray-500" />
//                 </div>

//                 <div className="text-xs text-blue-600 cursor-pointer">1 Alerts</div>
//             </div>

//             {/* Sidebar scrollable content */}
//             <div className="flex-1 overflow-y-auto pr-1 space-y-5">

//                 <AppointmentSidebarSection
//                     title="Emergency Appointments"
//                     color="#FF4D4F"
//                     items={emergency}
//                     activeId={activeId}
//                     onSelect={onSelect}
//                 />

//                 <AppointmentSidebarSection
//                     title="VIP Appointments"
//                     color="#FDBD00"
//                     items={vip}
//                     activeId={activeId}
//                     onSelect={onSelect}
//                 />

//                 <AppointmentSidebarSection
//                     title="General Appointments"
//                     color="#A58EFF"
//                     items={general}
//                     activeId={activeId}
//                     onSelect={onSelect}
//                 />

//             </div>

//             {/* Bottom link */}
//             <div className="text-blue-600 text-sm cursor-pointer text-center">
//                 View All →
//             </div>

//         </CardBlock>
//     );
// }



"use client";

import { AppointmentSidebarSection } from "./AppointmentSidebarSection";
import { AppointmentItem } from "./types/appointment";
import {MoveRight} from "lucide-react";
import { useState } from "react";
import { FilterDropdown } from "./filter/filterDropdown";
import { ViewAllLink } from "../../dashboard/_components/ui/ViewAllLink";
import { buildUrl, ROUTES } from "@/lib/routes";
// import { FilterDropdown } from "./filter/filterDropdown";

interface AppointmentSidebarProps {
    emergency: AppointmentItem[];
    vip: AppointmentItem[];
    general: AppointmentItem[];
    activeId?: string;
    onSelect: (item: AppointmentItem) => void;
}

export function AppointmentSidebar({
    emergency,
    vip,
    general,
    activeId,
    onSelect,
}: AppointmentSidebarProps) {
    const [filter, setFilter] = useState("All");

    return (
        <div className="w-[300px] h-full flex flex-col gap-4 overflow-hidden rounded-xl border border-5 border-white ">

            {/* Top row */}
            <div className="flex justify-between items-center px-4 pt-4">

                <FilterDropdown value={filter} onChange={setFilter} />

                <div className="text-xs text-blue-600 cursor-pointer">1 Alerts</div>
            </div>

            {/* Scrollable sections */}
            <div className="flex-1 overflow-y-auto px-4 space-y-3">

                <AppointmentSidebarSection
                    title="Emergency Appointments"
                    color="#FF4D4F"
                    items={emergency}
                    activeId={activeId}
                    onSelect={onSelect}
                />

                <AppointmentSidebarSection
                    title="VIP Appointments"
                    color="#FDBD00"
                    items={vip}
                    activeId={activeId}
                    onSelect={onSelect}
                />

                <AppointmentSidebarSection
                    title="General Appointments"
                    color="#A58EFF"
                    items={general}
                    activeId={activeId}
                    onSelect={onSelect}
                />

            </div>

            <div className="text-blue-600 text-sm cursor-pointer text-center bg-white py-3 flex items-center justify-center gap-2">
                <ViewAllLink href={buildUrl(ROUTES.DOCTOR_VIEW_ALL)} /> <MoveRight className="h-4 w-4" />
            </div>

        </div>
    );
}


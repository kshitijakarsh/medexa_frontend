// "use client";

// import { SectionCard } from "./SectionCard";


// export function AppointmentDetailContent({ activeTab }: { activeTab: string }) {
//     return (
//         <SectionCard className="mt-4 min-h-[300px]">
//             <div className="font-medium text-gray-700">{activeTab}</div>
//             <div className="mt-3 text-gray-500 text-sm">Content goes here…</div>
//         </SectionCard>
//     );
// }


"use client";

import { SectionCard } from "./SectionCard";


export function AppointmentDetailContent({ activeTab } : {activeTab: string}) {
  return (
    <SectionCard className="mt-4 min-h-[300px]">
      <div className="font-semibold">{activeTab}</div>
      <div className="text-sm text-gray-500 mt-2">
        Content for {activeTab} will appear here.
      </div>
    </SectionCard>
  );
}

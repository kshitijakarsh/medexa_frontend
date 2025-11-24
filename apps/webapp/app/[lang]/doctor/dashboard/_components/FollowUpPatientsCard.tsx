

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { getFollowUpPatients } from "./api";
// import { DashboardSectionCard } from "./ui/DashboardSectionCard";
// import { FollowUpPatientItem } from "./FollowUp/FollowUpPatientItem";
// import { SkeletonBlock } from "./ui/SkeletonBlock";
// import { Accessibility } from "lucide-react";

// export default function FollowUpPatientsCard() {
//   const [loading, setLoading] = useState(true);
//   const [items, setItems] = useState<any[]>([]);

//   useEffect(() => {
//     getFollowUpPatients().then((d) => {
//       setItems(d);
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <DashboardSectionCard>
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center gap-2">
//           <span className="text-[#F4A100] text-lg bg-[#FFF4D9] rounded-full"><Accessibility className="w-6 h-6s"/></span>
//           <div className="text-base font-semibold">Follow Up Patients</div>
//         </div>

//         <Link href="/doctor-dashboard/follow-up" className="text-sm text-[#0B84FF]">
//           View All
//         </Link>
//       </div>

//       {/* LIST */}
//       <div className="space-y-4">
//         {loading
//           ? [...Array(3)].map((_, i) => <SkeletonBlock key={i} rows={3} />)
//           : items.map((p) => <FollowUpPatientItem key={p.id} p={p} />)}
//       </div>
//     </DashboardSectionCard>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFollowUpPatients } from "./api";
import { DashboardSectionCard } from "./ui/DashboardSectionCard";
import { FollowUpPatientItem } from "./FollowUp/FollowUpPatientItem";
import { FollowUpPatientSkeleton } from "./FollowUp/FollowUpPatientSkeleton";
import { Accessibility } from "lucide-react";
import { ViewAllLink } from "./ui/ViewAllLink";
import { buildUrl, DoctorTabs, ROUTES } from "@/lib/routes";

export default function FollowUpPatientsCard() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        getFollowUpPatients().then((d) => {
            setItems(d);
            setLoading(false);
        });
    }, []);

    return (
        <DashboardSectionCard>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-[#F4A100] text-lg bg-[#FFF4D9] rounded-full p-1">
                        <Accessibility className="w-5 h-5" />
                    </span>

                    <div className="text-base font-semibold">Follow Up Patients</div>
                </div>

                {/* <Link href="/doctor-dashboard/follow-up" className="text-sm text-[#0B84FF]">
          View All
        </Link> */}
                <ViewAllLink href={buildUrl(ROUTES.DOCTOR_VIEW_ALL, { tab: DoctorTabs[3]?.key })} />

            </div>

            {/* LIST */}
            <div className="space-y-4">
                {loading
                    ? [...Array(3)].map((_, i) => <FollowUpPatientSkeleton key={i} />)
                    : items.map((p) => <FollowUpPatientItem key={p.id} p={p} />)}
            </div>
        </DashboardSectionCard>
    );
}

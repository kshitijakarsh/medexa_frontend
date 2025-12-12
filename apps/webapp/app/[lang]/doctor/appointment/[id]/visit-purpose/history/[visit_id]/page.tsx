// // app/visit-purpose/history/[id]/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { VisitPurposeDetailsSkeleton } from "../_components/VisitPurposeDetailsSkeleton";
// import { useParams } from "next/navigation";
// import { PageHeader } from "@/components/common/page-header";
// // Reusable row (label + value)
// function InfoRow({ label, value }: { label: string; value: string }) {
//     return (
//         <div className="bg-white p-4 rounded-lg border">
//             <p className="text-xs text-gray-500">{label}</p>
//             <p className="font-medium">{value}</p>
//         </div>
//     );
// }

// // Reusable big notes box
// function InfoBox({ label, value }: { label: string; value: string }) {
//     return (
//         <div className="bg-white p-4 rounded-lg border">
//             <p className="text-xs text-gray-500 mb-1">{label}</p>
//             <p className="text-sm leading-relaxed">{value}</p>
//         </div>
//     );
// }



// export default function VisitPurposeHistoryDetails() {
//     const { id, visit_id } = useParams();
//     // console.log(id, visit_id)
//     const [data, setData] = useState<any>(null);



//     useEffect(() => {
//         setTimeout(() => {
//             setData({
//                 date: "November 14, 2024",
//                 recorder: "Dr. Vinay",
//                 time: "8:45 AM",
//                 chiefComplaint: "General Surgery",
//                 history: "General Surgery",
//                 onset: "Nurse & OT Technician",
//                 duration: "General Surgery",
//                 severity: "Nurse & OT Technician",
//                 notes:
//                     "The OT must be fully cleaned and sterilized before the procedure, with all required instruments ...",
//             });
//         }, 1000);
//     }, [visit_id]);

//     if (!data) return <VisitPurposeDetailsSkeleton />;

//     return (
//         <div className="space-y-6 p-2">
//             <PageHeader title="Visit Purpose Details" />
//             <div className="p-6 bg-[#F1F9FF] rounded-xl shadow-md">
//                 <p className="font-semibold">{data.date}</p>
//                 <p className="text-xs text-gray-500">
//                     Recorded by {data.recorder} at {data.time}
//                 </p>

//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <InfoRow label="Chief Complaint" value={data.chiefComplaint} />
//                     <InfoRow label="Onset" value={data.onset} />
//                     <InfoRow label="Duration" value={data.duration} />
//                     <InfoRow label="Severity" value={data.severity} />

//                     <div className="col-span-2">
//                         <InfoRow label="History of Present Illness" value={data.history} />
//                     </div>

//                     <div className="col-span-2">
//                         <InfoBox label="Additional Notes" value={data.notes} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }









"use client";

import { useParams } from "next/navigation";
import { format } from "@workspace/ui/hooks/use-date-fns";
import { VisitPurposeDetailsSkeleton } from "../_components/VisitPurposeDetailsSkeleton";
import { PageHeader } from "@/components/common/page-header";
import { useVisitPurposeByVisitIdHistoryOne } from "../../../../_component/Tabs/_hooks/useVisitPurpose";

// Reusable components
function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-white p-4 rounded-lg border">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    );
}

function InfoBox({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-white p-4 rounded-lg border">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-sm leading-relaxed">{value}</p>
        </div>
    );
}

export default function VisitPurposeHistoryDetails() {
    const { id, visit_id } = useParams() as { id: string, visit_id:string}; // visit purpose ID

    const { data, isLoading } = useVisitPurposeByVisitIdHistoryOne(visit_id);

    if (isLoading || !data) return <VisitPurposeDetailsSkeleton />;

    const createdAt = data.created_at ? new Date(data.created_at) : null;

    return (
        <div className="space-y-6 p-2">
            <PageHeader title="Visit Purpose Details" />

            <div className="p-6 bg-[#F1F9FF] rounded-xl shadow-md">
                <p className="font-semibold">
                    {createdAt ? format(createdAt, "MMMM dd, yyyy") : "Unknown Date"}
                </p>

                <p className="text-xs text-gray-500">
                    Recorded by{" "}
                    {data.createdBy
                        ? `${data.createdBy.name}(${data.createdBy.role})`
                        : "Unknown"}
                    {createdAt && ` at ${format(createdAt, "hh:mm a")}`}
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow label="Chief Complaint" value={data.chief_complaint} />
                    <InfoRow label="Onset" value={data.onset} />
                    <InfoRow label="Duration" value={data.duration} />
                    <InfoRow label="Severity" value={data.severity} />

                    <div className="col-span-2">
                        <InfoRow
                            label="History of Present Illness"
                            value={data.history_of_present_illness}
                        />
                    </div>

                    <div className="col-span-2">
                        <InfoBox
                            label="Additional Notes"
                            value={data.additional_notes || "No notes added"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

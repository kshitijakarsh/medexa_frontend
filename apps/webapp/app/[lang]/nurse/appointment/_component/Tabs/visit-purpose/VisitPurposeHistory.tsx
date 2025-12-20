// // import { Card, CardContent } from "@workspace/ui/components/card";
// // import { Eye } from "lucide-react";

// // export function VisitPurposeHistory() {


// //     return (

// //         < div className="mt-4" >
// //             <h3 className="text-sm font-semibold mb-2">
// //                 Previous History of Visit Purpose
// //             </h3>

// //             <div className="flex flex-col gap-4">
// //                 {[1, 2].map((index) => (
// //                     <Card
// //                         key={index}
// //                         className="border rounded-xl shadow-sm hover:bg-gray-50 cursor-pointer"
// //                     >
// //                         <CardContent className="p-4 flex items-center justify-between">
// //                             <div>
// //                                 <p className="font-semibold">November 14, 2024</p>
// //                                 <p className="text-xs text-gray-500">
// //                                     Recorded by Dr. Vinay at 8:45 AM.
// //                                 </p>
// //                             </div>
// //                             <div className="text-gray-500"><Eye className="w-5 h-5" /></div>
// //                         </CardContent>
// //                     </Card>
// //                 ))}
// //             </div>
// //         </div >
// //     )
// // }


// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { HistoryCard } from "../common/hisotry/HistoryCard";
// import { HistorySkeleton } from "../common/hisotry/HistorySkeleton";
// import { useEffect, useState } from "react";
// import { ROUTES } from "@/lib/routes";

// export function VisitPurposeHistory() {
//     const router = useRouter();
//     const { id } = useParams();
//     const [loading, setLoading] = useState(true);
//     const [history, setHistory] = useState<any[]>([]);



//     useEffect(() => {
//         setTimeout(() => {
//             setHistory([
//                 {
//                     id: 1,
//                     date: "November 14, 2024",
//                     recorder: "Dr. Vinay",
//                     time: "8:45 AM",
//                 },
//                 {
//                     id: 2,
//                     date: "November 14, 2024",
//                     recorder: "Dr. Vinay",
//                     time: "8:45 AM",
//                 },
//             ]);
//             setLoading(false);
//         }, 1500);
//     }, []);

//     return (
//         <div className="mt-4">
//             <h3 className="text-sm font-semibold mb-2">
//                 Previous History of Visit Purpose
//             </h3>

//             {loading ? (
//                 <HistorySkeleton />
//             ) : (
//                 <div className="flex flex-col gap-4">
//                     {history.map((item) => (
//                         <HistoryCard
//                             key={item.id}
//                             title={item.date}
//                             subtitle={`Recorded by ${item.recorder} at ${item.time}`}
//                             onClick={() => router.push(`${ROUTES.DOCTOR_APPOINTMENT_SCREENING}${id}${ROUTES.DOCTOR_SCREENING_VISIT_PURPOSE_HISTORY_VIEW}${item.id}`)}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }


"use client";

import { useParams, useRouter } from "next/navigation";
import { HistoryCard } from "../common/hisotry/HistoryCard";
import { HistorySkeleton } from "../common/hisotry/HistorySkeleton";
import { ROUTES } from "@/lib/routes";
import { useVisitPurposeByVisitIdHistory } from "../_hooks/useVisitPurpose";
import { format } from "@workspace/ui/hooks/use-date-fns";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";

export function VisitPurposeHistory({ patientId }: { patientId: string }) {
    const router = useRouter();
    const { id: visitId } = useParams() as { id: string };
    const { withLocale } = useLocaleRoute()

    // 🔥 Call your API hook
    const { data, isLoading } = useVisitPurposeByVisitIdHistory(patientId);

    const history = data || [];

    return (
        <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">
                Previous History of Visit Purpose
            </h3>

            {isLoading ? (
                <HistorySkeleton />
            ) : history.length === 0 ? (
                <p className="text-gray-500 text-sm">No previous visit purpose found.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {history.map((item: any) => {
                        const createdAt = item.created_at ? new Date(item.created_at) : null;
                        const recorderName = `${item.createdBy?.name ?? ""}(${item.createdBy?.role?.name ?? ""})`.trim();

                        return (
                            <HistoryCard
                                key={item.id}
                                title={
                                    createdAt
                                        // ? createdAt.toLocaleDateString("en-US", {
                                        //     month: "long",
                                        //     day: "numeric",
                                        //     year: "numeric",
                                        // })
                                        ? format(createdAt, "MMMM dd, yyyy")
                                        : "Unknown Date"
                                }
                                subtitle={`Recorded by ${recorderName || "Unknown"} at ${createdAt
                                    // ? createdAt.toLocaleTimeString("en-US", {
                                    //     hour: "numeric",
                                    //     minute: "2-digit",
                                    // })
                                    ? format(createdAt, "hh:mm a")
                                    : "--"
                                    }`}
                                onClick={() =>
                                    router.push(
                                        `${withLocale(`${ROUTES.NURSE_APPOINTMENT_SCREENING}${visitId}${ROUTES.NURSE_SCREENING_VISIT_PURPOSE_HISTORY_VIEW}${item.id}`)}`)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

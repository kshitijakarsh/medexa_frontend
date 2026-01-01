// "use client";

// import { Skeleton } from "@workspace/ui/components/skeleton";

// interface Column<T> {
//   key: keyof T | string;
//   label: string;
//   render?: (row: T) => React.ReactNode;
// }

// interface Props<T> {
//   columns: Column<T>[];
//   data: T[];
//   loading?: boolean;
// }

// export function DataTableMobile<T>({ columns, data, loading }: Props<T>) {
//   const actionColumn = columns.find((c) => c.key === "action");

//   return (
//     <div className="md:hidden overflow-y-auto max-h-[80vh] space-y-4 p-4">
//       {/* ----------------------------- */}
//       {/* LOADING (ShadCN Skeleton)     */}
//       {/* ----------------------------- */}
//       {loading ? (
//         [...Array(4)].map((_, i) => (
//           <div
//             key={i}
//             className="bg-[#F4FAFF] p-4 rounded-2xl border border-blue-100 space-y-3"
//           >
//             {/* Title skeleton */}
//             <div className="space-y-1">
//               <Skeleton className="h-3 w-24" />
//               <Skeleton className="h-4 w-40" />
//             </div>

//             {/* Second field skeleton */}
//             <div className="space-y-1">
//               <Skeleton className="h-3 w-28" />
//               <Skeleton className="h-4 w-32" />
//             </div>

//             {/* Bottom buttons skeleton */}
//             <div className="flex items-center justify-between pt-2">
//               <Skeleton className="h-4 w-20" />

//               <div className="flex items-center gap-2">
//                 <Skeleton className="h-6 w-14 rounded-full" />
//                 <Skeleton className="h-6 w-10 rounded-full" />
//               </div>
//             </div>
//           </div>
//         ))
//       ) : data.length === 0 ? (
//         <p className="text-center text-gray-500 py-4">No records found</p>
//       ) : (
//         /* ----------------------------- */
//         /* DATA CARDS (unchanged)        */
//         /* ----------------------------- */
//         data.map((row: any, i) => (
//           <div
//             key={i}
//             className="bg-[#F4FAFF] p-4 rounded-2xl shadow-sm border border-blue-100 space-y-3"
//           >
//             {/* dynamic key-value pairs */}
//             {columns
//               .filter((c) => c.key !== "action")
//               .map((col) => (
//                 <div key={col.key} className="flex flex-col">
//                   <span className="text-[12px] font-semibold text-gray-700">
//                     {col.label}
//                   </span>

//                   <span className="text-[14px] font-semibold text-blue-600">
//                     {col.render ? col.render(row) : (row[col.key] ?? "-")}
//                   </span>
//                 </div>
//               ))}

//             {/* bottom */}
//             <div className="flex items-center justify-between pt-2">
//               <button className="text-blue-600 text-[14px]">View More</button>

//               <div className="flex items-center gap-2">
//                 {row.status && (
//                   <span
//                     className={`px-3 py-1 text-xs rounded-full ${
//                       row.status === "Active"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {row.status}
//                   </span>
//                 )}

//                 {actionColumn?.render && actionColumn.render(row)}
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";
import { useState } from "react";
import { MobileViewMoreDialog } from "./MobileViewMoreDialog";
import { MoveRight, SquareArrowOutUpRight } from "lucide-react";

interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T, i?: number) => React.ReactNode;
}

interface Props<T> {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
}

export function DataTableMobile<T>({ columns, data, loading }: Props<T>) {

    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const [viewMoreOpen, setViewMoreOpen] = useState(false);

    const actionColumn = columns.find((c) => c.key === "action");

    return (
        <div className="md:hidden overflow-y-auto max-h-[80vh] space-y-4 p-4">

            {/* ---------------------- */}
            {/* LOADING (ShadCN)       */}
            {/* ---------------------- */}
            {loading ? (
                [...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-[#F4FAFF] p-4 rounded-2xl border border-blue-100 space-y-4"
                    >
                        {[...Array(3)].map((_, r) => (
                            <div key={r} className="flex justify-between items-center">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        ))}

                        <div className="flex justify-between items-center pt-2">
                            <Skeleton className="h-4 w-20" />

                            <div className="flex items-center gap-2">
                                <Skeleton className="h-6 w-14 rounded-full" />
                                <Skeleton className="h-6 w-10 rounded-full" />
                            </div>
                        </div>
                    </div>
                ))
            ) : data.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No records found</p>
            ) : (
                /* ---------------------- */
                /* FINAL MOBILE CARD      */
                /* ---------------------- */
                data.map((row: any, i) => (
                    <div
                        key={i}
                        className="bg-[#F4FAFF] py-4 rounded-2xl shadow-sm border border-blue-100 "
                    >
                        <div className="px-4 space-y-4">
                            {/* dynamic rows */}
                            {columns
                                .filter((c) => c.key !== "action")
                                .map((col, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex justify-between items-center ${idx !== columns.length - 2 ? "border-b border-blue-100 pb-2" : ""
                                            }`}
                                    >
                                        {/* Label */}
                                        <span className="text-[13px] font-semibold text-gray-600">
                                            {col.label}
                                        </span>

                                        {/* Value */}
                                        <span className="text-[14px] font-semibold text-blue-700 text-right">
                                            {/* {col.render ? col.render(row) : (row[col.key] ?? "-")} */}
                                            {col.render ? col.render(row, i) : (row[col.key] ?? "-")}
                                        </span>
                                    </div>
                                ))}
                        </div>
                        {/* bottom: View More + Status + Action */}
                        <div className="flex items-center justify-between pt-2 border-t border-blue-100 px-4">
                            {/* View More */}
                            <button
                                className="text-blue-600 text-[14px] flex items-center"
                                onClick={() => {
                                    setSelectedRow(row);
                                    setViewMoreOpen(true);
                                }}
                            >
                                View More <SquareArrowOutUpRight className="ms-2w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-2">
                                {/* Status Pill */}
                                {row.status && (
                                    <span
                                        className={`px-3 py-1 text-xs rounded-full ${row.status === "Active"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {row.status}
                                    </span>
                                )}

                                {/* Action Button */}
                                {actionColumn?.render?.(row)}
                            </div>
                        </div>
                    </div>
                ))
            )}
            <MobileViewMoreDialog
                open={viewMoreOpen}
                onClose={() => setViewMoreOpen(false)}
                row={selectedRow}
                columns={columns}
            />

        </div>
    );
}


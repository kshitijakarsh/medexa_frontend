// "use client";

// import { Skeleton } from "@workspace/ui/components/skeleton";

// export function AppointmentTableSkeleton() {
//   return (
//     <div className="bg-white p-4 rounded-b-xl rounded-t-lg shadow-sm border mt-6">
//       {/* Header Pills skeleton */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex gap-3">
//           <Skeleton className="h-8 w-32 rounded-full" />
//           <Skeleton className="h-8 w-32 rounded-full" />
//           <Skeleton className="h-8 w-40 rounded-full" />
//         </div>

//         <Skeleton className="h-5 w-20" />
//       </div>

//       {/* Table header */}
//       <div className="grid grid-cols-6 gap-4 mb-3">
//         <Skeleton className="h-4 w-16" />
//         <Skeleton className="h-4 w-20" />
//         <Skeleton className="h-4 w-16" />
//         <Skeleton className="h-4 w-24" />
//         <Skeleton className="h-4 w-12" />
//         <Skeleton className="h-4 w-12" />
//       </div>

//       {/* Rows */}
//       <div className="space-y-3">
//         {[...Array(6)].map((_, i) => (
//           <div key={i} className="grid grid-cols-6 items-center gap-4 py-3">
//             <Skeleton className="h-4 w-10" />

//             {/* Avatar + text */}
//             <div className="flex items-center gap-3">
//               <Skeleton className="h-10 w-10 rounded-full" />
//               <div className="space-y-2">
//                 <Skeleton className="h-4 w-28" />
//                 <Skeleton className="h-3 w-16" />
//               </div>
//             </div>

//             <Skeleton className="h-4 w-16" />
//             <Skeleton className="h-4 w-28" />
//             <Skeleton className="h-4 w-16" />
//             <Skeleton className="h-6 w-20 rounded-full" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@workspace/ui/components/table";

export function AppointmentTableSkeleton() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border mt-6">
      {/* Tabs Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3">
          <Skeleton className="h-8 w-32 rounded-full" />
          <Skeleton className="h-8 w-32 rounded-full" />
          <Skeleton className="h-8 w-40 rounded-full" />
        </div>

        <Skeleton className="h-5 w-20" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {[...Array(6)].map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {[...Array(6)].map((_, i) => (
            <TableRow key={i}>
              {/* token */}
              <TableCell>
                <Skeleton className="h-4 w-12" />
              </TableCell>

              {/* Patient */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </TableCell>

              {/* Time */}
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>

              {/* Diagnosis */}
              <TableCell>
                <Skeleton className="h-4 w-28" />
              </TableCell>

              {/* Types */}
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>

              {/* Status */}
              <TableCell>
                <Skeleton className="h-6 w-24 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

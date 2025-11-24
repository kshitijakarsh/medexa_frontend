// import { Skeleton } from "@workspace/ui/components/skeleton";

// export function SkeletonBlock({ rows = 3 }: { rows?: number }) {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
//       {[...Array(rows)].map((_, i) => (
//         <Skeleton key={i} className="h-4 w-full" />
//       ))}
//     </div>
//   );
// }



// app/doctor-dashboard/components/ui/SkeletonBlock.tsx
"use client";
import { Skeleton } from "@workspace/ui/components/skeleton";

export function SkeletonBlock({ rows = 4, wide = false }: { rows?: number; wide?: boolean }) {
  return (
    <div className={`bg-white p-4 rounded-xl shadow-sm border ${wide ? "w-full" : ""}`}>
      {[...Array(rows)].map((_, i) => (
        <div className="mb-3" key={i}><Skeleton className="h-4 w-full" /></div>
      ))}
    </div>
  );
}

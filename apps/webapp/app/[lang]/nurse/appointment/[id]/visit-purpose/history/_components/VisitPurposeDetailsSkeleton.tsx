"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

export function VisitPurposeDetailsSkeleton() {
  return (
    <div className="p-6 bg-[#F1F9FF] rounded-xl shadow-md">
      {/* Date + recorder */}
      <Skeleton className="h-4 w-40 mb-2" />
      <Skeleton className="h-3 w-32" />

      {/* Grid layout */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* 4 boxes */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border rounded-lg p-4">
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}

        {/* History row full width */}
        <div className="col-span-2 bg-white border rounded-lg p-4">
          <Skeleton className="h-3 w-40 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>

        {/* Notes full width */}
        <div className="col-span-2 bg-white border rounded-lg p-4">
          <Skeleton className="h-3 w-32 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

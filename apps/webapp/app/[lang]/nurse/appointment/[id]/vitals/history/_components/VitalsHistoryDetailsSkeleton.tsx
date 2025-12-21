"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

export function VitalsHistoryDetailsSkeleton() {
  return (
    <div className="p-6 bg-[#F1F9FF] rounded-xl shadow-md space-y-6">
      {/* Date + Recorder */}
      <div>
        <Skeleton className="h-4 w-40 mb-2" />
        <Skeleton className="h-3 w-56" />
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="bg-white border rounded-xl p-4">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
      </div>

      {/* Additional Note */}
      <div className="bg-white border rounded-xl p-4">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

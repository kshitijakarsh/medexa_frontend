"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

export function VitalCardsGridSkeleton() {
  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-40" />

        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-64 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* VITALS GRID */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-xl p-4 bg-white flex items-center gap-4"
          >
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>

      {/* ADDITIONAL NOTE */}
      <div className="mt-6">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
    </>
  );
}

// components/common/HistorySkeleton.tsx
"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

export function HistorySkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="border rounded-xl shadow-sm p-2 flex justify-between items-center"
        >
          <div className="w-full">
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>

          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      ))}
    </div>
  );
}

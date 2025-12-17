"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

export function AttachmentGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border rounded-xl p-3 bg-white">
          <Skeleton className="h-4 w-32 mb-3" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-4 w-16 mt-3 mx-auto" />
        </div>
      ))}
    </div>
  );
}

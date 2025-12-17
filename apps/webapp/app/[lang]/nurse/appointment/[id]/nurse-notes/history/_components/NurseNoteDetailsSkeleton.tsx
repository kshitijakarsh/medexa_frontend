"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

export function NurseNoteDetailsSkeleton() {
  return (
    <div className="p-6 bg-[#F1F9FF] rounded-xl shadow-md">
      {/* Date + recorder */}
      <Skeleton className="h-4 w-40 mb-2" />
      <Skeleton className="h-3 w-48" />

      {/* Note box */}
      <div className="mt-6 bg-white border rounded-lg p-4">
        <Skeleton className="h-3 w-32 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

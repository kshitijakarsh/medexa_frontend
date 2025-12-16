"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

export function AttachmentHistoryDetailsSkeleton() {
  return (
    <div className="p-6 bg-[#F1F9FF] rounded-xl shadow-md space-y-6">
      <div>
        <Skeleton className="h-4 w-40 mb-2" />
        <Skeleton className="h-3 w-56" />
      </div>

      <div className="bg-white border rounded-xl p-4">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    </div>
  );
}

"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

export default function NurseNoteCardSkeleton() {
  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm">
      <div className="flex items-start gap-4">
        {/* Avatar Skeleton */}
        <Skeleton className="w-14 h-14 rounded-full" />

        <div className="flex-1 space-y-2">
          {/* Name */}
          <Skeleton className="h-4 w-40" />

          {/* Time */}
          <Skeleton className="h-3 w-28" />

          {/* Note Lines */}
          <div className="space-y-2 pt-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-[95%]" />
            <Skeleton className="h-3 w-[90%]" />
          </div>
        </div>
      </div>
    </div>
  );
}

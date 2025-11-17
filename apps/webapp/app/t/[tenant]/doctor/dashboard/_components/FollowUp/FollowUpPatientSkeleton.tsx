"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";
import { CardBlock } from "../ui/CardBlock";

export function FollowUpPatientSkeleton() {
  return (
    <CardBlock
      className="
        px-4 py-4 
        rounded-2xl 
        border border-[#E5EAF0]
        shadow-sm
        space-y-3
      "
    >
      {/* Row 1 */}
      <div className="flex items-start gap-3">
        {/* Avatar + badge */}
        <div className="relative">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full absolute -top-2 -left-2" />
        </div>

        {/* Name + MRN */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>

        {/* Status pill */}
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Row 2 */}
      <div className="flex items-center justify-between">
        {/* Time + room */}
        <Skeleton className="h-4 w-24" />
        {/* Follow up pill */}
        <Skeleton className="h-4 w-20 rounded-full" />
      </div>
    </CardBlock>
  );
}

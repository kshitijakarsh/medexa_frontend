"use client";

import { CardBlock } from "@/components/common/pasient-card/card-block";
import { Skeleton } from "@workspace/ui/components/skeleton";

export function VipPatientSkeleton() {
  return (
    <CardBlock
      className="
        px-4 py-4 
        rounded-2xl 
        border border-[#E5EAF0]
        space-y-3
      "
    >
      {/* ROW 1 */}
      <div className="flex items-center gap-3">
        {/* Avatar + Crown */}
        <div className="relative">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full absolute -top-2 -left-2" />
        </div>

        {/* Name + MRN */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>

        {/* Status Pill */}
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* ROW 2 */}
      <div className="flex items-center justify-between">
        {/* Time + Room */}
        <Skeleton className="h-4 w-24" />

        {/* Type */}
        <Skeleton className="h-4 w-16" />
      </div>
    </CardBlock>
  );
}

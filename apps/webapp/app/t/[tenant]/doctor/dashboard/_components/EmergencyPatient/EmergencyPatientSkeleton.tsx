// app/doctor-dashboard/components/EmergencyPatientSkeleton.tsx
"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

export function EmergencyPatientSkeleton() {
  return (
    <div className="bg-white border border-[#E6E6E6] rounded-xl px-4 py-4 w-[310px] flex-shrink-0">
      <div className="flex items-center gap-3">
        <Skeleton className="w-[46px] h-[46px] rounded-full" />

        <div className="flex flex-col flex-1">
          <Skeleton className="h-4 w-[120px] mb-2" />
          <Skeleton className="h-3 w-[80px]" />
        </div>

        <Skeleton className="h-6 w-[75px] rounded-full" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-3 w-[120px]" />
        <Skeleton className="h-3 w-[70px]" />
      </div>
    </div>
  );
}

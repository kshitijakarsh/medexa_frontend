// app/doctor-dashboard/components/appointments/AppointmentCardSkeleton.tsx
"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

export default function AppointmentCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E6F3FF] p-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="relative">
          <Skeleton className="h-11 w-11 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full absolute -top-2 -left-2" />
        </div>

        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>

        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

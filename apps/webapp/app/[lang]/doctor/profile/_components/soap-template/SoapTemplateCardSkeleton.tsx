"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

export function SoapTemplateCardSkeleton() {
  return (
    <div className="bg-blue-50 border rounded-xl p-4 flex justify-between items-center">
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-1/3" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-24 rounded-full bg-white" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}

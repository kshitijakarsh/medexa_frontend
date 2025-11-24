import { Skeleton } from "@workspace/ui/components/skeleton";

export function AppointmentDetailSkeleton() {
  return (
    <div className="flex-1 space-y-4">
      <Skeleton className="h-16 rounded-xl" />
      <Skeleton className="h-10 rounded-xl w-full" />
      <Skeleton className="h-[300px] rounded-xl" />
    </div>
  )
}

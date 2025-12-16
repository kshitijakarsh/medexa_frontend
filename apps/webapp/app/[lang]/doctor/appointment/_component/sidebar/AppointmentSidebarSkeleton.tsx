import { Skeleton } from "@workspace/ui/components/skeleton";

export function AppointmentSidebarSkeleton() {
  return (
    <div className="w-[300px] space-y-4">
      <Skeleton className="h-6 w-32" />

      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

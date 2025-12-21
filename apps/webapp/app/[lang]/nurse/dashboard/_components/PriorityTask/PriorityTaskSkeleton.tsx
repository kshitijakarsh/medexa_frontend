export function PriorityTaskSkeleton() {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-48"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
      </div>
      <div className="mt-2 flex items-center gap-4">
        <div className="h-3 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
}

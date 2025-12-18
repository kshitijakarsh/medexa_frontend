export function RecentPatientSkeleton() {
  return (
    <div className="bg-white border border-[#E6E6E6] rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

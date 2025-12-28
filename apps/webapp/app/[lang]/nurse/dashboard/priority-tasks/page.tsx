"use client";

import { Suspense } from "react";
import { useNurseOrdersQuery } from "../_components/api";
import { PriorityTaskCard } from "../_components/PriorityTask/PriorityTaskCard";
import { PriorityTaskSkeleton } from "../_components/PriorityTask/PriorityTaskSkeleton";

function PriorityTasksPageContent() {
  const { data, isLoading } = useNurseOrdersQuery({
    page: 1,
    limit: 50,
  });

  const orders = data?.data ?? [];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">All Priority Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">View all nurse orders</p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 9 }).map((_, i) => (
                <PriorityTaskSkeleton key={i} />
              ))
            : orders.map((task: any) => (
                <PriorityTaskCard key={task.id} task={task} />
              ))}
        </div>

        {/* Empty State */}
        {!isLoading && orders.length === 0 && (
          <div className="bg-gray-50 border border-[#E6E6E6] rounded-xl p-12 text-center">
            <div className="text-gray-400 text-5xl mb-3">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No Priority Tasks
            </h3>
            <p className="text-sm text-gray-500">
              There are no nurse orders to display.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PriorityTasksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PriorityTasksPageContent />
    </Suspense>
  );
}

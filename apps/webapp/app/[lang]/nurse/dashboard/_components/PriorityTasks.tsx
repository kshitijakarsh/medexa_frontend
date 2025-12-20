"use client";

import Link from "next/link";
import { PriorityTaskCard } from "./PriorityTask/PriorityTaskCard";
import { PriorityTaskSkeleton } from "./PriorityTask/PriorityTaskSkeleton";
import { useNurseOrdersQuery } from "./api";

export default function PriorityTasks() {
  const { data, isLoading } = useNurseOrdersQuery({
    page: 1,
    limit: 5,
  });

  const items = data?.data ?? [];

  return (
    <div className="border border-[#CFE9FF] bg-white rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-base font-semibold">Priority Tasks</div>
        <Link
          href="/nurse/dashboard/priority-tasks"
          className="text-sm text-[#0B84FF] font-medium hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {isLoading
          ? [...Array(5)].map((_, i) => <PriorityTaskSkeleton key={i} />)
          : items.map((task: any) => (
              <PriorityTaskCard key={task.id} task={task} />
            ))}
      </div>
    </div>
  );
}

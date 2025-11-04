"use client";

import { DashboardCard } from "./dashboard-card";

interface DashboardSectionProps {
  title: string;
  items: {
    title: string;
    subtitle: string;
    active: number;
  }[];
}

export function DashboardSection({ title, items }: DashboardSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <DashboardCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

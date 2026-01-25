"use client";

import { DashboardCard } from "./dashboard-card";

interface DashboardSectionProps {
  title: string;
  items: {
    id: string;
    title: string;
    subtitle: string;
    active: number;
  }[];
  id?: string;
  onAction?: (id: string, option: string) => void;
}

export function DashboardSection({ title, items, onAction }: DashboardSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700  pt-3">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <DashboardCard key={item.id} {...item} onAction={onAction} />
        ))}
      </div>
    </div>
  );
}

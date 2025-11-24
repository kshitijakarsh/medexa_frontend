// app/doctor-dashboard/components/ui/DashboardSectionCard.tsx
"use client";

import { ReactNode } from "react";

export function DashboardSectionCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-[#CFE9FF] bg-white rounded-xl p-4 ${className}`}
    >
      {children}
    </div>
  );
}

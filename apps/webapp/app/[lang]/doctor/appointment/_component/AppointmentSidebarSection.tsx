
"use client";

import AppointmentCard from "@/components/common/pasient-card/appointment-card";
import { AppointmentItem } from "./types/appointment";

interface AppointmentSidebarSectionProps {
  title: string;
  color: string;
  items: AppointmentItem[];
  activeId?: string;
  onSelect: (item: AppointmentItem) => void;
}

export function AppointmentSidebarSection({
  title,
  color,
  items,
  activeId,
  onSelect
}: AppointmentSidebarSectionProps) {
  return (
    <div>
      <div className="text-xs font-semibold mb-1" style={{ color }}>
        {title}
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <AppointmentCard
            key={item.id}
            item={item}
            selected={activeId === item.id}
            onClick={() => onSelect(item)}
          />
        ))}
      </div>
    </div>
  );
}

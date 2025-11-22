// app/doctor-dashboard/components/ui/TimeRoomInfo.tsx
"use client";

import { Clock } from "lucide-react";

interface TimeRoomInfoProps {
  time: string;
  room?: string;
  iconSize?: number;
  timeColor?: string;
  roomColor?: string;
  prefixRoom?: string;  // example: "Room " → "Room T-101"
  className?: string;
}

export function TimeRoomInfo({
  time,
  room,
  iconSize = 14,
  timeColor = "text-gray-500",
  roomColor = "text-[#17B26D]",
  prefixRoom = "",
  className = "",
}: TimeRoomInfoProps) {
  return (
    <div className={`text-xs flex items-center gap-1 ${className}`}>
      <Clock size={iconSize} className="text-gray-400" />

      <span className={timeColor}>{time}</span>

      {room && (
        <span className={`${roomColor} font-medium`}>
          {prefixRoom}{room}
        </span>
      )}
    </div>
  );
}

// components/common/HistoryCard.tsx
"use client";

import { Card, CardContent } from "@workspace/ui/components/card";
import { Eye } from "lucide-react";

interface HistoryCardProps {
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export function HistoryCard({ title, subtitle, onClick }: HistoryCardProps) {
  return (
    <Card
      onClick={onClick}
      className="border rounded-xl shadow-sm hover:bg-gray-50 cursor-pointer transition p-3"
    >
      <CardContent className=" flex items-center justify-between">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>

        <Eye className="w-5 h-5 text-gray-500" />
      </CardContent>
    </Card>
  );
}

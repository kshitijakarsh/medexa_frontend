"use client";

import { CardBlock } from "@/components/common/pasient-card/card-block";
import { ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}
export function SectionCard({ children, className = "" }: SectionCardProps) {
  return (
    <CardBlock
      className={`bg-white rounded-2xl border border-[#E6F3FF] shadow-sm p-4 ${className}`}
    >
      {children}
    </CardBlock>
  );
}

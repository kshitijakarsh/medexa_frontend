// app/doctor-dashboard/components/ui/SectionTitle.tsx
"use client";

import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5";
  className?: string;
}

const sizeMap = {
  h1: "text-3xl font-bold",
  h2: "text-2xl font-semibold",
  h3: "text-lg font-semibold",
  h4: "text-base font-semibold",
  h5: "text-sm font-semibold",
};

export function SectionTitle({
  children,
  as = "h4",
  className = "",
}: SectionTitleProps) {
  const Tag = as;
  const sizeClass = sizeMap[as];

  return <Tag className={`${sizeClass} ${className}`}>{children}</Tag>;
}

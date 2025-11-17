"use client";

import { ReactNode } from "react";

export function CardBlock({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        bg-white 
        rounded-xl 
        border 
        border-[#E6E6E6] 
        shadow-[0_1px_3px_rgba(0,0,0,0.05)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

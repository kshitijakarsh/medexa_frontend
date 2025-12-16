"use client";

import { ReactNode } from "react";

export function SectionWrapper({
  header,
  children,
}: {
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col w-full bg-white rounded-2xl">
      
      {/* HEADER */}
      <div className="border-b border-gray-200 px-4 py-3">
        {header}
      </div>

      {/* BODY */}
      <div className="p-4">
        {children}
      </div>
      
    </div>
  );
}

"use client";

import { Input } from "@workspace/ui/components/input";
import { Search } from "lucide-react";
import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string; // e.g., "220px", "100%", "15rem"
  icon?: React.ReactNode; // for flexibility
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  width = "220px",
  icon = <Search className="h-4 w-4 text-gray-400" />,
  className = "",
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`} style={{ width }}>
      <Input
        placeholder={placeholder}
        className="pr-9 pl-3 py-2 rounded-lg border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute right-3 top-2.5">{icon}</div>
    </div>
  );
}

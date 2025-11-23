// "use client";

// import { Input } from "@workspace/ui/components/input";
// import { Search } from "lucide-react";
// import React from "react";

// interface SearchInputProps {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
//   width?: string; // e.g., "220px", "100%", "15rem"
//   icon?: React.ReactNode; // for flexibility
//   className?: string;
// }

// export default function SearchInput({
//   value,
//   onChange,
//   placeholder = "Search...",
//   width = "220px",
//   icon = <Search className="h-4 w-4 text-gray-400" />,
//   className = "",
// }: SearchInputProps) {
//   return (
//     <div className={`relative ${className}`} style={{ width }}>
//       <Input
//         placeholder={placeholder}
//         className="pr-9 pl-3 py-2 rounded-lg border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />
//       <div className="absolute right-3 top-2.5">{icon}</div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Search, X } from "lucide-react";
import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;        // fires immediately (typing)
  onSearch?: (value: string) => void;       // fires AFTER debounce
  placeholder?: string;
  width?: string;
  icon?: React.ReactNode;
  className?: string;
  debounceTime?: number;                     // default: 300ms
  minChars?: number;                         // default: 3 chars before firing
}

export default function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  width = "220px",
  icon = <Search className="h-4 w-4 text-gray-400" />,
  className = "",
  debounceTime = 300,
  minChars = 3,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(value);

  // Sync internal state when parent updates value externally
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Debounce search behavior
  useEffect(() => {
    const t = setTimeout(() => {
      if (onSearch) {
        if (internalValue.length >= minChars || internalValue.length === 0) {
          onSearch(internalValue);
        }
      }
    }, debounceTime);

    return () => clearTimeout(t);
  }, [internalValue, debounceTime, minChars, onSearch]);

  const handleChange = (val: string) => {
    setInternalValue(val);
    onChange(val); // still fires instantly so parent UI updates
  };

  const clearInput = () => {
    setInternalValue("");
    onChange("");
    if (onSearch) onSearch("");
  };

  return (
    <div className={`relative ${className}`} style={{ width }}>
      <Input
        placeholder={placeholder}
        className={`pr-9 pl-3 py-2 rounded-lg border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0`}
        value={internalValue}
        onChange={(e) => handleChange(e.target.value)}
      />

      {/* Icons */}
      <div className="absolute right-3 top-2.5 flex items-center gap-1">
        {internalValue ? (
          <X
            className="h-3.5 w-3.5 text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={clearInput}
          />
        ) : (
          icon
        )}
      </div>
    </div>
  );
}

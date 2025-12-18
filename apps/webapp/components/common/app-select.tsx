"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";
import { FieldError } from "@workspace/ui/hooks/use-form";
import { Input } from "@workspace/ui/components/input";
import { Search } from "lucide-react";

interface AppSelectProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  error?: FieldError;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (search: string) => void;
}

export function AppSelect({
  placeholder = "Select",
  value,
  onChange,
  options,
  error,
  triggerClassName = "",
  contentClassName = "",
  itemClassName = "",
  disabled = false,
  icon,
  searchable = false,
  searchPlaceholder = "Search...",
  onSearchChange,
}: AppSelectProps) {
  const hasError = !!error;
  const [searchQuery, setSearchQuery] = useState("");

  // Get the selected option label
  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label || placeholder;

  // Filter options based on search query
  const filteredOptions = searchable && searchQuery
    ? options.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : options;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearchQuery(newSearch);
    if (onSearchChange) {
      onSearchChange(newSearch);
    }
  };

  return (
    <Select onValueChange={onChange} value={value} disabled={disabled}>
      <SelectTrigger
        className={`w-full text-sm rounded-md ${hasError ? "border-red-500 focus:ring-red-500" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${triggerClassName}`}
      >
        <div className="flex items-center gap-2 flex-1">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className={`flex-1 text-left ${!selectedOption ? 'text-muted-foreground' : ''}`}>
            {displayText}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        {searchable && (
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-9 h-9"
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
                autoFocus
              />
            </div>
          </div>
        )}
        {filteredOptions.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className={itemClassName}
          >
            {opt.label}
          </SelectItem>
        ))}
        {searchable && filteredOptions.length === 0 && (
          <div className="p-2 text-sm text-gray-500 text-center">
            No results found
          </div>
        )}
      </SelectContent>
    </Select>

  );
}

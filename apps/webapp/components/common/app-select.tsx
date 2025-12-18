"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";
import { FieldError } from "@workspace/ui/hooks/use-form";

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
}: AppSelectProps) {
  const hasError = !!error;

  // Get the selected option label
  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label || placeholder;

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
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className={itemClassName}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

  );
}

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
}: AppSelectProps) {
  const hasError = !!error;

  return (
        <Select onValueChange={onChange} defaultValue={value} disabled={disabled}>
          <SelectTrigger
            className={`w-full text-sm rounded-md ${
              hasError ? "border-red-500 focus:ring-red-500" : ""
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${triggerClassName}`}
          >
            <SelectValue placeholder={placeholder} />
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

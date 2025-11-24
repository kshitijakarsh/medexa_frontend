// components/common/async-select/AsyncSelect.tsx
"use client";

import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@workspace/ui/components/popover";

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@workspace/ui/components/command";

import { Button } from "@workspace/ui/components/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { useVirtualizer } from "@tanstack/react-virtual";

interface Option {
  label: string;
  value: string;
}

interface AsyncSelectProps {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  options: Option[];
  loading?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  onSearch?: (q: string) => void;
}

export const AsyncSelect: React.FC<AsyncSelectProps> = ({
  value,
  onChange,
  placeholder = "Select...",
  options,
  loading,
  hasNextPage,
  fetchNextPage,
  onSearch,
}) => {
  const [open, setOpen] = React.useState(false);
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  // Infinite Scroll Trigger
  React.useEffect(() => {
    const last = rowVirtualizer.getVirtualItems().slice(-1)[0];
    if (!last) return;

    if (
      last.index >= options.length - 1 &&
      hasNextPage &&
      !loading
    ) {
      fetchNextPage?.();
    }
  }, [
    rowVirtualizer.getVirtualItems(),
    hasNextPage,
    loading,
    fetchNextPage,
    options.length,
  ]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full" asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between text-left"
        >
          {options.find((o) => o.value === value)?.label || placeholder}
          <ChevronsUpDown className="w-4 h-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="p-0 w-[var(--radix-popover-trigger-width)]"
      >
        <Command>
          <CommandInput
            placeholder="Search..."
            onValueChange={onSearch}
          />

          <CommandList
            ref={parentRef}
            className="max-h-64 overflow-y-auto"
          >
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              <div
                style={{
                  height: rowVirtualizer.getTotalSize(),
                  width: "100%",
                  position: "relative",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((v) => {
                  const item = options[v.index];
                  if (!item) return null;

                  return (
                    <div
                      key={item.value}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${v.start}px)`,
                      }}
                    >
                      <CommandItem
                        onSelect={() => {
                          onChange?.(item.value);
                          setOpen(false);
                        }}
                        className={cn(
                          "px-3 py-2 cursor-pointer",
                          item.value === value && "bg-blue-100"
                        )}
                      >
                        {item.label}
                        {item.value === value && (
                          <Check className="ml-auto h-4 w-4 text-green-500" />
                        )}
                      </CommandItem>
                    </div>
                  );
                })}
              </div>
            </CommandGroup>

            {loading && (
              <div className="p-3 text-center text-sm text-gray-500">
                Loading...
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

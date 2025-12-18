"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

interface Option {
  label: string
  value: string
}

interface SearchableSelectProps {
  label?: string
  placeholder?: string
  options: Option[]
  value?: string
  onChange?: (value: string) => void
  onSearch?: (search: string) => void
  loading?: boolean
  disabled?: boolean
  required?: boolean
  className?: string
}

export function SearchableSelect({
  label,
  placeholder = "Select...",
  options,
  value,
  onChange,
  onSearch,
  loading = false,
  disabled = false,
  required = false,
  className,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  const onSearchRef = React.useRef(onSearch)
  const hasSearchedRef = React.useRef(false)

  // Keep ref updated with latest onSearch callback
  React.useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  const handleSelect = (val: string) => {
    onChange?.(val)
    setOpen(false)
    setSearchValue("") // Clear search when selecting
    hasSearchedRef.current = false
  }

  const selectedLabel = options.find((o) => o.value === value)?.label

  // Debounce search and call onSearch callback only when dropdown is open and user types
  React.useEffect(() => {
    // Only search if dropdown is open
    if (!open) {
      return
    }

    // Skip if search value is empty (initial state or after clearing)
    // The initial data is already loaded by the parent component
    if (!searchValue.trim()) {
      return
    }

    const timeoutId = setTimeout(() => {
      if (onSearchRef.current) {
        onSearchRef.current(searchValue.trim())
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchValue, open])

  // Reset search when dropdown closes
  React.useEffect(() => {
    if (!open) {
      setSearchValue("")
      hasSearchedRef.current = false
    }
  }, [open])

  return (
    <div className={cn("flex flex-col w-full space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            disabled={disabled || loading}
            className={cn(
              "justify-between w-full text-left font-normal border-gray-300 hover:border-gray-400",
              !value && "text-muted-foreground"
            )}
          >
            {loading
              ? "Loading..."
              : selectedLabel || placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 bg-white border border-gray-200 rounded-lg shadow-lg w-[var(--radix-popover-trigger-width)]"
          align="start"
        >
          <Command shouldFilter={false}>
            <div className="relative">
              <CommandInput
                placeholder="Search..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
            </div>
            <CommandList className="max-h-56 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  Loading...
                </div>
              ) : (
                <>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((opt) => (
                      <CommandItem
                        key={opt.value}
                        value={opt.value}
                        onSelect={() => handleSelect(opt.value)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-blue-50",
                          value === opt.value && "bg-blue-100"
                        )}
                      >
                        <span>{opt.label}</span>
                        {value === opt.value && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}


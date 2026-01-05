// "use client";

// import * as React from "react";
// import { Check, ChevronsUpDown, Search } from "lucide-react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@workspace/ui/components/popover";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@workspace/ui/components/command";
// import { Button } from "@workspace/ui/components/button";
// import { cn } from "@workspace/ui/lib/utils";

// interface Option {
//   label: string;
//   value: string;
// }

// interface DynamicSelectProps {
//   label?: string;
//   placeholder?: string;
//   options: Option[];
//   value?: string | string[];
//   onChange?: (value: string | string[]) => void;
//   searchable?: boolean;
//   multi?: boolean;
//   disabled?: boolean;
//   className?: string;
// }

// export const DynamicSelect: React.FC<DynamicSelectProps> = ({
//   label,
//   placeholder = "Select...",
//   options,
//   value,
//   onChange,
//   searchable = true,
//   multi = false,
//   disabled = false,
//   className,
// }) => {
//   const [open, setOpen] = React.useState(false);

//   const handleSelect = (val: string) => {
//     if (multi) {
//       const current = (value as string[]) || [];
//       if (current.includes(val)) {
//         onChange?.(current.filter((v) => v !== val));
//       } else {
//         onChange?.([...current, val]);
//       }
//     } else {
//       onChange?.(val);
//       setOpen(false);
//     }
//   };

//   const isSelected = (val: string) => {
//     if (multi) return (value as string[])?.includes(val);
//     return value === val;
//   };

//   const selectedLabels = multi
//     ? options
//         .filter((o) => (value as string[])?.includes(o.value))
//         .map((o) => o.label)
//         .join(", ")
//     : options.find((o) => o.value === value)?.label;

//   return (
//     <div className={cn("flex flex-col w-full", className)}>
//       {label && (
//         <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
//       )}

//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             disabled={disabled}
//             className={cn(
//               "justify-between w-full text-left font-normal border-gray-300 hover:border-gray-400",
//               !value && "text-muted-foreground"
//             )}
//           >
//             {selectedLabels || placeholder}
//             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent
//           className="p-0 w-[280px] bg-white border border-gray-200 rounded-lg shadow-lg"
//           align="start"
//         >
//           <Command>
//             {searchable && (
//               <div className="relative">
//                 <CommandInput placeholder="Search..." />
//                 <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
//               </div>
//             )}
//             <CommandList className="max-h-56 overflow-y-auto">
//               <CommandEmpty>No results found.</CommandEmpty>
//               <CommandGroup>
//                 {options.map((opt) => (
//                   <CommandItem
//                     key={opt.value}
//                     onSelect={() => handleSelect(opt.value)}
//                     className={cn(
//                       "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-blue-50",
//                       isSelected(opt.value) && "bg-blue-100"
//                     )}
//                   >
//                     <span>{opt.label}</span>
//                     {isSelected(opt.value) && (
//                       <Check className="w-4 h-4 text-green-500" />
//                     )}
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };



// /components/common/DynamicSelect.tsx
"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface DynamicSelectProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  searchable?: boolean;
  multi?: boolean;
  disabled?: boolean;
  className?: string;
}

export const DynamicSelect: React.FC<DynamicSelectProps> = ({
  label,
  placeholder = "Select...",
  options,
  value,
  onChange,
  searchable = true,
  multi = false,
  disabled = false,
  className,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (val: string) => {
    if (multi) {
      const current = (value as string[]) || [];
      if (current.includes(val)) {
        onChange?.(current.filter((v) => v !== val));
      } else {
        onChange?.([...current, val]);
      }
    } else {
      onChange?.(val);
      setOpen(false);
    }
  };

  const isSelected = (val: string) => {
    if (multi) return (value as string[])?.includes(val);
    return value === val;
  };

  const selectedLabels = multi
    ? (() => {
      const selected = (value as string[]) || [];
      if (selected.length === 0) return null;
      if (selected.length === 1) {
        return options.find((o) => o.value === selected[0])?.label;
      }
      return `${selected.length} selected`;
    })()
    : options.find((o) => o.value === value)?.label;

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            disabled={disabled}
            className={cn(
              "justify-between w-full text-left font-normal border-gray-300 hover:border-gray-400",
              !value && "text-muted-foreground"
            )}
          >
            {selectedLabels || placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        {/* <PopoverContent
          className="p-0 w-[280px] bg-white border border-gray-200 rounded-lg shadow-lg"
          align="start"
        > */}
        <PopoverContent
          className="p-0 bg-white border border-gray-200 rounded-lg shadow-lg w-[var(--radix-popover-trigger-width)]"
          align="start"
          onWheel={(e) => e.stopPropagation()}
        >
          <Command>
            {searchable && (
              <div className="relative">
                <CommandInput placeholder="Search..." />
                {/* <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" /> */}
              </div>
            )}
            <CommandList className="max-h-56 overflow-y-auto overflow-x-hidden overscroll-contain">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    onSelect={() => handleSelect(opt.value)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-blue-50",
                      isSelected(opt.value) && "bg-blue-100"
                    )}
                  >
                    <span>{opt.label}</span>
                    {isSelected(opt.value) && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default DynamicSelect;

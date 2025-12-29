import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { cn } from "@workspace/ui/lib/utils";

interface FilterDropdownProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  options?: string[];
  onSelect?: (value: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  icon,
  label,
  value,
  options = [],
  onSelect,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 bg-white shadow-soft px-4 py-2 rounded-full text-sm text-slate-600 transition-all hover:bg-slate-50 outline-none">
          <span className="text-slate-500">{icon}</span>
          <span className={cn(value && "text-slate-900 font-medium")}>
            {value || label}
          </span>
          <ChevronDown size={14} className="ml-2 text-slate-400" />
        </button>
      </DropdownMenuTrigger>
      {options.length > 0 && (
        <DropdownMenuContent align="start">
          {options.map((option, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => onSelect?.(option)}
              className="cursor-pointer"
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

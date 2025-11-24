import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@workspace/ui/components/dropdown-menu";
import { ListFilter } from "lucide-react";

export function FilterDropdown({ value, onChange }: any) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="
            h-8 px-3 text-sm bg-white shadow-sm 
            border border-gray-200 rounded-lg 
            flex items-center justify-between 
            w-[100px]
          "
                >
                    <span className="text-sm">{value}</span>
                    <ListFilter size={16} className="text-gray-600" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[120px] p-1 text-sm">
                <DropdownMenuItem onClick={() => onChange("All")}>
                    All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onChange("Emergency")}>
                    Emergency
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onChange("VIP")}>
                    VIP
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onChange("General")}>
                    General
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

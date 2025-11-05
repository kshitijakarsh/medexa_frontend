import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";

interface NewButtonProps {
   handleClick: () => void; 
    name?: string;
    icon?: React.ReactNode; // for flexibility
    className?: string;
}

export default function NewButton({
    handleClick,
    name = "Add new",
    icon = <Plus className="text-green-600 w-4 h-4 bg-white rounded-full" />,
    className = "",
}: NewButtonProps) {
    return (
        <Button
            onClick={handleClick}
            className={`bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center gap-2 pr-0 rounded-[5.6rem] ${className}`}
        >
            {name}
            <span className="p-2 bg-green-600 rounded-full">{icon}</span>
        </Button>
    )
}
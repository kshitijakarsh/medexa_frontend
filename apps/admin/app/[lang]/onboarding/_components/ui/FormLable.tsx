
import { Label } from "@workspace/ui/components/label"

interface FormLabelProps {
    label: string
}

export const FormLabel = ({
    label,
}: FormLabelProps) => {
    return (
        <Label className="block text-sm font-medium text-slate-600 mb-1">
            {label}
        </Label>
    )
}
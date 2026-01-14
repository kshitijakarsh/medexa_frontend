"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import NewButton from "@/components/common/new-button";
import { useDictionary } from "@/i18n/use-dictionary";

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps {
    label: string;
    placeholder: string;
    options?: SelectOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    showAddButton?: boolean;
    onAddClick?: () => void;
    className?: string;
}

export const SelectField = ({
    label,
    placeholder,
    options = [],
    value,
    defaultValue,
    onChange,
    showAddButton = false,
    onAddClick,
    className,
}: SelectFieldProps) => {
    const dict = useDictionary();
    const common = dict.pages.surgery.common;
    return (
        <div className={`space-y-1.5 ${className || ""}`}>
            <label className="text-sm">{label}</label>
            <div className={showAddButton ? "flex gap-2" : ""}>
                <Select value={value} onValueChange={onChange} defaultValue={defaultValue}>
                    <SelectTrigger className="w-full bg-white border-slate-200 text-slate-500 text-sm h-10">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {showAddButton && (
                    <NewButton
                        name={dict.common.add}
                        handleClick={() => {
                            if (onAddClick) {
                                onAddClick();
                            } else {
                                console.log("Add item clicked");
                            }
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default SelectField;

"use client";

import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { cn } from "@workspace/ui/lib/utils";

export default function TabSwitcher({
    active,
    items,
    onChange,
    className,
}: {
    active: string;
    items: { label: string; value: string }[];
    onChange: (value: string) => void;
    className?: string;
}) {
    return (
        <Tabs value={active} onValueChange={onChange} className={className}>
            <TabsList className="bg-linear-to-r from-[#E8F0FF] to-[#ECFAFF] border border-[#C7DFFF] p-1 h-auto rounded-xl">
                {items.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className={cn(
                            "rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-200",
                            "data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md data-[state=active]:border-blue-100",
                            "data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-blue-600"
                        )}
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}

"use client";

import { Button } from "@workspace/ui/components/button";
import { useState } from "react";

interface DynamicTabsProps {
  tabs: { key: string; label: string }[];
  defaultTab?: string;
  onChange?: (key: string) => void;
  className?: string;
}

export function DynamicTabs({
  tabs,
  defaultTab,
  onChange,
  className = "",
}: DynamicTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key);

  const handleClick = (key: string) => {
    setActiveTab(key);
    onChange?.(key);
  };

  return (
    <div className={`flex gap-3 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <Button
            key={tab.key}
            type="button"
            variant={isActive ? "default" : "outline"}
            onClick={() => handleClick(tab.key)}
            className={`
              px-4 py-2 rounded-full text-sm transition cursor-pointer
              ${isActive 
                ? "bg-[#0B84FF] text-white hover:bg-[#0B84FF]" 
                : "bg-[#F1F6FB] text-[#5D7287] hover:bg-[#e7eff7]"
              }
            `}
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}

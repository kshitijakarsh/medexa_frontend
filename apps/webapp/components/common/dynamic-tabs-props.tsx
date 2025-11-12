"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";

interface DynamicTabsProps {
  tabs: { key: string; label: string }[];
  defaultTab?: string;
  onChange?: (key: string) => void;
}

export function DynamicTabs({
  tabs,
  defaultTab,
  onChange,
}: DynamicTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key);

  const handleClick = (key: string) => {
    setActiveTab(key);
    onChange?.(key);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          type="button"
          onClick={() => handleClick(tab.key)}
          className={`px-4 py-1.5 rounded-full text-sm border border-gray-200 cursor-pointer ${
            activeTab === tab.key
              ? "bg-blue-600 text-white hover:bg-blue-600"
              : "bg-white text-gray-600 hover:bg-blue-100"
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}

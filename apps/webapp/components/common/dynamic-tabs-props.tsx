"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@workspace/ui/components/button";

interface DynamicTabsProps {
  tabs: { key: string; label: string; count?: number }[];
  /** Default tab for uncontrolled mode */
  defaultTab?: string;
  /** Controlled mode: external active tab state */
  activeTab?: string;
  onChange?: (key: string) => void;
  variant?: "scroll" | "wrap";
  className?: string;
}

export function DynamicTabs({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onChange,
  variant = "wrap",
  className = "",
}: DynamicTabsProps) {
  // Internal state for uncontrolled mode
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.key);

  // Use controlled value if provided, otherwise use internal state
  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  // Sync internal state with defaultTab changes (for uncontrolled mode)
  useEffect(() => {
    if (!isControlled && defaultTab) {
      setInternalActiveTab(defaultTab);
    }
  }, [defaultTab, isControlled]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleClick = (key: string) => {
    if (!isControlled) {
      setInternalActiveTab(key);
    }
    onChange?.(key);
  };

  // Auto-scroll active tab into view
  useEffect(() => {
    if (variant === "scroll" && activeTab && tabRefs.current[activeTab]) {
      tabRefs.current[activeTab]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab, variant]);

  return (
    <div
      ref={scrollRef}
      className={`${variant === "scroll"
          ? "w-full overflow-x-auto whitespace-nowrap scrollbar-none pb-2"
          : "flex flex-wrap gap-2"
        } ${className}`}
    >
      <div className={variant === "scroll" ? "flex gap-2" : "flex flex-wrap gap-2"}>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            ref={(el) => {
              tabRefs.current[tab.key] = el;
            }}
            type="button"
            onClick={() => handleClick(tab.key)}
            className={`px-4 py-1.5 rounded-full text-sm border border-gray-200 cursor-pointer flex items-center gap-2
            ${activeTab === tab.key
                ? "bg-[#0086F8] text-white hover:bg-[#0086F8]"
                : "bg-white text-gray-600 hover:bg-blue-100"
              }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-2 py-1 rounded-full text-[10px] transition-colors bg-red-400 text-white`}>
                {tab.count}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { Button } from "@workspace/ui/components/button";

// interface DynamicTabsProps {
//   tabs: { key: string; label: string }[];
//   defaultTab?: string;
//   onChange?: (key: string) => void;
// }

// export function DynamicTabs({
//   tabs,
//   defaultTab,
//   onChange,
// }: DynamicTabsProps) {
//   const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key);

//   const handleClick = (key: string) => {
//     setActiveTab(key);
//     onChange?.(key);
//   };

//   return (
//     <div className="flex flex-wrap gap-2">
//       {tabs.map((tab) => (
//         <Button
//           key={tab.key}
//           type="button"
//           onClick={() => handleClick(tab.key)}
//           className={`px-4 py-1.5 rounded-full text-sm border border-gray-200 cursor-pointer ${
//             activeTab === tab.key
//               ? "bg-blue-600 text-white hover:bg-blue-600"
//               : "bg-white text-gray-600 hover:bg-blue-100"
//           }`}
//         >
//           {tab.label}
//         </Button>
//       ))}
//     </div>
//   );
// }



// "use client";

// import { useState } from "react";
// import { Button } from "@workspace/ui/components/button";

// interface DynamicTabsProps {
//   tabs: { key: string; label: string }[];
//   defaultTab?: string;
//   onChange?: (key: string) => void;
//   variant?: "scroll" | "wrap";   // 👈 NEW
// }

// export function DynamicTabs({
//   tabs,
//   defaultTab,
//   onChange,
//   variant = "wrap",
// }: DynamicTabsProps) {
//   const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key);

//   const handleClick = (key: string) => {
//     setActiveTab(key);
//     onChange?.(key);
//   };

//   return (
//     <div
//       className={
//         variant === "scroll"
//           ? "w-full overflow-x-auto whitespace-nowrap scrollbar-hide pb-2"
//           : "flex flex-wrap gap-2"
//       }
//     >
//       <div className={variant === "scroll" ? "flex gap-2" : "flex flex-wrap gap-2"}>
//         {tabs.map((tab) => (
//           <Button
//             key={tab.key}
//             type="button"
//             onClick={() => handleClick(tab.key)}
//             className={`px-4 py-1.5 rounded-full text-sm border border-gray-200 cursor-pointrer
//                ${activeTab === tab.key
//                 ? "bg-blue-600 text-white hover:bg-blue-600"
//                 : "bg-white text-gray-600 hover:bg-blue-100"
//               }`}
//           >
//             {tab.label}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@workspace/ui/components/button";

interface DynamicTabsProps {
  tabs: { key: string; label: string }[];
  defaultTab?: string;
  onChange?: (key: string) => void;
  variant?: "scroll" | "wrap";
}

export function DynamicTabs({
  tabs,
  defaultTab,
  onChange,
  variant = "wrap",
}: DynamicTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key);

  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleClick = (key: string) => {
    setActiveTab(key);
    onChange?.(key);
  };

  // 🔥 Auto-scroll active tab into view
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
      className={
        variant === "scroll"
          ? "w-full overflow-x-auto whitespace-nowrap scrollbar-none pb-2"
          : "flex flex-wrap gap-2"
      }
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
            className={`px-4 py-1.5 rounded-full text-sm border border-gray-200 cursor-pointer
            ${
              activeTab === tab.key
                ? "bg-[#0086F8] text-white hover:bg-[#0086F8]"
                : "bg-white text-gray-600 hover:bg-blue-100"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}


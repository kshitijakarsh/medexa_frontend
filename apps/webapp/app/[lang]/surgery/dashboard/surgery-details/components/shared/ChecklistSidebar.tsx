import React from "react";
import { ArrowRight } from "lucide-react";
import { PREOP_SIDEBAR_ITEMS, PREOP_SIDEBAR_HEADER } from "@/app/[lang]/surgery/_lib/constants";
import { PreOpSidebarItem, PreOpSidebarHeader } from "@/app/[lang]/surgery/_lib/types";

interface ChecklistSidebarProps {
  header?: PreOpSidebarHeader;
  items?: PreOpSidebarItem[];
}

const SidebarHeader = ({ data }: { data: PreOpSidebarHeader }) => (
  <div className="bg-[#0B1E43] text-white p-4 rounded-xl flex items-center justify-between shadow-sm">
    <div className="w-full">
      <div className="text-sm font-medium mb-2">{data.title}</div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-sm font-medium text-emerald-800">
            {data.completedCount} Completed
          </span>
          <span className="rounded-full bg-red-100 px-2.5 py-1 text-sm font-medium text-red-800">
            {data.pendingCount} Pending
          </span>
        </div>

        <button
          type="button"
          className="rounded-lg bg-blue-500 p-1.5 hover:bg-blue-600 transition-colors"
          aria-label="Next"
        >
          <ArrowRight size={16} className="text-white" />
        </button>
      </div>
    </div>
  </div>
);

const SidebarItem = ({ item }: { item: PreOpSidebarItem }) => (
  <div className="bg-white rounded-xl p-4  border border-slate-100 flex flex-col gap-2 transition-all cursor-pointer">
    <span className="text-sm font-medium text-slate-800">
      {item.label}
    </span>
    <div className="flex gap-2">
      <span className="bg-[#ecfdf5] text-[#059669] text-sm px-2.5 py-1 rounded-full">
        {item.completedCount} Completed
      </span>
      <span className="bg-[#fef2f2] text-[#dc2626] text-sm px-2.5 py-1 rounded-full">
        {item.pendingCount} Pending
      </span>
    </div>
  </div>
);

const ChecklistSidebar: React.FC<ChecklistSidebarProps> = ({
  header = PREOP_SIDEBAR_HEADER,
  items = PREOP_SIDEBAR_ITEMS,
}) => {
  return (
    <div className="w-full space-y-1">
      <SidebarHeader data={header} />
      <div className="space-y-1">
        {items.map((item, idx) => (
          <SidebarItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ChecklistSidebar;

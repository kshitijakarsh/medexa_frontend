import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Button } from "@workspace/ui/components/button";

// Helper components
const SelectInput = ({ placeholder }: { placeholder: string }) => (
  <Select>
    <SelectTrigger className="w-full h-9 text-xs">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1">Option 1</SelectItem>
      <SelectItem value="2">Option 2</SelectItem>
    </SelectContent>
  </Select>
);

const SectionHeader = ({ title, onAdd }: { title: string; onAdd: () => void }) => (
  <div className="flex justify-between items-center">
    <CardTitle className="text-base px-4">{title}</CardTitle>
    <Button
      onClick={onAdd}
      variant="default"
      size="sm"
      className="h-7 text-xs bg-[#50C786] hover:bg-emerald-600 rounded-full px-3 mr-4"
    >
      <Plus size={14} className="mr-1" /> Add {title.split(' ')[0]}
    </Button>
  </div>
);

export const ImplantsUsed = () => {
  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <SectionHeader title="Implants Used" onAdd={() => { }} />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Table Headers */}
        <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">
          <div className="col-span-3">Implant Type</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-3">Batch/Lot No.</div>
          <div className="col-span-2">Manufacturer</div>
          <div className="col-span-2">Quantity</div>
        </div>

        {/* Row */}
        <div className="grid grid-cols-12 gap-2 items-start">
          <div className="col-span-3"><SelectInput placeholder="Select Type" /></div>
          <div className="col-span-2"><SelectInput placeholder="Select Size" /></div>
          <div className="col-span-3"><SelectInput placeholder="Select Batch" /></div>
          <div className="col-span-2"><SelectInput placeholder="Select Manufacturer" /></div>
          <div className="col-span-2 flex gap-2">
            <Input placeholder="Qty" className="h-9 text-xs" />
            <Button variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 hover:bg-red-50">
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ConsumablesUsed = () => {
  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <SectionHeader title="Consumables Used" onAdd={() => { }} />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Table Headers */}
        <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">
          <div className="col-span-4">Item Name</div>
          <div className="col-span-3">Quantity</div>
          <div className="col-span-5">Note</div>
        </div>

        {/* Row */}
        <div className="grid grid-cols-12 gap-2 items-start">
          <div className="col-span-4"><SelectInput placeholder="Select Item Name" /></div>
          <div className="col-span-3"><Input placeholder="Enter Quantity" className="h-9 text-xs" /></div>
          <div className="col-span-5 flex gap-2">
            <Input placeholder="Enter Note" className="h-9 text-xs" />
            <Button variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 hover:bg-red-50">
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


"use client";

import { Info } from "lucide-react";
import Button from "@/components/ui/button";
import { DataTable } from "@/components/common/data-table";
import { Column } from "@/components/common/data-table/ResponsiveDataTable";

const MEDICATIONS = [
  {
    id: 1,
    name: "Metformin",
    dose: "500mg",
    frequency: "twice daily",
    duration: "10 Days",
  },
  {
    id: 2,
    name: "Metformin",
    dose: "500mg",
    frequency: "twice daily",
    duration: "10 Days",
  },
  {
    id: 3,
    name: "Metformin",
    dose: "500mg",
    frequency: "twice daily",
    duration: "10 Days",
  },
];

const columns: Column<typeof MEDICATIONS[number]>[] = [
  {
    key: "id",
    label: "Sl No",

  },
  {
    key: "name",
    label: "Current Medications",
  },
  {
    key: "dose",
    label: "Dose",
  },
  {
    key: "frequency",
    label: "Frequency",
  },
  {
    key: "duration",
    label: "Remaining Duration",
    className: "text-right",
  },
];

export const MedicalHistory = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end items-center gap-1">
        <div className="flex items-center rounded-full bg-slate-50 px-4 py-1.5 text-xs border border-blue-200">
          Last Edited by Anesthesia Sarah on November 14, 2024, at 8:45 AM.
        </div>
        <Info size={18} className="text-blue-400" />
      </div>

      <div className="rounded-xl border border-blue-100 p-4">
        <label className="block text-sm text-slate-500 tracking-tight">
          History of Present Illness
        </label>
        <p className="text-sm font-medium">
          Patient reports Head pain radiating to left arm for the past 3 hours,
          associated with sweating and shortness of breath.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-blue-100 p-4">
          <label className="block text-sm tracking-tight">
            Past Surgical History
          </label>
          <p className="text-sm font-medium">
            Appendectomy in 2018
          </p>
        </div>
        <div className="rounded-xl border border-blue-100 p-4">
          <label className="block text-sm tracking-tight">
            Diseases History
          </label>
          <p className="text-sm font-medium">
            Diabetes, Hypertension
          </p>
        </div>
      </div>

      <DataTable columns={columns} data={MEDICATIONS} />

      <div className="flex justify-end pt-4">
        <Button className="bg-[#50C786] hover:bg-[#45ad74] text-white px-8 rounded-lg uppercase font-medium text-sm">
          NEXT
        </Button>
      </div>
    </div>
  );
};

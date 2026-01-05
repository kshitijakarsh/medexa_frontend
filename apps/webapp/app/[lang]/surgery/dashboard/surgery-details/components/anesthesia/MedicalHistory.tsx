"use client";

import Button from "@/components/ui/button";
import { DataTable } from "@/components/common/data-table";
import { Column } from "@/components/common/data-table/ResponsiveDataTable";
import { useQuery } from "@tanstack/react-query";
import { createMedicalHistoryApiClient } from "@/lib/api/surgery/medical-history";

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


interface MedicalHistoryProps {
  patientId?: string;
}

export const MedicalHistory = ({ patientId }: MedicalHistoryProps) => {
  const medicalHistoryApi = createMedicalHistoryApiClient({});

  const { data: response, isLoading } = useQuery({
    queryKey: ["medical-history", patientId],
    queryFn: async () => {
      if (!patientId) return null;
      const resp = await medicalHistoryApi.getByPatientId(patientId);
      return resp.data;
    },
    enabled: !!patientId,
  });

  const historyItem = response?.data?.[0]?.history;

  const pastSurgicalHistory = historyItem?.surgeries
    ? historyItem.surgeries.map(s => `${s.name} in ${s.date}`).join(", ")
    : "No surgical history recorded";

  const diseasesHistory = historyItem?.conditions
    ? historyItem.conditions.join(", ")
    : "No disease history recorded";

  const medicationsData = historyItem?.medications
    ? historyItem.medications.map((m, i) => ({
      id: i + 1,
      name: m,
      dose: "N/A",
      frequency: "As prescribed",
      duration: "Ongoing",
    }))
    : MEDICATIONS;

  return (
    <div className="flex flex-col gap-6">
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
            {pastSurgicalHistory}
          </p>
        </div>
        <div className="rounded-xl border border-blue-100 p-4">
          <label className="block text-sm tracking-tight">
            Diseases History
          </label>
          <p className="text-sm font-medium">
            {diseasesHistory}
          </p>
        </div>
      </div>

      <DataTable columns={columns} data={medicationsData} />

      <div className="flex justify-end pt-4">
        <Button className="bg-[#50C786] hover:bg-[#45ad74] text-white px-8 rounded-lg uppercase font-medium text-sm">
          NEXT
        </Button>
      </div>
    </div>
  );
};

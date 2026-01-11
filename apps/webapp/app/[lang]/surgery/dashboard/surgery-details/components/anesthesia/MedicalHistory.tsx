"use client";

import Button from "@/components/ui/button";
import { DataTable } from "@/components/common/data-table";
import { Column } from "@/components/common/data-table/ResponsiveDataTable";
import { NoteField } from "@/app/[lang]/surgery/_components/common/NoteField";
import { useQuery } from "@tanstack/react-query";
import { createMedicalHistoryApiClient } from "@/lib/api/surgery/medical-history";
import { useDictionary } from "@/i18n/use-dictionary";

interface MedicationRow {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
}

interface MedicalHistoryProps {
  patientId?: string;
}

export const MedicalHistory = ({ patientId }: MedicalHistoryProps) => {
  const dict = useDictionary();
  const anesthesia = dict.pages.surgery.surgeryDetails.anesthesia;
  const medHistory = anesthesia.medicalHistory;

  const columns: Column<MedicationRow>[] = [
    {
      key: "id",
      label: medHistory.table.slNo,
    },
    {
      key: "name",
      label: medHistory.table.currentMedications,
    },
    {
      key: "dose",
      label: medHistory.table.dose,
    },
    {
      key: "frequency",
      label: medHistory.table.frequency,
    },
    {
      key: "duration",
      label: medHistory.table.remainingDuration,
      className: "text-right",
    },
  ];

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

  const pastSurgicalHistory = historyItem?.surgeries?.length
    ? historyItem.surgeries.map(s => `${s.name} in ${s.date}`).join(", ")
    : medHistory.values.noSurgicalHistory;

  const diseasesHistory = historyItem?.conditions?.length
    ? historyItem.conditions.join(", ")
    : medHistory.values.noDiseaseHistory;

  const medicationsData: MedicationRow[] = historyItem?.medications?.length
    ? historyItem.medications.map((m) => ({
      name: m,
      dose: medHistory.values.na,
      frequency: medHistory.values.asPrescribed,
      duration: medHistory.values.ongoing,
    }))
    : [];

  return (
    <div className="flex flex-col gap-6">
      <NoteField
        label={medHistory.fields.historyOfPresentIllness}
        value={medHistory.values.noIllnessSummary}
        className="border-blue-50 bg-blue-50/30"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <NoteField
          label={medHistory.fields.pastSurgicalHistory}
          value={pastSurgicalHistory}
          className="border-blue-50 bg-blue-50/30"
        />
        <NoteField
          label={medHistory.fields.diseasesHistory}
          value={diseasesHistory}
          className="border-blue-50 bg-blue-50/30"
        />
      </div>

      <DataTable columns={columns} data={medicationsData} />
    </div>
  );
};

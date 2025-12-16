// app/surgery/[id]/_components/OngoingMedicationsCard.tsx
"use client";

export default function OngoingMedicationsCard() {
  const meds = [
    { name: "Amlodipine", dose: "5mg once daily" },
    { name: "Atorvastatin", dose: "20mg at bedtime" },
    { name: "Aspirin", dose: "75mg once daily" },
  ];

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm">
      <h4 className="font-semibold mb-3">Ongoing Medications</h4>
      <div className="space-y-2">
        {meds.map((m, i) => (
          <div key={i} className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm">
            <div className="font-medium">{m.name}</div>
            <div className="text-xs text-slate-600">{m.dose}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

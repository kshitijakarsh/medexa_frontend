// import { ChevronDown, ChevronUp } from "lucide-react";
// import { useState } from "react";

// export default function PreOpInstructionsTab() {
//   const [openClearance, setOpenClearance] = useState(true);
//   const [openMedications, setOpenMedications] = useState(true);

//   return (
//     <div className="space-y-6">

//       {/* Instructions Section */}
//       <div className="bg-blue-50 p-3 rounded-lg border">
//         <p className="text-gray-800 leading-relaxed">
//           Patient to maintain fasting 6 hrs before surgery. Avoid heavy meals or spices 48 hrs prior.
//           Continue regular hypertension medications except ACE inhibitors. Report if feeling
//           feverish or breathless.
//         </p>
//       </div>

//       {/* NIC CLEARANCE */}
//       <AccordionItem
//         title="NIC Clearance"
//         open={openClearance}
//         onToggle={() => setOpenClearance(!openClearance)}
//       >
//         <p className="text-sm text-gray-600">Recorded by Nurse Sarah on Nov 14, 2024</p>
//       </AccordionItem>

//       {/* MEDICATIONS */}
//       <AccordionItem
//         title="Medical Prescriptions"
//         open={openMedications}
//         onToggle={() => setOpenMedications(!openMedications)}
//       >
//         <MedicationsTable />
//         <LabResultsTable />
//         <RadiologyResults />
//       </AccordionItem>
//     </div>
//   );
// }

// function AccordionItem({ title, open, onToggle, children }) {
//   return (
//     <div className="border rounded-lg overflow-hidden">
//       <button
//         onClick={onToggle}
//         className="flex justify-between w-full px-4 py-3 bg-gray-100"
//       >
//         <span>{title}</span>
//         {open ? <ChevronUp /> : <ChevronDown />}
//       </button>

//       {open && <div className="p-4 bg-white">{children}</div>}
//     </div>
//   );
// }


// app/surgery/[id]/_components/tabs/PreOpInstructionsTab.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function AccordionItem({ title, open, onToggle, children }: any) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="flex justify-between w-full px-4 py-3 bg-gray-100"
      >
        <span className="font-medium">{title}</span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
}

function MedicationsTable() {
  const meds = [
    { name: "Amlodipine", dose: "5mg", freq: "Once daily", duration: "30 days", notes: "Take in the morning" },
    { name: "Atorvastatin", dose: "20mg", freq: "Once daily", duration: "30 days", notes: "At bedtime" },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm table-auto">
        <thead>
          <tr className="text-gray-500">
            <th className="py-2 text-left">Medicine</th>
            <th className="py-2">Dose</th>
            <th className="py-2">Frequency</th>
            <th className="py-2">Duration</th>
            <th className="py-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {meds.map((m, i) => (
            <tr key={i} className="even:bg-blue-50/30">
              <td className="py-2">{m.name}</td>
              <td className="py-2">{m.dose}</td>
              <td className="py-2">{m.freq}</td>
              <td className="py-2">{m.duration}</td>
              <td className="py-2">{m.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LabResultsTable() {
  const rows = [
    { test: "Complete Blood Count (CBC)", category: "Biochemistry", result: "Normal", ref: "WBC: 4.5-11.0 K/uL", status: "Completed" },
    { test: "Lipid Profile", category: "Biochemistry", result: "Total Chol 195 mg/dL", ref: "<200 mg/dL", status: "Completed" },
  ];

  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full text-sm table-auto">
        <thead>
          <tr className="text-gray-500">
            <th className="py-2 text-left">Test Name</th>
            <th className="py-2">Category</th>
            <th className="py-2">Result</th>
            <th className="py-2">Reference Range</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="even:bg-blue-50/30">
              <td className="py-2">{r.test}</td>
              <td className="py-2">{r.category}</td>
              <td className="py-2">{r.result}</td>
              <td className="py-2">{r.ref}</td>
              <td className="py-2">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RadiologyResults() {
  const items = [
    { id: 1, title: "ECG - 12 Lead", note: "Normal sinus rhythm" },
    { id: 2, title: "ECG - 12 Lead", note: "Normal sinus rhythm" },
  ];

  return (
    <div className="mt-3 space-y-3">
      {items.map((it) => (
        <div key={it.id} className="flex items-center justify-between bg-white border p-3 rounded-lg">
          <div>
            <div className="font-medium">{it.title}</div>
            <div className="text-sm text-gray-600">{it.note}</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-blue-600 text-sm underline">View</button>
            <button className="text-gray-500 text-sm">Download</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PreOpInstructionsTab() {
  const [openClearance, setOpenClearance] = useState(true);
  const [openMedications, setOpenMedications] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-3 rounded-lg border">
        <p className="text-gray-800 leading-relaxed">
          Patient to maintain fasting 6 hrs before surgery. Avoid heavy meals for 48 hrs. Continue regular hypertension meds except ACE inhibitors. Report fever or breathlessness.
        </p>
      </div>

      <AccordionItem title="PAC Clearance" open={openClearance} onToggle={() => setOpenClearance(!openClearance)}>
        <p className="text-sm text-gray-600">Recorded by Nurse Sarah on Nov 14, 2024 at 8:45 AM</p>
      </AccordionItem>

      <AccordionItem title="Prescriptions & Tests" open={openMedications} onToggle={() => setOpenMedications(!openMedications)}>
        <MedicationsTable />
        <LabResultsTable />
        <RadiologyResults />
      </AccordionItem>
    </div>
  );
}

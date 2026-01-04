// import NewButton from "@/components/common/new-button";
// import React, { useState } from "react";

// // PrescriptionPanel.jsx
// // Tailwind-based React component that recreates the prescription UI from your screenshots.
// // - Panel with header buttons (Add Medication, Send to Pharmacy, Print Rx)
// // - Empty-state illustration (uses provided image files)
// // - Add Medication modal with form controls
// // - Table of prescribed meds with a red circular delete action matching your screenshots

// export default function Prescription() {
//   const [showModal, setShowModal] = useState(false);
//   const [meds, setMeds] = useState([
//     // sample rows to demonstrate the table (you can start with an empty array)
//     {
//       id: 1,
//       medication: "Amlodipine Oral",
//       dosage: "5mg",
//       frequency: "Once daily (OD)",
//       duration: "30 days",
//       instructions: "Take after breakfast",
//     },
//     {
//       id: 2,
//       medication: "Amlodipine Oral",
//       dosage: "5mg",
//       frequency: "Once daily (OD)",
//       duration: "30 days",
//       instructions: "Take after breakfast",
//     },
//     {
//       id: 3,
//       medication: "Amlodipine Oral",
//       dosage: "5mg",
//       frequency: "Once daily (OD)",
//       duration: "30 days",
//       instructions: "Take after breakfast",
//     },
//   ]);

//   const [form, setForm] = useState({
//     medication: "",
//     dosage: "",
//     route: "",
//     interval: "",
//     duration: "",
//     instructions: "",
//   });

//   function handleAddMedication(e) {
//     e.preventDefault();
//     const next = {
//       id: meds.length ? Math.max(...meds.map((m) => m.id)) + 1 : 1,
//       medication: form.medication || "New Medication",
//       dosage: form.dosage || "-",
//       frequency: form.interval || "-",
//       duration: form.duration || "-",
//       instructions: form.instructions || "",
//     };
//     setMeds((s) => [...s, next]);
//     setForm({ medication: "", dosage: "", route: "", interval: "", duration: "", instructions: "" });
//     setShowModal(false);
//   }

//   function handleRemove(id) {
//     setMeds((s) => s.filter((m) => m.id !== id));
//   }

//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-4">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-medium">Prescription <span className="ml-2 inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Auto-saved</span></h3>

//           <div className="flex items-center gap-3">
//             {/* <button
//               onClick={() => setShowModal(true)}
//               className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
//             >
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block">
//                 <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//               Add Medication
//             </button> */}
//             <NewButton name ="Add Medication" handleClick={() => setShowModal(true)}/>

//             <button className="flex items-center gap-2 border border-blue-100 rounded-full px-3 py-2">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                 <path d="M22 2L11 13" stroke="#2b6cb0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M22 2l-7 20-4-9-9-4 20-7z" stroke="#2b6cb0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//               Send to Pharmacy
//             </button>

//             <button className="flex items-center gap-2 border border-blue-100 rounded-full px-3 py-2">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                 <path d="M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4" stroke="#2b6cb0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M7 10l5-5 5 5" stroke="#2b6cb0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//               Print Rx
//             </button>
//           </div>
//         </div>

//         {/* Content: either empty state or table */}
//         <div className="min-h-[240px]">
//           {meds.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
//               <img src={'/mnt/data/f55d6e0e-23ca-4471-b340-a393522846a4.png'} alt="empty" className="w-28 opacity-80 mb-4" />
//               <div className="text-sm mb-3">No medications prescribed yet</div>
//               <button onClick={() => setShowModal(true)} className="bg-green-400 text-white px-4 py-2 rounded-full">Add Medication</button>
//             </div>
//           ) : (
//             <div>
//               <div className="overflow-x-auto">
//                 <table className="w-full table-auto text-sm">
//                   <thead>
//                     <tr className="text-left text-gray-500">
//                       <th className="py-3 pl-4 w-12">Sl No</th>
//                       <th className="py-3">Medication</th>
//                       <th className="py-3">Dosage</th>
//                       <th className="py-3">Frequency</th>
//                       <th className="py-3">Duration</th>
//                       <th className="py-3">Instructions</th>
//                       <th className="py-3 w-20 text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {meds.map((m, i) => (
//                       <tr key={m.id} className="bg-white even:bg-blue-50/30 border-t">
//                         <td className="py-4 pl-4 text-gray-600">{i + 1}</td>
//                         <td className="py-4 text-blue-600 underline">{m.medication}</td>
//                         <td className="py-4 text-gray-700">{m.dosage}</td>
//                         <td className="py-4 text-gray-700">{m.frequency}</td>
//                         <td className="py-4 text-gray-700">{m.duration}</td>
//                         <td className="py-4 text-gray-700">{m.instructions}</td>
//                         <td className="py-4 text-center">
//                           {/* Red circular delete icon (matches screenshot) */}
//                           <button
//                             onClick={() => handleRemove(m.id)}
//                             className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 border border-red-200"
//                             aria-label={`Remove ${m.medication}`}
//                           >
//                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
//                               <circle cx="12" cy="12" r="10" fill="#FF6B6B" opacity="0" />
//                               <path d="M15 9l-6 6M9 9l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Add Medication Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
//           <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
//           <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 z-10">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h4 className="text-lg font-semibold">Add Medication</h4>
//                 <div className="text-sm text-gray-500">Prescribe medication for the patient</div>
//               </div>
//               <button onClick={() => setShowModal(false)} className="text-gray-500">✕</button>
//             </div>

//             <form onSubmit={handleAddMedication} className="mt-4 space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <div className="col-span-1">
//                   <label className="block text-xs text-gray-600 mb-1">Medicine</label>
//                   <input value={form.medication} onChange={(e) => setForm((s) => ({ ...s, medication: e.target.value }))} placeholder="Select Medicine" className="w-full border rounded-md px-3 py-2" />
//                 </div>

//                 <div className="col-span-1">
//                   <label className="block text-xs text-gray-600 mb-1">Dosage</label>
//                   <input value={form.dosage} onChange={(e) => setForm((s) => ({ ...s, dosage: e.target.value }))} placeholder="Select Dosage" className="w-full border rounded-md px-3 py-2" />
//                 </div>

//                 <div className="col-span-1">
//                   <label className="block text-xs text-gray-600 mb-1">Dose Interval</label>
//                   <input value={form.interval} onChange={(e) => setForm((s) => ({ ...s, interval: e.target.value }))} placeholder="Select Interval" className="w-full border rounded-md px-3 py-2" />
//                 </div>

//                 <div className="col-span-1">
//                   <label className="block text-xs text-gray-600 mb-1">Duration (in days)</label>
//                   <input value={form.duration} onChange={(e) => setForm((s) => ({ ...s, duration: e.target.value }))} placeholder="Duration" className="w-full border rounded-md px-3 py-2" />
//                 </div>

//                 <div className="col-span-1 md:col-span-2">
//                   <label className="block text-xs text-gray-600 mb-1">Medication Instructions</label>
//                   <textarea value={form.instructions} onChange={(e) => setForm((s) => ({ ...s, instructions: e.target.value }))} placeholder="Enter Medication Instructions" className="w-full border rounded-md px-3 py-2 min-h-[90px]" />
//                 </div>
//               </div>

//               <div className="flex justify-end gap-3 mt-2">
//                 <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 border rounded-md">CANCEL</button>
//                 <button type="submit" className="px-6 py-2 rounded-md bg-green-500 text-white">ADD</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// components/prescription/Prescription.tsx

"use client"

import React, { useState } from "react"
import NewButton from "@/components/common/new-button"

import { MedicationForm, PrescriptionItem } from "./prescription/types"
import MedicationTable from "./prescription/MedicationTable"
import AddMedicationModal from "./prescription/AddMedicationModal"
import { FileUp, Printer } from "lucide-react"
import { SectionWrapper } from "./common/SectionWrapper"
import { SectionTitle } from "./common/SectionTitle"

import { useDictionary } from "@/i18n/dictionary-context";

export default function Prescription() {
  const [showModal, setShowModal] = useState(false)
  const dict = useDictionary();

  const [meds, setMeds] = useState<PrescriptionItem[]>([])

  const addMedication = (data: MedicationForm) => {
    setMeds((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        medication: data.medication,
        dosage: data.dosage,
        frequency: data.interval,
        duration: data.duration,
        instructions: data.instructions,
      },
    ])
  }

  const removeMedication = (id: number) => {
    setMeds((s) => s.filter((m) => m.id !== id))
  }

  return (
    <SectionWrapper
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SectionTitle title={dict.pages.doctor.appointment.tabsContent.prescription.title} />
            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full border border-green-200">
              ✓ {dict.pages.doctor.appointment.tabsContent.prescription.autoSaved}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <NewButton
              name={dict.pages.doctor.appointment.tabsContent.prescription.add}
              handleClick={() => setShowModal(true)}
            />

            <button className="border border-blue-100 rounded-full text-blue-600 flex items-center gap-2 p-0.5">
              <span className="p-2.5 bg-blue-200 rounded-full">
                <FileUp className="w-4 h-4" />
              </span>
              <span className="pe-3 py-1 ">{dict.pages.doctor.appointment.tabsContent.prescription.sendPharmacy}</span>
            </button>
            <button className="border border-blue-100 rounded-full text-blue-600 flex items-center gap-2 p-0.5">
              <span className="p-2.5 bg-blue-200 rounded-full">
                <Printer className="w-4 h-4" />
              </span>
              <span className="pe-3 py-1 ">{dict.pages.doctor.appointment.tabsContent.prescription.printRx}</span>
            </button>
          </div>
        </div>
      }
    >
      {/* <div className="p-6"> */}

      {/* CONTENT */}
      <div className="min-h-[240px]">
        {meds.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            {/* <img src="/empty-rx.png" className="w-24 mb-3 opacity-70" /> */}
            <div>{dict.pages.doctor.appointment.tabsContent.prescription.empty}</div>
            {/* <button
                className="mt-3 bg-green-500 text-white px-4 py-2 rounded-full"
                onClick={() => setShowModal(true)}
              >
                Add Medication
              </button> */}
          </div>
        ) : (
          <MedicationTable meds={meds} onRemove={removeMedication} />
        )}
      </div>

      {/* MODAL */}
      <AddMedicationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdd={addMedication}
      />
      {/* </div> */}
    </SectionWrapper>
  )
}

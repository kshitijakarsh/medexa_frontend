// "use client";

// import { useState } from "react";
// import { SectionWrapper } from "./SectionWrapper";
// import { SectionTitle } from "./SectionTitle";
// import NewButton from "@/components/common/new-button";

// export function Vitals() {
//   const [openModal, setOpenModal] = useState(false);

//   return (
//     <SectionWrapper
//       header={
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <SectionTitle title="Vital" />
//             {/* Autosaved badge */}
//             <span className="px-2 py-1 text-xs bg-green-100 border border-green-200 text-green-700 rounded-md">
//               ✓ Auto-saved
//             </span>
//           </div>

//           <NewButton handleClick={() => setOpenModal(true)} name="Add Vitals"/>
//         </div>
//       }
//     >
//       {/* Cards */}
//       <div className="mt-4">
//         <h3 className="text-gray-700 font-semibold mb-2">
//           Vital Signs & Observations
//         </h3>

//         <div className="grid grid-cols-3 gap-4">
//           <VitalCard label="Blood Pressure" value="-----" />
//           <VitalCard label="Pulse Rate" value="-----" />
//           <VitalCard label="Temperature" value="-----" />
//           <VitalCard label="Weight" value="-----" />
//           <VitalCard label="Height" value="-----" />
//           <VitalCard label="BMI" value="-----" />
//         </div>

//         <h3 className="mt-6 mb-1 text-gray-700 font-semibold">
//           Additional Observations
//         </h3>

//         <div className="border rounded-xl min-h-[80px] p-4 text-gray-500">
//           -----
//         </div>
//       </div>

//       {/* Modal UI Trigger */}
//       {openModal && (
//         <YourVitalsModal onClose={() => setOpenModal(false)} />
//       )}
//     </SectionWrapper>
//   );
// }

// function VitalCard({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="border rounded-xl p-4 bg-white shadow-xs">
//       <p className="text-gray-600 text-sm">{label}</p>
//       <p className="font-semibold text-lg mt-1">{value}</p>
//     </div>
//   );
// }


"use client";
import React, { useState } from "react";
import { SectionWrapper } from "./SectionWrapper";
import { SectionTitle } from "./SectionTitle";
import VitalsModal from "./Vitals/VitalsModal";
import { VitalCard } from "./Vitals/VitalCard";
import VitalsHistory from "./Vitals/VitalsHistory";
import NewButton from "@/components/common/new-button";
import { VitalGraph } from "./Vitals/VitalGraph";

/**
 * ASSET_IMAGE is the uploaded image path you gave — using it as header illustration.
 * The developer instruction asked to include the local path as the file url:
 * /mnt/data/04411121-4015-4139-a606-c230797e11c8.png
 */
const ASSET_IMAGE = "/mnt/data/04411121-4015-4139-a606-c230797e11c8.png";

export function Vitals() {
    // current displayed/latest vitals
    const [latest, setLatest] = useState({
        bloodPressure: "",
        pulseRate: "",
        temperature: "",
        weight: "",
        height: "",
        bmi: "",
        observations: "",
        recordedBy: "Nurse Sarah",
        recordedAt: new Date().toISOString(),
    });

    // simple in-memory history
    const [history, setHistory] = useState<any[]>([
        // sample history entry to show UI initially
        {
            id: "sample-1",
            recordedAt: new Date().toISOString(),
            recordedBy: "Nurse Sarah",
            vitals: {
                bloodPressure: "150/90 mmHg",
                pulseRate: "95 bpm",
                temperature: "37.2°C",
                weight: "72 kg",
                height: "165 cm",
                bmi: "26.4",
            },
            observations: "Mild swelling observed in lower limbs. Patient reports occasional dizziness when standing. No medicine pain at the time of examination.",
        },
    ]);

    const [showModal, setShowModal] = useState(false);

    // sample graph data derived from history (UI only)
    const graphData = [
        { time: "10pm", bp: 28 },
        { time: "11pm", bp: 30 },
        { time: "12pm", bp: 25 },
        { time: "1pm", bp: 33 },
        { time: "2pm", bp: 30 },
        { time: "3pm", bp: 28 },
        { time: "4pm", bp: 26 },
        { time: "5pm", bp: 29 },
        { time: "6pm", bp: 35 },
        { time: "7pm", bp: 30 },
        { time: "8pm", bp: 31 },
        { time: "9pm", bp: 34 },
    ];

    function handleSave(form: any) {
        // add to history and set as latest
        const entry = {
            id: `e-${Date.now()}`,
            recordedAt: new Date().toISOString(),
            recordedBy: "You",
            vitals: {
                bloodPressure: form.bloodPressure,
                pulseRate: form.pulseRate,
                temperature: form.temperature,
                weight: form.weight,
                height: form.height,
                bmi: form.bmi,
            },
            observations: form.observations,
        };

        setHistory((h) => [entry, ...h]);
        setLatest({
            ...entry.vitals,
            observations: entry.observations,
            recordedBy: entry.recordedBy,
            recordedAt: entry.recordedAt,
        });
        setShowModal(false);
    }

    return (
        <SectionWrapper
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <SectionTitle title="Vital" />
                        <span className="px-2 py-1 text-xs bg-green-100 border border-green-200 text-green-700 rounded-md">
                            ✓ Auto-saved
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <img src={ASSET_IMAGE} alt="vital-illustration" className="w-10 h-10 rounded-full object-cover" />
                        <NewButton handleClick={() => setShowModal(true)} name="Add Vitals" />
                    </div>
                </div>
            }
        >
            <div className="mt-3">
                <div className="text-gray-700 font-semibold mb-3">Vital Signs & Observations</div>

                <div className="grid grid-cols-3 gap-4">
                    <VitalCard label="Blood Pressure" value={latest.bloodPressure || "-----"} />
                    <VitalCard label="Pulse Rate" value={latest.pulseRate || "-----"} />
                    <VitalCard label="Temperature" value={latest.temperature || "-----"} />
                    <VitalCard label="Weight" value={latest.weight || "-----"} />
                    <VitalCard label="Height" value={latest.height || "-----"} />
                    <VitalCard label="BMI" value={latest.bmi || "-----"} />
                </div>

                <div className="mt-4">
                    <div className="text-sm font-medium mb-2">Additional Observations</div>
                    <div className="border rounded-xl p-3 text-gray-600">{latest.observations || "-----"}</div>
                </div>

                <div className="mt-6">
                    <div className="text-lg font-semibold mb-3">Vital Graph</div>
                    <VitalGraph data={graphData} />
                </div>

                <div className="mt-6">
                    <div className="text-lg font-semibold mb-3">History</div>
                    <VitalsHistory history={history} />
                </div>
            </div>

            {showModal && <VitalsModal onClose={() => setShowModal(false)} onSave={handleSave} />}
        </SectionWrapper>
    );
}

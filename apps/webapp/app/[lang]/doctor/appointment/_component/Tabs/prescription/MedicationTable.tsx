// components/prescription/MedicationTable.tsx
import { Trash2, X } from "lucide-react";
import { PrescriptionItem } from "./types";
import { Button } from "@workspace/ui/components/button";
import { RedCircleCloseButton } from "@/components/common/red-circle-button-close";

export default function MedicationTable({
    meds,
    onRemove,
}: {
    meds: PrescriptionItem[];
    onRemove: (id: number) => void;
}) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
                <thead>
                    <tr className="text-left text-gray-500">
                        <th className="py-3 pl-4 w-12">Sl No</th>
                        <th className="py-3">Medication</th>
                        <th className="py-3">Dosage</th>
                        <th className="py-3">Frequency</th>
                        <th className="py-3">Duration</th>
                        <th className="py-3">Instructions</th>
                        <th className="py-3 w-20 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {meds.map((m, i) => (
                        <tr key={m.id} className="bg-white even:bg-blue-50/30 border-t">
                            <td className="py-4 pl-4 text-gray-600">{i + 1}</td>
                            <td className="py-4 text-blue-600 underline">{m.medication}</td>
                            <td className="py-4">{m.dosage}</td>
                            <td className="py-4">{m.frequency}</td>
                            <td className="py-4">{m.duration}</td>
                            <td className="py-4">{m.instructions}</td>

                            <td className="py-4 text-center">
                                {/* <button
                  onClick={() => onRemove(m.id)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 border border-red-200"
                >
                  ✕
                </button> */}
                                <RedCircleCloseButton onClick={() => onRemove(m.id)} size={35} />


                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

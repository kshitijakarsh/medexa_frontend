// components/prescription/MedicationTable.tsx
import { Trash2, Edit, Eye } from "lucide-react";
import { PrescriptionItem } from "./types";
import { Button } from "@workspace/ui/components/button";

export default function MedicationTable({
    meds,
    onRemove,
    onEdit,
    onView,
}: {
    meds: PrescriptionItem[];
    onRemove: (id: number) => void;
    onEdit?: (med: PrescriptionItem) => void;
    onView?: (med: PrescriptionItem) => void;
}) {
    return (
        <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">
                                #
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Medication
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Dosage
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Route
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Frequency
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Duration
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Instructions
                            </th>
                            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {meds.map((m, i) => (
                            <tr 
                                key={m.id} 
                                className="hover:bg-blue-50/50 transition-colors duration-150"
                            >
                                <td className="py-4 px-4 text-sm text-gray-600 font-medium">
                                    {i + 1}
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-blue-700">
                                            {m.medication}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-700 font-medium">
                                    {m.dosage}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-600">
                                    {m.route || <span className="text-gray-400">-</span>}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-700 font-medium">
                                    {m.frequency}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-700">
                                    {m.duration}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-600 max-w-xs">
                                    <div className="truncate" title={m.instructions}>
                                        {m.instructions || <span className="text-gray-400">-</span>}
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        {onView && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onView(m)}
                                                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {onEdit && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onEdit(m)}
                                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        )}
                                        <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onRemove(m.id)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full p-2"
                                        title="Remove medication"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {meds.length === 0 && (
                <div className="py-12 text-center text-gray-500">
                    <p className="text-sm">No medications added yet</p>
                </div>
            )}
        </div>
    );
}


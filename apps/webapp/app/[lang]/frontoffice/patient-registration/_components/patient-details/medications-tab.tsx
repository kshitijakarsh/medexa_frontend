import { Prescription } from "./types"
import { Calendar } from "lucide-react"

interface MedicationsTabProps {
    prescriptions: Prescription[]
}

export function MedicationsTab({ prescriptions }: MedicationsTabProps) {
    if (prescriptions.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
                No active prescriptions found
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[calc(100vh-220px)] flex flex-col">
            <div className="p-6">
                <h3 className="text-lg font-bold text-[#1C1C1E]">Medications</h3>
            </div>
            <div className="p-6 space-y-4 pt-0">
                {prescriptions.map((prescription, groupIndex) => (
                    <div key={groupIndex} className="bg-white rounded-xl border border-[#E0F2FE] shadow-sm overflow-hidden">
                        {/* Header Group info */}
                        <div className="p-5">
                            <div className="flex items-start gap-12">
                                <div>
                                    {prescription.doctorName && (
                                        <h4 className="font-bold text-[#1C1C1E] text-base mb-1">{prescription.doctorName}</h4>
                                    )}
                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                        <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
                                        <span>{prescription.date}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Visit ID</span>
                                    <span className="text-[13px] font-medium text-gray-500">{prescription.visitId}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Visit Type</span>
                                    <span className="text-[13px] font-medium text-gray-500">{prescription.visitType}</span>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        {prescription.items.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#F0F9FF] border-b border-[#E0F2FE]">
                                            <th className="py-3 px-5 text-xs font-bold text-[#1C1C1E]">Medicine</th>
                                            <th className="py-3 px-5 text-xs font-bold text-[#1C1C1E]">Dose</th>
                                            <th className="py-3 px-5 text-xs font-bold text-[#1C1C1E]">Frequency</th>
                                            <th className="py-3 px-5 text-xs font-bold text-[#1C1C1E]">Duration</th>
                                            <th className="py-3 px-5 text-xs font-bold text-[#1C1C1E]">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {prescription.items.map((item: import("./types").MedicationItem, itemIndex: number) => (
                                            <tr key={itemIndex} className={`${itemIndex % 2 === 0 ? 'bg-[#F9FAFB]' : 'bg-white'}`}>
                                                <td className="py-4 px-5">
                                                    <span className="text-[13px] text-gray-600 block max-w-[150px] leading-snug">{item.name}</span>
                                                </td>
                                                <td className="py-4 px-5 text-[13px] text-gray-600">{item.dosage}</td>
                                                <td className="py-4 px-5 text-[13px] text-gray-600">{item.frequency}</td>
                                                <td className="py-4 px-5 text-[13px] text-gray-600">{item.duration}</td>
                                                <td className="py-4 px-5 text-[13px] text-gray-600">{item.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

import { Allergy } from "./types"
import { AlertTriangle } from "lucide-react"

interface AllergiesTabProps {
    allergies: Allergy[]
}

export function AllergiesTab({ allergies }: AllergiesTabProps) {
    if (allergies.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
                No allergies recorded
            </div>
        )
    }

    const getSeverityColor = (severity: Allergy['severity']) => {
        switch (severity) {
            case 'Severe':
                return 'bg-[#FF453A] text-white border-0' // Red
            case 'Moderate':
                return 'bg-[#F59E0B] text-white border-0' // Orange
            case 'Mild':
                return 'bg-[#FCD34D] text-[#78350F] border-0' // Yellow
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[calc(100vh-220px)] flex flex-col">
            <div className="p-6">
                <h3 className="text-lg font-bold text-[#1C1C1E]">Allergies & Problems</h3>
            </div>
            <div className="p-6 space-y-4 pt-0">
                {allergies.map((allergy, index) => (
                    <div key={index} className="bg-[#FEF2F2] rounded-xl overflow-hidden border border-[#FECACA]/30"> {/* Very light red/pink bg */}
                        {/* Header Row */}
                        <div className="flex items-center justify-between p-4 pb-2">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-[#FEE2E2] rounded-md">
                                    <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                                </div>
                                <h4 className="font-bold text-[#1C1C1E] text-base">{allergy.allergen}</h4>
                            </div>
                            <span className={`px-4 py-1 rounded-full text-xs font-bold ${getSeverityColor(allergy.severity)}`}>
                                {allergy.severity}
                            </span>
                        </div>

                        {/* Visit Info Row */}
                        <div className="px-4 pb-4 grid grid-cols-4 gap-8">
                            <div>
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Visit ID</span>
                                <span className="text-[13px] font-medium text-gray-500">{allergy.visitId}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Visit Type</span>
                                <span className="text-[13px] font-medium text-gray-500">{allergy.visitType}</span>
                            </div>
                        </div>

                        {/* Nested White Details Card */}
                        <div className="mx-4 mb-4 bg-white rounded-lg p-4 grid grid-cols-4 gap-8 shadow-sm">
                            <div className="col-span-1">
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Reaction</span>
                                <span className="text-[13px] font-medium text-gray-500">{allergy.reaction}</span>
                            </div>
                            <div className="col-span-1">
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Date Recorded</span>
                                <span className="text-[13px] font-medium text-gray-500">{allergy.dateRecorded}</span>
                            </div>
                            <div className="col-span-2">
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Recorded By</span>
                                <span className="text-[13px] font-medium text-gray-500">{allergy.recordedBy}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

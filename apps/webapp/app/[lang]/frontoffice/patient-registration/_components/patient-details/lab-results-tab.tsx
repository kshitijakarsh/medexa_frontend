import { LabResult } from "./types"
import { FlaskConical, FileText } from "lucide-react"
import Button from "@/components/ui/button"

interface LabResultsTabProps {
    results: LabResult[]
}

export function LabResultsTab({ results }: LabResultsTabProps) {
    if (results.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
                No lab results found
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[calc(100vh-220px)] flex flex-col">
            <div className="p-6">
                <h3 className="text-lg font-bold text-[#1C1C1E]">Lab Results</h3>
            </div>
            <div className="p-6 space-y-4 pt-0">
                {results.map((result, index) => (
                    <div key={index} className="bg-[#F0F9FF] rounded-xl p-4">
                        {/* Header Row */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#E0F2FE] rounded-lg">
                                    <FlaskConical className="w-5 h-5 text-[#0284C7]" />
                                </div>
                                <h4 className="font-bold text-[#1C1C1E] text-[15px]">{result.testName}</h4>
                            </div>
                            <Button
                                className="bg-[#007AFF] hover:bg-[#0066CC] text-white h-8 px-4 rounded-lg text-xs font-semibold"
                            >
                                <FileText className="w-3.5 h-3.5 mr-2" />
                                View Pdf
                            </Button>
                        </div>

                        {/* Details Card */}
                        <div className="bg-white rounded-lg p-4 grid grid-cols-4 gap-8">
                            <div>
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Visit ID</span>
                                <span className="text-[13px] font-medium text-gray-500">{result.visitId}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Visit Type</span>
                                <span className="text-[13px] font-medium text-gray-500">{result.visitType}</span>
                            </div>
                            {/* Empty col for spacing matching image */}
                            <div></div>
                            <div></div>

                            <div>
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Date</span>
                                <span className="text-[13px] font-medium text-gray-500">{result.date}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Status</span>
                                {result.status === 'Completed' && (
                                    <span className="inline-flex items-center justify-center px-3 py-0.5 rounded-full bg-[#10B981] text-white text-[11px] font-bold">
                                        Completed
                                    </span>
                                )}
                            </div>
                            <div className="col-span-2">
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Result Summary</span>
                                <span className="text-[13px] font-medium text-gray-500">{result.resultSummary}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

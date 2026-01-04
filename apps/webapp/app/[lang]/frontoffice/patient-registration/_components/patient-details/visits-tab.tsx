import { Visit } from "./types"

interface VisitsTabProps {
    visits: Visit[]
    loading?: boolean
}

export function VisitsTab({ visits, loading = false }: VisitsTabProps) {
    if (loading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
                Loading visits...
            </div>
        )
    }

    if (visits.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
                No visits recorded
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[calc(100vh-220px)] flex flex-col">
            <div className="p-6">
                <h3 className="text-lg font-bold text-[#1C1C1E]">Visits / Encounters</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-gray-50">
                        {visits.map((visit, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-[#F9FAFB]' : 'bg-white'} border-b border-gray-100 last:border-0`}>
                                <td className="py-4 px-6 align-top">
                                    <span className="block text-[13px] font-bold text-[#1C1C1E] mb-1">Visit Type</span>
                                    <span className="text-[13px] text-gray-500 font-medium">{visit.type}</span>
                                </td>
                                <td className="py-4 px-6 align-top">
                                    <span className="block text-[13px] font-bold text-[#1C1C1E] mb-1">Visit ID</span>
                                    <span className="text-[13px] text-gray-500 font-medium">{visit.id}</span>
                                </td>
                                <td className="py-4 px-6 align-top">
                                    <span className="block text-[13px] font-bold text-[#1C1C1E] mb-1">Date</span>
                                    <span className="text-[13px] text-gray-500 font-medium">{visit.date}</span>
                                </td>
                                <td className="py-4 px-6 align-top">
                                    <span className="block text-[13px] font-bold text-[#1C1C1E] mb-1">Doctor</span>
                                    <span className="text-[13px] text-gray-500 font-medium">{visit.doctor.name}</span>
                                </td>
                                <td className="py-4 px-6 align-top">
                                    <span className="block text-[13px] font-bold text-[#1C1C1E] mb-1">Purpose / Diagnosis</span>
                                    <span className="text-[13px] text-gray-500 font-medium">{visit.purpose || visit.diagnosis || '-'}</span>
                                </td>
                                <td className="py-4 px-6 align-middle text-right">
                                    <span
                                        className={`inline-flex items-center justify-center rounded-full px-4 py-1 text-xs font-semibold border-0 ${visit.status === 'Active'
                                            ? 'bg-[#10B981] text-white'
                                            : 'bg-[#9CA3AF] text-white'
                                            }`}
                                    >
                                        {visit.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

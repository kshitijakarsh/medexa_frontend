import { Badge } from "@workspace/ui/components/badge"

interface DateStatCardProps {
    date: string
    total: number
    booked: number
    blocked: number
    available: number
}

export function DateStatCard({ date, total, booked, blocked, available }: DateStatCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden min-w-[200px] w-full">
            {/* Header */}
            <div className="bg-[#0095FF] text-white py-2 px-3 text-sm font-medium">
                {date}
            </div>

            {/* Content */}
            <div className="p-2 space-y-1">
                {/* Total Appointment - Lavender */}
                <div className="flex items-center justify-between bg-[#F3E8FF] rounded px-2 py-1.5">
                    <span className="text-xs text-gray-700 font-medium">Total Appointment</span>
                    <div className="bg-white rounded px-1.5 py-0.5 text-xs font-semibold text-gray-800 shadow-sm min-w-[24px] text-center">
                        {total}
                    </div>
                </div>

                {/* Book Appointment - Light Green */}
                <div className="flex items-center justify-between bg-[#DCFCE7] rounded px-2 py-1.5">
                    <span className="text-xs text-gray-700 font-medium">Book Appointment</span>
                    <div className="bg-white rounded px-1.5 py-0.5 text-xs font-semibold text-gray-800 shadow-sm min-w-[24px] text-center">
                        {booked}
                    </div>
                </div>

                {/* Appointment Block - Light Red */}
                <div className="flex items-center justify-between bg-[#FFE4E6] rounded px-2 py-1.5">
                    <span className="text-xs text-gray-700 font-medium">Appointment Block</span>
                    <div className="bg-white rounded px-1.5 py-0.5 text-xs font-semibold text-gray-800 shadow-sm min-w-[24px] text-center">
                        {blocked}
                    </div>
                </div>

                {/* Available Booking - Light Blue */}
                <div className="flex items-center justify-between bg-[#E0F2FE] rounded px-2 py-1.5">
                    <span className="text-xs text-gray-700 font-medium">Available Booking</span>
                    <div className="bg-white rounded px-1.5 py-0.5 text-xs font-semibold text-gray-800 shadow-sm min-w-[24px] text-center">
                        {available}
                    </div>
                </div>
            </div>
        </div>
    )
}

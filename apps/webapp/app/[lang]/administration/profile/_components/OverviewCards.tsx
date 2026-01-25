"use client"

import {
    Users,
    Building2,
    ShieldCheck,
    Bed,
    Briefcase,
} from "lucide-react"
import { useDictionary } from "@/i18n/use-dictionary"

export function OverviewCards() {
    const dict = useDictionary()
    const { overview } = dict.pages.administration.profile.components

    const stats = [
        {
            label: overview.totalUsers,
            value: 124, // Mock value, in real app would come from API/Store
            icon: <Users size={22} />,
            bg: "bg-blue-50",
            iconBg: "bg-blue-200 text-blue-700",
        },
        {
            label: overview.activeDepartments,
            value: 12,
            icon: <Building2 size={22} />,
            bg: "bg-purple-50",
            iconBg: "bg-purple-200 text-purple-700",
        },
        {
            label: overview.totalRoles,
            value: 8,
            icon: <ShieldCheck size={22} />,
            bg: "bg-green-50",
            iconBg: "bg-green-200 text-green-700",
        },
        {
            label: overview.wardOccupancy,
            value: "85%",
            icon: <Bed size={22} />,
            bg: "bg-orange-50",
            iconBg: "bg-orange-200 text-orange-700",
        },
        {
            label: overview.insurancePartners,
            value: 15,
            icon: <Briefcase size={22} />,
            bg: "bg-pink-50",
            iconBg: "bg-pink-200 text-pink-700",
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((s, i) => (
                <div
                    key={i}
                    className={`${s.bg} rounded-xl border p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow active:scale-95 duration-200 cursor-default`}
                >
                    <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.iconBg} shadow-sm`}
                    >
                        {s.icon}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-gray-900">{s.value}</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
                            {s.label}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

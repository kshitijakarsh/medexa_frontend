"use client"

import {
    BadgeCheck,
    Mail,
    Phone,
    Building2,
    Calendar,
    ShieldCheck,
    Hash,
} from "lucide-react"
import { useDictionary } from "@/i18n/use-dictionary"
import { useUserStore } from "@/store/useUserStore"
import Image from "next/image"

import { useQuery } from "@tanstack/react-query"
import { createTenantApiClient } from "@/lib/api/tenant"
import { getIdToken } from "@/app/utils/auth"

export function AdminHeader() {
    const dict = useDictionary()
    const { header } = dict.pages.administration.profile.components
    const user = useUserStore((s) => s.user)

    // Fetch full tenant details to get the name and other info
    const { data: tenant } = useQuery({
        queryKey: ['tenant', user?.tenant_id],
        queryFn: async () => {
            if (!user?.tenant_id) return null;
            const token = await getIdToken();
            const client = createTenantApiClient({ authToken: token || '' });
            const res = await client.getTenantById(String(user.tenant_id));
            return res.data.data;
        },
        enabled: !!user?.tenant_id,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    if (!user) return null

    return (
        <div className="bg-white p-0 rounded-2xl">
            <div className="rounded-xl border p-6 flex flex-col gap-3">
                <div className="flex gap-6">
                    {/* Avatar / Logo */}
                    <div className="relative">
                        <Image
                            src={user.logo || "/images/user.svg"}
                            width={80}
                            height={80}
                            className="w-20 h-20 rounded-lg object-cover border-2 border-green-500 shadow-sm"
                            alt="Admin Logo"
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                            <span className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full flex items-center gap-1 font-medium">
                                <BadgeCheck size={14} />
                                {header.active}
                            </span>
                        </div>

                        <p className="text-gray-600 text-sm mt-1 flex items-center gap-1.5">
                            <ShieldCheck size={16} className="text-blue-600" />
                            {user.role?.name || "Administrator"}
                        </p>

                        <div className="mt-3 flex items-center gap-3">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 border rounded-full text-xs font-medium text-gray-600">
                                <Building2 size={13} className="text-gray-400" />
                                {tenant?.name_en}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    <InfoItem
                        icon={<Hash size={18} />}
                        iconColor="bg-blue-100 text-blue-700"
                        label={header.employeeId}
                        value={user.id.toString()}
                    />

                    <InfoItem
                        icon={<Mail size={18} />}
                        iconColor="bg-purple-100 text-purple-700"
                        label={header.email}
                        value={user.email}
                    />

                    <InfoItem
                        icon={<Phone size={18} />}
                        iconColor="bg-yellow-100 text-yellow-700"
                        label={header.contact}
                        value={user.phone || "N/A"}
                    />

                    <InfoItem
                        icon={<Calendar size={18} />}
                        iconColor="bg-orange-100 text-orange-700"
                        label={header.joinedOn}
                        value={new Date(user.created_at).toLocaleDateString()}
                    />
                </div>
            </div>
        </div>
    )
}

function InfoItem({
    icon,
    label,
    value,
    iconColor,
}: {
    icon: any
    label: string
    value: string
    iconColor: string
}) {
    return (
        <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconColor} shadow-sm border border-black/5`}
            >
                {icon}
            </div>
            <div className="flex flex-col items-start min-w-0">
                <span className="text-[11px] uppercase tracking-wider font-bold text-gray-400">
                    {label}
                </span>
                <span className="font-semibold text-gray-800 truncate w-full">
                    {value}
                </span>
            </div>
        </div>
    )
}

"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { AdminHeader } from "./_components/AdminHeader"
import { OverviewCards } from "./_components/OverviewCards"
import { DynamicTabs } from "@/components/common/dynamic-tabs-props"
import { useDictionary } from "@/i18n/use-dictionary"

export default function AdminProfilePage() {
    const router = useRouter()
    const params = useSearchParams()
    const dict = useDictionary()
    const { tabs } = dict.pages.administration.profile

    const queryTab = params.get("tab") || "overview"
    const [pageTab, setPageTab] = useState(queryTab)

    const TOP_TABS = [
        { key: "overview", label: tabs.overview },
        { key: "settings", label: tabs.settings },
    ]

    useEffect(() => {
        setPageTab(queryTab)
    }, [queryTab])

    const updateQueryTab = (tab: string) => {
        router.replace(`?tab=${tab}`, { scroll: false })
        setPageTab(tab)
    }

    return (
        <div className="space-y-6 p-6 max-w-7xl mx-auto">
            {/* Admin Info Header */}
            <AdminHeader />

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Navigation Tabs */}
                <div className="flex justify-start border-b border-gray-100 p-4 pb-0 bg-gray-50/50">
                    <DynamicTabs
                        tabs={TOP_TABS}
                        defaultTab={pageTab}
                        variant="wrap"
                        onChange={(key) => updateQueryTab(key)}
                    />
                </div>

                <div className="p-6">
                    {/* Overview Section */}
                    {pageTab === "overview" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="grid gap-2">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {dict.dashboard.todayOverview}
                                </h3>
                                <p className="text-sm text-gray-500 italic">
                                    Last updated: {new Date().toLocaleTimeString()}
                                </p>
                            </div>

                            <OverviewCards />

                            {/* Add more administrative overview sections here if needed */}
                            <div className="mt-8 p-12 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-center bg-gray-50/30">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-2">More Insights Coming Soon</h4>
                                <p className="text-gray-500 max-w-sm">
                                    We are working on adding advanced analytics and activity logs to your administrative profile.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Settings Section Placeholder */}
                    {pageTab === "settings" && (
                        <div className="py-20 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
                            <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 rotate-3">
                                <span className="text-4xl">⚙️</span>
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-3">Profile Settings</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Manage your account preferences, notification settings, and security options right here. This feature is currently in development.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

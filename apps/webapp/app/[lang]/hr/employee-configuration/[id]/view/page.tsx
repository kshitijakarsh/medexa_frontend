"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { ArrowLeft, Edit, User } from "lucide-react"
import { createEmployeeApiClient } from "@/lib/api/employees"
import { getAuthToken } from "@/app/utils/onboarding"
import { Header } from "@/components/header"
import { ROUTES } from "@/lib/routes"
import { useLocaleRoute } from "@/app/hooks/use-locale-route"
import { EmployeeViewTabs } from "./_components/EmployeeViewTabs"

export default function EmployeeViewPage() {
    const { id } = useParams()
    const router = useRouter()
    const localizeRoute = useLocaleRoute()

    const [authToken, setAuthToken] = useState<string>("")

    useEffect(() => {
        const fetchToken = async () => {
            if (typeof window !== "undefined") {
                try {
                    const token = await getAuthToken()
                    setAuthToken(token)
                } catch (error) {
                    console.error("Failed to get auth token:", error)
                    setAuthToken("")
                }
            }
        }
        fetchToken()
    }, [])

    const employeeClient = useMemo(() => {
        if (!authToken) return null
        return createEmployeeApiClient({ authToken })
    }, [authToken])

    const {
        data: employeeData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["employee", id],
        queryFn: async () => {
            if (!employeeClient || !id) throw new Error("API client not initialized")
            const response = await employeeClient.getEmployee(Number(id))
            return response.data.data
        },
        enabled: !!employeeClient && !!id,
    })

    // Format date for display
    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "—"
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
    }

    if (isLoading) return <EmployeeViewSkeleton />

    if (error || !employeeData) {
        return (
            <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
                <Header />
                <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
                    <p className="text-gray-600">Employee not found or an error occurred.</p>
                    <Button variant="outline" onClick={() => router.back()}>
                        Go Back
                    </Button>
                </div>
            </main>
        )
    }

    const fullName = `${employeeData.first_name || ""} ${employeeData.last_name || ""}`.trim()

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
            <Header />

            <div className="p-5 space-y-6">
                {/* Top Header with Employee Info */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                onClick={() => router.back()}
                                className="p-2 rounded-lg hover:bg-blue-50"
                            >
                                <ArrowLeft className="w-5 h-5 text-blue-600" />
                            </Button>
                            <div className="flex items-center gap-4">
                                {employeeData.photo_url ? (
                                    <img
                                        src={employeeData.photo_url}
                                        alt={fullName}
                                        className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                                        <User className="w-8 h-8 text-blue-600" />
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{fullName}</h2>
                                    <p className="text-gray-500 text-sm">Employee ID: {employeeData.id}</p>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={() => router.push(localizeRoute.withLocale(ROUTES.hr.employeeConfiguration.edit(Number(id))))}
                            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Employee
                        </Button>
                    </div>
                </div>

                {/* Quick Info Cards */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        <InfoCard label="Department" value={employeeData.department?.department_name} />
                        <InfoCard label="Designation" value={employeeData.designation?.name} />
                        <InfoCard label="Specialisation" value={employeeData.specialisation?.name} />
                        <InfoCard label="Phone" value={employeeData.phone} />
                        <InfoCard label="Email" value={employeeData.office_email} />
                        <InfoCard label="Emergency Contact" value={employeeData.emergency_contact} />
                        <InfoCard label="Nationality" value={employeeData.country?.name_en} />
                    </div>
                </div>

                {/* Tabbed Content */}
                <div className="bg-white rounded-xl shadow-sm">
                    <EmployeeViewTabs data={employeeData} formatDate={formatDate} />
                </div>
            </div>
        </main>
    )
}

function InfoCard({ label, value }: { label: string; value?: string }) {
    return (
        <div className="flex flex-col bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span className="text-xs text-gray-500 mb-1">{label}</span>
            <span className="text-sm font-medium text-gray-800 truncate">{value || "—"}</span>
        </div>
    )
}

function EmployeeViewSkeleton() {
    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
            <Header />
            <div className="p-5 space-y-6">
                {/* Top Header Skeleton */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-10 h-10 rounded-lg" />
                            <Skeleton className="w-16 h-16 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>

                {/* Quick Info Skeleton */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {[...Array(7)].map((_, i) => (
                            <Skeleton key={i} className="h-16 rounded-lg" />
                        ))}
                    </div>
                </div>

                {/* Tabs Skeleton */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex gap-2 mb-6">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-28 rounded-full" />
                        ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <Skeleton key={i} className="h-16 rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

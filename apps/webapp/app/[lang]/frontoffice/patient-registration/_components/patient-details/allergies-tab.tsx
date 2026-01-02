"use client"

import { useEffect, useState, useRef } from "react"
import { AlertTriangle } from "lucide-react"
import { createPatientAllergiesApiClient } from "@/lib/api/patient-allergies-api"
import type { AllergyItem } from "@/lib/api/patient-allergies-api"

interface AllergiesTabProps {
    patientId: string
}

export function AllergiesTab({ patientId }: AllergiesTabProps) {
    const [allergies, setAllergies] = useState<AllergyItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const isMountedRef = useRef(true)
    const fetchInProgressRef = useRef(false)
    const lastFetchedPatientIdRef = useRef<string | null>(null)

    useEffect(() => {
        isMountedRef.current = true
        return () => {
            isMountedRef.current = false
        }
    }, [])

    useEffect(() => {
        const fetchAllergies = async () => {
            if (!patientId) {
                if (isMountedRef.current) {
                    setLoading(false)
                }
                return
            }

            // Skip if we're already fetching for this patientId
            if (fetchInProgressRef.current && lastFetchedPatientIdRef.current === patientId) {
                return
            }

            fetchInProgressRef.current = true
            lastFetchedPatientIdRef.current = patientId

            try {
                if (isMountedRef.current) {
                    setLoading(true)
                    setError(null)
                }
                
                const apiClient = createPatientAllergiesApiClient()
                const response = await apiClient.getAllergiesByPatientId(patientId, {
                    page: 1,
                    limit: 100, // Fetch all allergies for now
                })
                
                // Only update state if component is still mounted and patientId matches
                if (isMountedRef.current && lastFetchedPatientIdRef.current === patientId) {
                    if (response.data.success) {
                        setAllergies(response.data.data || [])
                    } else {
                        setError(response.data.message || "Failed to fetch allergies")
                    }
                    setLoading(false)
                }
            } catch (err) {
                // Only update state if component is still mounted and patientId matches
                if (isMountedRef.current && lastFetchedPatientIdRef.current === patientId) {
                    setError(err instanceof Error ? err.message : "An error occurred while fetching allergies")
                    setLoading(false)
                }
            } finally {
                if (lastFetchedPatientIdRef.current === patientId) {
                    fetchInProgressRef.current = false
                }
            }
        }

        fetchAllergies()
    }, [patientId])

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
        } catch {
            return dateString
        }
    }

    if (loading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
                Loading allergies...
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-red-500">
                {error}
            </div>
        )
    }

    if (allergies.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
                No allergies recorded
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[calc(100vh-220px)] flex flex-col">
            <div className="p-6">
                <h3 className="text-lg font-bold text-[#1C1C1E]">Allergies & Problems</h3>
            </div>
            <div className="p-6 space-y-4 pt-0">
                {allergies.map((allergy) => (
                    <div key={allergy.id} className="bg-[#FEF2F2] rounded-xl overflow-hidden border border-[#FECACA]/30">
                        {/* Header Row */}
                        <div className="flex items-center justify-between p-4 pb-2">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-[#FEE2E2] rounded-md">
                                    <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1C1C1E] text-base">{allergy.allergy_name}</h4>
                                    {allergy.allergy_type && (
                                        <span className="text-xs text-gray-500">{allergy.allergy_type}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Visit Info Row */}
                        <div className="px-4 pb-4 grid grid-cols-4 gap-8">
                            <div>
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Visit ID</span>
                                <span className="text-[13px] font-medium text-gray-500">{allergy.visit?.id || "N/A"}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Visit Type</span>
                                <span className="text-[13px] font-medium text-gray-500">{allergy.visit?.visit_type || "N/A"}</span>
                            </div>
                        </div>

                        {/* Nested White Details Card */}
                        <div className="mx-4 mb-4 bg-white rounded-lg p-4 grid grid-cols-4 gap-8 shadow-sm">
                            <div className="col-span-1">
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Reaction</span>
                                <span className="text-[13px] font-medium text-gray-500">{allergy.reaction || "N/A"}</span>
                            </div>
                            <div className="col-span-1">
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Date Recorded</span>
                                <span className="text-[13px] font-medium text-gray-500">{formatDate(allergy.date_from)}</span>
                            </div>
                            <div className="col-span-2">
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Recorded By</span>
                                <span className="text-[13px] font-medium text-gray-500">{allergy.createdBy?.name || "N/A"}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

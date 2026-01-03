"use client"

import { useEffect, useState, useRef } from "react"
import { Camera, AlertCircle } from "lucide-react"
import { createPatientAttachmentsApiClient } from "@/lib/api/patient-attachments-api"
import type { AttachmentItem } from "@/lib/api/patient-attachments-api"

interface DocumentsTabProps {
    patientId: string
}

export function DocumentsTab({ patientId }: DocumentsTabProps) {
    const [attachments, setAttachments] = useState<AttachmentItem[]>([])
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
        const fetchAttachments = async () => {
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
                
                const apiClient = createPatientAttachmentsApiClient()
                const response = await apiClient.getAttachmentsByPatientId(patientId, {
                    page: 1,
                    limit: 100, // Fetch all attachments for now
                })
                
                // Only update state if component is still mounted and patientId matches
                if (isMountedRef.current && lastFetchedPatientIdRef.current === patientId) {
                    if (response.data.success) {
                        setAttachments(response.data.data || [])
                    } else {
                        setError(response.data.message || "Failed to fetch documents")
                    }
                    setLoading(false)
                }
            } catch (err) {
                // Only update state if component is still mounted and patientId matches
                if (isMountedRef.current && lastFetchedPatientIdRef.current === patientId) {
                    setError(err instanceof Error ? err.message : "An error occurred while fetching documents")
                    setLoading(false)
                }
            } finally {
                if (lastFetchedPatientIdRef.current === patientId) {
                    fetchInProgressRef.current = false
                }
            }
        }

        fetchAttachments()
    }, [patientId])

    const getDocumentType = (title: string, description?: string): 'Insurance' | 'Lab' | 'Identity' | 'Other' => {
        const lowerTitle = title.toLowerCase()
        const lowerDesc = description?.toLowerCase() || ''
        const combined = `${lowerTitle} ${lowerDesc}`
        
        if (combined.includes('insurance') || combined.includes('health insurance')) {
            return 'Insurance'
        }
        if (combined.includes('lab') || combined.includes('test') || combined.includes('report')) {
            return 'Lab'
        }
        if (combined.includes('passport') || combined.includes('id') || combined.includes('identity')) {
            return 'Identity'
        }
        return 'Other'
    }

    const handleViewDocument = (s3Url: string) => {
        window.open(s3Url, '_blank')
    }

    if (loading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
                Loading documents...
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

    if (attachments.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
                No documents found
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[calc(100vh-220px)] flex flex-col">
            <div className="p-6">
                <h3 className="text-lg font-bold text-[#1C1C1E]">Documents</h3>
            </div>

            <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attachments.map((attachment) => {
                    const docType = getDocumentType(attachment.title, attachment.description)
                    const isInsurance = docType === 'Insurance'
                    const isPassport = docType === 'Identity' && attachment.title.toLowerCase().includes('passport')
                    
                    return (
                        <div key={attachment.id} className="flex flex-col group">
                            <span className="text-[13px] text-[#1C1C1E] font-medium mb-3">{attachment.title}</span>

                            <div className="relative border border-gray-200 rounded-xl overflow-hidden bg-[#F9FAFB] aspect-[16/10] group-hover:shadow-md transition-shadow duration-200">
                                {/* Visual Placeholder mimicking the screenshot look */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                    {isInsurance ? (
                                        // Insurance style placeholder
                                        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-600 rounded-lg p-3 text-white flex flex-col justify-between opacity-80">
                                            <div className="text-[10px] uppercase font-bold tracking-wider">Health Insurance</div>
                                            <div className="w-12 h-8 bg-yellow-400/20 rounded mb-auto mt-2"></div>
                                            <div className="space-y-1">
                                                <div className="h-1.5 bg-white/30 rounded w-2/3"></div>
                                                <div className="h-1.5 bg-white/30 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ) : isPassport ? (
                                        // Passport style placeholder
                                        <div className="w-full h-full bg-[#E5E5E5] flex items-center justify-center">
                                            <div className="text-center opacity-40">
                                                <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-2"></div>
                                                <span className="text-xs font-bold tracking-widest uppercase">PASSPORT COPY</span>
                                            </div>
                                        </div>
                                    ) : (
                                        // Generic/Lab style placeholder
                                        <div className="w-full h-full bg-white border border-gray-200 shadow-sm p-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-4 h-4 rounded-full bg-blue-100"></div>
                                                <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <div className="h-1.5 bg-gray-100 rounded w-full"></div>
                                                <div className="h-1.5 bg-gray-100 rounded w-full"></div>
                                                <div className="h-1.5 bg-gray-100 rounded w-3/4"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Green bar at bottom of image container as seen in screenshot */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#10B981]"></div>
                            </div>

                            <div className="flex items-center justify-between mt-3 px-1">
                                {/* Info icon faint left */}
                                <div 
                                    className="w-6 h-6 flex items-center justify-center rounded-full text-gray-200 hover:text-gray-400 cursor-help transition-colors"
                                    title={attachment.description || attachment.title}
                                >
                                    <AlertCircle className="w-4 h-4" />
                                </div>

                                {/* View Button */}
                                <button
                                    onClick={() => handleViewDocument(attachment.s3_url)}
                                    className="flex items-center gap-2 text-sm text-[#1C1C1E] hover:text-[#007AFF] transition-colors"
                                >
                                    <span>View</span>
                                    <Camera className="w-4 h-4 text-[#007AFF]" />
                                </button>

                                {/* Spacer to balance */}
                                <div className="w-6"></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

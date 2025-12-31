"use client";

import React, { useEffect, useState } from "react";
import { BedCard } from "./bed-card";
import { BedData } from "./mock-data";
import { createFrontofficeBedsApiClient } from "@/lib/api/frontoffice-beds-api";
import { createIPDApiClient } from "@/lib/api/ipd-api";
import { mapBedToBedData } from "@/lib/api/beds-mapper";

interface WardGridProps {
    wardId?: string;
    wardName?: string;
}

export function WardGrid({ wardId, wardName = "ICU Ward" }: WardGridProps) {
    const [beds, setBeds] = useState<BedData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBeds = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch beds
                const bedsClient = createFrontofficeBedsApiClient();
                const bedsParams: any = {
                    page: 1,
                    limit: 100,
                    status: "active", // Only fetch active beds
                };
                if (wardId) {
                    bedsParams.ward_id = wardId;
                }

                const bedsResponse = await bedsClient.getBeds(bedsParams);

                // Fetch IPD data to determine occupied beds
                const ipdClient = createIPDApiClient();
                const ipdResponse = await ipdClient.getIPDs({
                    page: 1,
                    limit: 1000, // Get all IPDs to check bed occupancy
                });

                if (bedsResponse.data.success) {
                    const mappedBeds = bedsResponse.data.data.map((bed) =>
                        mapBedToBedData(bed, ipdResponse.data.success ? ipdResponse.data.data : [])
                    );
                    setBeds(mappedBeds);
                } else {
                    setError("Failed to fetch bed data");
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching beds";
                setError(errorMessage);
                console.error("Error fetching beds:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBeds();
    }, [wardId]);

    const occupiedCount = beds.filter((bed) => bed.status === "Occupied").length;
    const totalBeds = beds.length;

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900">{wardName}</h2>
                    <p className="text-xs text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900">{wardName}</h2>
                    <p className="text-xs text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-900">{wardName}</h2>
                <p className="text-xs text-gray-500">{occupiedCount}/{totalBeds} beds occupied</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {beds.map((bed) => (
                    <BedCard key={bed.id} data={bed} />
                ))}
            </div>
        </div>
    );
}

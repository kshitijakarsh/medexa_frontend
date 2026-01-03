"use client";

import { useState, useEffect } from "react";
import { getIdToken } from "@/app/utils/auth";
import axios from "axios";

export interface DoctorOption {
    label: string;
    value: string;
}

interface DoctorUser {
    id: number;
    sub: string;
    email: string;
    name: string;
    tenant_id: number;
    phone: string;
    role_id: number;
    status: string;
    created_at: string;
    updated_at: string;
}

interface DoctorsResponse {
    success: boolean;
    data: DoctorUser[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export function useDoctors(searchQuery?: string) {
    const [doctors, setDoctors] = useState<DoctorOption[]>([
        { label: "All Doctor", value: "all-doctors" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Debounce search to avoid too many API calls
        const timeoutId = setTimeout(() => {
            const fetchDoctors = async () => {
                setIsLoading(true);
                setError(null);

                try {
                    const token = await getIdToken();
                    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URI || "";

                    const response = await axios.get<DoctorsResponse>(
                        `${baseUrl}/api/v1/doctor/users/soap-notes-creators`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                                Authorization: token ? `Bearer ${token}` : "",
                            },
                            params: {
                                search: searchQuery && searchQuery.length >= 2 ? searchQuery : undefined,
                            },
                        }
                    );

                    // All users from this endpoint are doctors, no need to filter
                    const options: DoctorOption[] = response.data.data.map((user: DoctorUser) => ({
                        label: user.name,
                        value: user.id.toString(),
                    }));

                    // Add "All Doctor" option at the beginning
                    const allOptions: DoctorOption[] = [
                        { label: "All Doctor", value: "all-doctors" },
                        ...options,
                    ];

                    setDoctors(allOptions);
                } catch (err) {
                    console.error("Error fetching doctors:", err);
                    setError(err instanceof Error ? err.message : "Failed to fetch doctors");
                    // Keep "All Doctor" option on error
                    setDoctors([{ label: "All Doctor", value: "all-doctors" }]);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchDoctors();
        }, 300); // 300ms debounce

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    return { doctors, isLoading, error };
}

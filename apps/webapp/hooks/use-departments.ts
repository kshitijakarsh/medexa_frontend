"use client";

import { useState, useEffect } from "react";
import { getIdToken } from "@/app/utils/auth";
import axios from "axios";

export interface DepartmentOption {
    label: string;
    value: string;
}

interface Department {
    id: string;
    department_name: string;
    status: string;
}

interface DepartmentsResponse {
    success: boolean;
    data: Department[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    };
}

export function useDepartments(searchQuery?: string) {
    const [departments, setDepartments] = useState<DepartmentOption[]>([
        { label: "All Departments", value: "all-departments" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const fetchDepartments = async () => {
                setIsLoading(true);
                setError(null);

                try {
                    const token = await getIdToken();
                    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URI || "";

                    const response = await axios.get<DepartmentsResponse>(
                        `${baseUrl}/api/v1/departments`,
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

                    const options: DepartmentOption[] = response.data.data.map((dept: Department) => ({
                        label: dept.department_name,
                        value: dept.id,
                    }));

                    const allOptions: DepartmentOption[] = [
                        { label: "All Departments", value: "all-departments" },
                        ...options,
                    ];

                    setDepartments(allOptions);
                } catch (err) {
                    console.error("Error fetching departments:", err);
                    setError(err instanceof Error ? err.message : "Failed to fetch departments");
                    setDepartments([{ label: "All Departments", value: "all-departments" }]);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchDepartments();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    return { departments, isLoading, error };
}

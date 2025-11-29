"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { ArrowLeft } from "lucide-react";
import { getEmployeeById } from "../_components/view/api";
import { EmployeeDetailsView } from "../_components/view/EmployeeDetailsView";
import { Header } from "@/components/header";

export default function EmployeeDetailsPage() {
    const { id } = useParams(); // Dynamic route param (e.g., EMP122333)
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState<any>(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        // Fetch from API or mock data
        const fetchEmployee = async () => {
            const data = await getEmployeeById(id as string);
            setEmployee(data);
            setLoading(false);
        };
        fetchEmployee();
    }, [id]);

    if (loading) return <EmployeeSkeleton />;

    if (!employee)
        return (
            <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
                <Header />
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                    <p className="text-gray-600">Employee not found</p>
                    <Button variant="outline" onClick={() => router.push("/employee-configuration")}>
                        Go Back
                    </Button>
                </div>
            </main>
        );

    return (
        <EmployeeDetailsView employee={employee} onBack={() => router.back()} />
    );
}

function EmployeeSkeleton() {
    return (
        // <main className="min-h-screen bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] p-6 space-y-4">
        <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
            <Header />

            <div className="p-5 space-y-8">
                <div className="bg-white rounded-md shadow-sm p-5">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-16 h-16 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-3 w-1/6" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm grid md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <Skeleton key={i} className="h-14 rounded-md" />
                    ))}
                </div>
            </div>
        </main>
    );
}

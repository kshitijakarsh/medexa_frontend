"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "@workspace/ui/hooks/use-form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { Form } from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import { PageHeader } from "@/components/common/page-header";
import { TopEmployeeInfo } from "../../add/_components/TopEmployeeInfo";
import { EmployeeFormTabs } from "../../add/_components/EmployeeFormTabs";
import { Header } from "@/components/header";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployeeApiClient } from "@/lib/api/employees";
import { getAuthToken } from "@/app/utils/onboarding";

const employeeSchema = z.object({
    // Common fields
    first_name: z.string().min(1, "Required"),
    last_name: z.string().min(1, "Required"),
    department: z.string().min(1, "Required"),
    designation: z.string().min(1, "Required"),
    specialization: z.string().min(1, "Required"),
    role: z.string().min(1, "Required"),
    active: z.boolean().catch(false),

    // Personal Details
    gender: z.string().optional(),
    dob: z.string().optional(),
    marital_status: z.string().optional(),
    nationality: z.string().optional(),
    cpr: z.string().optional(),
    cpr_expiration: z.string().optional(),
    blood_group: z.string().optional(),
    employee_photo: z.any().optional(),

    // Contact Details
    phone: z.string().optional(),
    email: z.string().optional(),
    office_email: z.string().optional(),
    emergency_contact: z.string().optional(),
    local_address: z.string().optional(),
    permanent_address: z.string().optional(),
    language: z.string().optional(),

    // Employment
    qualification: z.string().optional(),
    years_experience: z.string().optional(),

    // Visa / License
    visa_start: z.string().optional(),
    visa_expiration: z.string().optional(),
    passport_number: z.string().optional(),
    passport_expiration: z.string().optional(),
    license_number: z.string().optional(),
    license_expiration: z.string().optional(),

    // Contract & Payroll
    joining_date: z.string().optional(),
    contract_type: z.string().optional(),
    contract_start_date: z.string().optional(),
    contract_expiration_date: z.string().optional(),
    basic_salary: z.string().optional(),

    // System Access
    username: z.string().optional(),
    password: z.string().optional(),
});

export default function EditEmployeePage() {
    const { id } = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState("Personal Details");
    const [authToken, setAuthToken] = useState<string>("");

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await getAuthToken();
                setAuthToken(token);
            } catch (error) {
                console.error("Failed to get auth token:", error);
            }
        };
        fetchToken();
    }, []);

    const employeeClient = useMemo(() => {
        if (!authToken) return null;
        return createEmployeeApiClient({ authToken });
    }, [authToken]);

    const {
        data: employeeData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["employee", id],
        queryFn: async () => {
            if (!employeeClient || !id) throw new Error("API client not initialized");
            // Note: The API doesn't have GET by ID, so we'll need to fetch from list
            // For now, we'll handle this differently - fetch all and filter
            const response = await employeeClient.getEmployees({ page: 1, limit: 1000 });
            const employee = response.data.data.find((emp) => emp.id === Number(id));
            if (!employee) throw new Error("Employee not found");
            return employee;
        },
        enabled: !!employeeClient && !!id,
    });

    const form = useForm({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            department: "",
            designation: "",
            specialization: "",
            role: "",
            active: true,
        },
    });

    // Populate form when employee data is loaded
    useEffect(() => {
        if (employeeData) {
            form.reset({
                first_name: employeeData.first_name || "",
                last_name: employeeData.last_name || "",
                department: employeeData.department_id?.toString() || "",
                designation: employeeData.designation_id?.toString() || "",
                specialization: employeeData.specialisation_id?.toString() || "",
                role: employeeData.role_id?.toString() || "",
                active: employeeData.status === "active",
                gender: employeeData.gender || "",
                dob: employeeData.dob || "",
                marital_status: employeeData.marital_status || "",
                nationality: employeeData.nationality || "",
                cpr: employeeData.cpr || "",
                cpr_expiration: employeeData.cpr_expiration || "",
                blood_group: employeeData.blood_group || "",
                employee_photo: employeeData.employee_photo || "",
                phone: employeeData.phone || "",
                email: employeeData.email || "",
                office_email: employeeData.office_email || "",
                emergency_contact: employeeData.emergency_contact || "",
                local_address: employeeData.local_address || "",
                permanent_address: employeeData.permanent_address || "",
                language: employeeData.language || "",
                qualification: employeeData.qualification || "",
                years_experience: employeeData.years_experience || "",
                visa_start: employeeData.visa_start || "",
                visa_expiration: employeeData.visa_expiration || "",
                passport_number: employeeData.passport_number || "",
                passport_expiration: employeeData.passport_expiration || "",
                license_number: employeeData.license_number || "",
                license_expiration: employeeData.license_expiration || "",
                joining_date: employeeData.joining_date || "",
                contract_type: employeeData.contract_type || "",
                contract_start_date: employeeData.contract_start_date || "",
                contract_expiration_date: employeeData.contract_expiration_date || "",
                basic_salary: employeeData.basic_salary || "",
                username: employeeData.username || "",
                password: employeeData.password || "",
            });
        }
    }, [employeeData, form]);

    const updateMutation = useMutation({
        mutationFn: async (values: any) => {
            if (!employeeClient || !id) throw new Error("API client not initialized");
            await employeeClient.updateEmployee(Number(id), {
                first_name: values.first_name,
                last_name: values.last_name,
                department_id: values.department ? Number(values.department) : undefined,
                designation_id: values.designation ? Number(values.designation) : undefined,
                specialisation_id: values.specialization ? Number(values.specialization) : undefined,
                role_id: values.role ? Number(values.role) : undefined,
                status: values.active ? "active" : "inactive",
                gender: values.gender || undefined,
                dob: values.dob || undefined,
                marital_status: values.marital_status || undefined,
                nationality: values.nationality || undefined,
                cpr: values.cpr || undefined,
                cpr_expiration: values.cpr_expiration || undefined,
                blood_group: values.blood_group || undefined,
                employee_photo: values.employee_photo || undefined,
                phone: values.phone || undefined,
                email: values.email || undefined,
                office_email: values.office_email || undefined,
                emergency_contact: values.emergency_contact || undefined,
                local_address: values.local_address || undefined,
                permanent_address: values.permanent_address || undefined,
                language: values.language || undefined,
                qualification: values.qualification || undefined,
                years_experience: values.years_experience || undefined,
                visa_start: values.visa_start || undefined,
                visa_expiration: values.visa_expiration || undefined,
                passport_number: values.passport_number || undefined,
                passport_expiration: values.passport_expiration || undefined,
                license_number: values.license_number || undefined,
                license_expiration: values.license_expiration || undefined,
                joining_date: values.joining_date || undefined,
                contract_type: values.contract_type || undefined,
                contract_start_date: values.contract_start_date || undefined,
                contract_expiration_date: values.contract_expiration_date || undefined,
                basic_salary: values.basic_salary || undefined,
                username: values.username || undefined,
                password: values.password || undefined,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            queryClient.invalidateQueries({ queryKey: ["employee", id] });
            router.push("/employee-configuration");
        },
    });

    const handleSave = async (values: any) => {
        try {
            await updateMutation.mutateAsync(values);
        } catch (error) {
            console.error("Failed to update employee:", error);
        }
    };

    if (isLoading) {
        return (
            <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
                <Header />
                <div className="p-5 space-y-8">
                    <div className="bg-white p-5 rounded-md shadow-sm">
                        <div className="text-center py-8">Loading employee data...</div>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
                <Header />
                <div className="p-5 space-y-8">
                    <div className="bg-white p-5 rounded-md shadow-sm">
                        <div className="text-center py-8 text-red-600">
                            {error instanceof Error ? error.message : "Failed to load employee"}
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={() => router.push("/employee-configuration")}>
                                Go Back
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
            <Header />

            <div className="p-5 space-y-8">
                <div className="bg-white p-5 rounded-md shadow-sm space-y-6">
                    <PageHeader title="Edit Human Resource / Employee" />

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
                            {/* Always visible top info */}
                            <TopEmployeeInfo form={form} />

                            {/* Tabs for section forms */}
                            <EmployeeFormTabs form={form} activeTab={activeTab} setActiveTab={setActiveTab} />

                            {/* Save/Cancel */}
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="text-blue-600 border-blue-500"
                                    onClick={() => router.push("/employee-configuration")}
                                    disabled={updateMutation.isPending}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600"
                                    disabled={updateMutation.isPending}
                                >
                                    {updateMutation.isPending ? "Saving..." : "Save"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    );
}


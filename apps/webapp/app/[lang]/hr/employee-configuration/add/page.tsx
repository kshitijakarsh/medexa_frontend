// "use client";

// import { useState } from "react";
// import { Button } from "@workspace/ui/components/button";
// import { PageHeader } from "@/components/common/PageHeader";
// import { EmployeeFormTabs } from "./_components/EmployeeFormTabs";
// import { MoveLeft } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function AddEmployeePage() {
//   const router = useRouter();
//   const [status, setStatus] = useState(true); // active/inactive toggle

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] p-5">
//       <div className="bg-white p-5 rounded-md shadow-sm">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-3">
//             <Button
//               variant="ghost"
//               className="bg-blue-700 hover:bg-blue-500 text-white p-1 rounded-md"
//               onClick={() => router.back()}
//             >
//               <MoveLeft className="w-5 h-5" />
//             </Button>
//             <h1 className="text-lg font-semibold text-gray-800">
//               Add Human Resource / New Employee
//             </h1>
//           </div>

//           {/* Status toggle */}
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-500">Status</span>
//             <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2">
//               <span
//                 className={`text-sm px-2 py-1 rounded-full ${
//                   !status ? "bg-red-100 text-red-600" : ""
//                 }`}
//               >
//                 Inactive
//               </span>
//               <div
//                 onClick={() => setStatus(!status)}
//                 className={`w-12 h-6 rounded-full cursor-pointer transition-all relative ${
//                   status ? "bg-green-500" : "bg-gray-300"
//                 }`}
//               >
//                 <div
//                   className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow transition-transform ${
//                     status ? "translate-x-6" : ""
//                   }`}
//                 />
//               </div>
//               <span
//                 className={`text-sm px-2 py-1 rounded-full ${
//                   status ? "bg-green-100 text-green-600" : ""
//                 }`}
//               >
//                 Active
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Tabs + Content */}
//         <EmployeeFormTabs />

//         {/* Action buttons */}
//         <div className="flex justify-end mt-8 gap-3">
//           <Button variant="outline" onClick={() => router.back()}>
//             Cancel
//           </Button>
//           <Button className="bg-blue-600 text-white hover:bg-blue-500">
//             Save
//           </Button>
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@workspace/ui/hooks/use-form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { Form } from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import { PageHeader } from "@/components/common/page-header";
import { TopEmployeeInfo } from "./_components/TopEmployeeInfo";
import { EmployeeFormTabs } from "./_components/EmployeeFormTabs";
import { Header } from "@/components/header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export default function AddEmployeePage() {
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

    const createMutation = useMutation({
        mutationFn: async (values: any) => {
            if (!employeeClient) throw new Error("API client not initialized");
            await employeeClient.createEmployee({
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
            router.push("/employee-configuration");
        },
    });

    const handleSave = async (values: any) => {
        try {
            await createMutation.mutateAsync(values);
        } catch (error) {
            console.error("Failed to create employee:", error);
        }
    };

    return (
        // <main className="min-h-screen bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] p-5">
        <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
            <Header />

            <div className="p-5 space-y-8">
                <div className="bg-white p-5 rounded-md shadow-sm space-y-6">
                    <PageHeader title="Add Human Resource / New Employee" />

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
                                    disabled={createMutation.isPending}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600"
                                    disabled={createMutation.isPending}
                                >
                                    {createMutation.isPending ? "Saving..." : "Save"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    );
}

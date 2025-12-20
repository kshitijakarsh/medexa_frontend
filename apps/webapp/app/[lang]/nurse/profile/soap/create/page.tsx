// "use client";

// import { useRouter } from "next/navigation";

// export default function SoapCreateTemplate() {
//   const router = useRouter();

//   return (
//     <div className="p-6 space-y-6 bg-white border rounded-xl shadow-sm">

//       <h2 className="text-lg font-semibold">SOAP Templates</h2>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="text-sm font-medium">Template Name</label>
//           <input
//             placeholder="Enter Template Name"
//             className="mt-1 w-full px-3 py-2 border rounded-lg"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Specialty</label>
//           <select className="mt-1 w-full px-3 py-2 border rounded-lg">
//             <option>Select Specialty</option>
//           </select>
//         </div>
//       </div>

//       <div className="bg-blue-50 p-4 rounded-xl border space-y-4">
//         <h3 className="font-semibold">SOAP Templates Data</h3>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm font-medium">Subjective</label>
//             <textarea
//               rows={3}
//               placeholder="Enter Subjective"
//               className="mt-1 w-full px-3 py-2 border rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Objective</label>
//             <textarea
//               rows={3}
//               placeholder="Enter Clinical Notes"
//               className="mt-1 w-full px-3 py-2 border rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Assessment</label>
//             <textarea
//               rows={3}
//               placeholder="Enter Assessment Template"
//               className="mt-1 w-full px-3 py-2 border rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Plan</label>
//             <textarea
//               rows={3}
//               placeholder="Enter Plan Template"
//               className="mt-1 w-full px-3 py-2 border rounded-lg"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-4">
//         <button
//           onClick={() => router.back()}
//           className="px-6 py-2 border rounded-lg text-gray-700"
//         >
//           Cancel
//         </button>

//         <button className="px-6 py-2 rounded-lg bg-green-600 text-white">
//           Save Templates
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm } from "@workspace/ui/hooks/use-form";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";

import { AppSelect } from "@/components/common/app-select";
import { SOAP_SPECIALTIES } from "../_components/soap-specialties";

import { toast } from "@workspace/ui/lib/sonner";
import { getAuthToken } from "@/app/utils/onboarding";
import { getIdToken } from "@/app/utils/auth";
import { createSoapTemplateApiClient } from "@/lib/api/doctor/soap-template.api";

import {
    soapTemplateSchema,
    SoapTemplateFormSchema,
} from "../_components/soap-template-schema";

export default function SoapCreateTemplate() {
    const router = useRouter();

    /* ---------------- Auth ---------------- */
    const [authToken, setAuthToken] = useState("");

    useEffect(() => {
        const loadToken = async () => {
            const token = await getAuthToken();
            await getIdToken();
            setAuthToken(token);
        };
        loadToken();
    }, []);

    const api = authToken
        ? createSoapTemplateApiClient({ authToken })
        : null;

    /* ---------------- Form ---------------- */
    const form = useForm<SoapTemplateFormSchema>({
        resolver: zodResolver(soapTemplateSchema),
        defaultValues: {
            template_name: "",
            specialty: "",
            subjective: "",
            objective: "",
            assessment: "",
            plan: "",
        },
    });

    /* ---------------- Mutation ---------------- */
    const createMutation = useMutation({
        mutationFn: (values: SoapTemplateFormSchema) =>
            api!.createSoapTemplate(values),
        onSuccess: () => {
            toast.success("SOAP template created successfully");
            router.back();
        },
        onError: (err: any) =>
            toast.error(err.message || "Failed to create SOAP template"),
    });

    /* ---------------- UI (UNCHANGED) ---------------- */
    return (
        <div className="p-4">
            <div className="p-6 bg-white border rounded-xl shadow-sm space-y-6">
                <h2 className="text-lg font-semibold">SOAP Templates</h2>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) =>
                            createMutation.mutate(values)
                        )}
                        className="space-y-6"
                    >
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="template_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Template Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Template Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="specialty"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Specialty</FormLabel>
                                        <FormControl>
                                            <AppSelect
                                                placeholder="Select Specialty"
                                                value={field.value}
                                                onChange={field.onChange}
                                                options={SOAP_SPECIALTIES}
                                                error={fieldState.error}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* SOAP Data */}
                        <div className="bg-blue-50/30 border rounded-xl p-5 space-y-4">
                            <h3 className="font-semibold">SOAP Templates Data</h3>

                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { key: "subjective", label: "Subjective", placeholder: "Enter Subjective" },
                                    { key: "objective", label: "Objective", placeholder: "Enter Clinical Notes" },
                                    { key: "assessment", label: "Assessment", placeholder: "Enter Objective Template" },
                                    { key: "plan", label: "Plan", placeholder: "Enter Plan Template" },
                                ].map(({ key, label, placeholder }) => (
                                    <FormField
                                        key={key}
                                        control={form.control}
                                        name={key as keyof SoapTemplateFormSchema}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{label}</FormLabel>
                                                <FormControl>
                                                    <textarea
                                                        rows={3}
                                                        placeholder={placeholder}
                                                        className="mt-1 w-full px-3 py-2 border rounded-lg"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={createMutation.isPending}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                disabled={createMutation.isPending}
                            >
                                {createMutation.isPending ? "Saving..." : "Save Templates"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

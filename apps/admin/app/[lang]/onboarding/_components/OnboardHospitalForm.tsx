// components/OnboardHospitalForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm } from "@workspace/ui/hooks/use-form";
import { Form } from "@workspace/ui/components/form";
import { Header } from "@/components/header";
import { FormHeader } from "./ui/FormHeader";
import { HospitalInfoSection } from "./sections/HospitalInfoSection";
import { AdminAccountSection } from "./sections/AdminAccountSection";
import { ModuleAssignmentSection } from "./sections/ModulesAssignmentSection";
import { UserCredentialSection } from "./sections/UserCredentialSection";
import { FormActionsSection } from "./sections/FormActionsSection";

type ModuleOption = { id: string; label: string };

const MODULE_OPTIONS: ModuleOption[] = [
    { id: "ipd", label: "IPD" },
    { id: "opd", label: "OPD" },
    { id: "ot", label: "OT" },
];

// Zod validation schema
const hospitalSchema = z.object({
    id: z.string().optional(), // present only for edit
    hospitalName: z.string().min(3, "Hospital name is required"),
    mophLicenseNumber: z.string().optional(),
    tradeLicense: z.string().optional(),
    taxRegistrationNumber: z.string().optional(),
    contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
    contactPhone: z
        .string()
        .optional()
        .refine((v) => !v || /^[+\d\s()-]{7,20}$/.test(v), "Invalid phone"),
    emergencyContactNumber: z.string().optional(),
    city: z.string().optional(),
    fullAddress: z.string().optional(),
    adminFullName: z.string().optional(),
    adminDesignation: z.string().optional(),
    adminEmail: z.string().optional(),
    adminPhone: z.string().optional(),
    modules: z.array(z.string()).optional(),
    userFullName: z.string().optional(),
    userPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type HospitalFormValues = z.infer<typeof hospitalSchema>;

export interface OnboardHospitalFormProps {
    /** optional hospital id for editing; if provided, form will fetch data to prefill */
    hospitalId?: string;
    onSuccess?: (data: any) => void;
}

export default function OnboardHospitalForm({
    hospitalId,
    onSuccess,
}: OnboardHospitalFormProps) {
    // local UI state for image preview & upload
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const defaultValues: HospitalFormValues = {
        hospitalName: "",
        mophLicenseNumber: "",
        tradeLicense: "",
        taxRegistrationNumber: "",
        contactEmail: "",
        contactPhone: "",
        emergencyContactNumber: "",
        city: "",
        fullAddress: "",
        adminFullName: "",
        adminDesignation: "",
        adminEmail: "",
        adminPhone: "",
        modules: [],
        userFullName: "",
        userPassword: "",
    };

    // Using your project's `useForm` (assumed wrapper around react-hook-form)
    const form = useForm<HospitalFormValues>({
        resolver: zodResolver(hospitalSchema),
        defaultValues,
    });

    // Fetch data for edit (if hospitalId provided)
    useEffect(() => {
        if (!hospitalId) return;
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/hospitals/${hospitalId}`);
                if (!res.ok) throw new Error("Failed to fetch hospital");
                const data = await res.json();
                if (!mounted) return;

                // map API shape to form values - adapt as needed
                const mapped: Partial<HospitalFormValues> = {
                    id: data.id,
                    hospitalName: data.hospitalName ?? "",
                    mophLicenseNumber: data.mophLicenseNumber ?? "",
                    tradeLicense: data.tradeLicense ?? "",
                    taxRegistrationNumber: data.taxRegistrationNumber ?? "",
                    contactEmail: data.contactEmail ?? "",
                    contactPhone: data.contactPhone ?? "",
                    emergencyContactNumber: data.emergencyContactNumber ?? "",
                    city: data.city ?? "",
                    fullAddress: data.fullAddress ?? "",
                    adminFullName: data.admin?.fullName ?? "",
                    adminDesignation: data.admin?.designation ?? "",
                    adminEmail: data.admin?.email ?? "",
                    adminPhone: data.admin?.phone ?? "",
                    modules: data.modules ?? [],
                    userFullName: data.userCredential?.fullName ?? "",
                    // do NOT set password from server
                };
                form.reset({ ...defaultValues, ...mapped });
                if (data.logoUrl) setLogoPreview(data.logoUrl);
            } catch (err: any) {
                console.error(err);
                setServerError(err?.message ?? "Failed to fetch hospital");
            } finally {
                setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [hospitalId]);

    // handle file input change
    const onLogoSelected = (file?: File | null) => {
        setLogoFile(file ?? null);
        if (!file) {
            setLogoPreview(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => setLogoPreview(String(e.target?.result ?? null));
        reader.readAsDataURL(file);
    };

    // modules toggle helper
    const toggleModule = (id: string) => {
        const modules = form.getValues("modules") ?? [];
        if (modules.includes(id)) {
            form.setValue(
                "modules",
                modules.filter((m) => m !== id),
                { shouldValidate: true }
            );
        } else {
            form.setValue("modules", [...modules, id], { shouldValidate: true });
        }
    };

    const onSubmit = async (values: HospitalFormValues) => {
        setLoading(true);
        setServerError(null);

        try {
            // prepare form payload (multipart if uploading image)
            const isEdit = Boolean(hospitalId || values.id);
            const url = isEdit ? `/api/hospitals/${hospitalId ?? values.id}` : "/api/hospitals";
            const method = isEdit ? "PUT" : "POST";

            // Build FormData to support file upload
            const formData = new FormData();
            Object.entries(values).forEach(([k, v]) => {
                if (v === undefined || v === null) return;
                if (Array.isArray(v)) {
                    formData.append(k, JSON.stringify(v));
                } else {
                    formData.append(k, String(v));
                }
            });

            if (logoFile) {
                formData.append("logo", logoFile);
            }

            const res = await fetch(url, {
                method,
                body: formData,
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || "Failed to save hospital");
            }

            const saved = await res.json();
            onSuccess?.(saved);
            // optionally reset or navigate away
            form.reset(defaultValues);
            setLogoFile(null);
            setLogoPreview(null);
        } catch (err: any) {
            console.error(err);
            setServerError(err?.message ?? "Failed to save hospital");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-svh w-full">
            <Header />
            <div className="">
                {/* Header Section */}
                <div className="flex flex-col items-start justify-between mb-6">
                    <FormHeader title="Onboard New Hospital" backHref="/hospitals" />
                    <div className=" p-4 w-full py-3">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                                noValidate
                            >
                                {/* Hospital Information */}
                                <HospitalInfoSection
                                    form={form}
                                    logoPreview={logoPreview}
                                    setLogoPreview={setLogoPreview}
                                    logoFile={logoFile}
                                    setLogoFile={setLogoFile}
                                    onLogoSelected={onLogoSelected}
                                />

                                {/* Admin Account */}
                                <AdminAccountSection
                                    form={form}
                                />

                                {/* Modules Assignment */}
                                <ModuleAssignmentSection form={form} />


                                {/* User Credential */}
                                <UserCredentialSection form={form} />

                                {/* Form Actions */}
                                <FormActionsSection
                                    serverError={serverError}
                                    loading={loading}
                                    onReset={() => form.reset(defaultValues)}
                                    isEdit={hospitalId}
                                />
                            </form>
                        </Form>
                    </div >
                </div>
            </div>
        </main>
    );
}

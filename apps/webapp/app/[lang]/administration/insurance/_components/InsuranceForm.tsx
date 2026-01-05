"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@workspace/ui/hooks/use-form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
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
import { UploadCard } from "@/components/common/upload-card";
import { StatusSwitch } from "@/components/common/switch-green";
import { PageHeader } from "@/components/common/page-header";

import {
    useCreateInsurance,
    useUpdateInsurance,
} from "./hooks/hooks";

import { useFileUpload } from "@/app/hooks/useFileUpload";
import type {
    CreateInsuranceParams,
    UpdateInsuranceParams,
} from "@/lib/api/administration/insurance";
import { ActionButton } from "@/components/common/action-button";
import { ROUTES } from "@/lib/routes";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";

/* ---------------- SCHEMA ---------------- */

const schema = z.object({
    providerName: z.string().min(1),
    companyName: z.string().min(1),
    approvalUrl: z.string().url(),
    consultationServiceCode: z.string().optional(),
    registrationServiceCode: z.string().optional(),
    trn: z.string().optional(),
    address: z.string().min(1),
    active: z.boolean(),
    employee_photo: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
    mode: "create" | "edit";
    id?: string;
    initialData?: any;
}

export function InsuranceForm({ mode, id, initialData }: Props) {
    const { withLocale } = useLocaleRoute();
    const router = useRouter();
    const createInsurance = useCreateInsurance();
    const updateInsurance = useUpdateInsurance();
    const { uploadFile, isUploading } = useFileUpload();

    const isSubmitting =
        createInsurance.isPending || updateInsurance.isPending || isUploading;

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            providerName: "",
            companyName: "",
            approvalUrl: "",
            consultationServiceCode: "",
            registrationServiceCode: "",
            trn: "",
            address: "",
            active: true,
            employee_photo: null,
        },
    });

    /* ---------- PREFILL FOR EDIT ---------- */
    useEffect(() => {
        if (mode === "edit" && initialData) {
            form.reset({
                providerName: initialData.provider_name,
                companyName: initialData.company_name,
                approvalUrl: initialData.approval_url,
                consultationServiceCode:
                    initialData.consulting_service_code || "",
                registrationServiceCode:
                    initialData.registration_service_code || "",
                trn: initialData.trn || "",
                address: initialData.address || "",
                active: initialData.status === "active",
                employee_photo: null,
            });
        }
    }, [mode, initialData, form]);

    /* ---------- SUBMIT ---------- */
    const onSubmit = async (values: FormValues) => {
        let logoUrl = initialData?.insurance_company_logo_url;

        if (values.employee_photo) {
            logoUrl = await uploadFile(values.employee_photo, "insurances");
        }

        // const payload: UpdateInsuranceParams = {
        //     provider_name: values.providerName,
        //     company_name: values.companyName,
        //     approval_url: values.approvalUrl,
        //     status: values.active ? "active" : "inactive",
        //     consulting_service_code:
        //         values.consultationServiceCode || undefined,
        //     registration_service_code:
        //         values.registrationServiceCode || undefined,
        //     trn: values.trn || undefined,
        //     address: values.address,
        //     insurance_company_logo_url: logoUrl,
        // };

        // if (mode === "create") {
        //     createInsurance.mutate(payload, {
        //         onSuccess: () => router.push("/company-list"),
        //     });
        // } else {
        //     updateInsurance.mutate(
        //         { id: id!, payload },
        //         {
        //             onSuccess: () =>
        //                 router.push(`/insurance/${id}/view`),
        //         }
        //     );
        // }
        if (mode === "create") {
            const payload: CreateInsuranceParams = {
                provider_name: values.providerName,
                company_name: values.companyName,
                approval_url: values.approvalUrl,
                status: values.active ? "active" : "inactive",
                consulting_service_code:
                    values.consultationServiceCode || undefined,
                registration_service_code:
                    values.registrationServiceCode || undefined,
                trn: values.trn || undefined,
                address: values.address,
                insurance_company_logo_url: logoUrl,
            };

            createInsurance.mutate(payload, {
                onSuccess: () => router.push(withLocale(`${ROUTES.ADMINISTRATION_INSURANCE}`)),
            });

        } else {
            const payload: UpdateInsuranceParams = {
                provider_name: values.providerName,
                company_name: values.companyName,
                approval_url: values.approvalUrl,
                status: values.active ? "active" : "inactive",
                consulting_service_code:
                    values.consultationServiceCode || undefined,
                registration_service_code:
                    values.registrationServiceCode || undefined,
                trn: values.trn || undefined,
                address: values.address,
                insurance_company_logo_url: logoUrl,
            };

            updateInsurance.mutate(
                { id: id!, payload },
                {
                    onSuccess: () => router.push(withLocale(`${ROUTES.ADMINISTRATION_INSURANCE}/${id}/view`)),
                }
            );
        }

    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
            <div className="m-5 p-5 bg-white rounded-xl shadow">
                {/* <PageHeader
                    title={mode === "create" ? "Add Company" : "Edit Company"}
                /> */}

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <PageHeader title="Add Company List" />
                            {/* STATUS */}
                            <FormField
                                name="active"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex items-center">
                                        <FormControl>
                                            <div
                                                className={`flex items-center gap-3 rounded-md px-3 py-2 ${field.value ? "bg-green-50" : "bg-gray-50"}`}
                                            >
                                                <span className="text-sm text-red-500 font-medium">Inactive</span>
                                                <StatusSwitch checked={field.value} onCheckedChange={field.onChange} />
                                                <span className="text-sm text-green-600 font-medium">Active</span>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                                control={form.control}
                                name="providerName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Provider Name *</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name *</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="approvalUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Approval URL *</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="consultationServiceCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Consultation Service Code</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="registrationServiceCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Registration Service Code</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="trn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>TRN</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address *</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* LOGO */}
                        <div >

                            <FormField
                                name="employee_photo"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="pt-4 max-w-sm">
                                        <FormLabel>Employee Photo</FormLabel>
                                        <FormControl>

                                            <UploadCard
                                                title="Insurance Logo"
                                                value={field.value}
                                                previewUrl={
                                                    initialData?.insurance_company_logo_url
                                                }
                                                onFileSelect={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <ActionButton
                                type="submit"
                                className="bg-green-600"
                                disabled={isSubmitting}
                                label={isSubmitting
                                    ? mode === "create"
                                        ? "Saving..."
                                        : "Updating..."
                                    : mode === "create"
                                        ? "Save"
                                        : "Update"}
                            />

                        </div>
                    </form>
                </Form>
            </div>
        </main >
    );
}

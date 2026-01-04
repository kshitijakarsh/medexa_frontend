"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";

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
import { SOAP_SPECIALTIES } from "../../_components/soap-specialties";

import { toast } from "@workspace/ui/lib/sonner";
import { getAuthToken } from "@/app/utils/onboarding";
import { getIdToken } from "@/app/utils/auth";
import { createSoapTemplateApiClient } from "@/lib/api/doctor/soap-template.api";

import {
    soapTemplateSchema,
    SoapTemplateFormSchema,
} from "../../_components/soap-template-schema";
import { useDictionary } from "@/i18n/dictionary-context";

export default function SoapEditTemplate() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const dict = useDictionary();
    const { soapTemplates } = dict.pages.doctor.profile;

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

    /* ---------------- Fetch Template ---------------- */
    const {
        data: template,
        isLoading: isFetching,
    } = useQuery({
        queryKey: ["soap-template", id],
        enabled: !!authToken && !!id,
        queryFn: async () =>
            (await api!.getSoapTemplateById(id)).data.data,
    });

    useEffect(() => {
        if (template) {
            form.reset({
                template_name: template.template_name,
                specialty: template.specialty,
                subjective: template.subjective,
                objective: template.objective,
                assessment: template.assessment,
                plan: template.plan,
            });
        }
    }, [template]);


    /* ---------------- Update Mutation ---------------- */
    const updateMutation = useMutation({
        mutationFn: (values: SoapTemplateFormSchema) =>
            api!.updateSoapTemplate(id, values),
        onSuccess: () => {
            toast.success(soapTemplates.updateSuccess);
            router.back();
        },
        onError: (err: any) =>
            toast.error(err.message || soapTemplates.updateError),
    });

    /* ---------------- UI ---------------- */
    return (
        <div className="p-6 bg-white border rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-semibold">{soapTemplates.title}</h2>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((values) => (
                        // console.log(values),
                        updateMutation.mutate(values)
                    )
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
                                    <FormLabel>{soapTemplates.templateName}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={soapTemplates.enterTemplateName}
                                            {...field}
                                            disabled={isFetching}
                                        />
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
                                    <FormLabel>{soapTemplates.specialty}</FormLabel>
                                    <FormControl>
                                        <AppSelect
                                            placeholder={soapTemplates.selectSpecialty}
                                            value={field.value}
                                            onChange={field.onChange}
                                            options={SOAP_SPECIALTIES}
                                            error={fieldState.error}
                                            disabled={isFetching}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* SOAP Data */}
                    <div className="bg-blue-50 border rounded-xl p-5 space-y-4">
                        <h3 className="font-semibold">{soapTemplates.dataTitle}</h3>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                {
                                    key: "subjective",
                                    label: soapTemplates.subjective,
                                    placeholder: soapTemplates.enterSubjective,
                                },
                                {
                                    key: "objective",
                                    label: soapTemplates.objective,
                                    placeholder: soapTemplates.enterObjective,
                                },
                                {
                                    key: "assessment",
                                    label: soapTemplates.assessment,
                                    placeholder: soapTemplates.enterAssessment,
                                },
                                {
                                    key: "plan",
                                    label: soapTemplates.plan,
                                    placeholder: soapTemplates.enterPlan,
                                },
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
                                                    disabled={isFetching}
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
                            disabled={updateMutation.isPending}
                        >
                            {soapTemplates.cancel}
                        </Button>

                        <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={updateMutation.isPending || isFetching}
                        >
                            {updateMutation.isPending ? soapTemplates.updating : soapTemplates.update}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

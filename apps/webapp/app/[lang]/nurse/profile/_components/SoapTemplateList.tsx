// "use client";

// import { useLocaleRoute } from "@/app/hooks/use-locale-route";
// import NewButton from "@/components/common/new-button";
// import { ROUTES } from "@/lib/routes";
// import { Calendar, Pencil, Trash2, Plus } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const templates = [
//     {
//         id: 1,
//         title: "Cardiology Stomach Pain",
//         specialty: "Cardiology",
//         date: "Nov 14, 2024",
//     },
//     {
//         id: 2,
//         title: "Cardiology Stomach Pain",
//         specialty: "Cardiology",
//         date: "Nov 14, 2024",
//     },
//     {
//         id: 3,
//         title: "Cardiology Stomach Pain",
//         specialty: "Cardiology",
//         date: "Nov 14, 2024",
//     },
// ];

// export function SoapTemplateList() {
//     const router = useRouter()
//     const { withLocale } = useLocaleRoute()

//     return (
//         <div className="space-y-4">
//             {/* Top Bar */}
//             <div className="flex justify-between items-center">
//                 <h2 className="text-lg font-semibold">SOAP Templates</h2>

//                 <NewButton name="Create Template" handleClick={() => router.push(withLocale(ROUTES.DOCTOR_PROFILE_SOAP_NOTE_TEMPLATE_CREATE))} />

//             </div>

//             {/* Template Cards */}
//             <div className="space-y-3">
//                 {templates.map((t) => (
//                     <div
//                         key={t.id}
//                         className="bg-blue-50 border rounded-xl p-4 flex justify-between items-center"
//                     >
//                         <div>
//                             <h3 className="font-semibold text-gray-800">{t.title}</h3>

//                             <div className="flex items-center gap-4 mt-1">
//                                 <span className="bg-white border rounded-full px-3 py-1 text-xs font-medium">
//                                     {t.specialty}
//                                 </span>

//                                 <span className="flex items-center text-xs text-gray-600 gap-1">
//                                     <Calendar size={14} /> {t.date}
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="flex gap-2">
//                             <Link
//                                 href={`/doctor-dashboard/soap/${t.id}/edit`}
//                                 className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm flex items-center gap-1"
//                             >
//                                 <Pencil size={14} /> Edit
//                             </Link>

//                             <button className="px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-sm flex items-center gap-1">
//                                 <Trash2 size={14} /> Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }



"use client";

import { useState, useEffect } from "react";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@workspace/ui/lib/sonner";
import NewButton from "@/components/common/new-button";
import { ROUTES } from "@/lib/routes";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";

import { createSoapTemplateApiClient } from "@/lib/api/doctor/soap-template.api";
import { getAuthToken } from "@/app/utils/onboarding";
import { getIdToken } from "@/app/utils/auth";

import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { SoapTemplateCardSkeleton } from "./soap-template/SoapTemplateCardSkeleton";

export function SoapTemplateList() {
    const router = useRouter();
    const { withLocale } = useLocaleRoute();
    const queryClient = useQueryClient();

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

    /* ---------------- State ---------------- */
    const [deleteId, setDeleteId] = useState<string | null>(null);

    /* ---------------- Fetch Templates ---------------- */
    const { data, isLoading } = useQuery({
        queryKey: ["soap-templates"],
        enabled: !!authToken,
        queryFn: async () => (await api!.getSoapTemplates()).data,
    });

    const templates = data?.data ?? [];

    /* ---------------- Delete ---------------- */
    const deleteMutation = useMutation({
        mutationFn: (id: string) => api!.deleteSoapTemplate(id),
        onSuccess: () => {
            toast.success("SOAP template deleted");
            queryClient.invalidateQueries({ queryKey: ["soap-templates"] });
            setDeleteId(null);
        },
        onError: (err: any) =>
            toast.error(err.message || "Failed to delete SOAP template"),
    });

    /* ---------------- UI ---------------- */
    return (
        <>
            <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">SOAP Templates</h2>

                    <NewButton
                        name="Create Template"
                        handleClick={() =>
                            router.push(
                                withLocale(ROUTES.NURSE_PROFILE_SOAP_NOTE_TEMPLATE_CREATE)
                            )
                        }
                    />
                </div>

                {/* Cards */}
                <div className="space-y-3">
                    {isLoading &&
                        <>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <SoapTemplateCardSkeleton key={i} />
                            ))}
                        </>
                    }

                    {!isLoading &&
                        templates.map((t: any) => (
                            <div
                                key={t.id}
                                className="bg-blue-50 border rounded-xl p-4 flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {t.template_name}
                                    </h3>

                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="bg-white border rounded-full px-3 py-1 text-xs font-medium">
                                            {t.specialty}
                                        </span>

                                        <span className="flex items-center text-xs text-gray-600 gap-1">
                                            <Calendar size={14} />{" "}
                                            {new Date(t.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        href={withLocale(
                                            `${ROUTES.NURSE_PROFILE_SOAP_NOTE_TEMPLATE}${t.id}${ROUTES.NURSE_PROFILE_SOAP_NOTE_TEMPLATE_EDIT}`
                                        )}
                                        className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm flex items-center gap-1"
                                    >
                                        <Pencil size={14} /> Edit
                                    </Link>

                                    <button
                                        onClick={() => setDeleteId(t.id)}
                                        className="px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-sm flex items-center gap-1"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={!!deleteId}
                title="Delete SOAP Template?"
                description="This action cannot be undone. The SOAP template will be permanently removed."
                confirmText="Delete"
                loading={deleteMutation.isPending}
                onClose={() => setDeleteId(null)}
                onConfirm={() => deleteMutation.mutate(deleteId!)}
            />
        </>
    );
}

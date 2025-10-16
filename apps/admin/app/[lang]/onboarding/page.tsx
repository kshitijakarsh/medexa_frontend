// Onboarding Page - Multi-step Wizard
import OnboardWizard from "./_components/OnboardWizard"

// import React, { useEffect, useState } from "react";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";
// import { useForm } from "@workspace/ui/hooks/use-form";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormMessage,
// } from "@workspace/ui/components/form";
// import { Input } from "@workspace/ui/components/input";
// import { Button } from "@workspace/ui/components/button";
// import { ModuleAssignmentSection } from "./_components/moduleassignmentsection";
// import { Header } from "@/components/header";
// import Link from "next/link";
// import { ArrowLeft, SquarePlus } from "lucide-react";
// import { SubmitButton } from "./_components/onboard-hospital/ui/SubmitButton";

// type ModuleOption = { id: string; label: string };

// const MODULE_OPTIONS: ModuleOption[] = [
//     { id: "ipd", label: "IPD" },
//     { id: "opd", label: "OPD" },
//     { id: "ot", label: "OT" },
// ];

// // Zod validation schema
// const hospitalSchema = z.object({
//     id: z.string().optional(), // present only for edit
//     hospitalName: z.string().min(3, "Hospital name is required"),
//     mophLicenseNumber: z.string().optional(),
//     tradeLicense: z.string().optional(),
//     taxRegistrationNumber: z.string().optional(),
//     contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
//     contactPhone: z
//         .string()
//         .optional()
//         .refine((v) => !v || /^[+\d\s()-]{7,20}$/.test(v), "Invalid phone"),
//     emergencyContactNumber: z.string().optional(),
//     city: z.string().optional(),
//     fullAddress: z.string().optional(),
//     adminFullName: z.string().optional(),
//     adminDesignation: z.string().optional(),
//     adminEmail: z.string().optional(),
//     adminPhone: z.string().optional(),
//     modules: z.array(z.string()).optional(),
//     userFullName: z.string().optional(),
//     userPassword: z.string().min(6, "Password must be at least 6 characters"),
// });

// type HospitalFormValues = z.infer<typeof hospitalSchema>;

// export interface OnboardHospitalFormProps {
//     /** optional hospital id for editing; if provided, form will fetch data to prefill */
//     hospitalId?: string;
//     onSuccess?: (data: any) => void;
// }

// export default function OnboardHospitalForm({
//     hospitalId,
//     onSuccess,
// }: OnboardHospitalFormProps) {
//     // local UI state for image preview & upload
//     const [logoPreview, setLogoPreview] = useState<string | null>(null);
//     const [logoFile, setLogoFile] = useState<File | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [serverError, setServerError] = useState<string | null>(null);

//     const defaultValues: HospitalFormValues = {
//         hospitalName: "",
//         mophLicenseNumber: "",
//         tradeLicense: "",
//         taxRegistrationNumber: "",
//         contactEmail: "",
//         contactPhone: "",
//         emergencyContactNumber: "",
//         city: "",
//         fullAddress: "",
//         adminFullName: "",
//         adminDesignation: "",
//         adminEmail: "",
//         adminPhone: "",
//         modules: [],
//         userFullName: "",
//         userPassword: "",
//     };

//     // Using your project's `useForm` (assumed wrapper around react-hook-form)
//     const form = useForm<HospitalFormValues>({
//         resolver: zodResolver(hospitalSchema),
//         defaultValues,
//     });

//     // Fetch data for edit (if hospitalId provided)
//     useEffect(() => {
//         if (!hospitalId) return;
//         let mounted = true;
//         (async () => {
//             setLoading(true);
//             try {
//                 const res = await fetch(`/api/hospitals/${hospitalId}`);
//                 if (!res.ok) throw new Error("Failed to fetch hospital");
//                 const data = await res.json();
//                 if (!mounted) return;

//                 // map API shape to form values - adapt as needed
//                 const mapped: Partial<HospitalFormValues> = {
//                     id: data.id,
//                     hospitalName: data.hospitalName ?? "",
//                     mophLicenseNumber: data.mophLicenseNumber ?? "",
//                     tradeLicense: data.tradeLicense ?? "",
//                     taxRegistrationNumber: data.taxRegistrationNumber ?? "",
//                     contactEmail: data.contactEmail ?? "",
//                     contactPhone: data.contactPhone ?? "",
//                     emergencyContactNumber: data.emergencyContactNumber ?? "",
//                     city: data.city ?? "",
//                     fullAddress: data.fullAddress ?? "",
//                     adminFullName: data.admin?.fullName ?? "",
//                     adminDesignation: data.admin?.designation ?? "",
//                     adminEmail: data.admin?.email ?? "",
//                     adminPhone: data.admin?.phone ?? "",
//                     modules: data.modules ?? [],
//                     userFullName: data.userCredential?.fullName ?? "",
//                     // do NOT set password from server
//                 };
//                 form.reset({ ...defaultValues, ...mapped });
//                 if (data.logoUrl) setLogoPreview(data.logoUrl);
//             } catch (err: any) {
//                 console.error(err);
//                 setServerError(err?.message ?? "Failed to fetch hospital");
//             } finally {
//                 setLoading(false);
//             }
//         })();
//         return () => {
//             mounted = false;
//         };
//     }, [hospitalId]);

//     // handle file input change
//     const onLogoSelected = (file?: File | null) => {
//         setLogoFile(file ?? null);
//         if (!file) {
//             setLogoPreview(null);
//             return;
//         }
//         const reader = new FileReader();
//         reader.onload = (e) => setLogoPreview(String(e.target?.result ?? null));
//         reader.readAsDataURL(file);
//     };

//     // modules toggle helper
//     const toggleModule = (id: string) => {
//         const modules = form.getValues("modules") ?? [];
//         if (modules.includes(id)) {
//             form.setValue(
//                 "modules",
//                 modules.filter((m) => m !== id),
//                 { shouldValidate: true }
//             );
//         } else {
//             form.setValue("modules", [...modules, id], { shouldValidate: true });
//         }
//     };

//     const onSubmit = async (values: HospitalFormValues) => {
//         setLoading(true);
//         setServerError(null);

//         try {
//             // prepare form payload (multipart if uploading image)
//             const isEdit = Boolean(hospitalId || values.id);
//             const url = isEdit ? `/api/hospitals/${hospitalId ?? values.id}` : "/api/hospitals";
//             const method = isEdit ? "PUT" : "POST";

//             // Build FormData to support file upload
//             const formData = new FormData();
//             Object.entries(values).forEach(([k, v]) => {
//                 if (v === undefined || v === null) return;
//                 if (Array.isArray(v)) {
//                     formData.append(k, JSON.stringify(v));
//                 } else {
//                     formData.append(k, String(v));
//                 }
//             });

//             if (logoFile) {
//                 formData.append("logo", logoFile);
//             }

//             const res = await fetch(url, {
//                 method,
//                 body: formData,
//             });

//             if (!res.ok) {
//                 const errorText = await res.text();
//                 throw new Error(errorText || "Failed to save hospital");
//             }

//             const saved = await res.json();
//             onSuccess?.(saved);
//             // optionally reset or navigate away
//             form.reset(defaultValues);
//             setLogoFile(null);
//             setLogoPreview(null);
//         } catch (err: any) {
//             console.error(err);
//             setServerError(err?.message ?? "Failed to save hospital");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <main className="min-h-svh w-full">
//             <Header />
//             <div className="">
//                 {/* Header Section */}
//                 <div className="flex flex-col items-start justify-between mb-6">
//                     <div className="flex items-center gap-2 bg-[#D7ECFF] w-full px-4 py-2">
//                         <Button variant="secondary" asChild className="bg-transperent">
//                             <Link href="/hospitals">
//                                 <ArrowLeft color="#EE7373" className="size-4 " />
//                             </Link>
//                         </Button>
//                         <h2 className="text-xl md:text-2xl font-semibold text-slate-700 text-color-[#001A4D]">
//                             Onboard New Hospital
//                         </h2>
//                     </div>
//                     <div className=" p-4 w-full py-3">
//                         <Form {...form}>
//                             <form
//                                 onSubmit={form.handleSubmit(onSubmit)}
//                                 className="space-y-6"
//                                 noValidate
//                             >
//                                 {/* Hospital Information */}
//                                 <section className="bg-white/80 rounded-lg p-4 md:p-6 shadow-sm border border-slate-100">
//                                     <h3 className="text-md font-medium text-slate-700 mb-4">
//                                         Hospital Information
//                                     </h3>

//                                     <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
//                                         <div className="md:col-span-8 space-y-4">
//                                             <FormField
//                                                 control={form.control}
//                                                 name="hospitalName"
//                                                 render={({ field }) => (
//                                                     <FormItem>
//                                                         <label className="block text-sm font-medium text-slate-600 mb-1">
//                                                             Hospital Name
//                                                         </label>
//                                                         <FormControl>
//                                                             <Input {...field} placeholder="Enter hospital name" />
//                                                         </FormControl>
//                                                         <FormMessage />
//                                                     </FormItem>
//                                                 )}
//                                             />

//                                             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                                                 <FormField
//                                                     control={form.control}
//                                                     name="mophLicenseNumber"
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <label className="block text-sm text-slate-600 mb-1">
//                                                                 MoPH License Number
//                                                             </label>
//                                                             <FormControl>
//                                                                 <Input {...field} placeholder="MoPH license" />
//                                                             </FormControl>
//                                                             <FormMessage />
//                                                         </FormItem>
//                                                     )}
//                                                 />

//                                                 <FormField
//                                                     control={form.control}
//                                                     name="tradeLicense"
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <label className="block text-sm text-slate-600 mb-1">
//                                                                 Trade License (CR Number)
//                                                             </label>
//                                                             <FormControl>
//                                                                 <Input {...field} placeholder="Trade license" />
//                                                             </FormControl>
//                                                             <FormMessage />
//                                                         </FormItem>
//                                                     )}
//                                                 />

//                                                 <FormField
//                                                     control={form.control}
//                                                     name="taxRegistrationNumber"
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <label className="block text-sm text-slate-600 mb-1">
//                                                                 Tax Registration Number (TIN / VAT)
//                                                             </label>
//                                                             <FormControl>
//                                                                 <Input {...field} placeholder="TIN / VAT" />
//                                                             </FormControl>
//                                                             <FormMessage />
//                                                         </FormItem>
//                                                     )}
//                                                 />
//                                             </div>

//                                             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                                                 <FormField
//                                                     control={form.control}
//                                                     name="contactEmail"
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <label className="block text-sm text-slate-600 mb-1">
//                                                                 Contact Email
//                                                             </label>
//                                                             <FormControl>
//                                                                 <Input {...field} placeholder="email@example.com" />
//                                                             </FormControl>
//                                                             <FormMessage />
//                                                         </FormItem>
//                                                     )}
//                                                 />

//                                                 <FormField
//                                                     control={form.control}
//                                                     name="contactPhone"
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <label className="block text-sm text-slate-600 mb-1">
//                                                                 Contact Phone
//                                                             </label>
//                                                             <FormControl>
//                                                                 <Input {...field} placeholder="+971 50 000 0000" />
//                                                             </FormControl>
//                                                             <FormMessage />
//                                                         </FormItem>
//                                                     )}
//                                                 />

//                                                 <FormField
//                                                     control={form.control}
//                                                     name="emergencyContactNumber"
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <label className="block text-sm text-slate-600 mb-1">
//                                                                 Emergency Contact Number
//                                                             </label>
//                                                             <FormControl>
//                                                                 <Input {...field} placeholder="+971 50 000 0000" />
//                                                             </FormControl>
//                                                             <FormMessage />
//                                                         </FormItem>
//                                                     )}
//                                                 />
//                                             </div>

//                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                                 <FormField
//                                                     control={form.control}
//                                                     name="city"
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <label className="block text-sm text-slate-600 mb-1">
//                                                                 City
//                                                             </label>
//                                                             <FormControl>
//                                                                 <Input {...field} placeholder="City" />
//                                                             </FormControl>
//                                                             <FormMessage />
//                                                         </FormItem>
//                                                     )}
//                                                 />

//                                                 <FormField
//                                                     control={form.control}
//                                                     name="fullAddress"
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <label className="block text-sm text-slate-600 mb-1">
//                                                                 Full Address
//                                                             </label>
//                                                             <FormControl>
//                                                                 <Input {...field} placeholder="Full address" />
//                                                             </FormControl>
//                                                             <FormMessage />
//                                                         </FormItem>
//                                                     )}
//                                                 />
//                                             </div>
//                                         </div>

//                                         {/* Right column: Logo Upload */}
//                                         <div className="md:col-span-4 flex flex-col items-center justify-start gap-3">
//                                             <div className="w-full bg-slate-50 border border-dashed rounded-md p-3 flex flex-col items-center">
//                                                 <div className="w-36 h-36 bg-white rounded-md overflow-hidden border border-slate-100 flex items-center justify-center">
//                                                     {logoPreview ? (
//                                                         // eslint-disable-next-line @next/next/no-img-element
//                                                         <img
//                                                             src={logoPreview}
//                                                             alt="Hospital Logo"
//                                                             className="object-contain w-full h-full"
//                                                         />
//                                                     ) : (
//                                                         <div className="text-slate-300 text-sm">
//                                                             No logo selected
//                                                         </div>
//                                                     )}
//                                                 </div>

//                                                 <label className="mt-3 inline-flex items-center cursor-pointer text-sm text-blue-600 underline">
//                                                     <input
//                                                         type="file"
//                                                         accept="image/*"
//                                                         onChange={(e) =>
//                                                             onLogoSelected(e.target.files ? e.target.files[0] : null)
//                                                         }
//                                                         className="hidden"
//                                                     />
//                                                     Browse Hospital Logo
//                                                 </label>

//                                                 <button
//                                                     type="button"
//                                                     onClick={() => {
//                                                         setLogoFile(null);
//                                                         setLogoPreview(null);
//                                                     }}
//                                                     className="mt-2 px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm border"
//                                                 >
//                                                     Remove
//                                                 </button>
//                                             </div>

//                                             <div className="w-full text-xs text-slate-500">
//                                                 Recommended: 300x300 px, PNG/JPG. Maximum 2MB.
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </section>

//                                 {/* Admin Account */}
//                                 <section className="bg-white/80 rounded-lg p-4 md:p-6 shadow-sm border border-slate-100">
//                                     <h3 className="text-md font-medium text-slate-700 mb-4">
//                                         Admin Account
//                                     </h3>

//                                     <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
//                                         <FormField
//                                             control={form.control}
//                                             name="adminFullName"
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <label className="block text-sm text-slate-600 mb-1">
//                                                         Full Name
//                                                     </label>
//                                                     <FormControl>
//                                                         <Input {...field} placeholder="Admin full name" />
//                                                     </FormControl>
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />

//                                         <FormField
//                                             control={form.control}
//                                             name="adminDesignation"
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <label className="block text-sm text-slate-600 mb-1">
//                                                         Designation
//                                                     </label>
//                                                     <FormControl>
//                                                         <Input {...field} placeholder="Designation" />
//                                                     </FormControl>
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />

//                                         <FormField
//                                             control={form.control}
//                                             name="adminEmail"
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <label className="block text-sm text-slate-600 mb-1">
//                                                         Email
//                                                     </label>
//                                                     <FormControl>
//                                                         <Input {...field} placeholder="admin@example.com" />
//                                                     </FormControl>
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />

//                                         <FormField
//                                             control={form.control}
//                                             name="adminPhone"
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <label className="block text-sm text-slate-600 mb-1">
//                                                         Phone Number
//                                                     </label>
//                                                     <FormControl>
//                                                         <Input {...field} placeholder="+971 50 000 0000" />
//                                                     </FormControl>
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />
//                                     </div>
//                                 </section>

//                                 {/* Modules Assignment */}
//                                 <section className="bg-white/80 rounded-lg p-4 md:p-6 shadow-sm border border-slate-100">
//                                     <h3 className="text-md font-medium text-slate-700 mb-4">
//                                         Modules Assignment
//                                     </h3>
//                                     <ModuleAssignmentSection form={form} />

//                                     {/* <div className="space-y-3">
//               <div className="flex items-center gap-2 flex-wrap">
//                 {MODULE_OPTIONS.map((m) => {
//                   const selected = (form.getValues("modules") ?? []).includes(m.id);
//                   return (
//                     <button
//                       type="button"
//                       key={m.id}
//                       onClick={() => toggleModule(m.id)}
//                       className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
//                         selected
//                           ? "bg-blue-600 text-white"
//                           : "bg-slate-100 text-slate-700"
//                       }`}
//                     >
//                       {m.label}
//                       {selected && (
//                         <span
//                           aria-hidden
//                           className="ml-1 inline-block w-4 h-4 rounded-full bg-white/20 text-xs flex items-center justify-center"
//                         >
//                           ✓
//                         </span>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>

//                         <FormMessage />
//                     </div> */}
//                                 </section>

//                                 {/* User Credential */}
//                                 <section className="bg-white/80 rounded-lg p-4 md:p-6 shadow-sm border border-slate-100">
//                                     <h3 className="text-md font-medium text-slate-700 mb-4">
//                                         User Credential
//                                     </h3>

//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                         <FormField
//                                             control={form.control}
//                                             name="userFullName"
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <label className="block text-sm text-slate-600 mb-1">
//                                                         Full Name
//                                                     </label>
//                                                     <FormControl>
//                                                         <Input {...field} placeholder="User name" />
//                                                     </FormControl>
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />

//                                         <FormField
//                                             control={form.control}
//                                             name="userPassword"
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <label className="block text-sm text-slate-600 mb-1">
//                                                         Password
//                                                     </label>
//                                                     <FormControl>
//                                                         <Input {...field} type="password" placeholder="Password" />
//                                                     </FormControl>
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />
//                                     </div>
//                                 </section>

//                                 {/* Form actions */}
//                                 {/* <div className="flex items-center justify-between gap-4">
//                                     <div className="text-sm text-red-600">{serverError}</div>

//                                     <div className="flex items-center gap-3">

//                                         <Button
//                                             type="button"
//                                             variant="ghost"
//                                             onClick={() => form.reset(defaultValues)}
//                                             disabled={loading}
//                                         >
//                                             Reset
//                                         </Button>
//                                         <Button
//                                             type="submit"
//                                             className="bg-green-600 hover:bg-green-700 text-white rounded-full py-3"
//                                             disabled={loading}
//                                         >
//                                             {hospitalId ? "Update Hospital" : "Onboard New"}
//                                             <span className=" p-2 bg-[#50C786] rounded-full">
//                                                 <SquarePlus className=" size-4 " />
//                                             </span>
//                                         </Button>
//                                     </div>
//                                 </div> */}
//                                 {/* Actions */}
//                                 <div className="flex items-center justify-between gap-4">
//                                     <div className="text-sm text-red-600">{serverError}</div>
//                                     <div className="flex items-center gap-3">
//                                         <Button type="button" variant="ghost" onClick={() => form.reset(defaultValues)} disabled={loading}>Reset</Button>
//                                         {/* <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white rounded-full py-3" disabled={loading}>
//                   {hospitalId ? "Update Hospital" : "Onboard New"}
//                   <span className="p-2 bg-[#50C786] rounded-full"><SquarePlus className="size-4" /></span>
//                 </Button> */}
//                                         <SubmitButton loading={loading} isEdit={hospitalId} />
//                                     </div>
//                                 </div>
//                             </form>
//                         </Form>
//                     </div >
//                 </div>
//             </div>
//         </main>
//     );
// }

export default function OnboardingPage() {
  return <OnboardWizard />
}

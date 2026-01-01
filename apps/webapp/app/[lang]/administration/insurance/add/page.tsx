// "use client";

// import { useRouter } from "next/navigation";
// import { useForm } from "@workspace/ui/hooks/use-form";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@workspace/ui/components/form";
// import { Input } from "@workspace/ui/components/input";
// import { Button } from "@workspace/ui/components/button";
// import { PageHeader } from "@/components/common/page-header";
// import { useState } from "react";
// import { UploadCard } from "@/components/common/upload-card";
// import { StatusSwitch } from "@/components/common/switch-green";
// import { useCreateInsurance } from "../_components/hooks/hooks"; // ✅ ADD
// import { uploadToS3 } from "@/lib/storage/uploadToS3";
// import { getPublicS3Url } from "@/lib/storage/getPublicS3Url";
// import { useGeneratePresignedUrl } from "@/app/hooks/useStorage";

// /* ---------------- SCHEMA ---------------- */

// const companySchema = z.object({
//   providerName: z.string().min(1, "Provider Name is required"),
//   companyName: z.string().min(1, "Company Name is required"),
//   approvalUrl: z.string().url("Invalid URL"),
//   consultationServiceCode: z.string().optional(),
//   registrationServiceCode: z.string().optional(),
//   trn: z.string().optional(),
//   address: z.string().min(1, "Address is required"),
//   active: z.boolean().catch(false),
//   employee_photo: z.any().optional(),
// });

// type CompanyFormValues = z.infer<typeof companySchema>;

// export default function AddCompanyPage() {
//   const router = useRouter();
//   const createInsurance = useCreateInsurance();
//   const generatePresignedUrl = useGeneratePresignedUrl();

//   const form = useForm<CompanyFormValues>({
//     resolver: zodResolver(companySchema),
//     defaultValues: {
//       providerName: "",
//       companyName: "",
//       approvalUrl: "",
//       consultationServiceCode: "",
//       registrationServiceCode: "",
//       trn: "",
//       address: "",
//       active: true,
//       employee_photo: null,
//     },
//   });

//   /* ---------------- SAVE HANDLER ---------------- */

//   // const handleSave = async (values: CompanyFormValues) => {
//   //   const payload = {
//   //     provider_name: values.providerName,
//   //     company_name: values.companyName,
//   //     approval_url: values.approvalUrl,
//   //     status: values.active ? "active" : "inactive",
//   //     consulting_service_code: values.consultationServiceCode || undefined,
//   //     registration_service_code: values.registrationServiceCode || undefined,
//   //     trn: values.trn || undefined,
//   //     address: values.address,
//   //     // insurance_company_logo_url → later (S3)
//   //   };

//   //   createInsurance.mutate(payload, {
//   //     onSuccess: () => {
//   //       router.push("/company-list");
//   //     },
//   //   });
//   // };

//   const handleSave = async (values: CompanyFormValues) => {
//     let logoUrl: string | undefined;

//     /* 1️⃣ Upload logo to S3 (if present) */
//     if (values.employee_photo) {
//       const presigned = await generatePresignedUrl.mutateAsync({
//         fileName: values.employee_photo.name,
//         contentType: values.employee_photo.type,
//         path: "insurance",
//       });

//       await uploadToS3({
//         file: values.employee_photo,
//         presignedUrl: presigned.uploadUrl,
//       });

//       logoUrl = getPublicS3Url(
//         presigned.bucket,
//         presigned.key
//       );
//     }

//     /* 2️⃣ Create insurance */
//     createInsurance.mutate(
//       {
//         provider_name: values.providerName,
//         company_name: values.companyName,
//         approval_url: values.approvalUrl,
//         status: values.active ? "active" : "inactive",
//         consulting_service_code:
//           values.consultationServiceCode || undefined,
//         registration_service_code:
//           values.registrationServiceCode || undefined,
//         trn: values.trn || undefined,
//         address: values.address,
//         insurance_company_logo_url: logoUrl,
//       },
//       {
//         onSuccess: () => {
//           // router.push("/company-list");
//         },
//       }
//     );
//   };


//   return (
//     <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
//       <div className="p-5">
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-8">
//             <PageHeader title="Add Company List" />
//             <Form {...form}>
//               <FormField
//                 control={form.control}
//                 name="active"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <div className="flex items-center gap-3">
//                         <span className="text-sm text-red-500">Inactive</span>
//                         <StatusSwitch
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                         <span className="text-sm text-green-600">Active</span>
//                       </div>
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </Form>
//           </div>

//           {/* FORM */}
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(handleSave)}
//               className="space-y-10"
//             >
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <FormField
//                   control={form.control}
//                   name="providerName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Provider Name *</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="companyName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Company Name *</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="approvalUrl"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Approval URL *</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="consultationServiceCode"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Consultation Service Code</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="registrationServiceCode"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Registration Service Code</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="trn"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>TRN</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="address"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Address *</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {/* Upload (future S3) */}
//               <FormField
//                 control={form.control}
//                 name="employee_photo"
//                 render={({ field }) => (
//                   <FormItem className="max-w-sm">
//                     <FormLabel>Employee Photo</FormLabel>
//                     <FormControl>
//                       <UploadCard
//                         title="Employee Photo"
//                         value={field.value}
//                         onFileSelect={field.onChange}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               {/* Buttons */}
//               <div className="flex justify-end gap-4">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => router.push("/company-list")}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="bg-green-600 hover:bg-green-700"
//                   disabled={createInsurance.isPending}
//                 >
//                   {createInsurance.isPending ? "Saving..." : "Save"}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </main>
//   );
// }


import { InsuranceForm } from "../_components/InsuranceForm";

export default function AddPage() {
  return <InsuranceForm mode="create" />;
}

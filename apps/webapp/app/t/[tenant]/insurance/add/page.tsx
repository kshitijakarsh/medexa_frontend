// // "use client";

// // import { useRouter } from "next/navigation";
// // import { useForm } from "@workspace/ui/hooks/use-form";
// // import { z } from "@workspace/ui/lib/zod";
// // import { zodResolver } from "@workspace/ui/lib/zod";
// // import {
// //   Form,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormControl,
// //   FormMessage,
// // } from "@workspace/ui/components/form";
// // import { Input } from "@workspace/ui/components/input";
// // import { Button } from "@workspace/ui/components/button";
// // import { PageHeader } from "@/components/common/PageHeader";
// // import { Header } from "@/components/header";
// // import { useState } from "react";
// // import { StatusSwitch } from "@/components/common/switch-green";
// // import { UploadCard } from "@/components/common/upload-card";

// // // ✅ Validation Schema
// // const companySchema = z.object({
// //   providerName: z.string().min(1, "Provider Name is required"),
// //   companyName: z.string().min(1, "Company Name is required"),
// //   approvalUrl: z
// //     .string()
// //     .url("Invalid URL")
// //     .min(1, "Approval URL is required"),
// //   consultationServiceCode: z.string().optional(),
// //   registrationServiceCode: z.string().optional(),
// //   trn: z.string().optional(),
// //   address: z.string().min(1, "Address is required"),
// //   active: z.boolean().catch(false),
// //   logo: z.any().optional(),
// // });

// // type CompanyFormValues = z.infer<typeof companySchema>;

// // export default function AddCompanyPage() {
// //   const router = useRouter();
// //   const [loading, setLoading] = useState(false);
// //   const [logoFile, setLogoFile] = useState<File | null>(null);

// //   const form = useForm<CompanyFormValues>({
// //     resolver: zodResolver(companySchema),
// //     defaultValues: {
// //       providerName: "",
// //       companyName: "",
// //       approvalUrl: "",
// //       consultationServiceCode: "",
// //       registrationServiceCode: "",
// //       trn: "",
// //       address: "",
// //       active: true,
// //       logo: null,
// //     },
// //   }) as unknown as ReturnType<typeof useForm<CompanyFormValues>>;

// //   const handleSave = async (values: CompanyFormValues) => {
// //     setLoading(true);
// //     console.log("✅ Company Saved:", { ...values, logoFile });
// //     setTimeout(() => {
// //       setLoading(false);
// //       router.push("/company-list");
// //     }, 800);
// //   };

// //   return (
// //     <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
// //       <Header />

// //       <div className="p-5 space-y-8">
// //         <div className="bg-white p-6 rounded-md shadow-sm space-y-6">
// //           <PageHeader title="Add Company List" />

// //           <Form {...form}>
// //             <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
// //               {/* ✅ TOP SECTION: Fields + Status */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start relative">
// //                 {/* Left Section (form fields) */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   {/* Provider Name */}
// //                   <FormField
// //                     control={form.control}
// //                     name="providerName"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Provider Name *</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Select Provider Name"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   {/* Company Name */}
// //                   <FormField
// //                     control={form.control}
// //                     name="companyName"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Company Name *</FormLabel>
// //                         <FormControl>
// //                           <Input placeholder="Enter Company Name" {...field} />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   {/* Approval URL */}
// //                   <FormField
// //                     control={form.control}
// //                     name="approvalUrl"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Approval URL *</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Enter Approval URL"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   {/* Consultation Service Code */}
// //                   <FormField
// //                     control={form.control}
// //                     name="consultationServiceCode"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Consultation Service Code</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Enter Consultation Code"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   {/* Registration Service Code */}
// //                   <FormField
// //                     control={form.control}
// //                     name="registrationServiceCode"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Registration Service Code</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Enter Registration Code"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   {/* TRN */}
// //                   <FormField
// //                     control={form.control}
// //                     name="trn"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>TRN</FormLabel>
// //                         <FormControl>
// //                           <Input placeholder="Enter TRN" {...field} />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   {/* Address */}
// //                   <FormField
// //                     control={form.control}
// //                     name="address"
// //                     render={({ field }) => (
// //                       <FormItem className="md:col-span-2">
// //                         <FormLabel>Address *</FormLabel>
// //                         <FormControl>
// //                           <Input placeholder="Enter Address" {...field} />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </div>

// //                 {/* ✅ Status Switch (top-right corner) */}
// //                 <div className="absolute right-0 top-0 flex items-center gap-2">
// //                   <span className="text-sm font-medium text-red-500">
// //                     Inactive
// //                   </span>
// //                   <FormField
// //                     control={form.control}
// //                     name="active"
// //                     render={({ field }) => (
// //                       <FormItem className="flex items-center gap-2">
// //                         <FormControl>
// //                           <StatusSwitch
// //                             checked={field.value}
// //                             onCheckedChange={field.onChange}
// //                           />
// //                         </FormControl>
// //                       </FormItem>
// //                     )}
// //                   />
// //                   <span className="text-sm font-medium text-green-600">
// //                     Active
// //                   </span>
// //                 </div>
// //               </div>

// //               {/* ✅ LOGO UPLOAD SECTION */}
// //               <div className="border rounded-md p-5 bg-[#F8FCFF]">
// //                 <h3 className="font-medium text-sm text-gray-700 mb-2">
// //                   Insurance Company Logo
// //                 </h3>
// //                 <p className="text-xs text-gray-500 mb-3">JPG format</p>
// //                 <div className="max-w-[320px]">
// //                   <UploadCard
// //                     title="Insurance Company Logo"
// //                     onFileSelect={(file) => setLogoFile(file)}
// //                     value={logoFile}
// //                   />
// //                 </div>
// //               </div>

// //               {/* ✅ ACTION BUTTONS */}
// //               <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
// //                 <Button
// //                   type="button"
// //                   variant="outline"
// //                   className="text-blue-600 border-blue-500"
// //                   onClick={() => router.push("/company-list")}
// //                 >
// //                   Cancel
// //                 </Button>
// //                 <Button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="bg-green-600 hover:bg-green-700"
// //                 >
// //                   {loading ? "Saving..." : "Save"}
// //                 </Button>
// //               </div>
// //             </form>
// //           </Form>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }



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
// import { PageHeader } from "@/components/common/PageHeader";
// import { Header } from "@/components/header";
// import { useState } from "react";
// import { UploadCard } from "@/components/common/upload-card";
// import { StatusSwitch } from "@/components/common/switch-green"; 

// const companySchema = z.object({
//   providerName: z.string().min(1, "Provider Name is required"),
//   companyName: z.string().min(1, "Company Name is required"),
//   approvalUrl: z.string().url("Invalid URL").min(1, "Approval URL is required"),
//   consultationServiceCode: z.string().optional(),
//   registrationServiceCode: z.string().optional(),
//   trn: z.string().optional(),
//   address: z.string().min(1, "Address is required"),
//   active: z.boolean().catch(false),
//   logo: z.any().optional(),
// });

// type CompanyFormValues = z.infer<typeof companySchema>;

// export default function AddCompanyPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [logoFile, setLogoFile] = useState<File | null>(null);

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
//       logo: null,
//     },
//   }) as unknown as ReturnType<typeof useForm<CompanyFormValues>>;

//   const handleSave = async (values: CompanyFormValues) => {
//     setLoading(true);
//     console.log("✅ Company Saved:", { ...values, logoFile });
//     setTimeout(() => {
//       setLoading(false);
//       router.push("/company-list");
//     }, 800);
//   };

//   return (
//     <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
//       <Header />

//       <div className="p-5">
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           {/* Header and Switch Row */}
//           <div className="flex items-center justify-between mb-6">
//             <PageHeader title="Add Company List" />
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-red-500 font-medium">Inactive</span>
//               <FormField
//                 control={form.control}
//                 name="active"
//                 render={({ field }) => (
//                   <FormItem className="flex items-center">
//                     <FormControl>
//                       <StatusSwitch
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <span className="text-sm text-green-600 font-medium">Active</span>
//             </div>
//           </div>

//           {/* Form Body */}
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="providerName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Provider Name *</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Select Provider Name" {...field} />
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
//                         <Input placeholder="Enter Company Name" {...field} />
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
//                         <Input placeholder="Enter Approval URL" {...field} />
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
//                         <Input
//                           placeholder="Enter Consultation Code"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
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
//                         <Input
//                           placeholder="Enter Registration Code"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
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
//                         <Input placeholder="Enter TRN" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="address"
//                   render={({ field }) => (
//                     <FormItem className="md:col-span-2">
//                       <FormLabel>Address *</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter Address" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {/* Upload Card Section */}
//               <div className="bg-[#F7FBFF] border rounded-md p-5">
//                 <h3 className="font-medium text-gray-700 text-sm">
//                   Insurance Company Logo
//                 </h3>
//                 <p className="text-xs text-gray-500 mb-3">JPG format</p>
//                 <div className="max-w-[320px]">
//                   <UploadCard
//                     title="Insurance Company Logo"
//                     onFileSelect={(file) => setLogoFile(file)}
//                     value={logoFile}
//                   />
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="text-blue-600 border-blue-500"
//                   onClick={() => router.push("/company-list")}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   {loading ? "Saving..." : "Save"}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

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
import { PageHeader } from "@/components/common/PageHeader";
import { Header } from "@/components/header";
import { useState } from "react";
import { UploadCard } from "@/components/common/upload-card";
import { StatusSwitch } from "@/components/common/switch-green";

const companySchema = z.object({
  providerName: z.string().min(1, "Provider Name is required"),
  companyName: z.string().min(1, "Company Name is required"),
  approvalUrl: z.string().url("Invalid URL").min(1, "Approval URL is required"),
  consultationServiceCode: z.string().optional(),
  registrationServiceCode: z.string().optional(),
  trn: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  active: z.boolean().catch(false),
  employee_photo: z.any().optional(),
});

type CompanyFormValues = z.infer<typeof companySchema>;

export default function AddCompanyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
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

  const handleSave = async (values: CompanyFormValues) => {
    setLoading(true);
    console.log("✅ Company Saved:", values);
    setTimeout(() => {
      setLoading(false);
      router.push("/company-list");
    }, 800);
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
      <Header />

      <div className="p-5">
        <div className="bg-white p-6 rounded-xl shadow-md">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-8">
            <PageHeader title="Add Company List" />
            <div className="flex items-center gap-3">
              <span className="text-sm text-red-500 font-medium">Inactive</span>
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <StatusSwitch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Form>
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
          </div>

          {/* Form Section */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="space-y-10"
            >
              {/* Input Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                <FormField
                  control={form.control}
                  name="providerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Select Provider Name" {...field} />
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
                        <Input placeholder="Enter Company Name" {...field} />
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
                        <Input placeholder="Enter Approval URL" {...field} />
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
                        <Input
                          placeholder="Enter Consultation Service Code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                        <Input
                          placeholder="Enter Registration Service Code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                        <Input placeholder="Enter TRN" {...field} />
                      </FormControl>
                      <FormMessage />
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
                        <Input placeholder="Enter Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Upload Section (fixed same as PersonalDetails) */}
              <div className="pt-4 max-w-sm">
                <FormField
                  control={form.control}
                  name="employee_photo"
                  render={({ field }) => (
                    <FormItem className="pt-4 max-w-sm">
                      <FormLabel>Employee Photo</FormLabel>
                      <FormControl>
                        <UploadCard
                          title="Employee Photo"
                          value={field.value}
                          onFileSelect={(file) => field.onChange(file)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="px-6 text-gray-700 border-gray-300 hover:bg-gray-100"
                  onClick={() => router.push("/company-list")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 px-8"
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

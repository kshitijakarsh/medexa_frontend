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
import { PageHeader } from "@/components/common/page-header";
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
                        <div
                          className={`flex items-center gap-3 rounded-md px-3 py-2 ${field.value ? "bg-green-50" : "bg-gray-50"}`}
                        >
                          <span className="text-sm text-red-500 font-medium">Inactive</span>
                          <StatusSwitch checked={field.value} onCheckedChange={field.onChange} />
                          <span className="text-sm text-green-600 font-medium">Active</span>
                        </div>
                        {/* <StatusSwitch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        /> */}
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

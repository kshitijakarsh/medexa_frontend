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
import { AppSelect } from "@/components/common/app-select";
import { StatusSwitch } from "@/components/common/switch-green";

const tpaSchema = z.object({
  chartOfAccount: z.string().min(1, "Chart Of Account is required"),
  shortName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().optional(),
  gstin: z.string().optional(),
  type: z.string().optional(),
  status: z.boolean().catch(false),
  providerName: z.string().optional(),
  contactPerson: z.string().optional(),
  contactMobile: z.string().optional(),
  phone: z.string().optional(),
  faxNumber: z.string().optional(),
  tnavat: z.string().optional(),
  creditLimit: z.string().optional(),
  address: z.string().optional(),
});

type TpaFormValues = z.infer<typeof tpaSchema>;

export default function AddTpaProviderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<TpaFormValues>({
    resolver: zodResolver(tpaSchema),
    defaultValues: {
      chartOfAccount: "",
      shortName: "",
      contactPhone: "",
      contactEmail: "",
      mobile: "",
      email: "",
      gstin: "",
      type: "",
      status: true,
      providerName: "",
      contactPerson: "",
      contactMobile: "",
      phone: "",
      faxNumber: "",
      tnavat: "",
      creditLimit: "",
      address: "",
    },
  });

  const handleSave = (values: TpaFormValues) => {
    setLoading(true);
    console.log("✅ TPA / Provider Saved:", values);
    setTimeout(() => {
      setLoading(false);
      router.push("/tpa-provider");
    }, 800);
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
      <Header />

      <div className="p-5 space-y-6">
        {/* Page Container */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <PageHeader title="Add Company List" />
            <div className="flex items-center gap-3 ">
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="status"
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
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
              {/* 🩵 Section 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                <FormField
                  control={form.control}
                  name="chartOfAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chart Of Account *</FormLabel>
                      <FormControl>
                        <AppSelect
                          placeholder="Select Chart Of Account"
                          value={field.value}
                          onChange={field.onChange}
                          options={[
                            { label: "10101002 - HSBC Bank", value: "10101002 - HSBC Bank" },
                            { label: "10101001 - Main Cash", value: "10101001 - Main Cash" },
                          ]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shortName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Short Name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Contact Phone" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Contact Email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Mobile" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gstin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GSTIN</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter GSTIN" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <AppSelect
                          placeholder="Select Type"
                          value={field.value}
                          onChange={field.onChange}
                          options={[
                            { label: "Corporate", value: "Corporate" },
                            { label: "Government", value: "Government" },
                            { label: "Private", value: "Private" },
                          ]}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Divider Section Label */}
              <div className="border-t border-gray-200 my-4"></div>
              <div className="bg-[#EAF3FF] text-[#1B4DB1] px-3 py-1.5 rounded-md w-fit font-medium text-sm">
                Provider Details
              </div>

              {/* 🩵 Section 2: Provider Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                <FormField
                  control={form.control}
                  name="providerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Provider Name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Contact Person" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactMobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Mobile</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Contact Mobile" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Phone" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="faxNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fax Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Fax Number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tnavat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TNA/VAT</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter TNA/VAT" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="creditLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credit Limit</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Credit Limit" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Address" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="px-6 text-gray-700 border-gray-300 hover:bg-gray-100"
                  onClick={() => router.push("/tpa-provider")}
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

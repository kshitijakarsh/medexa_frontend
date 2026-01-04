// /app/charges/service/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm } from "@workspace/ui/hooks/use-form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@workspace/ui/components/form";
import { PageHeader } from "@/components/common/page-header";
import { Header } from "@/components/header";
import { getCategoriesDropdown, getUnitsDropdown, getTaxesDropdown, getServiceById, updateCharge } from "../../_components/api";
import DynamicSelect from "@/components/common/dynamic-select";
import { StatusSwitch } from "@/components/common/switch-green";

const schema = z.object({
  serviceName: z.string().min(1, "Required"),
  chargeCategory: z.string().min(1, "Required"),
  unit: z.string().min(1, "Required"),
  chargeType: z.string().optional(),
  taxCategory: z.string().optional(),
  taxPercent: z.number().optional(),
  description: z.string().optional(),
  standardCharge: z.number().optional(),
  status: z.boolean().catch(true),
  priceVaryOn: z.boolean().catch(false),
  priceVaryBy: z.string().optional(),
  priceVaryStandard: z.number().optional(),
  priceVaryNormal: z.number().optional(),
  priceVaryVip: z.number().optional(),
});

type StatusType = "Active" | "Inactive";

export default function EditServicePage() {
  const params = useParams() as { id?: string };
  const id = params?.id ? Number(params.id) : undefined;
  const router = useRouter();
  const form = useForm({ 
    resolver: zodResolver(schema), 
    defaultValues: { 
      serviceName: "", 
      chargeCategory: "", 
      unit: "", 
      chargeType: "", 
      taxCategory: "", 
      taxPercent: 0, 
      description: "", 
      standardCharge: 0, 
      status: true, 
      priceVaryOn: false, 
      priceVaryStandard: 0, 
      priceVaryNormal: 0, 
      priceVaryVip: 0 
    } 
  });
  const [cats, setCats] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [taxes, setTaxes] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategoriesDropdown().then((r) => setCats(r));
    getUnitsDropdown().then((r) => setUnits(r));
    getTaxesDropdown().then((r) => setTaxes(r));
  }, []);

  useEffect(() => {
    if (!id) {
      setError("Invalid charge ID");
      setLoading(false);
      return;
    }

    const loadCharge = async () => {
      try {
        setLoading(true);
        setError(null);
        const charge = await getServiceById(id);
        
        if (!charge) {
          setError("Charge not found");
          setLoading(false);
          return;
        }

        // Pre-populate form with existing charge data
        form.reset({
          serviceName: charge.serviceName || "",
          chargeCategory: charge.chargeCategory || "",
          unit: charge.unit || "",
          chargeType: charge.chargeType || "",
          taxCategory: charge.tax || "",
          taxPercent: 0,
          description: charge.description || "",
          standardCharge: charge.standardCharge || 0,
          status: charge.status === "Active",
          priceVaryOn: charge.priceVaryOn || false,
          priceVaryBy: "",
          priceVaryStandard: charge.priceVaryOptions?.standard || 0,
          priceVaryNormal: charge.priceVaryOptions?.normal || 0,
          priceVaryVip: charge.priceVaryOptions?.vip || 0,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error loading charge:", err);
        setError("Failed to load charge data");
        setLoading(false);
      }
    };

    loadCharge();
  }, [id, form]);

  const onSubmit = async (vals: any) => {
    if (!id) {
      setError("Invalid charge ID");
      return;
    }

    setSaving(true);
    setError(null);
    
    try {
      const payload = {
        serviceName: vals.serviceName,
        chargeType: vals.chargeType,
        chargeCategory: vals.chargeCategory,
        unit: vals.unit,
        tax: vals.taxCategory,
        standardCharge: Number(vals.standardCharge || 0),
        description: vals.description,
        status: (vals.status ? "Active" : "Inactive") as StatusType,
        priceVaryOn: vals.priceVaryOn,
        priceVaryOptions: vals.priceVaryOn
          ? {
            standard: Number(vals.priceVaryStandard || 0),
            normal: Number(vals.priceVaryNormal || 0),
            vip: Number(vals.priceVaryVip || 0),
          }
          : undefined,
      };
      
      await updateCharge(id, payload);
      setSaving(false);
      router.push("/administration/charges");
    } catch (err: any) {
      console.error("Error updating charge:", err);
      setError(err.message || "Failed to update charge");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
        <Header />
        <div className="p-5">
          <PageHeader title="Edit Service & Charge" />
          <div className="bg-white p-6 rounded-md shadow-sm mt-2">
            <div className="text-center py-8">Loading...</div>
          </div>
        </div>
      </main>
    );
  }

  if (error && !loading) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
        <Header />
        <div className="p-5">
          <PageHeader title="Edit Service & Charge" />
          <div className="bg-white p-6 rounded-md shadow-sm mt-2">
            <div className="text-center py-8 text-red-600">{error}</div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => router.back()} className="text-blue-600 border-blue-500">
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
      <Header />
      <div className="p-5">
        <PageHeader title="Edit Service & Charge" />
        <div className="bg-white p-6 rounded-md shadow-sm mt-2">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {error}
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField name="chargeCategory" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Charge Category</FormLabel>
                    <FormControl><DynamicSelect options={cats} value={field.value} onChange={(v) => field.onChange(v as string)} placeholder="Select Charge Category" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="serviceName" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Charge Name *</FormLabel>
                    <FormControl><Input placeholder="Enter Charge Name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="unit" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Type *</FormLabel>
                    <FormControl><DynamicSelect options={units} value={field.value} onChange={(v) => field.onChange(v as string)} placeholder="Select Unit Type" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="status" control={form.control} render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col rounded-md px-3">
                      <FormLabel className="pb-2">Status</FormLabel>
                      <div
                        className={`flex items-center gap-3 ${field.value ? "bg-green-50" : "bg-gray-50"
                          } h-9 px-2`}
                      >
                        <span className="text-sm text-red-500">
                          Inactive
                        </span>
                        <FormControl>
                          <StatusSwitch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <span
                          className={`text-sm ${field.value
                            ? "text-green-600"
                            : "text-gray-400"
                            }`}
                        >
                          Active
                        </span>
                      </div>
                    </div>
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField name="chargeType" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Charge Type</FormLabel>
                    <FormControl><Input placeholder="Enter charge type (e.g., Consultation)" {...field} /></FormControl>
                  </FormItem>
                )} />

                <FormField name="taxCategory" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Category</FormLabel>
                    <FormControl><DynamicSelect options={taxes} value={field.value} onChange={(v) => field.onChange(v as string)} /></FormControl>
                  </FormItem>
                )} />

                <FormField name="taxPercent" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax %</FormLabel>
                    <FormControl><Input type="number" placeholder="Enter Tax" {...field} /></FormControl>
                  </FormItem>
                )} />

                <FormField name="standardCharge" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Standard Charge ($) *</FormLabel>
                    <FormControl><Input type="number" placeholder="Standard Charge" {...field} /></FormControl>
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="description" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Input placeholder="Enter Description" {...field} /></FormControl>
                  </FormItem>
                )} />
              </div>

              <div className="border rounded-md p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Price Vary On</div>
                  <FormField name="priceVaryOn" control={form.control} render={({ field }) => (
                    <div className="flex items-center gap-3">
                      <StatusSwitch checked={field.value} onCheckedChange={field.onChange} />
                    </div>
                  )} />
                </div>

                {/* Price vary section: visible only when on */}
                {form.watch("priceVaryOn") && (
                  <div className="mt-4 space-y-3">
                    <FormField name="priceVaryBy" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price Vary By</FormLabel>
                        <FormControl><Input placeholder="Select price vary dimension (e.g., Department)" {...field} /></FormControl>
                      </FormItem>
                    )} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <FormField name="priceVaryStandard" control={form.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Standard</FormLabel>
                          <FormControl><Input type="number" placeholder="Standard price" {...field} /></FormControl>
                        </FormItem>
                      )} />

                      <FormField name="priceVaryNormal" control={form.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Normal</FormLabel>
                          <FormControl><Input type="number" placeholder="Normal price" {...field} /></FormControl>
                        </FormItem>
                      )} />

                      <FormField name="priceVaryVip" control={form.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel>VIP</FormLabel>
                          <FormControl><Input type="number" placeholder="VIP price" {...field} /></FormControl>
                        </FormItem>
                      )} />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()} className="text-blue-600 border-blue-500">Cancel</Button>
                <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white" disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

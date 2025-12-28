"use client";

import { useEffect, useState } from "react";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm } from "@workspace/ui/hooks/use-form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@workspace/ui/components/form";
import { AppDialog } from "@/components/common/app-dialog";
import { StatusSwitch } from "@/components/common/switch-green";
import { getCategoriesDropdown, getUnitsDropdown, getTaxesDropdown, getServiceById, updateCharge } from "./api";
import DynamicSelect from "@/components/common/dynamic-select";

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

export function EditServiceDialog({ open, onClose, item, onSaved }: any) {
  const [cats, setCats] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [taxes, setTaxes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    if (open) {
      getCategoriesDropdown().then((r) => setCats(r));
      getUnitsDropdown().then((r) => setUnits(r));
      getTaxesDropdown().then((r) => setTaxes(r));
      if (item?.id) {
        loadService();
      }
    } else {
      form.reset();
    }
  }, [open, item]);

  const loadService = async () => {
    if (!item?.id) return;

    setLoading(true);
    try {
      const charge = await getServiceById(item.id);
      
      if (charge) {
        form.reset({
          serviceName: charge.serviceName || "",
          chargeCategory: String(charge.chargeCategory || ""),
          unit: String(charge.unit || ""),
          chargeType: charge.chargeType || "",
          taxCategory: charge.tax ? String(charge.tax) : "",
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
      }
    } catch (error) {
      console.error("Error loading service:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (vals: any) => {
    if (!item?.id) return;

    setSaving(true);
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
      
      await updateCharge(item.id, payload);
      onSaved?.();
      onClose();
    } catch (error: any) {
      console.error("Error updating charge:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppDialog open={open} onClose={onClose} title="Edit Service & Charge" maxWidth="md:max-w-4xl">
      {loading ? (
        <div className="py-8 text-center">Loading...</div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
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
                    <div className={`flex items-center gap-3 ${field.value ? "bg-green-50" : "bg-gray-50"} h-9 px-2`}>
                      <span className="text-sm text-red-500">Inactive</span>
                      <FormControl>
                        <StatusSwitch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <span className={`text-sm ${field.value ? "text-green-600" : "text-gray-400"}`}>Active</span>
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
                  <FormControl><DynamicSelect options={taxes} value={field.value} onChange={(v) => field.onChange(v as string)} placeholder="Select Tax Category" /></FormControl>
                </FormItem>
              )} />

              <FormField name="taxPercent" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax %</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter Tax" 
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
                </FormItem>
              )} />

              <FormField name="standardCharge" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Standard Charge ($) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Standard Charge" 
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
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
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Standard price" 
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                          />
                        </FormControl>
                      </FormItem>
                    )} />

                    <FormField name="priceVaryNormal" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Normal</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Normal price" 
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                          />
                        </FormControl>
                      </FormItem>
                    )} />

                    <FormField name="priceVaryVip" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>VIP</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="VIP price" 
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                          />
                        </FormControl>
                      </FormItem>
                    )} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="text-blue-600 border-blue-500" disabled={saving}>Cancel</Button>
              <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </AppDialog>
  );
}
export default EditServiceDialog;


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
import { updateCategory, updateTax, updateUnit, getCategoryById, getTaxById, getUnitById } from "./api";

const schemaName = z.object({ 
  name: z.string().min(1, "Required"), 
  description: z.string().optional(),
  percentage: z.number().min(0).max(100).optional(),
  active: z.boolean().catch(false) 
});

export function EditSingleDialog({ open, onClose, mode, item, onSaved }: any) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const form = useForm({ 
    resolver: zodResolver(schemaName), 
    defaultValues: { name: "", description: "", percentage: 0, active: false } 
  });

  useEffect(() => {
    if (open && item?.id) {
      loadItem();
    } else if (!open) {
      form.reset();
    }
  }, [open, item]);

  const loadItem = async () => {
    if (!item?.id) return;
    
    setLoading(true);
    try {
      let data;
      if (mode === "category") {
        data = await getCategoryById(item.id);
        if (data) {
          form.reset({
            name: data.chargeName || "",
            description: data.description || "",
            active: data.status === "Active",
          });
        }
      } else if (mode === "tax") {
        data = await getTaxById(item.id);
        if (data) {
          form.reset({
            name: data.taxName || "",
            percentage: data.percentage || 0,
            active: data.status === "Active",
          });
        }
      } else if (mode === "unit") {
        data = await getUnitById(item.id);
        if (data) {
          form.reset({
            name: data.unit || "",
            active: data.status === "Active",
          });
        }
      }
    } catch (error) {
      console.error("Error loading item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values: any) => {
    if (!item?.id) return;

    setSaving(true);
    try {
      if (mode === "category") {
        await updateCategory(item.id, { 
          chargeName: values.name, 
          description: values.description || "", 
          status: values.active ? "Active" : "Inactive" 
        });
      } else if (mode === "tax") {
        await updateTax(item.id, { 
          taxName: values.name, 
          percentage: Number(values.percentage) || 0, 
          status: values.active ? "Active" : "Inactive" 
        });
      } else if (mode === "unit") {
        await updateUnit(item.id, { 
          unit: values.name, 
          status: values.active ? "Active" : "Inactive" 
        });
      }
      onSaved?.();
      onClose();
    } catch (error) {
      console.error("Error updating item:", error);
    } finally {
      setSaving(false);
    }
  };

  const title = mode === "category" ? "Edit Charges Category" : mode === "tax" ? "Edit Tax Category" : "Edit Unit Type";
  const label = mode === "category" ? "Charge Name" : mode === "tax" ? "Tax Name" : "Unit";

  return (
    <AppDialog open={open} onClose={onClose} title={title} maxWidth="md:max-w-lg">
      {loading ? (
        <div className="py-8 text-center">Loading...</div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <FormField name="name" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl><Input placeholder={`Enter ${label}`} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {mode === "category" && (
              <FormField name="description" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Input placeholder="Enter description" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            )}

            {mode === "tax" && (
              <FormField name="percentage" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Percentage (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter percentage" 
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                      value={field.value || 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            )}

            <FormField name="active" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <div className={`flex items-center gap-3 ${field.value ? "bg-green-50" : "bg-gray-50"} h-9 px-2 rounded-md`}>
                  <span className="text-sm text-red-500">Inactive</span>
                  <FormControl><StatusSwitch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  <span className={`text-sm ${field.value ? "text-green-600" : "text-gray-400"}`}>Active</span>
                </div>
              </FormItem>
            )} />

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
export default EditSingleDialog;


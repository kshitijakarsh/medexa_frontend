"use client";

import { useEffect } from "react";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm, useFieldArray } from "@workspace/ui/hooks/use-form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@workspace/ui/components/form";
import { Plus, X } from "lucide-react";
import { AppDialog } from "@/components/common/app-dialog";
import { StatusSwitch } from "@/components/common/switch-green";
import { addUnits, addTaxes, addCategories } from "./api";

const itemSchema = z.object({
  name: z.string().min(1, "Required"),
  active: z.boolean().catch(true),
  percentage: z.number().optional(),
});
const schema = z.object({ items: z.array(itemSchema).min(1) });

export function AddBulkDialog({ open, onClose, mode, onSaved }: any) {
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { items: [{ name: "", active: true, percentage: 0 }] } });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "items" });

  useEffect(() => { if (!open) form.reset(); }, [open]);

  const title = mode === "unit" ? "Add Bulk Unit" : mode === "tax" ? "Add Bulk Tax" : "Add Bulk Charge Category";

  const handleSave = async (values: any) => {
    const payload = values.items.map((it: any) => ({
      name: it.name,
      active: it.active,
      percentage: it.percentage,
    }));
    if (mode === "unit") {
      await addUnits(payload.map((p: any) => ({ unit: p.name, status: p.active ? "Active" : "Inactive" })));
    } else if (mode === "tax") {
      await addTaxes(payload.map((p: any) => ({ taxName: p.name, percentage: Number(p.percentage || 0), status: p.active ? "Active" : "Inactive" })));
    } else {
      await addCategories(payload.map((p: any) => ({ chargeName: p.name, description: "", status: p.active ? "Active" : "Inactive" })));
    }
    onSaved?.();
    onClose();
  };

  return (
    <AppDialog open={open} onClose={onClose} title={title} maxWidth="md:max-w-4xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((f, idx) => (
              <div key={f.id} className="flex items-center gap-3 border rounded-lg p-3">
                <div className="flex-1">
                  <FormField name={`items.${idx}.name`} control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>{mode === "tax" ? "Tax Name" : "Name"}</FormLabel>
                      <FormControl><Input placeholder="Enter name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {mode === "tax" && (
                  <div className="w-32">
                    <FormField name={`items.${idx}.percentage`} control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>%</FormLabel>
                        <FormControl><Input type="number" placeholder="%" {...field} /></FormControl>
                      </FormItem>
                    )} />
                  </div>
                )}

                <div className="w-48">
                  <FormField name={`items.${idx}.active`} control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <div className={`flex items-center gap-3 ${field.value ? "bg-green-50" : "bg-gray-50"} h-9 px-2 rounded-md`}>
                        <span className="text-sm text-red-500">Inactive</span>
                        <FormControl><StatusSwitch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <span className={`text-sm ${field.value ? "text-green-600" : "text-gray-400"}`}>Active</span>
                      </div>
                    </FormItem>
                  )} />
                </div>

                <div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => remove(idx)} className="text-red-600"><X /></Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button type="button" variant="ghost" onClick={() => append({ name: "", active: true, percentage: 0 })} className="flex items-center gap-2 text-green-600">
              Add Row <span className="bg-green-500 p-1 rounded-full text-white"><Plus /></span>
            </Button>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} className="text-blue-600 border-blue-500">Cancel</Button>
              <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">Save</Button>
            </div>
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}
export default AddBulkDialog;
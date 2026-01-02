"use client";

import { useEffect, useState } from "react";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm } from "@workspace/ui/hooks/use-form";
import { Form, FormField, FormLabel, FormItem, FormControl } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { AppDialog } from "@/components/common/app-dialog";
import { getUnitsDropdown, getCategoriesDropdown, getTaxesDropdown } from "./api";
import DynamicSelect from "@/components/common/dynamic-select";
import AppDatePicker from "@/components/common/app-date-picker";
import { AppSelect } from "@/components/common/app-select";
import { useDictionary } from "@/i18n/use-dictionary";

const schema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  unit: z.string().optional(),
  category: z.string().optional(),
  tax: z.string().optional(),
  status: z.string().optional(),
  date: z.string().optional(),
});

export function FilterDialog({ open, onClose, onApply, mode, isLoading }: any) {
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { name: "", unit: "", category: "", tax: "", status: "", date: "" } });
  const [units, setUnits] = useState<any[]>([]);
  const [cats, setCats] = useState<any[]>([]);
  const [taxes, setTaxes] = useState<any[]>([]);
  const dict = useDictionary();
  const trans = dict.pages.charges.filters;

  useEffect(() => {
    getUnitsDropdown().then((r) => setUnits(r));
    getCategoriesDropdown().then((r) => setCats(r));
    getTaxesDropdown().then((r) => setTaxes(r));
  }, []);

  useEffect(() => {
    if (!open) form.reset();
  }, [open]);

  const handleApply = (vals: any) => {
    onApply(vals);
    onClose();
  };

  return (
    <AppDialog open={open} onClose={onClose} title={trans.title} maxWidth="md:max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleApply)} className="space-y-4 py-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="name" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>{trans.search}</FormLabel>
                <FormControl><Input placeholder={trans.searchPlaceholder} {...field} /></FormControl>
              </FormItem>
            )} />

            <FormField name="category" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>{trans.category}</FormLabel>
                <FormControl>
                  <DynamicSelect options={cats} value={field.value} onChange={(v) => field.onChange(v as string)} />
                </FormControl>
              </FormItem>
            )} />

            <FormField name="unit" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>{trans.unit}</FormLabel>
                <FormControl>
                  <DynamicSelect options={units} value={field.value} onChange={(v) => field.onChange(v as string)} />
                </FormControl>
              </FormItem>
            )} />

            <FormField name="tax" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>{trans.tax}</FormLabel>
                <FormControl>
                  <DynamicSelect options={taxes} value={field.value} onChange={(v) => field.onChange(v as string)} />
                </FormControl>
              </FormItem>
            )} />

            <FormField name="status" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>{trans.status}</FormLabel>
                <FormControl>
                  {/* <select value={field.value || ""} onChange={(e) => field.onChange(e.target.value)} className="w-full rounded border px-3 py-2">
                    <option value="">Any</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select> */}
                  <AppSelect
                    placeholder={trans.statusPlaceholder}
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      // { label: "", value: "Any" },
                      { label: dict.common.active, value: "Active" },
                      { label: dict.common.inactive, value: "Inactive" },

                    ]}
                    error={form.formState.errors.status}
                  />
                </FormControl>
              </FormItem>
            )} />

            <FormField name="date" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>{trans.createdDate}</FormLabel>
                <FormControl>
                  <AppDatePicker value={field.value ? new Date(field.value) : null} onChange={(d) => field.onChange(d ? d.toISOString().slice(0, 10) : "")} />
                </FormControl>
              </FormItem>
            )} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => { form.reset(); onClose(); }} className="text-blue-600 border-blue-500">{dict.common.cancel}</Button>
            <Button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-600 text-white">{isLoading ? dict.common.applying : dict.common.appplyfilters}</Button>
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}
export default FilterDialog;
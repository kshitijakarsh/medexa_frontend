"use client";

import { AppDialog } from "@/components/common/app-dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@workspace/ui/components/form";

import { AppSelect } from "@/components/common/app-select";
import { useForm } from "@workspace/ui/hooks/use-form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";

import { PrimaryButton } from "@/components/common/buttons/primary-button";
import { CancelButton } from "@/components/common/buttons/cancel-button";

const schema = z.object({
  surgeryType: z.string().min(1),
  category: z.string().min(1),
  urgency: z.string().min(1),
  notes: z.string().optional(),
});

const SURGERY_TYPES = [
  { value: "knee-replacement", label: "Knee Replacement" },
  { value: "lap-chole", label: "Laparoscopic Cholecystectomy" },
];

const SURGERY_CATEGORIES = [
  { value: "orthopedics", label: "Orthopedics" },
  { value: "general-surgery", label: "General Surgery" },
];

const URGENCY_OPTIONS = [
  { value: "elective", label: "Elective" },
  { value: "urgent", label: "Urgent" },
  { value: "emergency", label: "Emergency" },
];

export default function AddSurgeryModal({ open, onClose, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      surgeryType: "",
      category: "",
      urgency: "",
      notes: "",
    },
  });

  const submit = (values) => {
    onSubmit(values);
    onClose();
    form.reset();
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Prescribe Surgery"
      maxWidth="md:max-w-2xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Surgery Type */}
            <FormField
              name="surgeryType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surgery Type</FormLabel>
                  <FormControl>
                    <AppSelect
                      placeholder="Select Surgery Type"
                      value={field.value}
                      onChange={field.onChange}
                      options={SURGERY_TYPES}
                      error={form.formState.errors.surgeryType}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surgery Category</FormLabel>
                  <FormControl>
                    <AppSelect
                      placeholder="Select Surgery Category"
                      value={field.value}
                      onChange={field.onChange}
                      options={SURGERY_CATEGORIES}
                      error={form.formState.errors.category}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Urgency */}
          <FormField
            name="urgency"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Urgency</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder="Select Urgency"
                    value={field.value}
                    onChange={field.onChange}
                    options={URGENCY_OPTIONS}
                    error={form.formState.errors.urgency}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Notes */}
          <FormField
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clinical Notes (Optional)</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full border rounded-md p-3"
                    rows={4}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <CancelButton onClick={onClose} />
            <PrimaryButton label="Send to OT" type="submit" />
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

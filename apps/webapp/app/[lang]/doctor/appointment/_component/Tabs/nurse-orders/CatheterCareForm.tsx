"use client";

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
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { PrimaryButton } from "@/components/common/buttons/primary-button";
import { CancelButton } from "@/components/common/buttons/cancel-button";

const schema = z.object({
  catheter_type: z.string().min(1, "Catheter type is required"),
  care_type: z.string().min(1, "Care type is required"),
  frequency: z.string().min(1, "Frequency is required"),
  urgency: z.string().min(1, "Urgency is required"),
  start_date: z.string().min(1, "Start date is required"),
  start_time: z.string().min(1, "Start time is required"),
  notes: z.string().optional(),
});

interface CatheterCareFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  initialValues?: any;
  submitLabel?: string;
}

export default function CatheterCareForm({
  onSubmit,
  isSubmitting,
  onCancel,
  initialValues,
  submitLabel,
}: CatheterCareFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      catheter_type: initialValues?.catheter_type || "",
      care_type: initialValues?.care_type || "",
      frequency: initialValues?.frequency || "",
      urgency: initialValues?.urgency || "",
      start_date: initialValues?.start_date || "",
      start_time: initialValues?.start_time || "",
      notes: initialValues?.notes || "",
    },
  });

  const submit = (values: z.infer<typeof schema>) => {
    onSubmit({
      urgency: values.urgency,
      status: "pending",
      details: {
        catheter_type: values.catheter_type,
        care_type: values.care_type,
        frequency: values.frequency,
        start_date: values.start_date,
        start_time: values.start_time,
      },
      notes: values.notes,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        {/* Catheter Type */}
        <FormField
          control={form.control}
          name="catheter_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catheter Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Enter Wound Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Urinary Catheter">Urinary Catheter</SelectItem>
                    <SelectItem value="Central Venous Catheter">Central Venous Catheter</SelectItem>
                    <SelectItem value="Peripheral IV Catheter">Peripheral IV Catheter</SelectItem>
                    <SelectItem value="Foley Catheter">Foley Catheter</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Care Type */}
        <FormField
          control={form.control}
          name="care_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Care Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Dressing Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                    <SelectItem value="Dressing Change">Dressing Change</SelectItem>
                    <SelectItem value="Flushing">Flushing</SelectItem>
                    <SelectItem value="Inspection">Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Frequency */}
        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Once daily">Once daily</SelectItem>
                    <SelectItem value="Twice daily">Twice daily</SelectItem>
                    <SelectItem value="Every 8 hours">Every 8 hours</SelectItem>
                    <SelectItem value="As needed">As needed</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Urgency */}
        <FormField
          control={form.control}
          name="urgency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Urgency</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="routine">Routine</SelectItem>
                    <SelectItem value="stat">STAT</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Instructions/Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions / Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Instructions / Notes"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <CancelButton onClick={onCancel} />
          <PrimaryButton
            type="submit"
            disabled={isSubmitting}
            label={isSubmitting ? (submitLabel === "Update" ? "Updating..." : "Adding...") : (submitLabel || "Add Order")} 
          />
        </div>
      </form>
    </Form>
  );
}

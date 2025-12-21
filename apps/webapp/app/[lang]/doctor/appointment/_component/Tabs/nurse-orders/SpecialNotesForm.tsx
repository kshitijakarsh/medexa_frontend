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
  note_type: z.string().min(1, "Note type is required"),
  urgency: z.string().min(1, "Urgency is required"),
  start_date: z.string().min(1, "Start date is required"),
  start_time: z.string().min(1, "Start time is required"),
  clinical_notes: z.string().optional(),
});

interface SpecialNotesFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  initialValues?: any;
  submitLabel?: string;
}

export default function SpecialNotesForm({
  onSubmit,
  isSubmitting,
  onCancel,
  initialValues,
  submitLabel,
}: SpecialNotesFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      note_type: initialValues?.note_type || "",
      urgency: initialValues?.urgency || "",
      start_date: initialValues?.start_date || "",
      start_time: initialValues?.start_time || "",
      clinical_notes: initialValues?.clinical_notes || "",
    },
  });

  const submit = (values: z.infer<typeof schema>) => {
    onSubmit({
      urgency: values.urgency,
      status: "pending",
      details: {
        note_type: values.note_type,
        start_date: values.start_date,
        start_time: values.start_time,
      },
      notes: values.clinical_notes,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        {/* Note Type */}
        <FormField
          control={form.control}
          name="note_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Enter Note Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Allergy Alert">Allergy Alert</SelectItem>
                    <SelectItem value="Fall Risk">Fall Risk</SelectItem>
                    <SelectItem value="Isolation Precautions">Isolation Precautions</SelectItem>
                    <SelectItem value="Diet Restriction">Diet Restriction</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
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

        {/* Clinical Notes */}
        <FormField
          control={form.control}
          name="clinical_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clinical Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Clinical Notes"
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

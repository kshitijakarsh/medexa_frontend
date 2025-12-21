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
  oxygen_delivery_type: z.string().min(1, "Delivery type is required"),
  flow_rate: z.string().min(1, "Flow rate is required"),
  frequency_mode: z.string().min(1, "Frequency/Mode is required"),
  urgency: z.string().min(1, "Urgency is required"),
  start_date: z.string().min(1, "Start date is required"),
  start_time: z.string().min(1, "Start time is required"),
  clinical_notes: z.string().optional(),
});

interface OxygenTherapyFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  initialValues?: any;
  submitLabel?: string;
}

export default function OxygenTherapyForm({
  onSubmit,
  isSubmitting,
  onCancel,
  initialValues,
  submitLabel,
}: OxygenTherapyFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      oxygen_delivery_type: initialValues?.oxygen_delivery_type || "",
      flow_rate: initialValues?.flow_rate || "",
      frequency_mode: initialValues?.frequency_mode || "",
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
        oxygen_delivery_type: values.oxygen_delivery_type,
        flow_rate: values.flow_rate,
        frequency_mode: values.frequency_mode,
        start_date: values.start_date,
        start_time: values.start_time,
      },
      notes: values.clinical_notes,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        {/* Oxygen Delivery Type */}
        <FormField
          control={form.control}
          name="oxygen_delivery_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oxygen Delivery Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Enter Note Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nasal Cannula">Nasal Cannula</SelectItem>
                    <SelectItem value="Face Mask">Face Mask</SelectItem>
                    <SelectItem value="Non-Rebreather Mask">Non-Rebreather Mask</SelectItem>
                    <SelectItem value="Venturi Mask">Venturi Mask</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Flow Rate */}
        <FormField
          control={form.control}
          name="flow_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flow Rate</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2 L/min">2 L/min</SelectItem>
                    <SelectItem value="4 L/min">4 L/min</SelectItem>
                    <SelectItem value="6 L/min">6 L/min</SelectItem>
                    <SelectItem value="10 L/min">10 L/min</SelectItem>
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

        {/* Frequency/Mode and Urgency */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="frequency_mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency / Mode</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Continuous">Continuous</SelectItem>
                      <SelectItem value="Intermittent">Intermittent</SelectItem>
                      <SelectItem value="PRN">PRN (As Needed)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Urgency</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="STAT" />
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

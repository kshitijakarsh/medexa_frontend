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
  medication_name: z.string().min(1, "Medication name is required"),
  dose: z.string().min(1, "Dose is required"),
  route: z.string().min(1, "Route is required"),
  frequency: z.string().min(1, "Frequency is required"),
  duration: z.string().min(1, "Duration is required"),
  urgency: z.string().min(1, "Urgency is required"),
  start_date: z.string().min(1, "Start date is required"),
  start_time: z.string().min(1, "Start time is required"),
  notes: z.string().optional(),
});

interface MedicationFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  initialValues?: any;
  submitLabel?: string;
}

export default function MedicationForm({
  onSubmit,
  isSubmitting,
  onCancel,
  initialValues,
  submitLabel,
}: MedicationFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      medication_name: initialValues?.medication_name || "",
      dose: initialValues?.dose || "",
      route: initialValues?.route || "",
      frequency: initialValues?.frequency || "",
      duration: initialValues?.duration || "",
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
        medication_name: values.medication_name,
        dose: values.dose,
        route: values.route,
        frequency: values.frequency,
        duration: values.duration,
        start_date: values.start_date,
        start_time: values.start_time,
      },
      notes: values.notes,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        {/* Medication Name and Dose */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="medication_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medication Name</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Fluid Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paracetamol">Paracetamol</SelectItem>
                      <SelectItem value="Ibuprofen">Ibuprofen</SelectItem>
                      <SelectItem value="Amoxicillin">Amoxicillin</SelectItem>
                      <SelectItem value="Aspirin">Aspirin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dose</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Volume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="250mg">250mg</SelectItem>
                      <SelectItem value="500mg">500mg</SelectItem>
                      <SelectItem value="1000mg">1000mg</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Route and Frequency */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="route"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Route</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Oral">Oral</SelectItem>
                      <SelectItem value="IV">IV</SelectItem>
                      <SelectItem value="IM">IM</SelectItem>
                      <SelectItem value="Topical">Topical</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Once daily">Once daily</SelectItem>
                      <SelectItem value="Twice daily">Twice daily</SelectItem>
                      <SelectItem value="Three times daily">Three times daily</SelectItem>
                      <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Duration and Urgency */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3 days">3 days</SelectItem>
                      <SelectItem value="5 days">5 days</SelectItem>
                      <SelectItem value="7 days">7 days</SelectItem>
                      <SelectItem value="14 days">14 days</SelectItem>
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
                      <SelectValue placeholder="Select Duration" />
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

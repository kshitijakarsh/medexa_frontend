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
  fluid_type: z.string().min(1, "Fluid type is required"),
  volume_ml: z.string().min(1, "Volume is required"),
  rate_ml_hr: z.string().min(1, "Rate is required"),
  duration_hours: z.string().min(1, "Duration is required"),
  urgency: z.string().min(1, "Urgency is required"),
  total_volume: z.string().optional(),
  total_bottles: z.string().optional(),
  start_date: z.string().min(1, "Start date is required"),
  start_time: z.string().min(1, "Start time is required"),
  injection: z.string().optional(),
  dose: z.string().optional(),
  notes: z.string().optional(),
});

interface IVFluidsFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  initialValues?: any;
  submitLabel?: string;
}

export default function IVFluidsForm({
  onSubmit,
  isSubmitting,
  onCancel,
  initialValues,
  submitLabel,
}: IVFluidsFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fluid_type: initialValues?.fluid_type || "",
      volume_ml: initialValues?.volume_ml || "",
      rate_ml_hr: initialValues?.rate_ml_hr || "",
      duration_hours: initialValues?.duration_hours || "",
      urgency: initialValues?.urgency || "",
      total_volume: initialValues?.total_volume || "",
      total_bottles: initialValues?.total_bottles || "3",
      start_date: initialValues?.start_date || "",
      start_time: initialValues?.start_time || "",
      injection: initialValues?.injection || "",
      dose: initialValues?.dose || "",
      notes: initialValues?.notes || "",
    },
  });

  const submit = (values: z.infer<typeof schema>) => {
    onSubmit({
      urgency: values.urgency,
      status: "pending",
      details: {
        fluid_type: values.fluid_type,
        volume_ml: values.volume_ml,
        rate_ml_hr: values.rate_ml_hr,
        duration_hours: values.duration_hours,
        total_volume: values.total_volume,
        total_bottles: values.total_bottles,
        start_date: values.start_date,
        start_time: values.start_time,
        injection: values.injection,
        dose: values.dose,
      },
      notes: values.notes,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        {/* Fluid Type */}
        <FormField
          control={form.control}
          name="fluid_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fluid Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Fluid Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IV FLUIDS">IV FLUIDS</SelectItem>
                    <SelectItem value="Normal Saline">Normal Saline</SelectItem>
                    <SelectItem value="Dextrose 5%">Dextrose 5%</SelectItem>
                    <SelectItem value="Ringer's Lactate">Ringer's Lactate</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Volume and Rate */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="volume_ml"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volume (mL)</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Volume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500">500 mL</SelectItem>
                      <SelectItem value="1000">1000 mL</SelectItem>
                      <SelectItem value="1500">1500 mL</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rate_ml_hr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate (mL/hr)</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50 mL/hr</SelectItem>
                      <SelectItem value="100">100 mL/hr</SelectItem>
                      <SelectItem value="150">150 mL/hr</SelectItem>
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
            name="duration_hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (hours/days)</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2 hours">2 hours</SelectItem>
                      <SelectItem value="4 hours">4 hours</SelectItem>
                      <SelectItem value="8 hours">8 hours</SelectItem>
                      <SelectItem value="1 day">1 day</SelectItem>
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
        </div>

        {/* Total Volume and Bottles */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="total_volume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Volume</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="total_bottles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Bottles</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="3" {...field} />
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

        {/* Injection and Dose */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="injection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Injection</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Injection" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Antibiotic">Antibiotic</SelectItem>
                      <SelectItem value="Pain Relief">Pain Relief</SelectItem>
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
                      <SelectItem value="5ml">5 mL</SelectItem>
                      <SelectItem value="10ml">10 mL</SelectItem>
                      <SelectItem value="20ml">20 mL</SelectItem>
                    </SelectContent>
                  </Select>
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

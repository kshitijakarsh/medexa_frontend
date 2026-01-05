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
import { useDictionary } from "@/i18n/dictionary-context";

const schema = z.object({
  parameter_to_monitor: z.string().min(1, "Parameter is required"),
  frequency: z.string().min(1, "Frequency is required"),
  urgency: z.string().min(1, "Urgency is required"),
  start_date: z.string().min(1, "Start date is required"),
  start_time: z.string().min(1, "Start time is required"),
  notes: z.string().optional(),
});

interface MonitoringFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  initialValues?: any;
  submitLabel?: string;
}

export default function MonitoringForm({
  onSubmit,
  isSubmitting,
  onCancel,
  initialValues,
  submitLabel,
}: MonitoringFormProps) {
  const dict = useDictionary();
  const { form } = dict.pages.doctor.appointment.tabsContent.nurseOrders;
  const { monitoring, common, options, frequencies } = form;

  const formMethods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      parameter_to_monitor: initialValues?.parameter_to_monitor || "",
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
        parameter_to_monitor: values.parameter_to_monitor,
        frequency: values.frequency,
        start_date: values.start_date,
        start_time: values.start_time,
      },
      notes: values.notes,
    });
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(submit)} className="space-y-4">
        {/* Parameter to Monitor */}
        <FormField
          control={formMethods.control}
          name="parameter_to_monitor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{monitoring.parameter}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={monitoring.enterParameter} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blood Pressure">Blood Pressure</SelectItem>
                    <SelectItem value="Heart Rate">Heart Rate</SelectItem>
                    <SelectItem value="Temperature">Temperature</SelectItem>
                    <SelectItem value="Oxygen Saturation">Oxygen Saturation</SelectItem>
                    <SelectItem value="Blood Glucose">Blood Glucose</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Frequency */}
        <FormField
          control={formMethods.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{monitoring.frequency}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={common.selectFrequency} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Every 15 minutes">{frequencies.every15Minutes}</SelectItem>
                    <SelectItem value="Every 30 minutes">{frequencies.every30Minutes}</SelectItem>
                    <SelectItem value="Every hour">{frequencies.everyHour}</SelectItem>
                    <SelectItem value="Every 2 hours">{frequencies.every2Hours}</SelectItem>
                    <SelectItem value="Every 4 hours">{frequencies.every4Hours}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Urgency */}
        <FormField
          control={formMethods.control}
          name="urgency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{common.urgency}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={common.selectUrgency} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">{options.urgent}</SelectItem>
                    <SelectItem value="routine">{options.routine}</SelectItem>
                    <SelectItem value="stat">{options.stat}</SelectItem>
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
            control={formMethods.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{common.startDate}</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formMethods.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{common.startTime}</FormLabel>
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
          control={formMethods.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{common.notes}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={common.enterNotes}
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
          <CancelButton onClick={onCancel} label={common.cancel} />
          <PrimaryButton
            type="submit"
            disabled={isSubmitting}
            label={
              isSubmitting
                ? submitLabel === "Update"
                  ? common.updating
                  : common.adding
                : submitLabel === "Update"
                  ? common.update
                  : common.add
            }
          />
        </div>
      </form>
    </Form>
  );
}

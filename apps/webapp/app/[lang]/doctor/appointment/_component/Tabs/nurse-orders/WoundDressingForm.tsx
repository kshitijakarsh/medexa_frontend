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
  wound_location: z.string().min(1, "Wound location is required"),
  dressing_type: z.string().min(1, "Dressing type is required"),
  frequency: z.string().min(1, "Frequency is required"),
  urgency: z.string().min(1, "Urgency is required"),
  start_date: z.string().min(1, "Start date is required"),
  start_time: z.string().min(1, "Start time is required"),
  notes: z.string().optional(),
});

interface WoundDressingFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  initialValues?: any;
  submitLabel?: string;
}

export default function WoundDressingForm({
  onSubmit,
  isSubmitting,
  onCancel,
  initialValues,
  submitLabel,
}: WoundDressingFormProps) {
  const dict = useDictionary();
  const { form } = dict.pages.doctor.appointment.tabsContent.nurseOrders;
  const { woundDressing, common, options, frequencies } = form;

  const formMethods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      wound_location: initialValues?.wound_location || "",
      dressing_type: initialValues?.dressing_type || "",
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
        wound_location: values.wound_location,
        dressing_type: values.dressing_type,
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
        {/* Wound Location */}
        <FormField
          control={formMethods.control}
          name="wound_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{woundDressing.woundLocation}</FormLabel>
              <FormControl>
                <Input type="text" placeholder={woundDressing.enterWoundLocation} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dressing Type */}
        <FormField
          control={formMethods.control}
          name="dressing_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{woundDressing.dressingType}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={woundDressing.selectDressingType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sterile">Sterile</SelectItem>
                    <SelectItem value="Hydrocolloid">Hydrocolloid</SelectItem>
                    <SelectItem value="Foam">Foam</SelectItem>
                    <SelectItem value="Alginate">Alginate</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Frequency and Urgency */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={formMethods.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{woundDressing.frequency}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={common.selectFrequency} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Once daily">{frequencies.onceDaily}</SelectItem>
                      <SelectItem value="Twice daily">{frequencies.twiceDaily}</SelectItem>
                      <SelectItem value="Every 8 hours">{frequencies.every8Hours}</SelectItem>
                      <SelectItem value="As needed">{frequencies.asNeeded}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </div>

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

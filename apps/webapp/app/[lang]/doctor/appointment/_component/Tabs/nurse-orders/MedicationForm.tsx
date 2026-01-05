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
  const dict = useDictionary();
  const { form } = dict.pages.doctor.appointment.tabsContent.nurseOrders;
  const { medication, common, options, frequencies } = form;

  const formMethods = useForm({
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
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(submit)} className="space-y-4">
        {/* Medication Name and Dose */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={formMethods.control}
            name="medication_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{medication.medicationName}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={medication.selectMedication} />
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
            control={formMethods.control}
            name="dose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{medication.dose}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={medication.selectDose} />
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
            control={formMethods.control}
            name="route"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{medication.route}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={medication.selectRoute} />
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
            control={formMethods.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{medication.frequency}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={common.selectFrequency} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Once daily">{frequencies.onceDaily}</SelectItem>
                      <SelectItem value="Twice daily">{frequencies.twiceDaily}</SelectItem>
                      <SelectItem value="Three times daily">{frequencies.threeTimesDaily}</SelectItem>
                      <SelectItem value="Every 6 hours">{frequencies.every6Hours}</SelectItem>
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
            control={formMethods.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{medication.duration}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={common.selectDuration} />
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

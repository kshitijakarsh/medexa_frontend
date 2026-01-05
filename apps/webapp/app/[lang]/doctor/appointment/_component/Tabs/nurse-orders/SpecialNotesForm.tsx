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
  const dict = useDictionary();
  const { form } = dict.pages.doctor.appointment.tabsContent.nurseOrders;
  const { specialNotes, common, options } = form;

  const formMethods = useForm({
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
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(submit)} className="space-y-4">
        {/* Note Type */}
        <FormField
          control={formMethods.control}
          name="note_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{specialNotes.noteType}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={specialNotes.enterNoteType} />
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

        {/* Clinical Notes */}
        <FormField
          control={formMethods.control}
          name="clinical_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{common.clinicalNotes}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={common.enterClinicalNotes}
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

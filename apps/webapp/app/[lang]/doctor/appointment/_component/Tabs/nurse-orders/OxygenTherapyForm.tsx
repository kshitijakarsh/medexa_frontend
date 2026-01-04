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
  const dict = useDictionary();
  const { form } = dict.pages.doctor.appointment.tabsContent.nurseOrders;
  const { oxygenTherapy, common, options, frequencies } = form;

  const formMethods = useForm({
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
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(submit)} className="space-y-4">
        {/* Oxygen Delivery Type */}
        <FormField
          control={formMethods.control}
          name="oxygen_delivery_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{oxygenTherapy.deliveryType}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={oxygenTherapy.selectDeliveryType} />
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
          control={formMethods.control}
          name="flow_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{oxygenTherapy.flowRate}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={oxygenTherapy.selectFlowRate} />
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

        {/* Frequency/Mode and Urgency */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={formMethods.control}
            name="frequency_mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{oxygenTherapy.frequencyMode}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={oxygenTherapy.selectFrequencyMode} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Continuous">{frequencies.continuous}</SelectItem>
                      <SelectItem value="Intermittent">{frequencies.intermittent}</SelectItem>
                      <SelectItem value="PRN">{frequencies.prn}</SelectItem>
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

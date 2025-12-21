"use client";

import { AppDialog } from "@/components/common/app-dialog";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { useForm } from "@workspace/ui/hooks/use-form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";

import { PrimaryButton } from "@/components/common/buttons/primary-button";
import { CancelButton } from "@/components/common/buttons/cancel-button";
import { useCreateEquipment } from "../_hooks/useEquipment";
import { useState } from "react";

const schema = z.object({
  item_name: z.string().min(1, "Item name is required"),
  asset_id: z.string().optional(),
  condition_before_use: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  notes: z.string().optional(),
});

interface AddEquipmentModalProps {
  visitId: string;
  patientId: string;
  open: boolean;
  onClose: () => void;
}

export default function AddEquipmentModal({
  visitId,
  patientId,
  open,
  onClose,
}: AddEquipmentModalProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      item_name: "",
      asset_id: "",
      condition_before_use: "",
      start_time: "",
      end_time: "",
      notes: "",
    },
  });

  const createEquipment = useCreateEquipment(visitId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (values: z.infer<typeof schema>) => {
    try {
      setIsSubmitting(true);
      await createEquipment.mutateAsync({
        visit_id: visitId,
        patient_id: patientId,
        item_name: values.item_name,
        asset_tag: values.asset_id || "", // Using asset_id as asset_tag
        asset_id: values.asset_id,
        condition_before_use: values.condition_before_use,
        start_time: values.start_time+ ':00Z',
        end_time: values.end_time+ ':00Z',
        status: "Processing", // Default status
        notes: values.notes,
      });

      form.reset();
      onClose();
    } catch (error) {
      console.error("Error creating equipment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppDialog open={open} onClose={onClose} title="Add Equipment">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          {/* Item Name */}
          <FormField
            control={form.control}
            name="item_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Item Name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ventilator">Ventilator</SelectItem>
                      <SelectItem value="Monitor">Monitor</SelectItem>
                      <SelectItem value="Wheelchair">Wheelchair</SelectItem>
                      <SelectItem value="Oxygen Cylinder">Oxygen Cylinder</SelectItem>
                      <SelectItem value="IV Stand">IV Stand</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Asset ID */}
          <FormField
            control={form.control}
            name="asset_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asset ID</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Asset ID" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AST-001">AST-001</SelectItem>
                      <SelectItem value="AST-002">AST-002</SelectItem>
                      <SelectItem value="AST-003">AST-003</SelectItem>
                      <SelectItem value="AST-004">AST-004</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Condition Before Use */}
          <FormField
            control={form.control}
            name="condition_before_use"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition Before Use</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Needs Maintenance">Needs Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Start Time */}
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Time (Optional) */}
            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time (Optional)</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Notes / Instructions */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes / Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Notes / Instructions"
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
            <CancelButton onClick={onClose} />
            <PrimaryButton
              type="submit"
              disabled={isSubmitting}
              label={isSubmitting ? "Adding..." : "Add Equipment"}
            />
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

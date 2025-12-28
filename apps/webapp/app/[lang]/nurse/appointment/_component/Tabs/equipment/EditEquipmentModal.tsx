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
import { useSaveEquipment } from "../_hooks/useEquipment";
import { useState, useEffect } from "react";

const schema = z.object({
  item_name: z.string().min(1, "Item name is required"),
  asset_id: z.string().optional(),
  condition_before_use: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  cost: z.string().optional(),
  status: z.string().optional(),
  notes: z.string().optional(),
});

interface EditEquipmentModalProps {
  equipment: any;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditEquipmentModal({
  equipment,
  open,
  onClose,
  onSuccess,
}: EditEquipmentModalProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      item_name: "",
      asset_id: "",
      condition_before_use: "",
      start_time: "",
      end_time: "",
      cost: "",
      status: "",
      notes: "",
    },
  });

  const saveEquipment = useSaveEquipment(equipment?.id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (equipment) {
      // Format datetime for datetime-local input
      const formatDateTime = (dateStr: string | undefined) => {
        if (!dateStr) return "";
        try {
          const date = new Date(dateStr);
          return date.toISOString().slice(0, 16);
        } catch {
          return "";
        }
      };

      form.reset({
        item_name: equipment.item_name || "",
        asset_id: equipment.asset_id || "",
        condition_before_use: equipment.condition_before_use || "",
        start_time: formatDateTime(equipment.start_time),
        end_time: formatDateTime(equipment.end_time),
        cost: equipment.cost || "",
        status: equipment.status || "Processing",
        notes: equipment.notes || "",
      });
    }
  }, [equipment, form]);

  const submit = async (values: z.infer<typeof schema>) => {
    try {
      setIsSubmitting(true);
      await saveEquipment.mutateAsync({
        item_name: values.item_name,
        asset_tag: values.asset_id || "",
        asset_id: values.asset_id,
        condition_before_use: values.condition_before_use,
        start_time: values.start_time ? values.start_time + ':00Z' : undefined,
        end_time: values.end_time ? values.end_time + ':00Z' : undefined,
        cost: values.cost,
        status: values.status || "Processing",
        notes: values.notes,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating equipment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppDialog open={open} onClose={onClose} title="Edit Equipment">
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

          {/* Cost */}
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Cost (e.g., 450/h)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="In Use">In Use</SelectItem>
                      <SelectItem value="Returned">Returned</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
              label={isSubmitting ? "Updating..." : "Update Equipment"}
            />
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

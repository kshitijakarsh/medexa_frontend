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
import { useCreateConsumable } from "../_hooks/useConsumables";
import { useState } from "react";

const schema = z.object({
  item_name: z.string().min(1, "Item name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  notes: z.string().optional(),
});

interface AddConsumableModalProps {
  visitId: string;
  patientId: string;
  open: boolean;
  onClose: () => void;
}

export default function AddConsumableModal({
  visitId,
  patientId,
  open,
  onClose,
}: AddConsumableModalProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      item_name: "",
      quantity: "",
      notes: "",
    },
  });

  const createConsumable = useCreateConsumable(visitId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (values: z.infer<typeof schema>) => {
    try {
      setIsSubmitting(true);
      await createConsumable.mutateAsync({
        visit_id: visitId,
        patient_id: patientId,
        item_name: values.item_name,
        quantity: parseInt(values.quantity),
        status: "Processing", // Default status
        notes: values.notes,
      });

      form.reset();
      onClose();
    } catch (error) {
      console.error("Error creating consumable:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppDialog open={open} onClose={onClose} title="Add Consumable">
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
                      <SelectItem value="Sterile Gauze Pack (10 pcs)">Sterile Gauze Pack (10 pcs)</SelectItem>
                      <SelectItem value="Disposable Syringe">Disposable Syringe</SelectItem>
                      <SelectItem value="IV Cannula">IV Cannula</SelectItem>
                      <SelectItem value="Surgical Gloves">Surgical Gloves</SelectItem>
                      <SelectItem value="Bandages">Bandages</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantity */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter Quantity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
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
              label={isSubmitting ? "Adding..." : "Add Consumable"}
            />
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

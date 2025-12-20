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
import { useSaveConsumable } from "../_hooks/useConsumables";
import { useState, useEffect } from "react";

const schema = z.object({
  item_name: z.string().min(1, "Item name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  cost: z.string().optional(),
  status: z.string().optional(),
  notes: z.string().optional(),
});

interface EditConsumableModalProps {
  consumable: any;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditConsumableModal({
  consumable,
  open,
  onClose,
  onSuccess,
}: EditConsumableModalProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      item_name: "",
      quantity: "",
      cost: "",
      status: "",
      notes: "",
    },
  });

  const saveConsumable = useSaveConsumable(consumable?.id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (consumable) {
      form.reset({
        item_name: consumable.item_name || "",
        quantity: consumable.quantity?.toString() || "",
        cost: consumable.cost || "",
        status: consumable.status || "Processing",
        notes: consumable.notes || "",
      });
    }
  }, [consumable, form]);

  const submit = async (values: z.infer<typeof schema>) => {
    try {
      setIsSubmitting(true);
      await saveConsumable.mutateAsync({
        item_name: values.item_name,
        quantity: parseInt(values.quantity),
        cost: values.cost,
        status: values.status || "Processing",
        notes: values.notes,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating consumable:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppDialog open={open} onClose={onClose} title="Edit Consumable">
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
                      <SelectItem value="Consumed">Consumed</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
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
              label={isSubmitting ? "Updating..." : "Update Consumable"}
            />
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

"use client";

import { useEffect } from "react";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm } from "@workspace/ui/hooks/use-form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form";
import { AppDialog } from "@/components/common/app-dialog";
import { StatusSwitch } from "@/components/common/switch-green";

const itemSchema = z.object({
  name: z.string().min(1, "This field is required").max(100),
  active: z.boolean().catch(false),
});

const formSchema = z.object({
  items: z.array(itemSchema).min(1),
});

type FormSchema = z.infer<typeof formSchema>;

interface AddDialogProps {
  open: boolean;
  onClose: () => void;
  mode: "roles";
  onSave?: (data: any[]) => void;
}

export function AddDialog({ open, onClose, onSave }: AddDialogProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [{ name: "", active: false }],
    },
  });

  useEffect(() => {
    if (!open) form.reset({ items: [{ name: "", active: false }] });
  }, [open, form]);

  const handleSave = (values: FormSchema) => {
    if (onSave) onSave(values.items);
    onClose();
  };

  return (
    <AppDialog open={open} onClose={onClose} title="Add User Role" maxWidth="md:max-w-4xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          <div className="max-h-[70vh] overflow-y-auto py-3">
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="items.0.name"
                render={({ field }) => (
                  <FormItem className="w-full border rounded-lg p-4 shadow-sm">
                    <FormLabel>User Role Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter User Role Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="items.0.active"
                render={({ field }) => (
                  <FormItem className="border rounded-lg p-4 shadow-sm">
                    <FormLabel>Status</FormLabel>
                    <div
                      className={`flex items-center gap-3 ${
                        field.value ? "bg-green-50" : "bg-gray-50"
                      } h-9 px-2 rounded-md`}
                    >
                      <span className="text-sm text-red-500">Inactive</span>
                      <FormControl>
                        <StatusSwitch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <span
                        className={`text-sm ${
                          field.value ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        Active
                      </span>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-blue-600 border-blue-500"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

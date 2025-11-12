"use client";

import { useForm } from "@workspace/ui/hooks/use-form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { StatusSwitch } from "@/components/common/switch-green";
import { AppDialog } from "@/components/common/app-dialog";

const schema = z.object({
  name: z.string().min(1, "This field is required"),
  active: z.boolean().catch(false),
});

type FormValues = z.infer<typeof schema>;

export function AddDialog({
  open,
  onClose,
  mode,
}: {
  open: boolean;
  onClose: () => void;
  mode: "bedType" | "ward" | "floor";
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      active: false,
    },
  });

  const handleSave = (values: FormValues) => {
    console.log(`Saved ${mode}:`, values);
    onClose();
  };

  const titleMap: Record<typeof mode, string> = {
    bedType: "Add Bed Type",
    ward: "Add Ward",
    floor: "Add Floor",
  };

  const labelMap: Record<typeof mode, string> = {
    bedType: "Bed Type Name",
    ward: "Ward Name",
    floor: "Floor Name",
  };

  return (
    <AppDialog open={open} onClose={onClose} title={titleMap[mode]}  maxWidth="md:max-w-lg lg:max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4 text-sm">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{labelMap[mode]}</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter ${labelMap[mode]}`} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <div
                  className={`flex items-center gap-3 rounded-md px-3 py-2 ${
                    field.value ? "bg-green-50" : "bg-gray-50"
                  }`}
                >
                  <span className="text-sm text-red-500">Inactive</span>
                  <FormControl>
                    <StatusSwitch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <span className="text-sm text-green-600">Active</span>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-blue-600 border-blue-500"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

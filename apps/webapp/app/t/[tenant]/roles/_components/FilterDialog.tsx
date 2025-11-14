"use client";

import { useEffect } from "react";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm } from "@workspace/ui/hooks/use-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Select } from "@workspace/ui/components/select";
import { Button } from "@workspace/ui/components/button";
import { AppDialog } from "@/components/common/app-dialog";
import { AppSelect } from "@/components/common/app-select";

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  mode: "roles";
  onApply: (filters: any) => void;
  isLoading?: boolean;
}

const filterSchema = z.object({
  name: z.string().optional(),
  status: z.string().optional(),
  addedBy: z.string().optional(),
  dateRange: z.string().optional(),
});

type FilterSchema = z.infer<typeof filterSchema>;

export function FilterDialog({
  open,
  onClose,
  onApply,
  isLoading,
}: FilterDialogProps) {
  const form = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      name: "",
      status: "",
      addedBy: "",
      dateRange: "",
    },
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  const handleApply = (values: FilterSchema) => {
    onApply(values);
    onClose();
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Filter User Roles"
      maxWidth="md:max-w-3xl"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleApply)}
          className="space-y-6 py-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Role Name Filter */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Role Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter role name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Status Filter */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <AppSelect
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Select status"
                      options={[
                        { label: "Active", value: "Active" },
                        { label: "Inactive", value: "Inactive" },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Added By Filter */}
            <FormField
              control={form.control}
              name="addedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Added By</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter added by name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Created Date Range */}
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Created Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                onClose();
              }}
              className="text-blue-600 border-blue-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {isLoading ? "Applying..." : "Apply Filters"}
            </Button>
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

"use client";

import { useForm } from "@workspace/ui/hooks/use-form";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@workspace/ui/components/form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { AppDialog } from "@/components/common/app-dialog";
import { CancelButton } from "@/components/common/cancel-button";
import { ActionButton } from "@/components/common/action-button";
import { AppSelect } from "@/components/common/app-select";
import { Input } from "@workspace/ui/components/input";

// ✅ Schema for filtering TPA / Provider List
const filterSchema = z.object({
  chartOfAccount: z.string().optional(),
  providerName: z.string().optional(),
  shortName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  status: z.string().optional(),
});

type FilterForm = z.infer<typeof filterSchema>;

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: (values: FilterForm) => void;
  isLoading?: boolean;
}

export function FilterDialog({
  open,
  onClose,
  onApply,
  isLoading = false,
}: FilterDialogProps) {
  const form = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      chartOfAccount: "",
      providerName: "",
      shortName: "",
      email: "",
      phone: "",
      status: "",
    },
  });

  const handleApply = (values: FilterForm) => {
    onApply(values);
    onClose();
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Filter TPA / Provider List"
      maxWidth="md:max-w-md"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleApply)}
          className="space-y-4 text-sm"
        >
          {/* Chart Of Account */}
          <FormField
            control={form.control}
            name="chartOfAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chart Of Account</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder="Select Chart Of Account"
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { label: "10101002 - HSBC Bank", value: "10101002 - HSBC Bank" },
                      { label: "10101001 - Main Cash", value: "10101001 - Main Cash" },
                    ]}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Provider Name */}
          <FormField
            control={form.control}
            name="providerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provider Name</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder="Select Provider Name"
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { label: "GIG Gulf (formerly AXA Gulf)", value: "GIG Gulf (formerly AXA Gulf)" },
                      { label: "AXA", value: "AXA" },
                      { label: "Nextcare", value: "Nextcare" },
                    ]}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Short Name */}
          <FormField
            control={form.control}
            name="shortName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Short Name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Email Address"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Phone Number"
                    {...field}
                  />
                </FormControl>
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
                  <AppSelect
                    placeholder="Select Status"
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { label: "Active", value: "Active" },
                      { label: "Inactive", value: "Inactive" },
                    ]}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-4">
            <CancelButton onClick={onClose} />
            <ActionButton
              loading={isLoading}
              label="Apply Filter"
              type="submit"
            />
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

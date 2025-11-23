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

// ✅ Schema for filtering company list
const filterSchema = z.object({
  providerName: z.string().optional(),
  companyName: z.string().optional(),
  status: z.string().optional(),
  trn: z.string().optional(),
  city: z.string().optional(),
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
      providerName: "",
      companyName: "",
      status: "",
      trn: "",
      city: "",
    },
  });

  const handleApply = (values: FilterForm) => {
    console.log("✅ Applied Filters:", values);
    onApply(values);
    onClose();
  };

  return (
    <AppDialog open={open} onClose={onClose} title="Filter" maxWidth="md:max-w-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleApply)}
          className="space-y-4 text-sm"
        >
          {/* Provider Name */}
          <FormField
            control={form.control}
            name="providerName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Provider Name</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder="Select Provider Name"
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error}
                    options={[
                      { label: "GIG Gulf (formerly AXA Gulf)", value: "GIG Gulf (formerly AXA Gulf)" },
                      { label: "Nextcare", value: "Nextcare" },
                      { label: "GEMS", value: "GEMS" },
                    ]}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Company Name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* TRN */}
          <FormField
            control={form.control}
            name="trn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TRN</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter TRN Number"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* City / Address */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder="Select City"
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { label: "Manama", value: "Manama" },
                      { label: "Seef District", value: "Seef District" },
                      { label: "Riffa", value: "Riffa" },
                    ]}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder="Select Status"
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error}
                    options={[
                      { label: "Active", value: "Active" },
                      { label: "Inactive", value: "Inactive" },
                    ]}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
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

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
import { useDictionary } from "@/i18n/use-dictionary";

const filterSchema = z.object({
  operationCategory: z.string().optional(),
  status: z.string().optional(),
  createdBy: z.string().optional(),
  dateRange: z.string().optional(),
});

type FilterForm = z.infer<typeof filterSchema>;

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  mode: "operation" | "operationCategory";
  onApply: (values: FilterForm) => void;
  isLoading: boolean;
}

export function FilterDialog({
  open,
  onClose,
  mode,
  onApply,
  isLoading,
}: FilterDialogProps) {
  const form = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      operationCategory: "",
      status: "",
      createdBy: "",
      dateRange: "",
    },
  });

  const handleApply = (values: FilterForm) => {
    console.log("✅ Filters applied:", values);
    onApply(values);
    onClose();
  };

  const dict = useDictionary();

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Filter"
      maxWidth="md:max-w-md"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleApply)}
          className="space-y-4 text-sm"
        >
          {/* Common Filters */}
          {mode === "operation" && (
            <>
              <FormField
                control={form.control}
                name="operationCategory"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>{dict.pages.operation.tabs.operationCategory}</FormLabel>
                    <FormControl>
                      <AppSelect
                        placeholder={dict.pages.operation.dialogs.placeholder}
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error}
                        options={[
                          { label: "Plastic Surgery", value: "Plastic Surgery" },
                          { label: "Ophthalmology", value: "Ophthalmology" },
                          { label: "ENT and Oral Surgery", value: "ENT and Oral Surgery" },
                          { label: "Thoracic Surgery", value: "Thoracic Surgery" },
                        ]}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Status Filter */}
          <FormField
            control={form.control}
            name="status"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{dict.common.status}</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder={dict.pages.operation.dialogs.placeholderStatus}
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error}
                    options={[
                      { label: dict.common.active, value: "Active" },
                      { label: dict.common.inactive, value: "Inactive" },
                    ]}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Created By */}
          <FormField
            control={form.control}
            name="createdBy"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{dict.pages.operation.dialogs.createdBy}</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder={dict.pages.operation.dialogs.placeholderCreatedBy}
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error}
                    options={[
                      { label: "Dr. Ahmed Al-Mansouri", value: "Dr. Ahmed Al-Mansouri" },
                      { label: "Dr. Sara Malik", value: "Dr. Sara Malik" },
                      { label: "Dr. Rajesh Kumar", value: "Dr. Rajesh Kumar" },
                    ]}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Date Range */}
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{dict.pages.operation.dialogs.dateRange}</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder={dict.pages.operation.dialogs.placeholderDateRange}
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error}
                    options={[
                      { label: "Today", value: "today" },
                      { label: "This Week", value: "thisWeek" },
                      { label: "This Month", value: "thisMonth" },
                    ]}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <CancelButton onClick={onClose} />
            <ActionButton loading={isLoading} label= {dict.common.appplyfilters} />
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

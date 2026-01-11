"use client";

import { useEffect } from "react";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm, useFieldArray } from "@workspace/ui/hooks/use-form";
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
import { Plus, X } from "lucide-react";
import { AppDialog } from "@/components/common/app-dialog";
import { StatusSwitch } from "@/components/common/switch-green";
import { useDictionary } from "@/i18n/dictionary-context";

const itemSchema = z.object({
  name: z.string().min(1, "This field is required").max(100),
  active: z.boolean().catch(false),
});

const formSchema = z.object({
  items: z.array(itemSchema).min(1, "At least one entry is required"),
});

type FormSchema = z.infer<typeof formSchema>;

interface AddDialogProps {
  open: boolean;
  onClose: () => void;
  mode: "designation" | "specialization" | "userRoles";
  onSave?: (data: any[]) => void | Promise<void>;
  isLoading?: boolean;
}

export function AddDialog({ open, onClose, mode, onSave, isLoading = false }: AddDialogProps) {
  const dict = useDictionary();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [{ name: "", active: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    if (!open) form.reset({ items: [{ name: "", active: false }] });
  }, [open, form]);

  const titleMap = {
    designation: dict.pages.employeeConfiguration.actions.addBulkDesignation,
    specialization: dict.pages.employeeConfiguration.actions.addBulkSpecialization,
    userRoles: dict.pages.employeeConfiguration.actions.addUserRole,
  };

  const labelMap = {
    designation: dict.pages.employeeConfiguration.table.designationName,
    specialization: dict.pages.employeeConfiguration.table.specialization,
    userRoles: dict.pages.employeeConfiguration.table.userRole,
  };

  const handleSave = async (values: FormSchema) => {
    try {
      if (onSave) {
        await onSave(values.items);
      }
      onClose();
    } catch (error) {
      console.error(`Failed to save ${mode}:`, error);
    }
  };

  const isSingle = mode === "userRoles";

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={titleMap[mode]}
      maxWidth="md:max-w-4xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          <div className="max-h-[70vh] overflow-y-auto py-3">
            <div
              className={`grid ${fields.length > 1 && !isSingle
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1"
                } gap-6`}
            >
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-start justify-between gap-3 border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row items-center gap-3 w-full">
                    <FormField
                      control={form.control}
                      name={`items.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>{labelMap[mode]}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={labelMap[mode]}
                              {...field}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.active`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col rounded-md px-3">
                            <FormLabel className="pb-2">{dict.common.status}</FormLabel>
                            <div
                              className={`flex items-center gap-3 ${field.value ? "bg-green-50" : "bg-gray-50"
                                } h-9 px-2`}
                            >
                              <span className="text-sm text-red-500">
                                {dict.common.inactive}
                              </span>
                              <FormControl>
                                <StatusSwitch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <span
                                className={`text-sm ${field.value
                                  ? "text-green-600"
                                  : "text-gray-400"
                                  }`}
                              >
                                {dict.common.active}
                              </span>
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />

                    {!isSingle && fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full cursor-pointer"
                      >
                        <X className="h-4 w-4 bg-white rounded-full text-red-600" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!isSingle && (
              <div className="flex justify-end mt-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 cursor-pointer"
                  onClick={() => append({ name: "", active: false })}
                  disabled={isLoading}
                >
                  {dict.common.addRow}{" "}
                  <span className="bg-green-500 p-2 rounded-full">
                    <Plus className="w-5 h-5 bg-white rounded-full" />
                  </span>
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-blue-600 border-blue-500"
              disabled={isLoading}
            >
              {dict.common.cancel}
            </Button>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? dict.common.saving : dict.common.save}
            </Button>
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

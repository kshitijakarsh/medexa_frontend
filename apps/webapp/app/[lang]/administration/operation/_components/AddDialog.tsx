// "use client";

// import { useEffect } from "react";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";
// import { useForm, useFieldArray } from "@workspace/ui/hooks/use-form";
// import { Input } from "@workspace/ui/components/input";
// import { Button } from "@workspace/ui/components/button";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@workspace/ui/components/form";
// import { Plus, X } from "lucide-react";
// import { AppDialog } from "@/components/common/app-dialog";
// import { StatusSwitch } from "@/components/common/switch-green";
// import { AppSelect } from "@/components/common/app-select";

// const itemSchema = z.object({
//   name: z.string().min(1, "This field is required").max(100),
//   category: z.string().optional(),
//   active: z.boolean().catch(false),
// });

// const formSchema = z.object({
//   items: z.array(itemSchema).min(1, "At least one entry is required"),
// });

// type FormSchema = z.infer<typeof formSchema>;

// interface AddDialogProps {
//   open: boolean;
//   onClose: () => void;
//   mode: "operation" | "operationCategory";
//   onSave?: (data: any[]) => void;
// }

// export function AddDialog({ open, onClose, mode, onSave }: AddDialogProps) {
//   const form = useForm<FormSchema>({
//     resolver: zodResolver(formSchema),
//     defaultValues: { items: [{ name: "", category: "", active: false }] },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "items",
//   });

//   useEffect(() => {
//     if (!open) form.reset({ items: [{ name: "", category: "", active: false }] });
//   }, [open, form]);

//   const titleMap = {
//     operation: "Add Operation Name",
//     operationCategory: "Add Operation Category",
//   };

//   const handleSave = (values: FormSchema) => {
//     console.log(`✅ Saved ${mode}:`, values.items);
//     if (onSave) onSave(values.items);
//     onClose();
//   };

//   return (
//     <AppDialog
//       open={open}
//       onClose={onClose}
//       title={titleMap[mode]}
//       maxWidth="md:max-w-md"
//     >
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
//           <div className="max-h-[70vh] overflow-y-auto py-3">
//             <div className="grid grid-cols-1 gap-6">
//               {fields.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="flex items-start justify-between gap-3 border rounded-lg p-4 shadow-sm"
//                 >
//                   <div className="flex flex-col gap-4 w-full">
//                     {/* Operation Name / Category Name */}
//                     <FormField
//                       control={form.control}
//                       name={`items.${index}.name`}
//                       render={({ field }) => (
//                         <FormItem className="w-full">
//                           <FormLabel>
//                             {mode === "operation"
//                               ? "Operation Name"
//                               : "Operation Category"}
//                           </FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder={
//                                 mode === "operation"
//                                   ? "Enter Operation Name"
//                                   : "Enter Operation Category"
//                               }
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     {/* Operation Category dropdown only for "operation" */}
//                     {mode === "operation" && (
//                       <FormField
//                         control={form.control}
//                         name={`items.${index}.category`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Operation Category</FormLabel>
//                             <FormControl>
//                               <AppSelect
//                                 placeholder="Select Operation Category"
//                                 value={field.value}
//                                 onChange={field.onChange}
//                                 options={[
//                                   { label: "Plastic Surgery", value: "Plastic Surgery" },
//                                   { label: "ENT and Oral Surgery", value: "ENT and Oral Surgery" },
//                                   { label: "Ophthalmology", value: "Ophthalmology" },
//                                   { label: "Thoracic Surgery", value: "Thoracic Surgery" },
//                                   { label: "Gynaecology", value: "Gynaecology" },
//                                 ]}
//                               />
//                             </FormControl>
//                           </FormItem>
//                         )}
//                       />
//                     )}

//                     {/* Status Toggle */}
//                     <FormField
//                       control={form.control}
//                       name={`items.${index}.active`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex flex-col rounded-md px-3">
//                             <FormLabel className="pb-2">Status</FormLabel>
//                             <div
//                               className={`flex items-center gap-3 ${
//                                 field.value ? "bg-green-50" : "bg-gray-50"
//                               } h-9 px-2`}
//                             >
//                               <span className="text-sm text-red-500">Inactive</span>
//                               <FormControl>
//                                 <StatusSwitch
//                                   checked={field.value}
//                                   onCheckedChange={field.onChange}
//                                 />
//                               </FormControl>
//                               <span
//                                 className={`text-sm ${
//                                   field.value ? "text-green-600" : "text-gray-400"
//                                 }`}
//                               >
//                                 Active
//                               </span>
//                             </div>
//                           </div>
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   {/* Remove Button */}
//                   {fields.length > 1 && (
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => remove(index)}
//                       className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full cursor-pointer"
//                     >
//                       <X className="h-4 w-4 bg-white rounded-full text-red-600" />
//                     </Button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Add Row */}
//             <div className="flex justify-end mt-4">
//               <Button
//                 type="button"
//                 variant="ghost"
//                 className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 cursor-pointer"
//                 onClick={() => append({ name: "", category: "", active: false })}
//               >
//                 Add Row{" "}
//                 <span className="bg-green-500 p-2 rounded-full">
//                   <Plus className="w-5 h-5 bg-white rounded-full" />
//                 </span>
//               </Button>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex justify-end gap-3 pt-6 border-t">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               className="text-blue-600 border-blue-500"
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               className="bg-green-500 hover:bg-green-600 text-white"
//             >
//               Save
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </AppDialog>
//   );
// }


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
import { AppSelect } from "@/components/common/app-select";
import { useDictionary } from "@/i18n/use-dictionary";
import { useCreateProcedure } from "@/app/[lang]/administration/_hooks/useOperation";
import { CreateProcedurePayload } from "@/lib/api/administration/operation";

const operationSchema = z.object({
  name: z.string().min(1, "Operation name is required"),
  category: z.string().min(1, "Operation category is required"),
});

const categorySchema = z.object({
  name: z.string().min(1, "Procedure name is required"),
  code: z.string().min(1, "Procedure code is required"),
  surgery_type: z.string().min(1, "Surgery type is required"),
  standard_charge: z.coerce.number().min(0, "Standard charge is required"),
  status: z.enum(["active", "inactive"]),
});

type FormSchema =
  | z.infer<typeof operationSchema>
  | z.infer<typeof categorySchema>;

interface AddDialogProps {
  open: boolean;
  onClose: () => void;
  mode: "operation" | "operationCategory";
  onSave: (data: any) => void;
}

export function AddDialog({ open, onClose, mode, onSave }: AddDialogProps) {
  const schema = mode === "operation" ? operationSchema : categorySchema;
  const dict = useDictionary();
  const createProcedure = useCreateProcedure();

  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues:
      mode === "operation"
        ? { name: "", category: "" }
        : {
          name: "",
          code: "",
          surgery_type: "",
          standard_charge: 0,
          status: "active",
        },
  });

  useEffect(() => {
    if (!open)
      form.reset(
        mode === "operation"
          ? { name: "", category: "" }
          : {
            name: "",
            code: "",
            surgery_type: "",
            standard_charge: 0,
            status: "active",
          }
      );
  }, [open, mode, form]);

  const handleSubmit = (values: any) => {
    if (mode === "operationCategory") {
      createProcedure.mutate(values as CreateProcedurePayload, {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      onSave(values);
      onClose();
    }
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={mode === "operation" ? dict.pages.operation.tabs.operation : dict.pages.operation.tabs.operationCategory}
      maxWidth="md:max-w-sm"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {mode === "operation" ? (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dict.pages.operation.dialogs.Title}</FormLabel>
                    <FormControl>
                      <Input placeholder={dict.pages.operation.dialogs.placeholder1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dict.pages.operation.tabs.operationCategory}</FormLabel>
                    <FormControl>
                      <AppSelect
                        placeholder={dict.pages.operation.dialogs.placeholder}
                        value={field.value}
                        onChange={field.onChange}
                        options={[
                          { label: "Plastic Surgery", value: "Plastic Surgery" },
                          { label: "ENT and Oral Surgery", value: "ENT and Oral Surgery" },
                          { label: "Ophthalmology", value: "Ophthalmology" },
                          { label: "Thoracic Surgery", value: "Thoracic Surgery" },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Procedure Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter procedure name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Procedure Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. PROC001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surgery_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surgery Type</FormLabel>
                    <FormControl>
                      <AppSelect
                        placeholder="Select surgery type"
                        value={field.value}
                        onChange={field.onChange}
                        options={[
                          { label: "Major", value: "major" },
                          { label: "Minor", value: "minor" },
                          { label: "Day Case", value: "day_case" },
                          { label: "Emergency", value: "emergency" },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="standard_charge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Standard Charge</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 5000"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <AppSelect
                        placeholder="Select status"
                        value={field.value}
                        onChange={field.onChange}
                        options={[
                          { label: "Active", value: "active" },
                          { label: "Inactive", value: "inactive" },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-blue-600 border-blue-500"
              disabled={createProcedure.isPending}
            >
              {dict.common.cancel}
            </Button>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white"
              disabled={createProcedure.isPending}
            >
              {createProcedure.isPending ? "Saving..." : dict.common.save}
            </Button>
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

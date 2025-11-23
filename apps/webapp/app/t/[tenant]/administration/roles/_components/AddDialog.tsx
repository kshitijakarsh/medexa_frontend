// "use client";

// import { useEffect } from "react";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";
// import { useForm } from "@workspace/ui/hooks/use-form";
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
// import { AppDialog } from "@/components/common/app-dialog";
// import { StatusSwitch } from "@/components/common/switch-green";

// const itemSchema = z.object({
//   name: z.string().min(1, "This field is required").max(100),
//   active: z.boolean().catch(false),
// });

// const formSchema = z.object({
//   items: z.array(itemSchema).min(1),
// });

// type FormSchema = z.infer<typeof formSchema>;

// interface AddDialogProps {
//   open: boolean;
//   onClose: () => void;
//   mode: "roles";
//   onSave?: (data: any[]) => void;
// }

// export function AddDialog({ open, onClose, onSave }: AddDialogProps) {
//   const form = useForm<FormSchema>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       items: [{ name: "", active: false }],
//     },
//   });

//   useEffect(() => {
//     if (!open) form.reset({ items: [{ name: "", active: false }] });
//   }, [open, form]);

//   const handleSave = (values: FormSchema) => {
//     if (onSave) onSave(values.items);
//     onClose();
//   };

//   return (
//     <AppDialog open={open} onClose={onClose} title="Add User Role" maxWidth="md:max-w-4xl">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
//           <div className="max-h-[70vh] overflow-y-auto py-3">
//             <div className="grid grid-cols-1 gap-6">
//               <FormField
//                 control={form.control}
//                 name="items.0.name"
//                 render={({ field }) => (
//                   <FormItem className="w-full border rounded-lg p-4 shadow-sm">
//                     <FormLabel>User Role Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter User Role Name" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="items.0.active"
//                 render={({ field }) => (
//                   <FormItem className="border rounded-lg p-4 shadow-sm">
//                     <FormLabel>Status</FormLabel>
//                     <div
//                       className={`flex items-center gap-3 ${
//                         field.value ? "bg-green-50" : "bg-gray-50"
//                       } h-9 px-2 rounded-md`}
//                     >
//                       <span className="text-sm text-red-500">Inactive</span>
//                       <FormControl>
//                         <StatusSwitch checked={field.value} onCheckedChange={field.onChange} />
//                       </FormControl>
//                       <span
//                         className={`text-sm ${
//                           field.value ? "text-green-600" : "text-gray-400"
//                         }`}
//                       >
//                         Active
//                       </span>
//                     </div>
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-6 border-t">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               className="text-blue-600 border-blue-500"
//             >
//               Cancel
//             </Button>
//             <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
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
import { useForm } from "@workspace/ui/hooks/use-form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { StatusSwitch } from "@/components/common/switch-green";
import { AppDialog } from "@/components/common/app-dialog";
import { PrimaryButton } from "@/components/common/buttons/primary-button";
import { CancelButton } from "@/components/common/buttons/cancel-button";

const schema = z.object({
  name: z.string().min(1, "Role name is required"),
  active: z.boolean().catch(false),
});

export type AddRoleForm = z.infer<typeof schema>;

export function AddRoleDialog({
  open,
  onClose,
  onSave,
  initialData,
  mode = "add",
}: {
  open: boolean;
  onClose: () => void;
  onSave: (values: AddRoleForm) => void;
  initialData?: any;
  mode?: "add" | "edit";
}) {
  const form = useForm<AddRoleForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      active: false,
    },
  });

  /* -----------------------------------------
      LOAD EDIT DATA
  ------------------------------------------ */
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || "",
        active: initialData.status === "active",
      });
    } else {
      form.reset({
        name: "",
        active: false,
      });
    }
  }, [initialData, form]);

  const handleSubmit = (values: AddRoleForm) => {
    onSave(values);
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={mode === "add" ? "Add User Role" : "Edit User Role"}
      maxWidth="md:max-w-lg"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 text-sm">

          {/* ROLE NAME */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter User Role Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* ACTIVE STATUS */}
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>

                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded ${field.value ? "bg-green-50" : "bg-gray-50"
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

          {/* FOOTER BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">
            {/* <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button> */}
            <CancelButton onClick={onClose} />
              {/* <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              {mode === "add" ? "Save" : "Update"}
            </Button> */}
            <PrimaryButton type="submit" label={mode === "add" ? "Save" : "Update"} />

          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

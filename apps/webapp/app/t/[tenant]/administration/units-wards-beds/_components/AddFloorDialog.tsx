// "use client";

// import { useForm } from "@workspace/ui/hooks/use-form";
// import { Input } from "@workspace/ui/components/input";
// import { Button } from "@workspace/ui/components/button";
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";
// import { StatusSwitch } from "@/components/common/switch-green";
// import { AppDialog } from "@/components/common/app-dialog";

// const floorSchema = z.object({
//   floor_name: z.string().min(1, "Floor name is required"),
//   status: z.boolean().catch(false),
// });

// type FloorForm = z.infer<typeof floorSchema>;

// export function AddFloorDialog({
//   open,
//   onClose,
//   onSave,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onSave: (values: FloorForm) => void;
// }) {
//   const form = useForm<FloorForm>({
//     resolver: zodResolver(floorSchema),
//     defaultValues: {
//       floor_name: "",
//       status: true,
//     },
//   });

//   const handleSubmit = (values: FloorForm) => {
//     onSave(values);
//     onClose();
//   };

//   return (
//     <AppDialog open={open} onClose={onClose} title="Add Floor" maxWidth="md:max-w-lg">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 text-sm">

//           <FormField
//             control={form.control}
//             name="floor_name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Floor Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter Floor Name" {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="status"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Status</FormLabel>
//                 <div
//                   className={`flex items-center gap-3 rounded-md px-3 py-2 ${
//                     field.value ? "bg-green-50" : "bg-gray-50"
//                   }`}
//                 >
//                   <span className="text-sm text-red-500">Inactive</span>
//                   <FormControl>
//                     <StatusSwitch checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                   <span className="text-sm text-green-600">Active</span>
//                 </div>
//               </FormItem>
//             )}
//           />

//           <div className="flex justify-end gap-3 pt-4">
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit" className="bg-green-500 hover:bg-green-600">
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

const floorSchema = z.object({
  floor_name: z.string().min(1, "Floor name is required"),
  status: z.boolean().catch(false),
});

type FloorForm = z.infer<typeof floorSchema>;

export function AddFloorDialog({
  open,
  onClose,
  onSave,
  initialData,
  mode = "add",
}: {
  open: boolean;
  onClose: () => void;
  onSave: (values: FloorForm) => void;
  initialData?: any;
  mode?: "add" | "edit";
}) {
  const form = useForm<FloorForm>({
    resolver: zodResolver(floorSchema),
    defaultValues: {
      floor_name: "",
      status: true,
    },
  });

  // ⭐ Load initial values on edit
  useEffect(() => {
    if (initialData) {
      form.reset({
        floor_name: initialData.floor_name || "",
        status: initialData.status === "active",
      });
    }
  }, [initialData]);

  const handleSubmit = (values: FloorForm) => {
    onSave(values);
    // onClose();
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={mode === "add" ? "Add Floor" : "Edit Floor"}
      maxWidth="md:max-w-lg"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 text-sm">

          <FormField
            control={form.control}
            name="floor_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Floor Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500">
              {mode === "add" ? "Save" : "Update"}
            </Button>
          </div>

        </form>
      </Form>
    </AppDialog>
  );
}

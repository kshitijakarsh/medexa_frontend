// "use client";

// import { useEffect } from "react";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";
// import { useForm } from "@workspace/ui/hooks/use-form";
// import {
//   Form,
//   FormField,
//   FormLabel,
//   FormItem,
//   FormControl,
// } from "@workspace/ui/components/form";
// import { Input } from "@workspace/ui/components/input";
// import { Button } from "@workspace/ui/components/button";
// import { AppDialog } from "@/components/common/app-dialog";
// import AppDatePicker from "@/components/common/app-date-picker";
// import { AppSelect } from "@/components/common/app-select";

// const schema = z.object({
//   name: z.string().optional(),
//   status: z.string().optional(),
//   date: z.string().optional(),
// });

// export default function FilterDialog({
//   open,
//   onClose,
//   onApply,
//   isLoading,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onApply: (filters: any) => void;
//   isLoading?: boolean;
// }) {
//   const form = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       name: "",
//       status: "",
//       date: "",
//     },
//   });

//   useEffect(() => {
//     if (!open) form.reset();
//   }, [open]);

//   const handleApply = (vals: any) => {
//     onApply(vals);
//     onClose();
//   };

//   return (
//     <AppDialog open={open} onClose={onClose} title="Filter Departments" maxWidth="md:max-w-2xl">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(handleApply)}
//           className="space-y-5 py-3"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Search by Department Name */}
//             <FormField
//               name="name"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Search</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Search department name..." {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />

//             {/* Status Filter */}
//             <FormField
//               name="status"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Status</FormLabel>
//                   <FormControl>
//                     <AppSelect
//                       placeholder="Select Status"
//                       value={field.value}
//                       onChange={field.onChange}
//                       options={[
//                         { label: "Active", value: "Active" },
//                         { label: "Inactive", value: "Inactive" },
//                       ]}
//                       error={form.formState.errors.status}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />

//             {/* Created Date */}
//             <FormField
//               name="date"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Created Date</FormLabel>
//                   <FormControl>
//                     <AppDatePicker
//                       value={field.value ? new Date(field.value) : null}
//                       onChange={(d) =>
//                         field.onChange(
//                           d ? d.toISOString().slice(0, 10) : ""
//                         )
//                       }
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Footer Buttons */}
//           <div className="flex justify-end gap-3 pt-4 border-t">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => {
//                 form.reset();
//                 onClose();
//               }}
//               className="text-blue-600 border-blue-500"
//             >
//               Cancel
//             </Button>

//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="bg-green-500 hover:bg-green-600 text-white"
//             >
//               {isLoading ? "Applying..." : "Apply Filters"}
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
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { AppDialog } from "@/components/common/app-dialog";
import AppDatePicker from "@/components/common/app-date-picker";
import { AppSelect } from "@/components/common/app-select";

const schema = z.object({
  name: z.string().optional(),
  status: z.string().optional(),
  date: z.string().optional(),
});

export default function FilterDialog({
  open,
  onClose,
  onApply,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  isLoading?: boolean;
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      status: "",
      date: "",
    },
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [open]);

  const handleApply = (vals: any) => {
    onApply(vals);
    onClose();
  };

  return (
    <AppDialog open={open} onClose={onClose} title="Filter Departments" maxWidth="md:max-w-1xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleApply)}
          className="space-y-5 py-3"
        >
          {/* SINGLE COLUMN INPUTS */}
          <div className="grid grid-cols-1 gap-4">

            {/* Search */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search</FormLabel>
                  <FormControl>
                    <Input placeholder="Search department name..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              name="status"
              control={form.control}
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
                      error={form.formState.errors.status}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Created Date */}
            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Created Date</FormLabel>
                  <FormControl>
                    <AppDatePicker
                      value={field.value ? new Date(field.value) : null}
                      onChange={(d) =>
                        field.onChange(d ? d.toISOString().slice(0, 10) : "")
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t">
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

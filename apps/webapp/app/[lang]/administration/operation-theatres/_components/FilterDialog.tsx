// "use client";

// import { useForm } from "@workspace/ui/hooks/use-form";
// import { Button } from "@workspace/ui/components/button";
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";
// import { AppDialog } from "@/components/common/app-dialog";

// const filterSchema = z.object({
//   floor: z.string().optional(),
//   ward: z.string().optional(),
//   bedType: z.string().optional(),
// });

// type FilterForm = z.infer<typeof filterSchema>;

// export function FilterDialog({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) {
//   const form = useForm<FilterForm>({
//     resolver: zodResolver(filterSchema),
//     defaultValues: {
//       floor: "",
//       ward: "",
//       bedType: "",
//     },
//   });

//   const handleApply = (values: FilterForm) => {
//     console.log("Filters:", values);
//     onClose();
//   };

//   return (
//     <AppDialog open={open} onClose={onClose} title="Filter"  maxWidth="md:max-w-1xl lg:max-w-1xl">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(handleApply)}
//           className="space-y-4 text-sm"
//         >
//           <FormField
//             control={form.control}
//             name="floor"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Floor</FormLabel>
//                 <FormControl>
//                   <select
//                     {...field}
//                     className="w-full border rounded-md px-3 py-2 text-sm focus:ring-0"
//                   >
//                     <option value="">Select Floor</option>
//                     <option value="1">1st Floor</option>
//                     <option value="2">2nd Floor</option>
//                   </select>
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="ward"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Ward</FormLabel>
//                 <FormControl>
//                   <select
//                     {...field}
//                     className="w-full border rounded-md px-3 py-2 text-sm focus:ring-0"
//                   >
//                     <option value="">Select Ward</option>
//                     <option value="A">Ward A</option>
//                     <option value="B">Ward B</option>
//                   </select>
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="bedType"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Bed Type</FormLabel>
//                 <FormControl>
//                   <select
//                     {...field}
//                     className="w-full border rounded-md px-3 py-2 text-sm focus:ring-0"
//                   >
//                     <option value="">Select Bed Type</option>
//                     <option value="General">General</option>
//                     <option value="ICU">ICU</option>
//                   </select>
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <div className="flex justify-end gap-3 pt-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               className="text-blue-600 border-blue-500"
//             >
//               Cancel
//             </Button>
//             <Button type="submit" className="bg-green-500 hover:bg-green-600">
//               Apply Filter
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </AppDialog>
//   );
// }



"use client";

import { useForm } from "@workspace/ui/hooks/use-form";
import { Button } from "@workspace/ui/components/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { AppDialog } from "@/components/common/app-dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@workspace/ui/components/select";
import { CancelButton } from "@/components/common/cancel-button";
import { ActionButton } from "@/components/common/action-button";

const filterSchema = z.object({
  floor: z.string().optional(),
  addedBy: z.string().optional(),
});

type FilterForm = z.infer<typeof filterSchema>;

export function FilterDialog({
  open,
  onClose,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
}) {
  const form = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      floor: "",
      addedBy: "",
    },
  });

  const handleApply = (values: FilterForm) => {
    console.log("Applied filters:", values);
    onClose();
  };

  return (
    <AppDialog open={open} onClose={onClose} title="Filter Operation Theatres" maxWidth="md:max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleApply)} className="space-y-4 text-sm">
          {/* Floor Filter */}
          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Floor</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Floor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st Floor">1st Floor</SelectItem>
                      <SelectItem value="2nd Floor">2nd Floor</SelectItem>
                      <SelectItem value="3rd Floor">3rd Floor</SelectItem>
                      <SelectItem value="4th Floor">4th Floor</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select User" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Ahmed Al-Mansouri">Dr. Ahmed Al-Mansouri</SelectItem>
                      <SelectItem value="Dr. Fatima Al-Zahra">Dr. Fatima Al-Zahra</SelectItem>
                      <SelectItem value="Dr. Omar Al-Hassan">Dr. Omar Al-Hassan</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            {/* <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-blue-600 border-blue-500"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Apply Filter
            </Button> */}
            <CancelButton onClick={onClose} />
            <ActionButton loading={isLoading} label="Apply Filter" />
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}


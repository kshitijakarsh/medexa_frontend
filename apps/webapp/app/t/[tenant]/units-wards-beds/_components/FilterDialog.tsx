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
    SelectValue,
    SelectContent,
    SelectItem,
} from "@workspace/ui/components/select";
import { CancelButton } from "@/components/common/cancel-button";
import { ActionButton } from "@/components/common/action-button";

const filterSchema = z.object({
    floor: z.string().optional(),
    ward: z.string().optional(),
    bedType: z.string().optional(),
    status: z.string().optional(),
});

type FilterForm = z.infer<typeof filterSchema>;

interface FilterDialogProps {
    open: boolean;
    onClose: () => void;
    mode: "bed" | "bedType" | "ward" | "floor";
    onApply: (values: FilterForm) => void;
    isLoading: boolean;
}

export function FilterDialog({ open, onClose, mode, onApply, isLoading }: FilterDialogProps) {
    const form = useForm<FilterForm>({
        resolver: zodResolver(filterSchema),
        defaultValues: { floor: "", ward: "", bedType: "", status: "" },
    });

    const handleApply = (values: FilterForm) => {
        console.log("Filters applied:", values);
        onApply(values);
        onClose();
    };

    // --- Conditional Field Rendering ---
    const showFloor = ["bed", "ward"].includes(mode);
    const showWard = mode === "bed";
    const showBedType = mode === "bed";
    const showStatus = mode === "bedType";

    return (
        <AppDialog open={open} onClose={onClose} title="Filter" maxWidth="md:max-w-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleApply)} className="space-y-4 text-sm">
                    {showFloor && (
                        <FormField
                            control={form.control}
                            name="floor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Floor</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Floor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Ground Floor">Ground Floor</SelectItem>
                                                <SelectItem value="1st Floor">1st Floor</SelectItem>
                                                <SelectItem value="2nd Floor">2nd Floor</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )}

                    {showWard && (
                        <FormField
                            control={form.control}
                            name="ward"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ward</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Ward" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="General Ward">General Ward</SelectItem>
                                                <SelectItem value="VIP Ward">VIP Ward</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )}

                    {showBedType && (
                        <FormField
                            control={form.control}
                            name="bedType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bed Type</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Bed Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="General">General</SelectItem>
                                                <SelectItem value="ICU">ICU</SelectItem>
                                                <SelectItem value="VIP">VIP</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )}

                    {showStatus && (
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )}

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

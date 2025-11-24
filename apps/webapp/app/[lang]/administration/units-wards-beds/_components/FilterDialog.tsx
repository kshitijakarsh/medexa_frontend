
// "use client";

// import { useForm } from "@workspace/ui/hooks/use-form";
// import { Button } from "@workspace/ui/components/button";
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";
// import { AppDialog } from "@/components/common/app-dialog";
// import {
//     Select,
//     SelectTrigger,
//     SelectValue,
//     SelectContent,
//     SelectItem,
// } from "@workspace/ui/components/select";
// import { CancelButton } from "@/components/common/cancel-button";
// import { ActionButton } from "@/components/common/action-button";

// const filterSchema = z.object({
//     floor: z.string().optional(),
//     ward: z.string().optional(),
//     bedType: z.string().optional(),
//     status: z.string().optional(),
// });

// type FilterForm = z.infer<typeof filterSchema>;

// interface FilterDialogProps {
//     open: boolean;
//     onClose: () => void;
//     mode: "bed" | "bedType" | "ward" | "floor";
//     onApply: (values: FilterForm) => void;
//     isLoading: boolean;
// }

// export function FilterDialog({ open, onClose, mode, onApply, isLoading }: FilterDialogProps) {
//     const form = useForm<FilterForm>({
//         resolver: zodResolver(filterSchema),
//         defaultValues: { floor: "", ward: "", bedType: "", status: "" },
//     });

//     const handleApply = (values: FilterForm) => {
//         console.log("Filters applied:", values);
//         onApply(values);
//         onClose();
//     };

//     // --- Conditional Field Rendering ---
//     const showFloor = ["bed", "ward"].includes(mode);
//     const showWard = mode === "bed";
//     const showBedType = mode === "bed";
//     const showStatus = mode === "bedType";

//     return (
//         <AppDialog open={open} onClose={onClose} title="Filter" maxWidth="md:max-w-md">
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(handleApply)} className="space-y-4 text-sm">
//                     {showFloor && (
//                         <FormField
//                             control={form.control}
//                             name="floor"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Floor</FormLabel>
//                                     <FormControl>
//                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select Floor" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="Ground Floor">Ground Floor</SelectItem>
//                                                 <SelectItem value="1st Floor">1st Floor</SelectItem>
//                                                 <SelectItem value="2nd Floor">2nd Floor</SelectItem>
//                                             </SelectContent>
//                                         </Select>
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                     )}

//                     {showWard && (
//                         <FormField
//                             control={form.control}
//                             name="ward"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Ward</FormLabel>
//                                     <FormControl>
//                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select Ward" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="General Ward">General Ward</SelectItem>
//                                                 <SelectItem value="VIP Ward">VIP Ward</SelectItem>
//                                             </SelectContent>
//                                         </Select>
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                     )}

//                     {showBedType && (
//                         <FormField
//                             control={form.control}
//                             name="bedType"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Bed Type</FormLabel>
//                                     <FormControl>
//                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select Bed Type" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="General">General</SelectItem>
//                                                 <SelectItem value="ICU">ICU</SelectItem>
//                                                 <SelectItem value="VIP">VIP</SelectItem>
//                                             </SelectContent>
//                                         </Select>
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                     )}

//                     {showStatus && (
//                         <FormField
//                             control={form.control}
//                             name="status"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Status</FormLabel>
//                                     <FormControl>
//                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select Status" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="Active">Active</SelectItem>
//                                                 <SelectItem value="Inactive">Inactive</SelectItem>
//                                             </SelectContent>
//                                         </Select>
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                     )}

//                     {/* Footer Buttons */}
//                     <div className="flex justify-end gap-3 pt-4">
//                         {/* <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               className="text-blue-600 border-blue-500"
//             >
//               Cancel
//             </Button>
//             <Button type="submit" className="bg-green-500 hover:bg-green-600">
//               Apply Filter
//             </Button> */}
//                         <CancelButton onClick={onClose} />
//                         <ActionButton loading={isLoading} label="Apply Filter" />
//                     </div>
//                 </form>
//             </Form>
//         </AppDialog>
//     );
// }



"use client";

import { useForm } from "@workspace/ui/hooks/use-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { AppDialog } from "@/components/common/app-dialog";
import { CancelButton } from "@/components/common/cancel-button";
import { ActionButton } from "@/components/common/action-button";
import { AppSelect } from "@/components/common/app-select";
import { FunctionSquare, ListFilter } from "lucide-react";
import { useEffect } from "react";

const schema = z.object({
    floor_id: z.string().optional(),
    ward_type_id: z.string().optional(),
    status: z.string().optional(),
});


type FilterForm = z.infer<typeof schema>;


const defaultValues ={
  floor_id: "",
  ward_type_id: "",
  status: "",
}

export function FilterDialog({
    open,
    onClose,
    mode,
    onApply,
    isLoading,
    floors = [],
    wardTypes = [],
    filters = ''
}: {
    open: boolean;
    onClose: () => void;
    mode: "ward" | "bedType" | "wardType" | "floor";
    onApply: (values: FilterForm) => void;
    isLoading: boolean;
    floors?: any[];
    wardTypes?: any[];
    filters?: any;
}) {
    const form = useForm<FilterForm>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });

    const showFloor = mode === "ward";
    const showWardType = mode === "ward";
    const showStatus = ["floor", "bedType", "wardType", "ward"].includes(mode);

    const handleApply = (values: FilterForm) => {
        onApply(values);
        onClose();
    };
    const appliedCount = Object.values(form.getValues()).filter(Boolean).length;
    useEffect(() => {
        if (!filters) {
            form.reset();
        }
    }, [filters])

    return (
        <AppDialog open={open} onClose={onClose}
            icon={<ListFilter />}
            title="Filter"
            // headerRight={
            //     appliedCount > 0 && (
            //         <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            //             {appliedCount}
            //         </span>
            //     )
            // }
            appliedCount={appliedCount}
            maxWidth="md:max-w-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleApply)} className="space-y-4">

                    {/* FLOOR FILTER */}
                    {showFloor && (
                        <FormField
                            control={form.control}
                            name="floor_id"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Floor</FormLabel>
                                    <FormControl>
                                        <AppSelect
                                            placeholder="Select Floor"
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={fieldState.error}
                                            options={floors.map((f) => ({
                                                label: f.floor_name,
                                                value: f.id,
                                            }))}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )}

                    {/* WARD TYPE FILTER */}
                    {showWardType && (
                        <FormField
                            control={form.control}
                            name="ward_type_id"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Ward Type</FormLabel>
                                    <FormControl>
                                        <AppSelect
                                            placeholder="Select Ward Type"
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={fieldState.error}
                                            options={wardTypes.map((w) => ({
                                                label: w.name,
                                                value: w.id,
                                            }))}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )}

                    {/* STATUS FILTER */}
                    {showStatus && (
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
                                                { label: "Active", value: "active" },
                                                { label: "Inactive", value: "inactive" },
                                            ]}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <CancelButton onClick={onClose} />
                        <ActionButton loading={isLoading} label="Apply Filter" />
                    </div>
                </form>
            </Form>
        </AppDialog>
    );
}

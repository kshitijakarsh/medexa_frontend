// // "use client";

// // import { useForm } from "@workspace/ui/hooks/use-form";
// // import { Input } from "@workspace/ui/components/input";
// // import { Button } from "@workspace/ui/components/button";
// // import {
// //   Form,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormControl,
// // } from "@workspace/ui/components/form";

// // import { z } from "@workspace/ui/lib/zod";
// // import { zodResolver } from "@workspace/ui/lib/zod";
// // import { StatusSwitch } from "@/components/common/switch-green";
// // import { AppDialog } from "@/components/common/app-dialog";

// // const schema = z.object({
// //   ward_number: z.string().min(1, "Ward Number required"),
// //   ward_type_id: z.string().min(1, "Select Ward Type"),
// //   floor_id: z.string().min(1, "Select Floor"),
// //   active: z.boolean().catch(false),
// // });

// // export type AddWardForm = z.infer<typeof schema>;

// // export function AddWardDialog({
// //   open,
// //   onClose,
// //   onSave,
// //   wardTypes,
// //   floors,
// // }: {
// //   open: boolean;
// //   onClose: () => void;
// //   onSave: (values: AddWardForm) => void;
// //   wardTypes: any[];
// //   floors: any[];
// // }) {
// //   const form = useForm<AddWardForm>({
// //     resolver: zodResolver(schema),
// //     defaultValues: {
// //       ward_number: "",
// //       ward_type_id: "",
// //       floor_id: "",
// //       active: true,
// //     },
// //   });

// //   return (
// //     <AppDialog open={open} onClose={onClose} title="Add Ward" maxWidth="md:max-w-lg">
// //       <Form {...form}>
// //         <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">

// //           <FormField
// //             control={form.control}
// //             name="ward_number"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Ward Number</FormLabel>
// //                 <FormControl>
// //                   <Input placeholder="Enter ward number" {...field} />
// //                 </FormControl>
// //               </FormItem>
// //             )}
// //           />

// //           <FormField
// //             control={form.control}
// //             name="ward_type_id"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Ward Type</FormLabel>
// //                 <FormControl>
// //                   <select {...field} className="w-full border rounded-md px-3 py-2">
// //                     <option value="">Select Ward Type</option>
// //                     {wardTypes.map((w) => (
// //                       <option key={w.id} value={w.id}>
// //                         {w.name}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </FormControl>
// //               </FormItem>
// //             )}
// //           />

// //           <FormField
// //             control={form.control}
// //             name="floor_id"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Floor</FormLabel>
// //                 <FormControl>
// //                   <select {...field} className="w-full border rounded-md px-3 py-2">
// //                     <option value="">Select Floor</option>
// //                     {floors.map((f) => (
// //                       <option key={f.id} value={f.id}>
// //                         {f.floor_name}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </FormControl>
// //               </FormItem>
// //             )}
// //           />

// //           {/* STATUS */}
// //           <FormField
// //             control={form.control}
// //             name="active"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Status</FormLabel>
// //                 <div
// //                   className={`flex items-center gap-3 rounded-md px-3 py-2 ${
// //                     field.value ? "bg-green-50" : "bg-gray-50"
// //                   }`}
// //                 >
// //                   <span className="text-sm text-red-500">Inactive</span>
// //                   <FormControl>
// //                     <StatusSwitch
// //                       checked={field.value}
// //                       onCheckedChange={field.onChange}
// //                     />
// //                   </FormControl>
// //                   <span className="text-sm text-green-600">Active</span>
// //                 </div>
// //               </FormItem>
// //             )}
// //           />

// //           <div className="flex justify-end gap-3 pt-4">
// //             <Button variant="outline" onClick={onClose}>
// //               Cancel
// //             </Button>
// //             <Button type="submit" className="bg-green-600 hover:bg-green-700">
// //               Save
// //             </Button>
// //           </div>
// //         </form>
// //       </Form>
// //     </AppDialog>
// //   );
// // }


// "use client";

// import { useForm } from "@workspace/ui/hooks/use-form";
// import { Input } from "@workspace/ui/components/input";
// import { Button } from "@workspace/ui/components/button";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
// } from "@workspace/ui/components/form";

// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";
// import { StatusSwitch } from "@/components/common/switch-green";
// import { AppDialog } from "@/components/common/app-dialog";
// import { AppSelect } from "@/components/common/app-select";

// const schema = z.object({
//   ward_number: z.string().min(1, "Ward Number required"),
//   ward_type_id: z.string().min(1, "Select Ward Type"),
//   floor_id: z.string().min(1, "Select Floor"),
//   active: z.boolean().catch(false),
// });

// export type AddWardForm = z.infer<typeof schema>;

// export function AddWardDialog({
//   open,
//   onClose,
//   onSave,
//   wardTypes,
//   floors,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onSave: (values: AddWardForm) => void;
//   wardTypes: any[];
//   floors: any[];
// }) {
//   const form = useForm<AddWardForm>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       ward_number: "",
//       ward_type_id: "",
//       floor_id: "",
//       active: true,
//     },
//   });

//   return (
//     <AppDialog open={open} onClose={onClose} title="Add Ward" maxWidth="md:max-w-lg">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">

//           {/* Ward Number */}
//           <FormField
//             control={form.control}
//             name="ward_number"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Ward Number</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter ward number" {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           {/* Ward Type (AppSelect) */}
//           <FormField
//             control={form.control}
//             name="ward_type_id"
//             render={({ field, fieldState }) => (
//               <FormItem>
//                 <FormLabel>Ward Type</FormLabel>
//                 <FormControl>
//                   <AppSelect
//                     placeholder="Select Ward Type"
//                     value={field.value}
//                     onChange={field.onChange}
//                     error={fieldState.error}
//                     options={wardTypes.map((w) => ({
//                       label: w.name,
//                       value: w.id,
//                     }))}
//                   />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           {/* Floor (AppSelect) */}
//           <FormField
//             control={form.control}
//             name="floor_id"
//             render={({ field, fieldState }) => (
//               <FormItem>
//                 <FormLabel>Floor</FormLabel>
//                 <FormControl>
//                   <AppSelect
//                     placeholder="Select Floor"
//                     value={field.value}
//                     onChange={field.onChange}
//                     error={fieldState.error}
//                     options={floors.map((f) => ({
//                       label: f.floor_name,
//                       value: f.id,
//                     }))}
//                   />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           {/* STATUS */}
//           <FormField
//             control={form.control}
//             name="active"
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
//                     <StatusSwitch
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>

//                   <span className="text-sm text-green-600">Active</span>
//                 </div>
//               </FormItem>
//             )}
//           />

//           {/* Footer */}
//           <div className="flex justify-end gap-3 pt-4">
//             <Button variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit" className="bg-green-600 hover:bg-green-700">
//               Save
//             </Button>
//           </div>

//         </form>
//       </Form>
//     </AppDialog>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useForm } from "@workspace/ui/hooks/use-form";
import { Input } from "@workspace/ui/components/input";
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
import { StatusSwitch } from "@/components/common/switch-green";
import { AppDialog } from "@/components/common/app-dialog";
import { AppSelect } from "@/components/common/app-select";

import { AsyncSelect } from "@/components/common/async-select/AsyncSelect";
import { usePagedOptions } from "@/components/common/async-select/usePagedOptions";


const schema = z.object({
    ward_number: z.string().min(1, "Ward Number required"),
    ward_type_id: z.string().min(1, "Select Ward Type"),
    floor_id: z.string().min(1, "Select Floor"),
    active: z.boolean().catch(false),
});

export type AddWardForm = z.infer<typeof schema>;

export function AddWardDialog({
    open,
    onClose,
    onSave,
    wardTypes,
    floors,
    initialData,       // 💥 NEW
    mode = "add",      // 💥 NEW
}: {
    open: boolean;
    onClose: () => void;
    onSave: (values: AddWardForm) => void;
    wardTypes: any[];
    floors: any[];
    initialData?: any;        // 💥 NEW
    mode?: "add" | "edit";    // 💥 NEW
}) {

    // const [searchWardType, setSearchWardType] = useState("");
    // const [searchFloor, setSearchFloor] = useState("");

    // const wardTypeQuery = usePagedOptions({
    //     queryKey: "paged-ward-types",
    //     search: searchWardType,
    //     fetchFn: fetchWardTypesPaged,
    // });

    // const floorsQuery = usePagedOptions({
    //     queryKey: "paged-floors",
    //     search: searchFloor,
    //     fetchFn: fetchFloorsPaged,
    // });

    const form = useForm<AddWardForm>({
        resolver: zodResolver(schema),
        defaultValues: {
            ward_number: "",
            ward_type_id: "",
            floor_id: "",
            active: true,
        },
    });

    // 💥 Load existing data when editing
    useEffect(() => {
        if (initialData) {
            form.reset({
                ward_number: initialData.ward_number || "",
                ward_type_id: initialData.ward_type_id || "",
                floor_id: initialData.floor_id || "",
                active: initialData.status === "active",
            });
        }
    }, [initialData, form]);


    const handleSubmit = (values: AddWardForm) => {
        onSave(values);
        // onClose();
    };


    return (
        <AppDialog
            open={open}
            onClose={onClose}
            title={mode === "add" ? "Add Ward" : "Edit Ward"}   // 💥 Dynamic title
            maxWidth="md:max-w-lg"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4"
                >
                    {/* Ward Number */}
                    <FormField
                        control={form.control}
                        name="ward_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ward Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter ward number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Ward Type */}
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
                    {/* <FormField
                        control={form.control}
                        name="ward_type_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ward Type</FormLabel>
                                <FormControl>
                                    <AsyncSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={wardTypeQuery.options}
                                        loading={wardTypeQuery.isFetching}
                                        hasNextPage={wardTypeQuery.hasNextPage}
                                        fetchNextPage={wardTypeQuery.fetchNextPage}
                                        onSearch={setSearchWardType}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    /> */}


                    {/* Floor */}
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
                    {/* <FormField
                        control={form.control}
                        name="floor_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Floor</FormLabel>
                                <FormControl>
                                    <AsyncSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={floorsQuery.options}
                                        loading={floorsQuery.isFetching}
                                        hasNextPage={floorsQuery.hasNextPage}
                                        fetchNextPage={floorsQuery.fetchNextPage}
                                        onSearch={setSearchFloor}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    /> */}


                    {/* STATUS */}
                    <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <div
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 ${field.value ? "bg-green-50" : "bg-gray-50"
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

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            {mode === "add" ? "Save" : "Update"} {/* 💥 Dynamic */}
                        </Button>
                    </div>
                </form>
            </Form>
        </AppDialog>
    );
}

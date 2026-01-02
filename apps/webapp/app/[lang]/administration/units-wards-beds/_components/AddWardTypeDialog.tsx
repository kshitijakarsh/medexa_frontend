// "use client";

// import { useForm } from "@workspace/ui/hooks/use-form";
// import { Input } from "@workspace/ui/components/input";
// import { Button } from "@workspace/ui/components/button";
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";
// import { StatusSwitch } from "@/components/common/switch-green";
// import { AppDialog } from "@/components/common/app-dialog";

// const schema = z.object({
//   name: z.string().min(1, "Ward name is required"),
//   active: z.boolean().catch(false),
// });

// export type AddWardTypeForm = z.infer<typeof schema>;

// export function AddWardTypeDialog({
//   open,
//   onClose,
//   onSave,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onSave: (values: AddWardTypeForm) => void;
// }) {
//   const form = useForm<AddWardTypeForm>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       name: "",
//       active: false,
//     },
//   });

//   return (
//     <AppDialog open={open} onClose={onClose} title="Add Ward" maxWidth="md:max-w-lg">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 text-sm">

//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Ward Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter Ward Name" {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="active"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Status</FormLabel>
//                 <div className={`flex items-center gap-3 px-3 py-2 rounded ${field.value ? "bg-green-50" : "bg-gray-50"}`}>
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
//             <Button type="submit" className="bg-green-500 text-white">
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
import { useDictionary } from "@/i18n/use-dictionary";

const schema = z.object({
    name: z.string().min(1, "Ward name is required"),
    active: z.boolean().catch(false),
});

export type AddWardTypeForm = z.infer<typeof schema>;

export function AddWardTypeDialog({
    open,
    onClose,
    onSave,
    initialData,
    mode = "add",
}: {
    open: boolean;
    onClose: () => void;
    onSave: (values: AddWardTypeForm) => void;
    initialData?: any;
    mode?: "add" | "edit";
}) {
    const form = useForm<AddWardTypeForm>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            active: false,
        },
    });

    const dict = useDictionary();

    // ⭐ Load edit data
    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name || "",
                active: initialData.status === "active",
            });
        }
    }, [initialData]);

    const handleSubmit = (values: AddWardTypeForm) => {
        onSave(values);
        // onClose();
    };

    return (
        <AppDialog
            open={open}
            onClose={onClose}
            title={mode === "add" ? dict.pages.unitsWardsBeds.dialog.wardType.addTitle : dict.pages.unitsWardsBeds.dialog.wardType.editTitle}
            maxWidth="md:max-w-lg"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 text-sm">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{dict.pages.unitsWardsBeds.dialog.fields.wardName}</FormLabel>
                                <FormControl>
                                    <Input placeholder={dict.pages.unitsWardsBeds.dialog.fields.wardName} {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{dict.common.status}</FormLabel>

                                <div
                                    className={`flex items-center gap-3 px-3 py-2 rounded ${field.value ? "bg-green-50" : "bg-gray-50"
                                        }`}
                                >
                                    <span className="text-sm text-red-500">{dict.common.inactive}</span>

                                    <FormControl>
                                        <StatusSwitch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>

                                    <span className="text-sm text-green-600">{dict.common.active}</span>
                                </div>
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            {dict.common.cancel}
                        </Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            {mode === "add" ? dict.common.save : dict.common.update}
                        </Button>
                    </div>

                </form>
            </Form>
        </AppDialog>
    );
}

// "use client";

// import { AppDialog } from "@/components/common/app-dialog";
// import {
//     Form,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormControl,
//     FormMessage,
// } from "@workspace/ui/components/form";

// import {
//     Select,
//     SelectTrigger,
//     SelectValue,
//     SelectContent,
//     SelectItem,
// } from "@workspace/ui/components/select";

// import { useForm } from "@workspace/ui/hooks/use-form";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";
// import { PrimaryButton } from "@/components/common/buttons/primary-button";
// import { CancelButton } from "@/components/common/buttons/cancel-button";

// const schema = z.object({
//     test: z.string().min(1),
//     urgency: z.string().min(1),
//     notes: z.string().optional(),
// });

// // Dummy Data
// const TESTS = [
//     { id: "cbc", label: "Complete Blood Count (CBC)" },
//     { id: "lipid", label: "Lipid Profile" },
//     { id: "hba1c", label: "HbA1c" },
// ];

// const URGENCY = [
//     { id: "routine", label: "Routine" },
//     { id: "urgent", label: "Urgent" },
//     { id: "stat", label: "Stat" },
// ];

// export default function OrderLabTestModal({ open, onClose, onSubmit }) {
//     const form = useForm({
//         resolver: zodResolver(schema),
//         defaultValues: { test: "", urgency: "", notes: "" },
//     });

//     const submit = (values) => {
//         onSubmit(values);
//         onClose();
//         form.reset();
//     };

//     return (
//         <AppDialog open={open} onClose={onClose} title="Order Laboratory Test" maxWidth="md:max-w-xl lg:max-w-xl">
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(submit)} className="space-y-6">

//                     {/* SELECT TEST */}
//                     <FormField
//                         name="test"
//                         control={form.control}
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Select Test</FormLabel>
//                                 <Select
//                                     onValueChange={field.onChange}
//                                     defaultValue={field.value}
//                                 >
//                                     <SelectTrigger className="w-100">
//                                         <SelectValue placeholder="Select Test" />
//                                     </SelectTrigger>

//                                     <SelectContent>
//                                         {TESTS.map((t) => (
//                                             <SelectItem key={t.id} value={t.id}>
//                                                 {t.label}
//                                             </SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     {/* SELECT URGENCY */}
//                     <FormField
//                         name="urgency"
//                         control={form.control}
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Urgency</FormLabel>
//                                 <Select
//                                     onValueChange={field.onChange}
//                                     defaultValue={field.value}
//                                 >
//                                     <SelectTrigger className="w-100">
//                                         <SelectValue placeholder="Select Urgency" />
//                                     </SelectTrigger>

//                                     <SelectContent>
//                                         {URGENCY.map((u) => (
//                                             <SelectItem key={u.id} value={u.id}>
//                                                 {u.label}
//                                             </SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     {/* Notes */}
//                     <FormField
//                         name="notes"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Clinical Notes (Optional)</FormLabel>
//                                 <FormControl>
//                                     <textarea className="w-full border rounded-md p-3" {...field} />
//                                 </FormControl>
//                             </FormItem>
//                         )}
//                     />

//                     {/* Footer */}
//                     <div className="flex justify-end gap-3 pt-4 border-t">
//                         <CancelButton onClick={onClose} />
//                         <PrimaryButton type="submit" label="Send to Laboratory" />
//                     </div>
//                 </form>
//             </Form>
//         </AppDialog>
//     );
// }



"use client";

import { AppDialog } from "@/components/common/app-dialog";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@workspace/ui/components/form";

import { AppSelect } from "@/components/common/app-select";

import { useForm } from "@workspace/ui/hooks/use-form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { PrimaryButton } from "@/components/common/buttons/primary-button";
import { CancelButton } from "@/components/common/buttons/cancel-button";
import { Send } from "lucide-react";

const schema = z.object({
    test: z.string().min(1, "Test is required"),
    urgency: z.string().min(1, "Urgency is required"),
    notes: z.string().optional(),
});

// Dummy Data
const TESTS = [
    { value: "cbc", label: "Complete Blood Count (CBC)" },
    { value: "lipid", label: "Lipid Profile" },
    { value: "hba1c", label: "HbA1c" },
];

const URGENCY = [
    { value: "routine", label: "Routine" },
    { value: "urgent", label: "Urgent" },
    { value: "stat", label: "Stat" },
];

export default function OrderLabTestModal({ open, onClose, onSubmit }) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { test: "", urgency: "", notes: "" },
    });

    const submit = (values) => {
        onSubmit(values);
        onClose();
        form.reset();
    };

    return (
        <AppDialog open={open} onClose={onClose} title="Order Laboratory Test"  maxWidth="md:max-w-xl lg:max-w-xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="space-y-6">

                    {/* TEST SELECT */}
                    <FormField
                        name="test"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Test</FormLabel>
                                <FormControl>
                                    <AppSelect
                                        placeholder="Select Test"
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={TESTS}
                                        error={form.formState.errors.test}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* URGENCY SELECT */}
                    <FormField
                        name="urgency"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Urgency</FormLabel>
                                <FormControl>
                                    <AppSelect
                                        placeholder="Select Urgency"
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={URGENCY}
                                        error={form.formState.errors.urgency}

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* NOTES */}
                    <FormField
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Clinical Notes (Optional)</FormLabel>
                                <FormControl>
                                    <textarea className="w-full border rounded-md p-3" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <CancelButton onClick={onClose} />
                        <PrimaryButton type="submit" label="Send to Laboratory" icon={<Send />}/>
                    </div>
                </form>
            </Form>
        </AppDialog>
    );
}

// "use client";

// import { useForm } from "@workspace/ui/hooks/use-form";
// import { Input } from "@workspace/ui/components/input";
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";

// const schema = z.object({
//   phone: z.string().min(1, "Required"),
//   email: z.string().email("Invalid email"),
//   office_email: z.string().optional(),
//   emergency_contact: z.string().optional(),
//   local_address: z.string().optional(),
//   permanent_address: z.string().optional(),
//   language: z.string().min(1, "Required"),
// });

// type FormValues = z.infer<typeof schema>;

// export function ContactAddress() {
//   const form = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       phone: "",
//       email: "",
//       office_email: "",
//       emergency_contact: "",
//       local_address: "",
//       permanent_address: "",
//       language: "",
//     },
//   });

//   return (
//     <Form {...form}>
//       <form className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//         <FormField control={form.control} name="phone" render={({ field }) => (
//           <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//         )} />
//         <FormField control={form.control} name="email" render={({ field }) => (
//           <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//         )} />
//         <FormField control={form.control} name="office_email" render={({ field }) => (
//           <FormItem><FormLabel>Office Email</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//         )} />
//         <FormField control={form.control} name="emergency_contact" render={({ field }) => (
//           <FormItem><FormLabel>Emergency Contact Number</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//         )} />
//         <FormField control={form.control} name="local_address" render={({ field }) => (
//           <FormItem><FormLabel>Local Address</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//         )} />
//         <FormField control={form.control} name="permanent_address" render={({ field }) => (
//           <FormItem><FormLabel>Permanent Address</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//         )} />
//         <FormField control={form.control} name="language" render={({ field }) => (
//           <FormItem>
//             <FormLabel>Language</FormLabel>
//             <FormControl>
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <SelectTrigger><SelectValue placeholder="Select Language" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="english">English</SelectItem>
//                   <SelectItem value="arabic">Arabic</SelectItem>
//                 </SelectContent>
//               </Select>
//             </FormControl>
//           </FormItem>
//         )} />
//       </form>
//     </Form>
//   );
// }



"use client";

import { AppSelect } from "@/components/common/app-select";
import { FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectItem,
} from "@workspace/ui/components/select";

export function ContactAddress({ form }: { form: any }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input placeholder="Enter phone number" {...field} /></FormControl>
                </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="Enter email" {...field} /></FormControl>
                </FormItem>
            )} />

            <FormField control={form.control} name="office_email" render={({ field }) => (
                <FormItem>
                    <FormLabel>Office Email</FormLabel>
                    <FormControl><Input placeholder="Enter office email" {...field} /></FormControl>
                </FormItem>
            )} />

            <FormField control={form.control} name="emergency_contact" render={({ field }) => (
                <FormItem>
                    <FormLabel>Emergency Contact Number</FormLabel>
                    <FormControl><Input placeholder="Enter emergency contact" {...field} /></FormControl>
                </FormItem>
            )} />

            <FormField control={form.control} name="local_address" render={({ field }) => (
                <FormItem>
                    <FormLabel>Local Address</FormLabel>
                    <FormControl><Input placeholder="Enter local address" {...field} /></FormControl>
                </FormItem>
            )} />

            <FormField control={form.control} name="permanent_address" render={({ field }) => (
                <FormItem>
                    <FormLabel>Permanent Address</FormLabel>
                    <FormControl><Input placeholder="Enter permanent address" {...field} /></FormControl>
                </FormItem>
            )} />

            <FormField control={form.control} name="language" render={({ field }) => (
                <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                        {/* <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger><SelectValue placeholder="Select Language" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="arabic">Arabic</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
              </SelectContent>
            </Select> */}
                        <AppSelect
                            placeholder="Select Language"
                            value={field.value}
                            onChange={field.onChange}
                            options={[
                                { label: "english", value: "English" },
                                { label: "arabic", value: "Arabic" },
                                { label: "hindi", value: "Hindi" },
                            ]}
                            error={form.formState.errors.floor}
                        />
                    </FormControl>
                </FormItem>
            )} />
        </div>
    );
}

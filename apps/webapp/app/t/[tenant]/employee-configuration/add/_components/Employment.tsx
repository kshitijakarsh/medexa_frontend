// "use client";

// import { useForm } from "@workspace/ui/hooks/use-form";
// import { Input } from "@workspace/ui/components/input";
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";

// const schema = z.object({
//   qualification: z.string().min(1, "Required"),
//   years_experience: z.string().min(1, "Required"),
// });

// type FormValues = z.infer<typeof schema>;

// export function Employment() {
//   const form = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: { qualification: "", years_experience: "" },
//   });

//   return (
//     <Form {...form}>
//       <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//         <FormField control={form.control} name="qualification" render={({ field }) => (
//           <FormItem>
//             <FormLabel>Qualification</FormLabel>
//             <FormControl>
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <SelectTrigger><SelectValue placeholder="Select Qualification" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="mbbs">MBBS</SelectItem>
//                   <SelectItem value="bsc">B.Sc Nursing</SelectItem>
//                   <SelectItem value="msc">M.Sc</SelectItem>
//                 </SelectContent>
//               </Select>
//             </FormControl>
//           </FormItem>
//         )} />

//         <FormField control={form.control} name="years_experience" render={({ field }) => (
//           <FormItem>
//             <FormLabel>Years of Experience</FormLabel>
//             <FormControl><Input placeholder="Enter years" {...field} /></FormControl>
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

export function Employment({ form }: { form: any }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <FormField control={form.control} name="qualification" render={({ field }) => (
                <FormItem>
                    <FormLabel>Qualification</FormLabel>
                    <FormControl>
                        {/* <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger><SelectValue placeholder="Select Qualification" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mbbs">MBBS</SelectItem>
                <SelectItem value="bsc">B.Sc Nursing</SelectItem>
                <SelectItem value="msc">M.Sc</SelectItem>
              </SelectContent>
            </Select> */}
                        <AppSelect
                            placeholder="Select Qualification"
                            value={field.value}
                            onChange={field.onChange}
                            options={[
                                { label: "mbbs", value: "MBBS" },
                                { label: "bsc", value: "B.Sc Nursing" },
                                { label: "msc", value: "M.Sc" },
                            ]}
                            error={form.formState.errors.floor}
                        />
                    </FormControl>
                </FormItem>
            )} />

            <FormField control={form.control} name="years_experience" render={({ field }) => (
                <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl><Input placeholder="Enter years" {...field} /></FormControl>
                </FormItem>
            )} />
        </div>
    );
}

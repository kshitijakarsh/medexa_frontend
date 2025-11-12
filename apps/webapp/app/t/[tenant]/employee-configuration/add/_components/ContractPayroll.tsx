// "use client";

// import { useForm } from "@workspace/ui/hooks/use-form";
// import { Input } from "@workspace/ui/components/input";
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";

// const schema = z.object({
//   joining_date: z.string().optional(),
//   contract_type: z.string().optional(),
//   contract_start_date: z.string().optional(),
//   contract_expiration_date: z.string().optional(),
//   contract_renewal_date: z.string().optional(),
//   last_working_day: z.string().optional(),
//   notice_period: z.string().optional(),
//   bank_name: z.string().optional(),
//   iban: z.string().optional(),
//   account_name: z.string().optional(),
//   account_number: z.string().optional(),
//   swift_code: z.string().optional(),
//   date_from: z.string().optional(),
//   date_to: z.string().optional(),
//   basic_salary: z.string().optional(),
//   goal_deduction: z.string().optional(),
//   goal: z.string().optional(),
//   housing_allowance: z.string().optional(),
// });

// type FormValues = z.infer<typeof schema>;

// export function ContractPayroll() {
//   const form = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: {},
//   });

//   return (
//     <Form {...form}>
//       <form className="space-y-6 text-sm">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <FormField control={form.control} name="joining_date" render={({ field }) => (
//             <FormItem><FormLabel>Joining Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
//           )} />
//           <FormField control={form.control} name="contract_type" render={({ field }) => (
//             <FormItem>
//               <FormLabel>Contract Type</FormLabel>
//               <FormControl>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="permanent">Permanent</SelectItem>
//                     <SelectItem value="temporary">Temporary</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//             </FormItem>
//           )} />
//           <FormField control={form.control} name="contract_start_date" render={({ field }) => (
//             <FormItem><FormLabel>Contract Start Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
//           )} />
//           <FormField control={form.control} name="contract_expiration_date" render={({ field }) => (
//             <FormItem><FormLabel>Contract Expiration Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
//           )} />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <FormField control={form.control} name="contract_renewal_date" render={({ field }) => (
//             <FormItem><FormLabel>Contract Renewal Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
//           )} />
//           <FormField control={form.control} name="last_working_day" render={({ field }) => (
//             <FormItem><FormLabel>Last Working Day</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
//           )} />
//           <FormField control={form.control} name="notice_period" render={({ field }) => (
//             <FormItem><FormLabel>Notice Period (Days)</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//           )} />
//         </div>

//         <p className="font-semibold text-gray-700 pt-4">Payroll & Bank Details</p>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <FormField control={form.control} name="bank_name" render={({ field }) => (
//             <FormItem><FormLabel>Bank Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//           )} />
//           <FormField control={form.control} name="iban" render={({ field }) => (
//             <FormItem><FormLabel>IBAN</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//           )} />
//           <FormField control={form.control} name="account_name" render={({ field }) => (
//             <FormItem><FormLabel>Account Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//           )} />
//           <FormField control={form.control} name="account_number" render={({ field }) => (
//             <FormItem><FormLabel>Account Number</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//           )} />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <FormField control={form.control} name="swift_code" render={({ field }) => (
//             <FormItem><FormLabel>Swift Code</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//           )} />
//           <FormField control={form.control} name="date_from" render={({ field }) => (
//             <FormItem><FormLabel>Date From</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
//           )} />
//           <FormField control={form.control} name="date_to" render={({ field }) => (
//             <FormItem><FormLabel>Date To</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
//           )} />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <FormField control={form.control} name="basic_salary" render={({ field }) => (
//             <FormItem><FormLabel>Basic Salary</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
//           )} />
//           <FormField control={form.control} name="goal_deduction" render={({ field }) => (
//             <FormItem><FormLabel>Goal Deduction (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
//           )} />
//           <FormField control={form.control} name="goal" render={({ field }) => (
//             <FormItem><FormLabel>Goal</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
//           )} />
//           <FormField control={form.control} name="housing_allowance" render={({ field }) => (
//             <FormItem><FormLabel>Housing Allowance</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
//           )} />
//         </div>
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

export function ContractPayroll({ form }: { form: any }) {
    return (
        <div className="space-y-6 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField control={form.control} name="joining_date" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Joining Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="contract_type" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contract Type</FormLabel>
                        <FormControl>
                            {/* <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                  <SelectItem value="parttime">Part Time</SelectItem>
                </SelectContent>
              </Select> */}
                            <AppSelect
                                placeholder="Select Type"
                                value={field.value}
                                onChange={field.onChange}
                                options={[
                                    { label: "permanent", value: "Permanent" },
                                    { label: "temporary", value: "Temporary" },
                                    { label: "parttime", value: "Part Time" },
                                ]}
                                error={form.formState.errors.floor}
                            />
                        </FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="contract_start_date" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contract Start Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="contract_expiration_date" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contract Expiration Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                    </FormItem>
                )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField control={form.control} name="contract_renewal_date" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contract Renewal Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="basic_salary" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Basic Salary</FormLabel>
                        <FormControl><Input type="number" placeholder="Enter amount" {...field} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="goal" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Goal Deduction (%)</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="housing_allowance" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Housing Allowance</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                    </FormItem>
                )} />
            </div>
        </div>
    );
}

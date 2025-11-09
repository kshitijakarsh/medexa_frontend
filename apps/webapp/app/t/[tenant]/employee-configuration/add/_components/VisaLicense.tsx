// "use client";

// import { useForm } from "@workspace/ui/hooks/use-form";
// import { Input } from "@workspace/ui/components/input";
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";

// const schema = z.object({
//   visa_start: z.string().optional(),
//   visa_expiration: z.string().optional(),
//   passport_number: z.string().optional(),
//   passport_expiration: z.string().optional(),
//   license_number: z.string().optional(),
//   license_expiration: z.string().optional(),
// });

// type FormValues = z.infer<typeof schema>;

// export function VisaLicense() {
//   const form = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       visa_start: "",
//       visa_expiration: "",
//       passport_number: "",
//       passport_expiration: "",
//       license_number: "",
//       license_expiration: "",
//     },
//   });

//   return (
//     <Form {...form}>
//       <form className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//         <FormField control={form.control} name="visa_start" render={({ field }) => (
//           <FormItem>
//             <FormLabel>Visa Start</FormLabel>
//             <FormControl><Input type="date" {...field} /></FormControl>
//           </FormItem>
//         )} />

//         <FormField control={form.control} name="visa_expiration" render={({ field }) => (
//           <FormItem>
//             <FormLabel>Visa Expiration</FormLabel>
//             <FormControl><Input type="date" {...field} /></FormControl>
//           </FormItem>
//         )} />

//         <FormField control={form.control} name="passport_number" render={({ field }) => (
//           <FormItem>
//             <FormLabel>Passport Number</FormLabel>
//             <FormControl><Input {...field} /></FormControl>
//           </FormItem>
//         )} />

//         <FormField control={form.control} name="passport_expiration" render={({ field }) => (
//           <FormItem>
//             <FormLabel>Passport Expiration</FormLabel>
//             <FormControl><Input type="date" {...field} /></FormControl>
//           </FormItem>
//         )} />

//         <FormField control={form.control} name="license_number" render={({ field }) => (
//           <FormItem>
//             <FormLabel>License Number</FormLabel>
//             <FormControl><Input {...field} /></FormControl>
//           </FormItem>
//         )} />

//         <FormField control={form.control} name="license_expiration" render={({ field }) => (
//           <FormItem>
//             <FormLabel>License Expiration</FormLabel>
//             <FormControl><Input type="date" {...field} /></FormControl>
//           </FormItem>
//         )} />
//       </form>
//     </Form>
//   );
// }


"use client";

import { FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";

export function VisaLicense({ form }: { form: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      <FormField control={form.control} name="visa_start" render={({ field }) => (
        <FormItem>
          <FormLabel>Visa Start</FormLabel>
          <FormControl><Input type="date" {...field} /></FormControl>
        </FormItem>
      )} />

      <FormField control={form.control} name="visa_expiration" render={({ field }) => (
        <FormItem>
          <FormLabel>Visa Expiration</FormLabel>
          <FormControl><Input type="date" {...field} /></FormControl>
        </FormItem>
      )} />

      <FormField control={form.control} name="passport_number" render={({ field }) => (
        <FormItem>
          <FormLabel>Passport Number</FormLabel>
          <FormControl><Input {...field} /></FormControl>
        </FormItem>
      )} />

      <FormField control={form.control} name="passport_expiration" render={({ field }) => (
        <FormItem>
          <FormLabel>Passport Expiration</FormLabel>
          <FormControl><Input type="date" {...field} /></FormControl>
        </FormItem>
      )} />

      <FormField control={form.control} name="license_number" render={({ field }) => (
        <FormItem>
          <FormLabel>License Number</FormLabel>
          <FormControl><Input {...field} /></FormControl>
        </FormItem>
      )} />

      <FormField control={form.control} name="license_expiration" render={({ field }) => (
        <FormItem>
          <FormLabel>License Expiration</FormLabel>
          <FormControl><Input type="date" {...field} /></FormControl>
        </FormItem>
      )} />
    </div>
  );
}

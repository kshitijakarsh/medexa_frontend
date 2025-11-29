// "use client";

// import { useForm } from "@workspace/ui/hooks/use-form";
// import { Input } from "@workspace/ui/components/input";
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";

// const schema = z.object({
//   username: z.string().min(1, "Required"),
//   password: z.string().min(1, "Required"),
// });

// type FormValues = z.infer<typeof schema>;

// export function SystemAccess() {
//   const form = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: { username: "", password: "" },
//   });

//   return (
//     <Form {...form}>
//       <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//         <FormField control={form.control} name="username" render={({ field }) => (
//           <FormItem>
//             <FormLabel>Username</FormLabel>
//             <FormControl><Input {...field} /></FormControl>
//           </FormItem>
//         )} />

//         <FormField control={form.control} name="password" render={({ field }) => (
//           <FormItem>
//             <FormLabel>Password</FormLabel>
//             <FormControl><Input type="password" {...field} /></FormControl>
//           </FormItem>
//         )} />
//       </form>
//     </Form>
//   );
// }


"use client";

import { FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { StatusSwitch } from "@/components/common/switch-green";

export function SystemAccess({ form }: { form: any }) {
  return (
    <div className="space-y-6 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.control} name="username" render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl><Input placeholder="Enter username" {...field} /></FormControl>
          </FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl><Input type="password" placeholder="Enter password" {...field} /></FormControl>
          </FormItem>
        )} />
      </div>

      <div className="max-w-[200px]">
        <FormField control={form.control} name="active" render={({ field }) => (
          <FormItem>
            <FormLabel>Account Status</FormLabel>
            <div
              className={`flex items-center gap-3 rounded-md px-3 py-2 ${
                field.value ? "bg-green-50" : "bg-gray-50"
              }`}
            >
              <span className="text-sm text-red-500">Inactive</span>
              <FormControl>
                <StatusSwitch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <span className="text-sm text-green-600">Active</span>
            </div>
          </FormItem>
        )} />
      </div>
    </div>
  );
}

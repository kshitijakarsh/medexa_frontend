// "use client";

// import { AppDialog } from "@/components/common/app-dialog";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
// } from "@workspace/ui/components/form";

// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@workspace/ui/components/select";

// import { useForm } from "@workspace/ui/hooks/use-form";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";
// import { CancelButton } from "@/components/common/buttons/cancel-button";
// import { PrimaryButton } from "@/components/common/buttons/primary-button";

// const schema = z.object({
//   procedure: z.string().min(1),
//   urgency: z.string().min(1),
//   notes: z.string().optional(),
// });

// // Dummy data
// const PROCEDURES = [
//   { id: "xray_stomach", label: "Stomach X-Ray" },
//   { id: "ct_brain", label: "CT Brain" },
//   { id: "mri_spine", label: "MRI Spine" },
// ];

// const URGENCY = [
//   { id: "routine", label: "Routine" },
//   { id: "urgent", label: "Urgent" },
//   { id: "stat", label: "Stat" },
// ];

// export default function OrderRadiologyModal({ open, onClose, onSubmit }) {
//   const form = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: { procedure: "", urgency: "", notes: "" },
//   });

//   const submit = (values) => {
//     onSubmit(values);
//     onClose();
//     form.reset();
//   };

//   return (
//     <AppDialog open={open} onClose={onClose} title="Order Radiology Procedure" maxWidth="md:max-w-xl lg:max-w-xl">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(submit)} className="space-y-6">

//           {/* PROCEDURE */}
//           <FormField
//             name="procedure"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Select Procedure</FormLabel>

//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <SelectTrigger className="w-100">
//                     <SelectValue placeholder="Select procedure" />
//                   </SelectTrigger>

//                   <SelectContent>
//                     {PROCEDURES.map((p) => (
//                       <SelectItem key={p.id} value={p.id}>
//                         {p.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormItem>
//             )}
//           />

//           {/* URGENCY */}
//           <FormField
//             name="urgency"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Urgency</FormLabel>

//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <SelectTrigger className="w-100">
//                     <SelectValue placeholder="Select urgency" />
//                   </SelectTrigger>

//                   <SelectContent>
//                     {URGENCY.map((u) => (
//                       <SelectItem key={u.id} value={u.id}>
//                         {u.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormItem>
//             )}
//           />

//           {/* NOTES */}
//           <FormField
//             name="notes"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Clinical Notes (Optional)</FormLabel>
//                 <FormControl>
//                   <textarea className="w-full border rounded-md p-3" {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           {/* FOOTER */}
//           <div className="flex justify-end gap-3 pt-4 border-t">
//             <CancelButton onClick={onClose} />
//             <PrimaryButton label="Send to Radiology" type="submit" />
//           </div>
//         </form>
//       </Form>
//     </AppDialog>
//   );
// }


"use client";

import { AppDialog } from "@/components/common/app-dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@workspace/ui/components/form";

import { AppSelect } from "@/components/common/app-select";

import { useForm } from "@workspace/ui/hooks/use-form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { CancelButton } from "@/components/common/buttons/cancel-button";
import { PrimaryButton } from "@/components/common/buttons/primary-button";

const schema = z.object({
  procedure: z.string().min(1, "Procedure is required"),
  urgency: z.string().min(1, "Urgency is required"),
  notes: z.string().optional(),
});

// Dummy data
const PROCEDURES = [
  { value: "xray_stomach", label: "Stomach X-Ray" },
  { value: "ct_brain", label: "CT Brain" },
  { value: "mri_spine", label: "MRI Spine" },
];

const URGENCY = [
  { value: "routine", label: "Routine" },
  { value: "urgent", label: "Urgent" },
  { value: "stat", label: "Stat" },
];

export default function OrderRadiologyModal({ open, onClose, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { procedure: "", urgency: "", notes: "" },
  });

  const submit = (values) => {
    onSubmit(values);
    onClose();
    form.reset();
  };

  return (
    <AppDialog open={open} onClose={onClose} title="Order Radiology Procedure"  maxWidth="md:max-w-xl lg:max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">

          {/* PROCEDURE SELECT */}
          <FormField
            name="procedure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Procedure</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder="Select procedure"
                    value={field.value}
                    onChange={field.onChange}
                    options={PROCEDURES}
                    error={form.formState.errors.procedure}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* URGENCY SELECT */}
          <FormField
            name="urgency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Urgency</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder="Select urgency"
                    value={field.value}
                    onChange={field.onChange}
                    options={URGENCY}
                    error={form.formState.errors.urgency}
                  />
                </FormControl>
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
            <PrimaryButton label="Send to Radiology" type="submit" />
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

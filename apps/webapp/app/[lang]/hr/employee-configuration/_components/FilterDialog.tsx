// "use client";

// import { useForm } from "@workspace/ui/hooks/use-form";
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
// import { AppDialog } from "@/components/common/app-dialog";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@workspace/ui/components/select";
// import { CancelButton } from "@/components/common/cancel-button";
// import { ActionButton } from "@/components/common/action-button";

// // ✅ Validation Schema
// const filterSchema = z.object({
//   department: z.string().optional(),
//   designation: z.string().optional(),
//   specialization: z.string().optional(),
//   role: z.string().optional(), // ✅ add this line
//   dateRange: z.string().optional(),
//   status: z.string().optional(),
//   billingStatus: z.string().optional(),
//   createdBy: z.string().optional(),
// });

// type FilterForm = z.infer<typeof filterSchema>;

// interface FilterDialogProps {
//   open: boolean;
//   onClose: () => void;
//   mode: "humanResources" | "designation" | "specialization" | "roles";
//   onApply: (values: FilterForm) => void;
//   isLoading: boolean;
// }

// export function FilterDialog({
//   open,
//   onClose,
//   mode,
//   onApply,
//   isLoading,
// }: FilterDialogProps) {
//   const form = useForm<FilterForm>({
//     resolver: zodResolver(filterSchema),
//     defaultValues: {
//       department: "",
//       designation: "",
//       specialization: "",
//       dateRange: "",
//       status: "",
//       billingStatus: "",
//       createdBy: "",
//     },
//   });

//   const handleApply = (values: FilterForm) => {
//     console.log("✅ Filters applied:", values);
//     onApply(values);
//     onClose();
//   };

//   // -------------------------------
//   // Dynamic UI based on mode
//   // -------------------------------
//   const isHR = mode === "humanResources";
//   const isDesignation = mode === "designation";
//   const isSpecialization = mode === "specialization";
//   const isRoles = mode === "roles";

//   return (
//     <AppDialog
//       open={open}
//       onClose={onClose}
//       title="Filter"
//       maxWidth="md:max-w-md"
//     >
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(handleApply)}
//           className="space-y-4 text-sm"
//         >
//           {/* HUMAN RESOURCES FILTER */}
//           {isHR && (
//             <>
//               {/* Department */}
//               <FormField
//                 control={form.control}
//                 name="department"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Department</FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Department" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Cardiology">Cardiology</SelectItem>
//                           <SelectItem value="Radiology">Radiology</SelectItem>
//                           <SelectItem value="Oncology">Oncology</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               {/* Designation */}
//               <FormField
//                 control={form.control}
//                 name="designation"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Designation</FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Designation" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Doctor">Doctor</SelectItem>
//                           <SelectItem value="Nurse">Nurse</SelectItem>
//                           <SelectItem value="Technician">Technician</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               {/* Specialization */}
//               <FormField
//                 control={form.control}
//                 name="specialization"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Specialization</FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Specialization" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Dentist">Dentist</SelectItem>
//                           <SelectItem value="Consultant">Consultant</SelectItem>
//                           <SelectItem value="Cardiologist">Cardiologist</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               {/* Date Range */}
//               <FormField
//                 control={form.control}
//                 name="dateRange"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Date Range</FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Date Range" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="today">Today</SelectItem>
//                           <SelectItem value="thisWeek">This Week</SelectItem>
//                           <SelectItem value="thisMonth">This Month</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               {/* Status */}
//               <FormField
//                 control={form.control}
//                 name="status"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Status</FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Active">Active</SelectItem>
//                           <SelectItem value="Inactive">Inactive</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </>
//           )}

//           {/* DESIGNATION / SPECIALIZATION / ROLES */}
//           {(isDesignation || isSpecialization || isRoles) && (
//             <>
//               {/* Name */}
//               <FormField
//                 control={form.control}
//                 name={isDesignation ? "designation" : isSpecialization ? "specialization" : "role"}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       {isDesignation
//                         ? "Designation Name"
//                         : isSpecialization
//                         ? "Specialization Name"
//                         : "User Role"}
//                     </FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <SelectTrigger>
//                           <SelectValue
//                             placeholder={`Select ${
//                               isDesignation
//                                 ? "Designation"
//                                 : isSpecialization
//                                 ? "Specialization"
//                                 : "Role"
//                             }`}
//                           />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Dentist">Dentist</SelectItem>
//                           <SelectItem value="Doctor">Doctor</SelectItem>
//                           <SelectItem value="Nurse">Nurse</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               {/* Billing Status */}
//               <FormField
//                 control={form.control}
//                 name="billingStatus"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Billing Status</FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Billing Status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Active">Active</SelectItem>
//                           <SelectItem value="Inactive">Inactive</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               {/* Created By */}
//               <FormField
//                 control={form.control}
//                 name="createdBy"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Created By</FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Creator" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Dr. Ahmed Al-Mansouri">
//                             Dr. Ahmed Al-Mansouri
//                           </SelectItem>
//                           <SelectItem value="Dr. Sara Malik">
//                             Dr. Sara Malik
//                           </SelectItem>
//                           <SelectItem value="Dr. Rajesh Kumar">
//                             Dr. Rajesh Kumar
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </>
//           )}

//           {/* Footer Buttons */}
//           <div className="flex justify-end gap-3 pt-4">
//             <CancelButton onClick={onClose} />
//             <ActionButton loading={isLoading} label="Apply Filter" />
//           </div>
//         </form>
//       </Form>
//     </AppDialog>
//   );
// }

"use client"

import { useForm } from "@workspace/ui/hooks/use-form"
import { Button } from "@workspace/ui/components/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@workspace/ui/components/form"
import { z } from "@workspace/ui/lib/zod"
import { zodResolver } from "@workspace/ui/lib/zod"
import { AppDialog } from "@/components/common/app-dialog"
import { CancelButton } from "@/components/common/cancel-button"
import { ActionButton } from "@/components/common/action-button"
import { AppSelect } from "@/components/common/app-select" // ✅ Import your reusable select

// ✅ Validation Schema
const filterSchema = z.object({
  department: z.string().optional(),
  designation: z.string().optional(),
  specialization: z.string().optional(),
  role: z.string().optional(),
  dateRange: z.string().optional(),
  status: z.string().optional(),
  billingStatus: z.string().optional(),
  createdBy: z.string().optional(),
})

type FilterForm = z.infer<typeof filterSchema>

interface FilterDialogProps {
  open: boolean
  onClose: () => void
  mode: "humanResources" | "designation" | "specialization" | "userRoles"
  onApply: (values: FilterForm) => void
  isLoading: boolean
}

export function FilterDialog({
  open,
  onClose,
  mode,
  onApply,
  isLoading,
}: FilterDialogProps) {
  const form = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      department: "",
      designation: "",
      specialization: "",
      dateRange: "",
      status: "",
      billingStatus: "",
      createdBy: "",
      role: "",
    },
  })

  const handleApply = (values: FilterForm) => {
    console.log("✅ Filters applied:", values)
    onApply(values)
    onClose()
  }

  const isHR = mode === "humanResources"
  const isDesignation = mode === "designation"
  const isSpecialization = mode === "specialization"
  const isRoles = mode === "userRoles"

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Filter"
      maxWidth="md:max-w-md"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleApply)}
          className="space-y-4 text-sm"
        >
          {/* 🧩 HUMAN RESOURCES FILTER */}
          {isHR && (
            <>
              {/* Department */}
              <FormField
                control={form.control}
                name="department"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <AppSelect
                        placeholder="Select Department"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error}
                        options={[
                          { label: "Cardiology", value: "Cardiology" },
                          { label: "Radiology", value: "Radiology" },
                          { label: "Oncology", value: "Oncology" },
                        ]}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Designation */}
              <FormField
                control={form.control}
                name="designation"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <AppSelect
                        placeholder="Select Designation"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error}
                        options={[
                          { label: "Doctor", value: "Doctor" },
                          { label: "Nurse", value: "Nurse" },
                          { label: "Technician", value: "Technician" },
                        ]}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Specialization */}
              <FormField
                control={form.control}
                name="specialization"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <FormControl>
                      <AppSelect
                        placeholder="Select Specialization"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error}
                        options={[
                          { label: "Dentist", value: "Dentist" },
                          { label: "Consultant", value: "Consultant" },
                          { label: "Cardiologist", value: "Cardiologist" },
                        ]}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Date Range */}
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Date Range</FormLabel>
                    <FormControl>
                      <AppSelect
                        placeholder="Select Date Range"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error}
                        options={[
                          { label: "Today", value: "today" },
                          { label: "This Week", value: "thisWeek" },
                          { label: "This Month", value: "thisMonth" },
                        ]}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Status */}
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
                          { label: "Active", value: "Active" },
                          { label: "Inactive", value: "Inactive" },
                        ]}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}

          {/* 🧩 DESIGNATION / SPECIALIZATION / ROLES */}
          {(isDesignation || isSpecialization || isRoles) && (
            <>
              {/* Name */}
              <FormField
                control={form.control}
                name={
                  isDesignation
                    ? "designation"
                    : isSpecialization
                      ? "specialization"
                      : "role"
                }
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      {isDesignation
                        ? "Designation Name"
                        : isSpecialization
                          ? "Specialization Name"
                          : "User Role"}
                    </FormLabel>
                    <FormControl>
                      <AppSelect
                        placeholder={`Select ${isDesignation
                          ? "Designation"
                          : isSpecialization
                            ? "Specialization"
                            : "Role"
                          }`}
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error}
                        options={[
                          { label: "Dentist", value: "Dentist" },
                          { label: "Doctor", value: "Doctor" },
                          { label: "Nurse", value: "Nurse" },
                        ]}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Billing Status */}
              <FormField
                control={form.control}
                name="billingStatus"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Billing Status</FormLabel>
                    <FormControl>
                      <AppSelect
                        placeholder="Select Billing Status"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error}
                        options={[
                          { label: "Active", value: "Active" },
                          { label: "Inactive", value: "Inactive" },
                        ]}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Created By */}
              <FormField
                control={form.control}
                name="createdBy"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Created By</FormLabel>
                    <FormControl>
                      <AppSelect
                        placeholder="Select Creator"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error}
                        options={[
                          {
                            label: "Dr. Ahmed Al-Mansouri",
                            value: "Dr. Ahmed Al-Mansouri",
                          },
                          { label: "Dr. Sara Malik", value: "Dr. Sara Malik" },
                          {
                            label: "Dr. Rajesh Kumar",
                            value: "Dr. Rajesh Kumar",
                          },
                        ]}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <CancelButton onClick={onClose} />
            <ActionButton loading={isLoading} label="Apply Filter" />
          </div>
        </form>
      </Form>
    </AppDialog>
  )
}

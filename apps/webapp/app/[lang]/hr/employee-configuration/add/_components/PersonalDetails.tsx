// "use client";

// import { useForm } from "@workspace/ui/hooks/use-form";
// import { Input } from "@workspace/ui/components/input";
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
// import { z } from "@workspace/ui/lib/zod";
// import { zodResolver } from "@workspace/ui/lib/zod";
// import { Button } from "@workspace/ui/components/button";

// const schema = z.object({
//   first_name: z.string().min(1, "First name is required"),
//   last_name: z.string().min(1, "Last name is required"),
//   department: z.string().min(1, "Department is required"),
//   designation: z.string().min(1, "Designation is required"),
//   specialization: z.string().min(1, "Specialization is required"),
//   role: z.string().min(1, "Role is required"),
//   gender: z.string().min(1, "Gender is required"),
//   dob: z.string().min(1, "Date of birth is required"),
//   marital_status: z.string().min(1, "Marital status is required"),
//   nationality: z.string().min(1, "Nationality is required"),
// });

// type FormValues = z.infer<typeof schema>;

// export function PersonalDetails() {
//   const form = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       first_name: "",
//       last_name: "",
//       department: "",
//       designation: "",
//       specialization: "",
//       role: "",
//       gender: "",
//       dob: "",
//       marital_status: "",
//       nationality: "",
//     },
//   });

//   const handleSave = (values: FormValues) => {
//     console.log("Personal Details:", values);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6 text-sm">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <FormField control={form.control} name="first_name" render={({ field }) => (
//             <FormItem>
//               <FormLabel>First Name</FormLabel>
//               <FormControl><Input placeholder="Enter first name" {...field} /></FormControl>
//             </FormItem>
//           )} />
//           <FormField control={form.control} name="last_name" render={({ field }) => (
//             <FormItem>
//               <FormLabel>Last Name</FormLabel>
//               <FormControl><Input placeholder="Enter last name" {...field} /></FormControl>
//             </FormItem>
//           )} />
//           <FormField control={form.control} name="department" render={({ field }) => (
//             <FormItem>
//               <FormLabel>Department</FormLabel>
//               <FormControl>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="cardiology">Cardiology</SelectItem>
//                     <SelectItem value="neurology">Neurology</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//             </FormItem>
//           )} />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <FormField control={form.control} name="designation" render={({ field }) => (
//             <FormItem>
//               <FormLabel>Designation</FormLabel>
//               <FormControl>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger><SelectValue placeholder="Select Designation" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="doctor">Doctor</SelectItem>
//                     <SelectItem value="nurse">Nurse</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//             </FormItem>
//           )} />

//           <FormField control={form.control} name="specialization" render={({ field }) => (
//             <FormItem>
//               <FormLabel>Specialization</FormLabel>
//               <FormControl>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger><SelectValue placeholder="Select Specialization" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="cardiology">Cardiology</SelectItem>
//                     <SelectItem value="radiology">Radiology</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//             </FormItem>
//           )} />

//           <FormField control={form.control} name="role" render={({ field }) => (
//             <FormItem>
//               <FormLabel>Role</FormLabel>
//               <FormControl>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="admin">Admin</SelectItem>
//                     <SelectItem value="staff">Staff</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//             </FormItem>
//           )} />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <FormField control={form.control} name="gender" render={({ field }) => (
//             <FormItem>
//               <FormLabel>Gender</FormLabel>
//               <FormControl>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="male">Male</SelectItem>
//                     <SelectItem value="female">Female</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//             </FormItem>
//           )} />
//           <FormField control={form.control} name="dob" render={({ field }) => (
//             <FormItem>
//               <FormLabel>Date of Birth</FormLabel>
//               <FormControl><Input type="date" {...field} /></FormControl>
//             </FormItem>
//           )} />
//           <FormField control={form.control} name="marital_status" render={({ field }) => (
//             <FormItem>
//               <FormLabel>Marital Status</FormLabel>
//               <FormControl>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger><SelectValue placeholder="Select Marital Status" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="single">Single</SelectItem>
//                     <SelectItem value="married">Married</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//             </FormItem>
//           )} />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <FormField control={form.control} name="nationality" render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nationality</FormLabel>
//               <FormControl><Input placeholder="Enter nationality" {...field} /></FormControl>
//             </FormItem>
//           )} />
//         </div>

//         <div className="flex justify-end pt-4">
//           <Button type="submit" className="bg-green-500 hover:bg-green-600">Save</Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

"use client"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@workspace/ui/components/select"
import { UploadCard } from "@/components/common/upload-card"
import { AppSelect } from "@/components/common/app-select"

export function PersonalDetails({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                {/* <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select> */}
                <AppSelect
                  placeholder="Select Gender"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: "male", value: "Male" },
                    { label: "female", value: "Female" },
                  ]}
                  error={form.formState.errors.floor}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="marital_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marital Status</FormLabel>
              <FormControl>
                {/* <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger><SelectValue placeholder="Select Marital Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                </SelectContent>
              </Select> */}
                <AppSelect
                  placeholder="Select Marital Status"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: "single", value: "Single" },
                    { label: "married", value: "Married" },
                  ]}
                  error={form.formState.errors.floor}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="cpr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPR/NID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpr_expiration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPR/NID Expiration</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="blood_group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Group</FormLabel>
              <FormControl>
                {/* <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger><SelectValue placeholder="Select Blood Group" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                </SelectContent>
              </Select> */}
                <AppSelect
                  placeholder="Select Blood Group"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: "A+", value: "A+" },
                    { label: "B+", value: "B+" },
                    { label: "O+", value: "O+" },
                  ]}
                  error={form.formState.errors.floor}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input placeholder="Enter Nationality" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="pt-4 max-w-sm">
        {/* <FormLabel>Employee Photo</FormLabel>
                <UploadCard title="Employee Photo" /> */}
        <FormField
          control={form.control}
          name="employee_photo"
          render={({ field }) => (
            <FormItem className="pt-4 max-w-sm">
              <FormLabel>Employee Photo</FormLabel>
              <FormControl>
                <UploadCard
                  title="Employee Photo"
                  value={field.value}
                  onFileSelect={(file) => field.onChange(file)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}



// // "use client"

// // import { useState, useEffect } from "react"
// // // import { z } from "zod"
// // // import { useForm, useFieldArray } from "react-hook-form"
// // // import { zodResolver } from "@hookform/resolvers/zod"
// // import { z, zodResolver } from "@workspace/ui/lib/zod";
// // import { useForm, useFieldArray } from "@workspace/ui/hooks/use-form";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogFooter,
// // } from "@workspace/ui/components/dialog"
// // import {
// //   Form,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormControl,
// //   FormMessage,
// // } from "@workspace/ui/components/form"
// // import { Input } from "@workspace/ui/components/input"
// // import { Button } from "@workspace/ui/components/button"
// // import { Switch } from "@workspace/ui/components/switch"
// // import { Plus, Trash2, X } from "lucide-react"

// // // ✅ Zod schema for validation
// // const departmentSchema = z.object({
// //   name: z
// //     .string()
// //     .min(1, "Department name is required")
// //     .max(50, "Department name must be under 50 characters"),
// //   active: z.boolean().default(false),
// // })

// // const formSchema = z.object({
// //   departments: z.array(departmentSchema).min(1, "At least one department required"),
// // })

// // type FormSchema = z.infer<typeof formSchema>

// // interface AddDepartmentModalProps {
// //   open: boolean
// //   onClose: () => void
// // }

// // export default function AddDepartmentModal({ open, onClose }: AddDepartmentModalProps) {
// //   const form = useForm<FormSchema>({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       departments: [{ name: "", active: false }],
// //     },
// //   })

// //   const { fields, append, remove } = useFieldArray({
// //     control: form.control,
// //     name: "departments",
// //   })

// //   // Reset on modal close
// //   useEffect(() => {
// //     if (!open) {
// //       form.reset({
// //         departments: [{ name: "", active: false }],
// //       })
// //     }
// //   }, [open])

// //   const handleSave = (values: FormSchema) => {
// //     console.log("✅ Saved departments:", values.departments)
// //     onClose()
// //   }

// //   return (
// //     <Dialog open={open} onOpenChange={onClose}>
// //       <DialogContent
// //         className="max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-6xl w-[95vw] md:w-[90vw] p-0 bg-white rounded-lg overflow-hidden shadow-lg"

// //         onClick={(e) => e.stopPropagation()}
// //         showCloseButton={false}
// //       >
// //         {/* Header */}
// //         {/* <DialogHeader className="flex items-center justify-between bg-[#012E63] px-6 py-3">
// //           <DialogTitle className="text-white text-lg font-semibold">
// //             {fields.length > 1 ? "New Department" : "Add Department"}
// //           </DialogTitle>
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             className="relative text-white hover:text-red-400 hover:bg-transparent"
// //             onClick={onClose}
// //           >
// //             <X className="w-5 h-5" />
// //           </Button> */}

// //         {/* Header */}
// //         <div className="relative flex items-center justify-between bg-[#012E63] px-6 py-3">
// //           {/* Title aligned to left */}
// //           <DialogTitle className="text-white text-lg font-semibold">
// //             {fields.length > 1 ? "New Department" : "Add Department"}
// //           </DialogTitle>

// //           {/* Close Button absolutely positioned at right corner */}
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-400 hover:bg-transparent cursor-pointer"
// //             onClick={onClose}
// //           >
// //             <X className="w-5 h-5" />
// //           </Button>
// //         </div>
// //         {/* </DialogHeader> */}

// //         {/* Body */}
// //         <Form {...form}>
// //           <form
// //             onSubmit={form.handleSubmit(handleSave)}
// //             className="px-6 py-6 space-y-6 max-h-[70vh] overflow-y-auto"
// //           >
// //             {/* Departments Grid */}
// //             <div
// //               className={`grid ${fields.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
// //                 } gap-5`}
// //             >
// //               {fields.map((field, index) => (
// //                 <div
// //                   key={field.id}
// //                   className="border rounded-lg p-4 shadow-sm flex flex-col justify-between space-y-4 relative"
// //                 >
// //                   {/* Label */}
// //                   <div className="flex justify-between items-center">
// //                     <FormLabel className="text-sm font-semibold text-gray-800">
// //                       Department {fields.length > 1 ? index + 1 : ""}
// //                     </FormLabel>

// //                     {fields.length > 1 && (
// //                       <Button
// //                         type="button"
// //                         variant="ghost"
// //                         size="icon"
// //                         onClick={() => remove(index)}
// //                         className="text-red-500 hover:bg-red-50"
// //                       >
// //                         <Trash2 className="h-4 w-4" />
// //                       </Button>
// //                     )}
// //                   </div>

// //                   {/* Input */}
// //                   <FormField
// //                     control={form.control}
// //                     name={`departments.${index}.name`}
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Enter Department Name"
// //                             {...field}
// //                             className="border-gray-300 focus:border-blue-500 focus:ring-0"
// //                           />
// //                         </FormControl>
// //                         <FormMessage className="text-xs text-red-500 mt-1" />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   {/* Status */}
// //                   <FormField
// //                     control={form.control}
// //                     name={`departments.${index}.active`}
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <div className="flex items-center justify-between">
// //                           <FormLabel className="text-sm text-gray-700">
// //                             Status
// //                           </FormLabel>
// //                           <div className="flex items-center gap-3">
// //                             <span
// //                               className={`text-sm ${field.value ? "text-gray-400" : "text-red-500"
// //                                 }`}
// //                             >
// //                               Inactive
// //                             </span>
// //                             <FormControl>
// //                               <Switch
// //                                 checked={field.value}
// //                                 onCheckedChange={field.onChange}
// //                               />
// //                             </FormControl>
// //                             <span
// //                               className={`text-sm ${field.value ? "text-green-500" : "text-gray-400"
// //                                 }`}
// //                             >
// //                               Active
// //                             </span>
// //                           </div>
// //                         </div>
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Add Row Button */}
// //             <div className="flex items-center mt-2">
// //               <Button
// //                 type="button"
// //                 variant="ghost"
// //                 className="flex items-center gap-2 text-green-600 hover:bg-green-50"
// //                 onClick={() => append({ name: "", active: false })}
// //               >
// //                 <Plus className="w-4 h-4" />
// //                 Add Row
// //               </Button>
// //             </div>

// //             {/* Footer */}
// //             <DialogFooter className="flex justify-end gap-3 pt-6 border-t">
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 onClick={onClose}
// //                 className="rounded-md border-blue-500 text-blue-600 hover:bg-blue-50"
// //               >
// //                 Cancel
// //               </Button>
// //               <Button
// //                 type="submit"
// //                 className="bg-green-500 hover:bg-green-600 text-white rounded-md"
// //               >
// //                 Save
// //               </Button>
// //             </DialogFooter>
// //           </form>
// //         </Form>
// //       </DialogContent>
// //     </Dialog>
// //   )
// // }


// "use client"

// import { useState, useEffect } from "react"
// import { z } from "@workspace/ui/lib/zod"
// import { zodResolver } from "@workspace/ui/lib/zod"
// import { useForm, useFieldArray } from "@workspace/ui/hooks/use-form"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@workspace/ui/components/dialog"
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@workspace/ui/components/form"
// import { Input } from "@workspace/ui/components/input"
// import { Button } from "@workspace/ui/components/button"
// import { Switch } from "@workspace/ui/components/switch"
// import { Plus, PlusCircle, Trash2, X } from "lucide-react"

// // ✅ Schema
// const departmentSchema = z.object({
//   name: z
//     .string()
//     .min(1, "Department name is required")
//     .max(50, "Department name must be under 50 characters"),
//   active: z.boolean().default(false),
// })

// const formSchema = z.object({
//   departments: z.array(departmentSchema).min(1, "At least one department is required"),
// })

// type FormSchema = z.infer<typeof formSchema>

// interface AddDepartmentModalProps {
//   open: boolean
//   onClose: () => void
// }

// export default function AddDepartmentModal({ open, onClose }: AddDepartmentModalProps) {
//   const form = useForm<FormSchema>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       departments: [{ name: "", active: false }],
//     },
//   })

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "departments",
//   })

//   // Reset form when modal closes
//   useEffect(() => {
//     if (!open) {
//       form.reset({
//         departments: [{ name: "", active: false }],
//       })
//     }
//   }, [open, form])

//   const handleSave = (values: FormSchema) => {
//     console.log("✅ Departments Saved:", values.departments)
//     onClose()
//   }

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent
//         className="max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-screen-xl w-[95vw] md:w-[90vw] p-0 bg-white rounded-lg overflow-hidden shadow-lg"
//         // className="max-w-6xl w-[95vw] md:w-[90vw] p-0 bg-white rounded-lg overflow-hidden shadow-lg"
//         showCloseButton ={false}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="relative flex items-center justify-between bg-[#012E63] px-6 py-3">
//           <DialogTitle className="text-white text-lg font-semibold">
//             {fields.length > 1 ? "New Department" : "Add Department"}
//           </DialogTitle>

//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-400 hover:bg-transparent cursor-pointer"
//             onClick={onClose}
//           >
//             <X className="w-5 h-5" />
//           </Button>
//         </div>

//         {/* Body */}
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(handleSave)}
//             className="px-6 py-6 space-y-6 "
//           >
//             <div className="max-h-[70vh] overflow-y-auto py-3">
//               {/* Department grid */}
//               <div
//                 className={`grid ${fields.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
//                   } gap-6`}
//               >
//                 {fields.map((field, index) => (
//                   <div
//                     key={field.id}
//                     className="flex items-start justify-between gap-3 border rounded-lg p-4 shadow-sm"
//                   >
//                     <div className="flex-1 space-y-3">
//                       <div className="flex items-center justify-between">
//                         <FormLabel className="text-sm font-medium text-gray-800">
//                           Department {fields.length > 1 ? index + 1 : ""}
//                         </FormLabel>

//                         {/* Remove button (only if more than 1 row) */}
//                         {fields.length > 1 && (
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => remove(index)}
//                             className="text-red-500 hover:text-red-600 hover:bg-red-50"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         )}
//                       </div>

//                       {/* Input field */}
//                       <FormField
//                         control={form.control}
//                         name={`departments.${index}.name`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Input
//                                 placeholder="Enter Department Name"
//                                 {...field}
//                                 className="border-gray-300 focus:border-blue-500 focus:ring-0"
//                               />
//                             </FormControl>
//                             <FormMessage className="text-xs text-red-500 mt-1" />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Status switch */}
//                       {/* <FormField
//                       control={form.control}
//                       name={`departments.${index}.active`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex items-center justify-between">
//                             <FormLabel className="text-sm text-gray-700">
//                               Status
//                             </FormLabel>
//                             <div className="flex items-center gap-3">
//                               <span
//                                 className={`text-sm ${
//                                   field.value ? "text-gray-400" : "text-red-500"
//                                 }`}
//                               >
//                                 Inactive
//                               </span>
//                               <FormControl>
//                                 <Switch
//                                   checked={field.value}
//                                   onCheckedChange={field.onChange}
//                                 />
//                               </FormControl>
//                               <span
//                                 className={`text-sm ${
//                                   field.value ? "text-green-500" : "text-gray-400"
//                                 }`}
//                               >
//                                 Active
//                               </span>
//                             </div>
//                           </div>
//                         </FormItem>
//                       )} */}
//                       <FormField
//                         control={form.control}
//                         name={`departments.${index}.active`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <div
//                               className={`flex items-center justify-between rounded-md px-3 py-2 transition-colors ${field.value ? "bg-green-50" : "bg-gray-50"
//                                 }`}
//                             >
//                               {/* Label */}
//                               <FormLabel className="text-sm text-gray-700">Status</FormLabel>

//                               {/* Toggle + Text */}
//                               <div className="flex items-center gap-3">
//                                 <span
//                                   className={`text-sm font-medium ${field.value ? "text-green-600" : "text-red-500"
//                                     }`}
//                                 >
//                                   Inactive
//                                 </span>

//                                 <FormControl>
//                                   <Switch
//                                     checked={field.value}
//                                     onCheckedChange={field.onChange}
//                                     className={`data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300`}
//                                   />
//                                 </FormControl>

//                                 <span
//                                   className={`text-sm font-medium ${field.value ? "text-green-600" : "text-gray-400"
//                                     }`}
//                                 >
//                                   Active
//                                 </span>
//                               </div>
//                             </div>
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Add Row button (bottom right like your screenshot) */}
//               <div className="flex justify-end mt-4">
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50"
//                   onClick={() => append({ name: "", active: false })}
//                 >
//                   Add Row 
//                   <PlusCircle className="w-6 h-6" />
//                 </Button>
//               </div>
//             </div>
//             {/* Footer */}
//             <DialogFooter className="flex justify-end gap-3 pt-6 border-t">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onClose}
//                 className="rounded-md border-blue-500 text-blue-600 hover:bg-blue-50"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-green-500 hover:bg-green-600 text-white rounded-md"
//               >
//                 Save
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   )
// }



"use client";

import { useEffect } from "react";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm, useFieldArray } from "@workspace/ui/hooks/use-form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Switch } from "@workspace/ui/components/switch";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@workspace/ui/components/form";
import { Plus, PlusCircle, Trash2, X } from "lucide-react";
import { AppDialog } from "@/components/common/app-dialog";
import { StatusSwitch } from "@/components/common/switch-green";
import { useDictionary } from "@/i18n/use-dictionary";

// const departmentSchema = z.object({
//   name: z.string().min(1, "Department name is required").max(50),
//   active: z.boolean().optional().default(false),
// });


// const formSchema = z.object({
//   departments: z.array(departmentSchema).min(1, "At least one department is required"),
// });

// type FormSchema = z.infer<typeof formSchema>;

const departmentSchema = z.object({
  name: z.string().min(1, "Department name is required").max(50),
  active: z.boolean().catch(false), // ✅ fixed
});

const formSchema = z.object({
  departments: z.array(departmentSchema).min(1, "At least one department is required"),
});


type FormSchema = z.infer<typeof formSchema>;


interface AddDepartmentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (departments: { name: string; active: boolean }[]) => void;
  editData?: { id: string; name: string; active: boolean } | null;

}


export default function AddDepartmentModal({ open, onClose, onSave, editData }: AddDepartmentModalProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departments: [{ name: "", active: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "departments",
  });

  const dict = useDictionary();
  const trans = dict.pages.department;

  // useEffect(() => {
  //   if (!open) form.reset({ departments: [{ name: "", active: false }] });
  // }, [open, form]);

  const handleSave = (values: FormSchema) => {
    onSave(values.departments);   // ← SEND DATA TO PAGE for API call
  };

  useEffect(() => {
  if (editData) {
    form.reset({
      departments: [
        {
          name: editData.name,
          active: editData.active,
        },
      ],
    });
  } else if (!open) {
    form.reset({
      departments: [{ name: "", active: false }],
    });
  }
}, [editData, open, form]);


  return (
    <AppDialog open={open} onClose={onClose} title={trans.addDepartment.title} maxWidth="md:max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          {/* Body */}
          <div className="max-h-[70vh] overflow-y-auto py-3">
            <div className={`grid ${fields.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-6`}>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start justify-between gap-3 border rounded-lg p-4 shadow-sm">
                  {/* <div className="flex-1 space-y-3 flex items-center w-full"> */}
                  <div className="flex flex-col lg:flex-row items-center gap-3 w-full">

                    {/* <div className="flex items-center justify-between">
                      <FormLabel>Department {fields.length > 1 ? index + 1 : ""}</FormLabel>

                    </div> */}

                    <FormField
                      control={form.control}
                      name={`departments.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Department {fields.length > 1 ? index + 1 : ""}</FormLabel>

                          <FormControl>
                            <Input placeholder={trans.addDepartment.dialogSubtitle} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`departments.${index}.active`}
                      render={({ field }) => (
                        <FormItem>
                          <div className={`flex items-start justify-between flex-col rounded-md px-3  `}>
                            <FormLabel className="pb-2">Status</FormLabel>
                            <div className={`flex items-center gap-3 ${field.value ? "bg-green-50" : "bg-gray-50"} h-9 px-2`}>
                              <span className={`text-sm ${field.value ? "text-red-500" : "text-red-500"}`}>
                                {trans.addDepartment.Status.inactive}
                              </span>
                              <FormControl>
                                {/* <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className={`data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300 cursor-pointer`}
                                /> */}
                                <StatusSwitch checked={field.value} onCheckedChange={field.onChange} />

                              </FormControl>
                              <span className={`text-sm ${field.value ? "text-green-600" : "text-gray-400"}`}>
                               {trans.addDepartment.Status.active}
                              </span>
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />


                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="bg-red-500 text-red-500 hover:text-red-600 hover:bg-red-400 p-2 rounded-full cursor-pointer"
                      >
                        {/* <Trash2 className="h-4 w-4" /> */}
                        <X className="h-4 w-4 bg-white rounded-full" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="flex justify-end mt-4">
              <Button
                type="button"
                variant="ghost"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 cursor-pointer"
                onClick={() => append({ name: "", active: false })}
              >
                Add Row <span className="bg-green-500 p-2 rounded-full"><Plus className="w-6 h-6 bg-white rounded-full" /></span>
              </Button>
            </div> */}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              {dict.common.cancel}
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
              {dict.common.save}
            </Button>
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

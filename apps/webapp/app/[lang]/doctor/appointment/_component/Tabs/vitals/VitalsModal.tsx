// "use client";
// import React, { useState } from "react";

// type VitalsForm = {
//   bloodPressure: string;
//   pulseRate: string;
//   temperature: string;
//   weight: string;
//   height: string;
//   bmi: string;
//   observations: string;
// };

// export default function VitalsModal({
//   onClose,
//   onSave,
//   initial,
// }: {
//   onClose: () => void;
//   onSave: (payload: VitalsForm) => void;
//   initial?: Partial<VitalsForm>;
// }) {
//   const [form, setForm] = useState<VitalsForm>({
//     bloodPressure: initial?.bloodPressure ?? "",
//     pulseRate: initial?.pulseRate ?? "",
//     temperature: initial?.temperature ?? "",
//     weight: initial?.weight ?? "",
//     height: initial?.height ?? "",
//     bmi: initial?.bmi ?? "",
//     observations: initial?.observations ?? "",
//   });

//   const [saving, setSaving] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   function change(field: keyof VitalsForm, value: string) {
//     setForm((s) => ({ ...s, [field]: value }));
//     setErrors((e) => ({ ...e, [field]: "" }));
//   }

//   function validate() {
//     const e: Record<string, string> = {};
//     // minimal validation examples
//     if (!form.bloodPressure) e.bloodPressure = "Required";
//     if (form.pulseRate && isNaN(Number(form.pulseRate))) e.pulseRate = "Must be number";
//     return e;
//   }

//   async function handleSave() {
//     const e = validate();
//     if (Object.keys(e).length) {
//       setErrors(e);
//       return;
//     }
//     setSaving(true);
//     try {
//       // UI only: simulate async save delay
//       await new Promise((r) => setTimeout(r, 400));
//       onSave(form);
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="bg-white rounded-2xl w-[720px] max-w-full p-6 shadow-xl relative">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-2xl leading-none"
//           aria-label="close"
//         >
//           ×
//         </button>

//         <h3 className="text-lg font-semibold mb-4">Add Vital</h3>

//         <div className="grid grid-cols-2 gap-4">
//           <FormField
//             label="Blood Pressure"
//             placeholder="Enter Blood Pressure (e.g. 120/80 mmHg)"
//             value={form.bloodPressure}
//             onChange={(v) => change("bloodPressure", v)}
//             error={errors.bloodPressure}
//           />
//           <FormField
//             label="Pulse Rate"
//             placeholder="Enter Pulse Rate (bpm)"
//             value={form.pulseRate}
//             onChange={(v) => change("pulseRate", v)}
//             error={errors.pulseRate}
//           />
//           <FormField
//             label="Temperature"
//             placeholder="Enter Temperature (°C)"
//             value={form.temperature}
//             onChange={(v) => change("temperature", v)}
//           />
//           <FormField
//             label="Weight"
//             placeholder="Enter Weight (kg)"
//             value={form.weight}
//             onChange={(v) => change("weight", v)}
//           />
//           <FormField
//             label="Height"
//             placeholder="Enter Height (cm)"
//             value={form.height}
//             onChange={(v) => change("height", v)}
//           />
//           <FormField
//             label="BMI"
//             placeholder="Enter BMI"
//             value={form.bmi}
//             onChange={(v) => change("bmi", v)}
//           />
//         </div>

//         <div className="mt-4">
//           <label className="block text-sm font-medium">Additional Observations</label>
//           <textarea
//             rows={3}
//             value={form.observations}
//             onChange={(e) => change("observations", e.target.value)}
//             placeholder="Enter Additional Observations"
//             className="w-full mt-2 p-3 border rounded-xl"
//           />
//         </div>

//         <div className="flex justify-end gap-3 mt-6">
//           <button className="px-5 py-2 rounded-lg border" onClick={onClose}>
//             CANCEL
//           </button>
//           <button
//             className="px-5 py-2 rounded-lg bg-green-500 text-white"
//             onClick={handleSave}
//             disabled={saving}
//           >
//             {saving ? "Saving..." : "SAVE"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function FormField({
//   label,
//   placeholder,
//   value,
//   onChange,
//   error,
// }: {
//   label: string;
//   placeholder?: string;
//   value: string;
//   onChange: (v: string) => void;
//   error?: string;
// }) {
//   return (
//     <div className="flex flex-col">
//       <label className="text-sm font-medium">{label}</label>
//       <input
//         className={`mt-1 p-2 border rounded-xl ${error ? "border-red-400" : ""}`}
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />
//       {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm } from "@workspace/ui/hooks/use-form";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@workspace/ui/components/form";

import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { X } from "lucide-react";
import { AppDialog } from "@/components/common/app-dialog";

// ----------------------
//   ZOD SCHEMA
// ----------------------
const vitalsSchema = z.object({
    bloodPressure: z.string().min(1, "Blood Pressure is required"),
    pulseRate: z.string().optional(),
    temperature: z.string().optional(),
    weight: z.string().optional(),
    height: z.string().optional(),
    bmi: z.string().optional(),
    observations: z.string().optional(),
});

type VitalsSchema = z.infer<typeof vitalsSchema>;

export default function VitalsModal({
    open,
    onClose,
    onSave,
    initial,
}: {
    open: boolean;
    onClose: () => void;
    onSave: (values: VitalsSchema) => void;
    initial?: Partial<VitalsSchema>;
}) {
    const form = useForm<VitalsSchema>({
        resolver: zodResolver(vitalsSchema),
        defaultValues: {
            bloodPressure: initial?.bloodPressure ?? "",
            pulseRate: initial?.pulseRate ?? "",
            temperature: initial?.temperature ?? "",
            weight: initial?.weight ?? "",
            height: initial?.height ?? "",
            bmi: initial?.bmi ?? "",
            observations: initial?.observations ?? "",
        },
    });

    function handleSubmit(values: VitalsSchema) {
        onSave(values);
    }

    return (
        // <Dialog open={open} onOpenChange={onClose}>
        //   <DialogContent
        //     className="w-[95vw] md:max-w-xl lg:max-w-2xl p-0 overflow-hidden"
        //     // onClick={(e) => e.stopPropagation()}
        //     showCloseButton={false}
        //   >
        //     {/* HEADER */}
        //     <div className="relative flex items-center justify-between bg-[#012E63] px-6 py-3">
        //       <DialogTitle className="text-white text-lg font-semibold">
        //         Add Vital
        //       </DialogTitle>

        //       <Button
        //         variant="ghost"
        //         size="icon"
        //         className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-400 hover:bg-transparent cursor-pointer"
        //         onClick={onClose}
        //       >
        //         <X className="w-5 h-5" />
        //       </Button>
        //     </div>
        <AppDialog
            open={open}
            onClose={onClose}
            title={"  Add Vital"}
            maxWidth="md:max-w-2xl"
        >
            {/* BODY FORM */}
            <div >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">

                            {/* Blood Pressure */}
                            <FormField
                                control={form.control}
                                name="bloodPressure"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Blood Pressure</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="120/80 mmHg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Pulse Rate */}
                            <FormField
                                control={form.control}
                                name="pulseRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pulse Rate (bpm)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="75" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Temperature */}
                            <FormField
                                control={form.control}
                                name="temperature"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Temperature (°C)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="98.6" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Weight */}
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Weight (kg)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="70" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Height */}
                            <FormField
                                control={form.control}
                                name="height"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Height (cm)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="170" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* BMI */}
                            <FormField
                                control={form.control}
                                name="bmi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>BMI</FormLabel>
                                        <FormControl>
                                            <Input placeholder="23.4" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        {/* Observations */}
                        <FormField
                            control={form.control}
                            name="observations"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Observations</FormLabel>
                                    <FormControl>
                                        <textarea
                                            className="w-full p-3 border rounded-xl"
                                            rows={3}
                                            placeholder="Type here..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* FOOTER */}
                        <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            {/* </DialogContent>
    </Dialog> */}
        </AppDialog>
    );
}

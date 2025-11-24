// components/prescription/AddMedicationModal.tsx

"use client";

import {
    Dialog,
    DialogContent,
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

import { useForm } from "@workspace/ui/hooks/use-form";
import { zodResolver } from "@workspace/ui/lib/zod";

import { AppDialog } from "@/components/common/app-dialog";
import { MedicationForm, medicationSchema } from "./types";
import { PrimaryButton } from "@/components/common/buttons/primary-button";
import { CancelButton } from "@/components/common/buttons/cancel-button";

export default function AddMedicationModal({
    open,
    onClose,
    onAdd,
}: {
    open: boolean;
    onClose: () => void;
    onAdd: (med: MedicationForm) => void;
}) {
    const form = useForm<MedicationForm>({
        resolver: zodResolver(medicationSchema),
        defaultValues: {
            medication: "",
            dosage: "",
            interval: "",
            duration: "",
            instructions: "",
        },
    });

    const submit = (values: MedicationForm) => {
        onAdd(values);
        onClose();
        form.reset();
    };

    return (
        // <Dialog open={open} onOpenChange={onClose}>
        //   <DialogContent
        //     className="w-[95vw] md:max-w-2xl p-0 overflow-hidden"
        //     // onClick={(e) => e.stopPropagation()}
        //     showCloseButton={false}
        //   >
        //     {/* HEADER */}
        //     <div className="relative flex items-center justify-between bg-[#012E63] px-6 py-3">
        //       <DialogTitle className="text-white text-lg font-semibold">
        //         Add Medication
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
            title={" Add Medication"}   // 💥 Dynamic title
            maxWidth="md:max-w-2xl"
        >

            {/* BODY */}
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Medication */}
                            <FormField
                                control={form.control}
                                name="medication"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Medication</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Select medication" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Dosage */}
                            <FormField
                                control={form.control}
                                name="dosage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dosage</FormLabel>
                                        <FormControl>
                                            <Input placeholder="5 mg" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Interval */}
                            <FormField
                                control={form.control}
                                name="interval"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dose Interval</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Once daily (OD)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Duration */}
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duration</FormLabel>
                                        <FormControl>
                                            <Input placeholder="30 days" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        {/* Instructions */}
                        <FormField
                            control={form.control}
                            name="instructions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Medication Instructions</FormLabel>
                                    <FormControl>
                                        <textarea
                                            className="w-full border rounded-md px-3 py-2 min-h-[90px]"
                                            placeholder="Enter instructions"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* FOOTER */}
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            {/* <Button variant="outline" type="button" onClick={onClose}>
                                Cancel
                            </Button> */}
                            <CancelButton onClick={onClose} />
                            {/* <Button type="submit" className="bg-green-600 text-white">
                                Add
                            </Button> */}
                            <PrimaryButton type="submit" label="Add" loadingName="Adding..."/>
                        </div>

                    </form>
                </Form>
            </div>
            {/* </DialogContent>
    </Dialog> */}
        </AppDialog>
    );
}

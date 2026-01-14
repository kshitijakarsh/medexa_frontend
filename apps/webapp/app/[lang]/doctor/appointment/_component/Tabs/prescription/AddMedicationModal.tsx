// components/prescription/AddMedicationModal.tsx

"use client";

import { useState } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@workspace/ui/components/command";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { useForm } from "@workspace/ui/hooks/use-form";
import { zodResolver } from "@workspace/ui/lib/zod";
import { cn } from "@workspace/ui/lib/utils";

import { AppDialog } from "@/components/common/app-dialog";
import { MedicationForm, medicationSchema } from "./types";
import { PrimaryButton } from "@/components/common/buttons/primary-button";
import { CancelButton } from "@/components/common/buttons/cancel-button";
import { useMedicines } from "@/app/[lang]/pharmacy/_hooks/useMedicine";

export default function AddMedicationModal({
    open,
    onClose,
    onAdd,
    editData,
    isEdit = false,
}: {
    open: boolean;
    onClose: () => void;
    onAdd: (med: MedicationForm) => void;
    editData?: MedicationForm;
    isEdit?: boolean;
}) {
    const [medicineSearch, setMedicineSearch] = useState("")
    const [medicineOpen, setMedicineOpen] = useState(false)

    // Fetch medicines with search
    const { data: medicinesData, isLoading: medicinesLoading } = useMedicines({
        search: medicineSearch,
        limit: 50,
        // status: "active",
    })

    const medicines = medicinesData?.data || []

    const form = useForm<MedicationForm>({
        resolver: zodResolver(medicationSchema),
        defaultValues: editData || {
            medication: "",
            medicine_id: undefined,
            dosage: "",
            route: "",
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
            title={isEdit ? "Edit Medication" : "Add Medication"}   // 💥 Dynamic title
            maxWidth="md:max-w-2xl"
        >

            {/* BODY */}
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Medication - Searchable Dropdown */}
                            <FormField
                                control={form.control}
                                name="medication"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Medication</FormLabel>
                                        <Popover open={medicineOpen} onOpenChange={setMedicineOpen}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-full justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value || "Search and select medicine"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[400px] p-0">
                                                <Command>
                                                    <CommandInput 
                                                        placeholder="Search medicine..." 
                                                        value={medicineSearch}
                                                        onValueChange={setMedicineSearch}
                                                    />
                                                    <CommandList>
                                                        {medicinesLoading ? (
                                                            <div className="flex items-center justify-center py-6">
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                                <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <CommandEmpty>No medicine found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {medicines.map((medicine) => (
                                                                        <CommandItem
                                                                            key={medicine.id}
                                                                            value={medicine.medicine}
                                                                            onSelect={() => {
                                                                                form.setValue("medication", medicine.medicine)
                                                                                form.setValue("medicine_id", medicine.id)
                                                                                setMedicineOpen(false)
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    medicine.medicine === field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                            <div className="flex flex-col">
                                                                                <span>{medicine.medicine}</span>
                                                                                <span className="text-xs text-muted-foreground">
                                                                                    {medicine.type} {medicine.content ? `- ${medicine.content}` : ''}
                                                                                </span>
                                                                            </div>
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </>
                                                        )}
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
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

                            {/* Route */}
                            <FormField
                                control={form.control}
                                name="route"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Route (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Oral, IV, IM, etc." {...field} />
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

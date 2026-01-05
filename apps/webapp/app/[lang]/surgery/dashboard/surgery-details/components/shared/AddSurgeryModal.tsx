"use client";

import { AppDialog } from "@/components/common/app-dialog";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@workspace/ui/components/form";
import { AppSelect } from "@/components/common/app-select";
import { useForm } from "@workspace/ui/hooks/use-form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { Button } from "@workspace/ui/components/button";

/* ---------- SCHEMA ---------- */
const schema = z.object({
    procedure: z.string().min(1, "Procedure is required"),
    urgency: z.string().min(1, "Urgency is required"),
    department: z.string().min(1, "Department is required"),
    doctor: z.string().min(1, "Doctor is required"),
    specialNotes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

/* ---------- OPTIONS ---------- */
const PROCEDURE_OPTIONS = [
    { value: "knee-replacement", label: "Knee Replacement" },
    { value: "lap-chole", label: "Laparoscopic Cholecystectomy" },
    { value: "appendectomy", label: "Appendectomy" },
    { value: "hip-replacement", label: "Hip Replacement" },
];

const URGENCY_OPTIONS = [
    { value: "elective", label: "Elective" },
    { value: "urgent", label: "Urgent" },
    { value: "emergency", label: "Emergency" },
];

const DEPARTMENT_OPTIONS = [
    { value: "orthopedics", label: "Orthopedics" },
    { value: "general-surgery", label: "General Surgery" },
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
];

const DOCTOR_OPTIONS = [
    { value: "dr-smith", label: "Dr. Smith" },
    { value: "dr-johnson", label: "Dr. Johnson" },
    { value: "dr-williams", label: "Dr. Williams" },
    { value: "dr-brown", label: "Dr. Brown" },
];

/* ---------- PROPS ---------- */
interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit?: (values: FormValues) => void;
}

/* ---------- COMPONENT ---------- */
export default function AddSurgeryModal({ open, onClose, onSubmit }: Props) {
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            procedure: "",
            urgency: "",
            department: "",
            doctor: "",
            specialNotes: "",
        },
    });

    const submit = (values: FormValues) => {
        onSubmit?.(values);
        onClose();
        form.reset();
    };

    const handleCancel = () => {
        onClose();
        form.reset();
    };

    return (
        <AppDialog
            open={open}
            onClose={onClose}
            title="Prescribe Surgery"
            description="Add Prescribe Surgery"
            maxWidth="md:max-w-2xl"
            headerColor="white"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Procedure */}
                        <FormField
                            name="procedure"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Procedure</FormLabel>
                                    <FormControl>
                                        <AppSelect
                                            placeholder="Select Surgery Type"
                                            value={field.value}
                                            onChange={field.onChange}
                                            options={PROCEDURE_OPTIONS}
                                            error={form.formState.errors.procedure}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Urgency */}
                        <FormField
                            name="urgency"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Urgency</FormLabel>
                                    <FormControl>
                                        <AppSelect
                                            placeholder="Select Urgency"
                                            value={field.value}
                                            onChange={field.onChange}
                                            options={URGENCY_OPTIONS}
                                            error={form.formState.errors.urgency}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Department */}
                        <FormField
                            name="department"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <FormControl>
                                        <AppSelect
                                            placeholder="Select Department"
                                            value={field.value}
                                            onChange={field.onChange}
                                            options={DEPARTMENT_OPTIONS}
                                            error={form.formState.errors.department}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Doctor */}
                        <FormField
                            name="doctor"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Doctor</FormLabel>
                                    <FormControl>
                                        <AppSelect
                                            placeholder="Select Doctor"
                                            value={field.value}
                                            onChange={field.onChange}
                                            options={DOCTOR_OPTIONS}
                                            error={form.formState.errors.doctor}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Special Notes */}
                    <FormField
                        name="specialNotes"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Special Notes</FormLabel>
                                <FormControl>
                                    <textarea
                                        className="w-full border border-slate-200 rounded-md p-3 min-h-[120px] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        placeholder="Enter Special Notes"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            className="px-8 rounded-lg"
                        >
                            CANCEL
                        </Button>
                        <Button
                            type="submit"
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 rounded-lg"
                        >
                            SAVE
                        </Button>
                    </div>
                </form>
            </Form>
        </AppDialog>
    );
}

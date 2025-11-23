"use client";

import { useForm } from "@workspace/ui/hooks/use-form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { StatusSwitch } from "@/components/common/switch-green";
import { AppDialog } from "@/components/common/app-dialog";

const addBedSchema = z.object({
    bedNo: z.string().min(1, "Enter Bed No"),
    bedType: z.string().min(1, "Select Bed Type"),
    floor: z.string().min(1, "Select Floor"),
    ward: z.string().min(1, "Select Ward"),
    active: z.boolean().catch(false),
});

type AddBedForm = z.infer<typeof addBedSchema>;

export function AddBedDialog({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const form = useForm<AddBedForm>({
        resolver: zodResolver(addBedSchema),
        defaultValues: {
            bedNo: "",
            bedType: "",
            floor: "",
            ward: "",
            active: false,
        },
    });

    const handleSave = (values: AddBedForm) => {
        console.log("Bed saved:", values);
        onClose();
    };

    return (
        <AppDialog open={open} onClose={onClose} title="Add Bed" maxWidth="md:max-w-1xl lg:max-w-1xl">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className="space-y-4 text-sm"
                >
                    <FormField
                        control={form.control}
                        name="bedNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bed No</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Bed No" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bedType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bed Type</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="w-full border rounded-md px-3 py-2 text-sm focus:ring-0"
                                    >
                                        <option value="">Select Bed Type</option>
                                        <option value="General">General</option>
                                        <option value="ICU">ICU</option>
                                    </select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="floor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Floor</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="w-full border rounded-md px-3 py-2 text-sm focus:ring-0"
                                    >
                                        <option value="">Select Floor</option>
                                        <option value="1">1st Floor</option>
                                        <option value="2">2nd Floor</option>
                                    </select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="ward"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ward</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="w-full border rounded-md px-3 py-2 text-sm focus:ring-0"
                                    >
                                        <option value="">Select Ward</option>
                                        <option value="A">Ward A</option>
                                        <option value="B">Ward B</option>
                                    </select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Status */}
                    <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <div
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 ${field.value ? "bg-green-50" : "bg-gray-50"
                                        }`}
                                >
                                    <span className="text-sm text-red-500">Inactive</span>
                                    <FormControl>
                                        <StatusSwitch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <span className="text-sm text-green-600">Active</span>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="text-blue-600 border-blue-500"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-green-500 hover:bg-green-600">
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        </AppDialog>
    );
}

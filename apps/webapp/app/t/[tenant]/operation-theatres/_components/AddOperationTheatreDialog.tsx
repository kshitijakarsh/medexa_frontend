"use client";

import { useForm } from "@workspace/ui/hooks/use-form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@workspace/ui/components/select";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { AppDialog } from "@/components/common/app-dialog";
import { CancelButton } from "@/components/common/cancel-button";
import { ActionButton } from "@/components/common/action-button";
import { useState } from "react";
import { AppSelect } from "@/components/common/AppSelect";

const addOTSchema = z.object({
    operationRoom: z.string().min(1, "Enter Operation Room Number"),
    roomName: z.string().min(1, "Enter Operation Room Name"),
    floor: z.string().min(1, "Select Floor"),
});

type AddOTForm = z.infer<typeof addOTSchema>;

export function AddOperationTheatreDialog({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const [isLoading, setLoading] = useState<boolean>(false)
    const form = useForm<AddOTForm>({
        resolver: zodResolver(addOTSchema),
        defaultValues: {
            operationRoom: "",
            roomName: "",
            floor: "",
        },
    });

    const handleSave = (values: AddOTForm) => {
        console.log("Operation Theatre saved:", values);
        onClose();
    };

    return (
        <AppDialog open={open} onClose={onClose} title="Operation Theatres" maxWidth="md:max-w-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4 text-sm">
                    <FormField
                        control={form.control}
                        name="operationRoom"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Operation Room Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Operation Room Number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="roomName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Operation Room Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Operation Room Name" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* <FormField
                        control={form.control}
                        name="floor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Floor</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Floor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1st Floor">1st Floor</SelectItem>
                                            <SelectItem value="2nd Floor">2nd Floor</SelectItem>
                                            <SelectItem value="3rd Floor">3rd Floor</SelectItem>
                                            <SelectItem value="4th Floor">4th Floor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    
                                </FormControl>
                            </FormItem>
                        )}
                    /> */}

                    <FormField
                        control={form.control}
                        name="floor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Floor</FormLabel>
                                <FormControl>
                                    <AppSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={[
                                            { label: "1st Floor", value: "1st Floor" },
                                            { label: "2nd Floor", value: "2nd Floor" },
                                            { label: "3rd Floor", value: "3rd Floor" },
                                            { label: "4th Floor", value: "4th Floor" },
                                        ]}
                                        error={form.formState.errors.floor}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    <div className="flex justify-end gap-3 pt-4">
                        {/* <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-blue-600 border-blue-500"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Save
            </Button> */}
                        <CancelButton onClick={onClose} />
                        <ActionButton loading={isLoading} label="Apply Filter" />
                    </div>
                </form>
            </Form>
        </AppDialog>
    );
}

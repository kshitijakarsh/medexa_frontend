"use client";

import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm } from "@workspace/ui/hooks/use-form";
import { AppDialog } from "@/components/common/app-dialog";
import { Button } from "@workspace/ui/components/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "@workspace/ui/components/form";

const schema = z.object({
    note: z.string().min(1, "Note is required"),
});

export function NurseNoteModal({
    open,
    onClose,
    onSubmit,
    initial,
    loading,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    initial?: { note: string };
    loading: boolean
}) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            note: initial?.note ?? "",
        },
    });

    return (
        <AppDialog
            open={open}
            onClose={onClose}
            title={initial ? "Edit Nurse Note" : "Add Nurse Note"}
            description="Record your observation, patient condition, and care provided."
            headerColor="white"
            maxWidth="md:max-w-xl"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        name="note"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nurse Note</FormLabel>
                                <FormControl>
                                    <textarea
                                        rows={4}
                                        className="w-full rounded-lg border p-3"
                                        placeholder="Enter nurse note"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-3 border-t pt-4">
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={loading}
                        >
                            {initial ?
                                loading ? "Updating..." : "Update"
                                :
                                loading ? "Saving..." : "Save"
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </AppDialog>
    );
}

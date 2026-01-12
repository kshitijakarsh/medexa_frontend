"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { Upload, Camera, Send, X, FileUp } from "lucide-react";
import { z, zodResolver } from "@workspace/ui/lib/zod";
import { useForm, Controller } from "@workspace/ui/hooks/use-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form";

const consentUploadSchema = z.object({
    notes: z.string().optional(),
});

type ConsentUploadData = z.infer<typeof consentUploadSchema>;

type ConsentUploadModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    onUpload: (notes: string) => void;
};

import { useDictionary } from "@/i18n/use-dictionary";

export default function ConsentUploadModal({
    open,
    onOpenChange,
    title,
    onUpload,
}: ConsentUploadModalProps) {
    const dict = useDictionary();

    const form = useForm<ConsentUploadData>({
        resolver: zodResolver(consentUploadSchema),
        defaultValues: {
            notes: "",
        },
    });

    React.useEffect(() => {
        if (open) {
            form.reset({
                notes: "",
            });
        }
    }, [open, form]);

    const handleUpload = (data: ConsentUploadData) => {
        onUpload(data.notes || "");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white gap-0 border-none shadow-lg">
                <DialogHeader className="p-6 pb-2 flex flex-row items-start justify-between">
                    <div className="space-y-1">
                        <DialogTitle className="text-xl font-semibold text-slate-900">
                            {title}
                        </DialogTitle>
                        <p className="text-sm text-slate-500 font-medium">
                            {dict.pages.surgery.surgeryDetails.preOp.modals.consentUpload.acceptedFiles}
                        </p>
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleUpload)} className="space-y-6">
                        <div className="px-6 py-4 space-y-6">
                            {/* Upload Area */}
                            <div className="border-2 border-dashed border-blue-100 bg-blue-50/30 rounded-xl p-10 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-sm">
                                    <FileUp size={24} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-slate-700">
                                        {dict.pages.surgery.surgeryDetails.preOp.modals.consentUpload.uploadPrompt}
                                    </p>
                                    <p className="text-sm font-medium text-slate-700">{dict.pages.surgery.surgeryDetails.preOp.modals.consentUpload.maxSize}</p>
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="bg-white border-blue-500 text-blue-500 hover:bg-blue-50 h-10 px-6 font-medium gap-2"
                                    >
                                        {dict.pages.surgery.surgeryDetails.preOp.modals.consentUpload.capture} <Camera size={18} />
                                    </Button>
                                    <Button type="button" className="bg-blue-500 hover:bg-blue-600 text-white h-10 px-6 font-medium gap-2">
                                        {dict.pages.surgery.surgeryDetails.preOp.modals.consentUpload.uploadDocument} <Upload size={18} />
                                    </Button>
                                </div>
                            </div>

                            {/* Notes Section */}
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">
                                            {dict.pages.surgery.surgeryDetails.preOp.modals.consentUpload.notes}
                                        </label>
                                        <FormControl>
                                            <Textarea
                                                placeholder={dict.pages.surgery.surgeryDetails.preOp.modals.consentUpload.notesPlaceholder}
                                                className="min-h-[120px] resize-none border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Footer Section */}
                        <div className="p-6 pt-2 flex items-center justify-center gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1 h-12 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold rounded-xl text-md"
                                onClick={() => onOpenChange(false)}
                            >
                                {dict.pages.surgery.surgeryDetails.common.cancel}
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 h-12 bg-[#48bb78] hover:bg-[#38a169] text-white font-semibold rounded-xl text-md gap-2"
                            >
                                <Send size={18} /> {dict.pages.surgery.surgeryDetails.preOp.modals.consentUpload.uploadDocument}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

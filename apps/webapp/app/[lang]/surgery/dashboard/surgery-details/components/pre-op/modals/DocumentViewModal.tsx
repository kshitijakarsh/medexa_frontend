"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Printer, Download, Info } from "lucide-react";
import Image from "next/image";

export type DocumentData = {
    title: string;
    description: string;
    conductedBy: string;
    date: string;
    imageUrl?: string;
};

type DocumentViewModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    document?: DocumentData;
};

import { useDictionary } from "@/i18n/use-dictionary";

export default function DocumentViewModal({
    open,
    onOpenChange,
    document,
}: DocumentViewModalProps) {
    const dict = useDictionary();
    if (!document) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white gap-0">
                {/* Header Section */}
                <div className="p-4 border-b border-slate-100 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <DialogTitle className="text-md font-medium text-slate-900">
                            {document.title}
                        </DialogTitle>
                        <p className="text-sm  max-w-[500px]">
                            {document.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <Button variant="outline" className="h-9 gap-2 text-blue-600 border-blue-200 hover:bg-blue-50">
                            <Printer size={16} />
                            {dict.pages.surgery.surgeryDetails.preOp.modals.documentView.print}
                        </Button>
                        <Button className="h-9 gap-2 bg-blue-500 hover:bg-blue-600 text-white">
                            <Download size={16} />
                            {dict.pages.surgery.surgeryDetails.preOp.modals.documentView.download}
                        </Button>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 flex justify-center items-center min-h-[200px]">
                    <div className="bg-white shadow-sm border border-slate-200 p-6 w-full max-w-[500px] aspect-[4/3] flex flex-col items-center justify-center text-center space-y-4">
                        {document.imageUrl ? (
                            <div className="relative w-full h-full">
                                <Image src={document.imageUrl} alt="Document Preview" fill className="object-contain" />
                            </div>
                        ) : (
                            <>
                                <h2 className="text-xl font-serif font-bold uppercase tracking-wider">{dict.pages.surgery.surgeryDetails.preOp.modals.documentView.labName}</h2>
                                <h3 className="text-lg font-serif italic">{dict.pages.surgery.surgeryDetails.preOp.modals.documentView.formTitle}</h3>
                                <div className="text-xs text-slate-400 mt-8">
                                    {dict.pages.surgery.surgeryDetails.preOp.modals.documentView.placeholderPreview}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="p-4 border-t border-slate-100 bg-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-100 bg-blue-50 text-xs text-slate-700">
                        <Info size={14} className="text-blue-500" />
                        <span className="font-medium">{dict.pages.surgery.surgeryDetails.preOp.modals.documentView.conductedBy} {document.conductedBy}</span>
                        <span className="text-slate-300">•</span>
                        <span>{document.date}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

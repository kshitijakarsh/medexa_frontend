"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { Input } from "@workspace/ui/components/input";

type ImplantData = {
    implantType: string;
    size: string;
    batchNo: string;
    manufacturer: string;
    quantity: string;
    notes: string;
};

type ImplantsConsumablesModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: ImplantData) => void;
    initialData?: string;
};

export default function ImplantsConsumablesModal({
    open,
    onOpenChange,
    onSave,
    initialData = "",
}: ImplantsConsumablesModalProps) {
    const [implantType, setImplantType] = React.useState("");
    const [size, setSize] = React.useState("");
    const [batchNo, setBatchNo] = React.useState("");
    const [manufacturer, setManufacturer] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [notes, setNotes] = React.useState("");

    React.useEffect(() => {
        if (open) {
            setImplantType("");
            setSize("");
            setBatchNo("");
            setManufacturer("");
            setQuantity("");
            setNotes("");
        }
    }, [open, initialData]);

    const handleSave = () => {
        onSave({
            implantType,
            size,
            batchNo,
            manufacturer,
            quantity,
            notes
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] gap-2 shadow-2xl border-slate-100 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                        <DialogTitle className="text-lg font-semibold">Implants & Consumables</DialogTitle>
                        <p className="text-xs text-slate-500">Select Implants & Consumables for the patient</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {/* Row 1: Implant Type & Size */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Implant Type</Label>
                            <Select value={implantType} onValueChange={setImplantType}>
                                <SelectTrigger className="w-full h-8 text-xs bg-slate-50 border-slate-200">
                                    <SelectValue placeholder="Select Implant Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mesh">Prolene Mesh</SelectItem>
                                    <SelectItem value="fixation">Fixation Device</SelectItem>
                                    <SelectItem value="clip">Ligating Clips</SelectItem>
                                    <SelectItem value="suture">Suture Material</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Size</Label>
                            <Select value={size} onValueChange={setSize}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Size" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15x15">15x15 cm</SelectItem>
                                    <SelectItem value="30x30">30x30 cm</SelectItem>
                                    <SelectItem value="large">Large</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="small">Small</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 2: Batch, Manufacturer, Quantity */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Batch/Lot No.</Label>
                            <Select value={batchNo} onValueChange={setBatchNo}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Batch/Lot No." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bx102">BX-102</SelectItem>
                                    <SelectItem value="bx103">BX-103</SelectItem>
                                    <SelectItem value="bx104">BX-104</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Manufacturer</Label>
                            <Select value={manufacturer} onValueChange={setManufacturer}>
                                <SelectTrigger className="w-full h-8 text-xs">
                                    <SelectValue placeholder="Select Manufacturer" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ethicon">Ethicon</SelectItem>
                                    <SelectItem value="medtronic">Medtronic</SelectItem>
                                    <SelectItem value="bbraun">B. Braun</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Quantity</Label>
                            <Input
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Enter Quantity"
                                className="h-8 text-xs"
                                type="number"
                                min="1"
                            />
                        </div>
                    </div>

                    {/* Clinical Notes */}
                    <div className="space-y-1">
                        <Label className="text-xs">Clinical Notes (Optional)</Label>
                        <Textarea
                            placeholder="Enter Clinical Notes"
                            className="min-h-[60px] h-[60px] resize-none text-xs"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0 mt-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="border-blue-400 text-blue-600 hover:bg-blue-50 font-medium px-6 w-24 h-8 rounded-md border text-[10px] uppercase tracking-wider">
                        CANCEL
                    </Button>
                    <Button onClick={handleSave} className="bg-[#48C586] hover:bg-[#3fb378] text-white font-medium px-6 w-24 h-8 rounded-md text-[10px] uppercase tracking-wider">
                        SAVE
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

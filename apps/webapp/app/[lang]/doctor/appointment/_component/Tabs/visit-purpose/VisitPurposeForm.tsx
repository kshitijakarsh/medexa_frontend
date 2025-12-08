"use client";

import { useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@workspace/ui/components/select";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Eye } from "lucide-react";

export function VisitPurposeForm() {
    const [form, setForm] = useState({
        chiefComplaint: "",
        history: "",
        onset: "",
        duration: "",
        severity: "",
        notes: "",
    });

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const fluidOptions = [
        "Minutes",
        "Hours",
        "Days",
        "Weeks",
        "Months",
        "Sudden",
        "Gradual",
    ];

    return (
        <div className="flex flex-col gap-6">

            {/* Chief Complaint */}
            {/* <Card className="rounded-xl shadow-sm border">
        <CardContent className="p-5 flex flex-col gap-6"> */}
            <div className="p-0 flex flex-col gap-6">

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm">Chief Complaint</label>
                    <Input
                        placeholder="Stomach discomfort"
                        value={form.chiefComplaint}
                        onChange={(e) =>
                            handleChange("chiefComplaint", e.target.value)
                        }
                    />
                </div>

                {/* History of Present Illness */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm">
                        History of Present Illness
                    </label>
                    <Textarea
                        placeholder="Enter History of Present Illness"
                        className="min-h-[120px]"
                        value={form.history}
                        onChange={(e) =>
                            handleChange("history", e.target.value)
                        }
                    />
                </div>

                {/* Onset / Duration / Severity */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { label: "Onset", key: "onset" },
                        { label: "Duration", key: "duration" },
                        { label: "Severity", key: "severity" },
                    ].map(({ label, key }) => (
                        <div key={key} className="flex flex-col gap-2">
                            <label className="font-medium text-sm">{label}</label>
                            <Select
                                value={form[key as keyof typeof form]}
                                onValueChange={(v) => handleChange(key, v)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Fluid Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {fluidOptions.map((opt) => (
                                        <SelectItem key={opt} value={opt}>
                                            {opt}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </div>

                {/* Additional Notes */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm">Additional Notes</label>
                    <Textarea
                        placeholder="Enter Immediate Risk Assessment"
                        className="min-h-[100px]"
                        value={form.notes}
                        onChange={(e) =>
                            handleChange("notes", e.target.value)
                        }
                    />
                </div>
            </div>
            {/* </CardContent>
      </Card> */}

        </div>
    );
}

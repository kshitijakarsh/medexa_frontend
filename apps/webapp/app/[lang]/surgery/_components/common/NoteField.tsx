import React from "react";

interface NoteFieldProps {
    label: string;
    value: string | React.ReactNode;
    className?: string;
}

export const NoteField = ({ label, value, className = "" }: NoteFieldProps) => {
    return (
        <div className={`rounded-xl border border-blue-50 bg-blue-50/30 p-4 ${className}`}>
            <label className="mb-2 block text-sm font-medium tracking-tight">{label}</label>
            <p className="text-sm text-gray-500">{value}</p>
        </div>
    );
};

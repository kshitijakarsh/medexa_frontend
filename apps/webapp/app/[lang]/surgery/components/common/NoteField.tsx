import React from "react";

interface NoteFieldProps {
    label: string;
    value: string | React.ReactNode;
    className?: string;
}

export const NoteField = ({ label, value, className = "" }: NoteFieldProps) => {
    return (
        <div className={`rounded-xl bg-blue-50 p-4 ${className}`}>
            <label className="block text-xs tracking-tight">{label}</label>
            <div className="text-sm font-medium">{value}</div>
        </div>
    );
};

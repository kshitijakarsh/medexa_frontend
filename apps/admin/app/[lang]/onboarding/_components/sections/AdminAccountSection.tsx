// components/onboard-hospital/sections/AdminAccountSection.tsx
"use client";

import React from "react";
import { FormSection } from "../ui/FormSection";
import { FormInput } from "../ui/FormInput";


interface AdminAccountSection {
    form: any; // react-hook-form instance
}

export const AdminAccountSection = ({ form, }: AdminAccountSection) => {
    return (
        <FormSection title="Admin Account">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <FormInput
                    control={form.control}
                    name="adminFullName"
                    label="Full Name"
                    placeholder="Admin full name"
                />
                <FormInput
                    control={form.control}
                    name="adminDesignation"
                    label="Designation"
                    placeholder="Designation"
                />
                <FormInput
                    control={form.control}
                    name="adminEmail"
                    label="Email"
                    placeholder="admin@example.com"
                    type="email"
                />
                <FormInput
                    control={form.control}
                    name="adminPhone"
                    label="Phone Number"
                    placeholder="+971 50 000 0000"
                    type="tel" // restricts to numbers only
                />
            </div>
        </FormSection>
    )
}

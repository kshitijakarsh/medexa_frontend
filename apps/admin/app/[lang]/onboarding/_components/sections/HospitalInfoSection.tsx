// components/onboard-hospital/sections/HospitalInfoSection.tsx
"use client";

import React from "react";
import { FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { FormInput } from "../ui/FormInput";
import { FileUploader } from "../ui/FileUploader";
import { FormSection } from "../ui/FormSection";

interface HospitalInfoSectionProps {
    form: any; // react-hook-form instance
    logoPreview: string | null;
    setLogoPreview: (preview: string | null) => void;
    logoFile: File | null;
    setLogoFile: (file: File | null) => void;
    onLogoSelected: (file?: File | null) => void;
}

export const HospitalInfoSection = ({
    form,
    logoPreview,
    setLogoPreview,
    logoFile,
    setLogoFile,
    onLogoSelected,
}: HospitalInfoSectionProps) => {
    return (
        <FormSection title="Hospital Information">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Left: Form Fields */}
                <div className="md:col-span-8 space-y-4">
                    {/* Hospital Name */}
                    <FormInput
                        control={form.control}
                        name="hospitalName"
                        label="Hospital Name"
                        placeholder="Enter hospital name"
                    />

                    {/* License Numbers */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <FormInput
                            control={form.control}
                            name="contactEmail"
                            label="Contact Email"
                            placeholder="email@example.com"
                        />
                        <FormInput
                            control={form.control}
                            name="contactPhone"
                            label="Contact Phone"
                            placeholder="+971 50 000 0000"
                        />
                        <FormInput
                            control={form.control}
                            name="emergencyContactNumber"
                            label="Emergency Contact Number"
                            placeholder="+971 50 000 0000"
                        />
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <FormInput
                            control={form.control}
                            name="mophLicenseNumber"
                            label="MoPH License Number"
                            placeholder="MoPH license"
                        />
                        <FormInput
                            control={form.control}
                            name="tradeLicense"
                            label="Trade License (CR Number)"
                            placeholder="Trade license"
                        />
                        <FormInput
                            control={form.control}
                            name="taxRegistrationNumber"
                            label="Tax Registration Number (TIN / VAT)"
                            placeholder="TIN / VAT"
                        />

                    </div>

                    {/* City & Full Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <FormInput
                            control={form.control}
                            name="city"
                            label="City"
                            placeholder="City"
                        />
                        <FormInput
                            control={form.control}
                            name="fullAddress"
                            label="Full Address"
                            placeholder="Full address"
                        />

                    </div>
                </div>

                {/* Right: Logo Upload
                <div className="md:col-span-4 flex flex-col items-center justify-start gap-3">
                    <div className="w-full bg-slate-50 border border-dashed rounded-md p-3 flex flex-col items-center">
                        <div className="w-36 h-36 bg-white rounded-md overflow-hidden border border-slate-100 flex items-center justify-center">
                            {logoPreview ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={logoPreview} alt="Hospital Logo" className="object-contain w-full h-full" />
                            ) : (
                                <div className="text-slate-300 text-sm">No logo selected</div>
                            )}
                        </div>

                        <label className="mt-3 inline-flex items-center cursor-pointer text-sm text-blue-600 underline">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => onLogoSelected(e.target.files ? e.target.files[0] : null)}
                                className="hidden"
                            />
                            Browse Hospital Logo
                        </label>

                        <button
                            type="button"
                            onClick={() => {
                                setLogoFile(null);
                                setLogoPreview(null);
                            }}
                            className="mt-2 px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm border"
                        >
                            Remove
                        </button>
                    </div>

                    <div className="w-full text-xs text-slate-500">
                        Recommended: 300x300 px, PNG/JPG. Maximum 2MB.
                    </div>
                </div>
            </div> */}
                {/* Right: Logo Upload */}
                <div className="md:col-span-4 flex flex-col items-center justify-start gap-3">
                    <FileUploader
                        onSelect={(file) => {
                            setLogoFile(file);
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => setLogoPreview(e.target?.result as string);
                                reader.readAsDataURL(file);
                            } else {
                                setLogoPreview(null);
                            }
                            onLogoSelected(file);
                        }}
                        previewUrl={logoPreview}
                    />

                    <div className="w-full text-xs text-slate-500 text-center">
                        Recommended: 300x300 px, PNG/JPG. Maximum 2MB.
                    </div>
                </div>
            </div>
        </FormSection>
    );
};

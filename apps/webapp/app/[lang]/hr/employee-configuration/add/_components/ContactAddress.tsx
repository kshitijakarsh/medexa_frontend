"use client";

import { AppSelect } from "@/components/common/app-select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";

interface ContactAddressProps {
    form: any;
}

const languageOptions = [
    { value: "english", label: "English" },
    { value: "arabic", label: "Arabic" },
    { value: "hindi", label: "Hindi" },
    { value: "urdu", label: "Urdu" },
    { value: "french", label: "French" },
    { value: "spanish", label: "Spanish" },
    { value: "other", label: "Other" },
]

export function ContactAddress({ form }: ContactAddressProps) {
    return (
        <div className="space-y-6 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl><Input placeholder="Enter phone number" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="office_email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Office Email</FormLabel>
                        <FormControl><Input type="email" placeholder="Enter office email" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="emergency_contact" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Emergency Contact Number</FormLabel>
                        <FormControl><Input placeholder="Enter emergency contact" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="local_address" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Local Address</FormLabel>
                        <FormControl><Input placeholder="Enter local address" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="permanent_address" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Permanent Address</FormLabel>
                        <FormControl><Input placeholder="Enter permanent address" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="language" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                            <AppSelect
                                placeholder="Select Language"
                                value={field.value}
                                onChange={field.onChange}
                                options={languageOptions}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
        </div>
    );
}

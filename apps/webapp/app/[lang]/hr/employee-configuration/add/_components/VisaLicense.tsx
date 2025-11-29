"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";

interface VisaLicenseProps {
  form: any;
}

export function VisaLicense({ form }: VisaLicenseProps) {
  return (
    <div className="space-y-6 text-sm">
      {/* Visa Details */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-4">Visa Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField control={form.control} name="visa_start" render={({ field }) => (
            <FormItem>
              <FormLabel>Visa Start Date</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="visa_end" render={({ field }) => (
            <FormItem>
              <FormLabel>Visa End Date</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </div>

      {/* Passport Details */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-4">Passport Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField control={form.control} name="passport_no" render={({ field }) => (
            <FormItem>
              <FormLabel>Passport Number</FormLabel>
              <FormControl><Input placeholder="Enter passport number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="passport_expiry" render={({ field }) => (
            <FormItem>
              <FormLabel>Passport Expiry Date</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </div>

      {/* License Details */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-4">License Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField control={form.control} name="license_no" render={({ field }) => (
            <FormItem>
              <FormLabel>License Number</FormLabel>
              <FormControl><Input placeholder="Enter license number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="license_expiry" render={({ field }) => (
            <FormItem>
              <FormLabel>License Expiry Date</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </div>
    </div>
  );
}

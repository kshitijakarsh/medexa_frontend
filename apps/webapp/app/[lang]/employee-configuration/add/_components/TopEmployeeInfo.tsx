"use client";

import { FormField, FormItem, FormLabel, FormControl } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { StatusSwitch } from "@/components/common/switch-green";
import { AppSelect } from "@/components/common/app-select";

export function TopEmployeeInfo({ form }: { form: any }) {
    return (
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b border-gray-200 pb-4">
            {/* Left Fields */}
            <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="first_name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl><Input placeholder="Enter Name" {...field} /></FormControl>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="last_name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl><Input placeholder="Enter Name" {...field} /></FormControl>
                        </FormItem>
                    )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FormField control={form.control} name="department" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                                {/* <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                  </SelectContent>
                </Select> */}
                                <AppSelect
                                    placeholder="Select Department"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={[
                                        { label: "cardiology", value: "Cardiology" },
                                        { label: "nneurology", value: "Neurology" },
                                    ]}
                                    error={form.formState.errors.floor}
                                />
                            </FormControl>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="designation" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Designation</FormLabel>
                            <FormControl>
                                {/* <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Designation" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                  </SelectContent>
                </Select> */}
                                <AppSelect
                                    placeholder="Select Designation"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={[
                                        { label: "doctor", value: "Doctor" },
                                        { label: "nurse", value: "Nurse" },
                                    ]}
                                    error={form.formState.errors.floor}
                                />
                            </FormControl>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="specialization" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Specialization</FormLabel>
                            <FormControl>
                                {/* <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Specialization" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="radiology">Radiology</SelectItem>
                  </SelectContent>
                </Select> */}
                                <AppSelect
                                    placeholder="Select Qualification"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={[
                                        { label: "cardiology", value: "Cardiology" },
                                        { label: "radiology", value: "Radiology" },
                                    ]}
                                    error={form.formState.errors.floor}
                                />
                            </FormControl>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="role" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                {/* <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select> */}
                                <AppSelect
                                    placeholder="Select Qualification"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={[
                                        { label: "admin", value: "Admin" },
                                        { label: "staff", value: "Staff" },
                                    ]}
                                    error={form.formState.errors.floor}
                                />
                            </FormControl>
                        </FormItem>
                    )} />
                </div>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center gap-3 min-w-[180px]">
                <FormField control={form.control} name="active" render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Status</FormLabel>
                        <div
                            className={`flex items-center gap-3 rounded-md px-3 py-2 ${field.value ? "bg-green-50" : "bg-gray-50"
                                }`}
                        >
                            <span className="text-sm text-red-500">Inactive</span>
                            <FormControl>
                                <StatusSwitch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <span className="text-sm text-green-600">Active</span>
                        </div>
                    </FormItem>
                )} />
            </div>
        </div>
    );
}

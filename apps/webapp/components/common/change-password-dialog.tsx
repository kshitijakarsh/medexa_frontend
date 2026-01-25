"use client";

import { useForm } from "@workspace/ui/hooks/use-form";
import { z, zodResolver } from "@workspace/ui/lib/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { AppDialog } from "@/components/common/app-dialog";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDictionary } from "@/i18n/use-dictionary";
import { useChangePassword } from "@/hooks/use-change-password";

const schema = z
    .object({
        currentPassword: z.string().trim().min(1, "Current password is required"),
        newPassword: z
            .string()
            .trim()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
            .refine((val) => !/\s/.test(val), "Password cannot contain spaces"),
        confirmPassword: z.string().trim().min(1, "Please confirm your password"),
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
        message: "New password must be different from current password",
        path: ["newPassword"],
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type FormValues = z.infer<typeof schema>;

interface ChangePasswordDialogProps {
    open: boolean;
    onClose: () => void;
}

export function ChangePasswordDialog({ open, onClose }: ChangePasswordDialogProps) {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { mutateAsync: changePassword, isPending } = useChangePassword();

    const dict = useDictionary();
    const t = dict.common;

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: FormValues) => {
        try {
            await changePassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            });

            form.reset();
            onClose();
        } catch (error) {
            // Error is handled in the hook's toast
            console.error("Change password error:", error);
        }
    };

    return (
        <AppDialog
            open={open}
            onClose={onClose}
            title={t?.changePassword || "Change Password"}
            maxWidth="md:max-w-md"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Current Password */}
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            type={showCurrent ? "text" : "password"}
                                            placeholder="Enter current password"
                                            className="pl-10 pr-10"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrent(!showCurrent)}
                                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* New Password */}
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            type={showNew ? "text" : "password"}
                                            placeholder="Enter new password"
                                            className="pl-10 pr-10"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNew(!showNew)}
                                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            type={showConfirm ? "text" : "password"}
                                            placeholder="Confirm new password"
                                            className="pl-10 pr-10"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isPending}
                        >
                            {dict.common.cancel}
                        </Button>
                        <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={isPending}
                        >
                            {isPending ? "Updating..." : "Update Password"}
                        </Button>
                    </div>
                </form>
            </Form>
        </AppDialog>
    );
}

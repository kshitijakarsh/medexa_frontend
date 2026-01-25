"use client";

import { useMutation } from "@tanstack/react-query";
import { createUserApiClient, ChangePasswordPayload } from "@/lib/api/administration/users";
import { toast } from "@workspace/ui/lib/sonner";

export function useChangePassword() {
    const api = createUserApiClient();

    return useMutation({
        mutationFn: async (payload: ChangePasswordPayload) => {
            const response = await api.changePassword(payload);
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Password changed successfully");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to change password. Please try again.");
        },
    });
}

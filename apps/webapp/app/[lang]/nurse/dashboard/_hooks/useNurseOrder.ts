import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNurseOrdersApiClient, UpdateNurseOrderPayload } from "@/lib/api/doctor/nurse-orders-api";
import { getIdToken } from "@/app/utils/auth";

export const nurseOrderKeys = {
  all: ["nurse-orders"] as const,
  lists: () => [...nurseOrderKeys.all, "list"] as const,
  list: (filters: any) => [...nurseOrderKeys.lists(), filters] as const,
  details: () => [...nurseOrderKeys.all, "detail"] as const,
  detail: (id: string) => [...nurseOrderKeys.details(), id] as const,
};

/**
 * Hook to update nurse order (status, urgency, etc.)
 */
export function useUpdateNurseOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateNurseOrderPayload;
    }) => {
      const token = (await getIdToken()) || "";
      const client = createNurseOrdersApiClient({ authToken: token });
      const response = await client.update(id, payload);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate nurse orders lists
      queryClient.invalidateQueries({ queryKey: ["nurse-orders"] });
      // Invalidate specific order detail
      queryClient.invalidateQueries({
        queryKey: nurseOrderKeys.detail(variables.id),
      });
    },
  });
}

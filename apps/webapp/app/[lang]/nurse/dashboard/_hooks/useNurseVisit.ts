import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createNurseApiClient } from "@/lib/api/nurse-api";
import { createVisitApiClient, UpdateVisitPayload } from "@/lib/api/visit-api";
import { getIdToken } from "@/app/utils/auth";

/* ---------------------------------------------------
   Query Keys
--------------------------------------------------- */
export const nurseKeys = {
  all: ["nurses"] as const,
  lists: () => [...nurseKeys.all, "list"] as const,
  list: (filters: any) => [...nurseKeys.lists(), filters] as const,
};

export const visitKeys = {
  all: ["visits"] as const,
  details: () => [...visitKeys.all, "detail"] as const,
  detail: (id: string) => [...visitKeys.details(), id] as const,
};

/* ---------------------------------------------------
   useNurses - Get all nurses (consumables creators)
--------------------------------------------------- */
export function useNurses(params?: { search?: string; enabled?: boolean }) {
  const { enabled = true, ...queryParams } = params || {};

  return useQuery({
    queryKey: nurseKeys.list(queryParams),
    queryFn: async () => {
      const token = (await getIdToken()) || "";
      const client = createNurseApiClient({ authToken: token });
      const response = await client.getConsumablesCreators(queryParams);
      return response.data.data;
    },
    enabled,
  });
}

/* ---------------------------------------------------
   useVisitById - Get visit by ID
--------------------------------------------------- */
export function useVisitById(id: string, enabled = true) {
  return useQuery({
    queryKey: visitKeys.detail(id),
    queryFn: async () => {
      const token = (await getIdToken()) || "";
      const client = createVisitApiClient({ authToken: token });
      const response = await client.getById(id);
      return response.data.data;
    },
    enabled: enabled && !!id,
  });
}

/* ---------------------------------------------------
   useUpdateVisit - Update visit (reassign nurse)
--------------------------------------------------- */
export function useUpdateVisit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateVisitPayload;
    }) => {
      const token = (await getIdToken()) || "";
      const client = createVisitApiClient({ authToken: token });
      const response = await client.update(id, payload);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate specific visit detail
      queryClient.invalidateQueries({
        queryKey: visitKeys.detail(variables.id),
      });
      // Invalidate nurse visits lists
      queryClient.invalidateQueries({ queryKey: ["nurse-visits"] });
    },
  });
}

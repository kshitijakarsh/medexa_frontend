import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPatientApiClient,
  CreatePatientPayload,
  UpdatePatientPayload,
} from "@/lib/api/patient-api";
import { getIdToken } from "@/app/utils/auth";


/* ---------------------------------------------------
   Query Keys
--------------------------------------------------- */
export const patientKeys = {
  all: ["patients"] as const,
  lists: () => [...patientKeys.all, "list"] as const,
  list: (filters: any) => [...patientKeys.lists(), filters] as const,
  details: () => [...patientKeys.all, "detail"] as const,
  detail: (id: string) => [...patientKeys.details(), id] as const,
};

/* ---------------------------------------------------
   usePatients - Get all patients
--------------------------------------------------- */
export function usePatients(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  enabled?: boolean;
}) {
  const { enabled = true, ...queryParams } = params || {};

  return useQuery({
    queryKey: patientKeys.list(queryParams),
    queryFn: async () => {
      const token = (await getIdToken()) || "";
      const client = createPatientApiClient({ authToken: token });
      const response = await client.getAll(queryParams);
      return response.data;
    },
    enabled,
  });
}

/* ---------------------------------------------------
   usePatientById - Get patient by ID
--------------------------------------------------- */
export function usePatientById(id: string, enabled = true) {
  return useQuery({
    queryKey: patientKeys.detail(id),
    queryFn: async () => {
      const token = (await getIdToken()) || "";
      const client = createPatientApiClient({ authToken: token });
      const response = await client.getById(id);
      return response.data.data;
    },
    enabled: enabled && !!id,
  });
}

/* ---------------------------------------------------
   useCreatePatient - Create new patient
--------------------------------------------------- */
export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreatePatientPayload) => {
      const token = (await getIdToken()) || "";
      const client = createPatientApiClient({ authToken: token });
      const response = await client.create(payload);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch patient lists
      queryClient.invalidateQueries({ queryKey: patientKeys.lists() });
    },
  });
}

/* ---------------------------------------------------
   useUpdatePatient - Update existing patient
--------------------------------------------------- */
export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdatePatientPayload;
    }) => {
      const token = (await getIdToken()) || "";
      const client = createPatientApiClient({ authToken: token });
      const response = await client.update(id, payload);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: patientKeys.lists() });
      // Invalidate specific patient detail
      queryClient.invalidateQueries({
        queryKey: patientKeys.detail(variables.id),
      });
    },
  });
}

/* ---------------------------------------------------
   useDeletePatient - Delete patient
--------------------------------------------------- */
export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = (await getIdToken()) || "";
      const client = createPatientApiClient({ authToken: token });
      const response = await client.delete(id);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch patient lists
      queryClient.invalidateQueries({ queryKey: patientKeys.lists() });
    },
  });
}

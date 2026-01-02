// "use client";

// import { createInsuranceApiClient } from "@/lib/api/administration/insurance";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// const insuranceClient = createInsuranceApiClient({
//     authToken: "", // token handled by getIdToken internally
// });

// export const INSURANCE_KEYS = {
//     all: ["insurance"] as const,
//     list: (params?: any) => ["insurance", "list", params] as const,
//     detail: (id: string) => ["insurance", "detail", id] as const,
// };

// export interface CreateInsuranceParams {
//   provider_name: string;
//   company_name: string;
//   approval_url?: string;
//   status: "active" | "inactive";
//   consulting_service_code?: string;
//   registration_service_code?: string;
//   trn?: string;
//   address?: string;
//   insurance_company_logo_url?: string;
// }

// function getErrorMessage(error: unknown) {
//   if (error instanceof Error) return error.message;
//   return "Something went wrong. Please try again.";
// }

// /* ---------- LIST ---------- */
// export function useInsuranceList(params?: {
//     page?: number;
//     limit?: number;
//     status?: string;
//     search?: string;
// }) {
//     return useQuery({
//         queryKey: INSURANCE_KEYS.list(params),
//         queryFn: async () => {
//             const res = await insuranceClient.getInsuranceProviders(params);
//             return res.data;
//         },
//     });
// }

// /* ---------------- GET BY ID ---------------- */

// export function useInsuranceById(id?: string) {
//     return useQuery({
//         queryKey: INSURANCE_KEYS.detail(id ?? ""),
//         enabled: !!id,
//         queryFn: async () => {
//             if (!id) throw new Error("Insurance ID is required");
//             const res = await insuranceClient.getInsuranceById(id);
//             return res.data.data;
//         },
//     });
// }

// /* ---------- CREATE ---------- */
// export function useCreateInsurance() {
//     const qc = useQueryClient();

//     return useMutation({
//         mutationFn: insuranceClient.createInsurance.bind(insuranceClient),
//         onSuccess: () => {
//             qc.invalidateQueries({ queryKey: INSURANCE_KEYS.all });
//         },
//     });
// }

// /* ---------------- UPDATE ---------------- */

// export function useUpdateInsurance() {
//     const qc = useQueryClient();

//     return useMutation({
//         mutationFn: ({
//             id,
//             payload,
//         }: {
//             id: string;
//             payload: Parameters<
//                 typeof insuranceClient.updateInsurance
//             >[1];
//         }) => insuranceClient.updateInsurance(id, payload),

//         onSuccess: (_data, variables) => {
//             // refresh list + detail
//             qc.invalidateQueries({ queryKey: INSURANCE_KEYS.all });
//             qc.invalidateQueries({
//                 queryKey: INSURANCE_KEYS.detail(variables.id),
//             });
//         },
//     });
// }

// /* ---------- DELETE ---------- */
// export function useDeleteInsurance() {
//     const qc = useQueryClient();

//     return useMutation({
//         mutationFn: (id: string) =>
//             insuranceClient.deleteInsurance(id),
//         onSuccess: () => {
//             qc.invalidateQueries({ queryKey: INSURANCE_KEYS.all });
//         },
//     });
// }


"use client";

import {
  createInsuranceApiClient,
  CreateInsuranceParams,
} from "@/lib/api/administration/insurance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@workspace/ui/lib/sonner";

const insuranceClient = createInsuranceApiClient({
  authToken: "", // token handled by getIdToken internally
});

/* ---------------- QUERY KEYS ---------------- */

export const INSURANCE_KEYS = {
  all: ["insurance"] as const,
  list: (params?: any) => ["insurance", "list", params] as const,
  detail: (id: string) => ["insurance", "detail", id] as const,
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

/* ---------- LIST ---------- */
export function useInsuranceList(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: INSURANCE_KEYS.list(params),
    queryFn: async () => {
      const res = await insuranceClient.getInsuranceProviders(params);
      return res.data;
    },
  });
}

/* ---------- GET BY ID ---------- */
export function useInsuranceById(id?: string) {
  return useQuery({
    queryKey: INSURANCE_KEYS.detail(id ?? ""),
    enabled: !!id,
    queryFn: async () => {
      if (!id) throw new Error("Insurance ID is required");
      const res = await insuranceClient.getInsuranceById(id);
      return res.data.data;
    },
  });
}

/* ---------- CREATE ---------- */
export function useCreateInsurance() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateInsuranceParams) =>
      insuranceClient.createInsurance(payload),

    onSuccess: () => {
      toast.success("Insurance company created successfully");
      qc.invalidateQueries({ queryKey: INSURANCE_KEYS.all });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/* ---------- UPDATE ---------- */
export function useUpdateInsurance() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Parameters<
        typeof insuranceClient.updateInsurance
      >[1];
    }) => insuranceClient.updateInsurance(id, payload),

    onSuccess: (_data, variables) => {
      toast.success("Insurance company updated successfully");

      qc.invalidateQueries({ queryKey: INSURANCE_KEYS.all });
      qc.invalidateQueries({
        queryKey: INSURANCE_KEYS.detail(variables.id),
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/* ---------- DELETE ---------- */
export function useDeleteInsurance() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      insuranceClient.deleteInsurance(id),

    onSuccess: () => {
      toast.success("Insurance company deleted successfully");
      qc.invalidateQueries({ queryKey: INSURANCE_KEYS.all });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

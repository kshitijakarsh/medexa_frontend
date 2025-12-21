import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  createPatientCategoryApiClient,
  PatientCategory,
} from "@/lib/api/patient-category-api";
import { getIdToken } from "@/app/utils/auth";

export const patientCategoryKeys = {
  all: ["patient-categories"] as const,
  list: () => [...patientCategoryKeys.all, "list"] as const,
};

export function usePatientCategories(enabled = true) {
  return useQuery({
    queryKey: patientCategoryKeys.list(),
    queryFn: async () => {
      const token = (await getIdToken()) || "";
      const client = createPatientCategoryApiClient({ authToken: token });
      const response = await client.getAll();
      return response.data.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

import { createDoctorVisitsApiClient } from "@/lib/api/doctor/dashboard";
import { useQuery } from "@tanstack/react-query";

export function useDoctorVisitById(id?: string) {
  const api = createDoctorVisitsApiClient({});

  return useQuery({
    queryKey: ["doctor-visit-by-id", id],
    enabled: !!id,
    queryFn: async () => (await api.getVisitById(id!)).data.data,
  });
}

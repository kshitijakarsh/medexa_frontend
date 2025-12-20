// // _component/common/useUpdateVisitStatus.ts

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createDoctorVisitsApiClient } from "@/lib/api/doctor/dashboard";

// export function useUpdateVisitStatus(visitId: string) {
//   const api = createDoctorVisitsApiClient({});
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (status: string) => {
//       const res = await api.updateVisitStatus(visitId, { status });
//       return res.data.data;
//     },

//     onSuccess: () => {
//       // Always refresh visit details after status change
//       queryClient.invalidateQueries({
//         queryKey: ["doctor-visit-by-id", visitId],
//       });
//     },
//   });
// }


// _component/common/useUpdateVisitStatus.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDoctorVisitsApiClient } from "@/lib/api/doctor/dashboard";
import { toast } from "@workspace/ui/lib/sonner";

export function useUpdateVisitStatus(visitId: string) {
  const api = createDoctorVisitsApiClient({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status: string) => {
      const res = await api.updateVisitStatus(visitId, { status });
      return res.data.data;
    },

    onSuccess: () => {
      toast.success("Visit status updated");
      queryClient.invalidateQueries({
        queryKey: ["doctor-visit-by-id", visitId],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to update visit status");
    },
  });
}

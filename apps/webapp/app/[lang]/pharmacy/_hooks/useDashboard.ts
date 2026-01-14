import { useQuery } from "@tanstack/react-query"
import { createDashboardApiClient, DashboardQueryParams } from "@/lib/api/dashboard-api"

const api = createDashboardApiClient({})

export const dashboardKeys = {
  all: ["pharmacy-dashboard"] as const,
  dashboard: () => [...dashboardKeys.all, "dashboard"] as const,
}

export function useDashboard(params?: DashboardQueryParams & { enabled?: boolean }) {
  const { enabled = true, ...queryParams } = params || {}

  return useQuery({
    queryKey: dashboardKeys.dashboard(),
    queryFn: async () => {
      const response = await api.getDashboard(queryParams)
      return response.data
    },
    enabled,
  })
}

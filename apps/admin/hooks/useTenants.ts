import { useQuery } from "@tanstack/react-query"
import { createTenantApiClient, GetTenantsParams } from "@/lib/api/tenant"

interface UseTenantsProps {
    initialParams?: GetTenantsParams
    enabled?: boolean
}

export const useTenants = ({
    initialParams = {},
    enabled = true,
}: UseTenantsProps = {}) => {
    return useQuery({
        queryKey: ["tenants", initialParams],
        queryFn: async () => {
            const client = createTenantApiClient({ authToken: "dev-token" }) // In real app, token might be handled inside
            const response = await client.getTenants(initialParams)
            return response.data
        },
        enabled,
    })
}

import { useQuery } from "@tanstack/react-query"
import { createAuditLogsApiClient } from "@/lib/api/activity-logs/activity-logs"

interface UseActivityLogsProps {
    enabled?: boolean
}

export const useActivityLogs = ({ enabled = true }: UseActivityLogsProps = {}) => {
    return useQuery({
        queryKey: ["audit-logs"],
        queryFn: async () => {
            const client = createAuditLogsApiClient({ authToken: "dev-token" })
            const response = await client.getAuditLogs()
            return response.data
        },
        enabled,
    })
}

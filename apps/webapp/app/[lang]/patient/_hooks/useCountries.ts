import { useQuery } from "@tanstack/react-query"
import { createCountryApiClient } from "@/lib/api/country-api"
import { getIdToken } from "@/app/utils/auth"

export const countryKeys = {
  all: ["countries"] as const,
  list: () => [...countryKeys.all, "list"] as const,
}

export function useCountries(enabled = true) {
  return useQuery({
    queryKey: countryKeys.list(),
    queryFn: async () => {
      const token = (await getIdToken()) || ""
      const client = createCountryApiClient({ authToken: token })
      const response = await client.getAll()
      return response.data.data
    },
    enabled,
  })
}

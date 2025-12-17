// hooks/useSoapTemplates.ts
"use client";

import { createSoapTemplateApiClient } from "@/lib/api/doctor/soap-template.api";
import { useQuery } from "@tanstack/react-query";

export function useSoapTemplates() {
  const api = createSoapTemplateApiClient({ authToken: "" });

  return useQuery({
    queryKey: ["soap-templates"],
    queryFn: async () => {
      const res = await api.getSoapTemplates({ limit: 50 });
      return res.data.data;
    },
  });
}

"use client";

import { createStorageApiClient } from "@/lib/api/doctor/storage-api";
import { useMutation } from "@tanstack/react-query";

const api = createStorageApiClient({});

export function useGeneratePresignedUrl() {
  return useMutation({
    mutationFn: async (payload: {
      fileName: string;
      contentType: string;
      path: string;
    }) => {
      const res = await api.generatePresignedUrl(payload);
      return res.data.data;
    },
  });
}

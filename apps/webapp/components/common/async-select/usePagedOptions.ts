// components/common/async-select/usePagedOptions.ts
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function usePagedOptions({
  queryKey,
  fetchFn,
  search,
  pageSize = 20,
}: {
  queryKey: string;
  fetchFn: (params: { page: number; limit: number; search: string }) => Promise<any>;
  search: string;
  pageSize?: number;
}) {
  const infiniteQuery = useInfiniteQuery({
    queryKey: [queryKey, search],

    // ✅ REQUIRED IN TANSTACK QUERY v5
    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const res = await fetchFn({
        page: pageParam,
        limit: pageSize,
        search,
      });
      return res;
    },

    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.length || lastPage.length < pageSize) return undefined;
      return pages.length + 1;
    },
  });

  const options = useMemo(() => {
    return infiniteQuery.data?.pages.flat() ?? [];
  }, [infiniteQuery.data]);

  return { ...infiniteQuery, options };
}

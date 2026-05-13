import { useQuery } from "@tanstack/vue-query";
import { queryKeys } from "@/constants/query-keys";
import { getSession } from "@/lib/auth";

export function useSessionQuery() {
  return useQuery({
    queryKey: queryKeys.session,
    queryFn: getSession,
    staleTime: 30_000
  });
}
import { useQuery } from "@tanstack/vue-query";
import { queryKeys } from "@/constants";
import { getSession } from "@/api";

export function useSessionQuery() {
  return useQuery({
    queryKey: queryKeys.session,
    queryFn: getSession,
    staleTime: 60_000,
    gcTime: 10 * 60_000,
    retry: false
  });
}

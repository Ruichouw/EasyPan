import { useQuery } from "@tanstack/vue-query";
import { queryKeys } from "@/constants";
import { getSystemHealth, type HealthResult } from "@/api";

export function useHealthQuery() {
  return useQuery<HealthResult>({
    queryKey: queryKeys.health,
    queryFn: getSystemHealth,
    staleTime: 15_000,
    retry: 1
  });
}
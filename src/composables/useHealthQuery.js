import { useQuery } from "@tanstack/vue-query";
import { queryKeys } from "@/constants/query-keys";
export function useHealthQuery() {
    return useQuery({
        queryKey: queryKeys.health,
        queryFn: async () => {
            const response = await fetch("/api/system/options", {
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error("health check failed");
            }
            return {
                status: "ok",
                timestamp: new Date().toISOString()
            };
        },
        staleTime: 15_000,
        retry: 1
    });
}

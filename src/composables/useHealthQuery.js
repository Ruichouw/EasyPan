import { useQuery } from "@tanstack/vue-query";
export function useHealthQuery() {
    return useQuery({
        queryKey: ["health"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            return {
                status: "ok",
                timestamp: new Date().toISOString()
            };
        },
        staleTime: 15_000
    });
}

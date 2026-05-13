import { useQuery } from "@tanstack/vue-query";

type HealthResponse = {
  status: string;
  timestamp: string;
};

export function useHealthQuery() {
  return useQuery<HealthResponse>({
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
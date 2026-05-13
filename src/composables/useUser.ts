import { useQuery } from "@tanstack/vue-query";
import { getSession } from "@/api";
import { queryKeys } from "@/constants";

export function useUser() {
  return useQuery({
    queryKey: queryKeys.session,
    queryFn: getSession
  });
}
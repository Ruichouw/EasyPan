import { useQueryClient } from "@tanstack/vue-query";
import { getSession } from "@/api";
import { queryKeys } from "@/constants";
import { useUserStore } from "@/store/modules/user";

export function useAuthSessionSync() {
  const queryClient = useQueryClient();
  const userStore = useUserStore();

  async function syncSession() {
    const session = await getSession();
    queryClient.setQueryData(queryKeys.session, session);

    if (!session) {
      userStore.logout();
      return null;
    }

    userStore.applySession(session);
    return session;
  }

  return {
    syncSession
  };
}

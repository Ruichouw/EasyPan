import { defineStore } from "pinia";
import { clearToken, getToken, SESSION_TOKEN, setToken } from "@/utils/auth";
import type { SessionData } from "@/types/auth";
import { usePermissionStore } from "./permission";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: getToken(),
    name: "",
    userId: "",
    email: "",
    permissions: [] as string[]
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.token)
  },
  actions: {
    applySession(session: SessionData) {
      this.token = SESSION_TOKEN;
      this.name = session.user.name;
      this.userId = session.user.id;
      this.email = session.user.email;
      this.permissions = session.permissions ?? session.user.permissions ?? [];
      setToken(SESSION_TOKEN);

      const permissionStore = usePermissionStore();
      permissionStore.setCodes(this.permissions.length ? this.permissions : ["user:read"]);
    },
    logout() {
      this.token = "";
      this.name = "";
      this.userId = "";
      this.email = "";
      this.permissions = [];
      clearToken();

      const permissionStore = usePermissionStore();
      permissionStore.setCodes([]);
    }
  }
});

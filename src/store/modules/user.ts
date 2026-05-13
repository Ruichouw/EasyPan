import { defineStore } from "pinia";
import { clearToken, getToken, setToken } from "@/utils/auth";
import { usePermissionStore } from "./permission";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: getToken(),
    name: ""
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.token)
  },
  actions: {
    login(token: string, name = "") {
      this.token = token;
      this.name = name;
      setToken(token);

      const permissionStore = usePermissionStore();
      permissionStore.setCodes(["user:read"]);
    },
    logout() {
      this.token = "";
      this.name = "";
      clearToken();

      const permissionStore = usePermissionStore();
      permissionStore.setCodes([]);
    }
  }
});
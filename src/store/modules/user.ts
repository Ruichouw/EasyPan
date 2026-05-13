import { defineStore } from "pinia";
import { clearToken, getToken, setToken } from "@/utils/auth";

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
    },
    logout() {
      this.token = "";
      this.name = "";
      clearToken();
    }
  }
});
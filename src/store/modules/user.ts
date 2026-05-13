import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    name: ""
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("access_token", token);
    },
    clearToken() {
      this.token = "";
      localStorage.removeItem("access_token");
    }
  }
});
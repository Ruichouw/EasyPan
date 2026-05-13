import { defineStore } from "pinia";

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    codes: [] as string[]
  }),
  getters: {
    hasPermission: (state) => (code?: string) => {
      if (!code) return true;
      return state.codes.includes(code);
    }
  },
  actions: {
    setCodes(codes: string[]) {
      this.codes = codes;
    }
  }
});
import { defineStore } from "pinia";

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    codes: [] as string[]
  }),
  actions: {
    setCodes(codes: string[]) {
      this.codes = codes;
    }
  }
});
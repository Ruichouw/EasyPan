import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    title: "EasyPan Frontend",
    visitCount: 0
  }),
  actions: {
    bumpVisit() {
      this.visitCount += 1;
    }
  }
});
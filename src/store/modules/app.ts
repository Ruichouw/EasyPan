import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    title: "EasyPan Front端",
    visitCount: 0,
    sidebarOpen: true
  }),
  actions: {
    bumpVisit() {
      this.visitCount += 1;
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }
});
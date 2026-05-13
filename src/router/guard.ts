import type { Router } from "vue-router";

export function setupRouterGuard(router: Router) {
  router.beforeEach((to) => {
    const token = localStorage.getItem("access_token");
    if (to.path !== "/login" && !token) {
      return "/login";
    }
    if (to.path === "/login" && token) {
      return "/dashboard";
    }
    return true;
  });
}
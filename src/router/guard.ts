import type { Router } from "vue-router";
import { getToken } from "@/utils/auth";

export function setupRouterGuard(router: Router) {
  router.beforeEach((to) => {
    const token = getToken();
    const requiresAuth = to.path !== "/login";

    if (requiresAuth && !token) {
      return {
        path: "/login",
        query: { redirect: to.fullPath }
      };
    }

    if (to.path === "/login" && token) {
      const redirect = typeof to.query.redirect === "string" ? to.query.redirect : "/dashboard";
      return redirect;
    }

    return true;
  });
}
import type { Router } from "vue-router";
import { getToken } from "@/utils/auth";
import { pinia } from "@/store";
import { usePermissionStore } from "@/store/modules/permission";

const PUBLIC_PATHS = new Set(["/login", "/register"]);

export function setupRouterGuard(router: Router) {
  router.beforeEach((to) => {
    const token = getToken();
    const requiresAuth = !PUBLIC_PATHS.has(to.path) && to.meta.requiresAuth !== false;

    if (requiresAuth && !token) {
      return {
        path: "/login",
        query: { redirect: to.fullPath }
      };
    }

    if (PUBLIC_PATHS.has(to.path) && token) {
      const redirect = typeof to.query.redirect === "string" ? to.query.redirect : "/files";
      return redirect;
    }

    const permissionCode = typeof to.meta.permission === "string" ? to.meta.permission : undefined;
    if (permissionCode) {
      const permissionStore = usePermissionStore(pinia);
      if (!permissionStore.hasPermission(permissionCode)) {
        return "/files";
      }
    }

    return true;
  });

  router.afterEach((to) => {
    const title = typeof to.meta.title === "string" ? to.meta.title : "EasyPan";
    document.title = `${title} - EasyPan`;
  });
}

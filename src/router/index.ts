import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { routes } from "./routes";
import { setupRouterGuard } from "./guard";

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[]
});

setupRouterGuard(router);

export default router;
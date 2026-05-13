import type { RouteRecordRaw } from "vue-router";

export interface RouteMetaCustom {
  title: string;
  requiresAuth?: boolean;
  permission?: string;
}

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        meta: { title: "概览", requiresAuth: true } satisfies RouteMetaCustom,
        component: () => import("@/views/dashboard/index.vue")
      },
      {
        path: "user/list",
        name: "user-list",
        meta: { title: "用户列表", requiresAuth: true, permission: "user:read" } satisfies RouteMetaCustom,
        component: () => import("@/views/user/list.vue")
      },
      {
        path: "user/detail/:id",
        name: "user-detail",
        meta: { title: "用户详情", requiresAuth: true, permission: "user:read" } satisfies RouteMetaCustom,
        component: () => import("@/views/user/detail.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "登录", requiresAuth: false } satisfies RouteMetaCustom,
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/register",
    name: "register",
    meta: { title: "注册", requiresAuth: false } satisfies RouteMetaCustom,
    component: () => import("@/views/register/index.vue")
  }
];
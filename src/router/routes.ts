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
    redirect: "/files",
    children: [
      {
        path: "files",
        name: "files",
        meta: { title: "我的文件", requiresAuth: true } satisfies RouteMetaCustom,
        component: () => import("@/views/files/index.vue")
      },
      {
        path: "trash",
        name: "trash",
        meta: { title: "回收站", requiresAuth: true } satisfies RouteMetaCustom,
        component: () => import("@/views/trash/index.vue")
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

import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue")
      },
      {
        path: "user/list",
        name: "user-list",
        component: () => import("@/views/user/list.vue")
      },
      {
        path: "user/detail/:id",
        name: "user-detail",
        component: () => import("@/views/user/detail.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue")
  }
];
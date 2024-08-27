import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router"; // 增加type表示路由记录的类型
// import { RouteRecordRaw } from "vue-router";

import localCache from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
    // 更具用户角色动态加载路由
    children: [],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/not-found/not-found.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache("token");
    if (!token) {
      return "/login";
    }

    // // userMenus => routes
    // const userMenus = localCache.getCache("userMenus");
    // const routes = mapMenusToRouters(userMenus);
    // console.log(" routes：", routes);

    // // routes => router.main.children
    // routes.forEach((route) => {
    //   router.addRoute("main", route);
    // });
  }
  // console.log("执行了路由守卫", to);
  if (to.path === "/main") {
    return firstMenu.url;
  }
});
export default router;

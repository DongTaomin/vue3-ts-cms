import { IBread } from "@/base-ui/bread/types";
import { RouteRecordRaw } from "vue-router";

let firstMenu: any = null;

export function mapMenusToRouters(userMenus: any[]) {
  const routes: RouteRecordRaw[] = [];
  // 加载默认的所有的路由
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context("../router/main", true, /\.ts/);
  routeFiles.keys().forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require(`../router/main` + key.split(".")[1]);
    allRoutes.push(route.default);
  });
  // console.log(allRoutes);

  // 根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) routes.push(route);
        if (!firstMenu) {
          firstMenu = menu;
        }
      } else {
        _recurseGetRoute(menu.children ?? []);
      }
    }
  };

  _recurseGetRoute(userMenus);
  return routes;
}

// 递归查找路径
export function processingPath(
  userMenus: any[],
  currentPath: string,
  breadCrumbs?: IBread[],
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const children = processingPath(menu.children ?? [], currentPath);
      if (children) {
        breadCrumbs?.push({ name: menu.name });
        breadCrumbs?.push({ name: children.name });
        return children;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

// 获取面包屑
export function mapPathToBread(userMenus: any[], currentPath: string) {
  const breadCrumbs: IBread[] = [];
  processingPath(userMenus, currentPath, breadCrumbs);
  return breadCrumbs;
}

// 获取用户按钮权限
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = [];
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };
  _recurseGetPermission(userMenus);
  return permissions;
}

export function mapMenuLeafKeys(menuList: any[]) {
  const leafKeys: number[] = [];

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children);
      } else {
        leafKeys.push(menu.id);
      }
    }
  };

  _recurseGetLeaf(menuList);

  return leafKeys;
}

export { firstMenu };

import { createStore } from "vuex";

import { IRootState } from "./types";
import login from "./login/login";
import system from "./mian/system/system";
import dashboard from "./mian/analysis/dashboard";
import { getPageListData } from "@/service/main/system/system";

const store = createStore<IRootState>({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],

      entireMenu: [],
    };
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list) {
      state.entireRole = list;
    },

    changeEntireMenu(state, list) {
      state.entireMenu = list;
    },
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1、请求部门和角色数据
      const departmentList: any = await getPageListData("/department/list", {
        offset: 0,
        size: 1000,
      });
      const { list: list1 } = departmentList.data;
      // console.log(list1);

      const roleList: any = await getPageListData("/role/list", {
        offset: 0,
        size: 1000,
      });
      const { list: list2 } = roleList.data;
      // 请求权限菜单数据
      const menuList: any = await getPageListData("/menu/list", {});

      const { list: list3 } = menuList.data;

      // console.log(list3);

      // 2、将数据存储在state中

      commit("changeEntireDepartment", list1);
      commit("changeEntireRole", list2);
      commit("changeEntireMenu", list3);
    },
  },
  getters: {},
  modules: {
    login,
    system,
    dashboard,
  },
});

export function setupStore() {
  store.dispatch("login/loadLocalLogin");
  store.dispatch("getInitialDataAction");
}

// export function useStore() {
//   return store;
// }

export default store;

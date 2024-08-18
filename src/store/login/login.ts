import { Module } from "vuex";

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from "../../service/login/login";

import { ILoginState, IDataType, ILoginResult } from "./types";
import { IRootState } from "../types";
import localCache from "../../utils/cache";
import router from "@/router";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,

  state() {
    return {
      token: "",

      useInfo: {},

      userMenus: [],
    };
  },
  mutations: {
    setToken(state, token) {
      console.log("执行setToken", token);

      state.token = token;
    },

    setUserInfo(state, userInfo) {
      state.useInfo = userInfo;
    },

    setUserMenus(state, userMenus) {
      state.userMenus = userMenus;
    },
  },
  actions: {
    async accountLoginAction({ commit }, payload) {
      // 1、用户登录
      const res = await accountLoginRequest(payload);
      console.log(res.data);

      const { id, token } = res.data;
      commit("setToken", token);

      localCache.setCache("token", token);

      // 2、请求用户信息
      const res2 = await requestUserInfoById(id);
      const userInfo = res2.data;
      commit("setUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);
      console.log("用户信息", userInfo);

      // 3、请求用户菜单
      const res3 = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = res3.data;
      commit("setUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);
      console.log("菜单", userMenus);

      // 4、跳转首页

      router.push("/main");
    },

    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token");
      if (token) {
        commit("setToken", token);
      }

      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("setUserInfo", userInfo);
      }

      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        commit("setUserMenus", userMenus);
      }
    },
  },
};
export default loginModule;

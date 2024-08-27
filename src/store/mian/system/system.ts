import localCache from "@/utils/cache";
import { Module } from "vuex";
import { ISystemState } from "./types";
import { IRootState } from "@/store/types";
// import loginModule from "@/store/login/login";
import { getPageListData, deletePageData } from "@/service/main/system/system";

const ststemModule: Module<ISystemState, IRootState> = {
  namespaced: true,

  state() {
    return {
      usersList: [],
      usersCount: 0,

      roleList: [],
      roleCount: 0,

      goodsList: [],
      goodsCount: 0,

      menuList: [],
      menuCount: 0,
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    },
  },
  mutations: {
    // userList
    changeUsersList(state, userList: any[]) {
      state.usersList = userList;
    },
    // userCount
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount;
    },

    // roleList
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    // roleCount
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },

    // goodsList
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList;
    },
    // goodsCount
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },

    // menuList
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList;
    },
    // menuCount
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    },
  },

  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1、获取pageUrl
      const pageName = payload.pageUrl;
      // const pageUrl = `/${pageName}/list`;
      const pageUrl = `/${pageName}/list`;
      // 1、对页面发送请求
      const pageResult: any = await getPageListData(pageUrl, payload.queryInfo);

      // const { list, totalCount } = pageResult.data;
      const list = pageResult.data.list;
      const totalCount = pageResult.data.totalCount;

      // 2、将数据存储在state中
      commit(
        `change${pageName.charAt(0).toUpperCase() + pageName.slice(1)}List`,
        list,
      );
      commit(
        `change${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Count`,
        totalCount,
      );

      // console.log(list);
      // console.log(pageName);
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      // 1、删除的请求
      const { pageName, id } = payload;
      // console.log(pageName, id);

      const pageUrl = `/${pageName}/${id}`;
      const query = localCache.getCache("query");
      await deletePageData(pageUrl);
      // 2、删除的后续处理
      dispatch("getPageListAction", {
        pageUrl: pageName,
        queryInfo: query,
      });
    },
  },
};
export default ststemModule;

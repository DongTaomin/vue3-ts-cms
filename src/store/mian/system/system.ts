import localCache from "@/utils/cache";
import { Module } from "vuex";
import { ISystemState } from "./types";
import { IRootState } from "@/store/types";
// import loginModule from "@/store/login/login";
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData,
} from "@/service/main/system/system";

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

      departmentList: [],
      departmentCount: 0,
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

    // departmentList
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList;
    },
    // departmentCount
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount;
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

    // 新建
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
      // 2、新建的后续处理
      dispatch("getPageListAction", {
        pageUrl: pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    // 编辑
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      await editPageData(pageUrl, editData);

      // 2、编辑的后续处理
      dispatch("getPageListAction", {
        pageUrl: pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
  },
};
export default ststemModule;

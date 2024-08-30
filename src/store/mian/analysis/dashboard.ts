import { Module } from "vuex";

import { IDashboardState } from "./types";
import { IRootState } from "../../types";
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale,
} from "@/service/main/analysis/dashboard";

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: [],
    };
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list;
    },

    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list;
    },

    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list;
    },

    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list;
    },
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryGoodsCountResult: any = await getCategoryGoodsCount();
      console.log(categoryGoodsCountResult.data);

      const categoryGoodsSaleResult: any = await getCategoryGoodsSale();
      console.log(categoryGoodsSaleResult.data);

      const categoryGoodsFavorResult: any = await getCategoryGoodsFavor();
      console.log(categoryGoodsFavorResult.data);

      const addressGoodsSaleResult: any = await getAddressGoodsSale();
      console.log(addressGoodsSaleResult.data);

      commit("changeCategoryGoodsCount", categoryGoodsCountResult.data);
      commit("changeCategoryGoodsSale", categoryGoodsSaleResult.data);
      commit("changeCategoryGoodsFavor", categoryGoodsFavorResult.data);
      commit("changeAddressGoodsSale", addressGoodsSaleResult.data);
    },
  },
  getters: {},
};
export default dashboardModule;

import { createStore } from "vuex";

import { IRootState } from "./types";
import login from "./login/login";

const store = createStore<IRootState>({
  state() {
    return {
      name: "coderwhy",
      age: 18,

      count: 0,
    };
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    login,
  },
});

export function setupStore() {
  store.dispatch("login/loadLocalLogin");
}

// export function useStore() {
//   return store;
// }

export default store;

import { createApp } from "vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "element-plus/dist/index.css";

import "./assets/css/index.css";

// import "./service/axios_demo";
// import dtmRequest from "./service";

import App from "./App.vue";

import router from "./router";
import store from "./store";
import { setupStore } from "./store/index";
import globalRegister from "./global/index";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(store);
setupStore();

app.use(globalRegister);
app.use(router);
app.use(ElementPlus);

app.mount("#app");

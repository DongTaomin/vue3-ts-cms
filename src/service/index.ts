// service统一出口
import DTMRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
import localCache from "@/utils/cache";

const dtmRequest = new DTMRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache("token"); // 替换为实际的 token

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log("单个请求成功的拦截器");

      return config;
    },
    requestInterceptorCatch: (error) => {
      console.log("单个请求失败的拦截器");
      return Promise.reject(error);
    },
    responseInterceptor: (res) => {
      console.log("单个响应成功的拦截器");
      return res;
    },
    responseInterceptorCatch: (error) => {
      console.log("单个响应失败的拦截器");
      return Promise.reject(error);
    },
  },
});
export default dtmRequest;

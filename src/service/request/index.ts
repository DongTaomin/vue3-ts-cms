import axios from "axios";
import type { AxiosInstance } from "axios";
import type { DTMRequestInterceptors, DTMRequestConfig } from "./type";
import type { LoadingInstance } from "element-plus/lib/components/loading/src/loading";

import { ElLoading } from "element-plus";

class DTMRequest {
  instance: AxiosInstance;
  interceptors?: DTMRequestInterceptors;
  Loading?: LoadingInstance;
  // showLoading: boolean = false;

  constructor(config: DTMRequestConfig) {
    this.instance = axios.create(config);
    // this.showLoading = config.showLoading ?? false;
    this.interceptors = config.interceptors;
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );

    // 添加所有实例都具有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("所有实例都有的拦截器:请求成功拦截");

        // 开启loading
        this.Loading = ElLoading.service({
          lock: true,
          text: "拼命加载中...",
          background: "rgba(0, 0, 0, 0.7)",
        });

        return config;
      },
      (err) => {
        // console.log("所有实例都有的拦截器:请求失败拦截");
        return err;
      },
    );
    this.instance.interceptors.response.use(
      (res): any => {
        // console.log("所有实例都有的拦截器:响应成功拦截");

        // 关闭loading
        setTimeout(() => {
          this.Loading?.close();
        }, 1000); // 500毫秒后关闭loading

        const data = res.data;
        // if (data.returnCode === "-1001") {
        //   console.log("请求失败,错误");
        // } else {
        return data;
        // }
      },
      (err) => {
        // console.log("所有实例都有的拦截器:响应失败拦截");

        // 关闭loading
        this.Loading?.close();

        // 判断错误码
        // if (err.response.status === 404) {
        //   console.log("404错误");
        // }
        return err;
      },
    );
  }

  // 封装请求
  request<T>(config: DTMRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      this.instance
        .request<unknown, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }

          // 将结果返回出去
          resolve(res);
          //   console.log(res);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  }

  get<T>(config: DTMRequestConfig): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }

  post<T>(config: DTMRequestConfig): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }

  delete<T>(config: DTMRequestConfig): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }

  patch<T>(config: DTMRequestConfig): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }
}
export default DTMRequest;

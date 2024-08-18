import type { AxiosRequestConfig, AxiosResponse } from "axios";

interface DTMRequestInterceptors {
  requestInterceptor?: (config: any) => any;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: any) => any;
  responseInterceptorCatch?: (error: any) => any;
}

interface DTMRequestConfig extends AxiosRequestConfig {
  interceptors?: DTMRequestInterceptors;
}

export { DTMRequestInterceptors, DTMRequestConfig };

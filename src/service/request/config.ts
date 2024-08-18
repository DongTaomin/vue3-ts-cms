// 1、手动切换环境配置
// const BASE_URL = "http://237.84.2.178:8000/dev";
// const BASE_NAME = "v1";

// const BASE_URL = "http://237.84.2.178:8000/prod";
// const BASE_NAME = "v2";

// const BASE_URL = "http://237.84.2.178:8000/test";
// const BASE_NAME = "v3";

// 2、根据process.env.NODE_ENV区分环境
let BASE_URL = "";
const TIME_OUT = 10000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://237.84.2.178:8000/prod";
} else {
  BASE_URL = "http://237.84.2.178:8000/test";
}

export { BASE_URL, TIME_OUT };

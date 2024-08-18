console.log("axios_demo");
import axios from "axios"; // 导入axios

// axios.defaults.baseURL = "http://123.207.32.32:8000"; // 设置默认请求地址
// axios.defaults.timeout = 10000; // 设置超时

axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
  console.log(res.data);
});

axios.defaults.baseURL = "http://123.207.32.32:8000";

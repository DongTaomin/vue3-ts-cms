import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc); // 扩展 Day.js 的功能以支持 UTC 时间
// 时间格式化字符串
const DATA_FORMAT = "YYYY-MM-DD HH:mm:ss";

export function formatData(data: any, format: string = DATA_FORMAT) {
  return dayjs.utc(data).format(format);
}

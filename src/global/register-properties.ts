import { App } from "vue";
import { formatData } from "@/utils/data-format";
export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(date: string) {
      return formatData(date);
    },
  };
}

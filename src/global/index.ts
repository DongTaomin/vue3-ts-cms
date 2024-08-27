import { App } from "vue";
import registerProperties from "./register-properties";

export default function globalRegister(app: App) {
  app.use(registerProperties);
}

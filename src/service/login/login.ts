import dtmRequest from "../index";
import { IAccount, ILoginResult, IDataType } from "./type";

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/", // 用法: /users/1
  UserMenus = "/role/", // 用法: role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return dtmRequest
    .post<IDataType<ILoginResult>>({
      url: LoginAPI.AccountLogin,
      data: account,
    })
    .then((response) => {
      console.log("Response from server:", response);
      return response;
    })
    .catch((error) => {
      console.error("Login request failed:", error);
      throw error;
    });
}

export function requestUserInfoById(id: number) {
  return dtmRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    // showLoading: false,
  });
}

export function requestUserMenusByRoleId(id: number) {
  return dtmRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu",
  });
}

interface ILoginState {
  token: string;
  useInfo: any;
  userMenus: any;
  permissions: string[];
}

interface ILoginResult {
  id: number;
  name: string;
  token: string;
}

interface IDataType<T = any> {
  code: number; // 根据实际返回的数据结构定义类型
  data: T;
}

export { ILoginState, IDataType, ILoginResult };

interface IAccount {
  name: string;
  password: string;
}

interface ILoginResult {
  id: number;
  name: string;
  token: string;
}

interface IDataType<T = any> {
  code: number;
  data: T;
}

export { IAccount, ILoginResult, IDataType };

// export interface Role {
//   id: number;
//   name: string;
//   intro: string;
//   createAt?: Date;
//   updateAt?: Date;
// }

// export interface Department {
//   id: number;
//   name: string;
//   parentId: any;
//   createAt: Date;
//   updateAt: Date;
//   leader: string;
// }

// interface UserInfo {
//   id: number;
//   name: string;
//   realname: string;
//   cellphone: string;
//   enable: number;
//   createAt: Date;
//   updateAt: Date;
//   role: Role;
//   department: Department;
// }

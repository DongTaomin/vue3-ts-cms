import { IForm } from "@/base-ui/form/types";

export const modelConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "用户名：",
      placeholder: "请输入用户名",
    },
    {
      field: "realname",
      type: "input",
      label: "真实姓名：",
      placeholder: "请输入真实姓名",
    },
    {
      field: "password",
      type: "password",
      label: "用户密码：",
      placeholder: "请输入用户密码",
      isHidden: true,
    },
    {
      field: "cellphone",
      type: "input",
      label: "电话：",
      placeholder: "请输入电话",
    },
    {
      field: "departmentId",
      type: "select",
      label: "选择部门：",
      placeholder: "请选择部门",
      options: [],
    },
    {
      field: "roleId",
      type: "select",
      label: "选择角色：",
      placeholder: "请选择角色",
      options: [],
    },
  ],

  colLayout: { span: 24 },

  itemStyle: {},
};

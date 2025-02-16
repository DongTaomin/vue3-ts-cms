import { IFormItem, IForm } from "@/base-ui/form/types";

const formItems: IFormItem[] = [
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
    field: "cellphone",
    type: "input",
    label: "电话：",

    placeholder: "请输入电话",
  },
  {
    field: "enable",
    type: "select",
    label: "状态：",
    placeholder: "请选择状态",
    options: [
      { label: "启用", value: 1 },
      { label: "禁用", value: 0 },
    ],
  },
  {
    field: "createAt",
    type: "datepicker",
    label: "创建时间：",

    otherOptions: {
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      type: "daterange",
    },
  },
];

const formConfig: IForm = {
  labelWidth: "120px",
  itemStyle: {
    padding: "10px 40px",
  },
  colLayout: {
    span: 8,
  },

  formItems: formItems,
};

export default formConfig;

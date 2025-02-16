import { IFormItem, IForm } from "@/base-ui/form/types";

const formItems: IFormItem[] = [
  {
    field: "name",
    type: "input",
    label: "角色名称：",

    placeholder: "请输入角色名称",
  },
  {
    field: "intro",
    type: "input",
    label: "权限介绍：",

    placeholder: "请输入权限介绍",
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

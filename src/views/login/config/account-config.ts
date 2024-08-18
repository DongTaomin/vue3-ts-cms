// 编写校验规则
const rules = {
  name: [
    {
      required: true, // 是否必填
      message: "请输入账号",
      trigger: "blur",
    },
    {
      pattern: /^[0-9a-zA-Z]{6,10}$/, // 6-10个字母或者数字
      message: "账号必须是6-10个字母或者数字",
      trigger: "blur", // 失去焦点的时候校验
    },
  ],
  password: [
    {
      required: true, // 是否必填
      message: "请输入密码",
      trigger: "blur",
    },
    {
      pattern: /^[0-9a-zA-Z]{3,}$/, // 3位以上
      message: "密码必须是3位以上的字母或者数字",
      trigger: "blur", // 失去焦点的时候校验
    },
  ],
};

export { rules };

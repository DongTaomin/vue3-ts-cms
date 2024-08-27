export const contentTableConfig = {
  title: "菜单列表",
  propList: [
    { prop: "name", label: "菜单名称", minWidth: "100" },
    { prop: "type", label: "类型", minWidth: "60" },
    { prop: "url", label: "菜单url", minWidth: "100" },
    { prop: "icon", label: "菜单icon", minWidth: "100" },
    { prop: "permission", label: "菜单权限", minWidth: "100" },

    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "180",
      slotName: "createAt",
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "180",
      slotName: "updateAt",
    },
    {
      label: "操作",
      minWidth: "140",
      slotName: "handler",
    },
  ],
  showIndex: false,
  showSelect: false,
  // 多级展示
  childrenProps: {
    rowKey: "id", // id作为唯一标识
    treeProp: {
      // tree配置
      children: "children", // 子节点字段
    },
  },
  showFooter: false,
};

<template>
  <div class="user">
    <page-search
      :searchFormConfig="formConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>

    <div class="content">
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        pageName="users"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      ></page-content>
    </div>

    <page-model
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
      :modelConfig="modelConfigRef"
      pageName="users"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import PageSearch from "@/components/page-search/index";
import PageContent from "@/components/page-content/index";
import PageModel from "@/components/page-model/index";

import formConfig from "./config/search-config";
import { contentTableConfig } from "./config/content-config";
import { modelConfig } from "./config/model-config";

import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModel } from "@/hooks/usePageModel";

export default defineComponent({
  name: "User",
  components: {
    PageSearch,
    PageContent,
    PageModel,
  },
  setup() {
    // 使用hooks
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();

    // 密码隐藏
    const newCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === "password",
      );
      if (passwordItem) {
        passwordItem.isHidden = false;
      }
    };

    const editCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === "password",
      );
      if (passwordItem) {
        passwordItem.isHidden = true;
      }
    };

    // 动态添加部门和角色列表
    const store = useStore();
    const modelConfigRef = computed(() => {
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === "departmentId",
      );
      if (departmentItem) {
        departmentItem!.options = store.state.entireDepartment.map(
          (item: { name: any; id: any }) => {
            return { label: item.name, value: item.id };
          },
        );
      }

      const roleItem = modelConfig.formItems.find(
        (item) => item.field === "roleId",
      );
      if (roleItem) {
        roleItem.options = store.state.entireRole.map(
          (item: { name: any; id: any }) => {
            return { label: item.name, value: item.id };
          },
        );
      }
      return modelConfig;
    });

    const [pageModelRef, defaultInfo, handleNewData, handleEditData] =
      usePageModel(newCallback, editCallback);

    return {
      formConfig,
      contentTableConfig,
      modelConfigRef,
      pageContentRef,
      pageModelRef,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData,

      defaultInfo,
    };
  },
});
</script>

<style scoped>
.content {
  /* padding: 20px; */
  border-top: 20px solid #f5f5f5;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>

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
      :modelConfig="modelConfig"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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

    const [pageModelRef, defaultInfo, handleNewData, handleEditData] =
      usePageModel();

    return {
      formConfig,
      contentTableConfig,
      modelConfig,
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
